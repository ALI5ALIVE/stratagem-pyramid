import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { useCases, methodologyNote } from "@/data/lineOfSightData";
import { AlertTriangle, Info } from "lucide-react";

interface ExecSlide1ProblemProps extends SlideNarrationProps {
  slideNumber?: number;
}

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

const ExecSlide1Problem = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: ExecSlide1ProblemProps) => {
  // Calculate total annual cost from use case data
  const useCaseCosts = useCases.map((uc) => ({
    label: uc.label,
    annualCost: uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor,
  }));

  const totalCost = useCaseCosts.reduce((sum, uc) => sum + uc.annualCost, 0);
  const totalFormatted = formatCurrency(totalCost);

  // Sort by cost descending for waterfall impact
  const sorted = [...useCaseCosts].sort((a, b) => b.annualCost - a.annualCost);
  const maxCost = sorted[0]?.annualCost || 1;

  return (
    <SalesSlideContainer
      id="exec-slide-1"
      title={`The ${totalFormatted} Problem`}
      subtitle="The annual cost of operational disconnection — the human-factor costs your people and processes can influence."
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-6">
        {/* Cost waterfall */}
        <div className="flex-1 grid grid-cols-1 gap-2">
          {sorted.map((uc) => {
            const widthPct = Math.max((uc.annualCost / maxCost) * 100, 8);
            return (
              <div key={uc.label} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-52 shrink-0 text-right truncate">
                  {uc.label}
                </span>
                <div className="flex-1 h-8 relative">
                  <div
                    className="h-full rounded bg-gradient-to-r from-destructive/60 to-destructive/30 flex items-center px-3 transition-all"
                    style={{ width: `${widthPct}%` }}
                  >
                    <span className="text-xs font-semibold text-destructive-foreground whitespace-nowrap">
                      {formatCurrency(uc.annualCost)}/yr
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total callout */}
        <div className="border border-destructive/30 rounded-xl bg-destructive/5 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              {totalFormatted}
              <span className="text-lg font-normal text-muted-foreground ml-2">per year</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              A sample of the highest-cost, most addressable operational issues — not an exhaustive list. Customisable to your operation.
            </p>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default ExecSlide1Problem;
