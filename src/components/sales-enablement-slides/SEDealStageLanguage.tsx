import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { dealStageLanguage } from "@/data/week3FieldKit";
import { ArrowRight, Users, Target, MessageSquare } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const SEDealStageLanguage = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-deal-stage-language"
    slideNumber={slideNumber}
    title="Deal-stage next-step language"
    subtitle="What to say to move from one stage to the next — and who to bring into the next room. Scripted, not improvised."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-2 max-w-7xl mx-auto px-4 pt-2">
      {dealStageLanguage.map((s, i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-3 grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-3 flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground">{s.from}</span>
            <ArrowRight className="h-4 w-4 text-primary shrink-0" />
            <span className="text-xs font-semibold text-primary">{s.to}</span>
          </div>
          <div className="col-span-12 md:col-span-3 border-l border-border/40 md:pl-3">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-300 mb-1">
              <Target className="h-3 w-3" /> Goal
            </div>
            <p className="text-[11px] text-foreground/85 leading-snug">{s.goal}</p>
          </div>
          <div className="col-span-12 md:col-span-3 border-l border-border/40 md:pl-3">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-sky-300 mb-1">
              <Users className="h-3 w-3" /> Bring next
            </div>
            <p className="text-[11px] text-foreground/85 leading-snug">{s.bringNext}</p>
          </div>
          <div className="col-span-12 md:col-span-3 border-l border-border/40 md:pl-3">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-violet-300 mb-1">
              <MessageSquare className="h-3 w-3" /> Say this
            </div>
            <p className="text-[11px] italic text-foreground/85 leading-snug">"{s.scriptedLine}"</p>
          </div>
        </div>
      ))}
    </div>
  </PitchSlideContainer>
);

export default SEDealStageLanguage;