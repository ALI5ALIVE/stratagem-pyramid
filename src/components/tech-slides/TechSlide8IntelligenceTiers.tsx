import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, Bell, Eye, TrendingUp } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const tiers = [
  {
    icon: Clock, tier: "Historical", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30",
    desc: "Query and analyse past events with natural language",
    examples: ["\"Show me all hard landing events at LHR in Q4 2024\"", "\"Compare bird strike trends across fleet types\"", "\"What were the top 10 contributing factors last year?\""],
    capability: "Full corpus search across millions of reports with aviation-aware context",
  },
  {
    icon: Bell, tier: "Reactive", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30",
    desc: "Real-time alerts when signals cross defined thresholds",
    examples: ["Hard landing threshold exceeded — 3rd time this month", "New AD issued affecting 737 fleet — 12 procedures impacted", "Training completion deadline approaching — 23 crew outstanding"],
    capability: "Automated monitoring with configurable alert rules and escalation chains",
  },
  {
    icon: Eye, tier: "Proactive", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30",
    desc: "Pattern detection and emerging hazard identification",
    examples: ["\"Smoke & fumes reports increasing 40% — potential fleet-wide issue\"", "\"Crew fatigue patterns correlating with specific rotation types\"", "\"Maintenance procedure deviation clustering at Station X\""],
    capability: "Cross-report pattern recognition that surfaces risks before they become incidents",
  },
  {
    icon: TrendingUp, tier: "Predictive", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30",
    desc: "Likelihood assessments and future risk modelling",
    examples: ["\"Based on current trends, runway excursion probability increases 2.3x in winter ops\"", "\"Fleet type X showing accelerating maintenance cost curve — intervention point in 6 months\""],
    capability: "Probabilistic risk modelling that enables pre-emptive action before events occur",
  },
];

const TechSlide8IntelligenceTiers = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-8" title="Intelligence Tiers" subtitle="Four levels of operational intelligence — from querying the past to predicting the future" slideNumber={slideNumber} {...narrationProps}>
    <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
      {tiers.map((t) => (
        <div key={t.tier} className={`rounded-xl border ${t.border} ${t.bg} p-4 flex flex-col`}>
          <div className="flex items-center gap-2 mb-2">
            <t.icon className={`h-5 w-5 ${t.color}`} />
            <h3 className={`text-base font-bold ${t.color}`}>{t.tier}</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{t.desc}</p>
          <div className="space-y-1.5 flex-1">
            {t.examples.map((e, i) => (
              <div key={i} className="p-2 rounded-lg bg-background/40 border border-muted/10">
                <p className="text-[10px] text-foreground/80 italic">{e}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-3 pt-2 border-t border-muted/10">{t.capability}</p>
        </div>
      ))}
    </div>
  </SalesSlideContainer>
);

export default TechSlide8IntelligenceTiers;
