import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/lineOfSightData";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const formatCurrency = (v: number) => v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `$${(v / 1_000).toFixed(0)}K` : `$${v}`;

const opsIds = ["uc2", "uc3", "uc4", "uc8"];

const TechSlide11OpsUseCases = ({ slideNumber, ...narrationProps }: Props) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const cases = useCases.filter((uc) => opsIds.includes(uc.id));

  return (
    <SalesSlideContainer id="tech-slide-11" title="Use Cases: Operations" subtitle="AOG, delays, fuel performance, and baggage — full DTOP chain with costed outcomes" slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
        {cases.map((uc) => {
          const annual = uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor;
          const isOpen = expanded === uc.id;
          const dtopParts = uc.platformMechanism.split(" → ");
          return (
            <button key={uc.id} onClick={() => setExpanded(isOpen ? null : uc.id)} className={cn("rounded-xl border border-muted/20 bg-muted/5 p-3 text-left transition-all flex flex-col overflow-auto", isOpen && "ring-1 ring-primary")}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-foreground truncate">{uc.label}</h3>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-semibold">{formatCurrency(annual)}/yr</span>
                  {isOpen ? <ChevronUp className="h-3 w-3 text-muted-foreground" /> : <ChevronDown className="h-3 w-3 text-muted-foreground" />}
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{uc.description}</p>
              {isOpen && (
                <div className="mt-3 pt-2 border-t border-muted/20 space-y-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60">DTOP Chain</span>
                    <div className="flex items-start gap-1 mt-1 flex-wrap">
                      {dtopParts.map((p, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-foreground/80">{p.trim()}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60">Cost Components</span>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {uc.input.costComponents.map((c) => (<span key={c} className="text-[9px] px-1.5 py-0.5 rounded-full border border-muted/20 bg-muted/10 text-muted-foreground">{c}</span>))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60">Gap</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5 italic">{uc.pointSolutionGap}</p>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide11OpsUseCases;
