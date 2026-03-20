import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Brain, Clock, Bell, Eye, TrendingUp } from "lucide-react";

interface OpsSlide5Props extends SlideNarrationProps {
  slideNumber?: number;
}

const precisionData = [
  { level: "Level 1 (~50 categories)", coanalyst: 95, generic: 90 },
  { level: "Level 2 (~200 categories)", coanalyst: 93, generic: 75 },
  { level: "Level 3 (~800 categories)", coanalyst: 92, generic: 55 },
  { level: "Level 4–5 (4,000+)", coanalyst: 90, generic: 35 },
];

const intelligenceTiers = [
  { icon: Clock, tier: "Historical", question: "What happened and why?", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  { icon: Bell, tier: "Reactive", question: "What's happening now?", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  { icon: Eye, tier: "Proactive", question: "What should we watch?", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
  { icon: TrendingUp, tier: "Predictive", question: "What's likely next?", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
];

const OpsSlide5Intelligence = ({ slideNumber, ...narrationProps }: OpsSlide5Props) => {
  return (
    <SalesSlideContainer
      id="ops-slide-5"
      title="The Intelligence Layer — CoAnalyst"
      subtitle="Aviation-specific AI that generative AI can't replicate."
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-6 max-w-4xl mx-auto w-full">
        {/* Hero stat */}
        <div className="flex items-center gap-12 justify-center">
          <div className="text-center">
            <p className="text-5xl font-bold text-primary">90%</p>
            <p className="text-xs text-muted-foreground mt-1">CoAnalyst</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-muted-foreground">vs</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-destructive/60">35%</p>
            <p className="text-xs text-muted-foreground mt-1">Generative AI</p>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs max-w-lg">
          Accuracy at <span className="text-foreground font-semibold">4,000+ aviation categories</span> across 5 classification levels.
        </p>

        {/* Two-column layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Left: Intelligence Tiers */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Four Levels of Intelligence</h3>
            {intelligenceTiers.map((t) => (
              <div key={t.tier} className={`rounded-lg border ${t.border} ${t.bg} p-3 flex items-center gap-3`}>
                <t.icon className={`h-5 w-5 ${t.color} shrink-0`} />
                <div>
                  <h4 className={`text-sm font-bold ${t.color}`}>{t.tier}</h4>
                  <p className="text-xs text-muted-foreground">{t.question}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Precision Gap */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold text-foreground">The Precision Gap</h3>
            </div>
            <div className="space-y-2.5">
              {precisionData.map((row) => (
                <div key={row.level} className="space-y-1">
                  <p className="text-[10px] text-muted-foreground">{row.level}</p>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 h-5 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${row.coanalyst}%` }}
                      >
                        <span className="text-[9px] font-bold text-primary-foreground">{row.coanalyst}%</span>
                      </div>
                    </div>
                    <div className="flex-1 h-5 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-destructive/40 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${row.generic}%` }}
                      >
                        <span className="text-[9px] font-bold text-foreground/70">{row.generic}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-[9px] text-muted-foreground">
                    <span className="flex-1">CoAnalyst</span>
                    <span className="flex-1">Generic AI</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground italic">
          A 7-figure R&D investment since 2023 — ML + LLMs trained on millions of historical aviation reports.
        </p>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide5Intelligence;
