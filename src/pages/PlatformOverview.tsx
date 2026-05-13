import { Link } from "react-router-dom";
import {
  ArrowRight,
  Link2,
  Brain,
  ShieldCheck,
  Plane,
  Globe,
  Users,
  Layers,
  Workflow,
  Sparkles,
  Smartphone,
  Zap,
  CheckCircle2,
  Network,
  AlertTriangle,
  TrendingUp,
  Lock,
  ServerCog,
  Database,
  Cable,
  ShieldAlert,
  FileCheck2,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import PlatformArchitectureDiagramV4 from "@/components/platform-slides/PlatformArchitectureDiagramV4";
import logo from "@/assets/comply365-logo-white.png";
import PersonaTabs, { usePersonaState } from "@/components/personas/PersonaTabs";
import { PERSONAS, getPersona } from "@/components/personas/personaConfig";
import TrustLogos from "@/components/home/TrustLogos";
import CustomerQuotes from "@/components/home/CustomerQuotes";
import StatSourceChip from "@/components/shared/StatSourceChip";

// ----------------------------------------------------------------------------
// Sticky in-page nav
// ----------------------------------------------------------------------------
const navItems = [
  { id: "platform", label: "Platform" },
  { id: "foundation", label: "Foundation" },
  { id: "dtop", label: "DTOP" },
  { id: "intelligence", label: "Intelligence" },
  { id: "mobile", label: "Mobile" },
  { id: "integrations", label: "Integrations" },
  { id: "security", label: "Security" },
  { id: "customers", label: "Customers" },
];

const StickyNav = () => (
  <div className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
    <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Comply365" className="h-5" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">
          Operational Performance Platform
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className="text-xs font-medium text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-md hover:bg-accent transition-colors"
          >
            {n.label}
          </a>
        ))}
      </nav>
      <a
        href="#cta"
        className="text-xs font-semibold text-primary hover:underline"
      >
        Book a walkthrough →
      </a>
    </div>
  </div>
);

