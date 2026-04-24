import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { roadmapUseCases, phaseMeta, phaseOrder, useCasesByPhase } from "@/data/roadmapUseCases";
import { Rocket } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const RDSlide0Title = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="rd-slide-title"
    showHeader={false}
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col justify-center gap-10">
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs uppercase tracking-wider w-fit">
          <Rocket className="h-3.5 w-3.5" />
          Use Cases &amp; Roadmap
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05]">
          Every use case on the <span className="title-accent">2026 roadmap</span>,<br />
          in delivery order.
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Three phases. {roadmapUseCases.length} named use cases. One direction of travel — from a
          connected platform, to connected operations, to intelligent operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phaseOrder.map((phase) => {
          const meta = phaseMeta[phase];
          const count = useCasesByPhase(phase).length;
          return (
            <div
              key={phase}
              className={`rounded-xl border ${meta.border} ${meta.bg} p-4 flex flex-col gap-1`}
            >
              <span className={`text-xs uppercase tracking-wider ${meta.color} font-semibold`}>
                {meta.label} · {meta.window}
              </span>
              <span className="text-base font-bold text-foreground">{meta.theme}</span>
              <span className="text-xs text-muted-foreground mt-1">
                {count} use {count === 1 ? "case" : "cases"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </SalesSlideContainer>
);

export default RDSlide0Title;