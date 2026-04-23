import { FileText, Shield, GraduationCap, Sparkles } from "lucide-react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import ArchitectureLayerBadge from "@/components/tech-slides/ArchitectureLayerBadge";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const modules = [
  {
    name: "ContentManager365",
    sub: "+ CoAuthor",
    icon: FileText,
    sublayer: "content" as const,
    accent: {
      text: "text-blue-400",
      border: "border-blue-500/30",
      bg: "bg-blue-500/5",
      bgStrong: "bg-blue-500/10",
      bullet: "bg-blue-400",
    },
    tagline: "Next-Gen Operational Content Management",
    bullets: [
      "Procedure authoring & version control",
      "Revision cascades across manuals & SOPs",
      "Regulatory change impact mapping",
    ],
    aiLine: "CoAuthor turns every regulatory change into a ready-to-review revision",
  },
  {
    name: "SafetyManager365",
    sub: "",
    icon: Shield,
    sublayer: "safety" as const,
    accent: {
      text: "text-red-400",
      border: "border-red-500/30",
      bg: "bg-red-500/5",
      bgStrong: "bg-red-500/10",
      bullet: "bg-red-400",
    },
    tagline: "Advanced Safety, Quality & Risk Management",
    bullets: [
      "SMS event reporting & investigation workflows",
      "Hazard register & quantitative risk assessment",
      "Audit management with corrective actions",
    ],
    aiLine: "Every safety signal becomes a connected data point — not an isolated report",
  },
  {
    name: "TrainingManager365",
    sub: "+ CoTrainer",
    icon: GraduationCap,
    sublayer: "training" as const,
    accent: {
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/5",
      bgStrong: "bg-emerald-500/10",
      bullet: "bg-emerald-400",
    },
    tagline: "Competency-Driven Workforce Readiness",
    bullets: [
      "Competency-based training & targeted assignments",
      "Recurrent automation with compliance monitoring",
      "Gap analysis across fleet, base, and individuals",
    ],
    aiLine: "CoTrainer transforms every training session into a data-enriched learning event",
  },
];

const ExecCoreAppsSummary = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="exec3-slide-core-modules"
    title="Layer 1 · The Three Core Operational Apps"
    subtitle="Best-in-class apps for Content, Safety and Training — built on a single, shared operational data foundation"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <ArchitectureLayerBadge active="core" className="mb-3" />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 items-stretch">
      {modules.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.name}
            className={`rounded-xl border ${m.accent.border} ${m.accent.bg} p-4 flex flex-col h-full`}
          >
            <div className="flex items-center gap-3 mb-3 shrink-0">
              <div className={`w-10 h-10 rounded-lg ${m.accent.bgStrong} border ${m.accent.border} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${m.accent.text}`} />
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold text-foreground leading-tight">
                  {m.name}
                  {m.sub && <span className={`ml-1 text-sm font-semibold ${m.accent.text}`}>{m.sub}</span>}
                </p>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5">{m.tagline}</p>
              </div>
            </div>

            <ul className="space-y-2 flex-1">
              {m.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${m.accent.bullet} mt-1.5 shrink-0`} />
                  <span className="text-sm text-foreground leading-snug">{b}</span>
                </li>
              ))}
            </ul>

            <div className={`mt-3 pt-3 border-t ${m.accent.border} flex items-start gap-2 shrink-0`}>
              <Sparkles className={`w-3.5 h-3.5 ${m.accent.text} mt-0.5 shrink-0`} />
              <p className="text-xs text-muted-foreground italic leading-snug">{m.aiLine}</p>
            </div>
          </div>
        );
      })}
    </div>

    <p className="text-sm text-center text-muted-foreground mt-4 shrink-0">
      Three best-in-class apps on <span className="text-foreground font-semibold">one shared data foundation</span> — the table stakes done right, so every layer above can do something new.
    </p>
  </SalesSlideContainer>
);

export default ExecCoreAppsSummary;
