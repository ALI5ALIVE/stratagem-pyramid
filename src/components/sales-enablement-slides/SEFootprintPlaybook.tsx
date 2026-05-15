import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Search, AlertCircle, Target } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const moves = [
  {
    icon: Search,
    n: "01",
    title: "Audit the footprint in discovery",
    color: "border-sky-500/40 bg-sky-500/10 text-sky-300",
    body: "Before you pitch anything, find out which of S, C, T they own — and which loop is therefore broken.",
    questions: [
      "Which of safety, content, and training run on Comply365 today?",
      "When something changes in one, what makes it ripple to the others?",
      "Where does proof of the change reaching the crew currently live?",
    ],
  },
  {
    icon: AlertCircle,
    n: "02",
    title: "Name the broken loop out loud",
    color: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    body: "Use their own words from move 01. Draw the half-loop on a whiteboard. Show them where it stops — and what 'stops' costs.",
    questions: [
      "So today, when a safety signal lands, the loop stops at the procedure — is that fair?",
      "What does that gap cost you in repeat events / audit prep / training rework?",
      "Who owns closing that gap today — and how is it measured?",
    ],
  },
  {
    icon: Target,
    n: "03",
    title: "Anchor the next purchase to the loop, not the product",
    color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    body: "Never sell 'TrainingManager365.' Sell 'the app that closes Orchestrate so your safety signals actually change behaviour.' Loop language beats SKU language every time.",
    questions: [
      "If we closed that loop in 90 days, what would it be worth to you?",
      "Who else needs to be in the room to scope a focused walkthrough on that specific loop?",
      "Can we book 20 minutes with your safety lead and your training lead together?",
    ],
  },
];

const SEFootprintPlaybook = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-footprint-playbook"
    slideNumber={slideNumber}
    title="The 3-move footprint play"
    subtitle="Audit the footprint. Name the broken loop. Anchor the next purchase to closing it. Run this in every account, every quarter."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-3 max-w-7xl mx-auto px-4 pt-2">
      {moves.map((m) => {
        const Icon = m.icon;
        return (
          <div key={m.n} className={`rounded-lg border ${m.color} p-3 grid grid-cols-12 gap-3`}>
            <div className="col-span-1 flex items-start">
              <div className="text-xl font-bold opacity-70">{m.n}</div>
            </div>
            <div className="col-span-5">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-4 w-4" />
                <span className="text-xs font-semibold">{m.title}</span>
              </div>
              <p className="text-xs text-foreground leading-snug">{m.body}</p>
            </div>
            <div className="col-span-6 border-l border-border/40 pl-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Questions to ask</div>
              <ul className="space-y-1">
                {m.questions.map((q, i) => (
                  <li key={i} className="text-[11px] italic text-foreground leading-snug">"{q}"</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}

      <div className="rounded-lg border border-primary/40 bg-primary/10 p-3">
        <div className="text-[10px] uppercase tracking-wider text-primary mb-1">Mini role-play</div>
        <p className="text-xs text-foreground">
          Pair up. One rep is a customer who owns SafetyManager365 + ContentManager365. The other has 90 seconds to run all three moves and book the walkthrough. Swap. Repeat with a different footprint. Then take it into Practice Center.
        </p>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEFootprintPlaybook;