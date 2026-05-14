import { ArrowUpRight, FileText, BookOpen, FlaskConical } from "lucide-react";

const ITEMS = [
  { icon: FileText, kind: "Customer story", title: "How a top-10 carrier closed its safety → training loop in one quarter.", href: "#" },
  { icon: BookOpen, kind: "Analyst & regulator", title: "Where Comply365 sits on the operational performance landscape.", href: "#" },
  { icon: FlaskConical, kind: "Technical brief", title: "Inside the System of Intelligence: domain tuning, tenant isolation, evidence chain.", href: "#" },
];

export default function ResourcesStrip() {
  return (
    <section className="border-b border-border/40 py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Resources</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
            Go deeper.
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {ITEMS.map((i) => (
            <a
              key={i.title}
              href={i.href}
              className="group rounded-xl border border-border/50 bg-card/40 p-7 transition hover:border-primary/40 hover:bg-card/60"
            >
              <div className="mb-5 flex items-center justify-between">
                <i.icon className="h-6 w-6 text-primary" />
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-primary" />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{i.kind}</p>
              <h3 className="font-display text-lg font-semibold leading-snug text-foreground">{i.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}