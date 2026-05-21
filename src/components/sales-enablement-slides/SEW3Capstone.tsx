import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Target, PhoneCall, Layers, ShieldAlert, Handshake, CalendarCheck, Clock, Trophy } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const moves = [
  {
    icon: Target,
    n: 1,
    label: "Pick the account",
    accent: "border-sky-500/40 bg-sky-500/10 text-sky-300",
    artifact: "Who to Target · Tier 1–3",
    do: "One Tier 1 account from your book — existing Comply365 footprint, renewal inside 12 months, exec sponsor named.",
    say: '"This week I\'m anchoring on [Account] — Safety lives with us, the renewal is in March, and the VP Safety has already asked about cross-team retraining."',
  },
  {
    icon: PhoneCall,
    n: 2,
    label: "Run the call",
    accent: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    artifact: "Discovery-Call Runbook · 4 blocks",
    do: "Open · Frame · Discover · Qualify. 45 minutes, 4–6 questions pulled from the Question Bank, persona row open on a second monitor.",
    say: '"Mind if I lead with a few questions before I show you anything? When a safety signal lands, what triggers a procedure or training change today?"',
  },
  {
    icon: Layers,
    n: 3,
    label: "Pick the use case",
    accent: "border-violet-500/40 bg-violet-500/10 text-violet-300",
    artifact: "Use Case Cheat Sheet · 7 rows",
    do: "Pattern-match their words to one row. Anchor on the DTOP step. Walk it as a loop, not a feature list.",
    say: '"Based on what you just said, the highest-cost use case here is unstable approach trend at [hub]. Let me show you how that closes in 5 days."',
  },
  {
    icon: ShieldAlert,
    n: 4,
    label: "Handle one objection",
    accent: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    artifact: "Objections · Acknowledge → Reframe → Bridge",
    do: "Take the most likely pushback. Acknowledge it, reframe to the loop, bridge to a proof artifact you send within the hour.",
    say: '"Totally fair — most teams already have an SMS. We don\'t replace it; we extend it so the action and the proof close on the same platform."',
  },
  {
    icon: Handshake,
    n: 5,
    label: "Close with the line",
    accent: "border-primary/40 bg-primary/10 text-primary",
    artifact: "Deal-Stage Next-Step Language",
    do: "Before the call ends, propose the next step with a date and the next persona who must be in the room.",
    say: '"Next step is a 60-minute focused walkthrough on unstable approach, with you and your Head of Training. Can we put it on the calendar this side of the 20th?"',
  },
  {
    icon: CalendarCheck,
    n: 6,
    label: "Book the Strategy & Vision Session",
    accent: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    artifact: "Strategy & Vision Session · 3-hour workshop",
    do: "Use the 3-line talk track. Don't scope it; the agenda is fixed. Confirm the room: exec sponsor, VP Safety, VP Ops, training lead, IT lead.",
    say: '"Your leadership is being asked roadmap-level questions the day-to-day tools can\'t answer. We run a complimentary 3-hour session that puts the operating-model conversation on the table — that\'s the right venue for this."',
  },
];

const SEW3Capstone = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-w3-capstone"
    slideNumber={slideNumber}
    title="W3 Capstone — your first 30 days as a rep"
    subtitle="Six moves, in order. By the end you can pick the account, run the call, pick the use case, handle the objection, close with the line, and book the Strategy & Vision Session — verbatim, without a slide behind you."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-3 max-w-[1700px] mx-auto px-6 pt-2 pb-10">
      <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-0">
        {moves.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.n}
              className={`rounded-lg border p-3 grid grid-cols-12 gap-2.5 ${m.accent}`}
            >
              <div className="col-span-2 flex flex-col items-start gap-1.5">
                <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                  {m.n}
                </div>
                <Icon className="h-4 w-4" />
              </div>
              <div className="col-span-10 min-w-0">
                <div className="text-sm font-semibold text-foreground leading-tight">{m.label}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 mb-1.5">
                  {m.artifact}
                </div>
                <p className="text-[11.5px] text-foreground/85 leading-snug mb-1.5">{m.do}</p>
                <p className="text-[11px] italic text-foreground/75 leading-snug border-l-2 border-current/40 pl-2">
                  {m.say}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 60-second self-test footer */}
      <div className="p-3 rounded-xl border border-primary/40 bg-primary/5 flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <Trophy className="h-5 w-5 text-primary" />
          <div className="text-[11px] uppercase tracking-wider text-primary font-semibold">
            60-second self-test
          </div>
        </div>
        <p className="text-xs text-foreground/90 leading-snug flex-1">
          Out loud, in one minute: <span className="text-foreground font-semibold">name the account, the call, the use case, the objection, the close line, and the booked session.</span> If you can't, go back to the slide that breaks for you and rehearse it in Practice Center before your next real call.
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-primary font-semibold shrink-0">
          <Clock className="h-3.5 w-3.5" />
          Drill 3×
        </div>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEW3Capstone;
