import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, ShieldAlert, Activity, Search, Database, Cog, DollarSign, Shield } from "lucide-react";

const outcomes = [
  { icon: Clock, label: "Reduced Delays", description: "Pattern detection identifies operational risks before they cascade into delays", color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { icon: ShieldAlert, label: "Fewer Damages", description: "Proactive hazard detection prevents incidents that lead to equipment and asset damage", color: "text-red-400", bgColor: "bg-red-500/10" },
  { icon: Shield, label: "Fewer Injuries", description: "Early warning indicators and control monitoring reduce workplace injuries across ground and cabin ops", color: "text-amber-400", bgColor: "bg-amber-500/10" },
  { icon: Activity, label: "Operational Reliability", description: "Continuous control monitoring strengthens dispatch reliability and schedule integrity", color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  { icon: Search, label: "Faster Investigations", description: "AI-enriched data reduces investigation time from weeks to hours across all report types", color: "text-violet-400", bgColor: "bg-violet-500/10" },
  { icon: Database, label: "Better Data Quality", description: "Automated enrichment, translation (60+ languages), and categorization across 4,000+ event types", color: "text-cyan-400", bgColor: "bg-cyan-500/10" },
  { icon: Cog, label: "Operational Efficiency", description: "Analysts focus on insights and decisions — 90%+ time saved on manual report processing", color: "text-orange-400", bgColor: "bg-orange-500/10" },
  { icon: DollarSign, label: "Revenue Protection", description: "Operational performance improvement directly protects revenue — fewer disruptions, smoother operations", color: "text-green-400", bgColor: "bg-green-500/10" },
];

const CASlide7BusinessOutcomes = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-business-outcomes" title="Business Outcomes" subtitle="How intelligence connects to measurable business value" slideNumber={7} {...props}>
      <div className="h-full flex flex-col gap-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 flex-1 content-center">
          {outcomes.map((item, i) => (
            <div key={i} className={`${item.bgColor} border border-border rounded-xl p-3 flex flex-col`}>
              <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
              <p className="text-xs font-bold text-foreground mb-1">{item.label}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
          <p className="text-[11px] text-foreground italic">
            "What took us an entire week to analyze reporting data now takes us a couple of hours."
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">— Head of Flight Operations, Major US Carrier (IATA Webinar)</p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide7BusinessOutcomes;
