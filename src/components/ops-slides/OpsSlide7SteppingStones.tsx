import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Zap, GitBranch, Brain, ArrowRight } from "lucide-react";

interface OpsSlide7Props extends SlideNarrationProps {
  slideNumber?: number;
}

const phases = [
  {
    icon: Zap,
    year: "Year 1",
    title: "Quick Wins",
    color: "text-sky-400",
    border: "border-sky-400/30",
    bg: "bg-sky-400/10",
    capabilities: [
      "Hard landing → retraining pipeline",
      "Regulatory change → cascade updates",
      "Safety report auto-categorisation",
    ],
    outcome: "Immediate ROI from connected use cases",
  },
  {
    icon: GitBranch,
    year: "Year 2",
    title: "Connected Operations",
    color: "text-purple-400",
    border: "border-purple-400/30",
    bg: "bg-purple-400/10",
    capabilities: [
      "Cross-department workflow orchestration",
      "Integrated compliance evidence",
      "Trend analysis across all signal types",
    ],
    outcome: "Operational silos eliminated",
  },
  {
    icon: Brain,
    year: "Year 3",
    title: "Intelligent Operations",
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/10",
    capabilities: [
      "Predictive risk modelling",
      "Proactive hazard prevention",
      "Autonomous compliance management",
    ],
    outcome: "From reactive to predictive operations",
  },
];

const OpsSlide7SteppingStones = ({ slideNumber, ...narrationProps }: OpsSlide7Props) => {
  return (
    <SalesSlideContainer
      id="ops-slide-7"
      title="The Journey"
      subtitle="From quick wins to platform value"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col justify-center gap-6 overflow-hidden">
        {/* Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {phases.map((phase, i) => (
            <div key={phase.year} className="flex items-start gap-3">
              <div className={`p-4 rounded-xl border ${phase.border} ${phase.bg} flex-1`}>
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <phase.icon className={`h-5 w-5 ${phase.color}`} />
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${phase.color}`}>{phase.year}</span>
                    <h3 className="text-base font-bold text-foreground">{phase.title}</h3>
                  </div>
                </div>

                {/* Capabilities */}
                <ul className="space-y-1.5 mb-3">
                  {phase.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className={`w-1 h-1 rounded-full ${phase.color.replace("text-", "bg-")} mt-1.5 shrink-0`} />
                      {cap}
                    </li>
                  ))}
                </ul>

                {/* Outcome */}
                <div className={`text-xs font-medium ${phase.color} pt-2 border-t border-muted/20`}>
                  {phase.outcome}
                </div>
              </div>

              {/* Arrow between phases */}
              {i < phases.length - 1 && (
                <div className="hidden lg:flex items-center h-full">
                  <ArrowRight className="h-5 w-5 text-muted-foreground/20" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 text-center">
          <p className="text-sm text-muted-foreground">
            Each phase builds on the last. <span className="font-medium text-primary">Start with what matters most</span> —
            the platform grows with you.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide7SteppingStones;
