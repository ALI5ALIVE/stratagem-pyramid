import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import PlatformArchitectureDiagramV4 from "./PlatformArchitectureDiagramV4";

const PFSlide3Architecture = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="pf-architecture"
      title="The Architecture"
      subtitle="One integrated platform. Wired together by DTOP."
      slideNumber={3}
      {...props}
    >
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Diagram — 2/3 width */}
        <div className="lg:col-span-2 min-h-0">
          <PlatformArchitectureDiagramV4 />
        </div>

        {/* Reading guide — 1/3 width */}
        <div className="flex flex-col gap-2">
          <div className="p-3 rounded-lg border border-border bg-card">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">How to read this</p>
            <p className="text-xs text-foreground/80 leading-relaxed">
              The stack reads top-down. The frontline meets the platform at the top. Intelligence and action sit in the middle.
              Data and core apps sit at the base. DTOP wraps the whole stack as the operating model.
            </p>
          </div>
          <div className="p-3 rounded-lg border border-violet-500/30 bg-violet-500/5">
            <p className="text-[10px] uppercase tracking-wider text-violet-300 mb-1">Delivery</p>
            <p className="text-xs text-foreground/80 leading-relaxed">Unified Mobile App — where the platform meets the crew.</p>
          </div>
          <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
            <p className="text-[10px] uppercase tracking-wider text-amber-300 mb-1">Action</p>
            <p className="text-xs text-foreground/80 leading-relaxed">CoAnalyst, Insights & Recommendations and Automation turn data into action.</p>
          </div>
          <div className="p-3 rounded-lg border border-cyan-500/30 bg-cyan-500/5">
            <p className="text-[10px] uppercase tracking-wider text-cyan-300 mb-1">Substrate</p>
            <p className="text-xs text-foreground/80 leading-relaxed">One operational data foundation — customer-owned, governed.</p>
          </div>
          <div className="p-3 rounded-lg border border-blue-500/30 bg-blue-500/5">
            <p className="text-[10px] uppercase tracking-wider text-blue-300 mb-1">System of record</p>
            <p className="text-xs text-foreground/80 leading-relaxed">Content, Training and Safety — the operational core.</p>
          </div>
          <div className="p-3 rounded-lg border-2 border-emerald-500/40 bg-emerald-500/5">
            <p className="text-[10px] uppercase tracking-wider text-emerald-300 mb-1">Operating model</p>
            <p className="text-xs text-foreground/80 leading-relaxed">DTOP closes every loop — Detect, Trigger, Orchestrate, Prove.</p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default PFSlide3Architecture;
