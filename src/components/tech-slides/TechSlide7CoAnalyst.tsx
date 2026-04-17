import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Brain, Database, Sparkles, Search, Zap, Languages, Quote } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const pipeline = [
  { icon: Database, label: "Ingest", desc: "Operational data from safety, content, training and ops sources", color: "text-sky-400" },
  { icon: Sparkles, label: "Enrich", desc: "Classify across 4,000+ aviation categories at 5 levels", color: "text-amber-400" },
  { icon: Search, label: "Reason", desc: "Cross-product correlation with cited, traceable evidence", color: "text-violet-400" },
  { icon: Brain, label: "Answer", desc: "Plain-English answers in seconds — auditable end-to-end", color: "text-primary" },
  { icon: Zap, label: "Activate", desc: "Trigger recommended actions across the platform", color: "text-emerald-400" },
];

const TechSlide7CoAnalyst = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-coanalyst"
    title="CoAnalyst — From Reports to Intelligence"
    subtitle="Conversational intelligence purpose-built for aviation operations"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-3 min-h-0">
      {/* Master message */}
      <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 flex items-center gap-3">
        <Quote className="h-5 w-5 text-primary shrink-0" />
        <p className="text-sm text-foreground italic">
          <span className="font-semibold text-primary">From Reports to Intelligence. From Events to Control.</span>
          <span className="text-muted-foreground"> Ask any operational question in plain English — get an evidence-backed answer in seconds.</span>
        </p>
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
        {pipeline.map((s) => (
          <div key={s.label} className="rounded-lg border border-muted/20 bg-card/40 p-2.5">
            <s.icon className={`h-4 w-4 ${s.color} mb-1`} />
            <h4 className={`text-xs font-bold ${s.color}`}>{s.label}</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom: architecture + headline stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0">
        <div className="lg:col-span-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <h3 className="text-sm font-bold text-primary mb-2">Hybrid AI Architecture</h3>
          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-muted/10 border border-muted/20">
              <span className="text-[11px] font-bold text-foreground">Domain-Trained ML Models</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">Trained on millions of aviation reports since 2023. 90% accuracy at 4,000+ granular categories — no hallucination at micro-classification.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/10 border border-muted/20">
              <span className="text-[11px] font-bold text-foreground">LLM Augmentation Layer</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">Natural-language queries, summarisation, translation. Guardrailed by domain models to prevent aviation-critical hallucination.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/10 border border-muted/20">
              <span className="text-[11px] font-bold text-foreground">Continuous Learning · Tenant-Isolated</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">Models improve with every report processed. Airline-specific tuning — no data crosses tenant boundaries.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 flex-1 flex flex-col justify-center">
            <div className="text-3xl font-bold text-emerald-400">90%</div>
            <div className="text-[11px] text-foreground font-semibold mt-1">CoAnalyst at Level 4–5</div>
            <div className="text-[10px] text-muted-foreground">vs ~35% generic AI · cause / root cause</div>
          </div>
          <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3 flex items-center gap-2">
            <Languages className="h-5 w-5 text-violet-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-violet-400">60+ Languages</div>
              <div className="text-[10px] text-muted-foreground">Cited, auditable answers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide7CoAnalyst;
