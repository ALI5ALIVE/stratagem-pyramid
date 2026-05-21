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
    do: "Thank them for the time. State the agenda in one sentence. Ask permission to ask questions before pitching. Avoid jargon in the first 5 minutes — no 'loop', no 'DTOP', no 'closed-loop compliance'. Earn those words later.",
    say: '"Thanks for the 30 minutes. My goal is simple — by the end of this call you\'ll know whether what we do is actually relevant to the problems on your plate, even if the answer is no. To get there I\'d like to ask a few questions before I show anything. Fair?"',
  },
  {
    icon: MapIcon,
    minutes: "2–10 min",
    title: "Frame",
    accent: "border-violet-500/40 bg-violet-500/10 text-violet-300",
    do: "Set the DTOP frame in plain English — Detect, Trigger, Orchestrate, Prove. Anchor on the shift from prescriptive compliance to performance-based oversight.",
    say: '"Most operators we talk to are strong at spotting safety and compliance signals. Where it usually breaks down is the middle bit — deciding what to change, getting that change into manuals and training, and then proving to a regulator it actually reached the crew. Does that match what you see?"',
  },
  {
    icon: Search,
    minutes: "10–35 min",
    title: "Discover",
    weight: "55% of the call lives here",
    accent: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    do: "Pull 4–6 questions from the Discovery Question Bank — one per DTOP step minimum. Ask one, then go silent for 10 seconds. Take real notes.",
    say: [
      '"When a safety or compliance signal lands on your desk, what actually triggers a procedure or training change?"',
      '"From that decision to the crew flying or operating the new version — how long, realistically?"',
      '"If an auditor walked in tomorrow and asked for evidence that your last five corrective actions reached the front line, how long would it take you to produce it?"',
    ],
  },
  {
    icon: ClipboardCheck,
    minutes: "35–45 min",
    title: "Qualify + Next step",
    accent: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    do: "Reflect back the one use case that hurt most. Name the persona who must be in the next room. Book the next step before you hang up.",
    say: '"Based on what you said, the highest-cost use case sounds like [X]. The next step is a 60-minute focused walkthrough on that, with you and [persona]. Can we put it on the calendar before [date]?"',
  },
  {
    icon: Shield,
    minutes: "Anytime",
    title: "If they push back",
    accent: "border-slate-500/40 bg-slate-500/10 text-slate-300",
    do: "Don't fight it. Trade. Every pushback is a chance to learn the one thing that would make the next conversation worth booking.",
    say: [
      '"Send me a deck first" → "Happy to — what\'s the one use case I should build it around so it\'s not generic?"',
      '"We already have [competitor]" → "Totally fair. What\'s the one thing you wish it did that it doesn\'t?"',
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
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Do this</div>
              <p className="text-xs text-foreground leading-snug">{b.do}</p>
            </div>
            <div className="col-span-12 md:col-span-5 border-l border-border/40 md:pl-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                Say this <ArrowRight className="h-3 w-3" />
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