import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import complyLogo from "@/assets/comply365-logo-white.png";
import SlidePlayButton from "@/components/SlidePlayButton";

interface PitchSlideContainerProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  variant?: "dark" | "light";
  slideNumber?: number;
  showHeader?: boolean;
  // Narration props
  isPlaying?: boolean;
  isLoading?: boolean;
  progress?: number;
  hasCompleted?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
}

const PitchSlideContainer = ({
  id,
  title,
  subtitle,
  children,
  className,
  variant = "dark",
  slideNumber,
  showHeader = true,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
  onPrevSlide,
}: PitchSlideContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        "h-screen w-full flex flex-col px-6 sm:px-10 lg:px-16 py-10 sm:py-14 snap-start relative overflow-hidden",
        variant === "light" ? "slide-light bg-white text-foreground" : "bg-background",
        className
      )}
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
          onPrevSlide={onPrevSlide}
          variant={variant}
        />
      )}

      {/* Logo - top right */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <img
          src={complyLogo}
          alt="Comply365"
          className="h-5 sm:h-6 w-auto opacity-80"
        />
      </div>

      {/* Slide number - bottom right */}
      {slideNumber !== undefined && (
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10">
          <span className={cn(
            "text-sm font-medium",
            variant === "light" ? "text-muted-foreground" : "text-muted-foreground"
          )}>
            {String(slideNumber).padStart(2, '0')}
          </span>
        </div>
      )}

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col">
        {/* Header section */}
        {showHeader && title && (
          <div className="mt-4 sm:mt-6 mb-6 sm:mb-8">
            <h2 className={cn(
              "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight",
              variant === "light" ? "text-foreground" : "text-foreground"
            )}>
              <span className="title-accent">{title}</span>
            </h2>
            {subtitle && (
              <p className={cn(
                "text-primary text-base sm:text-lg md:text-xl max-w-3xl mt-3"
              )}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Content area */}
        <div className="w-full flex-1 overflow-hidden flex flex-col justify-center">{children}</div>
      </div>
    </section>
  );
};

export default PitchSlideContainer;
