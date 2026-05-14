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
      <div className="h-full flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 items-start w-full">
        {valuePillars.map((pillar, i) => {
          const Icon = iconMap[pillar.icon] || Sparkles;
          return (
            <div key={i} className="p-2.5 rounded-lg border border-border bg-card flex flex-col gap-1.5">
              <Icon className={`h-4 w-4 ${pillar.color}`} />
              <h3 className={`text-xs font-semibold leading-tight ${pillar.color}`}>{pillar.title}</h3>
              <p className="text-[10px] text-foreground/60 leading-snug">{pillar.description}</p>
              <ul className="space-y-1">
                {pillar.bullets.map((b, j) => (
                  <li key={j} className="text-[10px] text-foreground/70 flex gap-1.5 leading-snug">
                    <span className={`${pillar.color} shrink-0`}>•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className={`text-[10px] font-medium ${pillar.color} pt-1.5 border-t border-border/50 leading-snug`}>{pillar.shift}</div>
            </div>
          );
        })}
        </div>
      </div>
    </SlideContainer>
  );
};

export default PFSlide9Value;
