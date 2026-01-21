import SlideContainer from "./SlideContainer";
import { CheckCircle2, XCircle, Target, Building2, Layers, Sparkles, BarChart3 } from "lucide-react";

const Slide9CategoryRationale = () => {
  const criteriaChecks = [
    {
      label: "COO Clarity",
      description: "Executive-native language: 'Operational Excellence' is how COOs talk about consistent execution",
      icon: Target,
    },
    {
      label: "Scope Protection",
      description: "'Readiness' keeps Training + Competency + Proof central (prevents collapse into analytics)",
      icon: Layers,
    },
    {
      label: "Cross-Industry",
      description: "Applies cleanly across aviation, rail, defense, maritime, and other regulated operations",
      icon: Building2,
    },
    {
      label: "Differentiation",
      description: "Avoids module traps (manuals/safety/LMS) and ops-control/dashboard confusion",
      icon: Sparkles,
    },
    {
      label: "Analyst Legibility",
      description: "Leaves room for AI as accelerator, not the category - safer for analysts and regulators",
      icon: BarChart3,
    },
  ];

  const alternatives = [
    {
      name: "Operational Performance & Readiness Platform",
      verdict: "Acceptable alternate",
      risk: "Slightly more generic; needs operating model to differentiate",
    },
    {
      name: "Operational Performance Platform",
      verdict: "Outcome language only",
      risk: "Easily misclassified as analytics/ops-control; loses training + proof",
    },
    {
      name: "Operational Assurance Platform",
      verdict: "Supporting pillar",
      risk: "Pulls perception back to compliance checking; backward-looking",
    },
    {
      name: "Operational Performance & Resilience Platform",
      verdict: "Campaign theme",
      risk: "'Resilience' skews to crisis/IT/BCP; less about daily execution",
    },
    {
      name: "Continuous Improvement Operating System",
      verdict: "Operating model name",
      risk: "Sounds like methodology or consulting, not a product category",
    },
  ];

  return (
    <SlideContainer
      id="slide-9"
      title="Why 'Operational Excellence & Readiness Platform'"
      subtitle="The name that protects scope, resonates with executives, and defines the category"
      slideNumber={9}
    >
      {/* Hero Banner */}
      <div className="bg-primary/15 border-2 border-primary rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-center">
        <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">
          Recommended Category Name
        </p>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
          Operational Excellence & Readiness Platform
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
          Protects the full platform scope: Safety + Procedures + Training + Proof
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left: Criteria Check */}
        <div className="bg-card rounded-xl border border-border p-4 sm:p-5">
          <h4 className="text-sm font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            Board-Ready Rationale
          </h4>
          <div className="space-y-2.5 sm:space-y-3">
            {criteriaChecks.map((criterion, index) => {
              return (
                <div key={index} className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-foreground">{criterion.label}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{criterion.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Alternatives Table */}
        <div className="bg-card rounded-xl border border-border p-4 sm:p-5">
          <h4 className="text-sm font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-muted-foreground" />
            Alternatives Tabled
          </h4>
          <div className="space-y-2.5 sm:space-y-3">
            {alternatives.map((alt, index) => (
              <div key={index} className="border-b border-border pb-2.5 sm:pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1">
                  <p className="text-[10px] sm:text-xs font-medium text-foreground truncate">{alt.name}</p>
                  <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-muted text-muted-foreground whitespace-nowrap shrink-0">
                    {alt.verdict}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{alt.risk}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing Statement */}
      <div className="mt-4 sm:mt-6 bg-primary/10 border border-primary/30 rounded-lg p-4 sm:p-5">
        <p className="text-xs sm:text-sm text-foreground text-center leading-relaxed">
          <span className="font-semibold text-primary">What to say in the room:</span>{" "}
          "We use 'Operational Excellence & Readiness Platform' as the category because it's the clearest executive frame 
          that still protects what makes Comply365 different: connecting Safety + Procedures + Training into a governed 
          operating system that turns signals into outcomes and proof."
        </p>
      </div>
    </SlideContainer>
  );
};

export default Slide9CategoryRationale;
