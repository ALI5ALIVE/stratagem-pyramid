import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, ShieldAlert, Wrench, Activity, Search, Database, Cog, DollarSign } from "lucide-react";

const outcomes = [
  { icon: Clock, label: "Reduced Delays", description: "Pattern detection identifies operational risks before they cascade into delays", color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { icon: ShieldAlert, label: "Fewer Damages", description: "Proactive hazard detection prevents incidents that lead to equipment and asset damage", color: "text-red-400", bgColor: "bg-red-500/10" },
  { icon: ShieldAlert, label: "Fewer Injuries", description: "Early warning indicators and control monitoring reduce workplace injuries", color: "text-amber-400", bgColor: "bg-amber-500/10" },
  { icon: Activity, label: "Operational Reliability", description: "Continuous control monitoring strengthens dispatch reliability and schedule integrity", color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  { icon: Search, label: "Faster Investigations", description: "AI-enriched data reduces investigation time from days to hours", color: "text-violet-400", bgColor: "bg-violet-500/10" },
  { icon: Database, label: "Better Data Quality", description: "Automated enrichment, translation, and categorization improve data consistency and completeness", color: "text-cyan-400", bgColor: "bg-cyan-500/10" },
  { icon: Cog, label: "Operational Efficiency", description: "Analysts focus on insights and decisions rather than manual data processing", color: "text-orange-400", bgColor: "bg-orange-500/10" },
  { icon: DollarSign, label: "Revenue Protection", description: "Operational performance improvement directly protects revenue and reduces costs", color: "text-green-400", bgColor: "bg-green-500/10" },
];

const CASlide7BusinessOutcomes = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-business-outcomes" title="Business Outcomes" subtitle="How intelligence connects to measurable business value" slideNumber={7} {...props}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 h-full content-center">
        {outcomes.map((item, i) => (
          <div key={i} className={`${item.bgColor} border border-border rounded-xl p-4 flex flex-col`}>
            <item.icon className={`w-6 h-6 ${item.color} mb-3`} />
            <p className="text-sm font-bold text-foreground mb-1">{item.label}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default CASlide7BusinessOutcomes;
