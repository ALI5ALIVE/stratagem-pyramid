import { Search, Zap, Workflow, Shield, ArrowDown, TrendingDown } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const dtopFlow = [
  {
    icon: Search,
    phase: "Detect",
    action: "FOQA flags hard landing trend",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: Zap,
    phase: "Trigger",
    action: "Platform identifies 47 affected pilots",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    icon: Workflow,
    phase: "Orchestrate",
    action: "Targeted simulator training deployed",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Shield,
    phase: "Prove",
    action: "Training completion logged & trend monitored",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
];

interface SalesSlide5UseCaseProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide5UseCase = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide5UseCaseProps) => {
  return (
    <SalesSlideContainer
      id="sales-slide-5"
      title="From Signal to Outcome"
      subtitle="Hard Landing Detection: Closing the loop in action"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* DTOP Flow */}
          <div className="space-y-3">
            {dtopFlow.map((step, i) => (
              <div key={step.phase}>
                <div className={`${step.bgColor} border border-border/50 rounded-lg p-4 flex items-center gap-4`}>
                  <div className={`w-10 h-10 rounded-lg ${step.bgColor} flex items-center justify-center shrink-0`}>
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${step.color}`}>{step.phase}</div>
                    <div className="text-foreground">{step.action}</div>
                  </div>
                </div>
                {i < dtopFlow.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-4 h-4 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Result callout */}
          <div className="flex items-center justify-center">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 text-center">
              <TrendingDown className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <div className="text-5xl sm:text-6xl font-bold text-emerald-500 mb-2">78%</div>
              <div className="text-xl text-foreground font-medium mb-1">reduction in repeat events</div>
              <div className="text-muted-foreground">within 90 days</div>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="text-center mt-8">
          <p className="text-lg text-primary font-medium">
            This is what closing the loop looks like.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide5UseCase;
