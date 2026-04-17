import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { flagshipUseCase, dtopModel } from "@/data/platformPlaybook";
import { MessageSquareQuote, Workflow } from "lucide-react";

const stepKeys = ["detect", "trigger", "orchestrate", "prove"] as const;

const PFSlide8FlagshipUseCase = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="pf-usecase"
      title="The Whole Platform Firing Together"
      subtitle={flagshipUseCase.title}
      slideNumber={8}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="flex items-start gap-3 p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
          <MessageSquareQuote className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-amber-300 mb-1">The scenario</p>
            <p className="text-xs text-foreground/85 mb-1">{flagshipUseCase.scenario}</p>
            <p className="text-sm text-foreground font-display mt-2">"{flagshipUseCase.question}"</p>
          </div>
          <Workflow className="h-5 w-5 text-amber-400 shrink-0" />
        </div>

        <div className="grid grid-cols-1 gap-2 flex-1">
          {stepKeys.map((key, i) => {
            const step = dtopModel.steps[i];
            return (
              <div key={key} className={`p-3 rounded-lg border ${step.border} ${step.bg} flex items-start gap-3`}>
                <div className={`h-8 w-8 rounded-md ${step.bg} border ${step.border} flex items-center justify-center shrink-0`}>
                  <span className={`text-sm font-bold ${step.color} font-display`}>{step.letter}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-semibold ${step.color} mb-0.5`}>{step.label} — {step.tagline}</h4>
                  <p className="text-[11px] text-foreground/80 leading-relaxed">{flagshipUseCase.steps[key]}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-primary/30 bg-primary/5">
          <span className="text-xs text-foreground font-medium">{flagshipUseCase.outcome}</span>
          <span className="text-sm font-bold text-primary">{flagshipUseCase.metric}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground flex-wrap">
          <span className="uppercase tracking-wider">Capabilities used:</span>
          {flagshipUseCase.capabilities.map((c, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full border border-border bg-card">{c}</span>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

export default PFSlide8FlagshipUseCase;
