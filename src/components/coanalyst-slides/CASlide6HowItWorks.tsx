import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Database, Sparkles, Search, Brain, ShieldCheck, ArrowRight, Clock, Zap, Eye, TrendingUp } from "lucide-react";

const steps = [
  { icon: Database, label: "Ingest", color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30", description: "Data flows in from safety, ops, maintenance, training, crew, and customer data lakes" },
  { icon: Sparkles, label: "Enrich", color: "text-violet-400", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/30", description: "AI enriches data: summarization, translation, categorization, root cause analysis" },
  { icon: Search, label: "Detect", color: "text-amber-400", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30", description: "Pattern recognition, hazard detection, cross-report correlation" },
  { icon: Brain, label: "Intelligence", color: "text-emerald-400", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/30", description: "Four levels: historical, reactive, proactive, and predictive" },
  { icon: ShieldCheck, label: "Activate", color: "text-primary", bgColor: "bg-primary/10", borderColor: "border-primary/30", description: "Intelligence feeds back into operational systems and data lakes via API" },
];

const tiers = [
  { icon: Clock, label: "Historical", question: "What happened?", desc: "Query past events across years of data", example: "How did we perform at Gate 14 over the last 4 years?", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  { icon: Zap, label: "Reactive", question: "What's happening now?", desc: "Real-time alerts and situational awareness", example: "What happened at Dubai airport 10 minutes ago?", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  { icon: Eye, label: "Proactive", question: "What should we watch?", desc: "Pattern detection and emerging hazard indicators", example: "Increasing bird strike reports on RWY 27L this quarter", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
  { icon: TrendingUp, label: "Predictive", question: "What's likely next?", desc: "Likelihood modelling and forward-looking risk", example: "68% probability of fatigue-related event on this route pattern", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
];

const CASlide6HowItWorks = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-how-it-works" title="How CoAnalyst Works" subtitle="From data ingestion to proactive control management" slideNumber={6} {...props}>
      <div className="flex flex-col justify-center h-full gap-3">
        {/* Pipeline */}
        <div className="flex items-stretch gap-1.5 max-w-6xl mx-auto w-full">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1 gap-1.5">
              <div className={`${step.bgColor} ${step.borderColor} border rounded-xl p-2.5 flex-1 flex flex-col items-center text-center`}>
                <step.icon className={`w-4 h-4 ${step.color} mb-1`} />
                <p className="text-[10px] font-bold text-foreground mb-0.5">{step.label}</p>
                <p className="text-[9px] text-muted-foreground leading-snug">{step.description}</p>
              </div>
              {i < steps.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />}
            </div>
          ))}
        </div>

        {/* Intelligence Tiers */}
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">Intelligence Maturity</p>
            <div className="flex-1 h-px bg-gradient-to-r from-sky-400/40 via-amber-400/40 via-purple-400/40 to-emerald-400/40" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {tiers.map((t) => (
              <div key={t.label} className={`${t.bg} ${t.border} border rounded-xl p-2.5 flex flex-col`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <t.icon className={`w-3.5 h-3.5 ${t.color}`} />
                  <span className={`text-[10px] font-bold ${t.color}`}>{t.label}</span>
                </div>
                <p className="text-[10px] font-semibold text-foreground mb-0.5">{t.question}</p>
                <p className="text-[9px] text-muted-foreground leading-snug mb-1 flex-1">{t.desc}</p>
                <p className="text-[8px] text-primary/70 italic leading-snug">"{t.example}"</p>
              </div>
            ))}
          </div>
          {/* Gradient progression line */}
          <div className="mt-1.5 h-0.5 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 via-purple-400 to-emerald-400 opacity-60" />
        </div>

        {/* Positioning callout */}
        <div className="bg-card/60 border border-border rounded-xl p-2.5 text-center max-w-4xl mx-auto">
          <p className="text-[10px] text-muted-foreground">
            <span className="text-primary font-semibold">CoAnalyst is the intelligence layer</span> that sits above operational systems. Other systems execute workflows. CoAnalyst enriches, structures, analyzes, and activates the data that powers them.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide6HowItWorks;
