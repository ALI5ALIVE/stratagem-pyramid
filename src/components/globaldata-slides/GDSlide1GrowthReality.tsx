import GDSlideContainer from "./GDSlideContainer";
import { TrendingDown, Clock, Users, AlertTriangle, Zap } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

const painPoints = [
  { 
    icon: TrendingDown, 
    title: "Market Velocity", 
    desc: "Consumer behaviour shifts faster than insight cycles can track",
    stat: "3x",
    statLabel: "faster shifts"
  },
  { 
    icon: Clock, 
    title: "Shrinking Windows", 
    desc: "Innovation and GTM windows are shorter and less forgiving",
    stat: "40%",
    statLabel: "narrower"
  },
  { 
    icon: Users, 
    title: "Asymmetric Competition", 
    desc: "Competitors scale faster with fewer assets",
    stat: "2x",
    statLabel: "faster rivals"
  },
];

const GDSlide1GrowthReality = ({
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
      id="gd-slide-1"
      title="Markets Reward Speed and Conviction"
      subtitle="The growth reality every consumer brand faces"
      slideNumber={1}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col gap-6 h-full">
        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {painPoints.map((point, i) => (
            <div 
              key={i}
              className="bg-card/50 border border-border/50 rounded-xl p-5 hover:border-destructive/30 transition-all group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                  <point.icon className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{point.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{point.desc}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-1.5 pt-3 border-t border-border/30">
                <span className="text-2xl font-bold text-destructive">{point.stat}</span>
                <span className="text-xs text-muted-foreground">{point.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* The Paradox */}
        <div className="flex-1 grid lg:grid-cols-2 gap-4 items-center">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">The Paradox</span>
            </div>
            <p className="text-lg font-medium text-foreground leading-relaxed mb-4">
              Organisations have <span className="text-amber-400">more insight than ever</span>, yet <span className="text-amber-400">less confidence</span>.
            </p>
            <p className="text-sm text-muted-foreground">
              Data abundance hasn't created clarity. It's created noise, debate, and delayed decisions.
            </p>
          </div>

          <div className="bg-gradient-to-br from-destructive/10 to-red-500/5 border border-destructive/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-destructive" />
              <span className="text-sm font-semibold text-destructive uppercase tracking-wider">The Real Problem</span>
            </div>
            <p className="text-lg font-medium text-foreground leading-relaxed mb-4">
              Insight exists, but it doesn't <span className="text-destructive">move the organisation together</span>.
            </p>
            <p className="text-sm text-muted-foreground">
              The problem isn't data scarcity. It's data fragmentation and misalignment.
            </p>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="bg-card border border-border/50 rounded-lg p-4 text-center">
          <p className="text-sm text-foreground">
            <span className="font-semibold text-primary">Category leaders</span> don't just have better data — they have <span className="font-semibold text-primary">connected intelligence</span> that enables faster, unified action.
          </p>
        </div>
      </div>
    </GDSlideContainer>
  );
};

export default GDSlide1GrowthReality;
