import { TrendingUp, Crown, Settings, ExternalLink, ChevronDown } from "lucide-react";
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

// Show only the 4 most impactful use cases
const selectedUCIds = ["uc1", "uc2", "uc4", "uc6"];
const selectedUCs = useCases.filter((uc) => selectedUCIds.includes(uc.id));

// Show only the 4 most relevant leading measures for these use cases
const selectedLMIds = ["lm1", "lm2", "lm3", "lm4"];
const selectedLMs = leadingMeasures.filter((lm) => selectedLMIds.includes(lm.id));

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
      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        {/* Tier 1: Executive Outcomes */}
        <div>
          <h3 className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 text-center">
            Executive Outcomes
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {executiveOutcomes.map((eo) => {
              const Icon = stakeholderIcons[eo.stakeholder];
              const colors = stakeholderColors[eo.stakeholder];
              return (
                <div
                  key={eo.id}
                  className={`${colors.bg} border ${colors.border} rounded-lg px-2.5 py-2`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3 h-3 ${colors.text}`} />
                    <span className={`text-xs font-bold ${colors.text}`}>
                      {eo.stakeholder}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {eo.metrics.slice(0, 2).map((m) => (
                      <span key={m.id} className="text-[9px] text-foreground/70 truncate leading-tight">
                        {m.label}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Connecting lines */}
        <div className="flex justify-center gap-16">
          <div className="w-px h-4 border-l border-dashed border-primary/30" />
          <div className="w-px h-4 border-l border-dashed border-primary/30" />
          <div className="w-px h-4 border-l border-dashed border-primary/30" />
        </div>

        {/* Tier 2: Leading Measures */}
        <div>
          <h3 className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 text-center">
            Leading Measures
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {selectedLMs.map((lm) => (
              <div
                key={lm.id}
                className="bg-card/40 border border-border/40 rounded-lg px-2 py-1.5 text-center"
              >
                <span className="text-[10px] text-foreground font-medium block truncate">
                  {lm.shortLabel}
                </span>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <span className="text-[9px] text-muted-foreground">
                    {lm.baselineValue}{lm.unit}
                  </span>
                  <span className="text-[9px] font-semibold text-emerald-400">
                    {lm.direction === "down" ? "↓" : "↑"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connecting lines */}
        <div className="flex justify-center gap-12">
          <div className="w-px h-4 border-l border-dashed border-primary/30" />
          <div className="w-px h-4 border-l border-dashed border-primary/30" />
          <div className="w-px h-4 border-l border-dashed border-primary/30" />
          <div className="w-px h-4 border-l border-dashed border-primary/30" />
        </div>

        {/* Tier 3: Use Cases */}
        <div>
          <h3 className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 text-center">
            Use Cases
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {selectedUCs.map((uc) => (
              <div
                key={uc.id}
                className="bg-card/40 border border-border/40 rounded-lg px-2 py-2 flex flex-col items-center text-center gap-1"
              >
                <span className="text-[10px] text-foreground font-medium leading-tight">
                  {uc.label}
                </span>
                <span className="text-[8px] text-primary font-semibold bg-primary/10 rounded-full px-2 py-0.5 whitespace-nowrap">
                  {uc.input.costPerEvent}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[8px] text-muted-foreground text-center mt-1">
            + 4 more use cases in the full model
          </p>
        </div>

        {/* Bottom banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-2.5 flex items-center justify-between flex-wrap gap-2 mt-auto">
          <div>
            <p className="text-[10px] text-muted-foreground">Total Annual Cost Avoidance Opportunity</p>
            <p className="text-xl font-bold text-primary">$40M+</p>
            <p className="text-[9px] text-muted-foreground">Based on mid-size carrier profile · customisable to your operation</p>
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
