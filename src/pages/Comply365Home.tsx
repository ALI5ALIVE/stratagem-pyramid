import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Workflow,
  Brain,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Network,
  TrendingUp,
  Users,
} from "lucide-react";
import logo from "@/assets/comply365-logo-white.png";
import { PERSONAS } from "@/components/personas/personaConfig";

// ----------------------------------------------------------------------------
// Top bar
// ----------------------------------------------------------------------------
const TopBar = () => (
  <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
    <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Comply365" className="h-6" />
        <span className="hidden sm:inline text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Operational Performance Platform
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
        <Link to="/platform" className="hover:text-foreground transition-colors">Platform</Link>
        <Link to="/solutions/airlines" className="hover:text-foreground transition-colors">Airlines</Link>
        <Link to="/solutions/defense" className="hover:text-foreground transition-colors">Defense</Link>
        <Link to="/solutions/rail" className="hover:text-foreground transition-colors">Rail</Link>
      </nav>
      <a href="#cta" className="text-xs font-semibold rounded-full bg-primary text-primary-foreground px-3 py-1.5 hover:bg-primary/90 transition-colors">
        Book a walkthrough
      </a>
    </div>
  </header>
);

// ----------------------------------------------------------------------------
// 1. Hero
// ----------------------------------------------------------------------------
const Hero = () => (
  <section className="relative overflow-hidden border-b border-border/60">
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--primary)/0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(38_92%_55%/0.10),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-24 md:pt-32 md:pb-28">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
        <Sparkles className="h-3 w-3" /> The Operational Performance Platform
      </span>
      <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.02] text-foreground max-w-5xl">
        Operations runs on signals.{" "}
        <span className="text-muted-foreground/70">Nobody acts on them.</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
        Comply365 turns operational signals into prescriptive action — across Content, Safety and Training.
        One connected data model. One operating rhythm. One source of truth.
      </p>
      <p className="mt-3 text-sm text-muted-foreground/80 max-w-2xl">
        Built for the COO and the heads of Safety, Content and Training — the people accountable when operations slip.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          to="/platform"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Explore the Platform <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="#cta"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-card/80 transition-colors"
        >
          Book a walkthrough
        </a>
      </div>

      {/* DTOP one-line strap */}
      <div className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-500" /> Detect</span>
        <ArrowRight className="h-3 w-3 opacity-40" />
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" /> Trigger</span>
        <ArrowRight className="h-3 w-3 opacity-40" />
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-violet-500" /> Orchestrate</span>
        <ArrowRight className="h-3 w-3 opacity-40" />
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Prove</span>
        <span className="ml-2 text-muted-foreground/70 normal-case tracking-normal">— the operating model that turns signals into outcomes</span>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// 2. Stakes
// ----------------------------------------------------------------------------
const stakes = [
  {
    value: "$25–35B",
    label: "Systemic exposure",
    note: "Annual industry cost of disconnected operations.",
  },
  {
    value: "~65%",
    label: "Signals lost",
    note: "Operational signals that never trigger an action.",
  },
  {
    value: "70%",
    label: "Controllable cost reclaimed",
    note: "Faster time-to-change, less rework, fewer recurrent disruptions.",
  },
];

