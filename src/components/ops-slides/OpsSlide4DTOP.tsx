import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Radar, Zap, GitBranch, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface OpsSlide4Props extends SlideNarrationProps {
  slideNumber?: number;
}

const steps = [
  {
    icon: Radar,
    letter: "D",
    label: "Detect",
    description: "Ingest signals from safety reports, flight data, maintenance logs, crew feedback, and regulatory changes.",
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

const dataSources = ["FOQA/FDM", "Safety Reports", "Maintenance", "Crew Logs", "Regulatory", "Audit"];

const OpsSlide4DTOP = ({ slideNumber, ...narrationProps }: OpsSlide4Props) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <SalesSlideContainer
      id="ops-slide-4"
      title="The Platform: DTOP in Action"
      subtitle="Detect → Trigger → Orchestrate → Prove"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Data sources strip */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2">Data Sources:</span>
          {dataSources.map((src) => (
            <span key={src} className="px-2.5 py-1 text-xs rounded-full border border-muted/30 bg-muted/10 text-muted-foreground">
              {src}
            </span>
          ))}
          <span className="text-sm text-primary font-medium ml-1">65K+ signals/mo</span>
        </div>

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
              <div className="flex items-center gap-2 mb-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold", step.bgColor, step.color)}>
                  {step.letter}
                </div>
                <span className={cn("text-base font-bold", step.color)}>{step.label}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{step.description}</p>
              {/* Expanded detail */}
              {activeStep === index && (
                <div className="mt-3 pt-3 border-t border-muted/20">
                  <p className="text-sm text-primary/80">{step.auditTrail}</p>
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
