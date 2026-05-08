import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { SignalUseCase } from "@/data/signalsPlaybook";
import { X, Check } from "lucide-react";

interface Props extends SlideNarrationProps {
  id: string;
  slideNumber: number;
  useCase: SignalUseCase;
}

const SIGUseCaseSlide = ({ id, slideNumber, useCase, ...props }: Props) => {
  return (
    <SlideContainer
      id={id}
      title={useCase.title}
      subtitle={`Domain: ${useCase.domain}. The same signal — handled two very different ways.`}
      slideNumber={slideNumber}
      {...props}
    >
      <div className="h-full flex flex-col gap-4">
        <div className={`p-4 rounded-xl border ${useCase.border} ${useCase.bg}`}>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">The signal</p>
          <p className={`text-base font-medium ${useCase.color}`}>{useCase.signal}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="p-5 rounded-xl border border-destructive/30 bg-destructive/5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="h-3.5 w-3.5 text-destructive" />
              </div>
              <h4 className="text-sm font-semibold text-destructive uppercase tracking-wider">Without the platform</h4>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{useCase.withoutPlatform}</p>
          </div>

          <div className={`p-5 rounded-xl border ${useCase.border} ${useCase.bg} flex flex-col`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`h-6 w-6 rounded-full ${useCase.bg} border ${useCase.border} flex items-center justify-center`}>
                <Check className={`h-3.5 w-3.5 ${useCase.color}`} />
              </div>
              <h4 className={`text-sm font-semibold ${useCase.color} uppercase tracking-wider`}>With Comply365</h4>
            </div>
            <ul className="space-y-2.5 flex-1">
              {useCase.withPlatform.map((step, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2 leading-relaxed">
                  <span className={`mt-2 h-1.5 w-1.5 rounded-full ${useCase.color.replace("text-", "bg-")} shrink-0`} />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
          <p className="text-xs uppercase tracking-widest text-primary mb-1">Outcome</p>
          <p className="text-sm text-foreground font-medium">{useCase.outcome}</p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SIGUseCaseSlide;