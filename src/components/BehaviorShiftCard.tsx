import { ArrowRight, Flame, Target, ClipboardList, TrendingUp, Building2, Link, Clock, Sparkles, Users } from "lucide-react";

export interface BehavioralShift {
  from: string;
  to: string;
  culturalMarker: string;
}

interface BehaviorShiftCardProps {
  behavioralShift: BehavioralShift;
  accentColor: string;
  level: number;
}

const getIcons = (level: number) => {
  switch (level) {
    case 1:
      return { from: Clock, to: Sparkles };
    case 2:
      return { from: ClipboardList, to: TrendingUp };
    case 3:
      return { from: Building2, to: Link };
    case 4:
      return { from: Users, to: Building2 };
    case 5:
      return { from: Flame, to: Target };
    default:
      return { from: Flame, to: Target };
  }
};

const BehaviorShiftCard = ({ behavioralShift, accentColor, level }: BehaviorShiftCardProps) => {
  const { from: FromIcon, to: ToIcon } = getIcons(level);

  // Guard against undefined behavioralShift
  if (!behavioralShift) {
    return null;
  }

  return (
    <div
      className="relative p-4 rounded-lg border transition-all duration-300 mb-4"
      style={{
        borderColor: `${accentColor}30`,
        background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)`,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-3.5 h-3.5" style={{ color: accentColor }} />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          How Work Changes
        </span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        {/* FROM */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <FromIcon className="w-3 h-3 text-muted-foreground" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              From
            </span>
          </div>
          <p className="text-xs text-foreground/70 leading-relaxed">
            {behavioralShift.from}
          </p>
        </div>

        {/* Arrow */}
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center animate-pulse"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <ArrowRight className="w-3.5 h-3.5" style={{ color: accentColor }} />
        </div>

        {/* TO */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <ToIcon className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: accentColor }}>
              To
            </span>
          </div>
          <p className="text-xs text-foreground font-medium leading-relaxed">
            {behavioralShift.to}
          </p>
        </div>
      </div>

      {/* Cultural Marker */}
      <div
        className="p-2.5 rounded-md border-l-2"
        style={{
          borderColor: accentColor,
          backgroundColor: `${accentColor}08`,
        }}
      >
        <p className="text-xs italic text-foreground/80">
          "{behavioralShift.culturalMarker}"
        </p>
      </div>
    </div>
  );
};

export default BehaviorShiftCard;
