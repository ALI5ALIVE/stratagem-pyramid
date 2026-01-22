import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import SlidePlayButton from "@/components/SlidePlayButton";
import comply365Logo from "@/assets/comply365-logo-white.png";

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

      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col relative">
        {/* GlobalData Logo - top right, aligned with content */}
        <div className="absolute -top-8 right-0">
          <div className="flex items-center gap-2">
            <img src={comply365Logo} alt="GlobalData" className="h-6 sm:h-8 w-auto" />
          </div>
        </div>

        {/* Footer - bottom left, aligned with content */}
        <div className="absolute -bottom-10 left-0 hidden sm:block">
          <p className="text-[10px] text-muted-foreground">
            © 2026 GlobalData · Connected Consumer Intelligence Platform
          </p>
        </div>

        {/* Slide number - bottom right, aligned with content */}
        {slideNumber !== undefined && (
          <div className="absolute -bottom-10 right-0">
            <span className={cn(
              "text-sm font-medium",
              variant === "light" ? "text-muted-foreground" : "text-muted-foreground"
            )}>
              {String(slideNumber).padStart(2, '0')}
            </span>
          </div>
        )}
        {/* Header section - left aligned */}
        <div className="mb-8 sm:mb-12">
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
              "text-primary text-sm sm:text-base md:text-lg max-w-3xl mt-3"
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
