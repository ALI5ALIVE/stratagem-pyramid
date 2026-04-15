import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { commercialModel } from "@/data/regulationManagementPlaybook";
import { Receipt, Package, Layers, Code } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Receipt, Package, Layers, Code };

const colors = [
  { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400" },
  { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400" },
  { border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-400" },
  { border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400" },
];

const RMSlide8Commercial = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-commercial"
      title="Commercial Model"
      subtitle="Pricing and packaging strategy"
      slideNumber={8}
      {...props}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {commercialModel.map((cm, i) => {
          const Icon = iconMap[cm.icon] || Package;
          const c = colors[i % colors.length];
          return (
            <div key={cm.model} className={`border ${c.border} rounded-lg p-4 flex flex-col items-start`}>
              <div className={`h-10 w-10 rounded-lg ${c.bg} flex items-center justify-center mb-3`}>
                <Icon className={`h-5 w-5 ${c.text}`} />
              </div>
              <span className="text-sm font-semibold text-foreground mb-2">{cm.model}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{cm.description}</p>
            </div>
          );
        })}
      </div>
    </SlideContainer>
  );
};

export default RMSlide8Commercial;
