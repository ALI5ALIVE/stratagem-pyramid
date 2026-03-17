import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Brain, History, Bell, Eye, TrendingUp } from "lucide-react";

interface ExecSlide4IntelligenceProps extends SlideNarrationProps {
  slideNumber?: number;
}

const precisionData = [
  { level: "Level 1 (~50 categories)", coanalyst: 95, generic: 90 },
  { level: "Level 2 (~200 categories)", coanalyst: 93, generic: 75 },
  { level: "Level 3 (~800 categories)", coanalyst: 92, generic: 55 },
  { level: "Level 4–5 (4,000+)", coanalyst: 90, generic: 35 },
];

const tiers = [
  { icon: History, label: "Historical", desc: "Query millions of reports", color: "text-sky-400" },
  { icon: Bell, label: "Reactive", desc: "Real-time alerts", color: "text-amber-400" },
  { icon: Eye, label: "Proactive", desc: "Pattern detection", color: "text-purple-400" },
  { icon: TrendingUp, label: "Predictive", desc: "Risk modelling", color: "text-emerald-400" },
];

const ExecSlide4Intelligence = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: ExecSlide4IntelligenceProps) => {
  return (
    <SalesSlideContainer
      id="exec-slide-4"
      title="The Intelligence Layer"
      subtitle="Aviation-specific AI that generic tools can't replicate."
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
          {/* Precision Gap */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-foreground">The Precision Gap</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Accuracy at granular aviation categorization — where decisions are made
            </p>
            <div className="space-y-3">
              {precisionData.map((row) => (
                <div key={row.level} className="space-y-1.5">
                  <p className="text-xs text-muted-foreground">{row.level}</p>
                  <div className="flex gap-2 items-center">
                    {/* CoAnalyst bar */}
                    <div className="flex-1 h-5 bg-muted/30 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-primary rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${row.coanalyst}%` }}
                      >
                        <span className="text-[10px] font-bold text-primary-foreground">{row.coanalyst}%</span>
                      </div>
                    </div>
                    {/* Generic bar */}
                    <div className="flex-1 h-5 bg-muted/30 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-destructive/40 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${row.generic}%` }}
                      >
                        <span className="text-[10px] font-bold text-foreground/70">{row.generic}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-[10px] text-muted-foreground">
                    <span className="flex-1">CoAnalyst</span>
                    <span className="flex-1">Generic AI</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Architecture callout */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3">
              <h3 className="text-base font-bold text-foreground">Hybrid AI Architecture</h3>
              <p className="text-sm text-muted-foreground">
                Machine Learning + Large Language Models trained on <span className="text-foreground font-semibold">millions of historical aviation reports</span>.
                A 7-figure R&D investment since 2023.
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">90% accuracy</span> across 4,000+ categories at 5 classification levels — where generic AI hallucinates.
              </p>
            </div>

            {/* Intelligence tiers */}
            <div className="rounded-xl border border-border/50 bg-card/50 p-5 space-y-3">
              <h3 className="text-base font-bold text-foreground">Four Levels of Intelligence</h3>
              <div className="grid grid-cols-2 gap-3">
                {tiers.map((tier) => (
                  <div key={tier.label} className="flex items-center gap-2">
                    <tier.icon className={`w-4 h-4 ${tier.color}`} />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{tier.label}</p>
                      <p className="text-[10px] text-muted-foreground">{tier.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default ExecSlide4Intelligence;
