import { Eye, Zap, Link2, Target, Users, Radio, TrendingUp, Quote, ShieldCheck, GraduationCap, Monitor, Shield } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const dtopSteps = [
  { label: "Detect", desc: "Spot what matters early", icon: Eye, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Trigger", desc: "Create the right response", icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10" },
  { label: "Orchestrate", desc: "Coordinate across teams", icon: Link2, color: "text-primary", bg: "bg-primary/10" },
  { label: "Improve", desc: "Turn action into gains", icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

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
    title: "Visibility is only valuable when it drives action",
    icon: Radio,
    points: [
      "Signals reduce operational lag",
      "Clearer triggers improve follow-through",
      "Coordinated action reduces recurrence and delay",
    ],
  },
  {
    id: "pillar-3",
    title: "Readiness and proof are the measures of better performance",
    icon: TrendingUp,
    points: [
      "Readiness must go beyond completion metrics",
      "Performance needs line of sight from action to outcome",
      "Scale depends on visibility, control, and evidence",
    ],
  },
];

const personas = [
  { role: "Executive Leaders", icon: TrendingUp, message: "Flying High is about improving performance with more visibility, better prioritisation, and stronger confidence in operational control." },
  { role: "Safety Leaders", icon: Shield, message: "Flying High is about turning signals into action faster, reducing recurrence, and improving traceability." },
  { role: "Compliance Leaders", icon: ShieldCheck, message: "Flying High is about better governance, clearer evidence, and more confidence in readiness and control." },
  { role: "Training Leaders", icon: GraduationCap, message: "Flying High is about moving from training delivery to role-based readiness and measurable operational impact." },
  { role: "IT Leaders", icon: Monitor, message: "Flying High is about creating scalable control, connected workflows, and stronger standardisation without adding complexity." },
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
      <div className="flex-1 flex flex-col gap-2 h-full overflow-hidden">

        {/* Roof — master line */}
        <div className="bg-primary/15 border-2 border-primary/40 rounded-xl px-5 py-2 text-center">
          <p className="text-[9px] text-primary uppercase tracking-widest font-semibold mb-0.5">Master Line</p>
          <p className="text-sm font-bold text-foreground">Raise Performance Without Raising Risk</p>
        </div>

        {/* Two-column: Brand promise + Problem */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-card/60 border border-border/50 rounded-lg px-3 py-2">
            <p className="text-[9px] text-primary uppercase tracking-wider font-semibold mb-0.5">Brand Promise</p>
            <p className="text-[10px] text-foreground leading-relaxed font-medium">
              Turn fragmented operational activity into connected performance.
            </p>
          </div>
          <div className="bg-card/60 border border-border/50 rounded-lg px-3 py-2">
            <p className="text-[9px] text-destructive uppercase tracking-wider font-semibold mb-0.5">The Problem We Solve</p>
            <p className="text-[10px] text-foreground/80 leading-relaxed">
              Effort exists, but performance is harder to coordinate, measure, and improve across disconnected systems and siloed teams.
            </p>
          </div>
        </div>

        {/* DTOP — with full contextual framing */}
        <div className="bg-accent/10 border border-accent/30 rounded-lg px-3 py-2">
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Operating Model — DTOP</p>
          <p className="text-[10px] text-foreground/80 leading-relaxed mb-2">
            DTOP is the engine inside the Flying High narrative. It gives the market a practical model for how high-performing aviation organisations move from awareness to action and from action to measurable improvement.
          </p>
          <div className="flex items-center gap-1.5">
            {dtopSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center gap-1.5 flex-1">
                  <div className={`flex items-center gap-1.5 ${step.bg} border border-border/30 rounded-lg px-2 py-1.5 flex-1`}>
                    <Icon className={`w-3.5 h-3.5 ${step.color} shrink-0`} />
                    <div>
                      <p className="text-[10px] font-bold text-foreground">{step.label}</p>
                      <p className="text-[8px] text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && <span className="text-muted-foreground/30 text-xs">→</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Messaging Pillars */}
        <div>
          <p className="text-[9px] text-primary uppercase tracking-wider font-semibold mb-1.5">Messaging Pillars</p>
          <div className="grid grid-cols-3 gap-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.id} className="bg-card/60 border border-border/50 rounded-lg p-2.5 flex flex-col">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-[9px] font-bold text-foreground leading-tight">{pillar.title}</p>
                  </div>
                  <div className="space-y-0.5">
                    {pillar.points.map((pt) => (
                      <div key={pt} className="flex items-start gap-1">
                        <span className="w-1 h-1 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                        <p className="text-[8px] text-foreground/70 leading-snug">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Persona Pillars — directly below messaging pillars */}
        <div>
          <p className="text-[9px] text-primary uppercase tracking-wider font-semibold mb-1.5">Persona Pillars</p>
          <div className="grid grid-cols-5 gap-1.5">
            {personas.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.role} className="bg-card/60 border border-border/50 rounded-lg px-2 py-1.5 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <Icon className="w-3 h-3 text-primary shrink-0" />
                    <p className="text-[8px] font-bold text-primary leading-tight">{p.role}</p>
                  </div>
                  <p className="text-[8px] text-foreground/70 leading-snug">{p.message}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reasons to believe strip */}
        <div className="bg-background/60 border border-border/30 rounded-lg px-3 py-1.5">
          <div className="flex gap-2">
            <Quote className="w-3 h-3 text-primary shrink-0 mt-0.5" />
            <p className="text-[8px] text-foreground/70 leading-relaxed">
              <span className="font-semibold text-foreground">Reasons to believe:</span> Built around the real friction points — fragmentation, lag, weak coordination, episodic readiness, and limited proof. Gives the market a practical operating model in DTOP, not just a high-level performance claim. Connects priorities across executive, safety, compliance, training, and IT stakeholders around the same improvement story.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideOperatingModel;
