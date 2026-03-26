import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Zap, GitBranch, Brain } from "lucide-react";

interface OpsSlide7Props extends SlideNarrationProps {
  slideNumber?: number;
}

const phases = [
  {
    icon: Zap,
    year: "Phase 1",
    title: "Platform Foundations to Unlock Future Value",
    color: "text-sky-400",
    border: "border-sky-400/30",
    bg: "bg-sky-400/10",
    capabilities: [
      "Unified UX across all solutions",
      "API-first architecture for integrations",
      "Safety reporting within ContentManager365",
      "AI investment across CoAnalyst, CoAuthor & CoTrainer",
      "Platform PoCs with early adopter airlines",
    ],
    outcome: "Laying the connected foundation",
  },
  {
    icon: GitBranch,
    year: "Phase 2",
    title: "Connected Intelligence & Workflow Orchestration",
    color: "text-purple-400",
    border: "border-purple-400/30",
    bg: "bg-purple-400/10",
    capabilities: [
      "End-to-end workflows across Safety, Content & Training",
      "Cross-domain visibility and operational dashboards",
      "Automated triggers and response orchestration",
      "CoAnalyst as the intelligence layer across all modules",
    ],
    outcome: "Operational silos eliminated",
  },
  {
    icon: Brain,
    year: "Phase 3",
    title: "Fully Connected & Intelligent Operations",
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/10",
    capabilities: [
      "Predictive risk modelling across the operation",
      "Automated continuous improvement loops",
      "Closed-loop system: detect → respond → prove → improve",
    ],
    outcome: "From reactive to predictive operations",
  },
];

const OpsSlide7SteppingStones = ({ slideNumber, ...narrationProps }: OpsSlide7Props) => {
  return (
    <SalesSlideContainer
      id="ops-slide-7"
      title="The Customer Journey"
      subtitle="A Phased Platform Value Realization Roadmap"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col justify-center gap-5 min-h-0">
        {/* Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
          {phases.map((phase) => (
            <div key={phase.year} className={`p-5 rounded-xl border ${phase.border} ${phase.bg} flex flex-col h-full`}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${phase.bg} border ${phase.border}`}>
                  <phase.icon className={`h-5 w-5 ${phase.color}`} />
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${phase.color}`}>{phase.year}</span>
                  <h3 className="text-base font-bold text-foreground">{phase.title}</h3>
                </div>
              </div>

              {/* Capabilities */}
              <ul className="space-y-2.5 mb-4 flex-1">
                {phase.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className={`w-1.5 h-1.5 rounded-full ${phase.color.replace("text-", "bg-")} mt-1.5 shrink-0`} />
                    {cap}
                  </li>
                ))}
              </ul>

              {/* Outcome */}
              <div className={`text-sm font-medium ${phase.color} pt-3 border-t border-muted/20`}>
                {phase.outcome}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 text-center">
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
