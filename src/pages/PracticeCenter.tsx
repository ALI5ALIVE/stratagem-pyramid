import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, Play, Square, Loader2, AlertCircle, Sparkles, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { practiceScenarios, difficulties, type Difficulty, type PracticeScenario } from "@/data/practiceScenarios";
import { useRoleplaySession } from "@/hooks/useRoleplaySession";

const AGENT_ID = "agent_5601krecj299fy28nwehe96cejrm";
const DECK_ROUTE = "/pitch-executive-3";

export default function PracticeCenter() {
  const [scenarioId, setScenarioId] = useState<string>(practiceScenarios[0].id);
  const [difficulty, setDifficulty] = useState<Difficulty>("skeptical");

  const session = useRoleplaySession();
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const scenario: PracticeScenario = useMemo(
    () => practiceScenarios.find((s) => s.id === scenarioId) ?? practiceScenarios[0],
    [scenarioId],
  );

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session.transcript.length]);

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
              Slides on the left, transcript on the right. Pick the buyer persona and difficulty, then press Start and walk the deck.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={DECK_ROUTE} target="_blank" rel="noreferrer">
              <Maximize2 className="mr-2 h-4 w-4" /> Open deck full screen
            </a>
          </Button>
        </div>

        {/* Compact scenario + difficulty bar */}
        <Card className="mb-4 flex flex-col gap-3 bg-card/60 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Buyer</span>
            {practiceScenarios.map((s) => {
              const active = s.id === scenarioId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => session.status === "disconnected" && setScenarioId(s.id)}
                  disabled={session.status !== "disconnected"}
                  className={`rounded-md border px-3 py-1.5 text-xs transition ${
                    active
                      ? "border-primary/60 bg-primary/10 text-foreground"
                      : "border-border/60 bg-card text-muted-foreground hover:border-primary/30"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {s.buyerLabel}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
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
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-[1.6fr,1fr]">
          {/* Left: live slide deck */}
          <Card className="overflow-hidden bg-black/40 p-0">
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                key={scenarioId}
                src={DECK_ROUTE}
                title="Medium Executive Pitch"
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay; clipboard-write; microphone"
              />
            </div>
            <div className="flex items-center justify-between border-t border-border/40 px-4 py-2 text-xs text-muted-foreground">
              <span>Use ↑ ↓ ← → inside the slide area to navigate. Press Start above to begin the call.</span>
            </div>
          </Card>

          {/* Right: session panel */}
          <div className="space-y-4">
            <Card className="flex h-[560px] flex-col bg-card/60">
              <div className="flex items-center justify-between border-b border-border/40 px-5 py-3">
                <div className="flex items-center gap-3">
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
                  <div className="text-sm font-medium">
                    {session.status === "connected"
                      ? session.isSpeaking
                        ? "Buyer speaking…"
                        : "Listening — your turn"
                      : session.status === "connecting"
                      ? "Connecting…"
                      : "Idle"}
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