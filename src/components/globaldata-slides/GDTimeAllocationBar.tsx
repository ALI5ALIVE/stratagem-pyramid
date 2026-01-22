import { Clock } from "lucide-react";

export interface GDTimeAllocation {
  reconciliation: number;
  analysis: number;
  strategic: number;
}

interface GDTimeAllocationBarProps {
  timeAllocation: GDTimeAllocation;
  accentColor: string;
}

const GDTimeAllocationBar = ({ timeAllocation, accentColor }: GDTimeAllocationBarProps) => {
  if (!timeAllocation) {
    return null;
  }

  const { reconciliation, analysis, strategic } = timeAllocation;

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
            width: `${reconciliation}%`,
            backgroundColor: "hsl(0 70% 50%)",
          }}
        >
          {reconciliation >= 20 && (
            <span className="text-[7px] font-semibold text-white">{reconciliation}%</span>
          )}
        </div>
        <div
          className="h-full transition-all duration-500 ease-out flex items-center justify-center"
          style={{
            width: `${analysis}%`,
            backgroundColor: "hsl(199 89% 48%)",
          }}
        >
          {analysis >= 20 && (
            <span className="text-[7px] font-semibold text-white">{analysis}%</span>
          )}
        </div>
        <div
          className="h-full transition-all duration-500 ease-out flex items-center justify-center"
          style={{
            width: `${strategic}%`,
            backgroundColor: "hsl(173 80% 40%)",
          }}
        >
          {strategic >= 20 && (
            <span className="text-[7px] font-semibold text-white">{strategic}%</span>
          )}
        </div>
      </div>

      {/* Legend - Inline */}
      <div className="flex flex-wrap gap-1.5 text-[7px]">
        <div className="flex items-center gap-0.5">
          <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: "hsl(0 70% 50%)" }} />
          <span className="text-muted-foreground">Reconcile</span>
          <span className="font-semibold text-foreground">{reconciliation}%</span>
        </div>
        <div className="flex items-center gap-0.5">
          <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: "hsl(199 89% 48%)" }} />
          <span className="text-muted-foreground">Analysis</span>
          <span className="font-semibold text-foreground">{analysis}%</span>
        </div>
        <div className="flex items-center gap-0.5">
          <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: "hsl(173 80% 40%)" }} />
          <span className="text-muted-foreground">Strategic</span>
          <span className="font-semibold text-foreground">{strategic}%</span>
        </div>
      </div>
    </div>
  );
};

export default GDTimeAllocationBar;
