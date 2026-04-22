import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { whyDTOPExists } from "@/data/dtopPlaybook";
import { AlertTriangle, Unlink, BookX, ShieldOff, HelpCircle, Theater, Info } from "lucide-react";
import StatSourceChip from "@/components/shared/StatSourceChip";

const icons = [AlertTriangle, Unlink, BookX, ShieldOff, HelpCircle, Theater];

const DTOPSlide1WhyExists = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="dtop-why" title="Why DTOP Exists" subtitle={whyDTOPExists.headline} slideNumber={1} {...props}>
      <div className="h-full flex flex-col gap-4">
        {/* Cost callout */}
        <div className="flex items-center gap-4 p-4 rounded-xl border border-destructive/30 bg-destructive/5">
          <span className="text-3xl sm:text-4xl font-display font-bold text-destructive shrink-0">{whyDTOPExists.industryExposure}</span>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{whyDTOPExists.exposureLabel}</p>
            <div className="mt-2">
              <StatSourceChip
                source={whyDTOPExists.industryExposureCitation}
                methodology={whyDTOPExists.industryExposureMethodology}
              />
            </div>
          </div>
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

        {/* Methodology footnote */}
        <div className="flex items-start gap-2 pt-2 border-t border-muted/10">
          <Info className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
            Industry exposure represents controllable cost addressable through connected safety, content & training systems — not total P&L impact. See Sources for the underlying benchmark stack.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default DTOPSlide1WhyExists;
