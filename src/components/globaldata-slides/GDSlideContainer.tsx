import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import SlidePlayButton from "@/components/SlidePlayButton";

interface GDSlideContainerProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  variant?: "dark" | "light";
  slideNumber?: number;
  showTitleAccent?: boolean;
  // Narration props
  isPlaying?: boolean;
  isLoading?: boolean;
  progress?: number;
  hasCompleted?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onNextSlide?: () => void;
}

const GDSlideContainer = ({
  id,
  title,
  subtitle,
  children,
  className,
  variant = "dark",
  slideNumber,
  showTitleAccent = true,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: GDSlideContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen w-full flex flex-col px-6 sm:px-10 lg:px-16 py-16 sm:py-20 snap-start relative",
        variant === "light" ? "slide-light bg-white text-foreground" : "bg-background",
        className
      )}
    >
      {/* Play button - always visible when onPlay is provided */}
      {onPlay && (
        <SlidePlayButton
          isPlaying={isPlaying}
          isLoading={isLoading}
          progress={progress}
          hasCompleted={hasCompleted}
          onPlay={onPlay}
          onPause={onPause ?? (() => {})}
          onNextSlide={onNextSlide}
          variant={variant}
        />
      )}

      {/* GlobalData Logo placeholder - top right */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">GD</span>
          </div>
          <span className="text-sm font-semibold text-foreground/80 hidden sm:block">GlobalData</span>
        </div>
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

      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col">
        {/* Header section - left aligned */}
        <div className="mb-8 sm:mb-12">
          <h2 className={cn(
            "text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight mb-2",
            variant === "light" ? "text-foreground" : "text-foreground"
          )}>
            <span className={showTitleAccent ? "title-accent-gd" : ""}>
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className={cn(
              "text-emerald-400 text-sm sm:text-base md:text-lg max-w-3xl mt-3"
            )}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Content area */}
        <div className="w-full flex-1">{children}</div>
      </div>
    </section>
  );
};

export default GDSlideContainer;
