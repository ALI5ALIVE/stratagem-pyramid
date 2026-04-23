import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Rocket, Target, Eye } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const phases = [
  {
    icon: Target, phase: "H1 2026", label: "In Production & Quick Wins", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30",
    items: [
      "✅ Regulation Database Integration with ContentManager365",
      "✅ ContentManager365 to TrainingManager365 Integration",
      "Safety report auto-categorisation",
      "Audit evidence package generation",
    ],
  },
  {
    icon: Rocket, phase: "H2 2026", label: "Connected Operations", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30",
    items: [
      "Safety Report Submissions within ContentManager365",
      "UI Unification across all solutions",
      "Platform PoCs with early adopter airlines",
      "Proactive pattern detection (smoke & fumes, fatigue)",
      "Executive outcome dashboards",
    ],
  },
  {
    icon: Eye, phase: "2027+", label: "Intelligent Operations", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30",
    items: [
      "Predictive risk modelling across fleet",
      "Full platform use-case coverage",
      "Insurance portfolio evidence automation",
      "Industry benchmarking and peer comparison",
    ],
  },
];

const TechSlide15Roadmap2026 = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-15" title="2026 Use Case Roadmap [Pending refresh]" subtitle="Phased delivery — each phase builds on proven value · revisit with Paul: refresh with latest Regulation Solution, Automation, Intelligence & CoAnalyst content" slideNumber={slideNumber} {...narrationProps}>
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0 auto-rows-fr items-stretch">
        {phases.map((p) => (
          <div key={p.phase} className={`rounded-xl border ${p.border} ${p.bg} p-4 flex flex-col h-full`}>
            <div className="flex items-center gap-3 mb-3 shrink-0">
              <p.icon className={`h-6 w-6 ${p.color}`} />
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{p.phase}</span>
                <h3 className={`text-base font-bold ${p.color}`}>{p.label}</h3>
              </div>
            </div>
            <ul className="space-y-2 flex-1 flex flex-col justify-center">
              {p.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  {item.startsWith("✅") ? (
                    <span className="mt-0.5 shrink-0">{item.slice(0, 2)}</span>
                  ) : (
                    <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${p.color.replace("text-", "bg-")}/60`} />
                  )}
                  {item.startsWith("✅") ? item.slice(3) : item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-center shrink-0">
        <p className="text-xs text-muted-foreground"><span className="text-amber-400 font-semibold">Note:</span> Roadmap content is illustrative — specific deliverables to be defined during the discovery workshop based on your operational priorities.</p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide15Roadmap2026;
