import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Mic, Map as MapIcon, Search, ClipboardCheck, ArrowRight } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const blocks = [
  {
    icon: Mic,
    minutes: "0–2 min",
    title: "Open",
    accent: "border-sky-500/40 bg-sky-500/10 text-sky-300",
    do: "Thank them for the time. State the agenda in one sentence. Ask permission to ask questions before pitching.",
    say: '"Thanks for the 30 minutes. My goal today is to understand where the loop breaks for you operationally — then I\'ll know whether what we do is even relevant. Mind if I lead with a few questions?"',
  },
  {
    icon: MapIcon,
    minutes: "2–10 min",
    title: "Frame",
    accent: "border-violet-500/40 bg-violet-500/10 text-violet-300",
    do: "Set the DTOP frame in plain English — Detect, Trigger, Orchestrate, Prove. Anchor on the shift from prescriptive compliance to performance-based oversight.",
    say: '"Most operators we work with are great at Detect — the signals are there. Where it breaks is between Trigger and Prove. Does that match your world?"',
  },
  {
    icon: Search,
    minutes: "10–35 min",
    title: "Discover",
    accent: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    do: "Pull 4–6 questions from the Discovery Question Bank — one per DTOP step minimum. Stay silent after each. Take real notes.",
    say: '"When a safety signal lands, what triggers a procedure or training change?" … "How long until that change reaches the crew?" … "If a regulator asked for proof your last five actions closed the loop — how long?"',
  },
  {
    icon: ClipboardCheck,
    minutes: "35–45 min",
    title: "Qualify + Next step",
    accent: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    do: "Reflect back the one use case that hurt most. Name the persona who must be in the next room. Book the next step before you hang up.",
    say: '"Based on what you said, the highest-cost use case sounds like [X]. The next step is a 60-minute focused walkthrough on that, with you and [persona]. Can we put it on the calendar this side of [date]?"',
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
    <div className="h-full flex flex-col gap-2 max-w-7xl mx-auto px-4 pt-2">
      {blocks.map((b) => {
        const Icon = b.icon;
        return (
          <div key={b.title} className={`rounded-lg border p-3 grid grid-cols-12 gap-3 ${b.accent}`}>
            <div className="col-span-12 md:col-span-2 flex md:flex-col items-start gap-2">
              <Icon className="h-5 w-5" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{b.minutes}</div>
                <div className="text-sm font-semibold">{b.title}</div>
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
              <p className="text-xs italic text-foreground leading-snug">{b.say}</p>
            </div>
          </div>
        );
      })}
    </div>
  </PitchSlideContainer>
);

export default SEDiscoveryCallRunbook;