import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/regulationManagementPlaybook";
import { Badge } from "@/components/ui/badge";

const RMSlide6UseCases = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-use-cases"
      title="Use Cases & Scenarios"
      subtitle="How Regulation Management delivers in practice"
      slideNumber={6}
      {...props}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {useCases.map((uc, i) => (
          <div key={i} className="border border-border rounded-lg p-3 flex flex-col">
            <span className="text-xs font-semibold text-foreground mb-2">{uc.title}</span>
            <div className="mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Scenario</span>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{uc.scenario}</p>
            </div>
            <div className="mb-2 flex-1">
              <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Outcome</span>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{uc.outcome}</p>
            </div>
            <div className="flex flex-wrap gap-1 mt-auto">
              {uc.products.map((p) => (
                <Badge key={p} variant="secondary" className="text-[9px] px-1.5 py-0">{p}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default RMSlide6UseCases;
