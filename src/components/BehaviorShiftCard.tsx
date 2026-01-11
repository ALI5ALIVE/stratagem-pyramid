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
      className="relative p-2 rounded border transition-all duration-300 mb-2"
      style={{
        borderColor: `${accentColor}30`,
        background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Users className="w-2.5 h-2.5" style={{ color: accentColor }} />
        <span className="text-[8px] font-semibold uppercase tracking-widest text-muted-foreground">
          How Work Changes
        </span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        {/* FROM */}
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <FromIcon className="w-2 h-2 text-muted-foreground" />
            </div>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
              From
            </span>
          </div>
          <p className="text-[9px] text-foreground/70 leading-relaxed">
            {behavioralShift.from}
          </p>
        </div>

        {/* Arrow */}
        <div
          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center animate-pulse"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <ArrowRight className="w-2.5 h-2.5" style={{ color: accentColor }} />
        </div>

        {/* TO */}
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <ToIcon className="w-2 h-2 text-primary-foreground" />
            </div>
            <span className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: accentColor }}>
              To
            </span>
          </div>
          <p className="text-[9px] text-foreground font-medium leading-relaxed">
            {behavioralShift.to}
          </p>
        </div>
      </div>

      {/* Cultural Marker */}
      <div
        className="p-1.5 rounded border-l-2"
        style={{
          borderColor: accentColor,
          backgroundColor: `${accentColor}08`,
        }}
      >
        <p className="text-[9px] italic text-foreground/80">
          "{behavioralShift.culturalMarker}"
        </p>
      </div>
    </div>
  );
};

export default BehaviorShiftCard;
