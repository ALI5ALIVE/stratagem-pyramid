import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { executiveOutcomes, useCases } from "@/data/lineOfSightData";
import { Settings, TrendingUp, Crown } from "lucide-react";

interface ExecSlide5ValueProps extends SlideNarrationProps {
  slideNumber?: number;
}

const iconMap: Record<string, React.ElementType> = {
  Settings,
  TrendingUp,
  Crown,
};

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

const ExecSlide5Value = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: ExecSlide5ValueProps) => {
  const totalCost = useCases.reduce(
    (sum, uc) => sum + uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor,
    0
  );
  const scaledTotal = totalCost * 0.3; // boardroom-credible scale factor

  return (
    <SalesSlideContainer
      id="exec-slide-5"
      title="Line of Sight to Value"
      subtitle="Every use case connects to executive outcomes your board already measures."
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
        {/* Stakeholder cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          {executiveOutcomes.map((outcome) => {
            const Icon = iconMap[outcome.icon] || Settings;
            return (
              <div
                key={outcome.id}
                className={`rounded-xl border bg-gradient-to-br ${outcome.color} p-6 flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-background/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{outcome.stakeholder}</h3>
                </div>
                <div className="space-y-3 flex-1">
                  {outcome.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.id} className="bg-background/20 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                      <p className="text-lg font-bold text-foreground">
                        {metric.unit === "$M"
                          ? formatCurrency(metric.baselineValue * 1_000_000 || scaledTotal / 3)
                          : `${metric.baselineValue}${metric.unit}`}
                        {metric.direction === "up" && (
                          <span className="text-emerald-400 text-sm ml-1">↑</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total cost avoidance */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Annual Cost Avoidance Opportunity</p>
            <p className="text-3xl font-display font-bold text-foreground">{formatCurrency(scaledTotal)}</p>
          </div>
          <p className="text-xs text-muted-foreground max-w-xs text-right">
            Based on industry benchmarks scaled to a mid-size carrier. Explore the full interactive model in our Line of Sight calculator.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default ExecSlide5Value;