// ----------------------------------------------------------------------------
// Section: Hero
// ----------------------------------------------------------------------------
const Hero = () => (
  <section className="relative overflow-hidden border-b border-border/60">
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(217_91%_60%/0.10),transparent_55%)]" />
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
      <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3 w-3" /> The Operational Performance Platform
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
            One connected platform for{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              content, safety and training.
            </span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            One connected data model. One operating model. One intelligence layer.
            Built for regulated, operationally complex industries.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Book a walkthrough <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/pitch-executive-3"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40 transition-colors"
            >
              See it in the Medium Pitch
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="flex items-center gap-2"><Plane className="h-3 w-3 text-primary" /> 550+ customers</span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-2"><Users className="h-3 w-3 text-primary" /> ~2.5M users</span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-2"><Globe className="h-3 w-3 text-primary" /> 6 continents</span>
          </div>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// Section: Platform modules grid
// ----------------------------------------------------------------------------
const modules = [
  {
    id: "core",
    tag: "Foundation",
    title: "Core Operational Apps",
    desc: "Three systems of record on one Connected Data Model — covered in the Foundation section.",
    icon: Layers,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
    href: "#platform",
  },
  {
    id: "dtop",
    tag: "Operating Model",
    title: "DTOP",
    desc: "Detect → Trigger → Orchestrate → Prove. The way of working that wraps the entire stack.",
    icon: Workflow,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    href: "#dtop",
  },
  {
    id: "intelligence",
    tag: "Intelligence",
    title: "Intelligence & Orchestration",
    desc: "Automation · Insights · Recommended Actions. Turns operational data into action.",
    icon: Sparkles,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    href: "#intelligence",
  },
  {
    id: "mobile",
    tag: "Frontline",
    title: "Unified Mobile",
    desc: "One trusted shell for the frontline — content, training and safety in the app the crew already uses.",
    icon: Smartphone,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/30",
    href: "#mobile",
  },
];

const PlatformModules = () => (
  <section id="platform" className="border-b border-border/60">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">The Platform</span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          One integrated platform. Wired together by DTOP.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Four building blocks that make operational performance measurable, repeatable and provable.
        </p>
      </div>

      <div className="mt-10 grid lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 flex items-stretch min-h-[420px]">
          <PlatformArchitectureDiagramV4 compact />
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
          {modules.map((m) => (
            <a
              key={m.id}
              href={m.href}
              className={`group rounded-xl border ${m.border} ${m.bg} p-4 hover:border-primary/40 transition-all hover:-translate-y-0.5`}
            >
              <div className="flex items-center gap-2 mb-2">
                <m.icon className={`h-5 w-5 ${m.color}`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${m.color}`}>{m.tag}</span>
              </div>
              <h3 className="text-base font-bold text-foreground">{m.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              <div className={`mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider ${m.color} opacity-70 group-hover:opacity-100`}>
                jump to section <ArrowRight className="h-3 w-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// Section: DTOP
// ----------------------------------------------------------------------------
const foundationSystems = [
  {
    name: "ContentManager365",
    owner: "Head of Content / Tech Pubs",
    tagline: "Operational content as living, queryable knowledge.",
    icon: BookOpen,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    bullets: [
      "Authoring & revision control",
      "Distribution & acknowledgements",
      "Structured for AI & search",
    ],
  },
  {
    name: "SafetyManager365",
    owner: "Head of Safety",
    tagline: "From events to control — closed-loop safety.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    bullets: [
      "Reports, observations & investigations",
      "Risk register & CAPA",
      "Audit-ready evidence by default",
    ],
  },
  {
    name: "TrainingManager365",
    owner: "Head of Training",
    tagline: "Competence wired to operational reality.",
    icon: GraduationCap,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/30",
    bullets: [
      "Curricula, assignments & assessments",
      "Competency & readiness state",
      "Triggered by content & safety events",
    ],
  },
];

const Foundation = () => (
  <section id="foundation" className="border-b border-border/60 bg-card/10">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          The Foundation · Systems of Record
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Three systems of record. One connected data model.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Industry-grade systems for the work that has to be right — content authored once,
          safety closed-loop, training tied to operational reality. The substrate every
          other layer of the platform sits on.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {foundationSystems.map((s) => (
          <div
            key={s.name}
            className={`flex flex-col rounded-xl border ${s.border} ${s.bg} p-6`}
          >
            <div className="flex items-center justify-between">
              <s.icon className={`h-6 w-6 ${s.color}`} />
              <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Owner: {s.owner}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-foreground">{s.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground italic">{s.tagline}</p>
            <ul className="mt-5 space-y-2 flex-1">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${s.color}`} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className={`mt-6 inline-flex self-start items-center gap-1.5 rounded-full border ${s.border} px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${s.color}`}>
              <Database className="h-3 w-3" />
              System of record
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <Network className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              One Connected Data Model
            </div>
            <p className="mt-1 text-sm text-foreground/90">
              The same record powers a manual revision, a safety event and a training
              assignment. Single taxonomy · single identity · single audit trail —
              no point integrations between them, they share a substrate.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const dtopSteps = [
  { letter: "D", name: "Detect", color: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10", desc: "A weak signal appears in operational data — performance, content, training or safety." },
  { letter: "T", name: "Trigger", color: "text-amber-400", border: "border-amber-400/40", bg: "bg-amber-400/10", desc: "The platform initiates the right workflow — a content update, a training campaign, a safety investigation." },
  { letter: "O", name: "Orchestrate", color: "text-violet-400", border: "border-violet-400/40", bg: "bg-violet-400/10", desc: "The right teams coordinate the response across functions, with context and recommended actions." },
  { letter: "P", name: "Prove", color: "text-emerald-400", border: "border-emerald-400/40", bg: "bg-emerald-400/10", desc: "Every step is logged, linked and traceable. The audit trail is a byproduct, not a project." },
];

const DTOPSection = () => {
  const { persona } = usePersonaState();
  return (
  <section id="dtop" className="border-b border-border/60 bg-card/20">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 max-w-5xl">
        <div>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">The Operating Model · Wraps the stack</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Detect → Trigger → Orchestrate → Prove.
          </h2>
          <p className="mt-3 text-muted-foreground">
            The closed-loop way of working that turns scattered events into measured performance.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Show me as</div>
          <PersonaTabs />
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-4 gap-3">
        {dtopSteps.map((s, i) => {
          const focused = persona.dtopFocus === s.letter;
          return (
          <div key={s.letter} className={`relative rounded-xl border ${s.border} ${s.bg} p-5 transition-all ${focused ? "ring-2 ring-offset-2 ring-offset-background ring-foreground/30 scale-[1.02]" : "opacity-90"}`}>
            <div className={`text-5xl font-bold ${s.color} leading-none`}>{s.letter}</div>
            <div className="mt-2 text-base font-bold text-foreground">{s.name}</div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            {focused && (
              <div className={`mt-3 text-[10px] uppercase tracking-[0.18em] ${persona.color}`}>Your focus · {persona.shortRole}</div>
            )}
            {i < dtopSteps.length - 1 && (
              <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 z-10" />
            )}
          </div>
        );})}
      </div>

      <div className={`mt-6 rounded-xl border ${persona.border} ${persona.bg} p-4 text-sm`}>
        <span className={`text-[10px] uppercase tracking-[0.18em] ${persona.color} mr-2`}>{persona.shortRole} lens</span>
        <span className="text-foreground">{persona.dtopFocusReason}</span>
      </div>

      <div className="mt-8 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-5">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400 mb-2">Scenario</div>
        <p className="text-sm text-foreground leading-relaxed">
          A high-risk operational anomaly appears →{" "}
          <span className="text-amber-400 font-medium">a workflow is triggered</span> across the right teams →{" "}
          <span className="text-violet-400 font-medium">content, training and safety actions are orchestrated</span> with linked evidence →{" "}
          <span className="text-emerald-400 font-medium">the audit trail is produced automatically</span>. No spreadsheets. No retroactive narrative.
        </p>
      </div>
    </div>
  </section>
);
};

// ----------------------------------------------------------------------------
// Section: Intelligence
// ----------------------------------------------------------------------------
const intelligenceTiles = [
  {
    icon: Zap,
    title: "Automation",
    promise: "Threshold-driven, role-aware workflows across the operational stack.",
    bullets: ["Event-triggered actions", "Cross-functional orchestration", "No/low-code configurability"],
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
  },
  {
    icon: Sparkles,
    title: "Insights & Intelligence",
    promise: "Just ask. Platform-wide answers grounded in your operational data.",
    bullets: ["Natural-language queries", "Cross-module signals", "Linked evidence in every answer"],
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
  },
  {
    icon: Brain,
    title: "Intelligence Layer — Recommended Actions",
    promise: "Generative AI built on your operational corpus, not a wrapper around a generic model.",
    bullets: ["Recommended actions, not just alerts", "Domain-trained at L4–L5", "Exception-led human oversight"],
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
];

const Intelligence = () => (
  <section id="intelligence" className="border-b border-border/60">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">The Intelligence Layer</span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Generative AI built on your operational corpus.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Three capabilities that turn operational data into action — automation that adapts, insights that just answer, and recommendations grounded in your domain.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {intelligenceTiles.map((t) => (
          <div key={t.title} className={`rounded-2xl border ${t.border} ${t.bg} p-5 flex flex-col`}>
            <t.icon className={`h-6 w-6 ${t.color} mb-3`} />
            <h3 className="text-base font-bold text-foreground">{t.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{t.promise}</p>
            <ul className="mt-4 space-y-1.5">
              {t.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs text-foreground">
                  <CheckCircle2 className={`h-3.5 w-3.5 mt-0.5 ${t.color} flex-shrink-0`} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            Intelligence Layer · Anchor metric
            <StatSourceChip source="Internal benchmarks on the operational corpus, validated per customer engagement. Generic AI baseline measured against same operational queries." />
          </div>
          <div className="mt-1 text-2xl md:text-3xl font-bold text-foreground">
            ~90% domain accuracy at L4–L5 <span className="text-muted-foreground font-normal text-lg">vs ~35% generic AI</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// Section: Mobile
// ----------------------------------------------------------------------------
const Mobile = () => (
  <section id="mobile" className="border-b border-border/60 bg-card/20">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative mx-auto w-[260px] h-[520px] rounded-[2.5rem] border-4 border-border bg-card shadow-2xl overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
              <div className="mt-1 h-3 w-20 rounded-full bg-background" />
            </div>
            <div className="pt-10 px-4 space-y-3">
              <div className="rounded-xl bg-primary/15 border border-primary/30 p-3">
                <div className="text-[9px] uppercase tracking-wider text-primary font-bold">For your shift</div>
                <div className="text-xs font-semibold text-foreground mt-1">Updated procedure · acknowledge before duty</div>
              </div>
              <div className="rounded-xl bg-emerald-400/10 border border-emerald-400/30 p-3">
                <div className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Training</div>
                <div className="text-xs font-semibold text-foreground mt-1">2 modules due · 18 min</div>
              </div>
              <div className="rounded-xl bg-violet-400/10 border border-violet-400/30 p-3">
                <div className="text-[9px] uppercase tracking-wider text-violet-400 font-bold">Safety</div>
                <div className="text-xs font-semibold text-foreground mt-1">Submit observation · attach photo</div>
              </div>
              <div className="rounded-xl bg-amber-400/10 border border-amber-400/30 p-3">
                <div className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">Content</div>
                <div className="text-xs font-semibold text-foreground mt-1">Latest manual · offline available</div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">The Frontline · Unified Mobile</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            One trusted shell for the frontline.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Content, training and safety in a single app the crew already uses every shift — contextual to role, location and the moment.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              { i: Smartphone, t: "One app, three core domains", d: "No context-switching between portals. Content, training and safety in one shell." },
              { i: Network, t: "Works offline, syncs cleanly", d: "Built for hangars, depots, ramps, remote sites and intermittent connectivity." },
              { i: Users, t: "Contextual to the user", d: "Role-, shift- and location-aware. The right thing surfaces at the right time." },
            ].map((b) => (
              <li key={b.t} className="flex items-start gap-3">
                <div className="rounded-lg bg-violet-400/10 border border-violet-400/30 p-2">
                  <b.i className="h-4 w-4 text-violet-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{b.t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{b.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// Section: Why It Works
// ----------------------------------------------------------------------------
const integrations = [
  { icon: Database, title: "One Connected Data Model", desc: "A shared substrate across content, safety and training — not point integrations." },
  { icon: Cable, title: "Standard Adaptors", desc: "REST API, document ingestion, OneRoster, SCORM, evidence export." },
  { icon: Network, title: "Source Systems", desc: "Plug into operational data — performance, scheduling, ops, ERP, IAM." },
  { icon: FileCheck2, title: "Evidence Out", desc: "Audit-ready exports for regulators and internal assurance — by design." },
];

const Integrations = () => (
  <section id="integrations" className="border-b border-border/60">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">Integrations &amp; Data Model</span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Built to plug into the operation, not replace it.
        </h2>
        <p className="mt-3 text-muted-foreground">
          The platform shares one data model across modules, and connects out through standard adaptors and APIs.
        </p>
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((i) => (
          <div key={i.title} className="rounded-2xl border border-border bg-card/40 p-5">
            <i.icon className="h-6 w-6 text-cyan-400 mb-3" />
            <h3 className="text-sm font-bold text-foreground">{i.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{i.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const securityPillars = [
  { icon: Lock, title: "Identity & Access", desc: "SSO, SAML, OIDC, RBAC down to record level. Your IAM, not ours." },
  { icon: ShieldAlert, title: "Operational Security", desc: "Encryption in transit and at rest. Region-pinned data residency. Tenant isolation." },
  { icon: ServerCog, title: "Deployment", desc: "Cloud, sovereign cloud and regulated tenancy options for defense and aviation." },
  { icon: FileCheck2, title: "Compliance Posture", desc: "Built for regulated, mission-critical industries — auditable by design." },
];

const Security = () => (
  <section id="security" className="border-b border-border/60 bg-card/20">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Security, Compliance &amp; Deployment</span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          The posture regulated operators expect.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Designed for the COO, CIO and CISO buying together — without slowing the operation down.
        </p>
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityPillars.map((s) => (
          <div key={s.title} className="rounded-2xl border border-primary/20 bg-card/40 p-5">
            <s.icon className="h-6 w-6 text-primary mb-3" />
            <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const diffs = [
  {
    icon: Link2,
    title: "Connected Foundation",
    desc: "One Connected Data Model, three core apps, one intelligence layer for content, training and safety.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/30",
  },
  {
    icon: Brain,
    title: "Domain-Trained Intelligence",
    desc: "Built on your operational corpus — not a generic model with a domain wrapper. Purpose-built for regulated, complex operations.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  {
    icon: ShieldCheck,
    title: "Proof by Design",
    desc: "Every action logged automatically. The audit trail is a byproduct, not a report. Closed loop — Detect, Trigger, Orchestrate, Prove.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
];

const trust = [
  { icon: Plane, value: "550+", label: "Customers worldwide" },
  { icon: Users, value: "~2.5M", label: "Users" },
  { icon: Globe, value: "6", label: "Continents" },
];

const Why = () => (
  <section id="why" className="border-b border-border/60 bg-card/10">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Why It Works</span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Point solutions manage silos. Generic AI creates noise. We close the loop.
        </h2>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {diffs.map((d) => (
          <div key={d.title} className={`rounded-2xl border ${d.border} ${d.bg} p-6`}>
            <d.icon className={`h-7 w-7 ${d.color} mb-3`} />
            <h3 className={`text-lg font-bold ${d.color}`}>{d.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// Section: CTA
// ----------------------------------------------------------------------------
const CTA = () => (
  <section id="cta" className="bg-gradient-to-b from-background to-card/30">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/40 to-card/10 p-10 md:p-14 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Ready to see the platform in motion?
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Walk through the operating model, the intelligence layer, and the outcomes — tailored to your operation in under an hour.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:hello@comply365.com" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Book a walkthrough <ArrowRight className="h-4 w-4" />
          </a>
          <Link to="/pitch-executive-3" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40 transition-colors">
            See the Medium Pitch
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-border/60">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Industry deep dives</div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { to: "/solutions/airlines", label: "Aviation" },
              { to: "/solutions/rail", label: "Rail" },
              { to: "/solutions/defense", label: "Defense" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/40 px-4 py-2 text-xs font-semibold text-foreground hover:border-primary/40 transition-colors">
                {l.label} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------------
export default function PlatformOverview() {
  return (
    <div className="min-h-screen bg-background">
      <StickyNav />
      <Hero />
      <TrustLogos />
      <PlatformModules />
      <Foundation />
      <DTOPSection />
      <Intelligence />
      <Mobile />
      <Integrations />
      <Security />
      <div id="customers">
        <CustomerQuotes />
      </div>
      <Why />
      <CTA />
    </div>
  );
}
