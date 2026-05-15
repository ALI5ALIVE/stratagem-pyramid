import { Sparkles, Radar, Zap, Users, FileCheck } from "lucide-react";

const STEPS = [
  {
    time: "06:42",
    label: "Detect",
    color: "blue",
    role: "Safety duty officer",
    icon: Radar,
    title: "A weak signal lands.",
    body: "Crew report flags a wording change in QRH 7.12 r.14 — step 3. Same wording flagged by maintenance 9 days ago at a different base.",
  },
  {
    time: "06:43",
    label: "Trigger",
    color: "amber",
    role: "Intelligence Layer",
    icon: Sparkles,
    title: "Recommended Action issued.",
    body: "Cross-references the manual revision, the safety pattern and the training record. Routes one workflow to Ops, Safety and Training in a single move.",
  },
  {
    time: "06:51",
    label: "Orchestrate",
    color: "violet",
    role: "Ops · Safety · Training",
    icon: Zap,
    title: "42 crews flagged. Recurrent assigned.",
    body: "Targeted micro-learning pushed to 42 affected crews. Roster updated. Manual republish scheduled. The COO sees one rhythm — not three teams reporting in three formats.",
  },
  {
    time: "07:08",
    label: "Prove",
    color: "emerald",
    role: "Auditor view",
    icon: FileCheck,
    title: "Evidence chain closed.",
    body: "Signal → action → person → proof. One trail, cited to source, ready when the regulator asks.",
  },
];

const colorMap: Record<string, { dot: string; text: string; border: string; bg: string }> = {
  blue:    { dot: "bg-blue-500",    text: "text-blue-400",    border: "border-blue-500/30",    bg: "bg-blue-500/5" },
  amber:   { dot: "bg-amber-500",   text: "text-amber-400",   border: "border-amber-500/30",   bg: "bg-amber-500/5" },
  violet:  { dot: "bg-violet-500",  text: "text-violet-400",  border: "border-violet-500/30",  bg: "bg-violet-500/5" },
  emerald: { dot: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/5" },
};

export default function DayInOperationScenario() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Editorial header */}
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">A Tuesday in the operation</p>
            <p className="mt-4 font-display text-sm uppercase tracking-[0.18em] text-muted-foreground">06:42 — 07:08</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              One signal in. <span className="text-muted-foreground/60">One closed loop out — in 26 minutes.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Most operators see the signal. Few act on it before it becomes an event.
              This is what acting on it looks like — across Ops, Safety and Training, in a single workflow.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <ol className="relative border-l border-border/40 ml-3 lg:ml-6">
          {STEPS.map((s) => {
            const c = colorMap[s.color];
            const Icon = s.icon;
            return (
              <li key={s.time} className="relative pl-8 lg:pl-12 pb-12 last:pb-0">
                <span className={`absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full ${c.dot} ring-4 ring-background`} />
                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-3">
                    <div className="font-display text-3xl lg:text-4xl font-bold text-foreground tabular-nums">{s.time}</div>
                    <div className={`mt-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${c.text}`}>
                      <Icon className="h-3.5 w-3.5" /> {s.label}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">{s.role}</div>
                  </div>
                  <div className={`lg:col-span-9 rounded-2xl border ${c.border} ${c.bg} p-6 lg:p-8`}>
                    <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm lg:text-base text-muted-foreground leading-relaxed max-w-3xl">
                      {s.body}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Closing pull-quote */}
        <figure className="mt-16 lg:mt-20 max-w-4xl">
          <blockquote className="font-display text-2xl lg:text-3xl text-foreground leading-snug italic">
            "We stopped chasing manuals across PDFs. The revision now travels with the safety event and the training assignment — in one motion."
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            — Director of Compliance, Tier-1 European airline
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