const Stakes = () => (
  <section className="border-b border-border/60 bg-card/20">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-400/90">
        <AlertTriangle className="h-3.5 w-3.5" /> The cost of disconnected operations
      </div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
        Every silo is a signal that didn't make it home.
      </h2>
      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {stakes.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-7">
            <div className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">{s.value}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted-foreground max-w-2xl">
        This is what happens when Content, Safety and Training don't talk to each other.
      </p>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// 3. Today vs Tomorrow
// ----------------------------------------------------------------------------
const todayWords = ["Siloed", "Reactive", "Manual", "Unverified", "Document-bound"];
const tomorrowWords = ["Connected", "Predictive", "Automated", "Provable", "Action-bound"];

const Shift = () => (
  <section className="border-b border-border/60">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">From reaction to control</div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
        The shift isn't more software. It's a connected operating model.
      </h2>

      <div className="mt-12 grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
        <div className="bg-card/30 p-10">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground/80">Today</div>
          <div className="mt-3 font-display text-2xl font-semibold text-muted-foreground">Operations as exhaust</div>
          <ul className="mt-8 space-y-3">
            {todayWords.map((w) => (
              <li key={w} className="text-lg text-muted-foreground/70 line-through decoration-muted-foreground/40">
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-primary/10 via-card/40 to-card/10 p-10">
          <div className="text-xs uppercase tracking-[0.22em] text-primary">Tomorrow</div>
          <div className="mt-3 font-display text-2xl font-semibold text-foreground">Operations as control surface</div>
          <ul className="mt-8 space-y-3">
            {tomorrowWords.map((w) => (
              <li key={w} className="text-lg text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// 4. The Platform — three modules, one model
// ----------------------------------------------------------------------------
const modules = [
  {
    name: "ContentManager365",
    icon: BookOpen,
    blurb: "Operational content as living, queryable knowledge — not static manuals.",
    accent: "from-primary to-cyan-500",
    href: "/platform#platform",
  },
  {
    name: "SafetyManager365",
    icon: ShieldCheck,
    blurb: "Safety, quality and risk in one prescriptive layer — events to control.",
    accent: "from-emerald-500 to-primary",
    href: "/platform#platform",
  },
  {
    name: "TrainingManager365",
    icon: GraduationCap,
    blurb: "Competency tied to operational reality — readiness, not records.",
    accent: "from-violet-500 to-fuchsia-500",
    href: "/platform#platform",
  },
];

const Platform = () => (
  <section className="border-b border-border/60 bg-card/20">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">The platform</div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
        Three modules. One connected data model.
      </h2>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        The same record powers a manual revision, a safety event and a training assignment — because they share a substrate, not just an integration.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-3">
        {modules.map((m) => (
          <Link
            key={m.name}
            to={m.href}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 hover:border-primary/40 transition-all"
          >
            <div className={`h-8 w-8 rounded-md bg-secondary flex items-center justify-center shrink-0`}>
              <m.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display text-sm font-semibold text-foreground truncate">{m.name}</div>
              <div className="text-[11px] text-muted-foreground truncate">{m.blurb}</div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-primary shrink-0" />
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
        <Network className="h-4 w-4 text-primary" /> One Connected Data Model
        <Link to="/platform#platform" className="ml-auto text-primary normal-case tracking-normal hover:underline">
          See the full platform →
        </Link>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// 5. Intelligence Edge
// ----------------------------------------------------------------------------
const Intelligence = () => (
  <section className="border-b border-border/60 relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.12),transparent_60%)]" />
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary">
        <Brain className="h-3.5 w-3.5" /> The intelligence edge — CoAnalyst
      </div>
      <div className="mt-8 flex items-end justify-center gap-6 md:gap-12 flex-wrap">
        <div>
          <div className="font-display text-7xl md:text-9xl font-bold tracking-tight text-foreground leading-none">~90%</div>
          <div className="mt-2 text-xs uppercase tracking-[0.22em] text-primary">Domain accuracy at L4–5</div>
        </div>
        <div className="text-3xl md:text-5xl font-display font-light text-muted-foreground/60 pb-2">vs</div>
        <div>
          <div className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-muted-foreground/70 leading-none">~35%</div>
          <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">Generic AI</div>
        </div>
      </div>
      <p className="mt-10 text-lg md:text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
        CoAnalyst is the only operational AI that understands your manuals, your safety reports
        and your training records — together.
      </p>
      <div className="mt-8 flex items-center justify-center flex-wrap gap-2">
        {["Generative AI", "Recommended Actions", "Operational Data"].map((c) => (
          <span key={c} className="text-[11px] uppercase tracking-[0.18em] rounded-full border border-border bg-card/60 px-3 py-1 text-muted-foreground">
            {c}
          </span>
        ))}
      </div>
      <Link to="/platform#intelligence" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
        See how CoAnalyst works <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// 6. DTOP in 60 seconds
// ----------------------------------------------------------------------------
const dtopSteps = [
  { letter: "D", name: "Detect", color: "blue", line: "Surface the signal in operational data." },
  { letter: "T", name: "Trigger", color: "amber", line: "Decide it matters. Route it to the right owner." },
  { letter: "O", name: "Orchestrate", color: "violet", line: "Coordinate the response across teams and systems." },
  { letter: "P", name: "Prove", color: "emerald", line: "Close the loop with evidence and outcome." },
];

const dtopColor = (c: string) =>
  ({
    blue: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    violet: "border-violet-500/40 bg-violet-500/10 text-violet-300",
    emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  }[c] || "");

const DTOP = () => (
  <section className="border-b border-border/60 bg-card/20">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <Workflow className="h-3.5 w-3.5" /> DTOP in 60 seconds
      </div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
        The operating model that turns events into control.
      </h2>

      <div className="mt-12 grid md:grid-cols-4 gap-2 items-stretch">
        {dtopSteps.map((s, i) => (
          <div key={s.letter} className={`relative rounded-xl border ${dtopColor(s.color)} px-4 py-4 flex items-center gap-3`}>
            <div className={`h-8 w-8 rounded-md flex items-center justify-center font-display text-sm font-bold border ${dtopColor(s.color)} shrink-0`}>
              {s.letter}
            </div>
            <div className="min-w-0">
              <div className="font-display text-sm font-semibold text-foreground">{s.name}</div>
              <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{s.line}</div>
            </div>
            {i < dtopSteps.length - 1 && (
              <ArrowRight className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 z-10" />
            )}
          </div>
        ))}
      </div>

      <Link to="/platform#dtop" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
        See the full operating model <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// 7. Proof & Trust
// ----------------------------------------------------------------------------
const customerLogos = ["Qantas", "Royal Air Force", "Ministry of Defence", "British Airways", "Delta"];

const Trust = () => (
  <section className="border-b border-border/60">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-emerald-400/90">
        <ShieldCheck className="h-3.5 w-3.5" /> Proof
      </div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
        Trusted to run mission-critical operations.
      </h2>

      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {[
          { value: "550+", label: "Customers" },
          { value: "~2.5M", label: "Users worldwide" },
          { value: "6", label: "Continents" },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl border border-border bg-card p-7">
            <div className="font-display text-4xl font-bold text-foreground">{m.value}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {customerLogos.map((c) => (
          <div key={c} className="h-16 rounded-xl border border-border bg-card/40 flex items-center justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {c}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// 8. CTA
// ----------------------------------------------------------------------------
const CTA = () => (
  <section id="cta" className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.18),transparent_65%)]" />
    <div className="max-w-7xl mx-auto px-6 py-28 text-center">
      <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary">
        <TrendingUp className="h-3.5 w-3.5" /> Your move
      </div>
      <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
        What would you do with control?
      </h2>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
        See the platform that connects Content, Safety and Training — and turns operational signals into action.
      </p>
      <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
        <a
          href="mailto:hello@comply365.com?subject=Walkthrough%20request"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Book a walkthrough <ArrowRight className="h-4 w-4" />
        </a>
        <Link
          to="/platform"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-foreground hover:bg-card/80 transition-colors"
        >
          Explore the Platform
        </Link>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <Link to="/solutions/airlines" className="hover:text-foreground">Airlines</Link>
        <span className="opacity-30">·</span>
        <Link to="/solutions/defense" className="hover:text-foreground">Defense</Link>
        <span className="opacity-30">·</span>
        <Link to="/solutions/rail" className="hover:text-foreground">Rail</Link>
        <span className="opacity-30">·</span>
        <Link to="/platform" className="hover:text-foreground">Platform</Link>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------------
export default function Comply365Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Hero />
      <Stakes />
      <Shift />
      <Platform />
      <Intelligence />
      <DTOP />
      <Trust />
      <CTA />
    </div>
  );
}
