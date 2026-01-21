import { Check, Eye, Target, TrendingUp } from "lucide-react";
import type { MaturityStage } from "./MaturityCurveVisualization";

interface MaturityStageDetailsProps {
  stage: MaturityStage;
}

const MaturityStageDetails = ({ stage }: MaturityStageDetailsProps) => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className="inline-flex items-center justify-center w-4 h-4 rounded text-[9px] font-bold"
            style={{ backgroundColor: stage.accentColor, color: "hsl(222 47% 6%)" }}
          >
            {stage.stage}
          </span>
          <span className="text-[8px] font-semibold uppercase tracking-widest text-muted-foreground">
            Stage {stage.stage}
          </span>
        </div>
        <h2
          className="text-sm md:text-base font-display font-bold leading-tight"
          style={{ color: stage.accentColor }}
        >
          {stage.headline}
        </h2>
      </div>

      {/* What it looks like */}
      <div className="mb-2">
        <div className="flex items-center gap-1.5 mb-0.5">
          <Eye className="w-2.5 h-2.5" style={{ color: stage.accentColor }} />
          <span className="text-[8px] font-semibold uppercase tracking-widest text-muted-foreground">
            What it looks like
          </span>
        </div>
        <ul className="space-y-0.5">
          {stage.whatItLooksLike.map((item, index) => (
            <li key={index} className="flex items-start gap-1">
              <span
                className="flex-shrink-0 w-3 h-3 rounded-full flex items-center justify-center mt-0.5"
                style={{ backgroundColor: `${stage.accentColor}20` }}
              >
                <Check className="w-2 h-2" style={{ color: stage.accentColor }} />
              </span>
              <span className="text-[10px] text-foreground/90 leading-snug">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Result */}
      <div className="mb-2">
        <div className="flex items-center gap-1.5 mb-0.5">
          <Target className="w-2.5 h-2.5" style={{ color: stage.accentColor }} />
          <span className="text-[8px] font-semibold uppercase tracking-widest text-muted-foreground">
            Result
          </span>
        </div>
        <ul className="space-y-0.5">
          {stage.result.map((item, index) => (
            <li key={index} className="flex items-start gap-1">
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1"
                style={{ backgroundColor: stage.accentColor }}
              />
              <span className="text-[10px] text-foreground/80 leading-snug font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Value Proof */}
      <div>
        <div className="flex items-center gap-1.5 mb-0.5">
          <TrendingUp className="w-2.5 h-2.5" style={{ color: stage.accentColor }} />
          <span className="text-[8px] font-semibold uppercase tracking-widest text-muted-foreground">
            Value Proof
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-1.5">
          {stage.valueProof.metrics.map((metric, index) => (
            <span
              key={index}
              className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-semibold"
              style={{
                backgroundColor: `${stage.accentColor}15`,
                color: stage.accentColor,
                border: `1px solid ${stage.accentColor}30`,
              }}
            >
              {metric}
            </span>
          ))}
        </div>
        <div
          className="relative p-2 rounded"
          style={{
            background: `linear-gradient(135deg, ${stage.accentColor}10 0%, transparent 100%)`,
            borderLeft: `2px solid ${stage.accentColor}`,
          }}
        >
          <p className="text-[10px] font-medium text-foreground/90 italic">
            "{stage.valueProof.roiStatement}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaturityStageDetails;
