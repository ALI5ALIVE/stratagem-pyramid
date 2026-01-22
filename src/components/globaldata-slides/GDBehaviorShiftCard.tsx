import { ArrowRight, Clock, Sparkles, ClipboardList, TrendingUp, Building2, Link, Users, Flame, Target } from "lucide-react";

export interface GDBehavioralShift {
  from: string;
  to: string;
  culturalMarker: string;
}

interface GDBehaviorShiftCardProps {
  behavioralShift: GDBehavioralShift;
  accentColor: string;
  level: number;
}

// Icons mapped for inverted stages: Level 1 = Apex (PREDICTIVE), Level 5 = Base (FRAGMENTED)
const getIcons = (level: number) => {
  switch (level) {
    case 1: // PREDICTIVE (Apex)
      return { from: Clock, to: Sparkles };
    case 2: // OPERATIONAL
      return { from: ClipboardList, to: TrendingUp };
    case 3: // CONNECTED
      return { from: Building2, to: Link };
    case 4: // MANAGED
      return { from: Users, to: Building2 };
    case 5: // FRAGMENTED (Base)
      return { from: Flame, to: Target };
    default:
      return { from: Flame, to: Target };
  }
};

const GDBehaviorShiftCard = ({ behavioralShift, accentColor, level }: GDBehaviorShiftCardProps) => {
  const { from: FromIcon, to: ToIcon } = getIcons(level);

  if (!behavioralShift) {
    return null;
  }

  return (
    <div
      className="relative p-1.5 rounded border transition-all duration-300 mb-1"
      style={{
        borderColor: `${accentColor}30`,
        background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 100%)`,
      }}
    >
      <div className="flex items-center gap-1 mb-1">
        <Users className="w-2 h-2" style={{ color: accentColor }} />
        <span className="text-[7px] font-semibold uppercase tracking-widest text-muted-foreground">
          How Work Changes
        </span>
      </div>

      <div className="flex items-center gap-1.5 mb-1">
        {/* FROM */}
        <div className="flex-1 flex items-center gap-1">
          <div
            className="w-3 h-3 rounded flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <FromIcon className="w-1.5 h-1.5 text-muted-foreground" />
          </div>
          <p className="text-[8px] text-foreground/70 leading-snug">
            {behavioralShift.from}
          </p>
        </div>

        {/* Arrow */}
        <div
          className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <ArrowRight className="w-2 h-2" style={{ color: accentColor }} />
        </div>

        {/* TO */}
        <div className="flex-1 flex items-center gap-1">
          <div
            className="w-3 h-3 rounded flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            <ToIcon className="w-1.5 h-1.5 text-primary-foreground" />
          </div>
          <p className="text-[8px] text-foreground font-medium leading-snug">
            {behavioralShift.to}
          </p>
        </div>
      </div>

      {/* Cultural Marker */}
      <div
        className="p-1 rounded border-l-2"
        style={{
          borderColor: accentColor,
          backgroundColor: `${accentColor}08`,
        }}
      >
        <p className="text-[8px] italic text-foreground/80">
          "{behavioralShift.culturalMarker}"
        </p>
      </div>
    </div>
  );
};

export default GDBehaviorShiftCard;
