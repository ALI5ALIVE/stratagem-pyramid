import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { valueCategories } from "@/data/dtopPlaybook";
import { Shield, Zap, CheckCircle, TrendingUp } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Shield, Zap, CheckCircle, TrendingUp };

const DTOPSlide7Value = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="dtop-value" title="The Value DTOP Unlocks" subtitle="Four measurable value categories from a single operating model" slideNumber={7} {...props}>
      <div className="h-full grid grid-cols-2 gap-3">
        {valueCategories.map((cat) => {
          const Icon = iconMap[cat.icon] || Shield;
          return (
            <div key={cat.title} className="p-4 rounded-lg border border-border bg-card flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-5 w-5 ${cat.color}`} />
                <h4 className="text-sm font-semibold text-foreground">{cat.title}</h4>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{cat.description}</p>
              <ul className="space-y-1.5 mt-auto">
                {cat.metrics.map((m, j) => (
                  <li key={j} className="text-[11px] text-foreground/80 flex items-start gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${cat.color.replace("text-", "bg-")} mt-1 shrink-0`} />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </SlideContainer>
  );
};

export default DTOPSlide7Value;
