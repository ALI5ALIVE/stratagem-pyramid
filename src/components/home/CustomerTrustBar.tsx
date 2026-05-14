const LOGOS = [
  "Atlantic Air",
  "Northstar Defense",
  "Meridian Rail",
  "Cascade Cargo",
  "Ironclad Logistics",
  "Polaris Group",
  "Vector Aviation",
  "Sentinel Ops",
];

export default function CustomerTrustBar() {
  return (
    <section className="border-b border-border/40 bg-background/60 py-12">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by operators flying, running and certifying mission-critical operations
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
          {LOGOS.map((name) => (
            <div
              key={name}
              className="text-center font-display text-sm font-semibold tracking-tight text-muted-foreground/70 transition hover:text-muted-foreground"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}