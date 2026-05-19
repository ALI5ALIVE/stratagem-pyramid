import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { TrendingUp, BookOpen, ShieldCheck, Sparkles } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const dtopChip = (label: string, color: string) => (
  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${color}`}>
    {label}
  </span>
);

const cards = [
  {
    icon: TrendingUp,
    color: "text-blue-400",
    border: "border-blue-500/30 bg-blue-500/5",
    question: "\"Show me a correlation between recent safety trends and training deficiencies.\"",
    answer:
      "Joins safety occurrences with competency and recurrency records, surfacing where rising hazard reports overlap with overdue or under-performing training.",
    dtop: [
      { label: "Detect", color: "border-blue-500/40 bg-blue-500/10 text-blue-300" },
      { label: "Prove", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
    ],
  },
  {
    icon: BookOpen,
    color: "text-violet-400",
    border: "border-violet-500/30 bg-violet-500/5",
    question:
      "\"How are we performing with the recent updates to the Dangerous Goods manual? Has the resulting training led to fewer incidents?\"",
    answer:
      "Traces a procedure revision through training assignments and back into safety occurrence trends — closing the loop from content change to operational outcome.",
    dtop: [
      { label: "Trigger", color: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
      { label: "Orchestrate", color: "border-violet-500/40 bg-violet-500/10 text-violet-300" },
      { label: "Prove", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
    ],
  },
  {
    icon: ShieldCheck,
    color: "text-emerald-400",
    border: "border-emerald-500/30 bg-emerald-500/5",
    question: "\"Are we ready for the upcoming Part 145 audit?\"",
    answer:
      "Cross-references audit scope against open findings, procedure currency, training compliance and recent safety signals — flagging the gaps and recommending the actions to close them in time.",
    dtop: [
      { label: "Detect", color: "border-blue-500/40 bg-blue-500/10 text-blue-300" },
      { label: "Orchestrate", color: "border-violet-500/40 bg-violet-500/10 text-violet-300" },
      { label: "Prove", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
    ],
  },
];

const SEPlatformWideIntelligenceUseCases = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-platform-wide-intelligence-usecases"
    slideNumber={slideNumber}
    title="Intelligence & Insights — Platform-Wide Use Cases"
    subtitle="Three questions only the platform layer can answer."
    {...narrationProps}
  >
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 flex items-start gap-2">
        <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-foreground/90 leading-relaxed">
          Cross-domain answers that no single Core App can deliver — they require the unified
          operational data substrate plus the intelligence layer on top.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className={`rounded-xl border ${c.border} p-4 flex flex-col gap-3`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-muted-foreground">0{i + 1}</span>
                <Icon className={`h-5 w-5 ${c.color}`} />
              </div>
              <p className={`text-base font-semibold ${c.color} leading-snug`}>{c.question}</p>
              <p className="text-xs text-foreground/80 leading-relaxed">{c.answer}</p>
              <div className="mt-auto pt-2 border-t border-border/40 flex flex-wrap gap-1.5">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground mr-1 self-center">DTOP:</span>
                {c.dtop.map((d) => (
                  <span key={d.label} className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${d.color}`}>
                    {d.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground text-center italic">
        Ask in plain English. Get cross-domain insight, evidence and recommended actions — in seconds.
      </p>
    </div>
  </PitchSlideContainer>
);

export default SEPlatformWideIntelligenceUseCases;