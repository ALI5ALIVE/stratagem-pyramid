import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Rocket, Target, Eye } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const phases = [
  {
    icon: Target, phase: "H1 2026", label: "Quick Wins", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30",
    items: ["DG incident reduction pipeline", "Regulatory change cascade automation", "Safety report auto-categorisation (CoAnalyst)", "Audit evidence package generation"],
  },
  {
    icon: Rocket, phase: "H2 2026", label: "Connected Operations", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30",
    items: ["Cross-module DTOP pipeline for top 4 use cases", "CoAnalyst proactive pattern detection (smoke & fumes, fatigue)", "Integrated training-to-safety feedback loop", "Executive outcome dashboards"],
  },
  {
    icon: Eye, phase: "2027+", label: "Intelligent Operations", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30",
    items: ["Predictive risk modelling across fleet", "Full 8-use-case platform coverage", "Insurance portfolio evidence automation", "Industry benchmarking and peer comparison"],
  },
];

const TechSlide15Roadmap2026 = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-15" title="2026 Use Case Roadmap" subtitle="Phased delivery — each phase builds on proven value" slideNumber={slideNumber} {...narrationProps}>
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        {phases.map((p) => (
          <div key={p.phase} className={`rounded-xl border ${p.border} ${p.bg} p-5 flex flex-col`}>
            <div className="flex items-center gap-3 mb-3">
              <p.icon className={`h-6 w-6 ${p.color}`} />
              <div>
                <span className="text-[10px] text-muted-foreground">{p.phase}</span>
                <h3 className={`text-base font-bold ${p.color}`}>{p.label}</h3>
              </div>
            </div>
            <ul className="space-y-2 flex-1">
              {p.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${p.color.replace("text-", "bg-")}/60`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 text-center">
        <p className="text-xs text-muted-foreground"><span className="text-amber-400 font-semibold">Note:</span> Roadmap content is illustrative — specific deliverables to be defined during the discovery workshop based on your operational priorities.</p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide15Roadmap2026;
