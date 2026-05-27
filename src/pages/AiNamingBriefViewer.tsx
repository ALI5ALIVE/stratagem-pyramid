import { Link } from "react-router-dom";
import { ArrowLeft, Download, Sparkles, ShieldCheck, FileBadge } from "lucide-react";
import namingBriefPdf from "@/assets/docs/Comply365_AI_Naming_Brief_v1.pdf?url";

const tiers = [
  { tier: "Tier 1", label: "Platform", body: "Comply365 — the Operational Performance Platform. Master brand. Branded-house architecture." },
  { tier: "Tier 2", label: "Applications", body: "SafetyManager365 · ContentManager365 · TrainingManager365. BrandNumber format. No spaces. Each app is a self-contained product surface." },
  { tier: "Tier 3a", label: "Intelligence Layer (persona)", body: "[PersonaName] — one ownable, trademarkable AI brand sitting across all three applications. The Tier-1 AI brand (like Einstein, Joule)." },
  { tier: "Tier 3b", label: "Capabilities (DTOP)", body: "The four stages of the layer: Detect (Insights) · Trigger (Intelligence & Recommendations) · Orchestrate (Automation) · Prove (Outcomes & Audit)." },
  { tier: "Tier 3c", label: "Agents (JTBD)", body: "Comply365 Agents family. Each agent is a Job-To-Be-Done, slotted under one DTOP stage, owned by one application. Naming pattern: [Job] Agent." },
];

const namingRules = [
  "No Co- prefixes anywhere. The category has moved on.",
  "No sub-brand collisions with applications (no Comply365 ContentX, etc.).",
  "The persona name is never used as a verb (we don't \"[Persona] it\").",
  "DTOP stages are capabilities, never agents. They describe how the layer works.",
  "Every agent is named after the job, mapped to one DTOP stage, with one owning application.",
  "Agent family name: Comply365 Agents. Singular agent name: [Job] Agent.",
];

const dtopColor: Record<string, string> = {
  Detect: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  Trigger: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  Orchestrate: "text-violet-400 border-violet-400/30 bg-violet-400/10",
  Prove: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
};

const dtopStages = [
  { stage: "Detect", sub: "Insights", agents: ["Safety Signal Agent", "Fleet Risk Agent", "Reg Change Agent"] },
  { stage: "Trigger", sub: "Intelligence & Recs", agents: ["Root Cause Agent", "Compliance Review Agent", "Competency Gap Agent"] },
  { stage: "Orchestrate", sub: "Automation", agents: ["Authoring Agent", "Training Update Agent", "Workflow Agent"] },
  { stage: "Prove", sub: "Outcomes & Audit", agents: ["Audit Trail Agent", "Outcomes Agent"] },
];

const capVsAgents = [
  { k: "What it is", c: "A stage of the pipeline. What the layer does.", a: "A named worker doing a Job-To-Be-Done a human would otherwise do." },
  { k: "How many", c: "Exactly four. Detect · Trigger · Orchestrate · Prove.", a: "Many. A growing catalogue, versioned over time." },
  { k: "Named for", c: "The operating model.", a: "The job. Pattern: [Job] Agent." },
  { k: "Sold as", c: "Part of the Intelligence Layer — not sold individually.", a: "Packaged inside applications; some cross-app under Platform." },
  { k: "The test", c: "\"Is this a stage every job flows through?\" → Yes.", a: "\"Would a customer staff this role today?\" → Yes." },
];

const dtopReasons = [
  "DTOP is our operating model, not a SKU shelf. Rebranding the four stages as four agents creates a packaging trap — customers will ask to price, license and turn each on/off individually.",
  "Every competitor can claim a Detect/Trigger/Orchestrate/Prove agent. The defensibility is in domain-trained intelligence powering named JTBD agents, not in the stage names.",
  "It dilutes the persona name we're about to land. If everything is an agent, the Tier-1 AI brand has no room to breathe.",
  "It confuses the message customers have already learned: Insights, Intelligence & Recommendations, Automation, Outcomes & Audit are product modules — keep them as such.",
];

