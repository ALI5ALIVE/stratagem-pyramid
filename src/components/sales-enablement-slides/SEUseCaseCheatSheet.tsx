import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { HelpCircle, Ear, FileCheck2 } from "lucide-react";
import { useCaseCheatSheetRows, stepColor } from "@/data/week3FieldKit";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const SEUseCaseCheatSheet = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-usecase-cheatsheet"
    slideNumber={slideNumber}
    title="Use case cheat sheet"
    subtitle="Seven plain-English use cases. Each row: the question that uncovers it, the phrase that means it's live, the DTOP step to anchor on, and the artifact to send after the call."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-1.5 max-w-7xl mx-auto px-4 pt-2">
      {useCaseCheatSheetRows.map((c, i) => (
        <div key={i} className="grid grid-cols-12 gap-2 p-2.5 rounded-lg border border-border bg-card">
          <div className="col-span-12 md:col-span-3 flex items-start gap-2">
            <span className={`inline-flex items-center justify-center text-[10px] font-bold w-5 h-5 rounded border shrink-0 ${stepColor[c.dtop]}`}>{c.dtop}</span>
            <span className="text-[11.5px] font-semibold text-foreground leading-snug">{c.name}</span>
          </div>
          <div className="col-span-12 md:col-span-3 border-l border-border/40 md:pl-2">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary mb-0.5">
              <HelpCircle className="h-3 w-3" /> Discovery
            </div>
            <p className="text-[10.5px] italic text-foreground/85 leading-snug">"{c.question}"</p>
          </div>
          <div className="col-span-12 md:col-span-3 border-l border-border/40 md:pl-2">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-amber-300 mb-0.5">
              <Ear className="h-3 w-3" /> Listen for
            </div>
            <p className="text-[10.5px] italic text-foreground/85 leading-snug">{c.listenFor}</p>
          </div>
          <div className="col-span-12 md:col-span-3 border-l border-border/40 md:pl-2">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-violet-300 mb-0.5">
              <FileCheck2 className="h-3 w-3" /> Proof
            </div>
            <p className="text-[10.5px] text-foreground/85 leading-snug">{c.proof}</p>
          </div>
        </div>
      ))}
    </div>
  </PitchSlideContainer>
);

export default SEUseCaseCheatSheet;