import GDSlideContainer from "./GDSlideContainer";
import { Layers, MessageSquareWarning, Clock, AlertOctagon, ArrowRight } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

const rootCauses = [
  { 
    icon: Layers, 
    title: "Signals Fragment", 
    desc: "Across tools, teams, and vendors",
    detail: "No single source of truth"
  },
  { 
    icon: MessageSquareWarning, 
    title: "Leaders Debate", 
    desc: "Data instead of committing to direction",
    detail: "Analysis paralysis"
  },
  { 
    icon: Clock, 
    title: "Decisions Arrive Late", 
    desc: "Too late to matter",
    detail: "Missed windows"
  },
];

const impacts = [
  { value: "12+", label: "weeks", desc: "average decision latency" },
  { value: "3-5", label: "sources", desc: "conflicting data per decision" },
  { value: "40%", label: "launches", desc: "miss optimal windows" },
];

const GDSlide2IntelligenceGap = ({
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
      id="gd-slide-2"
      title="Where Growth and Leadership Are Lost"
      subtitle="The Intelligence Gap is the delay between real-world change and enterprise action"
      slideNumber={2}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col gap-6 h-full">
        {/* Definition Box */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertOctagon className="w-5 h-5 text-destructive" />
            <span className="text-sm font-semibold text-destructive uppercase tracking-wider">The Intelligence Gap</span>
          </div>
          <p className="text-lg font-medium text-foreground">
            The delay between <span className="text-destructive">real-world change</span> and <span className="text-destructive">enterprise action</span>.
          </p>
        </div>

        {/* Root Causes Flow */}
        <div className="flex-1 grid lg:grid-cols-2 gap-6 items-start">
          {/* Left: Root Causes */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Why It Exists</p>
            <div className="space-y-3">
              {rootCauses.map((cause, i) => (
                <div 
                  key={i}
                  className="flex items-start gap-3 bg-card/50 border border-border/50 rounded-lg p-4 group hover:border-destructive/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                      <cause.icon className="w-4 h-4 text-destructive" />
                    </div>
                    {i < rootCauses.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-muted-foreground/30 hidden sm:block" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground">{cause.title}</h4>
                    <p className="text-xs text-muted-foreground">{cause.desc}</p>
                    <p className="text-xs text-destructive mt-1">{cause.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quantified Impact */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Quantified Impact</p>
            <div className="grid gap-3">
              {impacts.map((impact, i) => (
                <div 
                  key={i}
                  className="bg-gradient-to-r from-destructive/10 to-transparent border border-destructive/20 rounded-lg p-4 flex items-center gap-4"
                >
                  <div className="text-right min-w-[80px]">
                    <span className="text-3xl font-bold text-destructive">{impact.value}</span>
                    <span className="text-sm text-destructive ml-1">{impact.label}</span>
                  </div>
                  <div className="flex-1 border-l border-destructive/20 pl-4">
                    <p className="text-sm text-foreground">{impact.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="bg-card border-2 border-destructive/30 rounded-xl p-5 text-center">
          <p className="text-sm font-semibold text-destructive uppercase tracking-wider mb-2">Bottom Line</p>
          <p className="text-lg font-medium text-foreground">
            This gap is where <span className="text-destructive">growth stalls</span>, <span className="text-destructive">relevance erodes</span>, and <span className="text-destructive">leadership is lost</span>.
          </p>
        </div>
      </div>
    </GDSlideContainer>
  );
};

export default GDSlide2IntelligenceGap;
