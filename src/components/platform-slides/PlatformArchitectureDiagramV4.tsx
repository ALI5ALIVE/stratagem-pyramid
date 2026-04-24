import { FileText, GraduationCap, ShieldCheck, Brain, Sparkles, Zap, Smartphone, Repeat } from "lucide-react";

/**
 * PlatformArchitectureDiagramV4
 * 4-layer stack visualisation for the v4 Technical Deep Dive.
 * Layers (top → bottom):
 *   L4. DTOP — System of Work (wraps the stack)
 *   L3. Unified Mobile Experience
 *   L2. Intelligence & Orchestration (data substrate folded in)
 *   L1. Core Operational Apps
 */
const PlatformArchitectureDiagramV4 = ({ compact = false }: { compact?: boolean }) => {
  const labelSize = compact ? "text-[10px]" : "text-[11px]";
  const titleSize = compact ? "text-xs" : "text-sm";

  return (
    <div className="w-full h-full flex flex-col gap-1.5">
      {/* L4 — DTOP */}
      <div className="rounded-lg border-2 border-emerald-500/50 bg-emerald-500/5 p-2.5 flex items-center gap-3">
        <Repeat className="h-5 w-5 text-emerald-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className={`${titleSize} font-semibold text-emerald-300`}>DTOP — The System of Work</div>
          <div className={`${labelSize} text-muted-foreground`}>Detect → Trigger → Orchestrate → Prove · wraps the whole stack</div>
        </div>
        <span className={`${labelSize} text-emerald-300/80 font-medium`}>System of work</span>
      </div>

      {/* L3 — Unified Mobile */}
      <div className="rounded-lg border border-violet-500/40 bg-violet-500/5 p-2.5 flex items-center gap-3">
        <Smartphone className="h-5 w-5 text-violet-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className={`${titleSize} font-semibold text-violet-300`}>Unified Mobile Experience</div>
          <div className={`${labelSize} text-muted-foreground`}>One trusted shell · SSO · Procedures · Training · Safety</div>
        </div>
        <span className={`${labelSize} text-violet-300/80 font-medium`}>Delivery</span>
      </div>

      {/* L2 — Intelligence & Orchestration (data substrate folded in) */}
      <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-2.5">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-5 w-5 text-amber-400 shrink-0" />
          <div className={`${titleSize} font-semibold text-amber-300 flex-1`}>Intelligence & Orchestration Layer</div>
          <span className={`${labelSize} text-amber-300/80 font-medium`}>System of action</span>
        </div>
        <div className={`${labelSize} text-muted-foreground mb-2 leading-tight`}>
          Built on a unified data substrate · taxonomy · knowledge graph · aviation LLMs
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-md border border-amber-500/30 bg-background/40 p-1.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Brain className="h-3 w-3 text-amber-400" />
              <span className={`${labelSize} font-semibold text-amber-300`}>Insights & Intelligence</span>
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight">Ask anything in plain English</div>
          </div>
          <div className="rounded-md border border-cyan-500/30 bg-background/40 p-1.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span className="text-[10px] font-semibold text-cyan-300">Recommendations & Prescriptive Actions</span>
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight">Patterns + prescriptive next steps</div>
          </div>
          <div className="rounded-md border border-violet-500/30 bg-background/40 p-1.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Zap className="h-3 w-3 text-violet-400" />
              <span className={`${labelSize} font-semibold text-violet-300`}>Automation</span>
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight">Cross-product workflows</div>
          </div>
        </div>
      </div>

      {/* L1 — Core Operational Apps */}
      <div className="rounded-lg border border-blue-500/40 bg-blue-500/5 p-2.5">
        <div className="flex items-center gap-2 mb-2">
          <div className={`${titleSize} font-semibold text-blue-300 flex-1`}>Core Operational Apps</div>
          <span className={`${labelSize} text-blue-300/80 font-medium`}>System of record</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-md border border-blue-500/30 bg-background/40 p-1.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <FileText className="h-3 w-3 text-blue-400" />
              <span className={`${labelSize} font-semibold text-blue-300`}>ContentManager365</span>
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight">Procedures · Manuals</div>
          </div>
          <div className="rounded-md border border-emerald-500/30 bg-background/40 p-1.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <GraduationCap className="h-3 w-3 text-emerald-400" />
              <span className={`${labelSize} font-semibold text-emerald-300`}>TrainingManager365</span>
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight">Competence · Recurrency</div>
          </div>
          <div className="rounded-md border border-rose-500/30 bg-background/40 p-1.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <ShieldCheck className="h-3 w-3 text-rose-400" />
              <span className={`${labelSize} font-semibold text-rose-300`}>SafetyManager365</span>
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight">Occurrences · Audits · Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformArchitectureDiagramV4;