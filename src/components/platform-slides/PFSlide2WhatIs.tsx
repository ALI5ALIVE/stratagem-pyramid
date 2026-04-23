import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { platformDefinition } from "@/data/platformPlaybook";
import { ArrowRight } from "lucide-react";

const PFSlide2WhatIs = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="pf-what"
      title="What It Is"
      subtitle="One connected platform — defined by what it joins together."
      slideNumber={2}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="p-3 rounded-xl border border-primary/30 bg-primary/5 shrink-0">
          <p className="text-sm sm:text-base text-foreground leading-relaxed">{platformDefinition.oneLiner}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 shrink-0">
          {platformDefinition.shifts.map((shift, i) => (
            <div key={i} className="p-2.5 rounded-lg border border-border bg-card flex flex-col gap-1.5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
              <div className="text-xs text-muted-foreground line-through leading-snug">{shift.from}</div>
              <div className="text-[10px] uppercase tracking-wider text-primary mt-1">To</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground leading-snug">{shift.to}</div>
            </div>
          ))}
        </div>

        <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-3 shrink-0">
          <ArrowRight className="h-4 w-4 text-emerald-400 shrink-0" />
          <p className="text-sm text-foreground font-display">{platformDefinition.signatureLine}</p>
        </div>

        <p className="text-[11px] text-muted-foreground/70 italic mt-1">
          The five shifts are illustrative — each shift maps to one architecture layer covered in the deep-dives that follow.
        </p>
      </div>
    </SlideContainer>
  );
};

export default PFSlide2WhatIs;
