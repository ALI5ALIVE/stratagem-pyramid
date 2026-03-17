import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Plane, Wind, FileCheck, Moon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OpsSlide6Props extends SlideNarrationProps {
  slideNumber?: number;
}

const useCaseCards = [
  {
    id: "hard-landing",
    icon: Plane,
    title: "Hard Landing → Retraining",
    color: "text-sky-400",
    border: "border-sky-400/30",
    bg: "bg-sky-400/10",
    detect: "FOQA detects hard landing exceedance",
    trigger: "Auto-flags crew for procedure review",
    orchestrate: "Targeted sim session assigned to crew",
    prove: "47% reduction in recurrence within 90 days",
  },
  {
    id: "smoke-fumes",
    icon: Wind,
    title: "Smoke & Fumes → Procedure Change",
    color: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/10",
    detect: "Pattern detected: 3 reports, same aircraft type",
    trigger: "Engineering review + procedure update triggered",
    orchestrate: "Updated procedure published, crews notified",
    prove: "Zero recurrence on updated fleet within 60 days",
  },
  {
    id: "regulatory",
    icon: FileCheck,
    title: "Regulatory Change → Cascade Update",
    color: "text-purple-400",
    border: "border-purple-400/30",
    bg: "bg-purple-400/10",
    detect: "New AD/SB published by authority",
    trigger: "Affected procedures identified automatically",
    orchestrate: "Content updated, training assigned, acknowledged",
    prove: "Full compliance evidence in 48 hours, not 6 weeks",
  },
  {
    id: "fatigue",
    icon: Moon,
    title: "Crew Fatigue → Pattern Detection",
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/10",
    detect: "Fatigue reports correlated with schedule data",
    trigger: "Risk threshold exceeded — scheduling review",
    orchestrate: "Schedule adjustment + crew wellness check",
    prove: "30% reduction in fatigue-related events",
  },
];

const dtopSteps = ["Detect", "Trigger", "Orchestrate", "Prove"];

const OpsSlide6NearTermUseCases = ({ slideNumber, ...narrationProps }: OpsSlide6Props) => {
  const [expanded, setExpanded] = useState<string>("hard-landing");

  return (
    <SalesSlideContainer
      id="ops-slide-6"
      title="What You Can Achieve This Year"
      subtitle="Near-term use cases that deliver value from day one"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* DTOP legend */}
        <div className="flex items-center gap-3 justify-center">
          {dtopSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-1">
              <span className="text-xs font-medium text-muted-foreground">{step}</span>
              {i < dtopSteps.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground/30" />}
            </div>
          ))}
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1">
          {useCaseCards.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setExpanded(expanded === uc.id ? "" : uc.id)}
              className={cn(
                "p-3 rounded-xl border text-left transition-all",
                uc.border, uc.bg,
                expanded === uc.id && "ring-1 ring-primary/40"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <uc.icon className={cn("h-5 w-5", uc.color)} />
                <span className={cn("text-sm font-bold", uc.color)}>{uc.title}</span>
              </div>

              {expanded === uc.id ? (
                <div className="space-y-1.5">
                  {[
                    { label: "D", text: uc.detect },
                    { label: "T", text: uc.trigger },
                    { label: "O", text: uc.orchestrate },
                    { label: "P", text: uc.prove },
                  ].map((step) => (
                    <div key={step.label} className="flex items-start gap-2">
                      <span className="text-[10px] font-bold text-muted-foreground bg-muted/20 rounded px-1 py-0.5 mt-0.5 shrink-0">
                        {step.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{step.text}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">{uc.detect}</p>
              )}
            </button>
          ))}
        </div>

        {/* Callout */}
        <div className="p-2 rounded-lg border border-primary/20 bg-primary/5 text-center">
          <p className="text-xs text-muted-foreground">
            Each use case follows the same <span className="font-medium text-primary">DTOP</span> pattern —
            building familiarity and accelerating adoption across departments.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide6NearTermUseCases;
