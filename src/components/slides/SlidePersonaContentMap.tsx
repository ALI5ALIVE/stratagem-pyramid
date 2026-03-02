import { useState } from "react";
import { Users, ShieldCheck, ClipboardList, GraduationCap, Server, FileText, Presentation, ClipboardCheck, BookOpen, Wrench } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface Persona {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  needs: string[];
  formats: string[];
  quarterFocus: { q: string; focus: string }[];
}

const personas: Persona[] = [
  {
    id: "executive",
    label: "Executive Leaders",
    icon: Users,
    color: "text-blue-400",
    needs: [
      "Performance and risk narrative",
      "Confidence and visibility",
      "Practical prioritisation",
    ],
    formats: [
      "Executive briefs",
      "Decision summaries",
      "Business case packs",
      "Keynote-style webinar segments",
    ],
    quarterFocus: [
      { q: "Q1", focus: "Why fragmented improvement fails" },
      { q: "Q2", focus: "Speed of coordinated action" },
      { q: "Q3", focus: "Readiness as performance protection" },
      { q: "Q4", focus: "Visibility, confidence and scale" },
    ],
  },
  {
    id: "safety",
    label: "Safety Leaders",
    icon: ShieldCheck,
    color: "text-amber-400",
    needs: [
      "Signal quality",
      "Action follow through",
      "Recurrence reduction",
      "Traceability",
    ],
    formats: [
      "Scenario explainers",
      "Diagnostic tools",
      "Action design worksheets",
      "Safety-focused webinar sessions",
    ],
    quarterFocus: [
      { q: "Q1", focus: "Baseline assessment of fragmentation" },
      { q: "Q2", focus: "Recurrence reduction & corrective action" },
      { q: "Q3", focus: "Role-specific readiness maturity" },
      { q: "Q4", focus: "Evidence framework by function" },
    ],
  },
  {
    id: "compliance",
    label: "Compliance Leaders",
    icon: ClipboardList,
    color: "text-emerald-400",
    needs: [
      "Governance",
      "Evidence",
      "Readiness",
      "Standardisation",
    ],
    formats: [
      "Checklists",
      "Proof frameworks",
      "Compliance briefs",
      "Readiness scorecards",
    ],
    quarterFocus: [
      { q: "Q1", focus: "Governance & evidence flow checklist" },
      { q: "Q2", focus: "Escalations, approvals & audit confidence" },
      { q: "Q3", focus: "Cross-functional readiness alignment" },
      { q: "Q4", focus: "Traceability, controls & standardisation" },
    ],
  },
  {
    id: "training",
    label: "Training Leaders",
    icon: GraduationCap,
    color: "text-purple-400",
    needs: [
      "Role-based readiness",
      "Change-linked training",
      "Validation of adoption",
      "Consistency",
    ],
    formats: [
      "Readiness scorecards",
      "Training guides",
      "Workshop templates",
      "Role readiness frameworks",
    ],
    quarterFocus: [
      { q: "Q1", focus: "Language alignment across functions" },
      { q: "Q2", focus: "Action design for operational signals" },
      { q: "Q3", focus: "Training-to-change linkage" },
      { q: "Q4", focus: "Scaled adoption & rollout planning" },
    ],
  },
  {
    id: "it",
    label: "IT Leaders",
    icon: Server,
    color: "text-sky-400",
    needs: [
      "Integration and controls",
      "Security and governance confidence",
      "Standardisation",
      "Scale",
    ],
    formats: [
      "Technical briefs",
      "Architecture-aligned explainers",
      "Governance summaries",
      "Rollout planning templates",
    ],
    quarterFocus: [
      { q: "Q1", focus: "Integration, control & reducing complexity" },
      { q: "Q2", focus: "Workflow automation & ownership" },
      { q: "Q3", focus: "Cross-functional workshop facilitation" },
      { q: "Q4", focus: "Enterprise rollout architecture" },
    ],
  },
];

