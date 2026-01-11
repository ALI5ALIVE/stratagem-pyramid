import { Clock } from "lucide-react";

export interface TimeAllocation {
  coordination: number;
  administration: number;
  improvement: number;
}

interface TimeAllocationBarProps {
  timeAllocation: TimeAllocation;
  accentColor: string;
}

const TimeAllocationBar = ({ timeAllocation, accentColor }: TimeAllocationBarProps) => {
  // Guard against undefined timeAllocation
  if (!timeAllocation) {
    return null;
  }

  const { coordination, administration, improvement } = timeAllocation;

  return (
    <div
      className="relative p-4 rounded-lg border transition-all duration-300"
      style={{
        borderColor: `${accentColor}30`,
        background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)`,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-3.5 h-3.5" style={{ color: accentColor }} />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Where Teams Spend Time
        </span>
      </div>

      {/* Stacked Bar */}
      <div className="h-6 rounded-md overflow-hidden flex mb-3">
        <div
          className="h-full transition-all duration-500 ease-out flex items-center justify-center"
          style={{
            width: `${coordination}%`,
            backgroundColor: "hsl(0 70% 50%)",
          }}
        >
          {coordination >= 15 && (
            <span className="text-[10px] font-semibold text-white">{coordination}%</span>
          )}
        </div>
        <div
          className="h-full transition-all duration-500 ease-out flex items-center justify-center"
          style={{
            width: `${administration}%`,
            backgroundColor: "hsl(199 89% 48%)",
          }}
        >
          {administration >= 15 && (
            <span className="text-[10px] font-semibold text-white">{administration}%</span>
          )}
        </div>
        <div
          className="h-full transition-all duration-500 ease-out flex items-center justify-center"
          style={{
            width: `${improvement}%`,
            backgroundColor: "hsl(173 80% 40%)",
          }}
        >
          {improvement >= 15 && (
            <span className="text-[10px] font-semibold text-white">{improvement}%</span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-[10px]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(0 70% 50%)" }} />
          <span className="text-muted-foreground">Coordination</span>
          <span className="font-semibold text-foreground">{coordination}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(199 89% 48%)" }} />
          <span className="text-muted-foreground">Administration</span>
          <span className="font-semibold text-foreground">{administration}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(173 80% 40%)" }} />
          <span className="text-muted-foreground">Improvement</span>
          <span className="font-semibold text-foreground">{improvement}%</span>
        </div>
      </div>
    </div>
  );
};

export default TimeAllocationBar;
