import { Target, AlertTriangle, CheckCircle } from "lucide-react";

interface UseCase {
  scenario: string;
  problem: string;
  outcome: string;
}

interface UseCaseStageDetailsProps {
  stage: number;
  headline: string;
  sublabel: string;
  accentColor: string;
  useCase: UseCase;
}

const UseCaseStageDetails = ({ 
  stage, 
  headline, 
  sublabel, 
  accentColor, 
  useCase 
}: UseCaseStageDetailsProps) => {
  // Stages 1-2 show problems, Stages 3-5 show achievements
  const isProblemStage = stage <= 2;
  
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start gap-2 mb-3">
        <div
          className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-sm font-bold"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}80)`,
            color: "white",
          }}
        >
          {stage}
        </div>
        <div>
          <h3 className="text-sm lg:text-base font-bold text-foreground leading-tight">
            {headline}
          </h3>
          <p
            className="text-xs font-medium mt-0.5"
            style={{ color: accentColor }}
          >
            {sublabel}
          </p>
        </div>
      </div>

      {/* Use Case Card */}
      <div
        className="rounded-lg p-4 space-y-3"
        style={{ backgroundColor: `${accentColor}10`, borderLeft: `3px solid ${accentColor}` }}
      >
        {/* Scenario Title */}
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />
          <span className="text-sm font-semibold text-foreground">
            {useCase.scenario}
          </span>
        </div>

        {/* Problem/Achievement Description */}
        <div className="flex items-start gap-2">
          {isProblemStage ? (
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-muted-foreground" />
          ) : (
            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
          )}
          <p className="text-xs text-muted-foreground leading-relaxed">
            {useCase.problem}
          </p>
        </div>

        {/* Outcome Statement */}
        <div 
          className="flex items-center gap-2 pt-2 border-t"
          style={{ borderColor: `${accentColor}30` }}
        >
          <span 
            className="text-xs font-medium"
            style={{ color: accentColor }}
          >
            ➜
          </span>
          <p className="text-xs font-medium text-foreground">
            {useCase.outcome}
          </p>
        </div>
      </div>

      {/* Stage Indicator */}
      <div className="flex items-center justify-center pt-2">
        <span 
          className="text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded-full"
          style={{ 
            backgroundColor: `${accentColor}15`,
            color: accentColor 
          }}
        >
          {isProblemStage ? "What goes wrong" : "What becomes possible"}
        </span>
      </div>
    </div>
  );
};

export default UseCaseStageDetails;
