import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { ShieldAlert, BookOpen, GraduationCap, HelpCircle, Sparkles } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const scenarios = [
  {
    icon: ShieldAlert,
    accent: "border-emerald-500/40 bg-emerald-500/5",
    chip: "text-emerald-300 bg-emerald-500/15 border-emerald-500/40",
    title: "Safety only",
    has: "Reports captured, investigations logged, recommendations written.",
    confined: "CoAnalyst answers safety questions on safety data. Insights surface patterns in reports. Automation routes & assigns within Safety. All confined to the safety lane — they can't reach procedures or crews.",
    broken: "Recommendations vanish into someone else's backlog. No procedure update. No targeted retraining. No proof the behaviour changed.",
    questions: [
      "When a recurring safety signal lands today, how does it actually change a procedure?",
      "If a recommendation requires retraining, how is the right crew identified — and how do you prove they did it?",
      "How long between a safety event and an auditor being able to see the closed loop?",
    ],
    leftOnTable: "~40% of recurrent issues stay recurrent because Trigger → Orchestrate is broken.",
  },
  {
    icon: BookOpen,
    accent: "border-amber-500/40 bg-amber-500/5",
    chip: "text-amber-300 bg-amber-500/15 border-amber-500/40",
    title: "Content only",
    has: "Procedural source of truth, version control, regulator traceability, mobile distribution.",
    confined: "CoAnalyst answers procedural & regulatory questions. Insights surface content gaps and version drift. Automation handles distribution & acknowledgement. All confined to the content lane — no signal layer feeding it, no training loop closing behind it.",
    broken: "Content updates aren't driven by signals — they're driven by calendars and complaints. No closed-loop training when a procedure changes.",
    questions: [
      "What triggers a procedure change today — is it ever an operational signal, or always a regulator or incident?",
      "When a manual changes, how do you confirm every affected crew has been retrained, not just notified?",
      "How do you prove a content change reduced the issue it was written to fix?",
    ],
    leftOnTable: "Content stays a publishing system instead of becoming the procedural backbone of DTOP.",
  },
  {
    icon: GraduationCap,
    accent: "border-violet-500/40 bg-violet-500/5",
    chip: "text-violet-300 bg-violet-500/15 border-violet-500/40",
    title: "Training only",
    has: "Records, completions, recurrent training cycles, evidence of qualification.",
    confined: "CoAnalyst answers competency & qualification questions. Insights surface training gaps and risk concentrations. Automation handles assignment & reminders. All confined to the training lane — disconnected from the procedures and signals that should drive what's trained.",
    broken: "Training is calendar-driven, not signal-driven. High-risk crews get the same module as low-risk crews. No link to the procedure or signal that justified the training.",
    questions: [
      "What % of training spend is calendar-driven versus signal-driven today?",
      "When a procedure changes, how is targeted retraining assigned — and to whom?",
      "Can you show a regulator the operational signal behind a specific training assignment?",
    ],
    leftOnTable: "Training stays a compliance cost centre instead of becoming a controllable risk lever.",
  },
];

const SEFootprintSingleApp = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-footprint-single"
    slideNumber={slideNumber}
    title="They have ONE app — sell the missing loop"
    subtitle="A single app captures value — and platform capabilities work on it — but everything stays confined to one lane until the foundation widens."
    showHeader
    {...narrationProps}
  >
    <div className="h-full grid grid-cols-3 gap-3 max-w-7xl mx-auto px-4 pt-2">
      {scenarios.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.title} className={`rounded-lg border ${s.accent} p-3 flex flex-col gap-2`}>
            <div className="flex items-center gap-2">
              <div className={`px-2 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wider ${s.chip}`}>
                <Icon className="h-3 w-3 inline mr-1" />
                {s.title}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Value captured today</div>
              <p className="text-xs text-foreground leading-snug">{s.has}</p>
            </div>
            <div className="rounded border border-primary/30 bg-primary/5 p-2">
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary mb-0.5">
                <Sparkles className="h-3 w-3" />
                Platform capabilities — confined to this lane
              </div>
              <p className="text-[11px] text-foreground leading-snug">{s.confined}</p>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-rose-400 mb-0.5">Loop that won't close</div>
              <p className="text-xs text-foreground leading-snug">{s.broken}</p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary mb-1">
                <HelpCircle className="h-3 w-3" />
                Discovery questions
              </div>
              <ul className="space-y-1">
                {s.questions.map((q, i) => (
                  <li key={i} className="text-[11px] text-foreground italic leading-snug">"{q}"</li>
                ))}
              </ul>
            </div>
            <div className="mt-auto rounded border border-rose-500/30 bg-rose-500/10 p-2">
              <div className="text-[10px] uppercase tracking-wider text-rose-300 mb-0.5">Left on the table</div>
              <p className="text-[11px] text-foreground leading-snug">{s.leftOnTable}</p>
            </div>
          </div>
        );
      })}
    </div>
  </PitchSlideContainer>
);

export default SEFootprintSingleApp;