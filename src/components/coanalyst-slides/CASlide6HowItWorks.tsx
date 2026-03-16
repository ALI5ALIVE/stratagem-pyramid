import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Database, Sparkles, Search, Brain, ShieldCheck, ArrowRight } from "lucide-react";

const steps = [
  { icon: Database, label: "Ingest", description: "Data flows in from safety, ops, maintenance, training, crew, and customer data lakes", color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30" },
  { icon: Sparkles, label: "Enrich", description: "AI enriches data: summarization, translation (60+ languages), categorization, and quality improvement", color: "text-violet-400", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/30" },
  { icon: Search, label: "Detect", description: "Pattern recognition, hazard detection, root-cause analysis, and cross-report correlation at scale", color: "text-amber-400", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30" },
  { icon: Brain, label: "Intelligence", description: "Four levels of insight: historical analysis, real-time reactive, proactive indicators, and predictive modelling", color: "text-emerald-400", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/30" },
  { icon: ShieldCheck, label: "Control", description: "Intelligence activates control management — identifying weakening controls and driving proactive decisions", color: "text-primary", bgColor: "bg-primary/10", borderColor: "border-primary/30" },
];

const CASlide6HowItWorks = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-how-it-works" title="How CoAnalyst Works" subtitle="From data ingestion to proactive control management" slideNumber={6} {...props}>
      <div className="flex flex-col justify-center h-full gap-6">
        {/* Pipeline */}
        <div className="flex items-stretch gap-2 max-w-6xl mx-auto w-full">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1 gap-2">
              <div className={`${step.bgColor} ${step.borderColor} border rounded-xl p-4 flex-1 flex flex-col items-center text-center`}>
                <step.icon className={`w-7 h-7 ${step.color} mb-2`} />
                <p className="text-sm font-bold text-foreground mb-1">{step.label}</p>
                <p className="text-[11px] text-muted-foreground leading-snug">{step.description}</p>
              </div>
              {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />}
            </div>
          ))}
        </div>

        {/* Positioning callout */}
        <div className="bg-card/60 border border-border rounded-xl p-4 text-center max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">CoAnalyst is the intelligence layer</span> that sits above operational systems. Other systems execute workflows. CoAnalyst enriches, structures, analyzes, and activates the data.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide6HowItWorks;
