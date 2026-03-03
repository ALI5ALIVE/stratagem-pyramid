import { useState } from "react";
import { Shield, Zap, Target, TrendingUp, ChevronRight, AlertOctagon, RefreshCw, Cog, Radio, RotateCcw, BadgeCheck } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface JourneyStage {
  num: number;
  title: string;
  icon: React.ElementType;
  color: string;
}

interface ContentAsset {
  title: string;
  format: string;
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
  journeyStageNums: number[];
  assets: ContentAsset[];
}

const journeyStages: JourneyStage[] = [
  { num: 1, title: "The status quo is failing", icon: AlertOctagon, color: "text-red-400" },
  { num: 2, title: "Performance needs redefining", icon: RefreshCw, color: "text-amber-400" },
  { num: 3, title: "There is a better operating model", icon: Cog, color: "text-emerald-400" },
  { num: 4, title: "Signals create line of sight", icon: Radio, color: "text-blue-400" },
  { num: 5, title: "Readiness becomes continuous", icon: RotateCcw, color: "text-purple-400" },
  { num: 6, title: "Progress can be proved", icon: BadgeCheck, color: "text-primary" },
];

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
    quarterMessage: "You cannot raise performance on fragmented foundations.",
    narrative: "Performance breaks down when safety, compliance, training, content, and IT improve separately. Before organisations can improve how they act, they need a connected foundation built on shared visibility, governance, and accountability.",
    dtopRole: "Introduce Detect as the need to see what matters clearly, and prepare the ground for Trigger, Orchestrate, and Improve by showing why disconnected systems weaken the whole performance model.",
    messageTerritory: [
      "The market is still managing performance in silos",
      "Fragmented systems reduce control and slow progress",
      "Connected foundations are the first step to better performance",
    ],
    journeyStageNums: [1, 2],
    assets: [
      { title: "Flying High Report: Chapter 1", format: "Flagship" },
      { title: "Build the Foundation for Performance", format: "Campaign Guide" },
      { title: "Why Fragmented Systems Quietly Reduce Performance", format: "Webinar" },
      { title: "The Operational Performance Baseline", format: "Decision Asset" },
      { title: "What Operational Performance Actually Means", format: "Education Brief" },
      { title: "Why Content, Safety, and Training Must Work Together", format: "Education Brief" },
      { title: "Governance Without Drag", format: "Thought Leadership" },
      { title: "The Hidden Cost of Disconnected Workflows", format: "Thought Leadership" },
      { title: "Readiness Starts Before Training Completion", format: "Thought Leadership" },
      { title: "Shared Language for Shared Performance", format: "Thought Leadership" },
      { title: "Fragmentation Risk Checklist", format: "Practical Tool" },
      { title: "Q1 Sales Narrative", format: "Sales Enablement" },
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
    quarterMessage: "Performance improves when signals lead to action, not delay.",
    narrative: "Operational performance is shaped by what happens after something important is identified. The real challenge is not simply visibility — it is how quickly and consistently teams trigger response, coordinate action, and close the gap between issue and follow-through.",
    dtopRole: "DTOP comes fully into view: Detect what matters → Trigger the right response → Orchestrate cross-functional action → Begin to Improve through follow-through and learning.",
    messageTerritory: [
      "Visibility alone does not improve performance",
      "Signals create value when ownership is clear",
      "Coordinated response reduces lag and strengthens control",
    ],
    journeyStageNums: [3, 4],
    assets: [
      { title: "Flying High Report: Chapter 2", format: "Flagship" },
      { title: "From Signal to Action", format: "Campaign Guide" },
      { title: "Closing the Gap Between Signal and Response", format: "Webinar" },
      { title: "Signal-to-Action Gap Diagnostic", format: "Decision Asset" },
      { title: "How Signals Differ from Data", format: "Thought Leadership" },
      { title: "The Cost of Delayed Response", format: "Thought Leadership" },
      { title: "Q2 Sales Narrative", format: "Sales Enablement" },
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
    quarterMessage: "Readiness is not an event. It is a condition of performance.",
    narrative: "Readiness should not be treated as a periodic push or a completion exercise. It is an ongoing performance capability built when training, compliance, and operational change work together inside a connected model.",
    dtopRole: "Emphasises the back half of DTOP: stronger Orchestrate across functions, clearer Improve through role-based readiness, consistency, and confidence over time.",
    messageTerritory: [
      "Readiness goes beyond training completion",
      "Continuous readiness improves predictability and control",
      "Role-based alignment strengthens performance across teams",
    ],
    journeyStageNums: [5],
    assets: [
      { title: "Flying High Report: Chapter 3", format: "Flagship" },
      { title: "Make Readiness Continuous", format: "Campaign Guide" },
      { title: "Continuous Readiness in Practice", format: "Webinar" },
      { title: "Readiness Scorecard", format: "Decision Asset" },
      { title: "From Completion to Competence", format: "Thought Leadership" },
      { title: "Role-Based Readiness Explained", format: "Thought Leadership" },
      { title: "Q3 Sales Narrative", format: "Sales Enablement" },
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
    quarterMessage: "Performance only scales when progress can be proved.",
    narrative: "Performance improvement only scales when organisations can prove progress, readiness, and control across teams and regions. Leaders need more than activity reporting — they need evidence that supports confident decisions.",
    dtopRole: "Completes the DTOP story by focusing on Improve as measurable, repeatable, and scalable. The operating model turns into evidence, confidence, and wider rollout potential.",
    messageTerritory: [
      "Proof matters more than reporting volume",
      "Standardisation strengthens confidence at scale",
      "Visibility, readiness, and evidence support investment and expansion",
    ],
    journeyStageNums: [6],
    assets: [
      { title: "Flying High Report: Chapter 4", format: "Flagship" },
      { title: "Prove Performance at Scale", format: "Campaign Guide" },
      { title: "How to Prove Progress Without More Reporting Burden", format: "Webinar" },
      { title: "Operational Performance Business Case Pack", format: "Decision Asset" },
      { title: "Evidence Over Activity", format: "Thought Leadership" },
      { title: "Scaling With Confidence", format: "Thought Leadership" },
      { title: "Q4 Sales Narrative", format: "Sales Enablement" },
    ],
  },
];

const formatColors: Record<string, string> = {
  "Flagship": "text-primary bg-primary/10",
  "Campaign Guide": "text-amber-400 bg-amber-400/10",
  "Webinar": "text-emerald-400 bg-emerald-400/10",
  "Decision Asset": "text-purple-400 bg-purple-400/10",
  "Education Brief": "text-blue-400 bg-blue-400/10",
  "Thought Leadership": "text-indigo-400 bg-indigo-400/10",
  "Practical Tool": "text-orange-400 bg-orange-400/10",
  "Sales Enablement": "text-rose-400 bg-rose-400/10",
};

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
      <div className="flex-1 flex flex-col gap-2 h-full overflow-hidden">
        {/* Quarter tabs */}
        <div className="flex gap-2">
          {quarters.map((quarter, i) => {
            const Icon = quarter.icon;
            return (
              <button
                key={quarter.id}
                onClick={() => setActiveQuarter(i)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                  activeQuarter === i
                    ? `${quarter.bgColor} ${quarter.borderAccent} scale-[1.02]`
                    : "bg-card/30 border-border/20 hover:border-border/50 hover:bg-card/50"
                )}
              >
                <Icon className={cn("w-4 h-4", activeQuarter === i ? quarter.color : "text-muted-foreground")} />
                <div className="text-xs font-bold text-foreground">{quarter.label}: {quarter.theme}</div>
              </button>
            );
          })}
        </div>

        {/* Content Journey Stages — 6 stages strip */}
        <div className="flex gap-1.5">
          {journeyStages.map((stage) => {
            const StageIcon = stage.icon;
            const isActive = q.journeyStageNums.includes(stage.num);
            return (
              <div
                key={stage.num}
                className={cn(
                  "flex-1 flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all",
                  isActive
                    ? `${stage.color.replace("text-", "bg-")}/15 border-current ${stage.color} font-semibold`
                    : "bg-card/20 border-border/20 text-muted-foreground/40"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                  isActive ? `${stage.color.replace("text-", "bg-")}/20 ${stage.color}` : "bg-muted/30"
                )}>
                  {stage.num}
                </div>
                <p className="text-xs leading-tight truncate">{stage.title}</p>
              </div>
            );
          })}
        </div>

        {/* Active quarter detail */}
        <div className={cn("flex-1 rounded-xl border-2 p-3 flex flex-col gap-2 overflow-hidden", q.bgColor, q.borderAccent)}>

          {/* Core message */}
          <div className="bg-background/80 rounded-lg px-4 py-2 border-2 border-primary/20">
            <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-0.5">Core Message</p>
            <p className="text-sm text-foreground font-semibold">{q.quarterMessage}</p>
          </div>

          {/* Three-column: Narrative + DTOP Role + Message Territory */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-background/60 rounded-lg px-3 py-2 border border-border/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Quarter Narrative</p>
              <p className="text-xs text-foreground leading-relaxed">{q.narrative}</p>
            </div>
            <div className="bg-background/60 rounded-lg px-3 py-2 border border-border/30">
              <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-1">Role of DTOP</p>
              <p className="text-xs text-foreground/80 leading-relaxed">{q.dtopRole}</p>
            </div>
            <div className="bg-background/60 rounded-lg px-3 py-2 border border-border/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Message Territory</p>
              <div className="space-y-1">
                {q.messageTerritory.map((msg) => (
                  <div key={msg} className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                    <p className="text-xs text-foreground/70 leading-snug">{msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content assets grid */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">
              Content Ideas · {q.assets.length} assets
            </p>
            <div className="grid grid-cols-4 gap-1.5 flex-1 overflow-y-auto">
              {q.assets.map((asset) => {
                const colorClass = formatColors[asset.format] || "text-muted-foreground bg-muted/10";
                const [textColor, bgColor] = colorClass.split(" ");
                return (
                  <div key={asset.title} className="bg-background/60 border border-border/20 rounded-lg px-2.5 py-2 flex flex-col gap-1">
                    <span className={cn("text-xs px-1.5 py-0.5 rounded self-start font-medium", bgColor, textColor)}>
                      {asset.format}
                    </span>
                    <p className="text-xs text-foreground font-medium leading-snug">{asset.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideContentStrategy;
