import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Database, Sparkles, Search, Brain, Zap } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const pipeline = [
  { icon: Database, label: "Ingest", desc: "Collect data from safety reports, audits, maintenance, operational data", color: "text-sky-400", bg: "bg-sky-400/10" },
  { icon: Sparkles, label: "Enrich", desc: "Classify across 4,000+ categories at 5 levels", color: "text-amber-400", bg: "bg-amber-400/10" },
  { icon: Search, label: "Detect", desc: "Surface patterns, anomalies, and emerging trends", color: "text-purple-400", bg: "bg-purple-400/10" },
  { icon: Brain, label: "Intelligence", desc: "Hybrid AI: domain ML models + LLM augmentation", color: "text-primary", bg: "bg-primary/10" },
  { icon: Zap, label: "Activate", desc: "Trigger actions across safety, content, training", color: "text-emerald-400", bg: "bg-emerald-400/10" },
];

const TechSlide7CoAnalyst = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-7" title="CoAnalyst: Aviation Intelligence" subtitle="Purpose-built AI that understands aviation operations at a level generative AI cannot reach" slideNumber={slideNumber} {...narrationProps}>
    <div className="flex-1 flex flex-col gap-5">
      {/* Pipeline */}
      <div className="flex items-start gap-2">
        {pipeline.map((s, i) => (
          <div key={s.label} className="flex items-start gap-2 flex-1">
            <div className={`rounded-xl border border-muted/20 ${s.bg} p-3 flex-1`}>
              <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
              <h4 className={`text-sm font-bold ${s.color}`}>{s.label}</h4>
              <p className="text-[10px] text-muted-foreground mt-1">{s.desc}</p>
            </div>
            {i < pipeline.length - 1 && <span className="text-muted-foreground/30 mt-6">→</span>}
          </div>
        ))}
      </div>

      {/* Architecture + Precision Gap */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Architecture */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex flex-col">
          <h3 className="text-base font-bold text-primary mb-3">Hybrid AI Architecture</h3>
          <div className="space-y-3 flex-1">
            <div className="p-3 rounded-lg bg-muted/10 border border-muted/20">
              <span className="text-xs font-bold text-foreground">Domain-Trained ML Models</span>
              <p className="text-[10px] text-muted-foreground mt-1">Trained on millions of aviation safety reports. 90% accuracy at 4,000+ granular categories. No hallucination at micro-classification level.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/10 border border-muted/20">
              <span className="text-xs font-bold text-foreground">LLM Augmentation Layer</span>
              <p className="text-[10px] text-muted-foreground mt-1">Natural language queries, summarisation, translation (60+ languages). Guardrailed by domain models to prevent aviation-critical hallucination.</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/10 border border-muted/20">
              <span className="text-xs font-bold text-foreground">Continuous Learning</span>
              <p className="text-[10px] text-muted-foreground mt-1">Models improve with every report processed. Airline-specific tuning without exposing data across tenants.</p>
            </div>
          </div>
        </div>

        {/* Precision Gap */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 flex flex-col">
          <h3 className="text-base font-bold text-amber-400 mb-3">The Precision Gap</h3>
          <p className="text-xs text-muted-foreground mb-4">Generative AI accuracy collapses at the granularity levels aviation operations require.</p>
          {[
            { level: "Level 1 (top ~50)", co: 95, gen: 90 },
            { level: "Level 2–3 (hundreds)", co: 92, gen: 60 },
            { level: "Level 4–5 (thousands)", co: 90, gen: 35 },
          ].map((r) => (
            <div key={r.level} className="mb-3">
              <span className="text-[10px] text-muted-foreground">{r.level}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] w-16 text-primary shrink-0">CoAnalyst</span>
                <div className="flex-1 h-4 rounded-full bg-muted/20 overflow-hidden"><div className="h-full rounded-full bg-primary/60" style={{ width: `${r.co}%` }} /></div>
                <span className="text-[10px] text-primary font-bold w-8">{r.co}%</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] w-16 text-muted-foreground shrink-0">Generic AI</span>
                <div className="flex-1 h-4 rounded-full bg-muted/20 overflow-hidden"><div className="h-full rounded-full bg-muted-foreground/30" style={{ width: `${r.gen}%` }} /></div>
                <span className="text-[10px] text-muted-foreground w-8">{r.gen}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide7CoAnalyst;