const jtbdReasons = [
  "Buyers don't fund features; they fund jobs that get done. Naming agents after the job makes the value visible on the org chart.",
  "JTBD agents survive product reorganisations — the Authoring Agent does the same job whether it lives in ContentManager365 or moves to a new module.",
  "It maps cleanly to ROI: each agent has a baseline human cost, a target automation rate and a measurable outcome.",
];

const agents = [
  { stage: "Detect", name: "Safety Signal Agent", job: "Surface emerging risk patterns across reports before they become events.", app: "SafetyManager365" },
  { stage: "Detect", name: "Fleet Risk Agent", job: "Monitor operational data streams and flag fleet-level anomalies.", app: "SafetyManager365" },
  { stage: "Detect", name: "Reg Change Agent", job: "Watch regulator feeds and flag changes that affect live manuals.", app: "ContentManager365" },
  { stage: "Trigger", name: "Root Cause Agent", job: "Classify and cite the cause / root cause of an event at L4–5 accuracy.", app: "SafetyManager365" },
  { stage: "Trigger", name: "Compliance Review Agent", job: "Assess a change against the regulatory framework and recommend actions.", app: "ContentManager365" },
  { stage: "Trigger", name: "Competency Gap Agent", job: "Match incident patterns to training records and surface skill gaps.", app: "TrainingManager365" },
  { stage: "Orchestrate", name: "Authoring Agent", job: "Draft the procedure / manual update from the recommended action.", app: "ContentManager365" },
  { stage: "Orchestrate", name: "Training Update Agent", job: "Generate the matching training delta and route it to affected crew.", app: "TrainingManager365" },
  { stage: "Orchestrate", name: "Workflow Agent", job: "Route the right task to the right person or system with SLAs.", app: "Platform" },
  { stage: "Prove", name: "Audit Trail Agent", job: "Assemble end-to-end evidence: signal → decision → change → outcome.", app: "Platform" },
  { stage: "Prove", name: "Outcomes Agent", job: "Quantify value delivered and feed it back into the next Detect cycle.", app: "Platform" },
];

const riskDot: Record<string, string> = {
  Green: "bg-emerald-400",
  Amber: "bg-amber-400",
  Red: "bg-red-400",
};

const shortlist = [
  { name: "Vector", pool: "Navigation", rationale: "Direction + intelligence. Strong aviation resonance. Short, ownable.", risk: "Green" },
  { name: "Atlas", pool: "Navigation", rationale: "Authority, knowledge, maps. Memorable but widely used — clearance risk in software class.", risk: "Amber" },
  { name: "Beacon", pool: "Navigation", rationale: "Signal + guidance. On-message for Detect → Prove. Some crowding in safety tech.", risk: "Amber" },
  { name: "Compass", pool: "Navigation", rationale: "Direction setting. Strong metaphor but heavily used in finance/HR SaaS.", risk: "Red" },
  { name: "Orbit", pool: "Navigation", rationale: "Continuous loop — fits DTOP cycle. Distinctive in aviation context.", risk: "Green" },
  { name: "Horizon", pool: "Navigation", rationale: "Forward-looking, predictive. Already used by several aviation programmes.", risk: "Red" },
  { name: "Pulse", pool: "Signal", rationale: "Living, continuous signal. Strong fit for Detect. Crowded in healthtech.", risk: "Amber" },
  { name: "Sentry", pool: "Signal", rationale: "Watchful, protective. Strong for safety. Risk: feels reactive, not predictive.", risk: "Amber" },
  { name: "Halo", pool: "Signal", rationale: "Surrounds the platform. Distinctive. Existing brand collisions (gaming, automotive).", risk: "Red" },
  { name: "Lumen", pool: "Signal", rationale: "Light, clarity, intelligence. Short, ownable, soft. Some collision in lighting/SaaS.", risk: "Amber" },
  { name: "Crew", pool: "Crew", rationale: "Operator metaphor — your people, augmented. Generic word, hard to TM standalone.", risk: "Red" },
  { name: "Cadre", pool: "Crew", rationale: "Trained, trusted team. Distinctive, ownable, aviation-credible.", risk: "Green" },
];

