import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import {
  positioningLine,
  elevatorClosePitch,
  talkingPoints,
  discoveryQuestions,
  nextSteps,
} from "@/data/mobilePlaybook";
import { ArrowRight, MessageSquareQuote } from "lucide-react";

const MOSlide10Closing = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="mo-closing"
      title="Talking Points & Close"
      subtitle={positioningLine}
      slideNumber={10}
      {...props}
    >
      <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
            <p className="text-[10px] uppercase tracking-wider text-primary mb-1">Elevator Pitch</p>
            <p className="text-xs text-foreground leading-relaxed">{elevatorClosePitch}</p>
          </div>
          <div className="p-3 rounded-lg border border-border bg-card flex-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Key Speaking Points</p>
            <ul className="space-y-2">
              {talkingPoints.map((tp, i) => (
                <li key={i} className="flex gap-2 text-xs text-foreground/90 leading-relaxed">
                  <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                  <span>{tp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
            <p className="text-[10px] uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
              <MessageSquareQuote className="h-3 w-3" />
              Discovery Questions
            </p>
            <ul className="space-y-2">
              {discoveryQuestions.map((q, i) => (
                <li key={i} className="text-xs text-foreground/90 leading-relaxed">
                  • {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-lg border border-border bg-card flex-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Recommended Next Steps</p>
            <ul className="space-y-2">
              {nextSteps.map((ns, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground">{ns.step}</span>
                      <span className="text-[10px] text-muted-foreground">· {ns.timeline}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{ns.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default MOSlide10Closing;
