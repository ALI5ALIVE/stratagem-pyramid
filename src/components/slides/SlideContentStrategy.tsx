import { useState } from "react";
import { Shield, Zap, Target, TrendingUp, Quote, ChevronRight } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface Quarter {
  id: string;
  label: string;
  theme: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderAccent: string;
  objective: string;
  coreMessage: string;
  outcome: string;
  assetCount: number;
  heroAssets: { title: string; format: string }[];
}

const quarters: Quarter[] = [
  {
    id: "q1",
    label: "Q1",
    theme: "Build the Foundation",
    subtitle: "Apr · May · Jun",
    icon: Shield,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderAccent: "border-blue-400/40",
    objective: "Challenge the status quo, define operational performance, and show why fragmented systems reduce performance.",
    coreMessage: "Performance breaks down when content, safety, training, compliance, and IT improve separately.",
    outcome: "Buyers understand that the problem is structural, the cost is real, and a unified model is needed.",
    assetCount: 18,
    heroAssets: [
      { title: "Flying High Report: Chapter 1", format: "Flagship" },
      { title: "Build the Foundation for Performance", format: "Campaign Guide" },
      { title: "Why Fragmented Systems Quietly Reduce Performance", format: "Webinar" },
      { title: "The Operational Performance Baseline", format: "Decision Asset" },
    ],
  },
  {
    id: "q2",
    label: "Q2",
    theme: "From Signals to Action",
    subtitle: "Jul · Aug · Sep",
    icon: Zap,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderAccent: "border-amber-400/40",
    objective: "Make DTOP practical, explain signals clearly, and show how performance improves when teams move faster from detection to coordinated action.",
    coreMessage: "Performance improves when organisations know what matters, know when to act, and can coordinate the right response across teams.",
    outcome: "Buyers understand DTOP, the role of signals, and the value of moving from visibility to coordinated action.",
    assetCount: 12,
    heroAssets: [
      { title: "Flying High Report: Chapter 2", format: "Flagship" },
      { title: "From Signal to Action", format: "Campaign Guide" },
      { title: "Closing the Gap Between Signal and Response", format: "Webinar" },
      { title: "Signal-to-Action Gap Diagnostic", format: "Decision Asset" },
    ],
  },
  {
    id: "q3",
    label: "Q3",
    theme: "Make Readiness Continuous",
    subtitle: "Oct · Nov · Dec",
    icon: Target,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderAccent: "border-emerald-400/40",
    objective: "Show that readiness is not an event or completion metric. It is an ongoing performance condition created by better alignment across training, compliance, safety, and operational change.",
    coreMessage: "Readiness improves when teams stop managing capability, training, and compliance in separate cycles.",
    outcome: "Buyers understand how continuous readiness supports stronger performance, greater confidence, and more consistent execution.",
    assetCount: 12,
    heroAssets: [
      { title: "Flying High Report: Chapter 3", format: "Flagship" },
      { title: "Make Readiness Continuous", format: "Campaign Guide" },
      { title: "Continuous Readiness in Practice", format: "Webinar" },
      { title: "Readiness Scorecard", format: "Decision Asset" },
    ],
  },
  {
    id: "q4",
    label: "Q4",
    theme: "Prove Performance at Scale",
    subtitle: "Jan · Feb · Mar",
    icon: TrendingUp,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderAccent: "border-purple-400/40",
    objective: "Help buying groups define proof, measure progress, and build the internal case for wider rollout, investment, or adoption.",
    coreMessage: "Performance only scales when leaders can see progress clearly, trust the evidence, and justify action with confidence.",
    outcome: "Buyers can define what proof looks like, show progress internally, and support decisions around scale.",
    assetCount: 12,
    heroAssets: [
      { title: "Flying High Report: Chapter 4", format: "Flagship" },
      { title: "Prove Performance at Scale", format: "Campaign Guide" },
      { title: "How to Prove Progress Without More Reporting Burden", format: "Webinar" },
      { title: "Operational Performance Business Case Pack", format: "Decision Asset" },
    ],
  },
];

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
      subtitle="Four chapters that build the case for connected operational performance"
      slideNumber={3}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-3 h-full overflow-hidden">
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
                <div className="text-[11px] font-bold text-foreground">{quarter.label}: {quarter.theme}</div>
                <div className="text-[9px] text-muted-foreground">{quarter.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Active quarter detail */}
        <div className={cn("flex-1 rounded-xl border-2 p-5 flex flex-col overflow-hidden", q.bgColor, q.borderAccent)}>
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <q.icon className={cn("w-5 h-5", q.color)} />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{q.label} · {q.theme} · {q.subtitle}</span>
              <span className={cn("ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full", q.bgColor, q.color)}>{q.assetCount} assets</span>
            </div>
          </div>

          {/* Objective */}
          <div className="bg-background/60 rounded-lg px-4 py-3 mb-3 border border-border/30">
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Quarter Objective</p>
            <p className="text-[11px] text-foreground leading-relaxed">{q.objective}</p>
          </div>

          {/* Core message */}
          <div className="bg-background/80 rounded-lg px-4 py-3 mb-3 border-2 border-primary/20">
            <div className="flex gap-2">
              <Quote className={cn("w-4 h-4 mt-0.5 shrink-0", q.color)} />
              <div>
                <p className="text-[9px] text-primary uppercase tracking-wider font-semibold mb-1">Core Message</p>
                <p className="text-sm text-foreground font-medium leading-relaxed">{q.coreMessage}</p>
              </div>
            </div>
          </div>

          {/* Bottom: Outcome + Hero assets */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            <div className="bg-background/40 rounded-lg p-3 flex flex-col">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">By End of {q.label}</p>
              <p className="text-[11px] text-foreground/80 leading-relaxed flex-1">{q.outcome}</p>
            </div>

            <div className="bg-background/40 rounded-lg p-3">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Hero Assets</p>
              <div className="space-y-1.5">
                {q.heroAssets.map((asset) => (
                  <div key={asset.title} className="flex items-start gap-1.5">
                    <ChevronRight className={cn("w-3 h-3 mt-0.5 shrink-0", q.color)} />
                    <div>
                      <span className="text-[10px] text-foreground/80 font-medium">{asset.title}</span>
                      <span className="text-[9px] text-muted-foreground ml-1">· {asset.format}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideContentStrategy;
