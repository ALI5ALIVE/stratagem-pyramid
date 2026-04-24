import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import {
  roadmapUseCases,
  phaseMeta,
  phaseOrder,
  statusMeta,
  useCasesByPhase,
} from "@/data/roadmapUseCases";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const RDSlide1Overview = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="rd-slide-overview"
    title="Roadmap at a glance"
    subtitle="Every named use case, mapped to its phase and platform layer"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-3 min-h-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0 auto-rows-fr items-stretch">
        {phaseOrder.map((phase) => {
          const meta = phaseMeta[phase];
          const items = useCasesByPhase(phase);
          return (
            <div
              key={phase}
              className={`rounded-xl border ${meta.border} ${meta.bg} p-3 flex flex-col h-full min-h-0`}
            >
              <div className="flex items-baseline justify-between mb-2 shrink-0">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {meta.label}
                  </span>
                  <h3 className={`text-sm font-bold ${meta.color}`}>{meta.theme}</h3>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {items.length} use cases
                </span>
              </div>
              <ul className="space-y-1.5 overflow-hidden flex-1">
                {items.map((uc) => {
                  const s = statusMeta[uc.status];
                  return (
                    <li
                      key={uc.id}
                      className="flex items-start gap-1.5 text-xs text-foreground/85 leading-snug"
                    >
                      <span className="text-sm leading-none mt-0.5">{s.icon}</span>
                      <span className="flex-1">
                        <span className="font-medium">{uc.title}</span>{" "}
                        <span className="text-muted-foreground">— {uc.layer}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="p-2.5 rounded-xl border border-border/40 bg-muted/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 shrink-0">
        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="text-base leading-none">{statusMeta.done.icon}</span> Done
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="text-base leading-none">{statusMeta["in-progress"].icon}</span> In Progress
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="text-base leading-none">{statusMeta.planned.icon}</span> Planned
        </span>
        <span className="text-xs text-muted-foreground/70">
          · {roadmapUseCases.length} use cases · refined during discovery
        </span>
      </div>
    </div>
  </SalesSlideContainer>
);

export default RDSlide1Overview;