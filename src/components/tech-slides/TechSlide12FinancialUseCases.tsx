import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/lineOfSightData";
import { DollarSign, Shield, TrendingDown } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const formatCurrency = (v: number) => v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `$${(v / 1_000).toFixed(0)}K` : `$${v}`;

const TechSlide12FinancialUseCases = ({ slideNumber, ...narrationProps }: Props) => {
  const insurance = useCases.find((uc) => uc.id === "uc7")!;
  const insAnnual = insurance.input.baseline * insurance.input.costMidpoint * insurance.input.annualisationFactor;
  const dtopParts = insurance.platformMechanism.split(" → ");

  const totalExposure = useCases.reduce((s, uc) => s + uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor, 0);
  const revenueProtection = totalExposure * 0.3;

  return (
    <SalesSlideContainer id="tech-slide-12" title="Use Cases: Financial" subtitle="Insurance premiums and revenue protection — the CFO's view" slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 flex flex-col gap-4">
        {/* Insurance deep-dive */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-6 w-6 text-amber-400" />
            <h3 className="text-lg font-bold text-amber-400">{insurance.label}</h3>
            <span className="text-sm px-3 py-1 rounded-full bg-destructive/10 text-destructive font-bold">{formatCurrency(insAnnual)}/yr exposure</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{insurance.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">DTOP Chain</span>
              <div className="space-y-1 mt-2">
                {dtopParts.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 text-foreground/80">{p.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">Cost Components</span>
              <ul className="mt-2 space-y-1">
                {insurance.input.costComponents.map((c) => (<li key={c} className="text-xs text-muted-foreground">• {c}</li>))}
              </ul>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mt-3 block">Point Solution Gap</span>
              <p className="text-[10px] text-muted-foreground mt-1 italic">{insurance.pointSolutionGap}</p>
            </div>
          </div>
        </div>

        {/* Revenue protection summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center col-span-1">
            <DollarSign className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <span className="text-2xl font-bold text-emerald-400">{formatCurrency(revenueProtection)}</span>
            <p className="text-xs text-muted-foreground mt-1">Annual Cost Avoidance</p>
          </div>
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 col-span-2">
            <TrendingDown className="h-5 w-5 text-primary mb-2" />
            <h4 className="text-sm font-bold text-foreground mb-1">Revenue Protection Through Connected Operations</h4>
            <p className="text-xs text-muted-foreground">When safety events are resolved faster, procedures stay current, and crews are trained on actual gaps — the financial impact cascades: fewer claims, lower premiums, reduced regulatory penalties, and protected schedule reliability.</p>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide12FinancialUseCases;
