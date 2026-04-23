import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { howItWorksLayers } from "@/data/regulationManagementPlaybook";
import { Database, Network, Brain } from "lucide-react";

const layerIcons = [Database, Network, Brain];
const layerColors = [
  { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", bullet: "bg-blue-400" },
  { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", bullet: "bg-emerald-400" },
  { border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400", bullet: "bg-violet-400" },
];

// Layer → DTOP mapping (canonical overlay)
const layerDtop = [
  { label: "Detect", className: "text-sky-400 border-sky-500/40 bg-sky-500/10" },
  { label: "Orchestrate", className: "text-violet-400 border-violet-500/40 bg-violet-500/10" },
  { label: "Trigger + Prove", className: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
];

const RMSlide5HowItWorks = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-how-it-works"
      title="How It Works"
      subtitle="Three-layer delivery model"
      slideNumber={5}
      {...props}
    >
      <div className="flex flex-col gap-3">
        {howItWorksLayers.map((layer, i) => {
          const Icon = layerIcons[i];
          const c = layerColors[i];
          return (
            <div key={layer.layer} className={`border ${c.border} rounded-lg p-4 flex gap-4`}>
              <div className={`h-10 w-10 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-5 w-5 ${c.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${c.text}`}>Layer {layer.layer}</span>
                  <span className="text-sm font-semibold text-foreground">{layer.title}</span>
                  <span
                    className={`ml-auto text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${layerDtop[i].className}`}
                  >
                    DTOP · {layerDtop[i].label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{layer.description}</p>
                <div className="grid grid-cols-2 gap-1">
                  {layer.details.map((d, j) => (
                    <div key={j} className="flex items-start gap-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${c.bullet} mt-1.5 shrink-0`} />
                      <span className="text-[10px] text-muted-foreground">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SlideContainer>
  );
};

export default RMSlide5HowItWorks;
