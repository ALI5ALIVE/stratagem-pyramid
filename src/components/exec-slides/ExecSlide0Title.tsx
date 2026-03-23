import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Plane, Globe, Users } from "lucide-react";

const trustStats = [
  { icon: Plane, value: "550+", label: "Airlines Worldwide" },
  { icon: Globe, value: "6", label: "Continents" },
  { icon: Users, value: "Global", label: "Aviation & AI Experts" },
];

interface ExecSlide0TitleProps extends SlideNarrationProps {
  slideNumber?: number;
}

const ExecSlide0Title = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: ExecSlide0TitleProps) => {
  return (
    <SalesSlideContainer
      id="exec-slide-0"
      showHeader={false}
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center relative">
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-8">
          {/* Category line */}
          <p className="text-primary text-sm sm:text-base font-semibold tracking-widest uppercase">
            The Operational Performance Platform
          </p>

          {/* Hero headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] max-w-4xl">
            What if operational{" "}
            <span className="title-accent">performance</span>{" "}
            was predictable?
          </h1>

          {/* Subline */}
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
            From fragmented signals to connected outcomes.
            <br />
            Predictable. Measurable. Provable.
          </p>
        </div>

        {/* Trust bar */}
        <div className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {trustStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default ExecSlide0Title;
