import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, Users, Gift, Coffee, ArrowRight } from "lucide-react";
import {
  visionSessionAgenda,
  visionSessionAttendees,
  visionSessionLeaveBehind,
  visionSessionRepTalkTrack,
} from "@/data/week3FieldKit";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const SEStrategyVisionSession = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-strategy-vision-session"
    slideNumber={slideNumber}
    title="The Strategy & Vision Session — a complimentary half-day workshop"
    subtitle="Lift the conversation out of tickets and renewals. Put the roadmap on the table. Fixed 4-hour agenda, on-site or virtual."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-3 max-w-7xl mx-auto px-4 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Agenda timeline */}
        <div className="md:col-span-7 p-3 rounded-xl border border-primary/30 bg-primary/5">
          <div className="text-[11px] uppercase tracking-wider text-primary font-semibold mb-2 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> Fixed 4-hour agenda
          </div>
          <div className="space-y-1.5">
            {visionSessionAgenda.map((b) => (
              <div
                key={b.time}
                className={`grid grid-cols-12 gap-2 p-2 rounded-md border ${
                  b.isBreak
                    ? "border-border/30 bg-muted/20"
                    : "border-primary/20 bg-background/40"
                }`}
              >
                <div className="col-span-3 text-[10.5px] font-mono text-muted-foreground flex items-center gap-1">
                  {b.isBreak && <Coffee className="h-3 w-3" />}
                  {b.time}
                </div>
                <div className="col-span-9">
                  <div className={`text-xs font-semibold leading-tight ${b.isBreak ? "text-muted-foreground" : "text-foreground"}`}>
                    {b.title}
                  </div>
                  <p className="text-[10.5px] text-foreground/75 leading-snug">{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: who + what they leave with */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="p-3 rounded-lg border border-sky-500/30 bg-sky-500/5">
            <div className="text-[11px] uppercase tracking-wider text-sky-300 font-semibold mb-2 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> Who should be in the room
            </div>
            <div className="flex flex-wrap gap-1.5">
              {visionSessionAttendees.map((a) => (
                <span key={a} className="text-[11px] px-2 py-0.5 rounded-full border border-sky-500/40 bg-sky-500/10 text-foreground/90">
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 flex-1">
            <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold mb-2 flex items-center gap-1.5">
              <Gift className="h-3.5 w-3.5" /> What they leave with
            </div>
            <ul className="space-y-1">
              {visionSessionLeaveBehind.map((l) => (
                <li key={l} className="text-[11.5px] text-foreground/90 leading-snug">• {l}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Rep talk track */}
      <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/5">
        <div className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold mb-2">How to offer it · rep talk track (3 lines)</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {visionSessionRepTalkTrack.map((t, i) => (
            <div key={t.step} className="flex flex-col gap-1">
              <div className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold">
                {i + 1}. {t.step}
              </div>
              <p className="text-[11.5px] text-foreground italic leading-snug">"{t.line}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-primary font-semibold">
        Book it. Then go run your 30-day plan.
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEStrategyVisionSession;