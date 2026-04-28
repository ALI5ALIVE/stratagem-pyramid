import { useState, useEffect, useCallback, useRef } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import PlatformArchitectureDiagramV4 from "@/components/platform-slides/PlatformArchitectureDiagramV4";
import { ChevronRight } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

export interface JumpTargets {
  dtop?: string;
  mobile?: string;
  intelligence?: string;
  core?: string;
}

interface Props extends SlideNarrationProps {
  slideNumber?: number;
  jumpTargets?: JumpTargets;
}

const DEFAULT_TARGETS: Required<JumpTargets> = {
  dtop: "tech-divider-dtop",
  mobile: "tech-divider-mobile",
  intelligence: "tech-divider-intelligence",
  core: "tech-divider-core",
};

const TechV4PlatformOverview = ({ slideNumber, jumpTargets, ...narrationProps }: Props) => {
  const targets = { ...DEFAULT_TARGETS, ...(jumpTargets ?? {}) };
  const guide = [
    { key: "dtop", tag: "Platform", title: "DTOP — The Way of Working", desc: "Detect, Trigger, Orchestrate, Prove — wraps the whole stack.", color: "text-emerald-400", target: targets.dtop },
    { key: "mobile", tag: "Platform", title: "Unified Mobile", desc: "One trusted shell for the frontline — Content, Training, Safety.", color: "text-violet-400", target: targets.mobile },
    { key: "intelligence", tag: "Platform", title: "Intelligence & Orchestration", desc: "Data substrate (taxonomy · graph · LLMs) + Insights · Recommendations · Automation.", color: "text-amber-400", target: targets.intelligence },
    { key: "core", tag: "Foundation", title: "Core Operational Apps", desc: "ContentManager365 · TrainingManager365 · SafetyManager365.", color: "text-blue-400", target: targets.core },
  ];

  const [resolved, setResolved] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const check = () => {
      const next: Record<string, boolean> = {};
      for (const g of guide) next[g.key] = !!(g.target && document.getElementById(g.target));
      setResolved(next);
    };
    check();
    const t = window.setTimeout(check, 400);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targets.dtop, targets.mobile, targets.intelligence, targets.core]);

  const jumpTo = useCallback((id?: string) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const renderRow = (g: typeof guide[number], opts: { foundation?: boolean }) => {
    const canJump = !!resolved[g.key];
    const baseCls = opts.foundation
      ? "text-left rounded-xl border border-muted/20 bg-card/40 transition-all p-2.5 flex flex-col justify-center group"
      : "text-left rounded-lg border border-muted/20 bg-card/40 transition-all p-2.5 flex flex-col justify-center flex-1 group";
    const interactive = canJump ? " hover:bg-card/70 hover:border-primary/40 cursor-pointer" : "";
    if (canJump) {
      return (
        <button
          key={g.key}
          type="button"
          onClick={() => jumpTo(g.target)}
          title={`Jump to ${g.title}`}
          className={baseCls + interactive}
        >
          <div className="flex items-baseline gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${g.color}`}>{g.tag}</span>
            <span className="text-sm font-bold text-foreground">{g.title}</span>
            {opts.foundation && (
              <span className="ml-2 text-[9px] uppercase tracking-wider text-muted-foreground/70">Foundation</span>
            )}
            <span className={`ml-auto inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider ${g.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
              jump <ChevronRight className="h-2.5 w-2.5" />
            </span>
          </div>
          {!opts.foundation && (
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{g.desc}</p>
          )}
        </button>
      );
    }
    return (
      <div key={g.key} className={baseCls}>
        <div className="flex items-baseline gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${g.color}`}>{g.tag}</span>
          <span className="text-sm font-bold text-foreground">{g.title}</span>
          {opts.foundation && (
            <span className="ml-2 text-[9px] uppercase tracking-wider text-muted-foreground/70">Foundation</span>
          )}
        </div>
        {!opts.foundation && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{g.desc}</p>
        )}
      </div>
    );
  };

  const anyJump = Object.values(resolved).some(Boolean);

  return (
    <SalesSlideContainer
      id="tech-slide-4"
      title="The Operational Performance Platform"
      subtitle={anyJump
        ? "One integrated platform. Wired together by DTOP. · Click any capability to jump."
        : "One integrated platform. Wired together by DTOP."}
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
            The Platform · The Foundation
          </div>
          <div className="relative flex-1 rounded-xl border-2 border-primary/30 bg-primary/5 p-2 pt-5 flex flex-col gap-2">
            <div className="absolute -top-2 left-3 px-2 bg-background">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
                The Platform · One Integrated Solution
              </span>
            </div>
            {guide.slice(0, 3).map((g) => renderRow(g, { foundation: false }))}
          </div>
          {guide.slice(3).map((g) => renderRow(g, { foundation: true }))}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

// Suppress unused-import warning for refs left in case future versions need them
void useRef;

export default TechV4PlatformOverview;
