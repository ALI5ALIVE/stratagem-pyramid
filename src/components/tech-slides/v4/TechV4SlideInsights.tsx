import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Radar, ListOrdered, TrendingUp, Activity, Filter, ClipboardList, Gauge, ChevronRight, Sparkles, AlertTriangle } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const capabilities = [
  { icon: Radar, title: "Continuous Pattern Detection", desc: "The platform watches operational data 24/7, correlating safety, training, content and ops — no question required, no dashboard to build.", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  { icon: ListOrdered, title: "Prescriptive Action Plans", desc: "Not a single suggestion — a ranked plan: what to do, where, in what order, by whom, with predicted impact and effort.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  { icon: TrendingUp, title: "Predicted Impact & Foresight", desc: "Each action carries a forecast — risk reduction, compliance exposure closed, hours saved — so leaders prioritise on outcome, not opinion.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
];

const workedSteps = [
  { icon: Activity, label: "Detect", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", text: "Continuous correlation across 90 days of safety events, training records, station rosters and procedure versions flags an emerging pattern." },
  { icon: Filter, label: "Prioritise", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "Ranks 3 hubs by predicted incident likelihood × operational exposure; deprioritises 2 stations that volume-based dashboards would have flagged." },
  { icon: ClipboardList, label: "Prescribe", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", text: "Generates a sequenced plan: retrain 180 ground crew (week 1), republish DG SOP v4.2 (week 1), targeted station audits (week 3) — with named owners." },
  { icon: Gauge, label: "Prove", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "Forecasts 60–70% incident reduction over 90 days; closes the loop into DTOP for tracking and audit evidence." },
];

const TechV4SlideInsights = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-insights"
    title="The Platform · Recommendations & Prescriptive Actions"
    subtitle="Always-on pattern detection across the platform — surfacing prioritised actions before anyone thinks to ask."
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <div className="shrink-0 flex justify-start">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
          <Sparkles className="h-3 w-3" /> Future Vision · Roadmap Capability
        </span>
      </div>
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
          <h3 className="text-sm font-bold text-foreground">Worked Example — Proactive DG Risk Signal</h3>
          <span className="text-[10px] text-muted-foreground">From signal to sequenced plan — before the first incident</span>
        </div>
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 mb-3 shrink-0 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-[0.18em] text-amber-300 font-bold">No question asked — platform proactively flags</span>
            <p className="text-sm text-foreground font-medium">"DG handling risk rising at 3 hubs over next 30 days."</p>
          </div>
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
