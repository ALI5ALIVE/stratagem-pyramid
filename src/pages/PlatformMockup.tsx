import { ArrowRight, Sparkles, Shield, FileText, GraduationCap, Layers, Workflow, BadgeCheck, Database, Lock, Plane, Train, Crosshair } from "lucide-react";
import TopNav from "@/components/home/TopNav";
import CustomerTrustBar from "@/components/home/CustomerTrustBar";
import Footer from "@/components/home/Footer";
import PlatformArchitectureDiagramV4 from "@/components/platform-slides/PlatformArchitectureDiagramV4";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import heroStack from "@/assets/platform-mockup/platform-hero-stack.jpg";
import fragmentation from "@/assets/platform-mockup/fragmentation-inboxes.jpg";
import dtopTrace from "@/assets/platform-mockup/dtop-signal-trace.jpg";
import moduleContent from "@/assets/platform-mockup/module-content-platform.jpg";
import moduleSafety from "@/assets/platform-mockup/module-safety-platform.jpg";
import moduleTraining from "@/assets/platform-mockup/module-training-platform.jpg";
import intelVsGeneric from "@/assets/platform-mockup/intelligence-vs-generic-platform.jpg";
import steppingStones from "@/assets/platform-mockup/stepping-stones-curve.jpg";
import ctaBanner from "@/assets/platform-mockup/cta-platform-banner.jpg";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary/80">
    <span className="h-px w-8 bg-primary/40" />
    {children}
  </div>
);

