import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { ShieldAlert, BookOpen, Users, Radio, ClipboardCheck, HelpCircle } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const cases = [
  {
    icon: ShieldAlert,
    accent: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    name: "Safety signal → procedure update",
    plain:
      "A weak safety signal triggers a Intelligence Layer recommendation, the manual updates, and the change reaches the crew on next login.",
    question: "When a safety signal lands, how long until the relevant procedure actually changes?",
  },
  {
    icon: BookOpen,
    accent: "text-violet-400 border-violet-500/40 bg-violet-500/10",
    name: "Regulation change → targeted training",
    plain:
      "A new regulatory rule maps to affected procedures, generates a training module, and assigns it to the right crew — not the whole fleet.",
    question: "How do you trace a regulation change to the people who actually need retraining?",
  },
  {
    icon: Users,
    accent: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    name: "Fatigue trend → roster intervention",
    plain:
      "Operational data surfaces a fatigue pattern early; Intelligence Layer recommends roster adjustments before it becomes a safety event.",
    question: "What signals would you want to see before a fatigue trend turned into an incident?",
  },
  {
    icon: Radio,
    accent: "text-sky-400 border-sky-500/40 bg-sky-500/10",
    name: "Ops disruption → crew comms",
    plain:
      "A live disruption triggers targeted notifications and the right procedural content on the crew's mobile, not a broadcast email.",
    question: "How does today's irregular-ops comms reach the specific crews affected — and how do you prove they read it?",
  },
  {
    icon: ClipboardCheck,
    accent: "text-rose-400 border-rose-500/40 bg-rose-500/10",
    name: "Audit prep → continuous proof",
    plain:
      "Every loop is logged. Audit becomes a query, not a project — proof of control already exists.",
    question: "If a regulator asked for proof your last 5 safety actions closed the loop, how many people would that involve?",
  },
];

const SEUseCaseCheatSheet = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-usecase-cheatsheet"
    slideNumber={slideNumber}
    title="Use case cheat sheet"
    subtitle="Five plain-English use cases sellers should be able to surface — each with the discovery question that uncovers it."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-2 max-w-7xl mx-auto px-4 pt-3">
      {cases.map((c, i) => {
        const Icon = c.icon;
        return (
          <div key={i} className={`grid grid-cols-1 md:grid-cols-12 gap-3 p-3 rounded-lg border ${c.accent}`}>
            <div className="md:col-span-3 flex items-start gap-2">
              <Icon className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold">{c.name}</span>
            </div>
            <div className="md:col-span-5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Say this</div>
              <p className="text-xs text-foreground leading-relaxed">{c.plain}</p>
            </div>
            <div className="md:col-span-4 md:border-l md:border-border/40 md:pl-3">
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-foreground mb-0.5">
                <HelpCircle className="h-3 w-3" />
                <span>Discovery question</span>
              </div>
              <p className="text-xs text-foreground italic leading-relaxed">"{c.question}"</p>
            </div>
          </div>
        );
      })}
    </div>
  </PitchSlideContainer>
);

export default SEUseCaseCheatSheet;