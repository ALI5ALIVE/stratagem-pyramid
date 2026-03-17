import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/lineOfSightData";
import { AlertTriangle, Clock, Signal, TrendingDown } from "lucide-react";

interface OpsSlide2Props extends SlideNarrationProps {
  slideNumber?: number;
}

const statCallouts = [
  { icon: Signal, value: "65K+", label: "Signals per year", color: "text-primary" },
  { icon: AlertTriangle, value: "40%", label: "Orphaned — no action taken", color: "text-red-400" },
  { icon: Clock, value: "3 weeks", label: "Average investigation cycle", color: "text-amber-400" },
];

const OpsSlide2CostOfFragmentation = ({ slideNumber, ...narrationProps }: OpsSlide2Props) => {
  // Top 4 use cases by annual cost
  const costData = useCases
    .map((uc) => ({
      label: uc.label,
      annualCost: uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor,
    }))
    .sort((a, b) => b.annualCost - a.annualCost)
    .slice(0, 4);

  const formatCost = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value}`;
  };

  const maxCost = costData[0]?.annualCost || 1;

  return (
    <SalesSlideContainer
      id="ops-slide-2"
      title="The Cost of Fragmentation"
      subtitle="What disconnected operations cost you every year"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        {/* Stat callouts */}
        <div className="grid grid-cols-3 gap-4">
          {statCallouts.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-4 rounded-lg border border-muted/20 bg-muted/5 text-center"
            >
              <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
              <span className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Cost bars */}
        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Top Cost Drivers — Annual Impact
          </h3>
          <div className="space-y-3">
            {costData.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-sm font-bold text-red-400">{formatCost(item.annualCost)}/yr</span>
                </div>
                <div className="h-2 rounded-full bg-muted/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500/60 to-red-400/80 transition-all duration-1000"
                    style={{ width: `${(item.annualCost / maxCost) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk compounding callout */}
        <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/5 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-red-400">Risk compounds.</span>{" "}
            A single unlinked event cascades into delayed investigations, repeated incidents,
            and audit findings — multiplying the cost of every missed signal.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide2CostOfFragmentation;
