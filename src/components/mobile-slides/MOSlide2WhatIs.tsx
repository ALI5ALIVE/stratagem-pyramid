import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { elevatorPitch } from "@/data/mobilePlaybook";
import { ArrowRight, Smartphone, CheckCircle2 } from "lucide-react";

const MOSlide2WhatIs = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="mo-what" title="What It Is" subtitle="One trusted shell, three mini-apps inside." slideNumber={2} {...props}>
      <div className="h-full flex flex-col gap-4">
        <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
          <p className="text-sm sm:text-base text-foreground leading-relaxed">{elevatorPitch.oneLiner}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 flex-1">
          {elevatorPitch.shifts.map((shift, i) => (
            <div key={i} className="p-3 rounded-lg border border-border bg-card flex flex-col gap-2">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
              <div className="text-xs text-muted-foreground line-through">{shift.from}</div>
              <div className="text-[10px] uppercase tracking-wider text-primary">To</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">{shift.to}</div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
          <p className="text-[10px] uppercase tracking-wider text-amber-300 mb-1">The shift in one sentence</p>
          <p className="text-sm text-foreground font-display mb-2">"{elevatorPitch.exampleQuestion}"</p>
          <p className="text-xs text-foreground/80 leading-relaxed">{elevatorPitch.exampleAnswer}</p>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg border border-border bg-card/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Smartphone className="h-4 w-4 text-blue-400" />
            One Shell
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="text-xs text-muted-foreground">SSO</div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="text-xs text-muted-foreground">Mini-Apps</div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-2 text-xs text-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Connected Workflows
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default MOSlide2WhatIs;
