import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { signalLifecycle } from "@/data/signalsPlaybook";

const SIGSlide4Lifecycle = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="sig-lifecycle"
      title="The signal lifecycle"
      subtitle="Every signal worth its name follows the same path: Detect → Trigger → Orchestrate → Prove. This is DTOP, applied to a single signal."
      slideNumber={4}
      {...props}
    >
      <div className="h-full flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-3 flex-1">
          {signalLifecycle.map((step, i) => (
            <div key={step.letter} className={`p-4 rounded-xl border ${step.border} ${step.bg} flex flex-col`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`h-10 w-10 rounded-lg border ${step.border} ${step.bg} flex items-center justify-center`}>
                  <span className={`text-xl font-bold ${step.color}`}>{step.letter}</span>
                </div>
                <div>
                  <h4 className={`text-sm font-semibold ${step.color}`}>{step.label}</h4>
                  <p className="text-[10px] text-muted-foreground">{step.tagline}</p>
                </div>
                <span className="ml-auto text-[10px] text-muted-foreground">0{i + 1}</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed mb-3">{step.description}</p>
              <div className="mt-auto pt-3 border-t border-border/50">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Example</p>
                <p className={`text-xs ${step.color} leading-relaxed`}>{step.example}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-sm">
          {signalLifecycle.map((s, i) => (
            <span key={s.letter} className="flex items-center gap-2">
              <span className={`font-bold ${s.color}`}>{s.label}</span>
              {i < signalLifecycle.length - 1 && <span className="text-muted-foreground">→</span>}
            </span>
          ))}
          <span className="text-muted-foreground ml-3">= a signal becomes operational control</span>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SIGSlide4Lifecycle;