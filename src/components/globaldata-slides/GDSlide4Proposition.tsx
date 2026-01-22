import GDSlideContainer from "./GDSlideContainer";
import { XCircle, CheckCircle2 } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";
import ConnectedIntelligenceWheel from "./ConnectedIntelligenceWheel";

const replaces = [
  "Tool sprawl across vendors",
  "Manual reconciliation",
  "Conflicting answers",
];

const notThis = [
  "Another dataset",
  "Another dashboard",
  "Another point solution",
];

const GDSlide4Proposition = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  return (
    <GDSlideContainer
      id="gd-slide-4"
      title="Connected Intelligence for Consumer Brands"
      subtitle="Closing the Intelligence Gap"
      slideNumber={4}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col gap-5 h-full">
        {/* Central Value Proposition */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 rounded-xl p-6">
          <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed text-center">
            A <span className="text-emerald-400 font-bold">unified solution</span> that connects market, consumer, competitor, innovation, and commercial intelligence into <span className="text-emerald-400 font-bold">one trusted system</span> — so organisations move faster, align better, and act with confidence.
          </p>
        </div>

        {/* Intelligence Domains Hub */}
        <div className="flex-1 grid lg:grid-cols-2 gap-6 items-center">
          {/* Connected Intelligence Wheel */}
          <div className="flex items-center justify-center py-4">
            <ConnectedIntelligenceWheel />
          </div>

          {/* What it replaces / What it is NOT */}
          <div className="space-y-4">
            {/* What it replaces */}
            <div className="bg-card/50 border border-border/50 rounded-xl p-4">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">What It Replaces</p>
              <div className="space-y-2">
                {replaces.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What it is NOT */}
            <div className="bg-card/50 border border-destructive/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-3">What It Is NOT</p>
              <div className="space-y-2">
                {notThis.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-destructive shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center">
          <p className="text-sm text-foreground">
            This is <span className="font-bold text-emerald-400">intelligence designed to drive decisions end-to-end</span> — not another layer of data.
          </p>
        </div>
      </div>
    </GDSlideContainer>
  );
};

export default GDSlide4Proposition;
