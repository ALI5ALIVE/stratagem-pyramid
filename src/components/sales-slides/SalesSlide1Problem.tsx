import { AlertTriangle, FileX, Clock, RefreshCcw, ClipboardList, Quote } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import FragmentationIllustration from "@/components/FragmentationIllustration";
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

const dayInTheLife = [
  { time: "8:47 AM", event: "FOQA flags hard landing trend", color: "text-amber-500" },
  { time: "Day 3", event: "Safety team opens investigation", color: "text-orange-500" },
  { time: "Week 2", event: "Content team notified via email", color: "text-destructive" },
  { time: "Week 4", event: "Training team still waiting for scope", color: "text-destructive" },
  { time: "Week 8", event: "Audit asks for evidence trail", color: "text-destructive" },
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
      <div className="flex-1 flex flex-col justify-center gap-6">
        {/* Fragmentation Illustration */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg h-24">
            <FragmentationIllustration />
          </div>
        </div>

        {/* Day in the Life Timeline */}
        <div className="max-w-3xl mx-auto w-full">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 text-center">
            A Day in the Life
          </p>
          <div className="flex items-center justify-between gap-2">
            {dayInTheLife.map((item, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="relative">
                  <div className={`text-xs font-bold ${item.color}`}>{item.time}</div>
                  <div className="text-[10px] text-muted-foreground mt-1 leading-tight">{item.event}</div>
                  {i < dayInTheLife.length - 1 && (
                    <div className="absolute top-1 -right-2 w-4 h-px bg-destructive/30" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pain points grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {painPoints.map((point) => (
            <div
              key={point.label}
              className="bg-card/50 border border-border/50 rounded-lg p-3 text-center hover:border-destructive/30 transition-colors"
            >
              <point.icon className="w-5 h-5 mx-auto mb-1.5 text-destructive/70" />
              <div className="text-xs font-medium text-foreground mb-0.5">{point.label}</div>
              <div className="text-[10px] text-muted-foreground">{point.description}</div>
            </div>
          ))}
        </div>

        {/* Emotional quote */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
            <Quote className="w-5 h-5 text-destructive/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground italic">
              "We're always one step behind. By the time we fix something, it's already happened again."
            </p>
            <p className="text-lg sm:text-xl text-foreground font-medium mt-3">
              Sound familiar?
            </p>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide1Problem;
