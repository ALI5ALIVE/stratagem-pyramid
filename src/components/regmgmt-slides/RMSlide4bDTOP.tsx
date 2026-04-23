import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { dtopMapping } from "@/data/regulationManagementPlaybook";

const RMSlide4bDTOP = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-dtop"
      title="Regulation Management on the DTOP Operating Model"
      subtitle="How always-current regulation data flows through Detect → Trigger → Orchestrate → Prove"
      slideNumber={5}
      {...props}
    >
      <div className="flex flex-col gap-3 h-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1 min-h-0">
          {dtopMapping.map((s) => (
            <div
              key={s.step}
              className={`border ${s.border} ${s.bg} rounded-lg p-3 flex flex-col`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`h-9 w-9 rounded-md ${s.bg} ${s.border} border flex items-center justify-center`}
                >
                  <span className={`text-lg font-bold ${s.text}`}>{s.step}</span>
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${s.text}`}>
                  {s.label}
                </span>
              </div>
              <p className="text-[11px] text-foreground/85 leading-relaxed mb-3">
                {s.whatHappens}
              </p>
              <div className="mt-auto space-y-2">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Connected modules
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {s.modules.map((m) => (
                      <span
                        key={m}
                        className={`text-[9px] px-1.5 py-0.5 rounded border ${s.border} ${s.text}`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-border/40">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Evidence
                  </span>
                  <p className={`text-[10px] ${s.text} font-medium mt-0.5`}>{s.evidence}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-center shrink-0">
          <p className="text-xs text-foreground/90">
            Every regulatory change generates a complete audit trail —{" "}
            <span className="text-primary font-semibold">from detection to closure</span> —
            across every connected module.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default RMSlide4bDTOP;