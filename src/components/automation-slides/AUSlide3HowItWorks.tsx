import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { howItWorksSteps } from "@/data/automationPlaybook";
import { Zap, Workflow, GitBranch, Plug, ArrowRight } from "lucide-react";

const stepIcons = [Zap, Workflow, GitBranch, Plug];

const AUSlide3HowItWorks = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="au-how"
      title="How It Works"
      subtitle="Event → Orchestrate → Execute → Connected Action"
      slideNumber={3}
      {...props}
    >
      <div className="h-full flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 flex-1">
          {howItWorksSteps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div
                key={step.number}
                className={`p-4 rounded-lg border ${step.border} ${step.bg} flex flex-col gap-2`}
              >
                <div className="flex items-center justify-between">
                  <div className={`h-8 w-8 rounded-md ${step.bg} border ${step.border} flex items-center justify-center`}>
                    <span className={`text-sm font-bold ${step.color}`}>{step.number}</span>
                  </div>
                  <Icon className={`h-5 w-5 ${step.color}`} />
                </div>
                <h3 className={`text-sm font-bold ${step.color}`}>{step.title}</h3>
                <p className="text-[11px] text-muted-foreground italic">{step.tagline}</p>
                <p className="text-[11px] text-foreground/80 leading-relaxed">{step.description}</p>
                <ul className="space-y-1 mt-1">
                  {step.details.map((d, j) => (
                    <li key={j} className="text-[10px] text-foreground/70 flex items-start gap-1">
                      <span className={`${step.color} shrink-0`}>•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-2 px-2">
          {howItWorksSteps.map((s, i) => (
            <div key={s.number} className="flex items-center gap-2 flex-1">
              <span className={`text-xs font-semibold ${s.color}`}>{s.title}</span>
              {i < howItWorksSteps.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

export default AUSlide3HowItWorks;
