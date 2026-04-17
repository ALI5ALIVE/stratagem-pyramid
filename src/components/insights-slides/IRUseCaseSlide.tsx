import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { howItWorksSteps, InsightsUseCase } from "@/data/insightsPlaybook";
import { MessageSquareQuote, AlertTriangle, FileCheck, Search } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { AlertTriangle, FileCheck, Search };
const stepLabels = ["Ask", "Correlate", "Insight", "Recommend"] as const;
const stepKeys = ["ask", "correlate", "insight", "recommend"] as const;

interface IRUseCaseSlideProps extends SlideNarrationProps {
  useCase: InsightsUseCase;
  slideNumber: number;
  id: string;
}

const IRUseCaseSlide = ({ useCase, slideNumber, id, ...props }: IRUseCaseSlideProps) => {
  const HeaderIcon = iconMap[useCase.icon] || AlertTriangle;
  return (
    <SlideContainer
      id={id}
      title={`Use Case: ${useCase.title}`}
      subtitle={useCase.scenario}
      slideNumber={slideNumber}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="flex items-start gap-3 p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
          <MessageSquareQuote className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-amber-300 mb-1">The question asked</p>
            <p className="text-sm sm:text-base text-foreground font-display">"{useCase.question}"</p>
          </div>
          <HeaderIcon className="h-5 w-5 text-amber-400 shrink-0" />
        </div>

        <div className="grid grid-cols-1 gap-2 flex-1">
          {stepKeys.map((key, i) => {
            const step = howItWorksSteps[i];
            return (
              <div key={key} className={`p-3 rounded-lg border ${step.border} ${step.bg} flex items-start gap-3`}>
                <div className={`h-7 w-7 rounded-md ${step.bg} border ${step.border} flex items-center justify-center shrink-0`}>
                  <span className={`text-xs font-bold ${step.color}`}>{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-semibold ${step.color} mb-0.5`}>{stepLabels[i]}</h4>
                  <p className="text-[11px] text-foreground/80 leading-relaxed">{useCase[key as keyof typeof useCase.steps] as unknown as string || useCase.steps[key]}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-primary/30 bg-primary/5">
          <span className="text-xs text-foreground font-medium">{useCase.outcome}</span>
          <span className="text-sm font-bold text-primary">{useCase.metric}</span>
        </div>
      </div>
    </SlideContainer>
  );
};

export default IRUseCaseSlide;
