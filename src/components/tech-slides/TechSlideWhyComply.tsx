import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Link2, Brain, ShieldCheck, Plane, Globe, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const diffs = [
  { icon: Link2, title: "Connected Foundation", desc: "One data model, three core apps, one intelligence layer for Content, training and safety.", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  { icon: Brain, title: "Domain-Trained Intelligence", desc: "Insights & Intelligence built on aviation data. Not a generic AI with an aviation wrapper — purpose-built for the operational corpus.", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  { icon: ShieldCheck, title: "Proof by Design", desc: "Every action logged automatically. The audit trail is a byproduct, not a report. Closed loop — Detect, Trigger, Orchestrate, Prove.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
];

const trust = [
  { icon: Plane, value: "550+", label: "Airlines Worldwide" },
  { icon: Users, value: "~2.5M", label: "Users" },
  { icon: Globe, value: "6", label: "Continents" },
];

const TechSlideWhyComply = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-why-comply"
    title="Why Comply365"
    subtitle="Point solutions manage silos. Generic AI creates noise. We close the loop with the Comply365 Operational Performance Platform."
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex flex-col gap-4 flex-1 justify-center">
      {/* 3 differentiators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {diffs.map((d) => (
          <div key={d.title} className={`rounded-xl border ${d.border} ${d.bg} p-4`}>
            <d.icon className={`h-6 w-6 ${d.color} mb-2`} />
            <h3 className={`text-base font-bold ${d.color} mb-1.5`}>{d.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
          </div>
        ))}
      </div>

      {/* Trust signals */}
      <div className="rounded-xl border border-primary/20 bg-card/40 p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          {trust.map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <t.icon className="h-4 w-4 text-primary" />
              <span className="text-base font-bold text-foreground">{t.value}</span>
              <span className="text-[11px] text-muted-foreground">{t.label}</span>
            </div>
          ))}
        </div>
        <Link
          to="/pitch-technical-v4"
          className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 hover:bg-primary/20 transition-colors px-3 py-1.5 text-xs font-semibold text-primary"
        >
          Deep dive · Platform &amp; Use Cases
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlideWhyComply;
