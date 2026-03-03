import { useState } from "react";
import { Shield, Zap, Target, TrendingUp, Quote, ChevronRight, AlertOctagon, RefreshCw, Cog, Radio, RotateCcw, BadgeCheck } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface JourneyStage {
  num: number;
  title: string;
  icon: React.ElementType;
  color: string;
}

interface Quarter {
  id: string;
  label: string;
  theme: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderAccent: string;
  narrative: string;
  quarterMessage: string;
  dtopRole: string;
  messageTerritory: string[];
  strapline: string;
  journeyStages: JourneyStage[];
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
    narrative: "Performance breaks down when safety, compliance, training, content, and IT improve separately. Before organisations can improve how they act, they need a connected foundation built on shared visibility, governance, and accountability.",
    quarterMessage: "You cannot raise performance on fragmented foundations.",
    dtopRole: "Introduce Detect as the need to see what matters clearly, and prepare the ground for Trigger, Orchestrate, and Improve by showing why disconnected systems weaken the whole performance model.",
    messageTerritory: [
      "The market is still managing performance in silos",
      "Fragmented systems reduce control and slow progress",
      "Connected foundations are the first step to better performance",
    ],
    strapline: "Build the foundation. Strengthen the line of sight.",
    journeyStages: [
      { num: 1, title: "The status quo is failing", icon: AlertOctagon, color: "text-red-400" },
      { num: 2, title: "Performance needs redefining", icon: RefreshCw, color: "text-amber-400" },
    ],
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
    narrative: "Operational performance is shaped by what happens after something important is identified. The real challenge is not simply visibility — it is how quickly and consistently teams trigger response, coordinate action, and close the gap between issue and follow-through.",
    quarterMessage: "Performance improves when signals lead to action, not delay.",
    dtopRole: "DTOP comes fully into view: Detect what matters → Trigger the right response → Orchestrate cross-functional action → Begin to Improve through follow-through and learning.",
    messageTerritory: [
      "Visibility alone does not improve performance",
      "Signals create value when ownership is clear",
      "Coordinated response reduces lag and strengthens control",
    ],
    strapline: "From signal to action. From awareness to control.",
    journeyStages: [
      { num: 3, title: "There is a better operating model", icon: Cog, color: "text-emerald-400" },
      { num: 4, title: "Signals create line of sight", icon: Radio, color: "text-blue-400" },
    ],
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
    narrative: "Readiness should not be treated as a periodic push or a completion exercise. It is an ongoing performance capability built when training, compliance, and operational change work together inside a connected model.",
    quarterMessage: "Readiness is not an event. It is a condition of performance.",
    dtopRole: "Emphasises the back half of DTOP: stronger Orchestrate across functions, clearer Improve through role-based readiness, consistency, and confidence over time.",
    messageTerritory: [
      "Readiness goes beyond training completion",
      "Continuous readiness improves predictability and control",
      "Role-based alignment strengthens performance across teams",
    ],
    strapline: "Make readiness continuous. Make performance more predictable.",
    journeyStages: [
      { num: 5, title: "Readiness becomes continuous", icon: RotateCcw, color: "text-purple-400" },
    ],
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
    narrative: "Performance improvement only scales when organisations can prove progress, readiness, and control across teams and regions. Leaders need more than activity reporting — they need evidence that supports confident decisions.",
    quarterMessage: "Performance only scales when progress can be proved.",
    dtopRole: "Completes the DTOP story by focusing on Improve as measurable, repeatable, and scalable. The operating model turns into evidence, confidence, and wider rollout potential.",
    messageTerritory: [
      "Proof matters more than reporting volume",
      "Standardisation strengthens confidence at scale",
      "Visibility, readiness, and evidence support investment and expansion",
    ],
    strapline: "Prove performance. Build confidence. Scale with control.",
    journeyStages: [
      { num: 6, title: "Progress can be proved", icon: BadgeCheck, color: "text-primary" },
    ],
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
      subtitle="Four chapters that build the case — from foundation to proof"
      slideNumber={3}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-2.5 h-full overflow-hidden">
        {/* Quarter tabs */}
        <div className="flex gap-2">
          {quarters.map((quarter, i) => {
            const Icon = quarter.icon;
            return (
              <button
                key={quarter.id}
                onClick={() => setActiveQuarter(i)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 px-3 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                  activeQuarter === i
                    ? `${quarter.bgColor} ${quarter.borderAccent} scale-[1.02]`
                    : "bg-card/30 border-border/20 hover:border-border/50 hover:bg-card/50"
                )}
              >
                <Icon className={cn("w-4 h-4", activeQuarter === i ? quarter.color : "text-muted-foreground")} />
                <div className="text-[10px] font-bold text-foreground">{quarter.label}: {quarter.theme}</div>
                <div className="text-[9px] text-muted-foreground">{quarter.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Active quarter detail */}
        <div className={cn("flex-1 rounded-xl border-2 p-4 flex flex-col overflow-hidden", q.bgColor, q.borderAccent)}>

          {/* Strapline + journey badge row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <q.icon className={cn("w-4 h-4", q.color)} />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{q.label} · {q.subtitle}</span>
              <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full", q.bgColor, q.color)}>{q.assetCount} assets</span>
            </div>
          </div>

          {/* Strapline */}
          <div className="bg-background/80 rounded-lg px-4 py-2 mb-2 border-2 border-primary/20">
            <div className="flex gap-2 items-center">
              <Quote className={cn("w-3.5 h-3.5 shrink-0", q.color)} />
              <p className="text-sm text-foreground font-semibold italic">{q.strapline}</p>
            </div>
          </div>

          {/* Three-column: Narrative + DTOP Role + Message Territory */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="bg-background/60 rounded-lg px-3 py-2.5 border border-border/30">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Quarter Narrative</p>
              <p className="text-[10px] text-foreground leading-relaxed">{q.narrative}</p>
            </div>
            <div className="bg-background/60 rounded-lg px-3 py-2.5 border border-border/30">
              <p className="text-[9px] text-primary uppercase tracking-wider font-semibold mb-1">Role of DTOP</p>
              <p className="text-[10px] text-foreground/80 leading-relaxed">{q.dtopRole}</p>
            </div>
            <div className="bg-background/60 rounded-lg px-3 py-2.5 border border-border/30">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Message Territory</p>
              <div className="space-y-1">
                {q.messageTerritory.map((msg) => (
                  <div key={msg} className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                    <p className="text-[10px] text-foreground/70 leading-snug">{msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: Journey stages + Hero assets */}
          <div className="grid grid-cols-2 gap-2 flex-1">
            {/* Content Journey stages addressed this quarter */}
            <div className="bg-background/40 rounded-lg p-3 flex flex-col">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Content Journey Stages</p>
              <div className="space-y-2 flex-1">
                {q.journeyStages.map((stage) => {
                  const StageIcon = stage.icon;
                  return (
                    <div key={stage.num} className="flex items-center gap-2 bg-background/60 rounded-lg px-3 py-2 border border-border/20">
                      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold", `${stage.color}/20`, stage.color)}>
                        {stage.num}
                      </div>
                      <StageIcon className={cn("w-3.5 h-3.5 shrink-0", stage.color)} />
                      <p className="text-[10px] text-foreground font-medium">{stage.title}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
                <p className="text-[9px] text-primary uppercase tracking-wider font-semibold mb-0.5">Core Message</p>
                <p className="text-[10px] text-foreground/80 font-medium leading-snug">{q.quarterMessage}</p>
              </div>
            </div>

            {/* Hero assets */}
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
