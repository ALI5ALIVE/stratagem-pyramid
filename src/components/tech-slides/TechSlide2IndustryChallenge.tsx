import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { useCases, methodologyNote } from "@/data/lineOfSightData";
import { AlertTriangle, Clock, FileX, Radio, Info } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const formatCurrency = (v: number) => v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `$${(v / 1_000).toFixed(0)}K` : `$${v}`;

const painPoints = [
  { icon: Radio, label: "12K+ signals/month", sub: "Across FOQA, reports, audits" },
  { icon: FileX, label: "8K+ orphaned", sub: "No connected response" },
  { icon: Clock, label: "3-week investigations", sub: "Manual evidence gathering" },
  { icon: AlertTriangle, label: "Same events recur", sub: "No closed-loop learning" },
];

const TechSlide2IndustryChallenge = ({ slideNumber, ...narrationProps }: Props) => {
  const ucCosts = useCases.map((uc) => ({
    label: uc.label,
    annualCost: uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor,
    severity: uc.input.severity,
  }));
  const totalCost = ucCosts.reduce((s, u) => s + u.annualCost, 0);
  const sorted = [...ucCosts].sort((a, b) => b.annualCost - a.annualCost);
  const maxCost = sorted[0]?.annualCost || 1;

  return (
    <SalesSlideContainer id="tech-slide-2" title="The Industry Challenge" subtitle="The daily reality of fragmented operations — and the cost of inaction" slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 flex flex-col gap-4">
        {/* Pain points strip */}
        <div className="grid grid-cols-4 gap-3">
          {painPoints.map((p) => (
            <div key={p.label} className="flex items-center gap-3 p-3 rounded-lg border border-muted/20 bg-muted/5">
              <p.icon className="h-5 w-5 text-destructive shrink-0" />
              <div>
                <span className="text-sm font-bold text-foreground">{p.label}</span>
                <p className="text-[10px] text-muted-foreground">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cost waterfall */}
        <div className="flex-1 grid grid-cols-1 gap-1.5">
          {sorted.map((uc) => {
            const widthPct = Math.max((uc.annualCost / maxCost) * 100, 8);
            return (
              <div key={uc.label} className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-48 shrink-0 text-right truncate">{uc.label}</span>
                <div className="flex-1 h-7 relative">
                  <div className="h-full rounded bg-gradient-to-r from-destructive/60 to-destructive/30 flex items-center px-3 transition-all" style={{ width: `${widthPct}%` }}>
                    <span className="text-[10px] font-semibold text-destructive-foreground whitespace-nowrap">{formatCurrency(uc.annualCost)}/yr</span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground w-16 shrink-0">{uc.severity}</span>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="border border-destructive/30 rounded-xl bg-destructive/5 p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-foreground">
              {formatCurrency(totalCost)}<span className="text-sm font-normal text-muted-foreground ml-2">per year</span>
            </p>
            <p className="text-xs text-muted-foreground">Total annual cost of operational fragmentation across 8 costed use cases</p>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide2IndustryChallenge;
