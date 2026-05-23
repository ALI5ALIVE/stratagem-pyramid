import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

const compelling = [
  {
    title: "Narrative coherence",
    body: "Today Insights / Intelligence / Recommendations / Automation are capabilities in search of a story. DTOP already is the story. Collapsing the capability names into the loop means the architecture is the pitch — that's rare and defensible. It also ends the recurring confusion between 'Intelligence' and 'Recommendations,' which even internally we blur.",
  },
  {
    title: "Land-and-expand",
    body: "Four discrete modules priced on a value metric is materially easier for an AE to quote and a buyer to approve than a blended platform fee. Detect-only is a credible wedge (mirrors how Splunk, Datadog, and Workiva all landed).",
  },
  {
    title: "Competitive moat",
    body: "Competitors can copy features; they can't easily rename their roadmap around someone else's operating model without looking derivative. This locks DTOP in as category language.",
  },
  {
    title: "Analyst positioning",
    body: "Gartner and Verdantix love named, packaged modules tied to an operating model. It gives them something to score.",
  },
];

const pushbacks = [
  {
    n: 1,
    title: "\"Trigger\" is the weakest label",
    body: "In ops/safety vocabulary, trigger already means 'the event that fires a rule' — i.e. closer to Detect or Orchestrate than to interpretation. What you're describing under Trigger is judgement / meaning-making (the Intelligence Layer's 90% domain accuracy story). Consider keeping the DTOP letter but renaming the module — e.g. 'Trigger — Decide' — or sub-labelling it 'Trigger: domain judgement.' Otherwise AEs will fight the word.",
  },
  {
    n: 2,
    title: "Prove ≠ Insights",
    body: "You've defined Prove as 'insights based on confirmed actions.' That's outcomes/audit, which is real — but it risks cannibalising Detect, which is also insights. Tighten it: Detect = leading signals (what's happening), Prove = lagging evidence (what changed and what it was worth). Same engine, different temporal posture. Worth making that explicit or buyers will ask 'why am I paying for insights twice?'",
  },
  {
    n: 3,
    title: "Intelligence Layer vs Trigger module",
    body: "The Intelligence Layer is positioned as a layer of the platform, not a sub-brand. If Trigger becomes a discrete priced module, decide: is the Intelligence Layer (a) the engine inside Trigger, (b) a cross-cutting layer that powers all four, or (c) retired as a term? Recommend (b) — Intelligence Layer powers Detect's signal quality, Trigger's judgement, Orchestrate's routing, and Prove's attribution. Keep it as the horizontal capability story; DTOP modules are the vertical packaging. That preserves the 90% vs 35% headline without contradiction.",
  },
  {
    n: 4,
    title: "Usage-based pricing — right idea, wrong metric",
    body: "Tokens are an input metric and customers hate them (unpredictable, punishes good usage). Better value metrics map to customer value, not infrastructure cost — which is what makes Workiva and ServiceNow pricing durable. See the table below.",
  },
  {
    n: 5,
    title: "Don't orphan the Core Apps",
    body: "SafetyManager365, ContentManager365, and TrainingManager365 still need to be the system of record the DTOP modules act on. Frame the new packaging as 'DTOP modules operate across the Core Apps' — otherwise field will worry we're de-emphasising the products that pay the bills today.",
  },
  {
    n: 6,
    title: "Migration risk",
    body: "A lot of surface area already uses the current names — decks, playbooks, sales enablement, Practice Center, the AI Capabilities infographic. A rename is a 2–3 week content sweep, not a slide change. Worth scoping before committing publicly.",
  },
];

