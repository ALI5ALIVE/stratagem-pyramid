import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { whyDTOPExists } from "@/data/dtopPlaybook";
import { AlertTriangle, Unlink, BookX, ShieldOff, HelpCircle, Theater } from "lucide-react";

const icons = [AlertTriangle, Unlink, BookX, ShieldOff, HelpCircle, Theater];

const DTOPSlide1WhyExists = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="dtop-why" title="Why DTOP Exists" subtitle={whyDTOPExists.headline} slideNumber={1} {...props}>
      <div className="h-full flex flex-col gap-4">
        {/* Cost callout */}
        <div className="flex items-center gap-4 p-4 rounded-xl border border-destructive/30 bg-destructive/5">
          <span className="text-3xl sm:text-4xl font-display font-bold text-destructive">{whyDTOPExists.industryExposure}</span>
          <p className="text-sm text-muted-foreground">{whyDTOPExists.exposureLabel}</p>
        </div>

        {/* Problem grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
          {whyDTOPExists.problems.map((problem, i) => {
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

export default DTOPSlide1WhyExists;
