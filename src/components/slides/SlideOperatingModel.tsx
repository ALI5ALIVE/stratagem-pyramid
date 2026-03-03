import { Eye, Zap, Link2, Target, ArrowRight, Plane } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

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

const SlideOperatingModel = ({
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
      id="slide-operating-model"
      title="The Operating Model"
      subtitle="DTOP — the framework behind the programme and what Flying High should do"
      slideNumber={2}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-4 h-full overflow-hidden">

        {/* Framing statement */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl px-5 py-4">
          <p className="text-sm text-foreground leading-relaxed font-medium">
            Operational performance improves when organisations can <strong>detect</strong> what matters, 
            <strong> trigger</strong> the right response, <strong>orchestrate</strong> action across teams, 
            and <strong>improve</strong> continuously — without raising risk.
          </p>
        </div>

        {/* DTOP Model */}
        <div className="bg-card/60 border border-border/50 rounded-xl p-5 flex-1 flex flex-col">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-4">
            DTOP — Detect · Trigger · Orchestrate · Improve
          </p>
          <div className="grid grid-cols-4 gap-3 flex-1">
            {dtopSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="relative flex flex-col items-center text-center gap-3 bg-background/40 border border-border/30 rounded-xl p-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground">{step.label}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{step.description}</p>
                  {i < 3 && (
                    <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* What Flying High Should Do */}
        <div className="bg-card/60 border border-border/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Plane className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">What Flying High Should Do</h3>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
            Position the brand around a stronger market idea: aviation organisations raise performance 
            by creating line of sight across content, safety, training, compliance and IT — then turning 
            that visibility into coordinated action, continuous readiness, and measurable improvement.
          </p>
          <div className="flex gap-3">
            {programmeGoals.map((item, i) => (
              <div key={item} className="flex-1 flex items-start gap-2 bg-background/40 border border-border/30 rounded-lg px-3 py-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[10px] text-foreground/80 font-medium leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideOperatingModel;
