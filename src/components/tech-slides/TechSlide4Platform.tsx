import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import PlatformArchitectureDiagram from "@/components/platform-slides/PlatformArchitectureDiagram";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const guide = [
  { tag: "Layer 5", title: "DTOP — The Way of Working", desc: "Detect, Trigger, Orchestrate, Prove — wraps the whole stack.", color: "text-emerald-400" },
  { tag: "Layer 4", title: "Unified Mobile", desc: "One trusted shell for the frontline — Content, Training, Safety.", color: "text-violet-400" },
  { tag: "Layer 3", title: "Intelligence & Orchestration", desc: "CoAnalyst · Insights & Recommendations · Automation.", color: "text-amber-400" },
  { tag: "Layer 2", title: "Operational Data Foundation", desc: "One unified data lake — the substrate every layer reasons over.", color: "text-cyan-400" },
  { tag: "Layer 1", title: "Core Operational Apps", desc: "ContentManager365 · TrainingManager365 · SafetyManager365.", color: "text-blue-400" },
];

const TechSlide4Platform = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-4"
    title="The Operational Performance Platform"
    subtitle="Five layers. One platform. Wired together by DTOP."
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 items-stretch">
      <div className="lg:col-span-2 flex items-center justify-center min-h-0">
        <div className="w-full">
          <PlatformArchitectureDiagram compact />
        </div>
      </div>
      <div className="grid grid-rows-5 gap-2 h-full">
        {guide.map((g) => (
          <div key={g.tag} className="rounded-xl border border-muted/20 bg-card/40 p-3 flex flex-col justify-center h-full">
            <div className="flex items-baseline gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${g.color}`}>{g.tag}</span>
              <span className="text-sm font-bold text-foreground">{g.title}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{g.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide4Platform;
