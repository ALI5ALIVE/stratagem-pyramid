import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { elevatorPitch } from "@/data/automationPlaybook";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";

const AUSlide2WhatIs = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="au-what"
      title="What It Is"
      subtitle="A modern, embedded orchestration layer — built into Comply365"
      slideNumber={2}
      {...props}
    >
      <div className="h-full flex flex-col gap-4">
        <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
          <p className="text-sm sm:text-base text-foreground leading-relaxed">{elevatorPitch.oneLiner}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 flex-shrink-0">
          {elevatorPitch.shifts.map((s, i) => (
            <div key={i} className="p-3 rounded-lg border border-border bg-card flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">From</span>
              <span className="text-xs text-muted-foreground line-through decoration-destructive/60">{s.from}</span>
              <span className="text-[10px] uppercase tracking-wider text-primary">To</span>
              <span className="text-xs font-semibold text-foreground">{s.to}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-0">
          <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="text-[10px] uppercase tracking-wider text-amber-300 font-medium">Trigger</span>
            </div>
            <p className="text-base sm:text-lg font-display text-foreground leading-snug">
              "{elevatorPitch.exampleQuestion}"
            </p>
          </div>
          <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-medium">What happens</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{elevatorPitch.exampleAnswer}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Event</span>
          <ArrowRight className="h-3 w-3" />
          <span>Orchestration</span>
          <ArrowRight className="h-3 w-3" />
          <span>Workflow</span>
          <ArrowRight className="h-3 w-3" />
          <span className="text-primary">Connected Action</span>
        </div>
      </div>
    </SlideContainer>
  );
};

export default AUSlide2WhatIs;
