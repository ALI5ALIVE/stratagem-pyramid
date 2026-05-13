import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, AlertTriangle, BookOpen, ShieldCheck, GraduationCap, Network, TrendingUp } from "lucide-react";
import logo from "@/assets/comply365-logo-white.png";
import StatSourceChip from "@/components/shared/StatSourceChip";
import SeoHead from "@/components/home/SeoHead";
import TrustLogos from "@/components/home/TrustLogos";
import AnimatedDTOP from "@/components/home/AnimatedDTOP";
import CoAnalystComparison from "@/components/home/CoAnalystComparison";
import CustomerQuotes from "@/components/home/CustomerQuotes";
import HomeFooter from "@/components/home/HomeFooter";
import BookWalkthroughDialog from "@/components/home/BookWalkthroughDialog";
import UnifiedPlatformDiagram from "@/components/home/UnifiedPlatformDiagram";
import IndustryTiles from "@/components/home/IndustryTiles";

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
      <BookWalkthroughDialog
        trigger={
          <button className="text-xs font-semibold rounded-full bg-primary text-primary-foreground px-3 py-1.5 hover:bg-primary/90 transition-colors">
            Book a walkthrough
          </button>
        }
      />
    </div>
  </header>
);

// ----------------------------------------------------------------------------
// 1. Hero (with inline product peek)
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
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-24 grid lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          <Sparkles className="h-3 w-3" /> The Operational Performance Platform
        </span>
        <h1 className="mt-6 font-display text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.04] text-foreground">
          Operations runs on signals.{" "}
          <span className="text-muted-foreground/70">Nobody acts on them.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
          Comply365 turns operational signals into prescriptive action — across Content, Safety and Training. One connected data model. One operating rhythm.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <BookWalkthroughDialog
            trigger={
              <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors">
                Book a walkthrough <ArrowRight className="h-4 w-4" />
              </button>
            }
          />
          <Link to="/platform" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            See the platform <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-500" /> Detect</span>
          <ArrowRight className="h-3 w-3 opacity-40" />
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" /> Trigger</span>
          <ArrowRight className="h-3 w-3 opacity-40" />
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-violet-500" /> Orchestrate</span>
          <ArrowRight className="h-3 w-3 opacity-40" />
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Prove</span>
        </div>
      </div>

      {/* Product peek */}
      <div className="lg:col-span-5 hidden lg:block">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-emerald-500/10 blur-2xl" />
          <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="bg-muted/30 px-4 py-2 flex items-center gap-2 border-b border-border">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Intelligence Layer</span>
            </div>
            <div className="p-5 space-y-4">
              <div className="rounded-lg bg-muted/40 px-3 py-2 text-sm">
                What revisions affect crews not yet recurrent?
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="h-3 w-3" /> Recommended Action
                </div>
                <p className="mt-2 text-sm text-foreground leading-relaxed">
                  <span className="font-semibold">QRH 7.12 r.14</span> — step 3 changed. <span className="font-semibold">42 crews</span> need recurrent.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-muted-foreground">QRH r.14</span>
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-muted-foreground">Training</span>
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-muted-foreground">SMS #4421</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// Why now — merged Signals + Stakes
// ----------------------------------------------------------------------------
const SIGNAL_TYPES = [
  { dot: "bg-blue-500", tag: "Operational", line: "A KPI drifts off-target." },
  { dot: "bg-amber-500", tag: "Content", line: "A manual revision is published." },
  { dot: "bg-violet-500", tag: "Training", line: "A competency gap appears." },
  { dot: "bg-emerald-500", tag: "Safety", line: "An observation is filed." },
];

const STAKES = [
  {
    value: "$25–35B",
    label: "Systemic exposure",
    note: "Annual industry cost of disconnected operations.",
    source: "Composite of Eurocontrol delay-cost models (2023), IATA disruption studies, SITA baggage IT insights, and Allianz aviation risk barometer. See DTOP industry exposure citation stack.",
  },
  {
    value: "~65%",
    label: "Signals lost",
    note: "Operational signals that never trigger an action.",
    source: "Internal benchmark across deployed Comply365 customers comparing reported events vs closed-loop actions taken (2022–2024).",
  },
  {
    value: "70%",
    label: "Controllable cost reclaimed",
    note: "Faster time-to-change, less rework, fewer recurrent disruptions.",
    methodology: "Modeled outcome based on customer pilot data and Line of Sight ROI calculator. Individual results vary by baseline maturity.",
    source: "Comply365 Line of Sight benchmarks; ROI modeling caveats apply.",
  },
];

