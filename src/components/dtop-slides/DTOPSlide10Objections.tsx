import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { objections } from "@/data/dtopPlaybook";
import { MessageSquare } from "lucide-react";

const DTOPSlide10Objections = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="dtop-objections" title="Objection Handling" subtitle="Common pushback and strategic responses" slideNumber={10} {...props}>
      <div className="h-full flex flex-col gap-2">
        {objections.map((obj, i) => (
          <div key={i} className="p-3 rounded-lg border border-border bg-card flex gap-3">
            <MessageSquare className="h-4 w-4 text-destructive/60 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-foreground mb-1">"{obj.objection}"</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-1.5">{obj.response}</p>
              <p className="text-[10px] text-primary font-medium">↳ {obj.reframe}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default DTOPSlide10Objections;
