import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import ArchitectureLayerBadge from "@/components/tech-slides/ArchitectureLayerBadge";
import { SlideNarrationProps } from "@/types/slideProps";
import { Zap, Workflow, ShieldCheck, FileCheck2, ArrowRight, UserCheck, Plug } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const pipeline = [
  { icon: Zap, label: "Triggers", desc: "Native events, webhooks, schedules — Outlook & Teams included.", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  { icon: Workflow, label: "Orchestration", desc: "No-code/low-code workflows. Reusable connectors. Centrally governed.", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  { icon: ShieldCheck, label: "Guardrails", desc: "Versioned, observable, testable. Conditional branching, retries, role-scoped.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  { icon: FileCheck2, label: "Audit Trail", desc: "Every execution logged: who, what, when, why. Audit-ready by default.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
];

const TechSlideAutomation = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-automation"
    title="Layer 3 · Intelligence & Orchestration — Automation"
    subtitle="One automation layer across the platform — closing the loop on cross-product workflows"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <ArchitectureLayerBadge active="intelligence" sublayer="automation" />
      {/* Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 auto-rows-fr shrink-0">
        {pipeline.map((s, i, arr) => (
          <div key={s.label} className="flex items-center gap-2 h-full">
            <div className={`flex-1 h-full rounded-xl border ${s.border} ${s.bg} p-4 flex flex-col`}>
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <span className={`text-sm font-bold ${s.color}`}>{s.label}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
            {i < arr.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0 hidden md:block" />}
          </div>
        ))}
      </div>

      {/* Worked example */}
      <div className="rounded-xl border border-primary/20 bg-card/40 p-4 flex-1 flex flex-col min-h-0">
        <div className="flex items-baseline justify-between mb-3 shrink-0">
          <h3 className="text-sm font-bold text-foreground">Cross-Product Workflow — Publish → Train → Assure</h3>
          <span className="text-[10px] text-muted-foreground">Zero manual handoffs · Zero custom code</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-fr items-stretch">
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3 h-full flex flex-col">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">1. Event</span>
            <p className="text-xs text-foreground mt-1.5 leading-relaxed">ContentManager365 fires a <em>procedure published</em> event with role, criticality and effective date.</p>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 h-full flex flex-col">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">2. Orchestrate</span>
            <p className="text-xs text-foreground mt-1.5 leading-relaxed">Workflow joins affected roles to TrainingManager365, opens a SafetyManager365 compliance checkpoint, notifies in Teams.</p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 h-full flex flex-col">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">3. Outcome</span>
            <p className="text-xs text-foreground mt-1.5 leading-relaxed">Training auto-assigned, acknowledgement tracked, exceptions surfaced — auditable trail end-to-end.</p>
          </div>
        </div>

        {/* Two callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 auto-rows-fr items-stretch">
          <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3 flex items-start gap-2 h-full">
            <UserCheck className="h-4 w-4 text-violet-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-bold text-violet-400">Human-in-the-loop by design</span>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Approval gates, optional review steps and override controls — automation augments operators, never bypasses them.</p>
            </div>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 flex items-start gap-2 h-full">
            <Plug className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-bold text-primary">Native connectors, not bespoke code</span>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Outlook, Teams, Slack, identity providers, customer data systems — integrations land in days, not months.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlideAutomation;
