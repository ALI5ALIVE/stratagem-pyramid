import { CheckCircle, Eye, Target, TrendingUp, ArrowRight } from "lucide-react";
import GDBehaviorShiftCard, { GDBehavioralShift } from "./GDBehaviorShiftCard";
import GDTimeAllocationBar, { GDTimeAllocation } from "./GDTimeAllocationBar";

export interface GDValueProof {
  metrics: string[];
  roiStatement: string;
}

export interface GDLayerData {
  id: string;
  level: number;
  headline: string;
  sublabel: string;
  whatItLooksLike: string[];
  result: string[];
  whyItMatters: string;
  colorClass: string;
  accentColor: string;
  behavioralShift: GDBehavioralShift;
  timeAllocation: GDTimeAllocation;
  valueProof: GDValueProof;
}

interface GDDetailsPanelProps {
  layer: GDLayerData;
  highlightedModule?: string | null;
}

const moduleHighlights: Record<string, number[]> = {
  market: [0, 1],
  innovation: [1, 2],
  consumer: [2, 3],
  competitive: [0, 3],
  commercial: [1, 2, 3],
};

const GDDetailsPanel = ({ layer, highlightedModule }: GDDetailsPanelProps) => {
  const highlightedItems = highlightedModule ? moduleHighlights[highlightedModule] || [] : [];

  return (
    <div className="h-full flex flex-col gap-2 text-left">
      {/* Header */}
      <div className="flex items-start gap-2 mb-1">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
          style={{ backgroundColor: layer.accentColor }}
        >
          {layer.level}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">
            {layer.sublabel}
          </p>
          <h3 className="text-sm font-bold text-foreground leading-tight truncate">
            {layer.headline}
          </h3>
        </div>
      </div>

      {/* What It Looks Like */}
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Eye className="w-2.5 h-2.5" style={{ color: layer.accentColor }} />
          <span className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
            What It Looks Like
          </span>
        </div>
        <ul className="space-y-0.5">
          {layer.whatItLooksLike.slice(0, 4).map((item, index) => (
            <li
              key={index}
              className={`flex items-start gap-1 text-[9px] leading-snug transition-all duration-300 ${
                highlightedItems.includes(index)
                  ? "text-foreground font-medium"
                  : "text-foreground/80"
              }`}
              style={{
                backgroundColor: highlightedItems.includes(index)
                  ? `${layer.accentColor}15`
                  : "transparent",
                borderRadius: "4px",
                padding: highlightedItems.includes(index) ? "2px 4px" : "0",
              }}
            >
              <CheckCircle
                className="w-2 h-2 mt-0.5 flex-shrink-0"
                style={{ color: layer.accentColor }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Result */}
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Target className="w-2.5 h-2.5" style={{ color: layer.accentColor }} />
          <span className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
            Result
          </span>
        </div>
        <ul className="space-y-0.5">
          {layer.result.slice(0, 3).map((item, index) => (
            <li key={index} className="flex items-start gap-1 text-[9px] text-foreground/80 leading-snug">
              <ArrowRight className="w-2 h-2 mt-0.5 flex-shrink-0" style={{ color: layer.accentColor }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Value Proof */}
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-2.5 h-2.5" style={{ color: layer.accentColor }} />
          <span className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
            Value Proof
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {layer.valueProof.metrics.slice(0, 4).map((metric, index) => (
            <span
              key={index}
              className="px-1.5 py-0.5 rounded text-[7px] font-medium"
              style={{
                backgroundColor: `${layer.accentColor}20`,
                color: layer.accentColor,
              }}
            >
              {metric}
            </span>
          ))}
        </div>
        <p className="text-[8px] italic text-muted-foreground mt-0.5">
          "{layer.valueProof.roiStatement}"
        </p>
      </div>

      {/* Behavioral Shift */}
      <GDBehaviorShiftCard
        behavioralShift={layer.behavioralShift}
        accentColor={layer.accentColor}
        level={layer.level}
      />

      {/* Time Allocation */}
      <GDTimeAllocationBar
        timeAllocation={layer.timeAllocation}
        accentColor={layer.accentColor}
      />
    </div>
  );
};

export default GDDetailsPanel;
