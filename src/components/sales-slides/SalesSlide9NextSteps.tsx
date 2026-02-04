import { CalendarCheck, Calculator, LineChart, ArrowRight } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";
import SlidePlayButton from "@/components/SlidePlayButton";
import type { SlideNarrationProps } from "@/types/slideProps";

const supportingOptions = [
  { icon: Calculator, label: "ROI Assessment" },
  { icon: LineChart, label: "Maturity Assessment" },
];

interface SalesSlide9NextStepsProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide9NextSteps = ({
  slideNumber,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide9NextStepsProps) => {
  return (
    <section
      id="sales-slide-9"
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

      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Logo - top right */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <img src={complyLogo} alt="Comply365" className="h-6 sm:h-8 w-auto opacity-90" />
      </div>

      {/* Slide number - bottom right */}
      {slideNumber !== undefined && (
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10">
          <span className="text-sm font-medium text-muted-foreground">
            {String(slideNumber).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full text-center space-y-8">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
          <span className="title-accent">Let's Build Your Roadmap</span>
        </h2>

        {/* Primary CTA */}
        <div className="pt-4">
          <button className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105">
            <CalendarCheck className="w-5 h-5" />
            Schedule Discovery Session
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Supporting options */}
        <div className="flex justify-center gap-6 pt-4">
          {supportingOptions.map((opt) => (
            <button
              key={opt.label}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <opt.icon className="w-4 h-4" />
              {opt.label}
            </button>
          ))}
        </div>

        {/* Closing hook */}
        <div className="pt-8 border-t border-border/30 mt-8">
          <p className="text-muted-foreground text-lg">
            <span className="text-primary font-medium">Detect → Trigger → Orchestrate → Prove</span>
          </p>
          <p className="text-muted-foreground mt-2">
            Your journey starts now.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SalesSlide9NextSteps;
