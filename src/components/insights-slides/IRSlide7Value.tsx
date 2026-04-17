import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { valuePillars, internalValue } from "@/data/insightsPlaybook";
import { Sparkles, Network, ShieldAlert, ClipboardCheck, Target } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Network,
  ShieldAlert,
  ClipboardCheck,
  Target,
};

const IRSlide7Value = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="ir-value"
      title="Value Unlocked"
      subtitle="Five customer-facing shifts — and what it means for Comply365"
      slideNumber={7}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 flex-1">
          {valuePillars.map((pillar) => {
            const Icon = iconMap[pillar.icon] || Sparkles;
            return (
              <div key={pillar.title} className="p-3 rounded-lg border border-border bg-card flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${pillar.color}`} />
                  <h4 className="text-xs font-semibold text-foreground leading-tight">{pillar.title}</h4>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{pillar.description}</p>
                <ul className="space-y-1 mt-auto">
                  {pillar.bullets.map((b, j) => (
                    <li key={j} className="text-[10px] text-foreground/80 flex items-start gap-1.5">
                      <span className={`w-1 h-1 rounded-full ${pillar.color.replace("text-", "bg-")} mt-1.5 shrink-0`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className={`mt-1 pt-2 border-t border-border/50 text-[10px] font-medium ${pillar.color}`}>
                  {pillar.shift}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
          <p className="text-[10px] uppercase tracking-wider text-primary mb-2 font-medium">{internalValue.headline}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {internalValue.points.map((p) => (
              <div key={p.title}>
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

export default IRSlide7Value;
