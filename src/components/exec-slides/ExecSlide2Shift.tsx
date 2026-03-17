import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";

interface ExecSlide2ShiftProps extends SlideNarrationProps {
  slideNumber?: number;
}

const beforeItems = [
  "Siloed safety, training, and compliance tools",
  "Reactive — investigate after the event",
  "Manual evidence gathering for audits",
  "Insights trapped in disconnected systems",
];

const afterItems = [
  "One connected platform across operations",
  "Proactive — detect and intervene before impact",
  "Continuous, automated proof of performance",
  "Intelligence that flows from signal to outcome",
];

const ExecSlide2Shift = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: ExecSlide2ShiftProps) => {
  return (
    <SalesSlideContainer
      id="exec-slide-2"
      title="The Shift"
      subtitle="From reactive event management to proactive control management."
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          {/* Before */}
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 space-y-4">
            <h3 className="text-lg font-bold text-destructive flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Today: Point Tools
            </h3>
            <ul className="space-y-3">
              {beforeItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive/50 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex flex-col items-center gap-2">
            <ArrowRight className="w-10 h-10 text-primary" />
            <span className="text-xs text-primary font-semibold uppercase tracking-wider">Transform</span>
          </div>

          {/* After */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-4">
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Tomorrow: Connected Platform
            </h3>
            <ul className="space-y-3">
              {afterItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default ExecSlide2Shift;
