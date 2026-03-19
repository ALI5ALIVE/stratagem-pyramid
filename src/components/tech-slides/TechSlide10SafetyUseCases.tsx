import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/lineOfSightData";
import { Zap, TrendingDown, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const formatCurrency = (v: number) => v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `$${(v / 1_000).toFixed(0)}K` : `$${v}`;

const safetyIds = ["uc1", "uc5", "uc6"];

const parseDTOP = (mechanism: string) => {
  const parts = mechanism.split(" → ");
  return {
    detect: parts[0]?.replace(/^Detect\s*\(/, "").replace(/\)$/, "") || "",
    trigger: parts[1]?.replace(/^Trigger\s*\(/, "").replace(/\)$/, "") || "",
    orchestrate: parts[2]?.replace(/^Orchestrate\s*\(/, "").replace(/\)$/, "") || "",
    prove: parts[3]?.replace(/^Prove\s*\(/, "").replace(/\)$/, "") || "",
  };
};

const TechSlide10SafetyUseCases = ({ slideNumber, ...narrationProps }: Props) => {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const cases = useCases.filter((uc) => safetyIds.includes(uc.id));

  return (
    <SalesSlideContainer id="tech-slide-10" title="Use Cases: Safety" subtitle="Go-arounds, crew injuries, and regulatory fines — full DTOP chain with costed outcomes" slideNumber={slideNumber} {...narrationProps}>
      <div className="flex flex-col gap-3">
        {/* DTOP Legend */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Detect</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
            <TrendingDown className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">Trigger</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <FileText className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-xs font-medium text-cyan-500">Orchestrate</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-medium text-emerald-500">Prove</span>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((uc) => {
            const annual = uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor;
            const isExpanded = expandedCase === uc.id;
            const dtop = parseDTOP(uc.platformMechanism);

            return (
              <div
                key={uc.id}
                className={cn(
                  "bg-card/50 backdrop-blur-sm border rounded-xl p-3 cursor-pointer transition-all duration-300",
                  isExpanded ? "border-primary/30 shadow-lg shadow-primary/10" : "border-border/50 hover:border-primary/30"
                )}
                onClick={() => setExpandedCase(isExpanded ? null : uc.id)}
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{uc.label}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-semibold shrink-0">{formatCurrency(annual)}/yr</span>
                </div>
                <p className="text-[10px] text-muted-foreground mb-3">{uc.description}</p>

                {/* DTOP Timeline */}
                <div className="space-y-2">
                  <div className="relative pl-4 border-l-2 border-primary/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-0.5">Signal Detected</div>
                    <div className="text-xs font-medium text-foreground">{dtop.detect}</div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-accent/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-accent" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-0.5">Action Triggered</div>
                    <div className="text-xs font-medium text-foreground">{dtop.trigger}</div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-cyan-500/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-cyan-500" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500 mb-0.5">Change Orchestrated</div>
                    <div className="text-xs font-medium text-foreground">{dtop.orchestrate}</div>
                    {isExpanded && (
                      <div className="flex gap-1 mt-1 flex-wrap animate-fade-in">
                        {uc.input.costComponents.map((c) => (
                          <span key={c} className="text-[9px] px-1.5 py-0.5 rounded-full border border-muted/20 bg-muted/10 text-muted-foreground">{c}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative pl-4 border-l-2 border-emerald-500/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-emerald-500" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500 mb-0.5">Outcome Proven</div>
                    <div className="text-xs font-medium text-foreground">{dtop.prove}</div>
                    {isExpanded && (
                      <p className="text-[10px] text-muted-foreground mt-1 italic animate-fade-in">{uc.pointSolutionGap}</p>
                    )}
                  </div>
                </div>

                {!isExpanded && (
                  <div className="mt-3 text-[10px] text-muted-foreground text-center">Click to expand</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-2 shrink-0">
          <p className="text-xs text-center text-foreground">
            <span className="font-semibold text-primary">Every safety event follows the same DTOP pattern</span> — building a provable, auditable response chain from detection to outcome.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide10SafetyUseCases;
