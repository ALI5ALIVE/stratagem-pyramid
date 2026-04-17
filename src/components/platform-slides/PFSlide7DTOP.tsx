import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { dtopModel } from "@/data/platformPlaybook";
import { ArrowRight, Repeat } from "lucide-react";

const PFSlide7DTOP = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="pf-dtop"
      title="DTOP — The Operating Model"
      subtitle={dtopModel.headline}
      slideNumber={7}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex items-start gap-3">
          <Repeat className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/85 leading-relaxed">{dtopModel.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1">
          {dtopModel.steps.map((step, i) => (
            <div key={i} className={`rounded-lg border ${step.border} ${step.bg} p-4 flex flex-col gap-3`}>
              <div className={`h-12 w-12 rounded-lg ${step.bg} border ${step.border} flex items-center justify-center`}>
                <span className={`text-2xl font-bold ${step.color} font-display`}>{step.letter}</span>
              </div>
              <div>
                <h3 className={`text-base font-semibold ${step.color}`}>{step.label}</h3>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{step.tagline}</p>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg border border-border bg-card/50">
          {dtopModel.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`text-xs font-medium ${step.color}`}>{step.label}</span>
              {i < dtopModel.steps.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

export default PFSlide7DTOP;
