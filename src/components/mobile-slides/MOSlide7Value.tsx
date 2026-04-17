import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { valuePillars, internalValue } from "@/data/mobilePlaybook";
import { Smartphone, Layers, Bell, ShieldCheck, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Layers,
  Bell,
  ShieldCheck,
  Sparkles,
};

const MOSlide7Value = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="mo-value"
      title="Value Unlocked"
      subtitle="One shell, less friction, simpler delivery — for crews, operations and IT."
      slideNumber={7}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 flex-1">
          {valuePillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] || Sparkles;
            return (
              <div key={i} className="p-3 rounded-lg border border-border bg-card flex flex-col gap-2">
                <Icon className={`h-5 w-5 ${pillar.color}`} />
                <h3 className={`text-xs font-semibold ${pillar.color}`}>{pillar.title}</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{pillar.description}</p>
                <ul className="space-y-1 mt-auto">
                  {pillar.bullets.map((b, j) => (
                    <li key={j} className="text-[10px] text-foreground/70 flex gap-1.5">
                      <span className={`${pillar.color} shrink-0`}>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className={`text-[10px] font-medium ${pillar.color} pt-1 border-t border-border`}>{pillar.shift}</div>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
          <h3 className="text-sm font-semibold text-primary mb-2">{internalValue.headline}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {internalValue.points.map((p, i) => (
              <div key={i}>
                <h4 className="text-xs font-semibold text-foreground mb-1">{p.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default MOSlide7Value;
