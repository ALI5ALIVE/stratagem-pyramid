import { TrendingUp, Crown, Settings, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/lineOfSightData";

interface ExecSlide5ValueProps extends SlideNarrationProps {
  slideNumber?: number;
}

const outcomes = [
  {
    icon: TrendingUp,
    stakeholder: "CFO",
    headline: "Fuel Cost Avoidance",
    metric: "$5M–$20M/yr",
    scenario: "A 1% fuel variance costs $5M–$20M annually. Connected FOQA-to-training pipelines target the specific crews and procedures driving excess burn.",
    colors: { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
  },
  {
    icon: Crown,
    stakeholder: "CEO",
    headline: "Audit & Compliance Risk",
    metric: "$50K–$2M per finding",
    scenario: "A single regulatory finding costs $50K–$2M in fines, remediation, and reputational damage. Continuous compliance closes gaps before auditors find them.",
    colors: { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  },
  {
    icon: Settings,
    stakeholder: "COO",
    headline: "Operational Disruption",
    metric: "$100K–$500K per AOG day",
    scenario: "Each aircraft-on-ground day costs $100K–$500K. Proactive maintenance triggers and crew readiness reduce unplanned downtime.",
    colors: { text: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  },
];

const ExecSlide5Value = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: ExecSlide5ValueProps) => {
  return (
    <SalesSlideContainer
      id="exec-slide-6"
      title="The Cost of Every Signal"
      subtitle="Every operational signal has a price tag. Here's what yours are worth."
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
        {/* 3 Stakeholder outcome cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
          {outcomes.map((o) => (
            <div
              key={o.stakeholder}
              className={`${o.colors.bg} border ${o.colors.border} rounded-xl p-6 flex flex-col gap-4`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${o.colors.bg} flex items-center justify-center`}>
                  <o.icon className={`w-6 h-6 ${o.colors.text}`} />
                </div>
                <span className={`text-lg font-bold ${o.colors.text}`}>{o.stakeholder}</span>
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">{o.headline}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{o.metric}</p>
              </div>
              <p className="text-sm text-muted-foreground flex-1">{o.scenario}</p>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Annual Cost Avoidance Opportunity</p>
            <p className="text-3xl font-bold text-primary">
              ${`$${(useCases.reduce((sum, uc) => sum + (uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor), 0) * 0.3 / 1_000_000).toFixed(0)}M+`}
            </p>
            <p className="text-xs text-muted-foreground">Based on mid-size carrier profile · customisable to your operation</p>
          </div>
          <Link
            to="/line-of-sight"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
          >
            <ExternalLink className="w-4 h-4" />
            Interactive Calculator
          </Link>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default ExecSlide5Value;