const WhyNow = () => (
  <section className="border-b border-border/60 bg-card/20">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-400/90">
        <AlertTriangle className="h-3.5 w-3.5" /> Why now
      </div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-4xl">
        Every silo is a signal that didn't make it home.
      </h2>

      <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left: signal definition */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">A signal is…</div>
          <p className="mt-3 text-lg text-foreground leading-relaxed">
            Anything your operation is trying to tell you — before it becomes an incident.
          </p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            They live in your manuals, your safety reports, your training records, your operational data. Most never make it into a decision.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {SIGNAL_TYPES.map((s) => (
              <div key={s.tag} className="rounded-lg border border-border bg-card/60 px-3 py-2.5 flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.tag}</div>
                  <div className="text-xs text-foreground truncate">{s.line}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: stakes */}
        <div className="space-y-3">
          {STAKES.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-6 flex items-center gap-6">
              <div className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground shrink-0 min-w-[110px]">
                {s.value}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.label}
                  <StatSourceChip source={s.source} methodology={s.methodology} />
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* From → To strip */}
      <div className="mt-12 rounded-2xl border border-border bg-card/40 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap text-sm">
          <span className="text-muted-foreground/70">From</span>
          {["Siloed", "Reactive", "Manual", "Document-bound"].map((w) => (
            <span key={w} className="text-muted-foreground/80">{w}</span>
          ))}
        </div>
        <ArrowRight className="h-4 w-4 text-primary shrink-0" />
        <div className="flex items-center gap-3 flex-wrap text-sm">
          <span className="text-primary uppercase tracking-[0.18em] text-xs">To</span>
          {["Connected", "Predictive", "Automated", "Action-bound"].map((w) => (
            <span key={w} className="text-foreground font-semibold">{w}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// Three modules — denser
// ----------------------------------------------------------------------------
const MODULES = [
  {
    name: "ContentManager365",
    icon: BookOpen,
    blurb: "Operational content as living, queryable knowledge.",
    outcome: "Audit-ready in days, not weeks.",
  },
  {
    name: "SafetyManager365",
    icon: ShieldCheck,
    blurb: "Safety, quality and risk in one prescriptive layer.",
    outcome: "Every event closes with evidence.",
  },
  {
    name: "TrainingManager365",
    icon: GraduationCap,
    blurb: "Competency tied to operational reality.",
    outcome: "Readiness, not records.",
  },
];

const Platform = () => (
  <section className="border-b border-border/60">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">The platform</div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
        Three modules. One connected data model.
      </h2>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        The same record powers a manual revision, a safety event and a training assignment — because they share a substrate, not just an integration.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {MODULES.map((m) => (
          <Link
            key={m.name}
            to="/platform#platform"
            className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
          >
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
              <m.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-4 font-display text-base font-semibold text-foreground">{m.name}</div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{m.blurb}</p>
            <div className="mt-4 pt-4 border-t border-border/60 text-sm font-semibold text-primary">
              {m.outcome}
            </div>
          </Link>
        ))}
      </div>

      {/* Connected model diagram */}
      <div className="mt-10 rounded-2xl border border-border bg-card/40 p-8">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-6 flex-wrap">
            {MODULES.map((m) => (
              <div key={m.name} className="flex items-center gap-2 text-sm text-foreground">
                <m.icon className="h-4 w-4 text-primary" /> {m.name}
              </div>
            ))}
          </div>
          <ArrowRight className="h-5 w-5 text-primary" />
          <div className="flex items-center gap-2.5 text-sm font-semibold text-primary uppercase tracking-[0.18em]">
            <Network className="h-4 w-4" /> One Connected Data Model
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Final CTA
// ----------------------------------------------------------------------------
const CTA = () => (
  <section id="cta" className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.18),transparent_65%)]" />
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary">
        <TrendingUp className="h-3.5 w-3.5" /> Your move
      </div>
      <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
        What would you do with control?
      </h2>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
        See the platform that connects Content, Safety and Training — and turns operational signals into action.
      </p>
      <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
        <BookWalkthroughDialog
          trigger={
            <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:bg-primary/90 transition-colors">
              Book a walkthrough <ArrowRight className="h-4 w-4" />
            </button>
          }
        />
        <Link to="/platform" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors">
          Explore the platform <ArrowRight className="h-3.5 w-3.5" />
        </Link>
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
      <SeoHead />
      <TopBar />
      <Hero />
      <TrustLogos />
      <WhyNow />
      <UnifiedPlatformDiagram />
      <Platform />
      <CoAnalystComparison />
      <AnimatedDTOP />
      <CustomerQuotes />
      <IndustryTiles />
      <CTA />
      <HomeFooter />
    </div>
  );
}