import { Check, ArrowRight, Eye, Target, TrendingUp } from "lucide-react";
import BehaviorShiftCard, { BehavioralShift } from "./BehaviorShiftCard";
import TimeAllocationBar, { TimeAllocation } from "./TimeAllocationBar";

export interface ValueProof {
  metrics: string[];
  roiStatement: string;
}

export interface LayerData {
  id: string;
  level: number;
  headline: string;
  sublabel: string;
  whatItLooksLike: string[];
  result: string[];
  whyItMatters: string;
  colorClass: string;
  accentColor: string;
  behavioralShift: BehavioralShift;
  timeAllocation: TimeAllocation;
  valueProof: ValueProof;
}

interface DetailsPanelProps {
  layer: LayerData;
  highlightedModule?: string | null;
}

const DetailsPanel = ({ layer, highlightedModule }: DetailsPanelProps) => {
  // Map modules to their relevant items for connected governance layer
  const moduleHighlights: Record<string, number[]> = {
    safety: [0, 2],
    content: [0, 1],
    training: [0, 2],
  };

  const highlightedItems = highlightedModule ? moduleHighlights[highlightedModule] || [] : [];

  return (
    <div className="details-panel h-full animate-fade-in space-y-4">
      {/* Header - 2x scaled */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-base font-bold"
            style={{ backgroundColor: layer.accentColor, color: "hsl(222 47% 6%)" }}
          >
            {layer.level}
          </span>
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Stage {layer.level} — {layer.sublabel}
          </span>
        </div>
        <h2
          className="text-xl md:text-2xl font-display font-bold leading-tight"
          style={{ color: layer.accentColor }}
        >
          {layer.headline}
        </h2>
      </div>

      {/* What it looks like - 2x scaled */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-5 h-5" style={{ color: layer.accentColor }} />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            What it looks like
          </span>
        </div>
        <ul className="space-y-2">
          {layer.whatItLooksLike.map((item, index) => (
            <li
              key={index}
              className={`flex items-start gap-2 transition-all duration-300 ${
                highlightedItems.includes(index)
                  ? "bg-primary/10 -mx-2 px-2 py-1 rounded-lg"
                  : ""
              }`}
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                style={{ backgroundColor: `${layer.accentColor}20` }}
              >
                <Check className="w-4 h-4" style={{ color: layer.accentColor }} />
              </span>
              <span className="text-lg text-foreground/90 leading-snug">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Result - 2x scaled */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5" style={{ color: layer.accentColor }} />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Result
          </span>
        </div>
        <ul className="space-y-2">
          {layer.result.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span
                className="flex-shrink-0 w-2.5 h-2.5 rounded-full mt-2"
                style={{ backgroundColor: layer.accentColor }}
              />
              <span className="text-lg text-foreground/80 leading-snug font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Value Proof - 2x scaled */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5" style={{ color: layer.accentColor }} />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Value Proof
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {layer.valueProof.metrics.map((metric, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-base font-semibold"
              style={{
                backgroundColor: `${layer.accentColor}15`,
                color: layer.accentColor,
                border: `1px solid ${layer.accentColor}30`,
              }}
            >
              {metric}
            </span>
          ))}
        </div>
        <div
          className="relative p-4 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${layer.accentColor}10 0%, transparent 100%)`,
            borderLeft: `4px solid ${layer.accentColor}`,
          }}
        >
          <p className="text-lg font-medium text-foreground/90 italic">
            "{layer.valueProof.roiStatement}"
          </p>
        </div>
      </div>

      {/* Why it matters - 2x scaled */}
      <div
        className="relative p-4 rounded-lg border mb-3"
        style={{
          borderColor: `${layer.accentColor}30`,
          background: `linear-gradient(135deg, ${layer.accentColor}08 0%, transparent 100%)`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <ArrowRight className="w-5 h-5" style={{ color: layer.accentColor }} />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Why it matters
          </span>
        </div>
        <p className="text-lg font-medium text-foreground leading-snug">
          {layer.whyItMatters}
        </p>
      </div>

      {/* Behavioral Shift */}
      <BehaviorShiftCard
        behavioralShift={layer.behavioralShift}
        accentColor={layer.accentColor}
        level={layer.level}
      />

      {/* Time Allocation */}
      <TimeAllocationBar
        timeAllocation={layer.timeAllocation}
        accentColor={layer.accentColor}
      />
    </div>
  );
};

export default DetailsPanel;