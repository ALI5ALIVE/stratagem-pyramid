import { Brain, Workflow, BookCheck } from "lucide-react";

const WHY = [
  {
    icon: Brain,
    title: "Domain-tuned intelligence — not generic AI",
    desc: "Our System of Intelligence is trained on your operational taxonomy. ~90% domain accuracy at L4–5 vs ~35% generic AI.",
  },
  {
    icon: Workflow,
    title: "One operating model — DTOP",
    desc: "Detect → Trigger → Orchestrate → Prove. The same loop across safety, ops, training and regulation. Not a stack of point tools.",
  },
  {
    icon: BookCheck,
    title: "Auditable by design",
    desc: "Built for the regulator, not retrofitted. Every action carries an evidence chain back to the signal that triggered it.",
  },
];

export default function WhyComply365() {
  return (
    <section className="border-b border-border/40 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why Comply365</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
            Three things only Comply365 can claim.
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {WHY.map((w) => (
            <div key={w.title} className="rounded-xl border border-border/50 bg-card/40 p-7">
              <w.icon className="mb-5 h-7 w-7 text-primary" />
              <h3 className="mb-3 font-display text-lg font-semibold text-foreground">{w.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}