const valueMetrics = [
  { module: "Detect", color: "text-blue-400 border-blue-500/40 bg-blue-500/10", metric: "Signals monitored / assets under coverage" },
  { module: "Trigger", color: "text-amber-400 border-amber-500/40 bg-amber-500/10", metric: "Decisions rendered / recommended actions issued" },
  { module: "Orchestrate", color: "text-violet-400 border-violet-500/40 bg-violet-500/10", metric: "Workflows executed / actions routed" },
  { module: "Prove", color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10", metric: "Outcomes attributed / audit packs generated" },
];

const dtopModules = [
  { letter: "D", name: "Detect", color: "border-blue-500/50 bg-blue-500/10 text-blue-300" },
  { letter: "T", name: "Trigger", color: "border-amber-500/50 bg-amber-500/10 text-amber-300" },
  { letter: "O", name: "Orchestrate", color: "border-violet-500/50 bg-violet-500/10 text-violet-300" },
  { letter: "P", name: "Prove", color: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" },
];

export default function DtopPackagingPov() {
  useEffect(() => {
    document.title = "DTOP Packaging — Strategic POV | Comply365";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
        {/* Back link */}
        <Link
          to="/positioning-playbook"
          className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Positioning Playbook
        </Link>

        {/* Hero */}
        <header className="mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Strategic POV</p>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground lg:text-5xl">
            Packaging the Performance Platform around DTOP
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A response to the proposal to rename Insights, Intelligence, Recommendations, and Automation as
            Detect · Trigger · Orchestrate · Prove — and price them as discrete, usage-metered modules.
          </p>
        </header>

        {/* The Proposal */}
        <section className="mb-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">The proposal</p>
          <blockquote className="rounded-2xl border border-border/60 bg-card/40 p-7 text-sm leading-relaxed text-muted-foreground">
            <p className="mb-4 text-foreground">
              Rename and package the four platform capabilities around the DTOP operating model:
            </p>
            <ul className="mb-4 space-y-2">
              <li><span className="font-semibold text-blue-300">Detect</span> (Insights) — identifying signals and what is happening. Today the user asks; tomorrow the platform tells.</li>
              <li><span className="font-semibold text-amber-300">Trigger</span> (Intelligence &amp; Recommendations) — domain-grade accuracy on what it means and why it matters.</li>
              <li><span className="font-semibold text-violet-300">Orchestrate</span> (Automation) — determining the next steps and routing them to the right person or system.</li>
              <li><span className="font-semibold text-emerald-300">Prove</span> (Outcomes &amp; Audit) — evidence of what changed and the resulting value.</li>
            </ul>
            <p>
              Claimed advantages: sales efficiency (four quotable modules), simplified usage-based pricing,
              competitive differentiation through architecture-as-narrative, and shared vocabulary across product,
              marketing, and sales.
            </p>
          </blockquote>
        </section>

        {/* Verdict */}
        <section className="mb-14 rounded-2xl border border-primary/40 bg-primary/5 p-7">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Verdict</span>
          </div>
          <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
            Adopt it — with two adjustments.
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-foreground/90">
            <li className="flex gap-2">
              <span className="text-primary">1.</span>
              Keep the <strong>Intelligence Layer</strong> as the horizontal capability powering all four DTOP modules — don't fold it into Trigger alone.
            </li>
            <li className="flex gap-2">
              <span className="text-primary">2.</span>
              Sharpen <strong>Detect as leading signals</strong> and <strong>Prove as lagging evidence</strong> so the two "insights" modules don't compete.
            </li>
          </ul>
        </section>

        {/* What's compelling */}
        <section className="mb-14">
          <div className="mb-5 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">What's compelling</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {compelling.map((c) => (
              <div key={c.title} className="rounded-xl border border-border/50 bg-card/40 p-5">
                <h3 className="mb-2 font-display text-base font-semibold text-foreground">{c.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pushbacks */}
        <section className="mb-14">
          <div className="mb-5 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">Where to push back / refine</p>
          </div>
          <div className="space-y-4">
            {pushbacks.map((p) => (
              <div key={p.n} className="rounded-xl border border-border/50 bg-card/40 p-6">
                <div className="mb-2 flex items-baseline gap-3">
                  <span className="font-display text-lg font-semibold text-amber-400">{p.n}.</span>
                  <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                </div>
                <p className="pl-7 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Value metrics table */}
        <section className="mb-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Proposed value metrics</p>
          <h2 className="mb-5 font-display text-2xl font-semibold text-foreground">
            Price each module on the outcome it produces.
          </h2>
          <div className="overflow-hidden rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-card/60 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 w-40">Module</th>
                  <th className="px-5 py-3">Value metric</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {valueMetrics.map((v) => (
                  <tr key={v.module} className="bg-card/20">
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${v.color}`}>
                        {v.module}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-foreground/90">{v.metric}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Capability map */}
        <section className="mb-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Capability map</p>
          <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">
            Horizontal layer · Vertical modules · Systems of record.
          </h2>

          <div className="space-y-4">
            {/* Intelligence Layer */}
            <div className="rounded-xl border border-primary/40 bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-5 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Intelligence Layer</p>
              <p className="mt-1 text-sm text-foreground">~90% domain accuracy at L4–5 vs ~35% generic AI</p>
            </div>

            {/* Connectors */}
            <div className="grid grid-cols-4 gap-3 px-2">
              {dtopModules.map(() => (
                <div key={Math.random()} className="mx-auto h-5 w-px bg-border" />
              ))}
            </div>

            {/* DTOP modules */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {dtopModules.map((m) => (
                <div key={m.letter} className={`rounded-xl border px-4 py-5 text-center ${m.color}`}>
                  <p className="font-display text-2xl font-bold">{m.letter}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider">{m.name}</p>
                </div>
              ))}
            </div>

            {/* Connectors */}
            <div className="grid grid-cols-4 gap-3 px-2">
              {dtopModules.map(() => (
                <div key={Math.random()} className="mx-auto h-5 w-px bg-border" />
              ))}
            </div>

            {/* Core Apps */}
            <div className="rounded-xl border border-border/60 bg-card/40 px-6 py-5 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Core Apps · System of Record</p>
              <p className="mt-1 text-sm text-foreground">SafetyManager365 · ContentManager365 · TrainingManager365</p>
            </div>
          </div>
        </section>

        {/* Recommendation */}
        <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-7">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">Recommendation</p>
          <h2 className="mb-3 font-display text-2xl font-semibold text-foreground">
            Adopt the DTOP packaging — keep Intelligence Layer horizontal, split insights into leading vs lagging.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Next step: draft a revised capability map (DTOP modules × Core Apps × Intelligence Layer) as a one-pager
            before touching any decks. That becomes the source-of-truth for the 2–3 week content sweep across
            playbooks, sales enablement, and Practice Center.
          </p>
        </section>
      </div>
    </div>
  );
}