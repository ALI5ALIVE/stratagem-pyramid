import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { talkingPoints, elevatorPitch, nextSteps } from "@/data/dtopPlaybook";
import { ArrowRight } from "lucide-react";

const DTOPSlide11Closing = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="dtop-closing" title="Key Talking Points & Next Steps" subtitle="Anchor statements and recommended engagement path" slideNumber={11} {...props}>
      <div className="h-full flex gap-4">
        {/* Left: talking points + elevator pitch */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
            <h5 className="text-[10px] uppercase tracking-wider text-primary mb-2">Elevator Pitch</h5>
            <p className="text-xs text-foreground/90 leading-relaxed italic">"{elevatorPitch}"</p>
          </div>

          <div className="flex-1 p-4 rounded-lg border border-border bg-card">
            <h5 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Key Talking Points</h5>
            <ul className="space-y-2">
              {talkingPoints.map((tp, i) => (
                <li key={i} className="text-[11px] text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold text-[10px] mt-0.5">{i + 1}.</span>
                  {tp}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: next steps */}
        <div className="w-72 flex flex-col gap-3">
          <h5 className="text-[10px] uppercase tracking-wider text-muted-foreground">Recommended Next Steps</h5>
          {nextSteps.map((ns, i) => (
            <div key={i} className="p-3 rounded-lg border border-border bg-card flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                  {ns.step}
                </h4>
                <span className="text-[10px] text-muted-foreground">{ns.timeline}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{ns.description}</p>
            </div>
          ))}

          <div className="mt-auto p-3 rounded-lg border border-primary/30 bg-primary/5 text-center">
            <p className="text-xs font-semibold text-primary flex items-center justify-center gap-1">
              Discovery Call <ArrowRight className="h-3 w-3" /> Workshop <ArrowRight className="h-3 w-3" /> Pilot
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default DTOPSlide11Closing;
