import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { discoveryQuestionBank, stepColor, stepName } from "@/data/week3FieldKit";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const SEDiscoveryQuestionBank = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-discovery-question-bank"
    slideNumber={slideNumber}
    title="Discovery question bank"
    subtitle="Twelve questions, grouped by DTOP step. Each one comes with what good sounds like — and what a red-flag answer sounds like."
    showHeader
    {...narrationProps}
  >
    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-3 max-w-7xl mx-auto px-4 pt-2 pb-10">
      {discoveryQuestionBank.map((s) => (
        <div key={s.step} className={`rounded-lg border p-3 ${stepColor[s.step]}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base font-bold">{s.step}</span>
            <span className="text-xs font-semibold">{stepName[s.step]}</span>
          </div>
          <p className="text-[11px] italic text-muted-foreground mb-2">{s.intent}</p>
          <ul className="space-y-2">
            {s.questions.map((q, i) => (
              <li key={i} className="rounded border border-border/40 bg-background/40 p-2">
                <p className="text-[12px] text-foreground italic mb-1.5">"{q.question}"</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="flex items-start gap-1 text-[10px] text-emerald-300">
                    <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                    <span className="text-foreground/80 leading-snug">{q.good}</span>
                  </div>
                  <div className="flex items-start gap-1 text-[10px] text-rose-300">
                    <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                    <span className="text-foreground/80 leading-snug">{q.redFlag}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </PitchSlideContainer>
);

export default SEDiscoveryQuestionBank;