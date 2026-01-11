import { Check, ArrowRight, Eye, Target } from "lucide-react";
import BehaviorShiftCard, { BehavioralShift } from "./BehaviorShiftCard";
import TimeAllocationBar, { TimeAllocation } from "./TimeAllocationBar";

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
    <div className="details-panel h-full animate-fade-in">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold"
            style={{ backgroundColor: layer.accentColor, color: "hsl(222 47% 6%)" }}
          >
            {layer.level}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
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

      {/* What it looks like */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-3.5 h-3.5" style={{ color: layer.accentColor }} />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            What it looks like
          </span>
        </div>
        <ul className="space-y-2">
          {layer.whatItLooksLike.map((item, index) => (
            <li
              key={index}
              className={`flex items-start gap-2 transition-all duration-300 ${
                highlightedItems.includes(index)
                  ? "bg-primary/10 -mx-3 px-3 py-1.5 rounded-lg"
                  : ""
              }`}
            >
              <span
                className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                style={{ backgroundColor: `${layer.accentColor}20` }}
              >
                <Check className="w-2.5 h-2.5" style={{ color: layer.accentColor }} />
              </span>
              <span className="text-sm text-foreground/90 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Result */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-3.5 h-3.5" style={{ color: layer.accentColor }} />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Result
          </span>
        </div>
        <ul className="space-y-1.5">
          {layer.result.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span
                className="flex-shrink-0 w-1 h-1 rounded-full mt-1.5"
                style={{ backgroundColor: layer.accentColor }}
              />
              <span className="text-sm text-foreground/80 leading-relaxed font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Why it matters */}
      <div
        className="relative p-4 rounded-lg border mb-4"
        style={{
          borderColor: `${layer.accentColor}30`,
          background: `linear-gradient(135deg, ${layer.accentColor}08 0%, transparent 100%)`,
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <ArrowRight className="w-3.5 h-3.5" style={{ color: layer.accentColor }} />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Why it matters
          </span>
        </div>
        <p className="text-sm font-medium text-foreground">
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
