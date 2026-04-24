import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { roadmapUseCases, phaseMeta, phaseOrder, useCasesByPhase } from "@/data/roadmapUseCases";
import { ArrowRight } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const RDClosing = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="rd-slide-closing"
    title="One direction of travel"
    subtitle="From a connected platform, to connected operations, to intelligent operations"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col justify-center gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phaseOrder.map((phase, idx) => {
          const meta = phaseMeta[phase];
          const count = useCasesByPhase(phase).length;
          return (
            <div key={phase} className="relative">
              <div className={`rounded-xl border ${meta.border} ${meta.bg} p-5 flex flex-col gap-2 h-full`}>
                <span className={`text-xs uppercase tracking-wider ${meta.color} font-semibold`}>
                  {meta.label}
                </span>
                <span className="text-lg font-bold text-foreground">{meta.theme}</span>
                <span className="text-xs text-muted-foreground">{meta.window} · {count} use cases</span>
              </div>
              {idx < phaseOrder.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 flex flex-col gap-2 max-w-4xl">
        <span className="text-xs uppercase tracking-wider text-primary font-semibold">The promise</span>
        <p className="text-base text-foreground/90 leading-relaxed">
          Every step is sized to deliver value on its own — and to compound the value of every step
          that comes after it. {roadmapUseCases.length} use cases, one platform, one operating model.
        </p>
      </div>

      <div className="text-sm text-muted-foreground">
        Where would you like to go deeper?
      </div>
    </div>
  </SalesSlideContainer>
);

export default RDClosing;