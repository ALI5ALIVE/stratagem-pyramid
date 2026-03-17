import { ChevronDown } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";
import SlidePlayButton from "@/components/SlidePlayButton";
import { SlideNarrationProps } from "@/types/slideProps";

const CASlide0Title = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  return (
    <section className="h-screen w-full flex flex-col snap-start relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {onPlay && (
        <SlidePlayButton
          isPlaying={isPlaying}
          isLoading={isLoading}
          progress={progress}
          hasCompleted={hasCompleted}
          onPlay={onPlay}
          onPause={onPause ?? (() => {})}
          onNextSlide={onNextSlide}
        />
      )}

      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <img src={complyLogo} alt="Comply365" className="h-6 sm:h-8 w-auto opacity-90" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="max-w-7xl w-full mx-auto">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">CoAnalyst — The Intelligence Layer</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight mb-4">
            <span className="title-accent">The Intelligence</span>
            <br />
            <span className="text-foreground">Layer</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mb-10">
            From reports to intelligence. From events to control.
            <br />
            <span className="text-primary font-medium">How CoAnalyst powers the Operational Performance Platform.</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs">Scroll to begin</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
};

export default CASlide0Title;
