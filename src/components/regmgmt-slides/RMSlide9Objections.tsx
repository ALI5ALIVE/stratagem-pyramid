import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { objections } from "@/data/regulationManagementPlaybook";

const RMSlide9Objections = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-objections"
      title="Objection Handling"
      subtitle="Strategic responses to common objections"
      slideNumber={10}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {objections.map((o, i) => (
          <div key={i} className="border border-border rounded-lg p-3">
            <div className="flex items-start gap-2 mb-1.5">
              <span className="text-destructive text-xs font-bold shrink-0">Q</span>
              <p className="text-xs font-semibold text-foreground">{o.objection}</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary text-xs font-bold shrink-0">A</span>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{o.response}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default RMSlide9Objections;
