import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import ArchitectureLayerBadge from "@/components/tech-slides/ArchitectureLayerBadge";
import { SlideNarrationProps } from "@/types/slideProps";
import { Radar, Zap, GitBranch, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const steps = [
  { icon: Radar, letter: "D", label: "Detect", description: "Ingest and correlate signals from safety reports, operational data, audits, maintenance logs, and crew feedback.", auditTrail: "DG incident pattern detected: 6 procedural non-compliance events in 30 days — correlated with cold weather operations.", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  { icon: Zap, letter: "T", label: "Trigger", description: "Automatically initiate the appropriate response — procedure review, training assignment, or investigation.", auditTrail: "Auto-trigger: Procedural review initiated for DG-COLD-OPS SOP. Training assignment queued for 85 ground handling crew.", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  { icon: GitBranch, letter: "O", label: "Orchestrate", description: "Connect the right actions across safety, content, and training — automatically and in sequence.", auditTrail: "Orchestration: DG-COLD-OPS v2.1 published. Refresher training assigned to 85 crew. Completion due: 14 days.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
  { icon: BadgeCheck, letter: "P", label: "Prove", description: "Generate continuous, auditable evidence that the recommended action cycle is complete.", auditTrail: "Evidence: 85/85 crew completed. DG incident recurrence: -72% over 90 days. Audit package generated.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
];

const dataSources = ["Safety Reports", "Operational Data", "Maintenance", "Crew Logs", "Regulatory", "Audit"];

const TechV4Slide5DTOP = ({ slideNumber, ...narrationProps }: Props) => {
  const [active, setActive] = useState<number | null>(null);
  return (
    <SalesSlideContainer id="tech-slide-5" title="The Platform · DTOP — The System of Work" subtitle="Detect → Trigger → Orchestrate → Prove — the closed-loop operating model" slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <ArchitectureLayerBadge active="dtop" />
        {/* Data sources */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2 font-semibold">Data Sources</span>
          {dataSources.map((d) => (<span key={d} className="text-xs px-3 py-1 rounded-full border border-muted/30 bg-muted/10 text-muted-foreground">{d}</span>))}
        </div>

        {/* Pipeline — equal height; reserve room for audit trail */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1 min-h-0 auto-rows-fr items-stretch">
          {steps.map((s, i) => (
            <button key={s.letter} onClick={() => setActive(active === i ? null : i)} className={cn("rounded-xl border p-4 flex flex-col text-left transition-all h-full", s.border, s.bg, active === i && "ring-2 ring-primary")}>
              <div className="flex items-center gap-2 mb-2">
                <span className={cn("text-2xl font-display font-bold", s.color)}>{s.letter}</span>
                <s.icon className={cn("h-5 w-5", s.color)} />
              </div>
              <h3 className={cn("text-base font-bold mb-1.5", s.color)}>{s.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
              <div className="mt-auto pt-3 border-t border-muted/20">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">Audit Trail Example</span>
                <p className={cn("text-xs mt-1 italic leading-relaxed transition-opacity align-top", active === i ? "text-foreground/90 opacity-100" : "text-muted-foreground opacity-90")}>{s.auditTrail}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 text-center shrink-0">
          <p className="text-sm text-muted-foreground"><span className="text-primary font-semibold">Every step is auditable.</span> Every action is traceable. Every outcome is provable.</p>
        </div>
        <div className="flex justify-end shrink-0 -mt-2">
          <span className="text-[10px] text-muted-foreground/80 px-2 py-0.5 rounded-full border border-muted/30 bg-muted/10">DG = Dangerous Goods</span>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechV4Slide5DTOP;
