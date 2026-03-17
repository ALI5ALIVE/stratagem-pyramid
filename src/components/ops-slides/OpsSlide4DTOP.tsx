import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Radar, Zap, GitBranch, BadgeCheck, ArrowRight } from "lucide-react";
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
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Data sources strip */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2">Data Sources:</span>
          {dataSources.map((src) => (
            <span key={src} className="px-2 py-0.5 text-xs rounded-full border border-muted/30 bg-muted/10 text-muted-foreground">
              {src}
            </span>
          ))}
          <span className="text-xs text-primary font-medium ml-1">65K+ signals/mo</span>
        </div>

        {/* DTOP pipeline */}
        <div className="grid grid-cols-4 gap-3 flex-1">
          {steps.map((step, index) => (
            <div key={step.letter} className="flex flex-col items-center gap-2">
              {/* Card */}
              <button
                onClick={() => setActiveStep(activeStep === index ? null : index)}
                className={cn(
                  "w-full p-3 rounded-xl border transition-all text-left cursor-pointer",
                  step.borderColor,
                  step.bgColor,
                  activeStep === index && "ring-1 ring-primary/50 scale-[1.02]"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold", step.bgColor, step.color)}>
                    {step.letter}
                  </div>
                  <span className={cn("text-sm font-bold", step.color)}>{step.label}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                {/* Expanded detail */}
                {activeStep === index && (
                  <div className="mt-2 pt-2 border-t border-muted/20">
                    <p className="text-xs text-primary/80">{step.auditTrail}</p>
                  </div>
                )}
              </button>

              {/* Arrow connector (not on last) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30" />
                </div>
              )}
            </div>
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
