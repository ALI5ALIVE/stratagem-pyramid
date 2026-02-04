import { Link2, Brain, FileCheck, ArrowRight } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const differentiators = [
  {
    icon: Link2,
    title: "Connected Foundation",
    description: "One version of truth across safety, content, and training",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: Brain,
    title: "Embedded Intelligence",
    description: "AI that's trusted, not bolted on—integrated from the ground up",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: FileCheck,
    title: "Proof by Default",
    description: "Audit-ready evidence, always—every action documented automatically",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
];

interface SalesSlide8WhyUsProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide8WhyUs = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide8WhyUsProps) => {
  return (
    <SalesSlideContainer
      id="sales-slide-8"
      title="Point Solutions Manage Silos. We Close the Loop."
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
        {/* Differentiators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {differentiators.map((diff, i) => (
            <div key={diff.title} className="flex items-start gap-4">
              <div className={`${diff.bgColor} border border-border/50 rounded-xl p-6 flex-1`}>
                <div className={`w-12 h-12 rounded-xl ${diff.bgColor} flex items-center justify-center mb-4`}>
                  <diff.icon className={`w-6 h-6 ${diff.color}`} />
                </div>
                <h3 className={`text-lg font-semibold ${diff.color} mb-2`}>{diff.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{diff.description}</p>
              </div>
              {i < differentiators.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground/30 mt-8 hidden sm:block shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Category promise */}
        <div className="text-center">
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-xl px-8 py-6">
            <p className="text-lg sm:text-xl text-foreground font-medium mb-2">
              Make operational performance
            </p>
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              predictable, measurable, and provable.
            </p>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide8WhyUs;
