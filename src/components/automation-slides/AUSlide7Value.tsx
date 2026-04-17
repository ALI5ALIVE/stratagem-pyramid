import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { valuePillars, internalValue } from "@/data/automationPlaybook";
import { Workflow, GitBranch, Plug, Rocket, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Workflow, GitBranch, Plug, Rocket, Sparkles };

const AUSlide7Value = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="au-value"
      title="Value Unlocked"
      subtitle="Customer outcomes + why it matters for Comply365"
      slideNumber={7}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 flex-1">
          {valuePillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] || Sparkles;
            return (
              <div key={i} className="p-3 rounded-lg border border-border bg-card flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${pillar.color}`} />
                  <h4 className={`text-xs font-bold ${pillar.color}`}>{pillar.title}</h4>
                </div>
                <p className="text-[11px] text-foreground/80 leading-relaxed">{pillar.description}</p>
                <ul className="space-y-1 mt-auto">
                  {pillar.bullets.map((b, j) => (
                    <li key={j} className="text-[10px] text-muted-foreground flex items-start gap-1">
                      <span className={`${pillar.color} shrink-0`}>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className={`mt-1 pt-2 border-t border-border text-[10px] ${pillar.color} font-medium`}>
                  {pillar.shift}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
          <p className="text-[10px] uppercase tracking-wider text-primary mb-2 font-medium">{internalValue.headline}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {internalValue.points.map((p, i) => (
              <div key={i} className="p-2 rounded-md border border-border bg-card/50">
                <h5 className="text-xs font-semibold text-foreground mb-1">{p.title}</h5>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default AUSlide7Value;
