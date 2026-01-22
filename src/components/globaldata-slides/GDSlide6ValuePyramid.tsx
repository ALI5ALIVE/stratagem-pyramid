import { useState, useEffect } from "react";
import GDSlideContainer from "./GDSlideContainer";
import { Layers, Link, Settings, Sparkles, Brain, ArrowUp, ChevronRight } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

const stages = [
  { 
    id: "fragmented",
    level: 1, 
    icon: Layers,
    title: "Fragmented", 
    sublabel: "Multiple tools, manual reconciliation",
    color: "from-red-500 to-orange-500",
    desc: "Insights scattered across tools. No shared taxonomy. Conflicting answers.",
    result: "Decisions debated for weeks. Launches miss windows."
  },
  { 
    id: "managed",
    level: 2, 
    icon: Settings,
    title: "Managed", 
    sublabel: "Structured but disconnected",
    color: "from-orange-500 to-amber-500",
    desc: "Tools organised within silos. Local optimization. Limited cross-functional visibility.",
    result: "Better within silos, but still no unified view."
  },
  { 
    id: "connected",
    level: 3, 
    icon: Link,
    title: "Connected", 
    sublabel: "Single source of truth",
    color: "from-amber-500 to-emerald-500",
    desc: "Market, consumer, competitor, innovation, commercial intelligence unified. Shared governance.",
    result: "Decisions align. Speed increases. Confidence grows.",
    isShift: true
  },
  { 
    id: "optimized",
    level: 4, 
    icon: Sparkles,
    title: "Optimized", 
    sublabel: "Embedded workflows",
    color: "from-emerald-500 to-teal-500",
    desc: "Intelligence triggers actions. Workflows automated. Continuous improvement embedded.",
    result: "Faster GTM cycles. Higher launch success rates."
  },
  { 
    id: "predictive",
    level: 5, 
    icon: Brain,
    title: "Predictive", 
    sublabel: "AI-driven foresight",
    color: "from-teal-500 to-cyan-500",
    desc: "AI anticipates market shifts. Proactive positioning. Decisions before competitors react.",
    result: "Category leadership through speed and foresight."
  },
];

const stageTimings = [
  { stage: 0, startPercent: 10 },
  { stage: 1, startPercent: 25 },
  { stage: 2, startPercent: 45 },
  { stage: 3, startPercent: 65 },
  { stage: 4, startPercent: 80 },
];

const GDSlide6ValuePyramid = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activeStage, setActiveStage] = useState(0);
  const [isNarrationControlled, setIsNarrationControlled] = useState(false);

  useEffect(() => {
    if (isPlaying && progress > 0) {
      setIsNarrationControlled(true);
      const currentTiming = [...stageTimings]
        .reverse()
        .find(t => progress >= t.startPercent);
      if (currentTiming && currentTiming.stage !== activeStage) {
        setActiveStage(currentTiming.stage);
      }
    } else if (!isPlaying && isNarrationControlled) {
      setIsNarrationControlled(false);
    }
  }, [isPlaying, progress, activeStage, isNarrationControlled]);

  const selectedStage = stages[activeStage];

  return (
    <GDSlideContainer
      id="gd-slide-6"
      title="From Fragmented Insight to Predictive Leadership"
      subtitle="Connected Intelligence delivers compounding value as maturity increases"
      slideNumber={6}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="grid lg:grid-cols-2 gap-6 h-full items-center">
        {/* Pyramid Visual */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* Vertical Arrow */}
            <div className="absolute -left-8 top-0 bottom-0 flex flex-col items-center justify-center">
              <ArrowUp className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="h-full w-0.5 bg-gradient-to-b from-emerald-400 to-transparent" />
              <span className="text-[9px] text-muted-foreground uppercase tracking-wider mt-2 whitespace-nowrap -rotate-90 origin-center translate-y-8">
                Value Compounds
              </span>
            </div>

            {/* Pyramid Layers */}
            <div className="space-y-2">
              {[...stages].reverse().map((stage, i) => {
                const reverseIndex = stages.length - 1 - i;
                const isActive = reverseIndex === activeStage;
                const Icon = stage.icon;
                const widthPercent = 50 + (i * 12.5);

                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(reverseIndex)}
                    className={`
                      relative mx-auto rounded-lg p-3 transition-all duration-300 cursor-pointer
                      flex items-center gap-3
                      ${isActive 
                        ? 'bg-gradient-to-r border-2 shadow-lg scale-105' 
                        : 'bg-card/50 border border-border/50 hover:border-emerald-500/30'
                      }
                      ${isActive ? stage.color : ''}
                      ${isActive ? 'border-white/30' : ''}
                    `}
                    style={{ width: `${widthPercent}%` }}
                  >
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                      ${isActive ? 'bg-white/20' : 'bg-muted/50'}
                    `}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-foreground'}`}>
                        {stage.title}
                      </div>
                      <div className={`text-[10px] ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {stage.sublabel}
                      </div>
                    </div>
                    {stage.isShift && (
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-emerald-500 rounded text-[8px] text-white font-bold uppercase">
                        Shift
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className={`space-y-4 ${isNarrationControlled ? 'animate-fade-in' : ''}`}>
          {/* Stage Header */}
          <div className={`bg-gradient-to-r ${selectedStage.color} rounded-xl p-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <selectedStage.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm font-mono">Stage {selectedStage.level}</span>
                  {selectedStage.isShift && (
                    <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] text-white font-semibold uppercase">
                      Platform Shift
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">{selectedStage.title}</h3>
              </div>
            </div>
          </div>

          {/* What it looks like */}
          <div className="bg-card/50 border border-border/50 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">What It Looks Like</p>
            <p className="text-sm text-foreground">{selectedStage.desc}</p>
          </div>

          {/* Result */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Result</p>
            <p className="text-sm text-foreground">{selectedStage.result}</p>
          </div>

          {/* Value Logic */}
          <div className="bg-card border border-border/50 rounded-lg p-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Value Logic</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground">Alignment enables</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Speed</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
              <span className="text-foreground">enables</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Outcomes</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
              <span className="text-foreground">enables</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Impact</span>
            </div>
          </div>

          {/* Stage Dots */}
          <div className="flex items-center justify-center gap-2">
            {stages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStage(i)}
                className={`
                  w-2.5 h-2.5 rounded-full transition-all duration-300
                  ${i === activeStage 
                    ? 'bg-emerald-400 scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </GDSlideContainer>
  );
};

export default GDSlide6ValuePyramid;
