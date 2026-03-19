import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, Bell, Eye, TrendingUp, Check, X } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const tiers = [
  { icon: Clock, tier: "Historical", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30", desc: "Query and analyse past events with natural language", capability: "Full corpus search across millions of reports with aviation-aware context" },
  { icon: Bell, tier: "Reactive", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30", desc: "Real-time alerts when signals cross defined thresholds", capability: "Automated monitoring with configurable alert rules and escalation chains" },
  { icon: Eye, tier: "Proactive", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", desc: "Pattern detection and emerging hazard identification", capability: "Cross-report pattern recognition that surfaces risks before they become incidents" },
  { icon: TrendingUp, tier: "Predictive", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30", desc: "Likelihood assessments and future risk modelling", capability: "Probabilistic risk modelling that enables pre-emptive action before events occur" },
];

const rows = [
  { cap: "Event categorization across 4,000+ categories", co: true, gen: false },
  { cap: "90% accuracy at granular categorization", co: true, gen: false },
  { cap: "Hybrid AI: domain-trained ML + LLMs", co: true, gen: false },
  { cap: "Cross-report pattern recognition at scale", co: true, gen: false },
  { cap: "Proactive hazard detection & control monitoring", co: true, gen: false },
  { cap: "Predictive intelligence (likelihood of recurrence)", co: true, gen: false },
  { cap: "Low hallucination risk for aviation data", co: true, gen: false },
  { cap: "60+ language translation", co: true, gen: true },
  { cap: "Text summarization", co: true, gen: true },
  { cap: "Basic Q&A on prompted data", co: true, gen: true },
];

const accuracy = [
  { level: "Level 1 (~50 categories)", co: "~95%", gen: "~90%" },
  { level: "Level 2–3 (hundreds)", co: "~92%", gen: "~60%" },
  { level: "Level 4–5 (thousands)", co: "~90%", gen: "30–40%" },
];

const TechSlide8IntelligenceTiers = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-8" title="Intelligence Tiers & Differentiation" subtitle="Four levels of operational intelligence — and why generic AI falls short" slideNumber={slideNumber} {...narrationProps}>
    <div className="flex flex-col gap-3 flex-1 min-h-0">
      {/* Top: comparison table + accuracy side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 flex-1 min-h-0">
        <div className="lg:col-span-3 rounded-lg border border-muted/20 bg-card/60 p-2 overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-1 text-[10px] text-muted-foreground font-medium">Capability</th>
                <th className="text-center py-1 text-[10px] text-primary font-bold w-16">CoAnalyst</th>
                <th className="text-center py-1 text-[10px] text-muted-foreground w-16">Generic</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-0.5 text-[10px] text-muted-foreground">{r.cap}</td>
                  <td className="text-center py-0.5">{r.co ? <Check className="w-3 h-3 text-emerald-400 mx-auto" /> : <X className="w-3 h-3 text-red-400 mx-auto" />}</td>
                  <td className="text-center py-0.5">{r.gen ? <Check className="w-3 h-3 text-emerald-400 mx-auto" /> : <X className="w-3 h-3 text-red-400 mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 flex flex-col justify-center">
          <h3 className="text-[10px] font-bold text-amber-400 uppercase tracking-wide mb-1.5">Accuracy by Depth</h3>
          {accuracy.map((a, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] mb-0.5">
              <span className="text-muted-foreground flex-1">{a.level}</span>
              <span className="text-primary font-bold w-10 text-center">{a.co}</span>
              <span className="text-muted-foreground w-10 text-center">{a.gen}</span>
            </div>
          ))}
          <p className="text-[9px] text-muted-foreground mt-1.5 italic">LLMs hallucinate at granular levels — wrong technology for micro-categorization.</p>
        </div>
      </div>

      {/* Bottom: 4 tier cards in a row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
        {tiers.map((t) => (
          <div key={t.tier} className={`rounded-lg border ${t.border} ${t.bg} p-2.5 flex flex-col`}>
            <div className="flex items-center gap-2 mb-1.5">
              <t.icon className={`h-4 w-4 ${t.color}`} />
              <h3 className={`text-sm font-bold ${t.color}`}>{t.tier}</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-2 flex-1">{t.desc}</p>
            <p className="text-[10px] text-muted-foreground/60 pt-1.5 border-t border-muted/10">{t.capability}</p>
          </div>
        ))}
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide8IntelligenceTiers;