const contentLayers = [
  {
    label: "Point of View",
    icon: BookOpen,
    description: "Builds belief and category understanding",
    examples: ["Thought leadership", "Executive notes", "Opinion pieces", "\"What has changed\" briefs"],
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    label: "Practical",
    icon: Wrench,
    description: "Helps teams apply the ideas",
    examples: ["Checklists", "Worksheets", "Scorecards", "Maturity models", "Scenario walkthroughs"],
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
  {
    label: "Buying Group",
    icon: Presentation,
    description: "Helps different roles engage from their own angle",
    examples: ["Persona briefings", "Role-specific one-pagers", "Decision FAQs by persona"],
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
];

const SlidePersonaContentMap = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activePersona, setActivePersona] = useState(0);
  const p = personas[activePersona];

  return (
    <SlideContainer
      id="slide-persona-content-map"
      title="Persona Content Map"
      subtitle="Content that meets every stakeholder where they are"
      slideNumber={14}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 grid grid-cols-12 gap-4 h-full overflow-hidden">
        {/* Left: Persona selector + detail */}
        <div className="col-span-8 flex flex-col gap-3">
          {/* Persona tabs */}
          <div className="flex gap-2">
            {personas.map((persona, i) => {
              const Icon = persona.icon;
              return (
                <button
                  key={persona.id}
                  onClick={() => setActivePersona(i)}
                  className={cn(
                    "flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer",
                    activePersona === i
                      ? "bg-card border-primary/50 scale-[1.02]"
                      : "bg-card/30 border-border/30 hover:border-border/60 hover:bg-card/50"
                  )}
                >
                  <Icon className={cn("w-4 h-4", persona.color)} />
                  <span className="text-xs font-medium text-foreground">{persona.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active persona detail */}
          <div className="flex-1 bg-card/60 border border-border/50 rounded-lg p-5 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <p.icon className={cn("w-5 h-5", p.color)} />
              <h3 className="text-base font-bold text-foreground">{p.label}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* Needs */}
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                  What they need from content
                </p>
                <div className="space-y-2">
                  {p.needs.map((need) => (
                    <div key={need} className="flex items-center gap-2 bg-background/50 rounded-lg px-3 py-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full", p.color.replace("text-", "bg-"))} />
                      <span className="text-xs text-foreground">{need}</span>
                    </div>
                  ))}
                </div>

                {/* Best formats */}
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2 mt-4">
                  Best Formats
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.formats.map((f) => (
                    <span key={f} className="text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-full">{f}</span>
                  ))}
                </div>
              </div>

              {/* Quarterly focus */}
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                  Quarterly Content Focus
                </p>
                <div className="space-y-2">
                  {p.quarterFocus.map((qf) => (
                    <div key={qf.q} className="bg-background/50 rounded-lg px-3 py-2.5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("text-xs font-bold", p.color)}>{qf.q}</span>
                      </div>
                      <p className="text-[11px] text-foreground/80 leading-relaxed">{qf.focus}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Monthly content rhythm */}
        <div className="col-span-4 flex flex-col gap-3">
          <div className="bg-card/60 border border-border/50 rounded-lg p-4 flex-1 flex flex-col">
            <h3 className="text-sm font-bold text-foreground mb-3">Monthly Content Rhythm</h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
              Each month includes content in three layers to keep the programme strategic and commercially useful.
            </p>

            <div className="space-y-3 flex-1">
              {contentLayers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <div key={layer.label} className={cn("rounded-lg border p-3", layer.bg)}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className={cn("w-4 h-4", layer.color)} />
                      <span className={cn("text-xs font-bold", layer.color)}>{layer.label}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-2">{layer.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {layer.examples.map((ex) => (
                        <span key={ex} className="text-[9px] bg-background/50 text-foreground/70 px-2 py-0.5 rounded">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Format strategy */}
            <div className="mt-3 pt-3 border-t border-border/30">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                Format Strategy by Job
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                {[
                  { job: "Create shared belief", format: "Reports, briefs, webinars" },
                  { job: "Diagnose current state", format: "Assessments, scorecards" },
                  { job: "Align cross-functional", format: "Workshop packs, canvases" },
                  { job: "Help sponsors decide", format: "Business cases, roadmaps" },
                ].map((s) => (
                  <div key={s.job} className="bg-background/50 rounded px-2 py-1.5">
                    <p className="text-primary font-semibold text-[9px]">{s.job}</p>
                    <p className="text-muted-foreground text-[9px]">{s.format}</p>
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

export default SlidePersonaContentMap;
