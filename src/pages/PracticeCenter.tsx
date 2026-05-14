import { useEffect, useMemo, useRef, useState } from "react";
import {
  Mic, Play, Square, Loader2, AlertCircle, Sparkles, Maximize2,
  ChevronLeft, ChevronRight, RefreshCw,
  Briefcase, Shield, Plane, GraduationCap, Monitor,
  ChevronDown, Copy, Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { practiceScenarios, difficulties, type Difficulty, type PracticeScenario } from "@/data/practiceScenarios";
import { useRoleplaySession } from "@/hooks/useRoleplaySession";
import { execPitch3Slides } from "@/data/execPitch3Slides";
import { personaProfiles } from "@/data/personaProfiles";
import { getPersonaSlideFlavor } from "@/lib/practice/buildAgentPrompt";
import { getSlidePrompts } from "@/data/practiceSlidePrompts";

const PERSONA_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase, Shield, Plane, GraduationCap, Monitor,
};

const AGENT_ID = "agent_5601krecj299fy28nwehe96cejrm";
const DECK_ROUTE = "/pitch-executive-3";
const REP_SILENCE_MS = 8000;
const REP_SILENCE_MS_OPENING = 12000;
const SLIDE_DEBOUNCE_MS = 600;

export default function PracticeCenter() {
  const [scenarioId, setScenarioId] = useState<string>(practiceScenarios[0].id);
  const [difficulty, setDifficulty] = useState<Difficulty>("skeptical");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [promptsOpen, setPromptsOpen] = useState(false);

  const session = useRoleplaySession();
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const lastNotifiedSlideRef = useRef<number>(-1);
  const silenceTimerRef = useRef<number | null>(null);
  const debounceTimerRef = useRef<number | null>(null);
  const [buyerFollowing, setBuyerFollowing] = useState(false);

  const scenario: PracticeScenario = useMemo(
    () => practiceScenarios.find((s) => s.id === scenarioId) ?? practiceScenarios[0],
    [scenarioId],
  );

  const persona = useMemo(
    () => personaProfiles.find((p) => p.id === scenario.personaId),
    [scenario.personaId],
  );
  const PersonaIcon = (persona && PERSONA_ICONS[persona.iconName]) ?? Briefcase;

  // When scenario changes, snap difficulty to its suggested default
  useEffect(() => {
    if (scenario.defaultDifficulty) setDifficulty(scenario.defaultDifficulty);
  }, [scenario.id, scenario.defaultDifficulty]);

  // Restore most-recent scorecard for this scenario after a refresh
  useEffect(() => {
    session.restoreScorecard(scenario.id);
  }, [scenario.id, session]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session.transcript.length]);

  const total = execPitch3Slides.length;
  const slide = execPitch3Slides[currentSlide];
  const SlideComponent = slide.component as React.ComponentType<any>;

  const goPrev = () => setCurrentSlide((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentSlide((i) => Math.min(total - 1, i + 1));

  const slidePrompts = getSlidePrompts(slide.id);
  const isTransitionSlide = (slide as any).isTransition === true;

  const copyToClipboard = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };

  // Keyboard navigation for slides
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  // Notify the AI buyer of the current slide. Buyer listens first; only if
  // the rep stays silent does the buyer ask a slide-anchored question.
  // - Title and divider slides: tracked for telemetry only, no prompts.
  // - Rapid Next/Prev clicks debounced so only the resting slide is sent.
  useEffect(() => {
    if (session.status !== "connected") return;
    if (lastNotifiedSlideRef.current === currentSlide) return;
    lastNotifiedSlideRef.current = currentSlide;
    session.trackSlide(slide.label);

    const isTransition = (slide as any).isTransition === true;
    if (isTransition) {
      setBuyerFollowing(false);
      return;
    }

    const flavor = getPersonaSlideFlavor(scenario.personaId);
    const focus = (slide as any).buyerFocus as string | undefined;
    const isOpening = currentSlide === 0;
    const silenceMs = isOpening ? REP_SILENCE_MS_OPENING : REP_SILENCE_MS;
    const slideAtSchedule = currentSlide;

    // ROI is unlocked once the rep has reached (or passed) the slide marked unlocksROI.
    const roiUnlocked = execPitch3Slides
      .slice(0, currentSlide + 1)
      .some((s) => (s as any).unlocksROI === true);
    const roiLine = roiUnlocked
      ? "roi_unlocked: YES — proof, named references and payback are now fair game, but anchor your question to the slide on screen."
      : "roi_unlocked: NO — do NOT ask about ROI, payback, business case, price or tangible benefits. Stay on this slide's topic.";

    setBuyerFollowing(true);
    const followingTimer = window.setTimeout(() => setBuyerFollowing(false), 2500);

    const debounce = window.setTimeout(() => {
      if (session.status !== "connected") return;
      if (slideAtSchedule !== lastNotifiedSlideRef.current) return;

      session.sendContext(
        `Context for the buyer (do not read aloud):\n` +
        `- slide_id: ${slide.id}\n` +
        `- slide_index: ${currentSlide + 1} of ${total}\n` +
        `- slide_label: "${slide.label}"\n` +
        (focus ? `- focus: ${focus}\n` : "") +
        `- ${roiLine}\n` +
        `Stay silent and let the rep walk you through this slide. Only respond when they speak. If they ask you something, react in character.`,
      );
      const baselineLen = session.transcript.length;
      const silenceTimer = window.setTimeout(() => {
        if (session.status !== "connected") return;
        if (slideAtSchedule !== lastNotifiedSlideRef.current) return;
        if (session.transcript.length !== baselineLen) return;
        if (session.isSpeaking) return;
        session.sendContext(
          `The rep has not spoken since moving to slide "${slide.label}".` +
          (focus ? ` Focus area: ${focus}.` : "") +
          ` ${roiLine}` +
          ` Ask ONE short buyer-style question that probes THIS slide's topic specifically. ${flavor} One thread only. Stay in character.`,
        );
      }, silenceMs);
      silenceTimerRef.current = silenceTimer;
    }, SLIDE_DEBOUNCE_MS);
    debounceTimerRef.current = debounce;

    return () => {
      window.clearTimeout(followingTimer);
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      if (silenceTimerRef.current !== null) {
        window.clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    };
  }, [currentSlide, session.status, slide, total, session, scenario.personaId]);

  // Reset slide-notification tracker when session ends/restarts
  useEffect(() => {
    if (session.status === "disconnected") {
      lastNotifiedSlideRef.current = -1;
      setBuyerFollowing(false);
    }
  }, [session.status]);

  const canStart = session.status === "disconnected";

  const handleStart = async () => {
    try {
      await session.start(scenario, difficulty, AGENT_ID);
    } catch {
      /* error surfaced via session.error */
    }
  };

  const handleEnd = async () => {
    await session.end();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Practice Center
            </div>
            <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight">
              Practice the Medium Executive Pitch with a live AI buyer
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Deliver each slide yourself — the buyer will react and ask questions tied to whatever slide you're showing. Use the Prev / Next buttons or arrow keys to advance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={DECK_ROUTE} target="_blank" rel="noreferrer">
                <Maximize2 className="mr-2 h-4 w-4" /> Open deck
              </a>
            </Button>
          </div>
        </div>

        {/* Buyer persona cards */}
        <div className="mb-3">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Choose your buyer
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {practiceScenarios.map((s) => {
              const active = s.id === scenarioId;
              const p = personaProfiles.find((pp) => pp.id === s.personaId);
              const Icon = (p && PERSONA_ICONS[p.iconName]) ?? Briefcase;
              const disabled = session.status !== "disconnected";
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => !disabled && setScenarioId(s.id)}
                  disabled={disabled}
                  className={`group flex flex-col gap-1 rounded-lg border p-3 text-left transition ${
                    active
                      ? "border-primary/60 bg-primary/10"
                      : "border-border/60 bg-card/60 hover:border-primary/40"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${p?.color ?? "text-foreground"}`} />
                    <span className="text-xs font-semibold text-foreground">{s.buyerLabel}</span>
                  </div>
                  <div className="text-[11px] leading-snug text-muted-foreground">{s.lens}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty bar */}
        <Card className="mb-4 flex flex-wrap items-center gap-2 bg-card/60 p-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Difficulty</span>
          {difficulties.map((d) => {
              const active = d.id === difficulty;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => session.status === "disconnected" && setDifficulty(d.id)}
                  disabled={session.status !== "disconnected"}
                  className={`rounded-md border px-3 py-1.5 text-xs transition ${
                    active
                      ? "border-primary/60 bg-primary/10 text-foreground"
                      : "border-border/60 bg-card text-muted-foreground hover:border-primary/30"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {d.label}
                </button>
              );
            })}
        </Card>

        <div className="grid gap-4 lg:h-[min(calc(100vh-220px),900px)] lg:min-h-[560px] lg:grid-cols-[1.6fr,1fr]">
          {/* Left: embedded slide */}
          <Card className="flex h-full flex-col overflow-hidden bg-black/40 p-0">
            <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-background">
              {/* Scale a 1280x720 stage to fit the column */}
              <div className="absolute inset-0">
                <div
                  className="origin-top-left"
                  style={{
                    width: 1280,
                    height: 720,
                    transform: "scale(var(--slide-scale, 1))",
                    transformOrigin: "top left",
                  }}
                  ref={(el) => {
                    if (!el) return;
                    const parent = el.parentElement;
                    if (!parent) return;
                    const apply = () => {
                      const w = parent.clientWidth;
                      const h = parent.clientHeight;
                      const s = Math.min(w / 1280, h / 720);
                      el.style.setProperty("--slide-scale", String(s));
                    };
                    apply();
                    const ro = new ResizeObserver(apply);
                    ro.observe(parent);
                  }}
                >
                  <div style={{ width: 1280, height: 720, overflow: "hidden" }}>
                    <SlideComponent
                      key={slide.id}
                      id={slide.id}
                      slideNumber={currentSlide}
                      {...((slide as any).dividerProps ?? {})}
                      {...((slide as any).sectionProps ?? {})}
                      {...(slide.id === "exec3-slide-platform"
                        ? {
                            jumpTargets: {
                              dtop: "exec3-divider-dtop",
                              mobile: "exec3-divider-mobile",
                              intelligence: "exec3-divider-intelligence",
                              core: "exec3-divider-dtop",
                            },
                          }
                        : {})}
                      {...(slide.id === "exec3-slide-insights-summary"
                        ? {
                            title: "The Platform · Insights & Intelligence",
                            subtitle: "A platform-wide intelligence capability — just by asking",
                            showWorkflow: true,
                          }
                        : {})}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border/40 px-4 py-2">
              <Button size="sm" variant="ghost" onClick={goPrev} disabled={currentSlide === 0}>
                <ChevronLeft className="mr-1 h-4 w-4" /> Prev
              </Button>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>
                  Slide {currentSlide + 1} / {total} — <span className="text-foreground">{slide.label}</span>
                </span>
                {session.status === "connected" && (
                  (slide as any).isTransition ? (
                    <span className="text-[11px] text-muted-foreground/80">Section divider — buyer is waiting</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[11px]">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          session.isSpeaking
                            ? "animate-pulse bg-amber-400"
                            : buyerFollowing
                            ? "bg-emerald-400"
                            : "bg-muted-foreground/50"
                        }`}
                      />
                      <span className="text-muted-foreground">
                        {session.isSpeaking
                          ? "Buyer speaking"
                          : buyerFollowing
                          ? "Buyer following"
                          : "Buyer listening"}
                      </span>
                    </span>
                  )
                )}
              </div>
              <Button size="sm" variant="ghost" onClick={goNext} disabled={currentSlide === total - 1}>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Right: session panel */}
          <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
            <Card className="flex min-h-[320px] flex-[2] flex-col bg-card/60">
              <div className="flex items-center justify-between border-b border-border/40 px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full border ${persona?.borderColor ?? "border-border"} ${persona?.bgColor ?? ""}`}>
                    <PersonaIcon className={`h-3.5 w-3.5 ${persona?.color ?? "text-foreground"}`} />
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      session.status === "connected"
                        ? session.isSpeaking
                          ? "animate-pulse bg-amber-400"
                          : "bg-emerald-400"
                        : session.status === "connecting"
                        ? "animate-pulse bg-primary"
                        : "bg-muted-foreground/40"
                    }`}
                  />
                  <div>
                    <div className="text-sm font-medium leading-tight">{scenario.buyerLabel}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {session.status === "connected"
                        ? session.isSpeaking
                          ? "Buyer speaking…"
                          : "Listening — your turn"
                        : session.status === "connecting"
                        ? "Connecting…"
                        : `Ready · ${difficulty}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {session.status === "disconnected" ? (
                    <Button onClick={handleStart} disabled={!canStart} size="sm">
                      <Play className="mr-2 h-4 w-4" /> Start
                    </Button>
                  ) : (
                    <Button onClick={handleEnd} variant="destructive" size="sm">
                      <Square className="mr-2 h-4 w-4" /> End
                    </Button>
                  )}
                </div>
              </div>

              <ScrollArea className="flex-1 px-5 py-4">
                {session.transcript.length === 0 && session.status === "disconnected" && (
                  <div className="flex h-full min-h-[260px] flex-col gap-3 text-sm">
                    <div className="rounded-lg border border-border/50 bg-background/40 p-3">
                      <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">How this works</div>
                      <ol className="space-y-1.5 text-xs text-muted-foreground">
                        <li className="flex gap-2"><span className="font-semibold text-foreground">1.</span> Pick a buyer above — each one reacts through a different lens.</li>
                        <li className="flex gap-2"><span className="font-semibold text-foreground">2.</span> Press <span className="rounded bg-muted/60 px-1 text-foreground">Start</span> and allow your microphone. The buyer opens the call.</li>
                        <li className="flex gap-2"><span className="font-semibold text-foreground">3.</span> Deliver each slide. Use <span className="rounded bg-muted/60 px-1 text-foreground">→</span> / <span className="rounded bg-muted/60 px-1 text-foreground">←</span> or the rail to advance — the buyer follows.</li>
                        <li className="flex gap-2"><span className="font-semibold text-foreground">4.</span> Hit <span className="rounded bg-muted/60 px-1 text-foreground">End</span> then <span className="rounded bg-muted/60 px-1 text-foreground">Score session</span> for an AI scorecard.</li>
                      </ol>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Mic className="h-4 w-4 opacity-40" />
                      <span>Currently practicing as <span className="text-foreground">{scenario.buyerLabel}</span> · {scenario.lens}</span>
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  {session.transcript.map((t, i) => (
                    <div
                      key={i}
                      className={`flex ${t.role === "rep" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          t.role === "rep"
                            ? "bg-primary/15 text-foreground"
                            : "bg-muted/40 text-foreground"
                        }`}
                      >
                        <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {t.role === "rep" ? "You" : "Buyer"}
                        </div>
                        {t.text}
                      </div>
                    </div>
                  ))}
                  <div ref={transcriptEndRef} />
                </div>
              </ScrollArea>

              {session.error && (
                <div className="flex items-start justify-between gap-3 border-t border-destructive/30 bg-destructive/10 px-5 py-3 text-xs text-destructive">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{session.error}</span>
                  </div>
                  {session.status === "disconnected" && session.errorCode !== "MIC_NOT_FOUND" && (
                    <Button size="sm" variant="outline" className="h-7 shrink-0" onClick={handleStart}>
                      <RefreshCw className="mr-1.5 h-3 w-3" /> Retry
                    </Button>
                  )}
                </div>
              )}
            </Card>

            {/* Scrollable side stack — checklist, score CTA, scorecard */}
            <div className="flex flex-1 min-h-0 flex-col gap-3 overflow-y-auto pr-1">
            {/* Prep checklist — visible before the call, hidden during, returns post-score with ✓/✗ */}
            {(session.status === "disconnected" || session.scorecard) && (
              <Card className="bg-card/60 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {session.scorecard ? "Key messages — result" : "Prep checklist — messages to land"}
                  </div>
                </div>
                <ul className="mt-2 space-y-1 text-xs">
                  {scenario.keyMessages.map((m) => {
                    const status = session.scorecard?.keyMessageStatus?.find((s) => s.message === m);
                    const landed = status?.landed;
                    const showResult = !!session.scorecard && status !== undefined;
                    return (
                      <li key={m} className="flex items-start gap-2">
                        <span className={
                          showResult
                            ? landed ? "text-emerald-400" : "text-rose-400"
                            : "text-primary"
                        }>
                          {showResult ? (landed ? "✓" : "○") : "•"}
                        </span>
                        <span className={showResult && !landed ? "text-muted-foreground line-through" : "text-foreground/90"}>
                          {m}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            )}

            {/* Score CTA — only after the call ends */}
            {session.status === "disconnected" && session.transcript.length > 0 && !session.scorecard && (
              <Card className="flex items-center justify-between bg-card/60 p-3">
                <div>
                  <div className="text-sm font-semibold">Get your AI scorecard</div>
                  <div className="text-xs text-muted-foreground">Persona-aware grading, per-objection feedback, coaching drills.</div>
                </div>
                <Button
                  size="sm"
                  disabled={session.scoring}
                  onClick={() => session.scoreSession()}
                >
                  {session.scoring ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scoring…</> : "Score session"}
                </Button>
              </Card>
            )}

            {session.scoreError && (
              <Card className="bg-destructive/10 p-3 text-xs text-destructive">{session.scoreError}</Card>
            )}

            {session.scorecard && (
              <Card className="space-y-4 bg-card/60 p-5">
                <div className="flex items-baseline gap-3">
                  <div className="font-display text-4xl font-semibold text-primary">{session.scorecard.overall}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Overall / 100</div>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {Object.entries(session.scorecard.rubric ?? {}).map(([k, v]) => (
                    <div key={k} className="rounded-md border border-border/40 bg-background/40 p-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                        <span className="text-primary">{v.score}/5</span>
                      </div>
                      <div className="mt-1 text-[11px] leading-snug text-muted-foreground">{v.feedback}</div>
                      {v.quote && (
                        <div className="mt-1 text-[10px] italic text-muted-foreground/80">"{v.quote}"</div>
                      )}
                    </div>
                  ))}
                </div>

                {session.scorecard.objectionsAnswered && session.scorecard.objectionsAnswered.length > 0 && (
                  <div>
                    <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Objections handled</div>
                    <ul className="space-y-1.5 text-xs">
                      {session.scorecard.objectionsAnswered.map((o) => (
                        <li key={o.objection} className="rounded-md border border-border/30 bg-background/30 p-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-foreground/90">"{o.objection}"</span>
                            <span className={o.addressed ? "text-emerald-400" : "text-rose-400"}>
                              {o.addressed ? `${o.quality}/5` : "missed"}
                            </span>
                          </div>
                          {o.comment && <div className="mt-1 text-[11px] text-muted-foreground">{o.comment}</div>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {session.scorecard.strengths?.length > 0 && (
                  <div className="text-xs">
                    <div className="font-semibold text-emerald-400">Strengths</div>
                    <ul className="mt-1 space-y-0.5 text-muted-foreground">
                      {session.scorecard.strengths.map((s) => <li key={s}>• {s}</li>)}
                    </ul>
                  </div>
                )}
                {session.scorecard.improvements?.length > 0 && (
                  <div className="text-xs">
                    <div className="font-semibold text-amber-400">Improve</div>
                    <ul className="mt-1 space-y-0.5 text-muted-foreground">
                      {session.scorecard.improvements.map((s) => <li key={s}>• {s}</li>)}
                    </ul>
                  </div>
                )}
                {session.scorecard.coachingScript && session.scorecard.coachingScript.length > 0 && (
                  <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-xs">
                    <div className="mb-1 font-semibold text-primary">Drill next time</div>
                    <ul className="space-y-1 text-foreground/90">
                      {session.scorecard.coachingScript.map((s, i) => (
                        <li key={i} className="flex gap-2"><span className="text-primary">{i + 1}.</span><span>{s}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}