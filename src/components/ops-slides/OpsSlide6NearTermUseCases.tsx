import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Plane, Wind, FileCheck, Moon, Zap, TrendingDown, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OpsSlide6Props extends SlideNarrationProps {
  slideNumber?: number;
}

const useCaseCards = [
  {
    id: "dangerous-goods",
    icon: Plane,
    title: "Dangerous Goods → Procedure Update",
    iconColor: "hsl(199 89% 48%)",
    detect: "Pattern of DG handling issues identified — correlated with seasonal conditions",
    trigger: "Procedural review initiated for DG handling SOPs",
    orchestrate: "Updated procedures published, ground crew retrained",
    prove: "Measurable decline in DG incidents within 90 days",
  },
  {
    id: "smoke-fumes",
    icon: Wind,
    title: "Smoke & Fumes → Procedure Change",
    iconColor: "hsl(45 93% 58%)",
    detect: "Pattern detected: 3 reports, same aircraft type",
    trigger: "Engineering review + procedure update triggered",
    orchestrate: "Updated procedure published, crews notified",
    prove: "Zero recurrence on updated fleet within 60 days",
  },
  {
    id: "regulatory",
    icon: FileCheck,
    title: "Regulatory Change → Cascade Update",
    iconColor: "hsl(270 70% 60%)",
    detect: "New AD/SB published by authority",
    trigger: "Affected procedures identified automatically",
    orchestrate: "Content updated, training assigned, acknowledged",
    prove: "Full compliance evidence in 48 hours, not 6 weeks",
  },
  {
    id: "fatigue",
    icon: Moon,
    title: "Crew Fatigue → Pattern Detection",
    iconColor: "hsl(160 60% 45%)",
    detect: "Fatigue reports correlated with schedule data",
    trigger: "Risk threshold exceeded — scheduling review",
    orchestrate: "Schedule adjustment + crew wellness check",
    prove: "30% reduction in fatigue-related events",
  },
];

const OpsSlide6NearTermUseCases = ({ slideNumber, ...narrationProps }: OpsSlide6Props) => {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  return (
    <SalesSlideContainer
      id="ops-slide-6"
      title="What You Can Achieve This Year"
      subtitle="Near-term use cases that deliver value from day one"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex flex-col gap-3">
        {/* DTOP Legend */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Detect</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
            <TrendingDown className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">Trigger</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <FileText className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-xs font-medium text-cyan-500">Orchestrate</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-medium text-emerald-500">Prove</span>
          </div>
        </div>

        {/* Use Cases Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCaseCards.map((uc) => {
            const Icon = uc.icon;
            const isExpanded = expandedCase === uc.id;

            return (
              <div
                key={uc.id}
                className={cn(
                  "bg-card/50 backdrop-blur-sm border rounded-xl p-3 cursor-pointer transition-all duration-300",
                  isExpanded ? "border-primary/30 shadow-lg shadow-primary/10" : "border-border/50 hover:border-primary/30"
                )}
                onClick={() => setExpandedCase(isExpanded ? null : uc.id)}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${uc.iconColor}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: uc.iconColor }} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{uc.title}</h3>
                </div>

                {/* DTOP Timeline */}
                <div className="space-y-2">
                  <div className="relative pl-4 border-l-2 border-primary/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-0.5">Signal Detected</div>
                    <div className="text-xs font-medium text-foreground">{uc.detect}</div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-accent/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-accent" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-0.5">Action Triggered</div>
                    <div className="text-xs font-medium text-foreground">{uc.trigger}</div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-cyan-500/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-cyan-500" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500 mb-0.5">Change Orchestrated</div>
                    <div className="text-xs font-medium text-foreground">{uc.orchestrate}</div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-emerald-500/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-emerald-500" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500 mb-0.5">Outcome Proven</div>
                    <div className="text-xs font-medium text-foreground">{uc.prove}</div>
                    {isExpanded && (
                      <div className="mt-1 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 inline-block animate-fade-in">
                        <span className="text-xs font-bold text-emerald-500">{uc.prove}</span>
                      </div>
                    )}
                  </div>
                </div>

                {!isExpanded && (
                  <div className="mt-3 text-[10px] text-muted-foreground text-center">Click to expand</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-2 shrink-0">
          <p className="text-xs text-center text-foreground">
            Each use case follows the same <span className="font-semibold text-primary">DTOP</span> pattern —
            building familiarity and accelerating adoption across departments.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide6NearTermUseCases;
