import { Calendar, DollarSign, PiggyBank, Heart, ArrowRight } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const outcomes = [
  {
    icon: Calendar,
    title: "Schedule Protection",
    signal: "Hard landing trend detected",
    action: "Targeted retraining deployed",
    result: "Protected departures",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: DollarSign,
    title: "Revenue Protection",
    signal: "Crew fatigue risk flagged",
    action: "Proactive scheduling adjustment",
    result: "Avoided cancellations",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: PiggyBank,
    title: "Cost Savings",
    signal: "Procedure discrepancy found",
    action: "Automated content update",
    result: "Reduced rework cycles",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    icon: Heart,
    title: "Customer Loyalty",
    signal: "Compliance gap identified",
    action: "Immediate remediation",
    result: "Maintained trust",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
];

interface SalesSlide7OutcomesProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide7Outcomes = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide7OutcomesProps) => {
  return (
    <SalesSlideContainer
      id="sales-slide-7"
      title="Measurable Value Across Four Pillars"
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto w-full">
          {outcomes.map((outcome) => (
            <div
              key={outcome.title}
              className={`${outcome.bgColor} border border-border/50 rounded-xl p-5 sm:p-6`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${outcome.bgColor} flex items-center justify-center`}>
                  <outcome.icon className={`w-5 h-5 ${outcome.color}`} />
                </div>
                <h3 className={`text-lg font-semibold ${outcome.color}`}>{outcome.title}</h3>
              </div>

              {/* Signal → Action → Result flow */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground shrink-0">Signal:</span>
                  <span className="text-foreground">{outcome.signal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground shrink-0">Action:</span>
                  <span className="text-foreground">{outcome.action}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground shrink-0">Result:</span>
                  <span className={`font-medium ${outcome.color}`}>{outcome.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide7Outcomes;
