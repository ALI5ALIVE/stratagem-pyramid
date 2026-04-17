import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases, executiveOutcomes, leadingMeasures } from "@/data/lineOfSightData";
import { ArrowRight } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const formatCurrency = (v: number) => v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `$${(v / 1_000).toFixed(0)}K` : `$${v}`;

const TechSlide13LineOfSight = ({ slideNumber, ...narrationProps }: Props) => {
  const totalExposure = useCases.reduce((s, uc) => s + uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor, 0);

  return (
    <SalesSlideContainer id="tech-slide-13" title="Line of Sight: ROI Model" subtitle="From use case frequency to leading measures to executive outcomes" slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* 3-column cascade */}
        <div className="grid grid-cols-3 gap-4 flex-1 min-h-0 items-stretch">
          {/* Use cases */}
          <div className="rounded-xl border border-muted/20 bg-muted/5 p-4 overflow-auto h-full flex flex-col">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 shrink-0">Use Cases (8)</h3>
            <div className="space-y-1.5 flex-1">
              {useCases.map((uc) => {
                const annual = uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor;
                return (
                  <div key={uc.id} className="flex items-center justify-between p-2 rounded-lg bg-background/40 border border-muted/10">
                    <span className="text-xs text-muted-foreground truncate flex-1">{uc.label}</span>
                    <span className="text-xs font-bold text-destructive ml-2">{formatCurrency(annual)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leading measures */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 overflow-auto h-full flex flex-col">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 shrink-0">Leading Measures ({leadingMeasures.length})</h3>
            <div className="space-y-1.5 flex-1">
              {leadingMeasures.map((lm) => (
                <div key={lm.id} className="flex items-center gap-2 p-2 rounded-lg bg-background/40 border border-muted/10">
                  <span className={`text-xs ${lm.direction === "down" ? "text-emerald-400" : "text-sky-400"}`}>{lm.direction === "down" ? "↓" : "↑"}</span>
                  <span className="text-xs text-muted-foreground flex-1 leading-snug">{lm.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Executive outcomes */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 overflow-auto h-full flex flex-col">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 shrink-0">Executive Outcomes</h3>
            <div className="space-y-2 flex-1">
              {executiveOutcomes.map((eo) => (
                <div key={eo.id} className="p-2 rounded-lg bg-background/40 border border-muted/10">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{eo.icon}</span>
                    <span className="text-xs font-bold text-foreground">{eo.stakeholder}</span>
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {eo.metrics.map((m) => (
                      <span key={m.id} className="text-[10px] text-muted-foreground block leading-snug">{m.label}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 auto-rows-fr shrink-0 items-stretch">
          <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-center h-full flex flex-col justify-center">
            <span className="text-xs text-muted-foreground">Total Annual Cost Exposure</span>
            <div className="text-2xl font-bold text-destructive mt-1">{formatCurrency(totalExposure)}</div>
          </div>
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center gap-3 h-full">
            <ArrowRight className="h-5 w-5 text-primary shrink-0" />
            <div>
              <span className="text-sm font-bold text-foreground">Explore the full interactive model</span>
              <p className="text-xs text-muted-foreground">Available at /line-of-sight with adjustable inputs per use case</p>
            </div>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide13LineOfSight;
