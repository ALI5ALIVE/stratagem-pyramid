import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { howItWorksSteps } from "@/data/mobilePlaybook";
import { Smartphone, KeyRound, Layers, Workflow, ArrowRight } from "lucide-react";

const stepIcons = [Smartphone, KeyRound, Layers, Workflow];

const MOSlide3HowItWorks = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="mo-how"
      title="How It Works"
      subtitle="Single Shell → SSO → Surfaced Mini-Apps → Connected Workflows."
      slideNumber={3}
      {...props}
    >
      <div className="h-full flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1">
          {howItWorksSteps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={i} className={`p-3 rounded-lg border ${step.border} ${step.bg} flex flex-col gap-2`}>
                <div className="flex items-center justify-between">
                  <div className={`h-7 w-7 rounded-md ${step.bg} border ${step.border} flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${step.color}`}>{step.number}</span>
                  </div>
                  <Icon className={`h-5 w-5 ${step.color}`} />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${step.color} mb-0.5`}>{step.title}</h3>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{step.tagline}</p>
                  <p className="text-[11px] text-foreground/80 leading-relaxed mb-2">{step.description}</p>
                </div>
                <ul className="space-y-1 mt-auto">
                  {step.details.map((d, j) => (
                    <li key={j} className="text-[10px] text-muted-foreground flex gap-1.5">
                      <span className={`${step.color} shrink-0`}>•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg border border-border bg-card/50">
          {howItWorksSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`text-xs font-medium ${step.color}`}>{step.title}</span>
              {i < howItWorksSteps.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

export default MOSlide3HowItWorks;
