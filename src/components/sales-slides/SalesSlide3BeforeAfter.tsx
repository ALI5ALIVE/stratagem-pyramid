import { X, Check, ArrowRight } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const beforeItems = [
  "Scattered data silos",
  "Manual handoffs",
  "Reactive responses",
  "Audit scrambles",
];

const afterItems = [
  "Connected platform",
  "Automated triggers",
  "Proactive action",
  "Continuous proof",
];

const metrics = [
  { label: "OTP", value: "+3.2%" },
  { label: "Ready", value: "94%" },
  { label: "Audit", value: "2hr" },
];

interface SalesSlide3BeforeAfterProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide3BeforeAfter = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide3BeforeAfterProps) => {
  return (
    <SalesSlideContainer
      id="sales-slide-3"
      title="From Fragmentation to Connected Operations"
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
        {/* Before/After comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8 sm:mb-12">
          {/* Before */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="w-4 h-4 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-destructive">Before</h3>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <X className="w-4 h-4 text-destructive/60 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-500">After</h3>
            </div>
            <ul className="space-y-4">
              {afterItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-500/60 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Metrics bar */}
        <div className="flex justify-center items-center gap-6 sm:gap-12">
          {metrics.map((m, i) => (
            <div key={m.label} className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{m.value}</div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
              </div>
              {i < metrics.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground/30 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide3BeforeAfter;
