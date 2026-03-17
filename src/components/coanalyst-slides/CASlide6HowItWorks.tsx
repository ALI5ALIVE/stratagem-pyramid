import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, Zap, Eye, TrendingUp, ChevronRight } from "lucide-react";

const tiers = [
  { icon: Clock, label: "Historical", question: "What happened?", desc: "Query past events across years of data", example: "How did we perform at Gate 14 over the last 4 years?", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  { icon: Zap, label: "Reactive", question: "What's happening now?", desc: "Real-time alerts and situational awareness", example: "What happened at Dubai airport 10 minutes ago?", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  { icon: Eye, label: "Proactive", question: "What should we watch?", desc: "Pattern detection and emerging hazard indicators", example: "Increasing bird strike reports on RWY 27L this quarter", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
  { icon: TrendingUp, label: "Predictive", question: "What's likely next?", desc: "Likelihood modelling and forward-looking risk", example: "68% probability of fatigue-related event on this route pattern", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
];

const pipelineSteps = ["Data", "AI Enrichment", "Intelligence Tiers", "Operational Systems"];

const CASlide6HowItWorks = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-how-it-works" title="How CoAnalyst Works" subtitle="Four levels of intelligence — from hindsight to foresight" slideNumber={6} {...props}>
      <div className="flex flex-col justify-center h-full gap-5">
        {/* Minimal pipeline reference */}
        <div className="flex items-center justify-center gap-1.5">
          {pipelineSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-1.5">
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${step === "Intelligence Tiers" ? "text-primary" : "text-muted-foreground"}`}>
                {step}
              </span>
              {i < pipelineSteps.length - 1 && <ChevronRight className="w-3 h-3 text-muted-foreground/50" />}
            </div>
          ))}
        </div>

        {/* Intelligence Tiers — hero content */}
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Intelligence Maturity</p>
            <div className="flex-1 h-px bg-gradient-to-r from-sky-400/40 via-amber-400/40 via-purple-400/40 to-emerald-400/40" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {tiers.map((t) => (
              <div key={t.label} className={`${t.bg} ${t.border} border rounded-xl p-4 flex flex-col`}>
                <div className="flex items-center gap-2 mb-2">
                  <t.icon className={`w-5 h-5 ${t.color}`} />
                  <span className={`text-xs font-bold ${t.color}`}>{t.label}</span>
                </div>
                <p className="text-xs font-semibold text-foreground mb-1">{t.question}</p>
                <p className="text-[11px] text-muted-foreground leading-snug mb-2 flex-1">{t.desc}</p>
                <p className="text-[10px] text-primary/70 italic leading-snug">"{t.example}"</p>
              </div>
            ))}
          </div>
          <div className="mt-2 h-0.5 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 via-purple-400 to-emerald-400 opacity-60" />
        </div>

        {/* Positioning callout */}
        <div className="bg-card/60 border border-border rounded-xl p-3 text-center max-w-4xl mx-auto">
          <p className="text-[11px] text-muted-foreground">
            <span className="text-primary font-semibold">CoAnalyst is the intelligence layer</span> that sits above operational systems. Other systems execute workflows. CoAnalyst enriches, structures, analyzes, and activates the data that powers them.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide6HowItWorks;
