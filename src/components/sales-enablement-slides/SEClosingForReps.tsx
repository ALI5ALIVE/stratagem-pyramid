import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { CheckCircle2, CalendarDays, Target } from "lucide-react";
import { thirtyDayCalendar } from "@/data/week3FieldKit";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const checklist = [
  "I can give the one-sentence platform pitch",
  "I can run the DTOP loop on a whiteboard from memory",
  "I can pull 4 questions from the bank for any DTOP step",
  "I can name the persona in the room and the metric they care about",
  "I can handle the top 8 objections without thinking",
  "I can book the next step using the deal-stage scripted line",
];

const SEClosingForReps = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-closing"
    slideNumber={slideNumber}
    title="Your first 30 days"
    subtitle="Read · Shadow · Practice · Lead. A calendar, not a checklist. End the month with a focused use-case session booked."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-3 max-w-7xl mx-auto px-4 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {thirtyDayCalendar.map((d) => (
          <div key={d.day} className="p-3 rounded-lg border border-primary/30 bg-primary/5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary">{d.day}</span>
            </div>
            <p className="text-[11px] text-foreground/85 leading-snug">{d.focus}</p>
            <div className="mt-auto pt-2 border-t border-border/40 flex items-start gap-1.5">
              <Target className="h-3 w-3 text-emerald-300 mt-0.5 shrink-0" />
              <p className="text-[10.5px] text-foreground/80 italic leading-snug">{d.outcome}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
        <div className="text-[11px] uppercase tracking-wider text-primary font-semibold mb-2">Day-30 readiness checklist</div>
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