import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import {
  positioningLine,
  elevatorClosePitch,
  talkingPoints,
  discoveryQuestions,
  nextSteps,
} from "@/data/insightsPlaybook";
import { ArrowRight, MessageSquareQuote } from "lucide-react";

const IRSlide10Closing = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="ir-closing"
      title="Talking Points & Close"
      subtitle={positioningLine}
      slideNumber={10}
      {...props}
    >
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
            <p className="text-[10px] uppercase tracking-wider text-primary mb-2 font-medium">Elevator Pitch</p>
            <p className="text-sm text-foreground leading-relaxed">{elevatorClosePitch}</p>
          </div>

          <div className="p-3 rounded-lg border border-border bg-card flex-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">
              Key Talking Points
            </p>
            <ul className="space-y-2">
              {talkingPoints.map((t, i) => (
                <li key={i} className="text-xs text-foreground/85 flex items-start gap-2 leading-relaxed">
                  <span className="text-primary font-semibold shrink-0">{i + 1}.</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
            <p className="text-[10px] uppercase tracking-wider text-amber-300 mb-2 font-medium flex items-center gap-1.5">
              <MessageSquareQuote className="h-3.5 w-3.5" />
              Discovery Questions
            </p>
            <ul className="space-y-2">
              {discoveryQuestions.map((q, i) => (
                <li key={i} className="text-xs text-foreground/85 leading-relaxed">
                  "{q}"
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-lg border border-border bg-card flex-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">Recommended Next Steps</p>
            <div className="space-y-2">
              {nextSteps.map((s) => (
                <div key={s.step} className="p-2 rounded-md border border-border bg-card/50 flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-foreground">{s.step}</span>
                      <span className="text-[10px] text-primary">{s.timeline}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default IRSlide10Closing;
