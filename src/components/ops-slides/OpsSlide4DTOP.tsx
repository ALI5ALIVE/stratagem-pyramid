import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Radar, Zap, GitBranch, BadgeCheck, Shield, FileText, GraduationCap, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface OpsSlide4Props extends SlideNarrationProps {
  slideNumber?: number;
}

const platformModules = [
  {
    icon: Shield,
    name: "Safety Manager365",
    desc: "SMS reporting, flight data analysis, audit & hazard management",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    icon: FileText,
    name: "Content Manager365",
    desc: "Procedure authoring, revision cascades, regulatory change analysis",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: GraduationCap,
    name: "Training Manager365",
    desc: "Competency tracking, targeted assignments, completion evidence",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

const steps = [
  {
    icon: Radar,
    letter: "D",
    label: "Detect",
    description: "Ingest signals from safety reports, operational data, maintenance logs, crew feedback, and regulatory changes.",
    auditTrail: "65K+ signals/year ingested and categorised automatically",
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
    borderColor: "border-sky-400/30",
  },
  {
    icon: Zap,
    letter: "T",
    label: "Trigger",
    description: "AI-powered triage identifies which signals require action — procedure review, training update, or compliance response.",
    auditTrail: "Automated routing to the right team with full context",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
  },
  {
    icon: GitBranch,
    letter: "O",
    label: "Orchestrate",
    description: "Connected workflows cascade changes across content, training, and operations — ensuring the right people act on the right things.",
    auditTrail: "Cross-department coordination without manual handoffs",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
  },
  {
    icon: BadgeCheck,
    letter: "P",
    label: "Prove",
    description: "Every action generates audit-ready evidence — training completion, procedure acknowledgement, compliance closure.",
    auditTrail: "Continuous compliance evidence, not point-in-time snapshots",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
  },
];

const OpsSlide4DTOP = ({ slideNumber, ...narrationProps }: OpsSlide4Props) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <SalesSlideContainer
      id="ops-slide-4"
      title="The Platform: Detect → Trigger → Orchestrate → Prove"
      subtitle="Three connected applications powering a closed-loop operating model"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        {/* Platform module cards */}
        <div className="grid grid-cols-3 gap-3">
          {platformModules.map((mod) => (
            <div key={mod.name} className={cn("p-3 rounded-lg border flex items-start gap-3", mod.border, mod.bg)}>
              <mod.icon className={cn("h-5 w-5 shrink-0 mt-0.5", mod.color)} />
              <div className="min-w-0">
                <h4 className={cn("text-sm font-bold", mod.color)}>{mod.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CoAnalyst Intelligence Layer */}
        <div className="p-3 rounded-lg border border-primary/30 bg-primary/10 flex items-start gap-3">
          <Brain className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-primary">CoAnalyst✦ — Intelligence Layer</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">Aviation-specific AI that surfaces patterns, predicts risks, and drives closed-loop recommended action across all three modules.</p>
          </div>
        </div>

        {/* Arrow connector */}
        <div className="flex justify-center text-muted-foreground/40 text-lg">↓</div>

        {/* DTOP pipeline */}
        <div className="grid grid-cols-4 gap-3 flex-1 min-h-0">
          {steps.map((step, index) => (
            <button
              key={step.letter}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
              className={cn(
                "p-4 rounded-xl border transition-all text-left cursor-pointer flex flex-col h-full",
                step.borderColor,
                step.bgColor,
                activeStep === index && "ring-1 ring-primary/50 scale-[1.02]"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold", step.bgColor, step.color)}>
                  {step.letter}
                </div>
                <span className={cn("text-sm font-bold", step.color)}>{step.label}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">{step.description}</p>
              {activeStep === index && (
                <div className="mt-2 pt-2 border-t border-muted/20">
                  <p className="text-xs text-primary/80">{step.auditTrail}</p>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Callout */}
        <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">Unlike point solutions,</span> every step generates
            audit-ready evidence and feeds intelligence back into the platform.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide4DTOP;
