import { Check, Eye, Target, TrendingUp } from "lucide-react";
import { MaturityStage } from "./MaturityCurveVisualization";

interface MaturityStageDetailsProps {
  stage: MaturityStage;
}

const MaturityStageDetails = ({ stage }: MaturityStageDetailsProps) => {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-start gap-2 mb-2">
        <div
          className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
          style={{
            background: `linear-gradient(135deg, ${stage.accentColor}, ${stage.accentColor}80)`,
            color: "white",
          }}
        >
          {stage.stage}
        </div>
        <div>
          <h3 className="text-sm lg:text-base font-bold text-foreground leading-tight">
            {stage.headline}
          </h3>
          <p
            className="text-xs font-medium mt-0.5"
            style={{ color: stage.accentColor }}
          >
            {stage.sublabel}
          </p>
        </div>
      </div>

      {/* What it looks like */}
      <div className="mb-2">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Eye className="w-3 h-3" style={{ color: stage.accentColor }} />
          <span
            className="text-[9px] font-semibold uppercase tracking-wider"
            style={{ color: stage.accentColor }}
          >
            What it looks like
          </span>
        </div>
        <ul className="space-y-1">
          {stage.whatItLooksLike.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-1.5 text-xs text-muted-foreground"
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  backgroundColor: `${stage.accentColor}20`,
                }}
              >
                <Check
                  className="w-2.5 h-2.5"
                  style={{ color: stage.accentColor }}
                />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Result */}
      <div className="mb-2">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Target className="w-3 h-3" style={{ color: stage.accentColor }} />
          <span
            className="text-[9px] font-semibold uppercase tracking-wider"
            style={{ color: stage.accentColor }}
          >
            Result
          </span>
        </div>
        <ul className="space-y-1">
          {stage.result.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-1.5 text-xs text-muted-foreground"
            >
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: stage.accentColor }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Value Proof */}
      <div className="mb-2">
        <div className="flex items-center gap-1.5 mb-1.5">
          <TrendingUp className="w-3 h-3" style={{ color: stage.accentColor }} />
          <span
            className="text-[9px] font-semibold uppercase tracking-wider"
            style={{ color: stage.accentColor }}
          >
            Value Proof
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-1.5">
          {stage.valueProof.metrics.map((metric, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{
                backgroundColor: `${stage.accentColor}20`,
                color: stage.accentColor,
              }}
            >
              {metric}
            </span>
          ))}
        </div>
        <div
          className="flex items-start gap-1.5 p-2 rounded-lg"
          style={{ backgroundColor: `${stage.accentColor}10` }}
        >
          <TrendingUp
            className="w-3 h-3 flex-shrink-0 mt-0.5"
            style={{ color: stage.accentColor }}
          />
          <p className="text-xs italic text-muted-foreground">
            {stage.valueProof.roiStatement}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaturityStageDetails;