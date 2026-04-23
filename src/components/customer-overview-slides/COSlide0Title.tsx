import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Plane, Globe, Users } from "lucide-react";

interface COSlide0TitleProps extends SlideNarrationProps {
  slideNumber?: number;
}

const trustStats = [
  { icon: Plane, value: "550+", label: "Airlines Worldwide" },
  { icon: Users, value: "~2.5M", label: "Users" },
  { icon: Globe, value: "6", label: "Continents" },
];

const COSlide0Title = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: COSlide0TitleProps) => {
  return (
    <SalesSlideContainer
      id="co-slide-0"
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-8">
          <p className="text-primary text-sm sm:text-base font-semibold tracking-widest uppercase">
            The Operational Performance Platform
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] max-w-4xl">
            From cost centre to{" "}
            <span className="title-accent">performance engine</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
            A 20-minute walkthrough — where you are today,
            <br />
            and where we go together.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Prepared for [Customer Name]
          </div>
        </div>

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

export default COSlide0Title;