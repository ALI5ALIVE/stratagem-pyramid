import { useState } from "react";
import { BookOpen, Target, Zap, Shield, TrendingUp, FileText, Mic, ClipboardCheck, ChevronRight } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

const reportChapters = [
  "Why operational performance now matters more than ever",
  "The friction points that slow performance and increase risk",
  "The connected foundation for operational performance",
  "Turning signals into action across teams",
  "Making readiness continuous across the organisation",
  "Proving performance at scale",
  "The role of AI in accelerating action inside governed workflows",
  "Persona priorities across executive, safety, compliance, training and IT",
  "A practical roadmap to improve performance without increasing risk",
];

interface Quarter {
  id: string;
  label: string;
  theme: string;
  icon: React.ElementType;
  color: string;
  coreMessage: string;
  pillars: string[];
  heroAsset: string;
  decisionAsset: string;
  outcomes: string[];
  webinar: string;
}

const quarters: Quarter[] = [
  {
    id: "q1",
    label: "Q1",
    theme: "Build the Foundation",
    icon: Shield,
    color: "text-blue-400",
    coreMessage: "Performance breaks down when safety, compliance, training and IT improve separately.",
    pillars: ["Connected foundation", "Governance clarity", "Shared operational visibility"],
    heroAsset: "Build the foundation: first steps to improve operational performance without adding risk",
    decisionAsset: "Operational performance baseline assessment",
    webinar: "How aviation teams build a connected foundation for operational performance",
    outcomes: [
      "The problem is cross-functional",
      "The opportunity is operational, not just technical",
      "There is a practical starting point",
    ],
  },
  {
    id: "q2",
    label: "Q2",
    theme: "Signal to Action",
    icon: Zap,
    color: "text-amber-400",
    coreMessage: "Operational performance is shaped by how quickly teams turn signals into coordinated action.",
    pillars: ["Continuous improvement", "Signal to action workflows", "Accountability and completion"],
    heroAsset: "From signal to action: how high-performing aviation teams reduce operational lag",
    decisionAsset: "Signal-to-action gap diagnostic",
    webinar: "Closing the gap between signal and action in aviation operations",
    outcomes: [
      "A stronger shared understanding of operational lag",
      "Language for cross-functional action design",
      "A reason to engage multiple stakeholders together",
    ],
  },
  {
    id: "q3",
    label: "Q3",
    theme: "Continuous Readiness",
    icon: Target,
    color: "text-emerald-400",
    coreMessage: "Readiness improves when training, compliance and operational change are connected rather than managed in separate cycles.",
    pillars: ["Readiness by role", "Training and change alignment", "Continuous capability"],
    heroAsset: "Make readiness continuous: a practical approach to capability, control and consistency",
    decisionAsset: "Readiness scorecard and workshop pack",
    webinar: "How aviation teams build continuous readiness across training, compliance and operations",
    outcomes: [
      "Define readiness beyond training completion",
      "Identify gaps by role and function",
      "Internal workshops driving alignment",
    ],
  },
  {
    id: "q4",
    label: "Q4",
    theme: "Prove at Scale",
    icon: TrendingUp,
    color: "text-purple-400",
    coreMessage: "Performance improvement only scales when teams can prove progress, control and readiness across the organisation.",
    pillars: ["Proof at scale", "Executive visibility", "Standardisation and confidence"],
    heroAsset: "Prove performance at scale: how aviation leaders build confidence across teams and regions",
    decisionAsset: "Operational performance business case pack",
    webinar: "How to prove operational progress without creating more reporting burden",
    outcomes: [
      "A clearer way to define proof and progress",
      "Stronger internal alignment for investment",
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
      <div className="flex-1 grid grid-cols-12 gap-4 h-full overflow-hidden">
        {/* Left: Core Asset */}
        <div className="col-span-4 flex flex-col gap-3">
          <div className="bg-card/60 border border-border/50 rounded-lg p-4 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Flagship Report</h3>
            </div>
            <p className="text-primary text-xs font-semibold mb-1">Flying High Report</p>
            <p className="text-muted-foreground text-[11px] leading-relaxed mb-3">
              The anchor asset for the year — designed to support both broad demand creation and buying group engagement.
            </p>
            <div className="space-y-1.5 flex-1">
              {reportChapters.map((ch, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-primary/60 font-mono text-[10px] mt-0.5 shrink-0">{i + 1}.</span>
                  <span className="text-foreground/80 text-[11px] leading-tight">{ch}</span>
                </div>
              ))}
            </div>

            {/* Content stack summary */}
            <div className="mt-3 pt-3 border-t border-border/30">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-semibold">Annual Stack</p>
              <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                {[
                  { n: "1", l: "Flagship report" },
                  { n: "4", l: "Campaign guides" },
                  { n: "4", l: "Webinars" },
                  { n: "4", l: "Decision assets" },
                  { n: "5", l: "Persona briefs" },
                  { n: "4", l: "Exec summaries" },
                ].map((s) => (
                  <div key={s.l} className="bg-background/50 rounded px-2 py-1">
                    <span className="text-primary font-bold">{s.n}</span>{" "}
                    <span className="text-muted-foreground">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quarterly Campaigns */}
        <div className="col-span-8 flex flex-col gap-3">
          {/* Quarter tabs */}
          <div className="flex gap-2">
            {quarters.map((quarter, i) => {
              const Icon = quarter.icon;
              return (
                <button
                  key={quarter.id}
                  onClick={() => setActiveQuarter(i)}
                  className={cn(
                    "flex-1 flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer",
                    activeQuarter === i
                      ? "bg-card border-primary/50 scale-[1.02]"
                      : "bg-card/30 border-border/30 hover:border-border/60 hover:bg-card/50"
                  )}
                >
                  <Icon className={cn("w-4 h-4", quarter.color)} />
                  <div className="text-left">
                    <div className="text-xs font-bold text-foreground">{quarter.label}</div>
                    <div className="text-[10px] text-muted-foreground">{quarter.theme}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active quarter detail */}
          <div className="flex-1 bg-card/60 border border-border/50 rounded-lg p-5 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <q.icon className={cn("w-5 h-5", q.color)} />
              <h3 className="text-base font-bold text-foreground">
                {q.label}: {q.theme}
              </h3>
            </div>

            {/* Core message */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2.5 mb-4">
              <p className="text-xs text-foreground leading-relaxed">
                <span className="text-primary font-semibold">Core message: </span>
                {q.coreMessage}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* Left details */}
              <div className="space-y-3">
                {/* Pillars */}
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">Content Pillars</p>
                  <div className="flex flex-wrap gap-1.5">
                    {q.pillars.map((p) => (
                      <span key={p} className="text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-full">{p}</span>
                    ))}
                  </div>
                </div>

                {/* Hero asset */}
                <div className="bg-background/50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Hero Asset</p>
                  </div>
                  <p className="text-[11px] text-foreground leading-relaxed">{q.heroAsset}</p>
                </div>

                {/* Webinar */}
                <div className="bg-background/50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Mic className="w-3.5 h-3.5 text-accent" />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Webinar</p>
                  </div>
                  <p className="text-[11px] text-foreground leading-relaxed">{q.webinar}</p>
                </div>
              </div>

              {/* Right details */}
              <div className="space-y-3">
                {/* Decision asset */}
                <div className="bg-background/50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Decision Asset</p>
                  </div>
                  <p className="text-[11px] text-foreground leading-relaxed">{q.decisionAsset}</p>
                </div>

                {/* Outcomes */}
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">By End of {q.label}</p>
                  <div className="space-y-1.5">
                    {q.outcomes.map((o, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        <span className="text-[11px] text-foreground/80 leading-tight">{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Principles strip */}
          <div className="flex gap-2">
            {[
              "Every quarter does both: awareness + practical",
              "Content built for buying groups, not single leads",
              "Flagship report is the anchor",
              "AI appears as an enabler, not the narrative",
              "One decision asset per quarter",
            ].map((p, i) => (
              <div key={i} className="flex-1 bg-card/30 border border-border/30 rounded px-2 py-1.5 text-center">
                <span className="text-[9px] text-muted-foreground leading-tight">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideContentStrategy;
