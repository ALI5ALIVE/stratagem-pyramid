import { Plane, AlertTriangle, Eye, Zap, Link2, Target } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

const fragmentationProblems = [
  "Issues are identified, but action is inconsistent",
  "Training is delivered, but readiness is not always clear",
  "Compliance activity is completed, but operational impact is difficult to track",
  "Content is produced, but not always connected to behaviour change or operational follow-through",
  "Leaders can see activity, but not always line of sight from work to outcome",
];

const dtopSteps = [
  { label: "Detect", icon: Eye, description: "What matters" },
  { label: "Trigger", icon: Zap, description: "The right response" },
  { label: "Orchestrate", icon: Link2, description: "Action across teams" },
  { label: "Improve", icon: Target, description: "Continuously without raising risk" },
];

const programmeGoals = [
  "Challenge the current model",
  "Teach what operational performance really means",
  "Introduce DTOP as the new operating model",
  "Explain how signals drive action",
  "Help buying groups prove progress over time",
];

const SlideStrategyOverview = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="slide-strategy-overview"
      title="Strategy Overview"
      subtitle="Why this programme exists and the idea at its centre"
      slideNumber={1}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-4 h-full overflow-hidden">
        {/* Core idea hero */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl px-6 py-5">
          <div className="flex items-center gap-2 mb-2">
            <Plane className="w-5 h-5 text-primary" />
            <p className="text-[10px] text-primary uppercase tracking-widest font-semibold">The Central Idea</p>
          </div>
          <p className="text-sm text-foreground leading-relaxed font-medium max-w-4xl">
            Aviation organisations do not improve performance through safety, training, compliance, content, or IT in isolation. 
            They improve performance when those functions work together through a shared model that helps teams see what matters, 
            act with consistency, maintain readiness, and prove progress over time.
          </p>
        </div>

        {/* DTOP strip */}
        <div className="grid grid-cols-4 gap-3">
          {dtopSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center gap-3 bg-card/60 border border-border/40 rounded-lg px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{step.label}</p>
                  <p className="text-[10px] text-muted-foreground">{step.description}</p>
                </div>
                {i < 3 && (
                  <div className="ml-auto text-primary/40 text-lg font-light">→</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Two columns */}
        <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
          {/* Market challenge */}
          <div className="bg-card/60 border border-border/50 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-foreground">The Market Challenge</h3>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
              Most organisations still manage performance through separate improvement streams. Safety teams focus on one 
              set of issues. Training teams focus on another. Compliance teams work to maintain control and evidence. Content 
              sits elsewhere. IT often supports systems rather than performance outcomes.
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
              The result is a fragmented model where teams work hard, but progress is harder to connect, coordinate, and prove.
            </p>
            <div className="space-y-2 flex-1">
              {fragmentationProblems.map((problem, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-[11px] text-foreground/80 leading-snug">{problem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What the programme should do */}
          <div className="bg-card/60 border border-border/50 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Plane className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">What Flying High Should Do</h3>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
              Position the brand around a stronger market idea: aviation organisations raise 
              performance by creating line of sight across content, safety, training, compliance 
              and IT — then turning that visibility into coordinated action, continuous readiness 
              and measurable improvement.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-auto">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">The Programme Should</p>
              <div className="space-y-1.5">
                {programmeGoals.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    <span className="text-[11px] text-foreground/80 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key framing note */}
            <div className="mt-3 pt-3 border-t border-border/30">
              <p className="text-[10px] text-foreground/70 leading-relaxed italic">
                That makes this a content programme about performance, not a campaign about product features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideStrategyOverview;
