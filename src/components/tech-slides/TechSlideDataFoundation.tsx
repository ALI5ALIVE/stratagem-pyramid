import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Database, Layers, Network, Brain, Lock, Radio, Plug, FileText, GraduationCap, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const sources = [
  { icon: FileText, name: "ContentManager365", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", feeds: "Procedures · Revisions · Acks" },
  { icon: GraduationCap, name: "TrainingManager365", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", feeds: "Assignments · Completions · Recurrency" },
  { icon: ShieldCheck, name: "SafetyManager365", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", feeds: "Occurrences · Audits · Investigations" },
];

const capabilityPillars = [
  {
    icon: Layers,
    title: "Unified Aviation Taxonomy",
    tagline: "One schema across content, training & safety",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    points: [
      "4,000+ aviation categories across 5 levels of depth",
      "ICAO / IATA / regulator alignment out of the box",
      "Same labels applied consistently in every product",
    ],
    metric: "4,000+ categories",
  },
  {
    icon: Network,
    title: "Operational Knowledge Graph",
    tagline: "Procedures ↔ Training ↔ Events ↔ People ↔ Aircraft",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    points: [
      "Entities, roles and relationships modelled as a graph",
      "A safety event traces to procedure version, training record and crew in one hop",
      "Powers cross-product reasoning no dashboard can do",
    ],
    metric: "Multi-hop traversal",
  },
  {
    icon: Brain,
    title: "Custom Aviation LLM Models",
    tagline: "Domain-trained, not domain-prompted",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    points: [
      "Fine-tuned on millions of aviation reports since 2023",
      "Specialist models per task: classification, extraction, summarisation",
      "90% accuracy at Level 4–5 — generic AI sits at ~35%",
    ],
    metric: "90% vs 35% accuracy",
  },
];

const guarantees = [
  { icon: Lock, label: "Customer-Owned & Tenant-Isolated", color: "text-cyan-400" },
  { icon: Radio, label: "Real-Time Event Propagation", color: "text-emerald-400" },
  { icon: Plug, label: "Open APIs · Webhooks · No Lock-In", color: "text-sky-400" },
];

const TechSlideDataFoundation = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-data-foundation"
    title="The Operational Data Foundation"
    subtitle="Unified taxonomy + operational knowledge graph + custom aviation LLMs — the substrate every other layer reasons over"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      {/* Top: data flow into foundation */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-3 items-stretch shrink-0">
        <div className="lg:col-span-3 grid grid-cols-3 gap-2 auto-rows-fr">
          {sources.map((s) => (
            <div key={s.name} className={`rounded-xl border ${s.border} ${s.bg} p-2.5 flex flex-col h-full`}>
              <div className="flex items-center gap-1.5 mb-1">
                <s.icon className={`h-4 w-4 ${s.color} shrink-0`} />
                <span className={`text-[11px] font-bold ${s.color} truncate`}>{s.name}</span>
              </div>
              <div className="text-[10px] text-muted-foreground leading-tight">{s.feeds}</div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 flex items-center justify-center">
          <ArrowRight className="h-5 w-5 text-muted-foreground/40 hidden lg:block" />
        </div>

        <div className="lg:col-span-3 rounded-xl border-2 border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 to-primary/10 p-3 flex items-center gap-3">
          <Database className="h-7 w-7 text-cyan-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-cyan-400">Operational Data Foundation</h3>
            <p className="text-[11px] text-muted-foreground leading-snug">Cross-product schema · Governed access · Customer-owned</p>
          </div>
          <Sparkles className="h-4 w-4 text-primary/60 shrink-0" />
        </div>
      </div>

      {/* Three capability pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0 auto-rows-fr items-stretch">
        {capabilityPillars.map((p) => (
          <div key={p.title} className={`rounded-xl border ${p.border} ${p.bg} p-4 flex flex-col h-full justify-between`}>
            <div>
              <div className="flex items-start gap-2 mb-3">
                <p.icon className={`h-5 w-5 ${p.color} shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-bold ${p.color}`}>{p.title}</h3>
                  <p className="text-[11px] text-muted-foreground italic">{p.tagline}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="text-xs text-foreground/80 leading-relaxed flex gap-2">
                    <span className={`${p.color} shrink-0`}>▸</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`mt-3 rounded-md border ${p.border} bg-background/40 px-2 py-1.5 text-center`}>
              <span className={`text-[11px] font-bold ${p.color} uppercase tracking-wider`}>{p.metric}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Governance guarantees strip */}
      <div className="rounded-xl border border-muted/20 bg-card/40 p-3 flex flex-col sm:flex-row items-center justify-around gap-2 shrink-0 mt-auto">
        {guarantees.map((g) => (
          <div key={g.label} className="flex items-center gap-2">
            <g.icon className={`h-4 w-4 ${g.color}`} />
            <span className="text-xs text-foreground font-medium">{g.label}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-2.5 text-center shrink-0">
        <p className="text-xs text-foreground">
          <span className="font-semibold text-primary">Taxonomy gives shared language. The graph gives shared context. Custom LLMs give shared understanding.</span>
          <span className="text-muted-foreground"> Together they're the architectural keystone — every layer above depends on this one.</span>
        </p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlideDataFoundation;
