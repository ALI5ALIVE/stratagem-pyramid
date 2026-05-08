import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { HelpCircle, Sparkles } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const rows = [
  {
    plain:
      "Aviation isn't short on data. It's short on signals it can act on — and proof that the action worked.",
    question: "What's the last operational signal your team saw and couldn't act on fast enough?",
  },
  {
    plain:
      "Operators today run Safety, Content and Training in three disconnected stacks. We unify them on one operational data foundation, with a domain-trained intelligence layer on top.",
    question: "How connected are your Safety, Content and Training systems today — really?",
  },
  {
    plain:
      "We don't sell features. We sell a measurable shift from reactive to controlled — Detect → Trigger → Orchestrate → Prove.",
    question: "If a regulator walked in tomorrow, could you prove the loop closed on your last 5 safety signals?",
  },
];

const SEPlainEnglishShift = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-plain-english-shift"
    slideNumber={slideNumber}
    title="Why this matters — in plain English"
    subtitle="Three lines that reframe the market for the prospect, each paired with a discovery question."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-3 max-w-7xl mx-auto px-4 pt-4">
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-lg border border-border bg-card">
          <div className="md:col-span-7 flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Say this</div>
              <p className="text-sm text-foreground leading-relaxed">{r.plain}</p>
            </div>
          </div>
          <div className="md:col-span-5 md:border-l md:border-border md:pl-4">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary mb-1">
              <HelpCircle className="h-3 w-3" />
              <span>Discovery question</span>
            </div>
            <p className="text-sm text-foreground italic leading-relaxed">"{r.question}"</p>
          </div>
        </div>
      ))}
    </div>
  </PitchSlideContainer>
);

export default SEPlainEnglishShift;