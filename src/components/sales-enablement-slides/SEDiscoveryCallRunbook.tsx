import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Mic, Map as MapIcon, Search, ClipboardCheck, ArrowRight, Shield } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

type Block = {
  icon: typeof Mic;
  minutes: string;
  title: string;
  accent: string;
  do: string;
  say: string | string[];
  weight?: string;
};

const blocks: Block[] = [
  {
    icon: Mic,
    minutes: "0–2 min",
    title: "Open",
    accent: "border-sky-500/40 bg-sky-500/10 text-sky-300",
    do: "Camera on. Smile. Notebook visible. Do not share your screen yet.",
    say: [
      '"Thanks for the 30 minutes."',
      '"My goal is simple — by the end of this call you\'ll know whether what we do is actually relevant to the problems on your plate, even if the answer is no."',
      '"To get there I\'d like to ask a few questions before I show you anything. Fair?"',
      "→ Stop. Wait for the yes. Do not fill the silence.",
    ],
  },
  {
    icon: MapIcon,
    minutes: "2–10 min",
    title: "Frame",
    accent: "border-violet-500/40 bg-violet-500/10 text-violet-300",
    do: "Share one slide only — the DTOP loop. Point at Detect as you say it. No jargon: don't say 'closed-loop' or 'DTOP' out loud yet.",
    say: [
      '"By signal I just mean anything that should change what your team does next — a new reg, an audit finding, a safety event, an ops change. Could be one a week, could be ten a day."',
      '"Most operators we talk to are strong at spotting safety and compliance signals."',
      '"Where it usually breaks down is the middle bit — deciding what to change, getting that change into manuals and training, and then proving to a regulator it actually reached the crew."',
      '"Does that match what you see?"',
      "→ Stop sharing the slide. Listen.",
    ],
  },
  {
    icon: Search,
    minutes: "10–35 min",
    title: "Discover",
    weight: "55% of the call lives here",
    accent: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    do: "Screen off. Notebook open. Ask one question. Count to ten in your head before you speak again. Write down what they say verbatim.",
    say: [
      '"When a safety or compliance signal lands on your desk, what actually triggers a procedure or training change?"',
      "→ …wait. Don't fill the gap.",
      '"From that decision to the crew flying or operating the new version — how long, realistically?"',
      "→ …wait. Let them give you the real number, not the brochure number.",
      '"If an auditor walked in tomorrow and asked for evidence that your last five corrective actions reached the front line, how long would it take you to produce it?"',
      "→ …wait. This is the one that hurts. Don't rescue them.",
    ],
  },
  {
    icon: ClipboardCheck,
    minutes: "35–45 min",
    title: "Qualify + Next step",
    accent: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    do: "Pull up your calendar before you start talking. Reflect back the one use case that hurt most. Name the persona who has to be in the next room.",
    say: [
      '"Let me play back what I heard…"',
      '"The highest-cost use case for you sounds like [the one they flinched at]."',
      '"The next step I\'d suggest is a 60-minute focused walkthrough on exactly that — with you and [persona]."',
      '"I\'ve got my calendar open — can we put something on before [date]?"',
      "→ Don't hang up without a date on the calendar.",
    ],
  },
  {
    icon: Shield,
    minutes: "Anytime",
    title: "If they push back",
    accent: "border-slate-500/40 bg-slate-500/10 text-slate-300",
    do: "Don't defend. Trade. Every pushback is one more thing they just told you about their world.",
    say: [
      'They say: "Just send me a deck first."',
      'You say: "Happy to — what\'s the one use case I should build it around so it isn\'t generic?"',
      'They say: "We already have [competitor]."',
      'You say: "Totally fair. What\'s the one thing you wish it did that it doesn\'t?"',
      'They say: "Not the right time."',
      'You say: "Understood. What would have to be true for it to be the right time?"',
    ],
  },
];

const SEDiscoveryCallRunbook = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-discovery-call-runbook"
    slideNumber={slideNumber}
    title="Discovery-call runbook"
    subtitle="A 45-minute first call has a shape. Keep this open on a second monitor — verbatim opener, transitions and close."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-2 max-w-7xl mx-auto px-4 pt-2 pb-10">
      {blocks.map((b) => {
        const Icon = b.icon;
        return (
          <div key={b.title} className={`rounded-lg border p-3 grid grid-cols-12 gap-3 ${b.accent}`}>
            <div className="col-span-12 md:col-span-2 flex md:flex-col items-start gap-2">
              <Icon className="h-5 w-5" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{b.minutes}</div>
                <div className="text-sm font-semibold">{b.title}</div>
                {b.weight && (
                  <div className="text-[10px] mt-1 text-muted-foreground italic">{b.weight}</div>
                )}
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 border-l border-border/40 md:pl-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Move</div>
              <p className="text-xs text-foreground leading-snug">{b.do}</p>
            </div>
            <div className="col-span-12 md:col-span-5 border-l border-border/40 md:pl-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                Script <ArrowRight className="h-3 w-3" />
              </div>
              {Array.isArray(b.say) ? (
                <ul className="text-xs italic text-foreground leading-snug list-disc pl-4 space-y-1">
                  {b.say.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs italic text-foreground leading-snug">{b.say}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </PitchSlideContainer>
);

export default SEDiscoveryCallRunbook;