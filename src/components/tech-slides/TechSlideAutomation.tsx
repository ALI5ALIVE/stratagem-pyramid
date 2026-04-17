import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
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
    title="Automation & Orchestration"
    subtitle="One automation layer across the platform — closing the loop on cross-product workflows"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      {/* Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {pipeline.map((s, i, arr) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className={`flex-1 rounded-xl border ${s.border} ${s.bg} p-3 flex flex-col`}>
              <div className="flex items-center gap-2 mb-1.5">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <span className={`text-sm font-bold ${s.color}`}>{s.label}</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">{s.desc}</p>
            </div>
            {i < arr.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0 hidden md:block" />}
          </div>
        ))}
      </div>

      {/* Worked example */}
      <div className="rounded-xl border border-primary/20 bg-card/40 p-4 flex-1 min-h-0">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="text-sm font-bold text-foreground">Cross-Product Workflow — Publish → Train → Assure</h3>
          <span className="text-[10px] text-muted-foreground">Zero manual handoffs · Zero custom code</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-2.5">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">1. Event</span>
            <p className="text-[11px] text-foreground mt-1">ContentManager365 fires a <em>procedure published</em> event with role, criticality and effective date.</p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-2.5">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">2. Orchestrate</span>
            <p className="text-[11px] text-foreground mt-1">Workflow joins affected roles to TrainingManager365, opens a SafetyManager365 compliance checkpoint, notifies in Teams.</p>
          </div>
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-2.5">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">3. Outcome</span>
            <p className="text-[11px] text-foreground mt-1">Training auto-assigned, acknowledgement tracked, exceptions surfaced — auditable trail end-to-end.</p>
          </div>
        </div>

        {/* Two callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
          <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 p-2.5 flex items-start gap-2">
            <UserCheck className="h-4 w-4 text-violet-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-violet-400">Human-in-the-loop by design</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">Approval gates, optional review steps and override controls — automation augments operators, never bypasses them.</p>
            </div>
          </div>
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-2.5 flex items-start gap-2">
            <Plug className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-primary">Native connectors, not bespoke code</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">Outlook, Teams, Slack, identity providers, customer data systems — integrations land in days, not months.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlideAutomation;
