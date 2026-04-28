import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Rocket, Target, Eye } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const phases = [
  {
    icon: Target, phase: "H1 2026", label: "In Production & Quick Wins", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30",
    items: [
      "✅ Link Training Modules to Documents (Operational Data Foundation)",
      "✅ Regulation Database Replatforming POC (Operational Data Foundation)",
      "✅ Automation POC (Intelligence & Orchestration Layer)",
      "✅ Platform-wide Insights & Recommendations POC (Intelligence & Orchestration Layer)",
      "🔄 Regulation Database integration with ContentManager365 (Operational Data Foundation)",
      "🔄 All-in-One Mobile Experience — Phase 1: Training screens in the Comply iOS Mobile app (Unified Mobile Experience)",
    ],
  },
  {
    icon: Rocket, phase: "H2 2026", label: "Connected Operations", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30",
    items: [
      "🔄 Standardise UI Fonts & Colors (Unified Web Experience)",
      "🔄 Regulation Database Replatforming (Operational Data Foundation)",
      "🔄 All-in-One Mobile Experience — Phase 2: Safety Reporting in the Comply iOS Mobile app (Unified Mobile Experience)",
      "📋 Platform-wide Business Intelligence POC (Intelligence & Orchestration Layer)",
      "📋 Next-Phase Regulation Management Integration — sync compliance mappings, TM365 integration, automation triggers (Operational Data Foundation)",
      "📋 Roll-out of Platform-wide Automation engine (Intelligence & Orchestration Layer)",
    ],
  },
  {
    icon: Eye, phase: "2027 and Beyond", label: "Intelligent Operations", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30",
    items: [
      "Roll out of Platform-wide Business Intelligence (Intelligence & Orchestration Layer)",
      "All-in-One Mobile Experience — Phase 3: Unified Experience across OCM, Training & Safety",
      "Contextual Document Viewing from TrainingManager365 (Operational Data Foundation)",
      "Roll out of Platform-wide Insights & Recommendations (Intelligence & Orchestration Layer) — Future Vision",
      "Continued roll-out of Platform-wide Automation capability (more connectors, more conditions, more actions)",
      "Future Platform PoCs — to be defined with customer input",
    ],
  },
];

const STATUS_PREFIXES = ["✅", "🔄", "📋"];
const getStatusMeta = (item: string) => {
  const prefix = STATUS_PREFIXES.find((p) => item.startsWith(p));
  if (!prefix) return { prefix: null as string | null, rest: item };
  return { prefix, rest: item.slice(prefix.length).trimStart() };
};

const TechSlide15Roadmap2026 = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-15" title="2026 Use Case Roadmap" subtitle="Phased delivery — each phase builds on proven value, layering capability without disrupting operations" slideNumber={slideNumber} {...narrationProps}>
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
              {p.items.map((item) => {
                const { prefix, rest } = getStatusMeta(item);
                return (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    {prefix ? (
                      <span className="mt-0.5 shrink-0 text-base leading-none">{prefix}</span>
                    ) : (
                      <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${p.color.replace("text-", "bg-")}/60`} />
                    )}
                    <span>{rest}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl border border-border/40 bg-muted/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 shrink-0">
        <span className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="text-base leading-none">✅</span> Done</span>
        <span className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="text-base leading-none">🔄</span> In Progress</span>
        <span className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="text-base leading-none">📋</span> Planned</span>
        <span className="text-xs text-muted-foreground/70">· Specific deliverables refined during discovery</span>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide15Roadmap2026;
