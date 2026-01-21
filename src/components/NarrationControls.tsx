import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NarrationControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  isLoading: boolean;
  progress: number;
  error: string | null;
  onToggleMute: () => void;
}

const NarrationControls = ({
  isPlaying,
  isMuted,
  isLoading,
  progress,
  error,
  onToggleMute,
}: NarrationControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* Mute/Unmute button */}
      <button
        onClick={onToggleMute}
        className={cn(
          "relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200",
          "bg-card/80 border border-border hover:border-primary/50",
          isMuted && "opacity-60"
        )}
        title={isMuted ? "Unmute narration (M)" : "Mute narration (M)"}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        ) : isMuted ? (
          <VolumeX className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Volume2 
            className={cn(
              "w-4 h-4 transition-colors",
              isPlaying ? "text-primary" : "text-muted-foreground"
            )} 
          />
        )}
        
        <span className="text-xs text-muted-foreground hidden sm:inline">
          {isMuted ? "Unmute" : isPlaying ? "Playing" : "Narration"}
        </span>

        {/* Playing indicator animation */}
        {isPlaying && !isMuted && (
          <div className="flex items-center gap-0.5 ml-1">
            <div className="w-0.5 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
            <div className="w-0.5 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
            <div className="w-0.5 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
          </div>
        )}

        {/* Progress bar overlay */}
        {isPlaying && progress > 0 && (
          <div 
            className="absolute bottom-0 left-0 h-0.5 bg-primary/50 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        )}
      </button>

      {/* Error indicator */}
      {error && (
        <span className="text-xs text-destructive hidden sm:inline">
          {error}
        </span>
      )}
    </div>
  );
};

export default NarrationControls;
