import { useEffect, useRef } from "react";
import { Play, Pause, Loader2, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlidePlayButtonProps {
  isPlaying: boolean;
  isLoading: boolean;
  progress: number;
  hasCompleted?: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  variant?: "dark" | "light";
}

const SlidePlayButton = ({
  isPlaying,
  isLoading,
  progress,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
  onPrevSlide,
  variant = "dark",
}: SlidePlayButtonProps) => {
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance to next slide 1.5s after narration completes
  useEffect(() => {
    if (hasCompleted && onNextSlide) {
      autoAdvanceTimer.current = setTimeout(() => {
        onNextSlide();
      }, 1500);
    }
    return () => {
      if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
      }
    };
  }, [hasCompleted, onNextSlide]);

  // Cancel auto-advance if user interacts
  const cancelAutoAdvance = () => {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
  };

  const handlePlayPause = () => {
    cancelAutoAdvance();
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const handlePrev = () => {
    cancelAutoAdvance();
    onPrevSlide?.();
  };

  const handleNext = () => {
    cancelAutoAdvance();
    onNextSlide?.();
  };

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 z-30",
        "flex flex-col"
      )}
    >
      {/* Progress bar */}
      <div className={cn(
        "w-full h-1",
        variant === "light" ? "bg-muted" : "bg-muted/30"
      )}>
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Control bar */}
      <div
        className={cn(
          "flex items-center justify-center gap-2 sm:gap-4 px-4 sm:px-6 py-2.5 sm:py-3",
          "backdrop-blur-md",
          variant === "light"
            ? "bg-background/80 border-t border-border/30"
            : "bg-background/60 border-t border-border/20"
        )}
      >
        {/* Previous */}
        <button
          onClick={handlePrev}
          disabled={!onPrevSlide}
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center",
            "transition-all duration-200",
            "disabled:opacity-20 disabled:cursor-not-allowed",
            variant === "light"
              ? "text-muted-foreground hover:text-foreground hover:bg-muted"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
          )}
          title="Previous slide"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        {/* Play / Pause / Replay */}
        <button
          onClick={handlePlayPause}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            "shadow-md hover:shadow-lg hover:scale-105",
            "transition-all duration-200",
            "bg-primary/90 hover:bg-primary",
            isPlaying && "bg-primary/70"
          )}
          title={hasCompleted ? "Replay narration" : isPlaying ? "Pause narration" : "Play narration"}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5 text-primary-foreground" />
          ) : hasCompleted ? (
            <RotateCcw className="w-5 h-5 text-primary-foreground" />
          ) : (
            <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
          )}
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={!onNextSlide}
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center",
            "transition-all duration-200",
            "disabled:opacity-20 disabled:cursor-not-allowed",
            variant === "light"
              ? "text-muted-foreground hover:text-foreground hover:bg-muted"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
          )}
          title="Next slide"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SlidePlayButton;
