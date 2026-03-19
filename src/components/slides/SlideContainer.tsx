import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import complyIcon from "@/assets/comply365-logo-white.png";
import SlidePlayButton from "@/components/SlidePlayButton";

interface SlideContainerProps {
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
  onPrevSlide?: () => void;
}

const SlideContainer = ({
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
}: SlideContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        "h-screen w-full flex flex-col px-6 sm:px-10 lg:px-16 py-10 sm:py-14 snap-start relative overflow-hidden",
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

      {/* Logo icon - top right */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <img
          src={complyIcon}
          alt="Comply365"
          className="h-6 sm:h-8 w-auto opacity-90"
        />
      </div>

      {/* Slide number - bottom right */}
      {slideNumber && (
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
        {/* Header section - left aligned like PPT template */}
        <div className="mb-4 sm:mb-6">
          <h2 className={cn(
            "text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight mb-2",
            variant === "light" ? "text-foreground" : "text-foreground"
          )}>
            <span className={showTitleAccent ? "title-accent" : ""}>
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className={cn(
              "text-primary text-sm sm:text-base md:text-lg max-w-3xl mt-3",
              variant === "light" ? "text-primary" : "text-primary"
            )}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Content area */}
        <div className={cn("w-full flex-1", className?.includes("!overflow-visible") ? "" : "overflow-hidden")}>{children}</div>
      </div>
    </section>
  );
};

export default SlideContainer;
