import { Search, Zap, Workflow, Shield, ArrowRight } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const dtopSteps = [
  {
    icon: Search,
    letter: "D",
    label: "Detect",
    description: "Surface signals from safety, content, and training data",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
  },
  {
    icon: Zap,
    letter: "T",
    label: "Trigger",
    description: "Automatically initiate the right workflows",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
  },
  {
    icon: Workflow,
    letter: "O",
    label: "Orchestrate",
    description: "Coordinate training, content, and compliance response",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    icon: Shield,
    letter: "P",
    label: "Prove",
    description: "Document every action for audit-ready evidence",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
  },
];

interface SalesSlide4SolutionProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide4Solution = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide4SolutionProps) => {
  return (
    <SalesSlideContainer
      id="sales-slide-4"
      title="Detect → Trigger → Orchestrate → Prove"
      subtitle="Signals become outcomes. By default."
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-5xl w-full">
          {dtopSteps.map((step, i) => (
            <div key={step.letter} className="flex items-center">
              <div className={`flex-1 ${step.bgColor} border ${step.borderColor} rounded-xl p-5 sm:p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${step.bgColor} flex items-center justify-center`}>
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <div>
                    <span className={`text-2xl font-bold ${step.color}`}>{step.letter}</span>
                    <span className="text-lg font-semibold text-foreground ml-1">{step.label}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              {i < dtopSteps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground/30 mx-2 hidden sm:block shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide4Solution;
