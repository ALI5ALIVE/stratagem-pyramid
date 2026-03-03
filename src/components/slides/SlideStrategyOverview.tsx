import { AlertTriangle, Plane, Eye, Zap, Link2, Target, ArrowRight } from "lucide-react";
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

const programmeFlow = [
  "Challenge the current model",
  "Teach what operational performance really means",
  "Introduce DTOP as the new operating model",
  "Explain how signals drive action",
  "Help buying groups prove progress over time",
];

const dtopSteps = [
  { label: "Detect", icon: Eye, description: "What matters" },
  { label: "Trigger", icon: Zap, description: "The right response" },
  { label: "Orchestrate", icon: Link2, description: "Action across teams" },
  { label: "Improve", icon: Target, description: "Continuously without raising risk" },
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
      <div className="flex-1 flex flex-col gap-3 h-full overflow-hidden">

        {/* Row 1: The Market Challenge */}
        <div className="bg-card/60 border border-border/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-amber-400/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-foreground">The Market Challenge</h3>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
            Most organisations still manage performance through separate improvement streams. Safety teams focus on one 
            set of issues. Training teams focus on another. Compliance teams work to maintain control and evidence. Content 
            sits elsewhere. IT often supports systems rather than performance outcomes. The result is a fragmented model 
            where teams work hard, but progress is harder to connect, coordinate, and prove.
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {fragmentationProblems.map((problem, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span className="text-[10px] text-foreground/80 leading-snug">{problem}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: The Central Idea — the answer to the challenge */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl px-5 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Plane className="w-5 h-5 text-primary" />
            <p className="text-[10px] text-primary uppercase tracking-widest font-semibold">The Central Idea</p>
          </div>
          <p className="text-sm text-foreground leading-relaxed font-medium max-w-4xl">
            Operational performance improves when organisations can detect what matters, trigger the right response, 
            orchestrate action across teams, and improve continuously — without raising risk.
          </p>
          <p className="text-[10px] text-muted-foreground mt-2 italic">
            That makes this a content programme about performance, not a campaign about product features.
          </p>
        </div>

        {/* Row 3: Two columns — DTOP model + Programme flow */}
        <div className="flex-1 grid grid-cols-5 gap-3 overflow-hidden">

          {/* DTOP — the operating model behind the idea */}
          <div className="col-span-3 bg-card/60 border border-border/50 rounded-xl p-4 flex flex-col">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-3">
              The Operating Model — DTOP
            </p>
            <div className="grid grid-cols-4 gap-2 flex-1">
              {dtopSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="relative flex flex-col items-center text-center gap-2 bg-background/40 border border-border/30 rounded-lg p-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-xs font-bold text-foreground">{step.label}</p>
                    <p className="text-[10px] text-muted-foreground leading-snug">{step.description}</p>
                    {i < 3 && (
                      <ArrowRight className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40 z-10" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* What the programme should do */}
          <div className="col-span-2 bg-card/60 border border-border/50 rounded-xl p-4 flex flex-col">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-3">
              What Flying High Should Do
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
              Position the brand around a stronger market idea: aviation organisations raise performance 
              by creating line of sight across content, safety, training, compliance and IT.
            </p>
            <div className="space-y-2 mt-auto">
              {programmeFlow.map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[9px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[10px] text-foreground/80 font-medium leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideStrategyOverview;
