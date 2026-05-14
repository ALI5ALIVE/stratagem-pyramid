const STATS = [
  { v: "12+", l: "Years operating mission-critical platforms in regulated industries" },
  { v: "200+", l: "Operators running safety, ops, training and regulation on Comply365" },
  { v: "Audit-ready", l: "Evidence chain by design — traceable from signal to action" },
];

export default function CustomerOutcomes() {
  return (
    <section className="border-b border-border/40 bg-background/60 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Customer outcomes</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
            What good looks like, in operators' words.
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.l} className="rounded-xl border border-border/50 bg-card/40 p-7">
              <div className="font-display text-4xl font-semibold text-foreground">{s.v}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
        <figure className="mt-12 rounded-xl border border-border/50 bg-card/40 p-8 lg:p-10">
          <blockquote className="font-display text-2xl leading-snug text-foreground lg:text-3xl">
            "Comply365 is the first platform that lets us close the loop from a safety signal to a training change to an auditable record — without leaving the system."
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            — VP Safety, global airline operator
          </figcaption>
        </figure>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground/70">
          Operator outcomes are illustrative and dependent on customer-specific operational baseline, scope, and integration. Comply365 publishes ROI as modelled, not guaranteed.
        </p>
      </div>
    </section>
  );
}