import { Check, Eye, Target, TrendingUp } from "lucide-react";
import { MaturityStage } from "./MaturityCurveVisualization";

interface MaturityStageDetailsProps {
  stage: MaturityStage;
}

const MaturityStageDetails = ({ stage }: MaturityStageDetailsProps) => {
  return (
    <div className="space-y-4">
      {/* Header - 2x scaled */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold"
          style={{
            background: `linear-gradient(135deg, ${stage.accentColor}, ${stage.accentColor}80)`,
            color: "white",
          }}
        >
          {stage.stage}
        </div>
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-tight">
            {stage.headline}
          </h3>
          <p
            className="text-lg font-medium mt-1"
            style={{ color: stage.accentColor }}
          >
            {stage.sublabel}
          </p>
        </div>
      </div>

      {/* What it looks like - 2x scaled */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-6 h-6" style={{ color: stage.accentColor }} />
          <span
            className="text-base font-semibold uppercase tracking-wider"
            style={{ color: stage.accentColor }}
          >
            What it looks like
          </span>
        </div>
        <ul className="space-y-3">
          {stage.whatItLooksLike.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-lg text-muted-foreground"
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  backgroundColor: `${stage.accentColor}20`,
                }}
              >
                <Check
                  className="w-5 h-5"
                  style={{ color: stage.accentColor }}
                />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Result - 2x scaled */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-6 h-6" style={{ color: stage.accentColor }} />
          <span
            className="text-base font-semibold uppercase tracking-wider"
            style={{ color: stage.accentColor }}
          >
            Result
          </span>
        </div>
        <ul className="space-y-2">
          {stage.result.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-lg text-muted-foreground"
            >
              <span
                className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: stage.accentColor }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Value Proof - 2x scaled */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-6 h-6" style={{ color: stage.accentColor }} />
          <span
            className="text-base font-semibold uppercase tracking-wider"
            style={{ color: stage.accentColor }}
          >
            Value Proof
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {stage.valueProof.metrics.map((metric, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full text-lg font-medium"
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
          className="flex items-start gap-3 p-5 rounded-lg"
          style={{ backgroundColor: `${stage.accentColor}10` }}
        >
          <TrendingUp
            className="w-6 h-6 flex-shrink-0 mt-0.5"
            style={{ color: stage.accentColor }}
          />
          <p className="text-lg italic text-muted-foreground">
            {stage.valueProof.roiStatement}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaturityStageDetails;