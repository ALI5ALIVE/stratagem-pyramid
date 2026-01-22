import GDSlideContainer from "./GDSlideContainer";
import { Target, Lightbulb, Tag, Truck, BarChart3, ArrowRight } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

const stages = [
  { 
    icon: Target, 
    title: "Strategy & Portfolio", 
    items: ["Where to play", "Category prioritisation", "Investment focus"],
    color: "from-primary to-sky-400"
  },
  { 
    icon: Lightbulb, 
    title: "Innovation & Product", 
    items: ["Trend discovery", "Whitespace identification", "Concept screening"],
    color: "from-sky-400 to-cyan-400"
  },
  { 
    icon: Tag, 
    title: "Brand, Pricing & Claims", 
    items: ["Positioning", "Pricing strategy", "Claims validation"],
    color: "from-cyan-400 to-teal-400"
  },
  { 
    icon: Truck, 
    title: "Go-to-Market & Sales", 
    items: ["Channel strategy", "Launch planning", "Enablement"],
    color: "from-teal-400 to-green-400"
  },
  { 
    icon: BarChart3, 
    title: "In-Market Performance", 
    items: ["Post-launch monitoring", "Competitive response", "Portfolio optimisation"],
    color: "from-green-400 to-lime-400"
  },
];

const GDSlide5ValueChain = ({
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
      id="gd-slide-5"
      title="Intelligence That Operates, Not Just Reports"
      subtitle="Connected Intelligence works across the full value chain"
      slideNumber={5}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col gap-5 h-full">
        {/* Value Chain Flow */}
        <div className="flex-1">
          <div className="grid grid-cols-5 gap-2">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div key={i} className="flex flex-col items-center">
                  {/* Stage Card */}
                  <div className="w-full bg-card/50 border border-border/50 rounded-xl p-3 hover:border-primary/30 transition-all group">
                    <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center mb-2`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-xs font-semibold text-foreground text-center mb-2 min-h-[32px] leading-tight">
                      {stage.title}
                    </h4>
                    <ul className="space-y-1">
                      {stage.items.map((item, j) => (
                        <li key={j} className="text-[10px] text-muted-foreground text-center leading-tight">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow between stages */}
                  {i < stages.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-primary/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Connecting Line Visual */}
        <div className="relative py-4">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-primary via-sky-500 to-lime-400 rounded-full" />
          <div className="relative flex justify-between px-8">
            {stages.map((_, i) => (
              <div 
                key={i} 
                className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/30"
              />
            ))}
          </div>
        </div>

        {/* What Changes Callout */}
        <div className="bg-gradient-to-r from-primary/10 to-sky-500/5 border border-primary/30 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">What Changes</p>
              <p className="text-base text-foreground leading-relaxed">
                Every function operates from the <span className="font-bold text-primary">same shared truth</span>, so decisions <span className="font-bold text-primary">reinforce each other</span> across the entire value chain.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card/50 border border-border/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-primary">5</p>
            <p className="text-xs text-muted-foreground">Value chain stages</p>
          </div>
          <div className="bg-card/50 border border-border/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-primary">1</p>
            <p className="text-xs text-muted-foreground">Source of truth</p>
          </div>
          <div className="bg-card/50 border border-border/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-primary">∞</p>
            <p className="text-xs text-muted-foreground">Compounding value</p>
          </div>
        </div>
      </div>
    </GDSlideContainer>
  );
};

export default GDSlide5ValueChain;
