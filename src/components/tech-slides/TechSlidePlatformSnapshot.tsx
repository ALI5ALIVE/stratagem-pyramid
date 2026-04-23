import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { platformDefinition } from "@/data/platformPlaybook";
import { ArrowRight } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

/**
 * Tech-deck clone of PFSlide2WhatIs — tightened density.
 * Sits after Industry Challenge to give a one-glance snapshot of the platform.
 */
const TechSlidePlatformSnapshot = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-3b-platform-snapshot"
    title="What the Platform Is — at a Glance"
    subtitle="One connected platform — defined by what it joins together."
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-3 min-h-0">
      <div className="p-3 rounded-xl border border-primary/30 bg-primary/5 shrink-0">
        <p className="text-sm text-foreground leading-relaxed">{platformDefinition.oneLiner}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 flex-1 min-h-0">
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
    </div>
  </SalesSlideContainer>
);

export default TechSlidePlatformSnapshot;