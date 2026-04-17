import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { howItWorksSteps } from "@/data/insightsPlaybook";
import { Database, MessageSquare, Brain, Lightbulb, ArrowRight } from "lucide-react";

const stepIcons = [Database, MessageSquare, Brain, Lightbulb];

const IRSlide3HowItWorks = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="ir-how"
      title="How It Works"
      subtitle="A four-step flow from operational data to Recommended Actions"
      slideNumber={3}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 flex-1">
          {howItWorksSteps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div
                key={step.number}
                className={`p-3 rounded-lg border ${step.border} ${step.bg} flex flex-col gap-2`}
              >
                <div className="flex items-center gap-2">
                  <div className={`h-7 w-7 rounded-md ${step.bg} border ${step.border} flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${step.color}`}>{step.number}</span>
                  </div>
                  <Icon className={`h-4 w-4 ${step.color}`} />
                </div>
                <h4 className={`text-sm font-semibold ${step.color}`}>{step.title}</h4>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{step.tagline}</p>
                <p className="text-[11px] text-foreground/80 leading-relaxed">{step.description}</p>
                <ul className="space-y-1 mt-auto pt-2">
                  {step.details.map((d, j) => (
                    <li key={j} className="text-[10px] text-muted-foreground flex items-start gap-1.5">
                      <span className={`w-1 h-1 rounded-full ${step.color.replace("text-", "bg-")} mt-1.5 shrink-0`} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          {howItWorksSteps.map((s, i) => (
            <span key={s.number} className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${s.color}`}>{s.title}</span>
              {i < howItWorksSteps.length - 1 && <ArrowRight className="h-3 w-3" />}
            </span>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

export default IRSlide3HowItWorks;
