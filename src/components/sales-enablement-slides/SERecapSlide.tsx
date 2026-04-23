import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { MessageCircle, Quote } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const recaps = [
  {
    q: "What is the Operational Performance Platform?",
    a: "It's the first platform that joins safety, content, and training into one connected system — so signals from operations actually drive procedure changes and targeted retraining, with auditable proof.",
  },
  {
    q: "How is this different from what we already have?",
    a: "Today these are 5–7 separate tools that don't share data. We replace point-to-point integrations with one operational data foundation — and add an intelligence layer on top that no point solution can match.",
  },
  {
    q: "What's the one thing I should remember?",
    a: "Point solutions can detect. Only we can Detect → Trigger → Orchestrate → Prove — the full closed loop. Everything else is a slice.",
  },
];

const SERecapSlide = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-recap-m2"
    slideNumber={slideNumber}
    title="What you should now be able to say"
    subtitle="If a prospect asks X, you say Y. Practice these out loud."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-3 max-w-6xl mx-auto px-4 pt-4">
      {recaps.map((r, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-xl border border-border bg-card">
          <div className="md:col-span-4 flex items-start gap-2">
            <MessageCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">If they ask</div>
              <div className="text-sm font-semibold text-foreground leading-snug">"{r.q}"</div>
            </div>
          </div>
          <div className="md:col-span-8 flex items-start gap-2 md:border-l md:border-border md:pl-4">
            <Quote className="h-4 w-4 text-primary shrink-0 mt-1" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-primary mb-1">You say</div>
              <p className="text-sm text-foreground leading-relaxed">{r.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </PitchSlideContainer>
);

export default SERecapSlide;