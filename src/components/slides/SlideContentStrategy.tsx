import { useState } from "react";
import { Target, Zap, Shield, TrendingUp, ChevronRight, Quote } from "lucide-react";
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
  headline: string;
  coreMessage: string;
  pillars: string[];
  audienceShift: string;
  outcomes: string[];
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
    headline: "Performance breaks down when teams improve separately",
    coreMessage: "Safety, compliance, training and IT each work hard — but when they improve in isolation, the organisation doesn't get better. Operational performance depends on a connected foundation.",
    pillars: ["Connected foundation", "Governance clarity", "Shared operational visibility"],
    audienceShift: "From 'we each have our own improvement plans' → 'we need a shared operating picture'",
    outcomes: [
      "The problem is cross-functional, not departmental",
      "The opportunity is operational, not just technical",
      "There is a practical, low-risk starting point",
    ],
  },
  {
    id: "q2",
    label: "Q2",
    theme: "Signal to Action",
    subtitle: "Jul · Aug · Sep",
    icon: Zap,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderAccent: "border-amber-400/40",
    headline: "Performance is shaped by how fast teams turn signals into coordinated action",
    coreMessage: "Most organisations detect problems well. The gap is in follow-through — turning audit findings, safety reports and training gaps into coordinated, accountable action across teams.",
    pillars: ["Signal-to-action workflows", "Accountability loops", "Continuous improvement"],
    audienceShift: "From 'we know what's wrong' → 'we close the loop and prove we acted'",
    outcomes: [
      "A shared language for cross-functional action design",
      "Stronger understanding of operational lag",
      "A reason to engage multiple stakeholders together",
    ],
  },
  {
    id: "q3",
    label: "Q3",
    theme: "Continuous Readiness",
    subtitle: "Oct · Nov · Dec",
    icon: Target,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderAccent: "border-emerald-400/40",
    headline: "Readiness improves when training, compliance and change are connected",
    coreMessage: "Periodic training pushes and separate compliance cycles create gaps. Readiness becomes a real capability only when it's continuous, role-based and connected to operational change.",
    pillars: ["Readiness by role", "Training and change alignment", "Continuous capability"],
    audienceShift: "From 'training is complete' → 'our people are ready for what's next'",
    outcomes: [
      "Readiness defined beyond training completion rates",
      "Gaps identified by role and function",
      "Internal alignment workshops driving action",
    ],
  },
  {
    id: "q4",
    label: "Q4",
    theme: "Prove at Scale",
    subtitle: "Jan · Feb · Mar",
    icon: TrendingUp,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderAccent: "border-purple-400/40",
    headline: "Performance only scales when you can prove progress across the organisation",
    coreMessage: "Leaders need more than dashboards — they need proof that safety, compliance and training improvements translate into measurable, defensible operational outcomes at scale.",
    pillars: ["Proof at scale", "Executive visibility", "Standardisation and confidence"],
    audienceShift: "From 'we think it's working' → 'we can prove it to the board'",
    outcomes: [
      "A credible internal case for investment",
      "Stronger alignment across regions and functions",
      "A path from pilot thinking to scaled adoption",
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
      title="Flying High: 12-Month Content Strategy"
      subtitle="Raise performance without raising risk"
      slideNumber={13}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-4 h-full overflow-hidden">
        {/* Hero: Core annual theme */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl px-6 py-4 text-center">
          <p className="text-[10px] text-primary uppercase tracking-widest font-semibold mb-1.5">Annual Campaign Theme</p>
          <h2 className="text-lg font-bold text-foreground leading-snug mb-2">
            Flying High — Raise Performance Without Raising Risk
          </h2>
          <p className="text-[11px] text-foreground/70 leading-relaxed max-w-3xl mx-auto">
            Aviation teams are under pressure to improve safety outcomes, operational efficiency and regulatory confidence — without slowing down. 
            This 12-month programme builds the case that <span className="text-foreground font-semibold">predictable, measurable and provable operational performance</span> requires 
            a connected platform across safety, compliance, training and operations.
          </p>
        </div>

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

        {/* Active quarter — messaging-first layout */}
        <div className={cn("flex-1 rounded-xl border-2 p-5 flex flex-col overflow-hidden", q.bgColor, q.borderAccent)}>
          {/* Headline */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <q.icon className={cn("w-5 h-5", q.color)} />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{q.label} · {q.theme} · {q.subtitle}</span>
            </div>
            <h3 className="text-base font-bold text-foreground leading-snug">{q.headline}</h3>
          </div>

          {/* Core message — prominent */}
          <div className="bg-background/60 rounded-lg px-4 py-3 mb-3 border border-border/30">
            <div className="flex gap-2">
              <Quote className={cn("w-4 h-4 mt-0.5 shrink-0", q.color)} />
              <p className="text-[11px] text-foreground leading-relaxed">{q.coreMessage}</p>
            </div>
          </div>

          {/* Bottom grid: Audience shift, pillars, outcomes */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            {/* Audience shift */}
            <div className="bg-background/40 rounded-lg p-3 flex flex-col">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Audience Shift</p>
              <p className="text-[10px] text-foreground/80 leading-relaxed italic flex-1">{q.audienceShift}</p>
            </div>

            {/* Pillars */}
            <div className="bg-background/40 rounded-lg p-3">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Content Pillars</p>
              <div className="space-y-1.5">
                {q.pillars.map((p) => (
                  <div key={p} className="flex items-center gap-1.5">
                    <ChevronRight className={cn("w-3 h-3 shrink-0", q.color)} />
                    <span className="text-[10px] text-foreground/80 font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div className="bg-background/40 rounded-lg p-3">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">By End of {q.label}</p>
              <div className="space-y-1.5">
                {q.outcomes.map((o, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <ChevronRight className={cn("w-3 h-3 mt-0.5 shrink-0", q.color)} />
                    <span className="text-[10px] text-foreground/80 leading-tight">{o}</span>
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
