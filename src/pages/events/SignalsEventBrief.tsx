import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Activity, ArrowRight, Plane, FileText, ShieldCheck, GraduationCap, Quote } from "lucide-react";

const messagingArchitecture = [
  { layer: "Category", message: "Built for the signal age of aviation." },
  { layer: "Problem", message: "Operators are drowning in unacted signals." },
  { layer: "Shift", message: "Event management → signal management → control management." },
  { layer: "Solution", message: "Three Systems of Record + CoAnalyst + DTOP." },
  { layer: "Proof", message: "~90% domain AI accuracy vs ~35% generic. Continuous audit evidence." },
  { layer: "Outcome", message: "Fewer surprises, faster response, provable control." },
];

const taglines = [
  { line: "From Signals to Control", use: "Master theme — anchors the event and all collateral" },
  { line: "Every Signal Counts", use: "Emotional, safety-anchored hook for opening" },
  { line: "The Signals Are There. Are You Listening?", use: "Provocative keynote opener" },
  { line: "Operate at the Speed of Signals", use: "Performance / ops angle" },
];

const departments = [
  {
    name: "Operations",
    icon: Plane,
    color: "sky",
    promise: "Turn daily ops signals into faster, safer decisions.",
    audience: "Heads of Flight Ops · Ops Control · Crew Ops",
    sample: "Sample session: From OCC noise to next-best-action.",
  },
  {
    name: "Content",
    icon: FileText,
    color: "violet",
    promise: "Make manuals, procedures, and tech pubs respond to live operational signals.",
    audience: "Tech Pubs · Content Ops · Documentation Leads",
    sample: "Sample session: When the signal changes the manual.",
  },
  {
    name: "Safety",
    icon: ShieldCheck,
    color: "emerald",
    promise: "Detect weak signals before they become events. Prove control to regulators.",
    audience: "Heads of Safety · SMS · Compliance",
    sample: "Sample session: The 12,000 signals you didn't know you had.",
  },
  {
    name: "Training",
    icon: GraduationCap,
    color: "amber",
    promise: "Translate operational signals into targeted competency and recurrent training.",
    audience: "Heads of Training · Standards · Check & Training",
    sample: "Sample session: Signal-driven recurrent training.",
  },
];

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  sky: { text: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  amber: { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  violet: { text: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/30" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
};

const arc = [
  { phase: "Open", title: "The signal problem", body: "Industry frame: operators have data, not signals. Set the stakes." },
  { phase: "Middle", title: "The platform answer", body: "Category + DTOP + CoAnalyst — told through the four departments." },
  { phase: "Close", title: "The control outcome", body: "Provable, continuous, board-ready operational control." },
];

const useTerms = [
  "signals", "control", "operational performance", "Systems of Record",
  "CoAnalyst", "DTOP", "Generative AI", "Recommended Actions", "Operational Data",
];
const avoidTerms = [
  "FOQA", "FDM", "ASAP", "AI copilot", "single pane of glass", "unqualified ROI claims",
];

const SignalsEventBrief = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "From Signals to Control — Event Positioning Brief";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "Positioning, narrative, and messaging architecture for the From Signals to Control event — the Operational Performance Platform's industry moment.",
    );
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-16 pb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90 bg-primary/10 border border-primary/30 rounded-full px-3 py-1.5">
              <Activity className="h-3.5 w-3.5" />
              Event Positioning &amp; Messaging Brief
            </div>
            <Link
              to="/events/from-signals-to-control"
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              View public event page <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-4xl">
            From Signals <span className="text-primary">to Control.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            The positioning, narrative, and messaging architecture for the Operational Performance
            Platform event. Use this as the single source of truth for keynote, marketing, sponsor,
            and partner alignment.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground/80 uppercase tracking-wider">
            <span><span className="text-foreground/60">Audience:</span> {"{Aviation operators}"}</span>
            <span><span className="text-foreground/60">Format:</span> {"{1-day summit}"}</span>
            <span><span className="text-foreground/60">Status:</span> {"{Draft}"}</span>
          </div>
        </div>
      </header>

      {/* Big Idea */}
      <section className="border-b border-border/60 bg-card/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">The Big Idea</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 leading-tight">
              Aviation isn't short on data. It's short on signals it can act on.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Every airline already collects more operational data than it can read. The leaders of
              the next decade will not be the ones with the most data — they'll be the ones who can
              detect the signals inside it, act on them in hours not weeks, and prove control of
              every one that matters.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This event reframes the conversation: from event management, to signal management, to
              control management — across safety, content, operations and training, on one platform.
            </p>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
            <Quote className="h-6 w-6 text-primary mb-3" />
            <div className="font-display text-2xl font-bold leading-tight">
              "From Signals to Control."
            </div>
            <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
              Master theme · use everywhere
            </div>
          </div>
        </div>
      </section>

      {/* Category Positioning */}
      <section className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">Category Positioning</p>
          <h2 className="font-display text-3xl font-bold mb-8">The Operational Performance Platform.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card/40 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-2">Category</div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                The Operational Performance Platform — a new category for aviation operators.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/40 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-2">Position</div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                The system of record + system of intelligence that turns operational signals into
                measurable control across safety, content, and training.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/40 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-2">Wedge</div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Purpose-built domain AI (~90% accuracy vs ~35% generic), unified across the three
                Systems of Record, governed by the DTOP operating model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Messaging architecture */}
      <section className="border-b border-border/60 bg-card/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">Messaging Architecture</p>
          <h2 className="font-display text-3xl font-bold mb-8">Six layers. One story.</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card/60 text-left">
                  <th className="py-3 px-5 font-semibold text-xs uppercase tracking-wider text-muted-foreground w-40">Layer</th>
                  <th className="py-3 px-5 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Message</th>
                </tr>
              </thead>
              <tbody>
                {messagingArchitecture.map((row, i) => (
                  <tr key={row.layer} className={i % 2 ? "bg-card/20" : ""}>
                    <td className="py-4 px-5 font-display font-bold text-primary border-t border-border/60">{row.layer}</td>
                    <td className="py-4 px-5 text-foreground/90 border-t border-border/60">{row.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Taglines */}
      <section className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">Taglines &amp; Hooks</p>
          <h2 className="font-display text-3xl font-bold mb-8">Lines on the table.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {taglines.map((t) => (
              <div key={t.line} className="rounded-xl border border-border bg-card/40 p-6">
                <div className="font-display text-xl font-bold leading-snug mb-2">"{t.line}"</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{t.use}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="border-b border-border/60 bg-card/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">Audience &amp; Tracks</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Four departments. One signal, end to end.</h2>
          <p className="text-muted-foreground max-w-3xl mb-10">
            Tracks are organised by department — so every attendee sees their own world reflected
            in the agenda, then leaves with a shared operating model across the four.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((d) => {
              const c = colorMap[d.color];
              const Icon = d.icon;
              return (
                <div key={d.name} className={`rounded-xl border p-6 ${c.border} ${c.bg}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${c.bg} border ${c.border}`}>
                      <Icon className={`h-5 w-5 ${c.text}`} />
                    </div>
                    <h3 className={`font-display text-2xl font-bold ${c.text}`}>{d.name}</h3>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed mb-4">{d.promise}</p>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground/90 font-semibold mb-1">Who it's for</div>
                  <div className="text-sm text-foreground/80 mb-4">{d.audience}</div>
                  <div className="text-xs text-muted-foreground italic border-t border-border/40 pt-3">{d.sample}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Narrative arc */}
      <section className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">Narrative Arc</p>
          <h2 className="font-display text-3xl font-bold mb-8">How the day tells the story.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {arc.map((a, i) => (
              <div key={a.phase} className="rounded-xl border border-border bg-card/40 p-6 relative">
                <div className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-2">
                  Act {i + 1} · {a.phase}
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tone & language */}
      <section className="border-b border-border/60 bg-card/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">Tone &amp; Language</p>
          <h2 className="font-display text-3xl font-bold mb-8">Stay on-message.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Use</div>
              <div className="flex flex-wrap gap-2">
                {useTerms.map((t) => (
                  <span key={t} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 px-3 py-1 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-3">Avoid</div>
              <div className="flex flex-wrap gap-2">
                {avoidTerms.map((t) => (
                  <span key={t} className="rounded-full border border-red-500/30 bg-red-500/10 text-red-200 px-3 py-1 text-xs font-medium line-through decoration-red-400/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="font-display text-sm font-bold tracking-tight text-foreground/80">
            Comply365
          </Link>
          <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
            <Link to="/events/from-signals-to-control" className="hover:text-foreground transition-colors">
              Public event page
            </Link>
            <span>© {new Date().getFullYear()} Comply365</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignalsEventBrief;