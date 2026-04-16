import { useState } from "react";
import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { dtopSteps } from "@/data/dtopPlaybook";
import { Search, Zap, Settings, Award, ChevronDown, ChevronUp } from "lucide-react";

const stepIcons = [Search, Zap, Settings, Award];

const DTOPSlide3HowStepsWork = (props: SlideNarrationProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <SlideContainer id="dtop-how-steps" title="How Each Step Works" subtitle="Click any step to explore data sources, actions, and outputs" slideNumber={3} {...props}>
      <div className="h-full flex flex-col gap-2">
        {dtopSteps.map((step, i) => {
          const Icon = stepIcons[i];
          const isOpen = expanded === i;
          return (
            <button
              key={step.letter}
              onClick={() => setExpanded(isOpen ? null : i)}
              className={`text-left p-3 rounded-lg border transition-all ${
                isOpen ? `${step.border} ${step.bg}` : "border-border bg-card hover:border-muted-foreground/30"
              } ${isOpen ? "flex-1" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg ${step.bg} border ${step.border} flex items-center justify-center`}>
                    <span className={`text-lg font-bold ${step.color}`}>{step.letter}</span>
                  </div>
                  <div>
                    <span className={`text-sm font-semibold ${step.color}`}>{step.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">— {step.tagline}</span>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </div>

              {isOpen && (
                <div className="grid grid-cols-3 gap-3 mt-3" onClick={(e) => e.stopPropagation()}>
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Data Sources</h5>
                    <ul className="space-y-1">
                      {step.dataSources.map((s, j) => (
                        <li key={j} className="text-[11px] text-foreground/80 flex items-start gap-1.5">
                          <span className={`w-1 h-1 rounded-full ${step.color.replace("text-", "bg-")} mt-1.5 shrink-0`} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Actions</h5>
                    <ul className="space-y-1">
                      {step.actions.map((a, j) => (
                        <li key={j} className="text-[11px] text-foreground/80 flex items-start gap-1.5">
                          <span className={`w-1 h-1 rounded-full ${step.color.replace("text-", "bg-")} mt-1.5 shrink-0`} />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Outputs</h5>
                    <ul className="space-y-1">
                      {step.outputs.map((o, j) => (
                        <li key={j} className="text-[11px] text-foreground/80 flex items-start gap-1.5">
                          <span className={`w-1 h-1 rounded-full ${step.color.replace("text-", "bg-")} mt-1.5 shrink-0`} />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </SlideContainer>
  );
};

export default DTOPSlide3HowStepsWork;
