import GDSlideContainer from "./GDSlideContainer";
import { Clock, TrendingUp, DollarSign, ArrowRight, Zap } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

const roiPillars = [
  { 
    icon: Clock, 
    title: "Speed to Decision", 
    before: "Weeks",
    after: "Days",
    improvement: "70%",
    label: "faster decision cycles",
    desc: "Decision cycles shrink from weeks to days",
    color: "from-blue-500 to-cyan-400"
  },
  { 
    icon: TrendingUp, 
    title: "Better Growth Outcomes", 
    before: "Reactive bets",
    after: "Proactive bets",
    improvement: "2x",
    label: "higher launch success",
    desc: "Higher-quality bets, fewer failed launches",
    color: "from-cyan-400 to-emerald-400"
  },
  { 
    icon: DollarSign, 
    title: "Lower Cost of Intelligence", 
    before: "Tool sprawl",
    after: "Unified platform",
    improvement: "30%",
    label: "lower TCO",
    desc: "Less duplication, fewer tools, less manual reconciliation",
    color: "from-emerald-400 to-teal-400"
  },
];

const GDSlide8ROI = ({
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
      id="gd-slide-8"
      title="ROI Shows Up in Three Places"
      subtitle="Measurable returns that compound as maturity increases"
      slideNumber={8}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col gap-6 h-full">
        {/* ROI Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-5 flex-1">
          {roiPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={i}
                className="bg-card/50 border border-border/50 rounded-xl p-5 hover:border-emerald-500/30 transition-all group flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{pillar.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{pillar.desc}</p>
                  </div>
                </div>

                {/* Before/After */}
                <div className="bg-muted/30 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-destructive line-through">{pillar.before}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">{pillar.after}</span>
                  </div>
                </div>

                {/* Improvement Metric */}
                <div className="mt-auto pt-4 border-t border-border/30 text-center">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-4xl font-bold text-emerald-400">{pillar.improvement}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{pillar.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compounding Message */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">Key Message</p>
              <p className="text-base text-foreground leading-relaxed">
                <span className="font-bold text-emerald-400">ROI compounds</span> as organisations move up the maturity curve. The sooner you start, the faster value accumulates.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Compounding Chart */}
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((stage) => (
              <div key={stage} className="flex flex-col items-center">
                <div 
                  className="w-16 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg transition-all"
                  style={{ 
                    height: `${20 + stage * 20}px`,
                    opacity: stage * 0.2 + 0.2
                  }}
                />
                <span className="text-xs text-muted-foreground mt-2">Stage {stage}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-border/30">
            <ArrowRight className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-muted-foreground">Value compounds exponentially as maturity increases</span>
          </div>
        </div>
      </div>
    </GDSlideContainer>
  );
};

export default GDSlide8ROI;
