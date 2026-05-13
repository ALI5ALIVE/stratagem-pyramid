import { useEffect, useMemo, useRef, useState } from "react";
import {
  Mic, Play, Square, Loader2, AlertCircle, Sparkles, Maximize2,
  ChevronLeft, ChevronRight, BookOpen, Check,
  Briefcase, Shield, Plane, GraduationCap, Monitor, Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { practiceScenarios, difficulties, type Difficulty, type PracticeScenario } from "@/data/practiceScenarios";
import { useRoleplaySession } from "@/hooks/useRoleplaySession";
import { execPitch3Slides } from "@/data/execPitch3Slides";
import { buildKnowledgeDocs, KB_NAME_PREFIX } from "@/lib/practice/buildKnowledgeDocs";
import { supabase } from "@/integrations/supabase/client";
import { personaProfiles } from "@/data/personaProfiles";
import { getPersonaSlideFlavor } from "@/lib/practice/buildAgentPrompt";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const PERSONA_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase, Shield, Plane, GraduationCap, Monitor,
};

const AGENT_ID = "agent_5601krecj299fy28nwehe96cejrm";
const DECK_ROUTE = "/pitch-executive-3";

export default function PracticeCenter() {
  const [scenarioId, setScenarioId] = useState<string>(practiceScenarios[0].id);
  const [difficulty, setDifficulty] = useState<Difficulty>("skeptical");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const session = useRoleplaySession();
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const lastNotifiedSlideRef = useRef<number>(-1);

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

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session.transcript.length]);

  const total = execPitch3Slides.length;
  const slide = execPitch3Slides[currentSlide];
  const SlideComponent = slide.component as React.ComponentType<any>;

  const goPrev = () => setCurrentSlide((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentSlide((i) => Math.min(total - 1, i + 1));

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

  // Notify the AI buyer of the current slide so its questions follow along.
  useEffect(() => {
    if (session.status !== "connected") return;
    if (lastNotifiedSlideRef.current === currentSlide) return;
    lastNotifiedSlideRef.current = currentSlide;
    const flavor = getPersonaSlideFlavor(scenario.personaId);
    session.sendContext(
      `The rep just moved to slide ${currentSlide + 1} of ${total}: "${slide.label}". ` +
      `Ask ONE short buyer-style question that probes THIS slide's topic specifically. ${flavor} Stay in character.`,
    );
  }, [currentSlide, session.status, slide.label, total, session, scenario.personaId]);

  // Reset slide-notification tracker when session ends/restarts
  useEffect(() => {
    if (session.status === "disconnected") {
      lastNotifiedSlideRef.current = -1;
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

  const handleSyncKnowledge = async () => {
    setSyncing(true);
    setSyncError(null);
    setSyncResult(null);
    try {
      const documents = await buildKnowledgeDocs();
      const { data, error } = await supabase.functions.invoke("elevenlabs-kb-sync", {
        body: { agentId: AGENT_ID, namePrefix: KB_NAME_PREFIX, documents },
      });
      if (error) throw new Error(error.message);
      if (!data?.ok) throw new Error(data?.error ?? "Sync failed");
      setSyncResult(`Synced ${data.created?.length ?? documents.length} documents to the agent's knowledge base.`);
    } catch (e) {
      setSyncError(e instanceof Error ? e.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" /> Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleSyncKnowledge(); }} disabled={syncing}>
                  {syncing ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Syncing knowledge…</>
                  ) : syncResult ? (
                    <><Check className="mr-2 h-4 w-4" /> Re-sync knowledge base</>
                  ) : (
                    <><BookOpen className="mr-2 h-4 w-4" /> Sync knowledge base</>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href={DECK_ROUTE} target="_blank" rel="noreferrer" className="flex items-center">
                    <Maximize2 className="mr-2 h-4 w-4" /> Open deck full screen
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {(syncResult || syncError) && (
          <div
            className={`mb-4 rounded-md border px-3 py-2 text-xs ${
              syncError
                ? "border-destructive/40 bg-destructive/10 text-destructive"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
            }`}
          >
            {syncError ?? syncResult}
          </div>
        )}

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

        <div className="grid gap-4 lg:grid-cols-[1.6fr,1fr]">
          {/* Left: embedded slide */}
          <Card className="overflow-hidden bg-black/40 p-0">
            <div className="relative w-full overflow-hidden bg-background" style={{ aspectRatio: "16 / 9" }}>
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
            <div className="flex items-center justify-between gap-3 border-t border-border/40 px-4 py-2">
              <Button size="sm" variant="ghost" onClick={goPrev} disabled={currentSlide === 0}>
                <ChevronLeft className="mr-1 h-4 w-4" /> Prev
              </Button>
              <div className="text-xs text-muted-foreground">
                Slide {currentSlide + 1} / {total} — <span className="text-foreground">{slide.label}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={goNext} disabled={currentSlide === total - 1}>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            {/* Slide chip rail — jump anywhere */}
            <div className="flex gap-1 overflow-x-auto border-t border-border/40 px-3 py-2">
              {execPitch3Slides.map((s, i) => {
                const active = i === currentSlide;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrentSlide(i)}
                    className={`shrink-0 rounded px-2 py-1 text-[10px] transition ${
                      active
                        ? "bg-primary/20 text-foreground ring-1 ring-primary/50"
                        : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                    }`}
                    title={s.label}
                  >
                    {i + 1}. {s.label}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Right: session panel */}
          <div className="space-y-4">
            <Card className="flex h-[560px] flex-col bg-card/60">
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
                  <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
                    <Mic className="h-8 w-8 opacity-40" />
                    <div>Press Start. Allow your microphone. The buyer will open the call.</div>
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
                <div className="flex items-start gap-2 border-t border-destructive/30 bg-destructive/10 px-5 py-3 text-xs text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{session.error}</span>
                </div>
              )}
            </Card>

            <Card className="bg-card/60 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Setup</div>
              <div className="mt-1 text-sm">{scenario.setup}</div>
              <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Key messages to land</div>
              <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                {scenario.keyMessages.map((m) => (
                  <li key={m} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Score panel */}
            <Card className="bg-card/60 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">AI Scorecard</div>
                  <div className="text-xs text-muted-foreground">
                    Run after a completed session. Grades discovery, objection handling, message accuracy, terminology, and next-step ask.
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={session.scoring || session.transcript.length === 0}
                  onClick={() => session.scoreSession()}
                >
                  {session.scoring ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scoring…</> : "Score session"}
                </Button>
              </div>

              {session.scoreError && (
                <div className="mt-3 text-xs text-destructive">{session.scoreError}</div>
              )}

              {session.scorecard && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-baseline gap-3">
                    <div className="font-display text-3xl font-semibold text-primary">
                      {session.scorecard.overall}
                    </div>
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
                      </div>
                    ))}
                  </div>
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
                  {session.scorecard.missedKeyMessages?.length > 0 && (
                    <div className="text-xs">
                      <div className="font-semibold text-rose-400">Missed key messages</div>
                      <ul className="mt-1 space-y-0.5 text-muted-foreground">
                        {session.scorecard.missedKeyMessages.map((s) => <li key={s}>• {s}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}