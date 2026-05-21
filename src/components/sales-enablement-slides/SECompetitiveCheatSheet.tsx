import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { competitiveCheatSheet, stepColor, stepName } from "@/data/week3FieldKit";
import { Swords, Repeat, HelpCircle } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const SECompetitiveCheatSheet = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-competitive-cheatsheet"
    slideNumber={slideNumber}
    title="Competitive cheat sheet"
    subtitle="Six categories of competitor. Where each one stops in the DTOP loop, the one-sentence reframe, and the trap question that exposes the gap."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-1.5 max-w-7xl mx-auto px-4 pt-2 pb-10">
      {competitiveCheatSheet.map((c) => (
        <div key={c.name} className="rounded-lg border border-border bg-card p-2.5 grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-3 flex items-start gap-2">
            <Swords className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-foreground">{c.name}</div>
              <p className="text-[11px] text-muted-foreground italic mt-0.5">"{c.position}"</p>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 border-l border-border/40 md:pl-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Stops at</div>
            <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded border ${stepColor[c.stopsAt]}`}>
              {c.stopsAt} · {stepName[c.stopsAt]}
            </span>
          </div>
          <div className="col-span-8 md:col-span-4 border-l border-border/40 md:pl-3">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-violet-300 mb-1">
              <Repeat className="h-3 w-3" /> Reframe
            </div>
            <p className="text-[11px] text-foreground/85 leading-snug">{c.reframe}</p>
          </div>
          <div className="col-span-12 md:col-span-3 border-l border-border/40 md:pl-3">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary mb-1">
              <HelpCircle className="h-3 w-3" /> Trap question
            </div>
            <p className="text-[11px] italic text-foreground/85 leading-snug">"{c.trapQuestion}"</p>
          </div>
        </div>
      ))}
    </div>
  </PitchSlideContainer>
);

export default SECompetitiveCheatSheet;