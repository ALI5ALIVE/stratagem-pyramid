import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { dtopSteps } from "@/data/dtopPlaybook";
import { Search, Zap, Settings, Award } from "lucide-react";

const stepIcons = [Search, Zap, Settings, Award];

const DTOPSlide2WhatIs = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="dtop-what" title="What DTOP Is" subtitle="A continuous improvement operating model that turns operational signals into orchestrated action and auditable proof" slideNumber={2} {...props}>
      <div className="h-full flex flex-col gap-4">
        <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
          <p className="text-sm text-foreground font-medium leading-relaxed">
            DTOP is not a product — it's an <span className="text-primary font-semibold">operating model</span> that 
            connects Comply365's Safety, Content, and Training modules into a closed-loop system. 
            Every operational signal follows a defined path from detection to auditable proof of improvement.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3 flex-1">
          {dtopSteps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={step.letter} className={`p-3 rounded-lg border ${step.border} ${step.bg} flex flex-col`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-8 w-8 rounded-lg ${step.bg} border ${step.border} flex items-center justify-center`}>
                    <span className={`text-lg font-bold ${step.color}`}>{step.letter}</span>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold ${step.color}`}>{step.label}</h4>
                    <p className="text-[10px] text-muted-foreground">{step.tagline}</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed flex-1">{step.description}</p>
                <div className="mt-2 flex justify-center">
                  <Icon className={`h-5 w-5 ${step.color} opacity-40`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Flow arrows */}
        <div className="flex items-center justify-center gap-1">
          {dtopSteps.map((step, i) => (
            <span key={step.letter} className="flex items-center gap-1">
              <span className={`text-xs font-bold ${step.color}`}>{step.letter}</span>
              {i < 3 && <span className="text-muted-foreground text-xs">→</span>}
            </span>
          ))}
          <span className="text-muted-foreground text-xs ml-2">= Closed-loop continuous improvement</span>
        </div>
      </div>
    </SlideContainer>
  );
};

export default DTOPSlide2WhatIs;
