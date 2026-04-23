import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { objections } from "@/data/dtopPlaybook";
import { Hand, Repeat, ArrowRight } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

// Acknowledge → Reframe → Bridge structure derived from existing playbook content.
const acknowledgements = [
  "Totally fair — most operators are.",
  "Good — that's the right foundation.",
  "That's a sensible starting point.",
  "Agreed — basics matter.",
  "Understood — budget pressure is real.",
];

const bridges = [
  "Want to see what 'beyond detect' looks like in a 20-minute demo?",
  "Can I show you how the LMS gets smarter when it's wired to live safety data?",
  "Want to see content that reacts to operational events?",
  "Want to see DTOP working with rules-only — no AI required?",
  "Want to see a 90-day pilot scoped to your highest-cost use case?",
];

const SEObjections = ({ slideNumber, ...narrationProps }: Props) => {
  const top5 = objections.slice(0, 5);
  return (
    <PitchSlideContainer
      id="se-objections"
      slideNumber={slideNumber}
      title="Objections cheat sheet"
      subtitle="Top 5 pushbacks · 3-part response: Acknowledge → Reframe → Bridge."
      showHeader
      {...narrationProps}
    >
      <div className="h-full flex flex-col gap-2 max-w-7xl mx-auto px-4 pt-3">
        {top5.map((o, i) => (
          <div key={i} className="p-3 rounded-lg border border-border bg-card">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 shrink-0">
                #{i + 1}
              </span>
              <p className="text-xs font-semibold text-foreground italic">"{o.objection}"</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              <div className="p-2 rounded border border-border bg-background/50">
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                  <Hand className="h-3 w-3" /> Acknowledge
                </div>
                <p className="text-[11px] text-foreground/80">{acknowledgements[i]}</p>
              </div>
              <div className="p-2 rounded border border-border bg-background/50">
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-violet-400 mb-1">
                  <Repeat className="h-3 w-3" /> Reframe
                </div>
                <p className="text-[11px] text-foreground/80 leading-snug">{o.reframe}</p>
              </div>
              <div className="p-2 rounded border border-primary/30 bg-primary/5">
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary mb-1">
                  <ArrowRight className="h-3 w-3" /> Bridge to demo
                </div>
                <p className="text-[11px] text-foreground italic">"{bridges[i]}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PitchSlideContainer>
  );
};

export default SEObjections;