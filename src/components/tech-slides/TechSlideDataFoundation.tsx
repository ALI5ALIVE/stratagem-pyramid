import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Database, Layers, Lock, Radio, Plug, FileText, GraduationCap, ShieldCheck, ArrowRight } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const sources = [
  { icon: FileText, name: "ContentManager365", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", feeds: ["Procedure publishes", "Revisions", "Acknowledgements"] },
  { icon: GraduationCap, name: "TrainingManager365", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", feeds: ["Assignments", "Completions", "Recurrency"] },
  { icon: ShieldCheck, name: "SafetyManager365", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", feeds: ["Occurrences", "Audits", "Investigations"] },
];

const pillars = [
  { icon: Layers, title: "Unified Taxonomy", desc: "4,000+ aviation categories across 5 levels — one schema spanning content, training and safety.", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  { icon: Lock, title: "Customer-Owned & Governed", desc: "Your data stays yours. Tenant-isolated, role-scoped access, full audit history — no cross-tenant exposure.", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
  { icon: Radio, title: "Real-Time Event Propagation", desc: "Every publish, completion or occurrence emits an event the intelligence and orchestration layers can act on.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  { icon: Plug, title: "Open APIs · No Lock-In", desc: "REST + webhook surface for customer data systems, identity providers and BI tools. The foundation is yours to build on.", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
];

const TechSlideDataFoundation = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-data-foundation"
    title="The Operational Data Foundation"
    subtitle="One unified data lake — the substrate every other layer reasons over"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-0">
      {/* Left: data flow schematic */}
      <div className="lg:col-span-2 flex flex-col gap-2">
        {sources.map((s) => (
          <div key={s.name} className={`flex items-center gap-3 rounded-xl border ${s.border} ${s.bg} p-2.5`}>
            <s.icon className={`h-5 w-5 ${s.color} shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-bold ${s.color}`}>{s.name}</div>
              <div className="text-[10px] text-muted-foreground truncate">{s.feeds.join(" · ")}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
          </div>
        ))}
        <div className="rounded-xl border-2 border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 to-primary/10 p-4 mt-1 flex flex-col items-center justify-center text-center">
          <Database className="h-8 w-8 text-cyan-400 mb-2" />
          <h3 className="text-base font-bold text-cyan-400">Operational Data Foundation</h3>
          <p className="text-[10px] text-muted-foreground mt-1">Cross-product schema · Governed access · Customer-owned</p>
        </div>
      </div>

      {/* Right: 4 pillars */}
      <div className="lg:col-span-3 grid grid-cols-2 gap-3">
        {pillars.map((p) => (
          <div key={p.title} className={`rounded-xl border ${p.border} ${p.bg} p-4 flex flex-col`}>
            <p.icon className={`h-5 w-5 ${p.color} mb-2`} />
            <h3 className={`text-sm font-bold ${p.color} mb-1`}>{p.title}</h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-2.5 text-center shrink-0">
      <p className="text-xs text-foreground">
        <span className="font-semibold text-primary">Without the foundation, intelligence has nothing to reason over.</span>
        <span className="text-muted-foreground"> This is the architectural keystone — every other layer depends on it.</span>
      </p>
    </div>
  </SalesSlideContainer>
);

export default TechSlideDataFoundation;
