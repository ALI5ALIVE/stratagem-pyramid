import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Radar, Zap, GitBranch, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const steps = [
  { icon: Radar, letter: "D", label: "Detect", description: "Ingest and correlate signals from FOQA, safety reports, audits, maintenance logs, and crew feedback.", auditTrail: "Hard landing detected: 1.8G threshold exceeded on RWY 27L, LHR — 3rd occurrence this month for fleet type.", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  { icon: Zap, letter: "T", label: "Trigger", description: "Automatically initiate the appropriate response — procedure review, training assignment, or investigation.", auditTrail: "Auto-trigger: Procedure review initiated for SOP-APP-27. Training assignment queued for 47 rated crew.", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  { icon: GitBranch, letter: "O", label: "Orchestrate", description: "Connect the right actions across safety, content, and training — automatically and in sequence.", auditTrail: "Orchestration: SOP-APP-27 v2.3 published. Sim scenario HL-27 assigned to 47 pilots. Completion due: 14 days.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
  { icon: BadgeCheck, letter: "P", label: "Prove", description: "Generate continuous, auditable evidence that the corrective action cycle is complete.", auditTrail: "Evidence: 47/47 pilots completed. Hard landing recurrence: -62% over 90 days. Audit package generated.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
];

const dataSources = ["FOQA/FDM", "Safety Reports", "Maintenance", "Crew Logs", "Regulatory", "Audit"];

const TechSlide5DTOP = ({ slideNumber, ...narrationProps }: Props) => {
  const [active, setActive] = useState<number | null>(null);
  return (
    <SalesSlideContainer id="tech-slide-5" title="Platform Architecture: DTOP" subtitle="Detect → Trigger → Orchestrate → Prove — the closed-loop operating model" slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 flex flex-col gap-3">
        {/* Data sources */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider mr-2">Data Sources</span>
          {dataSources.map((d) => (<span key={d} className="text-[10px] px-2 py-0.5 rounded-full border border-muted/30 bg-muted/10 text-muted-foreground">{d}</span>))}
        </div>

        {/* Pipeline */}
        <div className="grid grid-cols-4 gap-2 flex-1 min-h-0">
          {steps.map((s, i) => (
            <button key={s.letter} onClick={() => setActive(active === i ? null : i)} className={cn("rounded-lg border p-3 flex flex-col text-left transition-all h-full", s.border, s.bg, active === i && "ring-2 ring-primary")}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={cn("text-xl font-display font-bold", s.color)}>{s.letter}</span>
                <s.icon className={cn("h-5 w-5", s.color)} />
              </div>
              <h3 className={cn("text-sm font-bold mb-1", s.color)}>{s.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">{s.description}</p>
              {active === i && (
                <div className="mt-3 pt-3 border-t border-muted/20">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60">Audit Trail Example</span>
                  <p className="text-[10px] text-foreground/80 mt-1 italic leading-relaxed">{s.auditTrail}</p>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="p-2 rounded-lg border border-primary/20 bg-primary/5 text-center">
          <p className="text-sm text-muted-foreground"><span className="text-primary font-semibold">Every step is auditable.</span> Every action is traceable. Every outcome is provable.</p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide5DTOP;