export default function PlatformMockup() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />

      {/* 1. HERO */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Eyebrow>The Operational Performance Platform</Eyebrow>
            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              One platform where Operations, Safety and Training{" "}
              <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
                finally move as one.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Built for the operators who can't afford to get it wrong — connecting ContentManager365,
              SafetyManager365 and TrainingManager365 through an Intelligence Layer trained on your domain,
              not the open web.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="gap-2">Talk to us <ArrowRight className="h-4 w-4" /></Button>
              <Button size="lg" variant="outline">See the operating model</Button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6 text-sm text-muted-foreground">
              <span>50+ operators</span><span>·</span>
              <span>1M+ frontline users</span><span>·</span>
              <span>~90% domain accuracy</span>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/20 via-violet-500/10 to-transparent blur-3xl" />
            <img
              src={heroStack}
              alt="Layered platform stack: data model, three modules, Intelligence Layer"
              width={1600}
              height={1088}
              className="relative rounded-2xl border border-border/40 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="py-12 border-b border-border/40">
        <p className="text-center text-sm text-muted-foreground mb-6">
          Trusted by 50+ airlines, defense forces and rail operators — including 7 of the top 10 North American carriers.
        </p>
        <CustomerTrustBar />
      </section>

      {/* 3. THE PROBLEM */}
      <section className="py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Eyebrow>The Wiring Problem</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Your teams are excellent. Your systems were never designed to talk to each other.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A flight-data alert lands in one inbox. A safety report in another. A training expiry in a third.
              Six weeks later, the loop closes — if it closes at all. Fragmentation isn't a people problem; on a
              mid-size fleet it's a <span className="text-foreground font-semibold">$110M+ annual drag</span> on
              schedule, fuel, AOG and findings.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { v: "$8K–$25K", l: "fuel cost of one avoidable go-around" },
                { v: "Up to $500K", l: "cost of one AOG day" },
                { v: "$50K–$2M", l: "exposure of one regulatory finding" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl border border-border/40 bg-card/40 p-4">
                  <div className="text-xl font-bold text-primary">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-red-500/5 blur-3xl" />
            <img
              src={fragmentation}
              alt="Three disconnected app windows with broken connector lines"
              loading="lazy"
              className="relative rounded-2xl border border-border/40 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 4. PLATFORM PICTURE */}
      <section className="py-24 border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12 space-y-4">
            <Eyebrow>One Platform · One Operating Model</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Foundation, modules, intelligence — wrapped in a closed loop.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              One connected data model under three named modules, capped by an Intelligence Layer that turns
              operational data into Recommended Actions, all wrapped in the DTOP loop so every signal becomes evidence.
            </p>
          </div>
          <div className="rounded-2xl border border-border/40 bg-card/40 p-6 lg:p-10">
            <div className="mx-auto w-full max-w-5xl">
              <PlatformArchitectureDiagramV4 />
            </div>
          </div>
        </div>
      </section>

      {/* 5. DTOP */}
      <section className="py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <Eyebrow>How the Loop Closes</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold">Detect → Trigger → Orchestrate → Prove</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { letter: "D", label: "Detect", body: "Always-on sensing across operational data, safety reports, audits and ops feeds.", color: "border-blue-500/40 bg-blue-500/5 text-blue-400" },
              { letter: "T", label: "Trigger", body: "The right workflow starts itself — no email chain, no waiting.", color: "border-amber-500/40 bg-amber-500/5 text-amber-400" },
              { letter: "O", label: "Orchestrate", body: "Content, training and compliance move together, not in sequence.", color: "border-violet-500/40 bg-violet-500/5 text-violet-400" },
              { letter: "P", label: "Prove", body: "Every action logged as it happens. Audit-ready by default.", color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400" },
            ].map((s) => (
              <Card key={s.letter} className={`p-6 border ${s.color} bg-card/40 backdrop-blur`}>
                <div className="text-5xl font-black mb-3">{s.letter}</div>
                <div className="text-lg font-bold text-foreground mb-2">{s.label}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THREE MODULES */}
      <section className="py-24 border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <Eyebrow>The Three Modules</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold">Built for the operation. Connected by design.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "Living operational content",
                name: "ContentManager365",
                body: "The preferred operational content platform for 140+ airlines, defense and rail operators. Manuals, procedures and bulletins that update themselves when regulations or operations change — and prove it.",
                icon: FileText,
                img: moduleContent,
                accent: "from-blue-500/30 to-blue-500/0",
              },
              {
                tag: "Predictive safety, quality & risk",
                name: "SafetyManager365",
                body: "Detect weak signals across 65,000+ monthly data points, trigger the right investigation, and close the loop — intelligent, predictive, proactive.",
                icon: Shield,
                img: moduleSafety,
                accent: "from-emerald-500/30 to-emerald-500/0",
              },
              {
                tag: "Competency tied to operations",
                name: "TrainingManager365",
                body: "AI-powered scheduling, qualification tracking and crew readiness — competency linked directly to the work and the risk it carries.",
                icon: GraduationCap,
                img: moduleTraining,
                accent: "from-violet-500/30 to-violet-500/0",
              },
            ].map((m) => (
              <Card key={m.name} className="overflow-hidden bg-card/60 backdrop-blur border-border/40 hover:border-primary/40 transition-all group">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${m.accent}`} />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary/80">
                    <m.icon className="h-4 w-4" />
                    {m.tag}
                  </div>
                  <h3 className="text-xl font-bold">{m.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INTELLIGENCE LAYER */}
      <section className="py-24 border-b border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Eyebrow>The Intelligence Layer</Eyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold leading-[1.05]">
              ~90% domain accuracy. <span className="text-muted-foreground/60">Not 35%.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Generic AI guesses. The Intelligence Layer <span className="text-foreground font-semibold">knows</span> —
              because it's trained on millions of aviation operational reports, your manuals, your safety data and
              your training records. It doesn't answer questions; it issues
              <span className="text-foreground font-semibold"> Recommended Actions </span>
              grounded in regulation, procedure and person.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { t: "Historical", b: "What happened — and why." },
                { t: "Reactive", b: "What needs attention right now." },
                { t: "Proactive", b: "Patterns to watch before they become events." },
                { t: "Predictive", b: "What's likely to happen next." },
              ].map((tier) => (
                <div key={tier.t} className="rounded-lg border border-border/40 bg-card/40 p-3">
                  <div className="text-sm font-bold text-foreground">{tier.t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{tier.b}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {["~90% accuracy", "Cited to source", "Audit-ready"].map((p) => (
                <span key={p} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm font-semibold">
                  <Sparkles className="h-3 w-3 text-primary" />
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-primary/10 blur-3xl" />
            <img
              src={intelVsGeneric}
              alt="Generic AI vs Intelligence Layer answer comparison"
              loading="lazy"
              className="relative rounded-2xl border border-border/40 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 8. NEAR-TERM USE CASES */}
      <section className="py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <Eyebrow>Proof in 90 Days</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold">Four use cases your team could deploy this quarter.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { n: "01", t: "Hard landing response", b: "Operational data trend → affected crew identified → targeted simulator training within 48 hours.", color: "text-blue-400 border-blue-500/30" },
              { n: "02", t: "Regulatory change cascade", b: "New directive arrives → every procedure, training record and qualification updated automatically.", color: "text-amber-400 border-amber-500/30" },
              { n: "03", t: "Fatigue risk", b: "Roster + safety reports cross-referenced to flag fatigue patterns before they become incidents.", color: "text-violet-400 border-violet-500/30" },
              { n: "04", t: "Compliance gap closure", b: "Expiring qualifications spotted and retrained before the gap creates exposure.", color: "text-emerald-400 border-emerald-500/30" },
            ].map((u) => (
              <Card key={u.n} className={`p-8 bg-card/60 border ${u.color}`}>
                <div className={`text-sm font-mono font-bold ${u.color}`}>{u.n}</div>
                <h3 className="text-2xl font-bold mt-2 mb-3">{u.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{u.b}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. STEPPING STONES */}
      <section className="py-24 border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <Eyebrow>The Path, Not a Big Bang</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold">Connect → Automate → Predict.</h2>
            <p className="text-lg text-muted-foreground">12–18 months, not 5–7 years.</p>
          </div>
          <img
            src={steppingStones}
            alt="Three-step staircase: Connect, Automate, Predict"
            loading="lazy"
            className="w-full max-w-4xl mx-auto rounded-2xl border border-border/40 mb-12"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { p: "Phase 1", t: "Connect", b: "One platform, one data model. Investigation time drops from weeks to days.", color: "border-blue-500/30" },
              { p: "Phase 2", t: "Automate", b: "Triggers replace email chains. Workflows fire on signal, not memory.", color: "border-amber-500/30" },
              { p: "Phase 3", t: "Predict", b: "Intelligence Layer's proactive + predictive tiers identify patterns before events.", color: "border-violet-500/30" },
            ].map((s) => (
              <Card key={s.p} className={`p-6 bg-card/60 border ${s.color}`}>
                <div className="text-xs font-mono uppercase text-muted-foreground tracking-widest">{s.p}</div>
                <h3 className="text-2xl font-bold mt-2 mb-3">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.b}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. INDUSTRIES */}
      <section className="py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <Eyebrow>One Platform · Multiple Solutions</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold">One platform. Multiple operating environments.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Plane, t: "Airlines", b: "Streamlined, unified Flight Ops + Tech Ops driving unparalleled efficiency.", href: "/solutions/airlines" },
              { icon: Crosshair, t: "Defense", b: "Empower warfighters and support teams with agility in any operational environment.", href: "/solutions/defense" },
              { icon: Train, t: "Rail", b: "Mobile-first, digitized rail operations — safer and more compliant.", href: "/solutions/rail" },
            ].map((i) => (
              <a key={i.t} href={i.href} className="block">
                <Card className="p-8 bg-card/60 border-border/40 hover:border-primary/40 transition-colors group">
                  <i.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">{i.t}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{i.b}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 11. THE COMPLY365 DIFFERENCE */}
      <section className="py-24 border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <Eyebrow>Why Operators Choose Us</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold">An operational power multiplier — built by people who've run the operation.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "Connected Foundation", body: "One platform across Ops, Safety and Training. 50+ airlines, 7 of the top 10 North American carriers, 1M+ frontline users." },
              { icon: Sparkles, title: "Domain-Trained Intelligence", body: "~90% accuracy on aviation queries vs ~35% from generic AI. Trained on the domain, not retrofitted to it." },
              { icon: BadgeCheck, title: "Proof by Default", body: "Every action logged, every change traced, every decision auditable. You're always ready." },
              { icon: Workflow, title: "Configurable, Not Forked", body: "Hybrid SaaS that adapts to your content mix and operating model — without a custom branch." },
              { icon: Database, title: "Frontline-Ready", body: "Designed for gloves, glare and gaps in connectivity — same data model from OCC to cockpit to depot." },
              { icon: Lock, title: "Security is Paramount", body: "Top-tier credentials, sovereign deployment options, military-grade infrastructure." },
            ].map((t) => (
              <Card key={t.title} className="p-6 bg-card/60 border-border/40 hover:border-primary/40 transition-colors">
                <t.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FEATURED RESOURCES */}
      <section className="py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Eyebrow>Featured Resources</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-bold mt-3">From the Comply365 newsroom</h2>
            </div>
            <Button variant="outline" className="hidden md:inline-flex gap-2">View all <ArrowRight className="h-4 w-4" /></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: "Blog", title: "Q&A with CEO Ilia Kostov: Inside the AI-Powered Operational Performance Platform", img: heroStack },
              { tag: "Blog", title: "The Intelligence Layer — Why ~90% beats ~35% in operational AI", img: intelVsGeneric },
              { tag: "Case Study", title: "DTOP in practice: closing a hard-landing loop in 48 hours", img: dtopTrace },
            ].map((r) => (
              <Card key={r.title} className="overflow-hidden bg-card/60 border-border/40 hover:border-primary/40 transition-colors group cursor-pointer">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={r.img} alt={r.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{r.tag}</span>
                  <h3 className="text-lg font-bold leading-tight">{r.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 13. CLOSING CTA */}
      <section className="relative overflow-hidden">
        <img src={ctaBanner} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center space-y-6">
          <Eyebrow>Working Together to Power</Eyebrow>
          <h2 className="text-4xl lg:text-5xl font-bold max-w-4xl mx-auto leading-tight">
            Peak Operational Performance, Proactive Safety, Modern Training.
          </h2>
          <Button size="lg" className="gap-2 mt-4">Request a meeting <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
