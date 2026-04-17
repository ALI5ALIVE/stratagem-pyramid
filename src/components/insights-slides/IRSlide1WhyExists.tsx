import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { whyItExists } from "@/data/insightsPlaybook";
import { Database, FileBarChart, Layers, ShieldOff, EyeOff, Clock } from "lucide-react";

const icons = [Database, FileBarChart, Layers, ShieldOff, EyeOff, Clock];

const IRSlide1WhyExists = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ir-why" title="Why It Exists" subtitle={whyItExists.headline} slideNumber={1} {...props}>
      <div className="h-full flex flex-col gap-4">
        <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5">
          <p className="text-sm text-foreground/80">{whyItExists.exposureLabel}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
          {whyItExists.problems.map((problem, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="p-3 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-destructive/70 shrink-0" />
                  <h4 className="text-xs font-semibold text-foreground">{problem.label}</h4>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{problem.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SlideContainer>
  );
};

export default IRSlide1WhyExists;
