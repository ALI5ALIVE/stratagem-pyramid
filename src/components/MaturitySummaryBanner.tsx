import { TrendingUp, Shield, Clock, Users, Trophy } from "lucide-react";

const summaryItems = [
  {
    icon: Shield,
    text: "Disruption becomes more preventable",
    color: "hsl(0 70% 50%)",
  },
  {
    icon: Clock,
    text: "Operational change becomes faster and more controlled",
    color: "hsl(199 89% 48%)",
  },
  {
    icon: TrendingUp,
    text: "Readiness becomes provable",
    color: "hsl(173 80% 40%)",
  },
  {
    icon: Users,
    text: "People spend less time coordinating, more time improving",
    color: "hsl(280 65% 55%)",
  },
  {
    icon: Trophy,
    text: "Reliability becomes a competitive advantage",
    color: "hsl(45 93% 58%)",
  },
];

const MaturitySummaryBanner = () => {
  return (
    <div className="bg-card/50 rounded-xl border border-border/30 p-5">
      <h3 className="text-sm font-display font-semibold text-foreground mb-4 text-center">
        What Changes as Customers Move Up the Curve
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {summaryItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-2.5 p-3 rounded-lg transition-all duration-300 hover:bg-card/80"
              style={{
                background: `linear-gradient(135deg, ${item.color}08 0%, transparent 100%)`,
                borderLeft: `2px solid ${item.color}40`,
              }}
            >
              <Icon
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: item.color }}
              />
              <span className="text-[11px] text-foreground/90 leading-relaxed font-medium">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaturitySummaryBanner;
