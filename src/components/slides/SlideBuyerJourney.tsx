import { AlertOctagon, RefreshCw, Cog, Radio, RotateCcw, BadgeCheck } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

const stages = [
  {
    num: 1,
    title: "The status quo is failing",
    description: "The market needs to understand that fragmented systems and siloed workflows reduce performance.",
    icon: AlertOctagon,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/30",
    quarter: "Q1",
  },
  {
    num: 2,
    title: "Performance needs redefining",
    description: "The audience must see that operational performance is broader than isolated function metrics.",
    icon: RefreshCw,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
    quarter: "Q1",
  },
  {
    num: 3,
    title: "There is a better operating model",
    description: "DTOP provides the structure for how high-performing teams move from awareness to action and improvement.",
    icon: Cog,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
    quarter: "Q2",
  },
  {
    num: 4,
    title: "Signals create line of sight",
    description: "Signals help organisations know what matters, when to act, and how to coordinate response.",
    icon: Radio,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    quarter: "Q2",
  },
  {
    num: 5,
    title: "Readiness becomes continuous",
    description: "Performance improves when training, compliance, and operational change are connected through an always-on model.",
    icon: RotateCcw,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
    quarter: "Q3",
  },
  {
    num: 6,
    title: "Progress can be proved",
    description: "Buying groups need evidence, confidence, and internal justification to scale improvement.",
    icon: BadgeCheck,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    quarter: "Q4",
  },
];

const SlideBuyerJourney = ({
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
      id="slide-buyer-journey"
      title="The Buyer Journey"
      subtitle="Six stages from status quo to scaled proof — this flow shapes the whole year"
      slideNumber={3}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-5 h-full overflow-hidden">
        {/* Journey cards */}
        <div className="grid grid-cols-3 gap-4 flex-1">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.num}
                className={cn(
                  "rounded-xl border-2 p-5 flex flex-col transition-all relative",
                  stage.bgColor,
                  stage.borderColor
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold", stage.bgColor, stage.color)}>
                    {stage.num}
                  </div>
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold bg-background/50 px-2 py-0.5 rounded-full">
                    {stage.quarter}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Icon className={cn("w-5 h-5 shrink-0", stage.color)} />
                  <h3 className="text-sm font-bold text-foreground leading-tight">{stage.title}</h3>
                </div>

                <p className="text-[11px] text-foreground/70 leading-relaxed flex-1">
                  {stage.description}
                </p>

                {i < stages.length - 1 && i !== 2 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 text-lg z-10">→</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom strip */}
        <div className="bg-card/60 border border-border/50 rounded-xl px-5 py-3 flex items-center gap-6">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold shrink-0">Annual Flow</p>
          <div className="flex items-center gap-2 flex-1">
            {[
              { q: "Q1", label: "Challenge the status quo", stages: "Stages 1–2", color: "text-blue-400", bg: "bg-blue-400/10" },
              { q: "Q2", label: "Introduce the model", stages: "Stages 3–4", color: "text-amber-400", bg: "bg-amber-400/10" },
              { q: "Q3", label: "Build readiness", stages: "Stage 5", color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { q: "Q4", label: "Prove at scale", stages: "Stage 6", color: "text-purple-400", bg: "bg-purple-400/10" },
            ].map((q, i) => (
              <div key={q.q} className="flex items-center gap-2 flex-1">
                <div className={cn("rounded-lg px-3 py-2 flex-1", q.bg)}>
                  <div className="flex items-center gap-1.5">
                    <span className={cn("text-xs font-bold", q.color)}>{q.q}</span>
                    <span className="text-[10px] text-muted-foreground">· {q.stages}</span>
                  </div>
                  <p className="text-[10px] text-foreground/80 font-medium mt-0.5">{q.label}</p>
                </div>
                {i < 3 && <span className="text-muted-foreground/30">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideBuyerJourney;
