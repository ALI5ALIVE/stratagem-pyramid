import { useState } from "react";
import { Shield, Zap, Target, TrendingUp, AlertOctagon, RefreshCw, Cog, Radio, RotateCcw, BadgeCheck } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";
import { STRATEGY_QUARTERS, type StrategyQuarter } from "@/data/contentStrategy";

interface JourneyStage {
  num: number;
  title: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

type Quarter = StrategyQuarter & {
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderAccent: string;
};

const QUARTER_VISUALS: Record<StrategyQuarter["id"], Pick<Quarter, "icon" | "color" | "bgColor" | "borderAccent">> = {
  q1: { icon: Shield,     color: "text-blue-400",    bgColor: "bg-blue-400/10",    borderAccent: "border-blue-400/40" },
  q2: { icon: Zap,        color: "text-amber-400",   bgColor: "bg-amber-400/10",   borderAccent: "border-amber-400/40" },
  q3: { icon: Target,     color: "text-emerald-400", bgColor: "bg-emerald-400/10", borderAccent: "border-emerald-400/40" },
  q4: { icon: TrendingUp, color: "text-purple-400",  bgColor: "bg-purple-400/10",  borderAccent: "border-purple-400/40" },
};

const journeyStages: JourneyStage[] = [
  { num: 1, title: "The status quo is failing", icon: AlertOctagon, color: "text-red-400", bg: "bg-red-400" },
  { num: 2, title: "Performance needs redefining", icon: RefreshCw, color: "text-amber-400", bg: "bg-amber-400" },
  { num: 3, title: "There is a better operating model", icon: Cog, color: "text-emerald-400", bg: "bg-emerald-400" },
  { num: 4, title: "Signals create line of sight", icon: Radio, color: "text-blue-400", bg: "bg-blue-400" },
  { num: 5, title: "Readiness becomes continuous", icon: RotateCcw, color: "text-purple-400", bg: "bg-purple-400" },
  { num: 6, title: "Progress can be proved", icon: BadgeCheck, color: "text-primary", bg: "bg-primary" },
];

const quarters: Quarter[] = STRATEGY_QUARTERS.map((q) => ({ ...q, ...QUARTER_VISUALS[q.id] }));


const SlideContentStrategy = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activeQuarter, setActiveQuarter] = useState(0);
  const q = quarters[activeQuarter];

  return (
    <SlideContainer
      id="slide-content-strategy"
      title="Quarterly Strategy"
      subtitle="Four chapters that build the case — from foundation to proof"
      slideNumber={4}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
      className="!h-auto !min-h-screen !overflow-visible"
    >
      <div className="flex flex-col gap-4">
        {/* Quarter tabs */}
        <div className="flex gap-2">
          {quarters.map((quarter, i) => {
            const Icon = quarter.icon;
            return (
              <button
                key={quarter.id}
                onClick={() => setActiveQuarter(i)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                  activeQuarter === i
                    ? `${quarter.bgColor} ${quarter.borderAccent} scale-[1.02]`
                    : "bg-card/30 border-border/20 hover:border-border/50 hover:bg-card/50"
                )}
              >
                <Icon className={cn("w-5 h-5", activeQuarter === i ? quarter.color : "text-muted-foreground")} />
                <div className="text-sm font-bold text-foreground">{quarter.label}: {quarter.theme}</div>
                <div className="text-xs text-muted-foreground">{quarter.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Content Journey Stages — 6 stages strip */}
        <div className="grid grid-cols-6 gap-2">
          {journeyStages.map((stage) => {
            const StageIcon = stage.icon;
            const isActive = q.journeyStageNums.includes(stage.num);
            return (
              <div
                key={stage.num}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all",
                  isActive
                    ? `${stage.bg} border-transparent shadow-sm`
                    : "bg-card/20 border-border/20 opacity-40"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                  isActive ? "text-white" : "text-muted-foreground"
                )}>
                  {stage.num}
                </div>
                <p className={cn("text-xs leading-tight", isActive ? "text-white font-medium" : "text-muted-foreground")}>{stage.title}</p>
              </div>
            );
          })}
        </div>

        {/* Core message */}
        <div className={cn("rounded-xl px-6 py-4 border-2", q.bgColor, q.borderAccent)}>
          <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-1">Core Message</p>
          <p className="text-lg text-foreground font-bold">{q.quarterMessage}</p>
        </div>

        {/* Three-column: Narrative + DTOP Role + Message Territory — restyled with stronger separation */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-muted/50 border border-border rounded-xl px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full bg-primary" />
              <p className="text-xs text-foreground uppercase tracking-wider font-bold">Quarter Narrative</p>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{q.narrative}</p>
          </div>
          <div className="bg-muted/50 border border-border rounded-xl px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full bg-accent-foreground" />
              <p className="text-xs text-foreground uppercase tracking-wider font-bold">Role of DTOP</p>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{q.dtopRole}</p>
          </div>
          <div className="bg-muted/50 border border-border rounded-xl px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full bg-primary" />
              <p className="text-xs text-foreground uppercase tracking-wider font-bold">Message Territory</p>
            </div>
            <div className="space-y-2">
              {q.messageTerritory.map((msg) => (
                <div key={msg} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                  <p className="text-sm text-foreground/70 leading-snug">{msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Ideas — Pinterest-style masonry with distinct background */}
        <div className="bg-muted border border-border rounded-2xl p-6 -mx-2">
          <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-4">
            Content Ideas · {q.assets.length} assets
          </p>
          <div className="columns-3 gap-4 space-y-4">
            {q.assets.map((asset, i) => (
              <div
                key={asset.title}
                className={cn(
                  "break-inside-avoid rounded-xl border px-5 py-4",
                  i % 2 === 0
                    ? "bg-background border-border/60"
                    : "bg-card border-border/40"
                )}
              >
                <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">{asset.format}</p>
                <h4 className="text-sm font-bold text-foreground leading-snug">{asset.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 mb-2">{asset.audience}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">{asset.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideContentStrategy;
