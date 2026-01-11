import { Check, ArrowRight, Eye, Target } from "lucide-react";

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
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold"
            style={{ backgroundColor: layer.accentColor, color: "hsl(222 47% 6%)" }}
          >
            {layer.level}
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Stage {layer.level} — {layer.sublabel}
          </span>
        </div>
        <h2
          className="text-2xl md:text-3xl font-display font-bold leading-tight"
          style={{ color: layer.accentColor }}
        >
          {layer.headline}
        </h2>
      </div>

      {/* What it looks like */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4" style={{ color: layer.accentColor }} />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            What it looks like
          </span>
        </div>
        <ul className="space-y-3">
          {layer.whatItLooksLike.map((item, index) => (
            <li
              key={index}
              className={`flex items-start gap-3 transition-all duration-300 ${
                highlightedItems.includes(index)
                  ? "bg-primary/10 -mx-4 px-4 py-2 rounded-lg"
                  : ""
              }`}
            >
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                style={{ backgroundColor: `${layer.accentColor}20` }}
              >
                <Check className="w-3 h-3" style={{ color: layer.accentColor }} />
              </span>
              <span className="text-sm md:text-base text-foreground/90 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Result */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4" style={{ color: layer.accentColor }} />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Result
          </span>
        </div>
        <ul className="space-y-2">
          {layer.result.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                style={{ backgroundColor: layer.accentColor }}
              />
              <span className="text-sm md:text-base text-foreground/80 leading-relaxed font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Why it matters */}
      <div
        className="relative p-5 rounded-xl border"
        style={{
          borderColor: `${layer.accentColor}30`,
          background: `linear-gradient(135deg, ${layer.accentColor}08 0%, transparent 100%)`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <ArrowRight className="w-4 h-4" style={{ color: layer.accentColor }} />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Why it matters
          </span>
        </div>
        <p className="text-sm md:text-base font-medium text-foreground">
          {layer.whyItMatters}
        </p>
      </div>
    </div>
  );
};

export default DetailsPanel;
