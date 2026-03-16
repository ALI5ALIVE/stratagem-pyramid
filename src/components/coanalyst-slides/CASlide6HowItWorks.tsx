import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Database, Sparkles, Search, Brain, ShieldCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Database, label: "Ingest", color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30",
    description: "Data flows in from safety, ops, maintenance, training, crew, and customer data lakes",
    details: "Safety reports, injury reports, damage reports, fatigue reports, flight crew reports, service reports",
  },
  {
    icon: Sparkles, label: "Enrich", color: "text-violet-400", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/30",
    description: "AI enriches data: summarization, translation (60+ languages), categorization, root cause analysis",
    details: "Hybrid AI: ML models for 4,000+ categories + LLMs for newer classification needs",
  },
  {
    icon: Search, label: "Detect", color: "text-amber-400", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30",
    description: "Pattern recognition, hazard detection, cross-report correlation, and safety-critical event surfacing",
    details: "E.g. detecting increasing aircraft damages on a specific gate, or unrealistic pilot scheduling risks",
  },
  {
    icon: Brain, label: "Intelligence", color: "text-emerald-400", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/30",
    description: "Four levels: historical analysis, real-time reactive, proactive indicators, and predictive modelling",
    details: "'What happened at Dubai airport 10 mins ago?' or 'How did we perform at this gate over 4 years?'",
  },
  {
    icon: ShieldCheck, label: "Activate", color: "text-primary", bgColor: "bg-primary/10", borderColor: "border-primary/30",
    description: "Intelligence feeds back into Safety Manager, operational systems, and data lakes via API",
    details: "Enriched data quality powers better decisions across every workflow and system",
  },
];

const CASlide6HowItWorks = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-how-it-works" title="How CoAnalyst Works" subtitle="From data ingestion to proactive control management" slideNumber={6} {...props}>
      <div className="flex flex-col justify-center h-full gap-4">
        {/* Pipeline */}
        <div className="flex items-stretch gap-1.5 max-w-6xl mx-auto w-full">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1 gap-1.5">
              <div className={`${step.bgColor} ${step.borderColor} border rounded-xl p-3 flex-1 flex flex-col items-center text-center`}>
                <step.icon className={`w-5 h-5 ${step.color} mb-1.5`} />
                <p className="text-xs font-bold text-foreground mb-1">{step.label}</p>
                <p className="text-[10px] text-muted-foreground leading-snug mb-1.5">{step.description}</p>
                <p className="text-[9px] text-primary/70 italic leading-snug">{step.details}</p>
              </div>
              {i < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
            </div>
          ))}
        </div>

        {/* Positioning callout */}
        <div className="bg-card/60 border border-border rounded-xl p-3 text-center max-w-4xl mx-auto">
          <p className="text-[11px] text-muted-foreground">
            <span className="text-primary font-semibold">CoAnalyst is the intelligence layer</span> that sits above operational systems — like Palantir Foundry for defense. Other systems execute workflows. CoAnalyst enriches, structures, analyzes, and activates the data that powers them.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide6HowItWorks;
