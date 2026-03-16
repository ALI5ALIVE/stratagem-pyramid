import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { FileText, Shield, Brain, TrendingUp, Zap } from "lucide-react";

const pillars = [
  {
    icon: FileText,
    title: "From Reporting to Intelligence",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    points: [
      "Reports capture what happened — intelligence reveals what it means",
      "AI-enriched data quality: summarization, translation, categorization",
      "Cross-report pattern recognition at scale",
    ],
  },
  {
    icon: Shield,
    title: "From Events to Controls",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    points: [
      "Shift from investigating events to monitoring control effectiveness",
      "Identify weakening controls before failures occur",
      "Continuous risk posture visibility across domains",
    ],
  },
  {
    icon: Brain,
    title: "Aviation-Trained Intelligence",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    points: [
      "Models trained on millions of historic aviation reports",
      "Precision across thousands of aviation event categories",
      "Lower hallucination risk than generic LLM alternatives",
    ],
  },
  {
    icon: TrendingUp,
    title: "Operational Performance Impact",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    points: [
      "Intelligence that connects to business outcomes",
      "Fewer delays, damages, injuries — stronger reliability",
      "Revenue protection through performance improvement",
    ],
  },
  {
    icon: Zap,
    title: "Scalable Precision",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    points: [
      "Analyze data across safety, ops, maintenance, training, crew",
      "60+ language translation and enrichment",
      "Four intelligence levels: historical, real-time, proactive, predictive",
    ],
  },
];

const CASlide5MessagingArchitecture = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-messaging-architecture" title="Messaging Architecture" subtitle="Master message and five core pillars" slideNumber={5} {...props}>
      <div className="h-full flex flex-col gap-4">
        {/* Master message */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
          <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Master Message</p>
          <p className="text-xl font-display font-bold text-foreground">From Reports to Intelligence. From Events to Control.</p>
        </div>

        {/* 5 pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 flex-1">
          {pillars.map((pillar, i) => (
            <div key={i} className={`${pillar.bgColor} ${pillar.borderColor} border rounded-xl p-4 flex flex-col`}>
              <div className="flex items-center gap-2 mb-3">
                <pillar.icon className={`w-4 h-4 ${pillar.color}`} />
                <h4 className="text-xs font-bold text-foreground leading-tight">{pillar.title}</h4>
              </div>
              <ul className="space-y-2 mt-auto">
                {pillar.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2 text-[11px] text-muted-foreground leading-snug">
                    <span className={`w-1 h-1 rounded-full ${pillar.color.replace("text-", "bg-")} mt-1 shrink-0`} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide5MessagingArchitecture;
