import { Check, X } from "lucide-react";

const TODAY = [
  "Fragmented tools across safety, ops, training and reg",
  "Reactive investigation after the event",
  "Slow loop — signal lost before it triggers work",
  "Controllable cost leaks every shift",
];
const TOMORROW = [
  "One platform — one operating model",
  "Predictive intelligence on operational data",
  "Closed loop — Detect to Prove in hours, not weeks",
  "Systemic risk reduced, evidence audit-ready",
];

export default function TheShift() {
  return (
    <section className="border-b border-border/40 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">The shift</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
            Operators don't have a data problem. They have a control problem.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            The gap between operational signal and operational action is where controllable cost is lost and systemic risk builds.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Column title="Today" items={TODAY} tone="negative" />
          <Column title="Tomorrow" items={TOMORROW} tone="positive" />
        </div>
      </div>
    </section>
  );
}

function Column({ title, items, tone }: { title: string; items: string[]; tone: "negative" | "positive" }) {
  const accent = tone === "positive" ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/5" : "text-muted-foreground border-border/50 bg-background/40";
  const Icon = tone === "positive" ? Check : X;
  return (
    <div className={`rounded-xl border ${accent} p-8`}>
      <div className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] opacity-80">{title}</div>
      <ul className="space-y-4">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-base text-foreground/90">
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone === "positive" ? "text-emerald-400" : "text-muted-foreground/60"}`} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}