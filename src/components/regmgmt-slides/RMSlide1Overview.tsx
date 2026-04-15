import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { solutionOverview } from "@/data/regulationManagementPlaybook";
import { Lightbulb, ArrowRight, Quote } from "lucide-react";

const RMSlide1Overview = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-overview"
      title="Solution Overview"
      subtitle="Regulation Management by Comply365"
      slideNumber={1}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {/* Left — Elevator Pitch */}
        <div className="flex flex-col gap-4">
          <div className="border border-border rounded-lg p-4 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Quote className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Elevator Pitch</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{solutionOverview.elevatorPitch}</p>
          </div>

          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Narrative Arc</span>
            </div>
            <p className="text-base font-semibold text-foreground">{solutionOverview.narrativeArc}</p>
            <p className="text-primary text-sm mt-2 font-medium">{solutionOverview.tagline}</p>
          </div>
        </div>

        {/* Right — Key Insight */}
        <div className="flex flex-col gap-4">
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Key Insight</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{solutionOverview.keyInsight}</p>
          </div>

          <div className="border border-border rounded-lg p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Framing</span>
            <p className="text-sm text-foreground mt-2 italic">
              "This is not a 'use case' — it is a self-contained solution with standalone commercial value that also multiplies the value of every other Comply365 module."
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default RMSlide1Overview;
