import { AlertTriangle, Plane, Megaphone } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const fragmentationProblems = [
  "Issues are identified, but action is inconsistent",
  "Training is delivered, but readiness is not always clear",
  "Compliance activity is completed, but operational impact is difficult to track",
  "Content is produced, but not always connected to behaviour change or operational follow-through",
  "Leaders can see activity, but not always line of sight from work to outcome",
];

const SlideStrategyOverview = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="slide-strategy-overview"
      title="Strategy Overview"
      subtitle="Why this programme exists and the idea at its centre"
      slideNumber={1}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-3 h-full overflow-hidden">

        {/* 1 — The Market Challenge — full width */}
        <div className="bg-card/60 border border-border/50 rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <h3 className="text-base font-bold text-foreground">The Market Challenge</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            Most organisations still manage performance through separate improvement streams. Safety teams 
            focus on one set of issues. Training teams focus on another. Compliance teams work to maintain 
            control and evidence. Content sits elsewhere. IT often supports systems rather than performance outcomes.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            The result is a <span className="text-foreground font-semibold">fragmented model</span> where 
            teams work hard, but progress is harder to connect, coordinate, and prove.
          </p>
          <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 mt-auto">
            {fragmentationProblems.map((problem, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2 shrink-0" />
                <span className="text-xs text-foreground/70 leading-snug">{problem}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2 — Two-column: Central Idea + Content Theme */}
        <div className="grid grid-cols-2 gap-3">
          {/* Central Idea */}
          <div className="bg-primary/10 border border-primary/30 rounded-xl px-5 py-4 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Plane className="w-5 h-5 text-primary" />
              <p className="text-[10px] text-primary uppercase tracking-widest font-semibold">The Central Idea</p>
            </div>
            <p className="text-sm text-foreground leading-relaxed font-medium flex-1">
              Aviation organisations do not improve performance through safety, training, compliance, content, 
              or IT in isolation. They improve when those functions work together through a shared 
              model that helps teams see what matters, act with consistency, maintain readiness, and prove 
              progress over time.
            </p>
          </div>

          {/* Content Theme */}
          <div className="bg-accent/10 border border-accent/30 rounded-xl px-5 py-4 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Megaphone className="w-5 h-5 text-accent-foreground" />
              <p className="text-[10px] text-accent-foreground uppercase tracking-widest font-semibold">The Content Theme</p>
            </div>
            <h3 className="text-base font-display font-bold text-foreground mb-1">
              Flying High — Raise Performance Without Raising Risk
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">
              A 12-month content programme designed to help the market move from fragmented activity to connected 
              operational performance — educating buyers, introducing a clearer operating model, and supporting 
              buying groups to align internally and take action.
            </p>
            <p className="text-[11px] text-foreground/60 mt-2 italic">
              A content programme about performance, not a campaign about product features.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideStrategyOverview;
