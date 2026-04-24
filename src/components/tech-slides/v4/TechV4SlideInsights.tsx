import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Search, Lightbulb, TrendingUp, Zap, CheckCircle2, ChevronRight } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const capabilities = [
  { icon: Search, title: "Pattern Detection", desc: "Cross-domain correlation surfaces patterns no single dashboard would catch — linking training gaps to safety events to procedural ambiguity.", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  { icon: Lightbulb, title: "Recommended Actions", desc: "Every insight is paired with a concrete next step — targeted training, procedure update, compliance review — with traceable reasoning.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  { icon: TrendingUp, title: "Trend & Foresight", desc: "Continuous, exploratory analysis turns reactive reporting into proactive risk identification — gaps surface before findings, not after.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
];

const workedSteps = [
  { icon: Search, label: "Ask", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", text: "COO asks the question in plain English — no BI build, no waiting." },
  { icon: Zap, label: "Correlate", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "Engine joins safety events, DG training completion, station rosters and procedure versions." },
  { icon: Lightbulb, label: "Insight", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", text: "3 hub stations show DG handling spikes — all three correlate with overdue DG recurrent training." },
  { icon: CheckCircle2, label: "Recommend", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "Targeted retraining for 180 ground crew, expedite SOP republish, audit pack generated." },
];

const TechV4SlideInsights = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-insights"
    title="The Platform · Recommendations & Prescriptive Actions"
    subtitle="From insight to prescriptive action — proactive signals across the platform"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      {/* 3 capability cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 auto-rows-fr shrink-0">
        {capabilities.map((c) => (
          <div key={c.title} className={`rounded-xl border ${c.border} ${c.bg} p-4 flex flex-col h-full`}>
            <c.icon className={`h-5 w-5 ${c.color} mb-2`} />
            <h3 className={`text-sm font-bold ${c.color} mb-1.5`}>{c.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Worked example with DTOP-style timeline */}
      <div className="rounded-xl border border-primary/20 bg-card/40 p-4 flex-1 flex flex-col min-h-0">
        <div className="flex items-baseline justify-between mb-3 shrink-0">
          <h3 className="text-sm font-bold text-foreground">Worked Example — Dangerous Goods Risk</h3>
          <span className="text-[10px] text-muted-foreground">Question to evidence-backed action plan in &lt;60 seconds</span>
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 mb-3 shrink-0">
          <p className="text-sm text-foreground italic">"Are dangerous goods incidents linked to training gaps?"</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 flex-1 auto-rows-fr items-stretch">
          {workedSteps.map((s, i, arr) => (
            <div key={s.label} className="flex items-center gap-2 h-full">
              <div className={`flex-1 h-full rounded-xl border ${s.border} ${s.bg} p-3 flex flex-col`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${s.color}`}>{s.label}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
              {i < arr.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground/40 shrink-0 hidden md:block" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechV4SlideInsights;
