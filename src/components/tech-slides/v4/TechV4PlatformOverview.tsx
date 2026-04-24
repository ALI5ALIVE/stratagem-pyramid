import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import PlatformArchitectureDiagramV4 from "@/components/platform-slides/PlatformArchitectureDiagramV4";
import { ChevronRight } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const guide = [
  { tag: "Layer 4", title: "DTOP — The Way of Working", desc: "Detect, Trigger, Orchestrate, Prove — wraps the whole stack.", color: "text-emerald-400", target: "tech-divider-dtop" },
  { tag: "Layer 3", title: "Unified Mobile", desc: "One trusted shell for the frontline — Content, Training, Safety.", color: "text-violet-400", target: "tech-divider-mobile" },
  { tag: "Layer 2", title: "Intelligence & Orchestration", desc: "Data substrate (taxonomy · graph · LLMs) + Insights · Recommendations · Automation.", color: "text-amber-400", target: "tech-divider-intelligence" },
  { tag: "Layer 1", title: "Core Operational Apps", desc: "ContentManager365 · TrainingManager365 · SafetyManager365.", color: "text-blue-400", target: "tech-divider-core" },
];

const TechV4PlatformOverview = ({ slideNumber, ...narrationProps }: Props) => {
  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SalesSlideContainer
      id="tech-slide-4"
      title="The Operational Performance Platform"
      subtitle="Four layers. One platform. Wired together by DTOP. · Click any layer to jump."
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 items-stretch">
        <div className="lg:col-span-2 flex items-center justify-center min-h-0">
          <div className="w-full">
            <PlatformArchitectureDiagramV4 compact />
          </div>
        </div>
        <div className="flex flex-col gap-2 h-full">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Layers 2–4 = The Platform · Layer 1 = The Foundation
          </div>
          {/* Platform group: L4, L3, L2 (top-down) */}
          <div className="relative flex-1 rounded-xl border-2 border-primary/30 bg-primary/5 p-2 pt-5 flex flex-col gap-2">
            <div className="absolute -top-2 left-3 px-2 bg-background">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
                The Platform · One Integrated Solution
              </span>
            </div>
            {guide.slice(0, 3).map((g) => (
              <button
                key={g.tag}
                type="button"
                onClick={() => jumpTo(g.target)}
                title={`Jump to ${g.title}`}
                className="text-left rounded-lg border border-muted/20 bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all p-2.5 flex flex-col justify-center flex-1 group cursor-pointer"
              >
                <div className="flex items-baseline gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${g.color}`}>{g.tag}</span>
                  <span className="text-sm font-bold text-foreground">{g.title}</span>
                  <span className={`ml-auto inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider ${g.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
                    jump <ChevronRight className="h-2.5 w-2.5" />
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{g.desc}</p>
              </button>
            ))}
          </div>
          {/* Foundation: L1 sits outside the bracket */}
          {guide.slice(3).map((g) => (
            <button
              key={g.tag}
              type="button"
              onClick={() => jumpTo(g.target)}
              title={`Jump to ${g.title}`}
              className="text-left rounded-xl border border-muted/20 bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all p-2.5 flex flex-col justify-center group cursor-pointer"
            >
              <div className="flex items-baseline gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${g.color}`}>{g.tag}</span>
                <span className="text-sm font-bold text-foreground">{g.title}</span>
                <span className="ml-2 text-[9px] uppercase tracking-wider text-muted-foreground/70">Foundation</span>
                <span className={`ml-auto inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider ${g.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
                  jump <ChevronRight className="h-2.5 w-2.5" />
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{g.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechV4PlatformOverview;