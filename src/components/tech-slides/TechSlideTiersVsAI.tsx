import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, Bell, Eye, TrendingUp, Check, X } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const tiers = [
  { icon: Clock, tier: "Historical", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30", desc: "Query past events in plain English" },
  { icon: Bell, tier: "Reactive", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30", desc: "Real-time alerts on threshold breach" },
  { icon: Eye, tier: "Proactive", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", desc: "Pattern detection before incidents" },
  { icon: TrendingUp, tier: "Predictive", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30", desc: "Probabilistic risk modelling" },
];

const accuracy = [
  { level: "Level 1 — Occurrence Type (~50)", co: "~95%", gen: "~90%" },
  { level: "Level 2–3 — Event → Specific (hundreds)", co: "~92%", gen: "~60%" },
  { level: "Level 4–5 — Cause → Root (thousands)", co: "~90%", gen: "30–40%" },
];

const rows = [
  { cap: "4,000+ category taxonomy (5 levels)", co: true, gen: false },
  { cap: "Hybrid AI: domain ML + LLMs", co: true, gen: false },
  { cap: "Cross-report pattern recognition", co: true, gen: false },
  { cap: "Proactive hazard detection", co: true, gen: false },
  { cap: "Predictive recurrence modelling", co: true, gen: false },
  { cap: "Low hallucination on aviation data", co: true, gen: false },
  { cap: "60+ language translation", co: true, gen: true },
  { cap: "Summarisation & basic Q&A", co: true, gen: true },
];

const TechSlideTiersVsAI = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-tiers-vs-ai"
    title="Intelligence Tiers & Why Generic AI Falls Short"
    subtitle="Four tiers of operational intelligence — and the precision gap generic AI cannot close"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex flex-col gap-3 flex-1 min-h-0">
      {/* Tiers row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {tiers.map((t) => (
          <div key={t.tier} className={`rounded-lg border ${t.border} ${t.bg} p-2.5 flex flex-col`}>
            <div className="flex items-center gap-2 mb-1">
              <t.icon className={`h-4 w-4 ${t.color}`} />
              <h3 className={`text-sm font-bold ${t.color}`}>{t.tier}</h3>
            </div>
            <p className="text-[11px] text-muted-foreground">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom: capability table + accuracy/risk */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 flex-1 min-h-0">
        <div className="lg:col-span-3 rounded-lg border border-muted/20 bg-card/60 p-3 overflow-auto">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">Capability — CoAnalyst vs Generative AI</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-1 text-[11px] text-muted-foreground font-medium">Capability</th>
                <th className="text-center py-1 text-[11px] text-primary font-bold w-20">CoAnalyst</th>
                <th className="text-center py-1 text-[11px] text-muted-foreground w-20">Generative</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-1 text-[11px] text-muted-foreground">{r.cap}</td>
                  <td className="text-center py-1">{r.co ? <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" /> : <X className="w-3.5 h-3.5 text-red-400 mx-auto" />}</td>
                  <td className="text-center py-1">{r.gen ? <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" /> : <X className="w-3.5 h-3.5 text-red-400 mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-2">
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5">
            <h3 className="text-[11px] font-bold text-amber-400 uppercase tracking-wide mb-1.5">Accuracy by Taxonomy Depth</h3>
            {accuracy.map((a, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] mb-1">
                <span className="text-muted-foreground flex-1">{a.level}</span>
                <span className="text-primary font-bold w-10 text-center">{a.co}</span>
                <span className="text-muted-foreground w-10 text-center">{a.gen}</span>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 flex-1">
            <h3 className="text-[11px] font-bold text-red-400 uppercase tracking-wide mb-1">The Real-World Risk</h3>
            <p className="text-[11px] text-muted-foreground">Generic AI classifies a repeated bird strike as a one-off — missing the cluster pattern signalling a runway hazard trend that requires immediate operational response.</p>
          </div>
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-2 text-center">
            <p className="text-[11px] font-semibold text-foreground italic">"Generative AI reads reports. CoAnalyst understands aviation operations."</p>
          </div>
        </div>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlideTiersVsAI;
