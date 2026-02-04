import { AlertCircle } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const costMetrics = [
  { value: "12K", label: "safety signals scattered", sublabel: "monthly" },
  { value: "8K", label: "orphaned content items", sublabel: "no owner" },
  { value: "3 wk", label: "average investigation", sublabel: "time" },
  { value: "Months", label: "audit preparation", sublabel: "every cycle" },
];

interface SalesSlide2WhyNowProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide2WhyNow = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide2WhyNowProps) => {
  return (
    <SalesSlideContainer
      id="sales-slide-2"
      title="The Cost of Fragmentation"
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col justify-center">
        {/* Metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-10 sm:mb-16">
          {costMetrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-destructive mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-foreground font-medium">{metric.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{metric.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Key insight callout */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card/50 border border-border rounded-xl p-6 sm:p-8 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <p className="text-lg sm:text-xl text-foreground font-medium mb-2">
                Regulators expect connection.
              </p>
              <p className="text-lg sm:text-xl text-foreground font-medium mb-2">
                Operations demand speed.
              </p>
              <p className="text-primary text-lg sm:text-xl font-semibold">
                Point tools can't deliver either.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide2WhyNow;
