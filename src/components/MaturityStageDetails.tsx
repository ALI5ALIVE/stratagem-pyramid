import { Check, ArrowRight, Eye, Target, TrendingUp } from "lucide-react";
import BehaviorShiftCard from "./BehaviorShiftCard";
import TimeAllocationBar from "./TimeAllocationBar";
import type { MaturityStage } from "./MaturityCurveVisualization";

interface MaturityStageDetailsProps {
  stage: MaturityStage;
}

const MaturityStageDetails = ({ stage }: MaturityStageDetailsProps) => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold"
            style={{ backgroundColor: stage.accentColor, color: "hsl(222 47% 6%)" }}
          >
            {stage.stage}
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
            Stage {stage.stage} — {stage.sublabel}
          </span>
        </div>
        <h2
          className="text-base md:text-lg font-display font-bold leading-tight"
          style={{ color: stage.accentColor }}
        >
          {stage.headline}
        </h2>
      </div>

      {/* What it looks like */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-1">
          <Eye className="w-3 h-3" style={{ color: stage.accentColor }} />
          <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
            What it looks like
          </span>
        </div>
        <ul className="space-y-1">
          {stage.whatItLooksLike.map((item, index) => (
            <li key={index} className="flex items-start gap-1.5">
              <span
                className="flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center mt-0.5"
                style={{ backgroundColor: `${stage.accentColor}20` }}
              >
                <Check className="w-2 h-2" style={{ color: stage.accentColor }} />
              </span>
              <span className="text-[11px] text-foreground/90 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Result */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-1">
          <Target className="w-3 h-3" style={{ color: stage.accentColor }} />
          <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
            Result
          </span>
        </div>
        <ul className="space-y-0.5">
          {stage.result.map((item, index) => (
            <li key={index} className="flex items-start gap-1.5">
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1"
                style={{ backgroundColor: stage.accentColor }}
              />
              <span className="text-[11px] text-foreground/80 leading-relaxed font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Value Proof */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-1">
          <TrendingUp className="w-3 h-3" style={{ color: stage.accentColor }} />
          <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
            Value Proof
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {stage.valueProof.metrics.map((metric, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
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
          className="relative p-2.5 rounded"
          style={{
            background: `linear-gradient(135deg, ${stage.accentColor}10 0%, transparent 100%)`,
            borderLeft: `2px solid ${stage.accentColor}`,
          }}
        >
          <p className="text-[11px] font-medium text-foreground/90 italic">
            "{stage.valueProof.roiStatement}"
          </p>
        </div>
      </div>

      {/* Why it matters */}
      <div
        className="relative p-2.5 rounded border mb-3"
        style={{
          borderColor: `${stage.accentColor}30`,
          background: `linear-gradient(135deg, ${stage.accentColor}08 0%, transparent 100%)`,
        }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <ArrowRight className="w-3 h-3" style={{ color: stage.accentColor }} />
          <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
            Why it matters
          </span>
        </div>
        <p className="text-[11px] font-medium text-foreground">
          {stage.whyItMatters}
        </p>
      </div>

      {/* Behavioral Shift */}
      <BehaviorShiftCard
        behavioralShift={stage.behavioralShift}
        accentColor={stage.accentColor}
        level={stage.stage}
      />

      {/* Time Allocation */}
      <TimeAllocationBar
        timeAllocation={stage.timeAllocation}
        accentColor={stage.accentColor}
      />
    </div>
  );
};

export default MaturityStageDetails;
