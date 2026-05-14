const STEPS = [
  { letter: "D", name: "Detect", color: "text-blue-400 border-blue-400/40 bg-blue-400/5", line: "Surface the signal across operations." },
  { letter: "T", name: "Trigger", color: "text-amber-400 border-amber-400/40 bg-amber-400/5", line: "Turn signal into a workflow, not a ticket." },
  { letter: "O", name: "Orchestrate", color: "text-violet-400 border-violet-400/40 bg-violet-400/5", line: "Drive the work across teams, mobile and OCC." },
  { letter: "P", name: "Prove", color: "text-emerald-400 border-emerald-400/40 bg-emerald-400/5", line: "Auditable evidence the loop closed." },
];

export default function DTOPStrip() {
  return (
    <section className="border-b border-border/40 bg-background/60 py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">The DTOP operating model</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.letter} className={`rounded-xl border ${s.color} p-6`}>
              <div className="mb-3 flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold">{s.letter}</span>
                <span className="font-display text-lg font-semibold text-foreground">{s.name}</span>
              </div>
              <p className="text-sm text-muted-foreground">{s.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}