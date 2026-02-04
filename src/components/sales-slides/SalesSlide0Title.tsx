import { ChevronDown } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";
import SlidePlayButton from "@/components/SlidePlayButton";
import type { SlideNarrationProps } from "@/types/slideProps";

interface SalesSlide0TitleProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide0Title = ({
  slideNumber,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide0TitleProps) => {
  return (
    <section
      id="sales-slide-0"
      className="h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-16 snap-start relative overflow-hidden bg-background"
    >
      {/* Play button */}
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

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={complyLogo}
            alt="Comply365"
            className="h-12 sm:h-16 w-auto"
          />
        </div>

        {/* Headline */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
            <span className="text-foreground">The</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Operational Performance
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Platform
            </span>
          </h1>

          <p className="text-muted-foreground text-xl sm:text-2xl font-medium tracking-wide">
            Connected. Intelligent. Predictive.
          </p>
        </div>

        {/* Tagline */}
        <div className="pt-4">
          <p className="text-muted-foreground/80 text-base sm:text-lg max-w-2xl mx-auto">
            Turn signals into orchestrated change and measurable outcomes
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-pulse">
        <span className="text-xs uppercase tracking-widest">Begin</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};

export default SalesSlide0Title;
