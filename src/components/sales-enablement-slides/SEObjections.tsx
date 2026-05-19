import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { expandedObjections } from "@/data/week3FieldKit";
import { Hand, Repeat, ArrowRight, FileCheck2 } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const SEObjections = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-objections"
    slideNumber={slideNumber}
    title="Objections cheat sheet"
    subtitle="Eight pushbacks you'll hear. Acknowledge → Reframe → Bridge. Plus the proof artifact to send right after the call."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-1 max-w-7xl mx-auto px-4 pt-2">
      {expandedObjections.map((o, i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-2 grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-3 flex items-start gap-1.5">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 shrink-0">
              #{i + 1}
            </span>
            <p className="text-[11px] font-semibold text-foreground italic leading-snug">"{o.objection}"</p>
          </div>
          <div className="col-span-6 md:col-span-2 border-l border-border/40 md:pl-2">
            <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-amber-400 mb-0.5">
              <Hand className="h-2.5 w-2.5" /> Acknowledge
            </div>
            <p className="text-[10.5px] text-foreground/85 leading-snug">{o.acknowledge}</p>
          </div>
          <div className="col-span-6 md:col-span-3 border-l border-border/40 md:pl-2">
            <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-violet-400 mb-0.5">
              <Repeat className="h-2.5 w-2.5" /> Reframe
            </div>
            <p className="text-[10.5px] text-foreground/85 leading-snug">{o.reframe}</p>
          </div>
          <div className="col-span-6 md:col-span-2 border-l border-border/40 md:pl-2">
            <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-primary mb-0.5">
              <ArrowRight className="h-2.5 w-2.5" /> Bridge
            </div>
            <p className="text-[10.5px] italic text-foreground/85 leading-snug">"{o.bridge}"</p>
          </div>
          <div className="col-span-6 md:col-span-2 border-l border-border/40 md:pl-2">
            <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-emerald-300 mb-0.5">
              <FileCheck2 className="h-2.5 w-2.5" /> Send next
            </div>
            <p className="text-[10.5px] text-foreground/85 leading-snug">{o.proofArtifact}</p>
          </div>
        </div>
      ))}
    </div>
  </PitchSlideContainer>
);

export default SEObjections;