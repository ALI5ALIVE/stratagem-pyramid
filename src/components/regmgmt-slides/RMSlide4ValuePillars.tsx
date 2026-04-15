import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { valuePillars } from "@/data/regulationManagementPlaybook";
import { Eye, Network, Shield, Sparkles, Blocks } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Eye, Network, Shield, Sparkles, Blocks };

const colors = [
  { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400" },
  { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400" },
  { border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-400" },
  { border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400" },
  { border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-400" },
];

const RMSlide4ValuePillars = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-value-pillars"
      title="Value Pillars"
      subtitle="Five pillars of Regulation Management value"
      slideNumber={4}
      {...props}
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {valuePillars.map((p, i) => {
          const Icon = iconMap[p.icon] || Eye;
          const c = colors[i % colors.length];
          return (
            <div key={p.title} className={`border ${c.border} rounded-lg p-3 flex flex-col`}>
              <div className={`h-8 w-8 rounded ${c.bg} flex items-center justify-center mb-2`}>
                <Icon className={`h-4 w-4 ${c.text}`} />
              </div>
              <span className="text-xs font-semibold text-foreground mb-1">{p.title}</span>
              <p className="text-[10px] text-muted-foreground leading-relaxed flex-1">{p.description}</p>
              {p.metrics && (
                <p className={`text-[10px] font-medium mt-2 ${c.text}`}>{p.metrics}</p>
              )}
            </div>
          );
        })}
      </div>
    </SlideContainer>
  );
};

export default RMSlide4ValuePillars;
