import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/regulationManagementPlaybook";
import { Badge } from "@/components/ui/badge";

const dtopSteps = [
  { letter: "D", text: "text-sky-400", border: "border-sky-500/40" },
  { letter: "T", text: "text-amber-400", border: "border-amber-500/40" },
  { letter: "O", text: "text-violet-400", border: "border-violet-500/40" },
  { letter: "P", text: "text-emerald-400", border: "border-emerald-500/40" },
];

// Split each use case's scenario+outcome into a 4-beat DTOP arc.
// Detect/Trigger lifted from the "scenario" sentence; Orchestrate/Prove from "outcome".
const splitToDtop = (scenario: string, outcome: string): string[] => {
  const sParts = scenario.split(/\.\s+/).filter(Boolean);
  const oParts = outcome.split(/\.\s+/).filter(Boolean);
  const detect = sParts[0] || scenario;
  const trigger = sParts[1] || sParts[0] || "Manual cross-checking required today.";
  const orchestrate = oParts[0] || outcome;
  const prove = oParts[1] || oParts[0] || "Audit-ready evidence is captured automatically.";
  return [detect, trigger, orchestrate, prove].map((s) => s.replace(/\.$/, "") + ".");
};

const RMSlide6UseCases = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-use-cases"
      title="Use Cases & Scenarios"
      subtitle="How Regulation Management delivers in practice"
      slideNumber={7}
      {...props}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {useCases.map((uc, i) => {
          const beats = splitToDtop(uc.scenario, uc.outcome);
          return (
            <div key={i} className="border border-border rounded-lg p-3 flex flex-col">
              <span className="text-xs font-semibold text-foreground mb-2">{uc.title}</span>
              <div className="flex-1 flex flex-col gap-1.5 mb-2">
                {dtopSteps.map((step, j) => (
                  <div key={step.letter} className="flex gap-1.5 items-start">
                    <span
                      className={`shrink-0 h-4 w-4 rounded border ${step.border} ${step.text} text-[9px] font-bold flex items-center justify-center`}
                    >
                      {step.letter}
                    </span>
                    <p className="text-[10px] text-muted-foreground leading-snug">
                      {beats[j]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mt-auto">
                {uc.products.map((p) => (
                  <Badge key={p} variant="secondary" className="text-[9px] px-1.5 py-0">{p}</Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SlideContainer>
  );
};

export default RMSlide6UseCases;
