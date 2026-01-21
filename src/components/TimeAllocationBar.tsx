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
      className="relative p-1.5 rounded border transition-all duration-300"
      style={{
        borderColor: `${accentColor}30`,
        background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)`,
      }}
    >
      <div className="flex items-center gap-1 mb-1">
        <Clock className="w-2 h-2" style={{ color: accentColor }} />
        <span className="text-[7px] font-semibold uppercase tracking-widest text-muted-foreground">
          Where Teams Spend Time
        </span>
      </div>

      {/* Stacked Bar */}
      <div className="h-3 rounded overflow-hidden flex mb-1">
        <div
          className="h-full transition-all duration-500 ease-out flex items-center justify-center"
          style={{
            width: `${coordination}%`,
            backgroundColor: "hsl(0 70% 50%)",
          }}
        >
          {coordination >= 25 && (
            <span className="text-[7px] font-semibold text-white">{coordination}%</span>
          )}
        </div>
        <div
          className="h-full transition-all duration-500 ease-out flex items-center justify-center"
          style={{
            width: `${administration}%`,
            backgroundColor: "hsl(199 89% 48%)",
          }}
        >
          {administration >= 25 && (
            <span className="text-[7px] font-semibold text-white">{administration}%</span>
          )}
        </div>
        <div
          className="h-full transition-all duration-500 ease-out flex items-center justify-center"
          style={{
            width: `${improvement}%`,
            backgroundColor: "hsl(173 80% 40%)",
          }}
        >
          {improvement >= 25 && (
            <span className="text-[7px] font-semibold text-white">{improvement}%</span>
          )}
        </div>
      </div>

      {/* Legend - Inline */}
      <div className="flex flex-wrap gap-1.5 text-[7px]">
        <div className="flex items-center gap-0.5">
          <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: "hsl(0 70% 50%)" }} />
          <span className="text-muted-foreground">Coord</span>
          <span className="font-semibold text-foreground">{coordination}%</span>
        </div>
        <div className="flex items-center gap-0.5">
          <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: "hsl(199 89% 48%)" }} />
          <span className="text-muted-foreground">Admin</span>
          <span className="font-semibold text-foreground">{administration}%</span>
        </div>
        <div className="flex items-center gap-0.5">
          <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: "hsl(173 80% 40%)" }} />
          <span className="text-muted-foreground">Improve</span>
          <span className="font-semibold text-foreground">{improvement}%</span>
        </div>
      </div>
    </div>
  );
};

export default TimeAllocationBar;