const top3 = [
  { name: "Vector", body: "Strongest aviation resonance, cleanest sound, easiest sell internally. Implies direction and intelligence in one word. Recommended primary." },
  { name: "Orbit", body: "Best metaphor for the DTOP cycle (Detect → Trigger → Orchestrate → Prove → Detect). Distinctive in our space." },
  { name: "Cadre", body: "Best fit if we want the persona to feel like a trusted operator alongside the crew, not a tool." },
];

const timeline = [
  { w: "Weeks 1–2", body: "ELT alignment on top 3; brief external naming/IP firm (Stobbs or Mishcon)." },
  { w: "Weeks 3–6", body: "Formal TM clearance in UK / EU / US / Madrid Protocol, classes 9 and 42. Domain and social handle sweep." },
  { w: "Weeks 7–10", body: "Customer-tested narrative — 2 live customer councils, 1 analyst preview (Gartner / IDC)." },
  { w: "Weeks 11–12", body: "Lock name. Update decks, site, playbooks. Withdraw or narrow the legacy UK TM in parallel." },
];

const competitors = [
  { v: "Salesforce", p: "Einstein", a: "Agentforce (named agents)", c: "Pipeline stages, not branded" },
  { v: "SAP", p: "Joule", a: "Joule Agents (role-based)", c: "Capabilities behind the persona" },
  { v: "ServiceNow", p: "Now Assist", a: "AI Agents (per workflow)", c: "Workflow stages, not branded" },
  { v: "Optimizely", p: "Opal", a: "Opal Agents (per job)", c: "Implicit; not surfaced as SKUs" },
  { v: "Microsoft", p: "Copilot", a: "Copilot Agents (Studio-built)", c: "Capabilities behind the persona" },
];

const risks = [
  { r: "Multi-jurisdiction TM opposition (UK opened; EU/US likely)", s: "High", m: "18+ months of legal cost; outcome uncertain." },
  { r: "Co- prefix dating the brand vs Einstein/Joule/Opal", s: "High", m: "Re-platform narrative in 18–24 months anyway." },
  { r: "Persona confusion with Copilot / legacy name (generic SaaS pattern)", s: "Med", m: "Heavier brand spend to claim airspace." },
  { r: "Internal divergence — decks already say \"Intelligence Layer\"", s: "Med", m: "Forced rework of recently shipped surfaces." },
  { r: "Agent family naming gets blocked by Tier-3 persona", s: "Med", m: "Cannot land \"Comply365 Agents\" cleanly under a contested name." },
];

const sevColor: Record<string, string> = { High: "text-red-400", Med: "text-amber-400", Low: "text-emerald-400" };

