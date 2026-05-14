import { Link } from "react-router-dom";
import { ArrowUpRight, Workflow, Smartphone, Brain, BookCheck } from "lucide-react";

const PILLARS = [
  {
    icon: Workflow,
    name: "DTOP — System of Work",
    desc: "The operating model that turns operational signal into auditable action across safety, ops, training and regulation.",
    href: "/dtop-playbook",
  },
  {
    icon: Smartphone,
    name: "Unified Mobile Shell",
    desc: "One app for every crew role. Offline-first, role-aware, fewer clicks per task.",
    href: "/mobile-playbook",
  },
  {
    icon: Brain,
    name: "System of Intelligence",
    desc: "Generative AI tuned to your operation. Recommended Actions grounded in your Operational Data.",
    href: "/coanalyst",
  },
  {
    icon: BookCheck,
    name: "Regulation Management",
    desc: "Trace a regulation change to the procedure, the training and the evidence — in one chain.",
    href: "/regulation-management",
  },
];

export default function ProductPillars() {
  return (
    <section className="border-b border-border/40 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">The product</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
            Four products. One platform. One operating model.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {PILLARS.map((p) => (
            <Link
              key={p.name}
              to={p.href}
              className="group rounded-xl border border-border/50 bg-card/40 p-7 transition hover:border-primary/40 hover:bg-card/60"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50 bg-background/60 text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">{p.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}