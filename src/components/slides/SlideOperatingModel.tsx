import { useState } from "react";
import { Eye, Zap, Link2, Target, Users, Shield, Radio, TrendingUp, Quote } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

const pillars = [
  {
    id: "pillar-1",
    title: "Performance is a cross-functional outcome",
    icon: Users,
    points: [
      "Fragmented systems create drag and inconsistency",
      "Siloed workflows weaken follow-through",
      "Disconnected teams reduce visibility and accountability",
    ],
  },
  {
    id: "pillar-2",
    title: "Visibility only matters when it drives action",
    icon: Radio,
    points: [
      "Signals reduce operational lag",
      "Clearer triggers improve follow-through",
      "Coordinated action reduces recurrence and delay",
    ],
  },
  {
    id: "pillar-3",
    title: "Readiness and proof are the measures of performance",
    icon: TrendingUp,
    points: [
      "Readiness must go beyond completion metrics",
      "Performance needs line of sight from action to outcome",
      "Scale depends on visibility, control, and evidence",
    ],
  },
];

const dtopSteps = [
  { label: "Detect", desc: "Spot what matters early", icon: Eye },
  { label: "Trigger", desc: "Create the right response", icon: Zap },
  { label: "Orchestrate", desc: "Coordinate across teams", icon: Link2 },
  { label: "Improve", desc: "Turn action into gains", icon: Target },
];

const audiences = [
  { role: "Executive Leaders", message: "More visibility, better prioritisation, stronger confidence in operational control." },
  { role: "Safety Leaders", message: "Signals into action faster, reducing recurrence, improving traceability." },
  { role: "Compliance Leaders", message: "Better governance, clearer evidence, more confidence in readiness and control." },
  { role: "Training Leaders", message: "From training delivery to role-based readiness and measurable operational impact." },
  { role: "IT Leaders", message: "Scalable control, connected workflows, stronger standardisation without complexity." },
];

const SlideOperatingModel = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activeTab, setActiveTab] = useState<"pillars" | "audiences">("pillars");

  return (
    <SlideContainer
      id="slide-operating-model"
      title="Flying High — Messaging House"
      subtitle="The narrative architecture that connects market challenge to measurable performance"
      slideNumber={2}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-2.5 h-full overflow-hidden">

        {/* Roof — master line */}
        <div className="bg-primary/15 border-2 border-primary/40 rounded-xl px-5 py-3 text-center">
          <p className="text-[9px] text-primary uppercase tracking-widest font-semibold mb-1">Master Line</p>
          <p className="text-base font-bold text-foreground">Raise Performance Without Raising Risk</p>
        </div>

        {/* Two-column: Brand promise + Problem */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-card/60 border border-border/50 rounded-xl px-4 py-3">
            <p className="text-[9px] text-primary uppercase tracking-wider font-semibold mb-1">Brand Promise</p>
            <p className="text-xs text-foreground leading-relaxed font-medium">
              Turn fragmented operational activity into connected performance.
            </p>
          </div>
          <div className="bg-card/60 border border-border/50 rounded-xl px-4 py-3">
            <p className="text-[9px] text-destructive uppercase tracking-wider font-semibold mb-1">The Problem We Solve</p>
            <p className="text-xs text-foreground/80 leading-relaxed">
              Effort exists, but performance is harder to coordinate, measure, and improve across disconnected systems and siloed teams.
            </p>
          </div>
        </div>

        {/* DTOP strip */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl px-4 py-2.5">
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Operating Model — DTOP</p>
          <div className="flex items-center gap-2">
            {dtopSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center gap-2 flex-1">
                  <div className="flex items-center gap-1.5 bg-background/60 rounded-lg px-3 py-1.5 flex-1">
                    <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-foreground">{step.label}</p>
                      <p className="text-[9px] text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && <span className="text-muted-foreground/30 text-xs">→</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pillars / Audiences toggle */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex gap-1 mb-2">
            <button
              onClick={() => setActiveTab("pillars")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer",
                activeTab === "pillars" ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Messaging Pillars
            </button>
            <button
              onClick={() => setActiveTab("audiences")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer",
                activeTab === "audiences" ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Audience Interpretation
            </button>
          </div>

          {activeTab === "pillars" ? (
            <div className="grid grid-cols-3 gap-2.5 flex-1">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.id} className="bg-card/60 border border-border/50 rounded-xl p-3.5 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <p className="text-[11px] font-bold text-foreground leading-tight">{pillar.title}</p>
                    </div>
                    <div className="space-y-1.5 flex-1">
                      {pillar.points.map((pt) => (
                        <div key={pt} className="flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                          <p className="text-[10px] text-foreground/70 leading-snug">{pt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-2 flex-1">
              {audiences.map((a) => (
                <div key={a.role} className="bg-card/60 border border-border/50 rounded-xl p-3 flex flex-col">
                  <p className="text-[10px] font-bold text-primary mb-1.5">{a.role}</p>
                  <p className="text-[10px] text-foreground/80 leading-snug">{a.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reasons to believe strip */}
        <div className="bg-background/60 border border-border/30 rounded-xl px-4 py-2.5">
          <div className="flex gap-2">
            <Quote className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-foreground/70 leading-relaxed">
              <span className="font-semibold text-foreground">Reasons to believe:</span> Built around the real friction points — fragmentation, lag, weak coordination, episodic readiness, and limited proof. Connects priorities across executive, safety, compliance, training, and IT stakeholders around the same improvement story.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideOperatingModel;
