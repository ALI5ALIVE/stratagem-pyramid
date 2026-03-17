import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/lineOfSightData";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const formatCurrency = (v: number) => v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `$${(v / 1_000).toFixed(0)}K` : `$${v}`;

const safetyIds = ["uc1", "uc5", "uc6"];

const TechSlide10SafetyUseCases = ({ slideNumber, ...narrationProps }: Props) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const cases = useCases.filter((uc) => safetyIds.includes(uc.id));

  return (
    <SalesSlideContainer id="tech-slide-10" title="Use Cases: Safety" subtitle="Go-arounds, crew injuries, and regulatory fines — full DTOP chain with costed outcomes" slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 flex flex-col gap-3">
        {cases.map((uc) => {
          const annual = uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor;
          const isOpen = expanded === uc.id;
          const dtopParts = uc.platformMechanism.split(" → ");
          return (
            <button key={uc.id} onClick={() => setExpanded(isOpen ? null : uc.id)} className={cn("rounded-xl border border-muted/20 bg-muted/5 p-4 text-left transition-all flex flex-col", isOpen && "ring-1 ring-primary")}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-foreground">{uc.label}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-semibold">{formatCurrency(annual)}/yr</span>
                    <span className="text-[10px] text-muted-foreground">{uc.input.costPerEvent}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{uc.description}</p>
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
              </div>
              {isOpen && (
                <div className="mt-4 pt-3 border-t border-muted/20 space-y-3">
                  {/* DTOP chain */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">DTOP Chain</span>
                    <div className="flex items-start gap-2 mt-2 flex-wrap">
                      {dtopParts.map((part, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <span className="text-[10px] px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 text-foreground/80">{part.trim()}</span>
                          {i < dtopParts.length - 1 && <span className="text-primary/40">→</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Cost components */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">Cost Components</span>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {uc.input.costComponents.map((c) => (<span key={c} className="text-[10px] px-2 py-0.5 rounded-full border border-muted/20 bg-muted/10 text-muted-foreground">{c}</span>))}
                    </div>
                  </div>
                  {/* Point solution gap */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">Point Solution Gap</span>
                    <p className="text-[11px] text-muted-foreground mt-1 italic">{uc.pointSolutionGap}</p>
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

export default TechSlide10SafetyUseCases;
