import { AlertTriangle, FileX, Clock, RefreshCcw, ClipboardList } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const painPoints = [
  {
    icon: AlertTriangle,
    label: "Scattered Signals",
    description: "Safety data trapped in silos",
  },
  {
    icon: FileX,
    label: "No Triggers",
    description: "Manual handoffs between systems",
  },
  {
    icon: RefreshCcw,
    label: "Manual Coordination",
    description: "Email chains, spreadsheets, delays",
  },
  {
    icon: Clock,
    label: "Procedural Drift",
    description: "Updates take weeks to reach crews",
  },
  {
    icon: ClipboardList,
    label: "Audit Scrambles",
    description: "Months of prep for every review",
  },
];

interface SalesSlide1ProblemProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide1Problem = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide1ProblemProps) => {
  return (
    <SalesSlideContainer
      id="sales-slide-1"
      title="Point Tools Can't Close the Loop"
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col justify-center">
        {/* Visual: Three disconnected silos */}
        <div className="flex justify-center gap-4 sm:gap-8 mb-8 sm:mb-12">
          {["Safety", "Content", "Training"].map((silo, i) => (
            <div key={silo} className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-destructive/10 border-2 border-destructive/30 flex items-center justify-center">
                <span className="text-destructive font-semibold text-sm sm:text-base">{silo}</span>
              </div>
              {i < 2 && (
                <div className="absolute top-1/2 -right-2 sm:-right-4 w-4 sm:w-8 border-t-2 border-dashed border-destructive/40" />
              )}
            </div>
          ))}
        </div>

        {/* Pain points grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {painPoints.map((point) => (
            <div
              key={point.label}
              className="bg-card/50 border border-border/50 rounded-lg p-4 text-center hover:border-destructive/30 transition-colors"
            >
              <point.icon className="w-6 h-6 mx-auto mb-2 text-destructive/70" />
              <div className="text-sm font-medium text-foreground mb-1">{point.label}</div>
              <div className="text-xs text-muted-foreground">{point.description}</div>
            </div>
          ))}
        </div>

        {/* Emotional hook */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-xl sm:text-2xl text-muted-foreground italic">
            "Sound familiar?"
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide1Problem;
