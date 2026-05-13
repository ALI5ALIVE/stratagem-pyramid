import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ShieldCheck, GraduationCap, Sparkles, Smartphone, Database } from "lucide-react";
import StatSourceChip from "@/components/shared/StatSourceChip";

const MODULES = [
  { name: "ContentManager365", icon: BookOpen, blurb: "Living operational content" },
  { name: "SafetyManager365", icon: ShieldCheck, blurb: "Prescriptive safety & risk" },
  { name: "TrainingManager365", icon: GraduationCap, blurb: "Competency tied to ops" },
];

const SUBSTRATE = ["Content", "Safety", "Training", "Operational Data"];

const DTOP = [
  { letter: "D", label: "Detect", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  { letter: "T", label: "Trigger", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  { letter: "O", label: "Orchestrate", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  { letter: "P", label: "Prove", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
];

export default function UnifiedPlatformDiagram() {
  return (
    <section className="border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">How it fits together</div>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
          One platform. One operating model.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          A single connected substrate underneath, three modules in the middle, an intelligence layer on top — all wrapped by the DTOP operating model.
        </p>

        <div className="mt-10 relative rounded-3xl border border-border bg-card/40 p-6 md:p-10">
          {/* DTOP corner labels */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em]">
            {DTOP.map((d) => (
              <span key={d.letter} className={`inline-flex items-center gap-1 rounded-full border ${d.border} ${d.bg} px-2 py-0.5 ${d.color}`}>
                <span className="font-bold">{d.letter}</span>
                <span className="hidden sm:inline">{d.label}</span>
              </span>
            ))}
          </div>
          <div className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            DTOP Operating Model
          </div>

          <div className="mt-10 space-y-4">
            {/* Intelligence Layer */}
            <div className="rounded-2xl border border-primary/40 bg-primary/10 p-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-primary">Intelligence Layer</div>
                  <div className="text-sm font-semibold text-foreground">Recommended Actions across the platform</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                ~90% domain accuracy
                <StatSourceChip source="Comply365 internal benchmark of CoAnalyst on operational content vs. generic LLM baseline (~35%). See CoAnalyst intelligence framework." />
              </div>
            </div>

            {/* Modules */}
            <div className="grid md:grid-cols-3 gap-3">
              {MODULES.map((m) => (
                <div key={m.name} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                      <m.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="font-display text-sm font-semibold text-foreground">{m.name}</div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{m.blurb}</p>
                </div>
              ))}
            </div>

            {/* Mobile rail */}
            <div className="rounded-2xl border border-border bg-card/60 p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                <Smartphone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Frontline</div>
                <div className="text-sm text-foreground">Mobile — same data model, in the cockpit, hangar and depot</div>
              </div>
            </div>

            {/* Foundation */}
            <div className="rounded-2xl border border-border bg-muted/20 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                  <Database className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Foundation</div>
                  <div className="text-sm font-semibold text-foreground">One Connected Data Model</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {SUBSTRATE.map((s) => (
                  <span key={s} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link to="/platform" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            Explore the platform <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}