function SectionHero({ n, title, kicker, children }: { n: number; title: string; kicker?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 border-b border-border/40 pb-6">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-5xl font-bold text-primary/30 tabular-nums">{String(n).padStart(2, "0")}</span>
        <div>
          {kicker && <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-1">{kicker}</p>}
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
        </div>
      </div>
      {children && <div className="mt-4 max-w-3xl text-sm text-muted-foreground leading-relaxed">{children}</div>}
    </div>
  );
}

export default function AiNamingBriefViewer() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4">
          <Link to="/market-development" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-4 w-4" /> Market Development
          </Link>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-primary font-medium">
              <Sparkles className="h-3 w-3" /> v1 · Board-ready · Confidential
            </span>
            <a
              href={namingBriefPdf}
              download="Comply365_AI_Naming_Brief_v1.pdf"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-12">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <FileBadge className="h-3 w-3 text-primary" /> Recommendation memo
          </div>
          <h1 className="mt-5 font-display text-5xl md:text-6xl font-bold tracking-tight">
            Naming the <span className="text-primary">Intelligence Layer</span> & Agent Family
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground leading-relaxed">
            Comply365 — AI Brand & Naming Brief. Forwardable to Kathrina, Chris, Neil. A board-ready recommendation
            on retiring the legacy Co-prefix, standardising on Intelligence Layer, and shipping a three-tier naming
            architecture with a JTBD agent family.
          </p>
        </div>

        {/* 01 — Executive Summary */}
        <SectionHero n={1} kicker="Executive summary" title="Situation, recommendation & the ask">
          The UK trademark application for the legacy Co-prefixed name is facing opposition. The market has moved to
          named AI personas with distinct agent families (Einstein + Agentforce, Joule, Now Assist, Opal). Internally
          the narrative has already moved to the Intelligence Layer; externally the legacy name still appears in
          legal filings and a small number of artefacts.
        </SectionHero>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <div className="rounded-xl border border-border/60 bg-card/60 p-6">
            <h3 className="font-display text-lg font-semibold mb-3">Recommendation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <li>• Retire the legacy Co-prefixed name from all customer-facing surfaces. Withdraw or narrow the UK TM rather than fight a multi-jurisdiction opposition.</li>
              <li>• Standardise on <span className="text-foreground font-medium">Intelligence Layer</span> as the architectural term — it describes what the capability is, not a sub-brand.</li>
              <li>• Land a proper persona name for the Intelligence Layer (Tier-1 AI brand). Run a 60–90 day naming sprint with formal TM clearance in UK / EU / US / Madrid.</li>
              <li>• Keep <span className="text-foreground font-medium">DTOP</span> as the four capabilities of the layer — not as four agents. DTOP is the operating model, not a SKU shelf.</li>
              <li>• Introduce a <span className="text-foreground font-medium">Comply365 Agents</span> family. Each agent is a JTBD, slotted under the DTOP stage where the job lives, owned by one application.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-border/60 bg-card/60 p-6">
              <h3 className="font-display text-lg font-semibold mb-2">Why now</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every major operational SaaS has landed a named AI persona plus an agent family in the last 18 months.
                Customers, analysts and regulators are asking the question in those terms. Holding a contested
                Co-prefix slows the conversation and dates the brand before it ships at scale.
              </p>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <h3 className="font-display text-lg font-semibold mb-2 text-primary">The ask</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Board approval for: (a) retiring the legacy name externally, (b) the three-tier naming convention in §2,
                (c) the Capabilities-vs-Agents JTBD model in §3–§4, and (d) a 60–90 day naming sprint to land the
                Intelligence Layer persona name (shortlist in §6).
              </p>
            </div>
          </div>
        </div>

        {/* 02 — Three-Tier Naming */}
        <SectionHero n={2} kicker="Architecture" title="The three-tier naming convention">
          How every Comply365 brand asset hangs together.
        </SectionHero>

        <div className="rounded-xl border border-border/60 bg-card/60 overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium w-28">Tier</th>
                <th className="px-4 py-3 text-left font-medium w-56">Label</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => (
                <tr key={t.tier} className="border-t border-border/40 align-top">
                  <td className="px-4 py-3 font-mono text-xs text-primary">{t.tier}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{t.label}</td>
                  <td className="px-4 py-3 text-muted-foreground leading-relaxed">{t.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-border/60 bg-card/60 p-6 mb-16">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h3 className="font-display text-base font-semibold">Naming rules (non-negotiable)</h3>
          </div>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground">
            {namingRules.map((r) => (
              <li key={r} className="flex gap-2"><span className="text-primary">•</span><span>{r}</span></li>
            ))}
          </ul>
        </div>

        {/* 03 — Architecture at a glance */}
        <SectionHero n={3} kicker="At a glance" title="One platform · three apps · one intelligence layer">
          Four capabilities, many agents. The diagram is the contract: every new AI capability we ship must map
          cleanly onto one DTOP stage, be owned by one application, and — if it does a human job — be named as a
          Comply365 Agent.
        </SectionHero>

        <div className="rounded-xl border border-border/60 bg-card/40 p-6 md:p-8 mb-16 space-y-6">
          <div className="rounded-lg border border-primary/30 bg-primary/5 px-5 py-4 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">Tier 1 · Platform</p>
            <p className="font-display text-xl font-semibold mt-1">Comply365 — Operational Performance Platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {[
              { n: "SafetyManager365", d: "Reporting · Investigation · Risk" },
              { n: "ContentManager365", d: "Manuals · Compliance · Authoring" },
              { n: "TrainingManager365", d: "Competency · Delivery · Records" },
            ].map((a) => (
              <div key={a.n} className="rounded-lg border border-border/60 bg-background/60 px-4 py-3 text-center">
                <p className="font-semibold text-sm">{a.n}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{a.d}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-foreground/20 bg-gradient-to-r from-primary/10 via-violet-500/10 to-emerald-500/10 px-5 py-4 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/70 font-semibold">Tier 3a · Intelligence Layer</p>
            <p className="font-display text-lg font-semibold mt-1">[PersonaName] — one AI brand across all three applications</p>
            <p className="text-xs text-muted-foreground mt-1">~90% domain accuracy at L4–5 vs ~35% generic AI</p>
          </div>

          <div className="grid md:grid-cols-4 gap-3">
            {dtopStages.map((s) => (
              <div key={s.stage} className={`rounded-lg border px-3 py-3 ${dtopColor[s.stage]}`}>
                <p className="text-[10px] uppercase tracking-[0.18em] opacity-80 font-semibold">{s.stage}</p>
                <p className="font-semibold text-sm mt-0.5 text-foreground">{s.sub}</p>
                <ul className="mt-3 space-y-1">
                  {s.agents.map((a) => (
                    <li key={a} className="text-[12px] text-muted-foreground">• {a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 04 — Capabilities vs Agents */}
        <SectionHero n={4} kicker="The JTBD rule" title="Capabilities vs Agents">
          The rule that stops everything becoming "an agent".
        </SectionHero>

        <div className="rounded-xl border border-border/60 bg-card/60 overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium w-32"></th>
                <th className="px-4 py-3 text-left font-medium">Capabilities</th>
                <th className="px-4 py-3 text-left font-medium">Agents</th>
              </tr>
            </thead>
            <tbody>
              {capVsAgents.map((row) => (
                <tr key={row.k} className="border-t border-border/40 align-top">
                  <td className="px-4 py-3 font-medium text-foreground">{row.k}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.c}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <div className="rounded-xl border border-border/60 bg-card/60 p-6">
            <h3 className="font-display text-base font-semibold mb-3">Why DTOP must stay as capabilities</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {dtopReasons.map((r) => <li key={r} className="flex gap-2"><span className="text-primary">•</span><span>{r}</span></li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/60 p-6">
            <h3 className="font-display text-base font-semibold mb-3">Why agents must be JTBD, not features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {jtbdReasons.map((r) => <li key={r} className="flex gap-2"><span className="text-primary">•</span><span>{r}</span></li>)}
            </ul>
          </div>
        </div>

        {/* 05 — Agents Catalogue */}
        <SectionHero n={5} kicker="v1 catalogue" title="Comply365 Agents">
          Every agent is a JTBD, slotted under one DTOP stage, owned by one application.
        </SectionHero>

        <div className="rounded-xl border border-border/60 bg-card/60 overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium w-32">DTOP stage</th>
                <th className="px-4 py-3 text-left font-medium w-56">JTBD agent</th>
                <th className="px-4 py-3 text-left font-medium">The job (in one line)</th>
                <th className="px-4 py-3 text-left font-medium w-48">Owning app</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <tr key={a.name} className="border-t border-border/40 align-top">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${dtopColor[a.stage]}`}>{a.stage}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">{a.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.job}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.app}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mb-16 max-w-3xl">
          <span className="text-foreground font-medium">Locked naming pattern.</span> [Job] Agent — short, descriptive,
          role-based. Family name: Comply365 Agents. New agents must (a) name a real human job, (b) map to exactly
          one DTOP stage, (c) declare an owning application, (d) declare baseline human cost and target automation
          rate before launch.
        </p>

        {/* 06 — Naming shortlist */}
        <SectionHero n={6} kicker="Persona name" title="Naming shortlist — the Intelligence Layer">
          12 candidates screened on ownability, sector fit, pronounceability, intelligence connotation, and initial
          TM-class-9/42 desk risk (not legal clearance).
        </SectionHero>

        <div className="rounded-xl border border-border/60 bg-card/60 overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium w-32">Candidate</th>
                <th className="px-4 py-3 text-left font-medium w-32">Pool</th>
                <th className="px-4 py-3 text-left font-medium">Rationale</th>
                <th className="px-4 py-3 text-left font-medium w-32">Initial risk</th>
              </tr>
            </thead>
            <tbody>
              {shortlist.map((c) => (
                <tr key={c.name} className="border-t border-border/40 align-top">
                  <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.pool}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.rationale}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`h-2 w-2 rounded-full ${riskDot[c.risk]}`} /> {c.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {top3.map((t, i) => (
            <div key={t.name} className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">Top {i + 1}</p>
              <p className="font-display text-2xl font-semibold mt-1">{t.name}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2">{t.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border/60 bg-card/60 p-6 mb-16">
          <h3 className="font-display text-base font-semibold mb-4">60–90 day path to launch</h3>
          <div className="grid md:grid-cols-4 gap-3">
            {timeline.map((t) => (
              <div key={t.w} className="rounded-lg border border-border/60 bg-background/60 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">{t.w}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">{t.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 07 — Appendix */}
        <SectionHero n={7} kicker="Appendix" title="Competitor architectures & risk register">
          Reference material backing the recommendation.
        </SectionHero>

        <h3 className="font-display text-base font-semibold mb-3">A. Competitor AI brand architectures</h3>
        <div className="rounded-xl border border-border/60 bg-card/60 overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium w-36">Vendor</th>
                <th className="px-4 py-3 text-left font-medium w-40">Persona (Tier 1)</th>
                <th className="px-4 py-3 text-left font-medium w-56">Agent family</th>
                <th className="px-4 py-3 text-left font-medium">Capabilities exposed as</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.v} className="border-t border-border/40 align-top">
                  <td className="px-4 py-3 font-medium text-foreground">{c.v}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.p}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.a}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mb-10 max-w-3xl">
          Pattern: every Tier-1 vendor has now landed (a) one persona, (b) a named agent family, (c) capabilities
          hidden behind the persona. Our proposed architecture mirrors this pattern with the DTOP operating model as
          our defensible difference.
        </p>

        <h3 className="font-display text-base font-semibold mb-3">B. Risk register — staying with the legacy name</h3>
        <div className="rounded-xl border border-border/60 bg-card/60 overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Risk</th>
                <th className="px-4 py-3 text-left font-medium w-28">Severity</th>
                <th className="px-4 py-3 text-left font-medium w-[40%]">Mitigation if we stay</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.r} className="border-t border-border/40 align-top">
                  <td className="px-4 py-3 text-foreground">{r.r}</td>
                  <td className={`px-4 py-3 font-medium ${sevColor[r.s]}`}>● {r.s}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-border/60 bg-card/40 p-6 mb-16">
          <h3 className="font-display text-base font-semibold mb-2">Out of scope for this brief</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Formal legal TM clearance (next step with external counsel). Updating any in-product copy, decks or
            playbooks (once a persona name is approved, a follow-on rollout plan covers those surfaces). Picking the
            final persona name — this brief shortlists and recommends; the Board/ELT decides.
          </p>
        </div>

        {/* Footer download */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border border-border/60 bg-card/60 p-6">
          <div>
            <p className="font-display text-lg font-semibold">Need a forwardable copy?</p>
            <p className="text-sm text-muted-foreground">Download the board-ready PDF — identical content, print-formatted.</p>
          </div>
          <a
            href={namingBriefPdf}
            download="Comply365_AI_Naming_Brief_v1.pdf"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>

        <p className="mt-10 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Internal — for ELT / Board distribution
        </p>
      </main>
    </div>
  );
}