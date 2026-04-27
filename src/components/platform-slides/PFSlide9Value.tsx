import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { valuePillars } from "@/data/platformPlaybook";
import { Boxes, Brain, Smartphone, Repeat, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Boxes, Brain, Smartphone, Repeat, Sparkles };

interface PFSlide9ValueProps extends SlideNarrationProps {
  slideNumber?: number;
}

const PFSlide9Value = ({ slideNumber, ...props }: PFSlide9ValueProps) => {
  return (
    <SlideContainer
      id="pf-value"
      title="Value Unlocked"
      subtitle="Five shifts that only one connected platform can deliver."
      slideNumber={slideNumber ?? 9}
      {...props}
    >
      <div className="h-full grid grid-cols-1 md:grid-cols-5 gap-2">
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
    </SlideContainer>
  );
};

export default PFSlide9Value;
