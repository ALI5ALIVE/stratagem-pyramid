import { ArrowRight, TrendingUp, Crown, Settings, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { useCases, leadingMeasures, executiveOutcomes } from "@/data/lineOfSightData";

const stakeholderIcons: Record<string, typeof TrendingUp> = {
  CFO: TrendingUp,
  CEO: Crown,
  COO: Settings,
};

const stakeholderColors: Record<string, { text: string; bg: string; border: string }> = {
  CFO: { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
  CEO: { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  COO: { text: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
};

interface SalesSlide8LineOfSightProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide8LineOfSight = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide8LineOfSightProps) => {
  return (
    <SalesSlideContainer
      id="sales-slide-8"
      title="Line of Sight"
      subtitle="From use case cost to executive outcome — every dollar traced."
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-3 overflow-hidden">
        {/* Three-column cascade */}
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 flex-1 min-h-0 items-stretch">
          {/* Left: Use Cases (Tier 3) */}
          <div className="flex flex-col gap-1.5 min-h-0 overflow-hidden">
            <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Use Cases
            </h3>
            <div className="flex flex-col gap-1 flex-1 min-h-0 overflow-hidden">
              {useCases.map((uc) => (
                <div
                  key={uc.id}
                  className="bg-card/40 border border-border/40 rounded-lg px-2.5 py-1.5 flex items-center justify-between gap-1"
                >
                  <span className="text-[10px] sm:text-xs text-foreground font-medium truncate">
                    {uc.label}
                  </span>
                  <span className="text-[9px] text-primary whitespace-nowrap font-medium">
                    {uc.input.costPerEvent}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-primary/50" />
          </div>

          {/* Center: Leading Measures (Tier 2) */}
          <div className="flex flex-col gap-1.5 min-h-0 overflow-hidden">
            <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Leading Measures
            </h3>
            <div className="flex flex-col gap-1.5 flex-1 justify-center">
              {leadingMeasures.map((lm) => (
                <div
                  key={lm.id}
                  className="bg-card/40 border border-border/40 rounded-lg px-3 py-2 flex items-center justify-between"
                >
                  <span className="text-[10px] sm:text-xs text-foreground font-medium">
                    {lm.shortLabel}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">
                      {lm.baselineValue}{lm.unit}
                    </span>
                    <span className={`text-[10px] font-semibold ${lm.direction === "down" ? "text-emerald-400" : "text-emerald-400"}`}>
                      {lm.direction === "down" ? "↓" : "↑"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-primary/50" />
          </div>

          {/* Right: Executive Outcomes (Tier 1) */}
          <div className="flex flex-col gap-1.5 min-h-0 overflow-hidden">
            <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Executive Outcomes
            </h3>
            <div className="flex flex-col gap-2 flex-1 justify-center">
              {executiveOutcomes.map((eo) => {
                const Icon = stakeholderIcons[eo.stakeholder];
                const colors = stakeholderColors[eo.stakeholder];
                return (
                  <div
                    key={eo.id}
                    className={`${colors.bg} border ${colors.border} rounded-lg px-3 py-2`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className={`w-3 h-3 ${colors.text}`} />
                      <span className={`text-xs font-semibold ${colors.text}`}>
                        {eo.stakeholder}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {eo.metrics.map((m) => (
                        <span key={m.id} className="text-[10px] text-foreground/80 truncate">
                          {m.label}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Total Annual Cost Avoidance Opportunity</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">$40M+</p>
            <p className="text-[10px] text-muted-foreground">Based on mid-size carrier profile · customisable to your operation</p>
          </div>
          <Link
            to="/line-of-sight"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
          >
            <ExternalLink className="w-4 h-4" />
            Interactive Calculator
          </Link>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide8LineOfSight;
