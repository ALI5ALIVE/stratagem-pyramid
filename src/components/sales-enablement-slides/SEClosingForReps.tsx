import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Play, Users, Mic, FolderOpen, CheckCircle2 } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const blocks = [
  {
    icon: Play,
    accent: "text-sky-400 border-sky-500/40 bg-sky-500/10",
    title: "3 demos to watch",
    items: [
      "Executive Pitch 3 — full platform narrative",
      "DTOP Playbook — operating-model deep-dive",
      "CoAnalyst Playbook — intelligence layer",
    ],
  },
  {
    icon: Users,
    accent: "text-violet-400 border-violet-500/40 bg-violet-500/10",
    title: "2 calls to shadow",
    items: [
      "A discovery call with a Head of Safety",
      "A technical deep-dive with a CTO / IT Director",
    ],
  },
  {
    icon: Mic,
    accent: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    title: "1 practice scenario",
    items: [
      "Role-play: prospect says 'we already have an SMS'",
      "Use the Acknowledge → Reframe → Bridge pattern",
      "End by booking a 20-min DTOP walkthrough",
    ],
  },
  {
    icon: FolderOpen,
    accent: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    title: "Where to find collateral",
    items: [
      "Command Centre (home page) — every deck and playbook",
      "Persona Deep-Dive — messaging by stakeholder",
      "Line of Sight — interactive ROI calculator",
    ],
  },
];

const checklist = [
  "I can give the one-sentence platform pitch",
  "I can name the 5 layers and what each does in plain English",
  "I can run the DTOP loop on a whiteboard",
  "I can handle the 'we already have X' objection",
  "I know which deck to send for which persona",
];

const SEClosingForReps = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-closing"
    slideNumber={slideNumber}
    title="Your first 7 days"
    subtitle="A simple plan to go from 'just trained' to 'ready for a discovery call'."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-3 max-w-7xl mx-auto px-4 pt-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {blocks.map((b, i) => {
          const Icon = b.icon;
          return (
            <div key={i} className={`p-3 rounded-lg border ${b.accent} flex flex-col gap-2`}>
              <Icon className="h-5 w-5" />
              <h3 className="text-xs font-semibold text-foreground">{b.title}</h3>
              <ul className="space-y-1.5 mt-auto">
                {b.items.map((it, j) => (
                  <li key={j} className="text-[11px] text-foreground/80 leading-snug flex gap-1.5">
                    <span className="opacity-50">•</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
        <div className="text-[11px] uppercase tracking-wider text-primary font-semibold mb-2">Day-7 readiness checklist</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
          {checklist.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground italic text-center mt-2">
        You're not selling software. You're selling the first connected operating model in aviation.
      </p>
    </div>
  </PitchSlideContainer>
);

export default SEClosingForReps;