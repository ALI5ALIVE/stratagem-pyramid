import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { PlayCircle, Settings2, LifeBuoy, MessageCircleQuestion } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const columns = [
  {
    icon: Settings2,
    accent: "text-blue-400",
    border: "border-blue-400/40",
    title: "Setup — before",
    items: [
      { h: "When to use it", b: 'Any time the customer says "I don\'t get how this connects" or "show me".' },
      { h: "What to bring", b: "A real whiteboard, an iPad, or screen-share annotation. Never PowerPoint." },
      { h: "Pre-line (earn the right)", b: '"Can I take 90 seconds at the board? It\'ll save us an hour of slides."' },
      { h: "Why it works", b: "Customers always say yes — it costs them nothing and shows confidence." },
    ],
  },
  {
    icon: PlayCircle,
    accent: "text-amber-400",
    border: "border-amber-400/40",
    title: "Run — during",
    items: [
      { h: "Draw the 6 strokes in order", b: "Detect → Trigger → Orchestrate → Prove, the loop arrow, then the 6 signal chips. Speak each line." },
      { h: "After Stroke 4 — stop and point", b: '"Which of these four steps breaks first for you today?"' },
      { h: "After Stroke 6 — point at chips", b: '"Which of these six signal sources is hardest for you to reach right now?"' },
      { h: "Write their answer on the board", b: "Next to the broken step. That single act converts a pitch into a discovery." },
    ],
  },
  {
    icon: LifeBuoy,
    accent: "text-emerald-400",
    border: "border-emerald-400/40",
    title: "Recover — when it goes sideways",
    items: [
      { h: "If you blank", b: 'Redraw Detect and say "let me restart from the signal." Resets without losing face.' },
      { h: "If they push for technical depth", b: '"That\'s the Signals Specialist Playbook — happy to bring our solutions architect for that one." Hand off, don\'t bluff.' },
      { h: "If they say \"we already have this\"", b: '"Which of these four steps is actually closed today, with auditable proof?" Almost no-one can answer Prove honestly.' },
      { h: "If they go quiet", b: "Tap the board on Prove and ask: \"how do you prove the loop closed today?\" Silence here is your wedge." },
    ],
  },
];

const SEDtopWhiteboardRunbook = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-slide-dtop-whiteboard-runbook"
    slideNumber={slideNumber}
    title="Running the whiteboard in the room"
    subtitle="The drill is the muscle. This is how you turn it into a meeting that closes."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-4 px-8 pt-3 pb-6 max-w-[1700px] mx-auto">
      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        {columns.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} className={`rounded-xl border ${c.border} bg-card/60 p-5 flex flex-col gap-3`}>
              <div className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${c.accent}`} />
                <h3 className={`text-sm font-bold uppercase tracking-wider ${c.accent}`}>{c.title}</h3>
              </div>
              <div className="flex flex-col gap-2.5">
                {c.items.map((it, i) => (
                  <div key={i} className="border-l-2 border-border pl-3">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-0.5">{it.h}</div>
                    <p className="text-sm text-foreground leading-snug">{it.b}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 border border-primary/30">
        <MessageCircleQuestion className="h-4 w-4 text-primary shrink-0" />
        <p className="text-sm text-foreground">
          The whiteboard is the single highest-conviction artefact in this academy. <span className="text-primary font-semibold">Practice it weekly with your team</span> — five minutes, one rep draws, the others critique.
        </p>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEDtopWhiteboardRunbook;
