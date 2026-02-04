import { ArrowRight } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";
import FragmentationIllustration from "@/components/FragmentationIllustration";
import PlatformEcosystemDiagram from "@/components/PlatformEcosystemDiagram";
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

      {/* Decorative background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

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

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-6">
        {/* Customer-centric headline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
            What if every <span className="text-primary">safety signal</span><br />
            became a <span className="text-primary">solved problem</span>?
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            What if every procedure change was tracked, trained, and proven?
          </p>
        </div>

        {/* Visual transformation: Fragmentation → Connected */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 py-6">
          {/* Before: Fragmentation */}
          <div className="w-40 sm:w-52">
            <div className="text-xs text-destructive/70 font-medium mb-2 uppercase tracking-wide">Today</div>
            <div className="h-20 sm:h-24">
              <FragmentationIllustration />
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="w-8 h-8 text-primary" />
            <span className="text-xs text-muted-foreground">Transform</span>
          </div>

          {/* After: Connected Platform */}
          <div className="w-32 sm:w-40">
            <div className="text-xs text-primary/70 font-medium mb-2 uppercase tracking-wide">Tomorrow</div>
            <div className="h-24 sm:h-28">
              <PlatformEcosystemDiagram className="scale-75 -mt-4" />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="pt-2">
          <p className="text-xl sm:text-2xl font-semibold text-foreground">
            That's what <span className="text-primary">closing the loop</span> looks like.
          </p>
        </div>

        {/* Trust bar */}
        <div className="pt-6 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            Trusted by <span className="text-primary font-semibold">50+ airlines</span> for{" "}
            <span className="text-primary font-semibold">1M+ frontline workers</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SalesSlide0Title;
