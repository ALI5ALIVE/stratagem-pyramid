import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { phaseMeta, RoadmapPhase, useCasesByPhase, statusMeta } from "@/data/roadmapUseCases";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
  id: string;
  phase: RoadmapPhase;
}

const RDPhaseDivider = ({ slideNumber, id, phase, ...narrationProps }: Props) => {
  const meta = phaseMeta[phase];
  const items = useCasesByPhase(phase);
  return (
    <SalesSlideContainer id={id} showHeader={false} slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 flex flex-col justify-center gap-8">
        <div className="space-y-3">
          <span
            className={`inline-block text-xs uppercase tracking-[0.2em] ${meta.color} font-semibold`}
          >
            Phase · {meta.label} · {meta.window}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight">
            <span className="title-accent">{meta.theme}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            What we deliver in this phase, in order, with the customer outcome each use case unlocks.
          </p>
        </div>
        <div
          className={`rounded-xl border ${meta.border} ${meta.bg} p-5 flex flex-col gap-2 max-w-4xl`}
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            Use cases in this phase
          </span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {items.map((uc) => {
              const s = statusMeta[uc.status];
              return (
                <li
                  key={uc.id}
                  className="flex items-start gap-2 text-sm text-foreground/90 leading-snug"
                >
                  <span className="text-base leading-none mt-0.5">{s.icon}</span>
                  <span>{uc.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default RDPhaseDivider;