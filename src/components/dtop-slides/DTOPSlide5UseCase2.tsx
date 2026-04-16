import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases, dtopSteps } from "@/data/dtopPlaybook";
import { FileCheck } from "lucide-react";

const uc = useCases[1];

const DTOPSlide5UseCase2 = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="dtop-uc2" title={`DTOP in Action: ${uc.title}`} subtitle={uc.scenario} slideNumber={5} {...props}>
      <div className="h-full flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <FileCheck className="h-5 w-5 text-emerald-400" />
          <span className="text-xs text-muted-foreground italic">{uc.scenario}</span>
        </div>

        <div className="grid grid-cols-1 gap-2 flex-1">
          {(["detect", "trigger", "orchestrate", "prove"] as const).map((key, i) => {
            const step = dtopSteps[i];
            return (
              <div key={key} className={`p-3 rounded-lg border ${step.border} ${step.bg} flex items-start gap-3`}>
                <div className={`h-7 w-7 rounded-md ${step.bg} border ${step.border} flex items-center justify-center shrink-0`}>
                  <span className={`text-sm font-bold ${step.color}`}>{step.letter}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-semibold ${step.color} mb-0.5`}>{step.label}</h4>
                  <p className="text-[11px] text-foreground/80 leading-relaxed">{uc.steps[key]}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-primary/30 bg-primary/5">
          <span className="text-xs text-foreground font-medium">{uc.outcome}</span>
          <span className="text-sm font-bold text-primary">{uc.metric}</span>
        </div>
      </div>
    </SlideContainer>
  );
};

export default DTOPSlide5UseCase2;
