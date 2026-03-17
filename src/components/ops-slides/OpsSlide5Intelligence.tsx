import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Database, Sparkles, Radar, Brain, Zap, History, Bell, Eye, TrendingUp } from "lucide-react";

interface OpsSlide5Props extends SlideNarrationProps {
  slideNumber?: number;
}

const pipeline = [
  { icon: Database, label: "Ingest", desc: "Reports, FOQA, maintenance, crew logs", color: "text-sky-400", bg: "bg-sky-400/10" },
  { icon: Sparkles, label: "Enrich", desc: "NLP extraction, entity linking, dedup", color: "text-violet-400", bg: "bg-violet-400/10" },
  { icon: Radar, label: "Detect", desc: "4,000+ categories at 90% accuracy", color: "text-amber-400", bg: "bg-amber-400/10" },
  { icon: Brain, label: "Intelligence", desc: "Pattern analysis, trend identification", color: "text-purple-400", bg: "bg-purple-400/10" },
  { icon: Zap, label: "Activate", desc: "Auto-trigger procedures & training", color: "text-emerald-400", bg: "bg-emerald-400/10" },
];

const tiers = [
  { icon: History, label: "Historical", example: '"Show me all hard landings at JFK in the last 12 months"', color: "text-sky-400" },
  { icon: Bell, label: "Reactive", example: '"Alert: 3rd go-around at the same airport this quarter"', color: "text-amber-400" },
  { icon: Eye, label: "Proactive", example: '"Crew fatigue pattern detected — schedule review recommended"', color: "text-purple-400" },
  { icon: TrendingUp, label: "Predictive", example: '"Based on trends, expect AOG risk increase in Q3"', color: "text-emerald-400" },
];

const precisionData = [
  { tier: "Category Level 1", coanalyst: 95, generic: 70 },
  { tier: "Category Level 3", coanalyst: 92, generic: 45 },
  { tier: "Category Level 5", coanalyst: 90, generic: 30 },
];

const OpsSlide5Intelligence = ({ slideNumber, ...narrationProps }: OpsSlide5Props) => {
  return (
    <SalesSlideContainer
      id="ops-slide-5"
      title="CoAnalyst: The Intelligence Engine"
      subtitle="Aviation-specific AI that powers every stage of DTOP"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Pipeline */}
        <div className="flex items-stretch gap-2">
          {pipeline.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 flex-1">
              <div className={`flex flex-col items-center p-3 rounded-lg border border-muted/20 ${step.bg} flex-1`}>
                <step.icon className={`h-6 w-6 ${step.color} mb-1.5`} />
                <span className={`text-sm font-bold ${step.color}`}>{step.label}</span>
                <span className="text-xs text-muted-foreground text-center mt-1 leading-tight">{step.desc}</span>
              </div>
              {i < pipeline.length - 1 && (
                <span className="text-muted-foreground/30 text-lg shrink-0">→</span>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Precision Gap */}
          <div className="p-4 rounded-xl border border-muted/20 bg-muted/5 flex flex-col">
            <h3 className="text-base font-semibold text-foreground mb-4">The Precision Gap</h3>
            <div className="space-y-4 flex-1">
              {precisionData.map((row) => (
                <div key={row.tier} className="space-y-1.5">
                  <span className="text-sm text-muted-foreground">{row.tier}</span>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="h-3 rounded-full bg-primary/80" style={{ width: `${row.coanalyst}%` }} />
                        <span className="text-sm font-bold text-primary">{row.coanalyst}%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-3 rounded-full bg-red-400/50" style={{ width: `${row.generic}%` }} />
                        <span className="text-sm text-red-400">{row.generic}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary/80" /> CoAnalyst</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400/50" /> Generic AI</span>
              </div>
            </div>
          </div>

          {/* Intelligence Tiers */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">Four Levels of Intelligence</h3>
            {tiers.map((tier) => (
              <div key={tier.label} className="p-3 rounded-lg border border-muted/20 bg-muted/5 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <tier.icon className={`h-5 w-5 ${tier.color}`} />
                  <span className={`text-sm font-bold ${tier.color}`}>{tier.label}</span>
                </div>
                <p className="text-sm text-muted-foreground italic">{tier.example}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide5Intelligence;
