import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { MessageSquare, Database, Network, Brain, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const stages = [
  { n: "01", icon: MessageSquare, title: "Plain-English question", desc: "Captured in-app and parsed against the aviation taxonomy.", color: "text-amber-400", border: "border-amber-500/30 bg-amber-500/5" },
  { n: "02", icon: Database, title: "Connected operational data", desc: "Safety, content, training & ops pulled into a unified, tenant-isolated context.", color: "text-blue-400", border: "border-blue-500/30 bg-blue-500/5" },
  { n: "03", icon: Network, title: "Domain knowledge graph", desc: "4,000+ aviation categories at 5 levels link entities, events and procedures.", color: "text-cyan-400", border: "border-cyan-500/30 bg-cyan-500/5" },
  { n: "04", icon: Brain, title: "Domain-trained reasoning", desc: "Aviation ML models guide the LLM — cited evidence, no hallucinated micro-classifications.", color: "text-violet-400", border: "border-violet-500/30 bg-violet-500/5" },
  { n: "05", icon: ShieldCheck, title: "Guardrails & audit trail", desc: "Tenant isolation, source citations, full traceability for every answer.", color: "text-emerald-400", border: "border-emerald-500/30 bg-emerald-500/5" },
  { n: "06", icon: CheckCircle2, title: "Answer + recommended actions", desc: "Cross-domain insight returned with prescriptive next steps — ready to trigger downstream.", color: "text-rose-400", border: "border-rose-500/30 bg-rose-500/5" },
];

const SEPlatformInsightsIntelligence = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-platform-insights-intelligence"
    slideNumber={slideNumber}
    title="The Platform · Insights & Intelligence"
    subtitle="A platform-wide intelligence capability — just by asking"
    {...narrationProps}
  >
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-3">
        <p className="text-sm text-foreground/90 leading-relaxed">
          A platform-wide intelligence capability that lets any user ask operational questions in plain English
          and instantly receive insights, correlations and recommended actions across{" "}
          <span className="text-foreground font-semibold">Safety, Training, Content and Compliance</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">Ask</span>
          </div>
          <p className="text-sm italic text-foreground leading-snug">
            "Are dangerous goods incidents linked to training gaps?"
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Get back</span>
          </div>
          <p className="text-xs text-foreground/85 leading-relaxed">
            Instant cross-domain insight:{" "}
            <span className="text-foreground font-semibold">3 stations show DG handling spikes</span> — all three
            correlate with overdue DG recurrent training.{" "}
            <span className="text-emerald-300 font-semibold">Recommended actions generated.</span>
          </p>
        </div>
      </div>

      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h3 className="text-sm font-bold text-foreground">
          How it works · <span className="text-muted-foreground font-medium">behind the answer</span>
        </h3>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          reactive — you ask, the platform answers · 6 stages · seconds end-to-end
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 flex-1 min-h-0">
        {stages.map((s) => (
          <div key={s.n} className={`rounded-xl border ${s.border} p-3 flex flex-col gap-1.5`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-mono font-bold ${s.color}`}>{s.n}</span>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <div className={`text-xs font-bold ${s.color} leading-tight`}>{s.title}</div>
            <p className="text-[11px] text-muted-foreground leading-snug">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEPlatformInsightsIntelligence;
