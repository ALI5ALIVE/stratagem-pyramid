import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import ArchitectureLayerBadge from "@/components/tech-slides/ArchitectureLayerBadge";
import { SlideNarrationProps } from "@/types/slideProps";
import { Brain, Database, Sparkles, Search, Zap, Languages, Quote } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const pipeline = [
  { icon: Database, label: "Ingest", desc: "Operational data from safety, content, training and ops sources", color: "text-sky-400", border: "border-sky-400/30", bg: "bg-sky-400/5" },
  { icon: Sparkles, label: "Enrich", desc: "Classify across 4,000+ aviation categories at 5 levels", color: "text-amber-400", border: "border-amber-400/30", bg: "bg-amber-400/5" },
  { icon: Search, label: "Reason", desc: "Cross-product correlation with cited, traceable evidence", color: "text-violet-400", border: "border-violet-400/30", bg: "bg-violet-400/5" },
  { icon: Brain, label: "Answer", desc: "Plain-English answers in seconds — auditable end-to-end", color: "text-primary", border: "border-primary/30", bg: "bg-primary/5" },
  { icon: Zap, label: "Activate", desc: "Trigger recommended actions across the platform", color: "text-emerald-400", border: "border-emerald-400/30", bg: "bg-emerald-400/5" },
];

const archCards = [
  { title: "Domain-Trained ML Models", desc: "Trained on millions of aviation reports since 2023. 90% accuracy at 4,000+ granular categories — no hallucination at micro-classification." },
  { title: "LLM Augmentation Layer", desc: "Natural-language queries, summarisation, translation. Guardrailed by domain models to prevent aviation-critical hallucination." },
  { title: "Continuous Learning · Tenant-Isolated", desc: "Models improve with every report processed. Airline-specific tuning — no data crosses tenant boundaries." },
];

const TechSlide7CoAnalyst = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-coanalyst"
    title="Intelligence & Orchestration Layer — From Reports to Intelligence"
    subtitle="Conversational intelligence purpose-built for aviation operations"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <ArchitectureLayerBadge active="intelligence" sublayer="coanalyst" />
      {/* Master message */}
      <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 flex items-center gap-3 shrink-0">
        <Quote className="h-5 w-5 text-primary shrink-0" />
        <p className="text-sm text-foreground italic leading-relaxed">
          <span className="font-semibold text-primary">From Reports to Intelligence. From Events to Control.</span>
          <span className="text-muted-foreground"> Ask any operational question in plain English — get an evidence-backed answer in seconds.</span>
        </p>
      </div>

      {/* Pipeline — 5 equal cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 auto-rows-fr shrink-0">
        {pipeline.map((s) => (
          <div key={s.label} className={`rounded-xl border ${s.border} ${s.bg} p-3 flex flex-col h-full`}>
            <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
            <h4 className={`text-sm font-bold ${s.color} mb-1`}>{s.label}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom: architecture + headline stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 items-stretch">
        <div className="lg:col-span-2 rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col h-full">
          <h3 className="text-sm font-bold text-primary mb-3 shrink-0">Hybrid AI Architecture</h3>
          <div className="grid grid-rows-3 gap-2 flex-1">
            {archCards.map((a) => (
              <div key={a.title} className="p-3 rounded-lg bg-muted/10 border border-muted/20 flex flex-col justify-center">
                <span className="text-sm font-bold text-foreground">{a.title}</span>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-rows-2 gap-3 h-full">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex flex-col justify-center h-full">
            <div className="text-3xl font-bold text-emerald-400">90%</div>
            <div className="text-sm text-foreground font-bold mt-1">CoAnalyst at Level 4–5</div>
            <div className="text-xs text-muted-foreground">vs ~35% generic AI · cause / root cause</div>
          </div>
          <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4 flex items-center gap-3 h-full">
            <Languages className="h-6 w-6 text-violet-400 shrink-0" />
            <div>
              <div className="text-sm font-bold text-violet-400">60+ Languages</div>
              <div className="text-xs text-muted-foreground">Cited, auditable answers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide7CoAnalyst;
