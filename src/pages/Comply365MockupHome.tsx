import { ArrowRight, Sparkles, Shield, FileText, GraduationCap, Layers, Radar, Workflow, BadgeCheck, Database, Lock, Globe2 } from "lucide-react";
import TopNav from "@/components/home/TopNav";
import CustomerTrustBar from "@/components/home/CustomerTrustBar";
import Footer from "@/components/home/Footer";
import PlatformEcosystemDiagram from "@/components/PlatformEcosystemDiagram";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import heroCollage from "@/assets/mockup/hero-platform-collage.jpg";
import moduleContent from "@/assets/mockup/module-content.jpg";
import moduleSafety from "@/assets/mockup/module-safety.jpg";
import moduleTraining from "@/assets/mockup/module-training.jpg";
import intelligenceVsGeneric from "@/assets/mockup/intelligence-vs-generic.jpg";
import frontlineDevices from "@/assets/mockup/frontline-devices.jpg";
import ctaApron from "@/assets/mockup/cta-apron.jpg";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary/80">
    <span className="h-px w-8 bg-primary/40" />
    {children}
  </div>
);

export default function Comply365MockupHome() {
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
              The industry's first AI-powered platform connecting{" "}
              <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
                ContentManager365 · SafetyManager365 · TrainingManager365
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Turn operational data into operational control — safer, smarter, more connected operations.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="gap-2">Explore the platform <ArrowRight className="h-4 w-4" /></Button>
              <Button size="lg" variant="outline">Book a working session</Button>
            </div>
            <div className="flex gap-6 pt-6 text-sm text-muted-foreground">
              <span>~90% domain accuracy</span>
              <span>·</span>
              <span>Cited to source</span>
              <span>·</span>
              <span>Audit-ready by default</span>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/20 via-violet-500/10 to-transparent blur-3xl" />
            <img
              src={heroCollage}
              alt="Platform surfaces: operations dashboard, Intelligence Layer answer card, and crew mobile checklist"
              width={1600}
              height={1100}
              className="relative rounded-2xl border border-border/40 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 2. CUSTOMER TRUST BAR */}
      <section className="py-12 border-b border-border/40">
        <p className="text-center text-sm text-muted-foreground mb-6">
          Trusted by the operators who can't afford to get it wrong.
        </p>
        <CustomerTrustBar />
      </section>

      {/* 3. ONE PLATFORM */}
      <section className="py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Eyebrow>One Platform · One Partner · One Vision</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              One Platform. One Operating Model. One Closed Loop.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The first connected platform across Operations, Safety and Training — powered by an
              <span className="text-foreground font-semibold"> Intelligence Layer </span>
              that reaches <span className="text-primary font-semibold">~90% domain accuracy</span> where
              generic AI sits at <span className="text-muted-foreground">~35%</span>. Every signal becomes a
              workflow, every workflow becomes evidence, every change becomes readiness.
            </p>
            <Button size="lg" variant="outline" className="gap-2">Explore the platform <ArrowRight className="h-4 w-4" /></Button>
          </div>
          <div className="flex justify-center">
            <PlatformEcosystemDiagram />
          </div>
        </div>
      </section>

      {/* 4. THREE MODULES */}
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
                body: "Next-generation operational content management and distribution. Manuals, procedures and bulletins that update themselves when regulations or operations change — and prove it.",
                icon: FileText,
                img: moduleContent,
                accent: "from-blue-500/30 to-blue-500/0",
              },
              {
                tag: "Predictive safety, quality & risk",
                name: "SafetyManager365",
                body: "The most advanced safety, quality and risk solution — intelligent, predictive, proactive. Detect weak signals, trigger the right workflow, prove the loop closed.",
                icon: Shield,
                img: moduleSafety,
                accent: "from-emerald-500/30 to-emerald-500/0",
              },
              {
                tag: "Competency tied to operations",
                name: "TrainingManager365",
                body: "AI-powered training that schedules itself around operations and keeps every crew current — competency linked directly to the work and the risk.",
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

      {/* 5. INTELLIGENCE LAYER */}
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
              because it's trained on your manuals, your safety data, your training records and your operational reality.
              It doesn't just answer questions; it issues <span className="text-foreground font-semibold">Recommended Actions</span>
              {" "}grounded in the regulation, the procedure and the person.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["~90% domain accuracy", "Cited to source", "Audit-ready by default"].map((p) => (
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
              src={intelligenceVsGeneric}
              alt="Generic AI vs Intelligence Layer answer comparison"
              loading="lazy"
              className="relative rounded-2xl border border-border/40 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 6. DTOP */}
      <section className="py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <Eyebrow>How the Loop Closes</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold">Detect → Trigger → Orchestrate → Prove</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The DTOP operating model. One signal in, one closed loop out — across every module.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { letter: "D", label: "Detect", body: "Pick up the weak signal — early.", color: "border-blue-500/40 bg-blue-500/5 text-blue-400" },
              { letter: "T", label: "Trigger", body: "Route it to the right workflow, automatically.", color: "border-amber-500/40 bg-amber-500/5 text-amber-400" },
              { letter: "O", label: "Orchestrate", body: "Coordinate content, safety and training in one move.", color: "border-violet-500/40 bg-violet-500/5 text-violet-400" },
              { letter: "P", label: "Prove", body: "Evidence-ready audit trail, every time.", color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400" },
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

      {/* 7. FRONTLINE MOBILE */}
      <section className="py-24 border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-6 bg-violet-500/10 blur-3xl" />
            <img
              src={frontlineDevices}
              alt="Pilot tablet, engineer rugged device and rail driver phone — same data model on every frontline device"
              loading="lazy"
              className="relative rounded-2xl border border-border/40 shadow-2xl"
            />
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <Eyebrow>Where the Work Actually Happens</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Same data model. In the cockpit, the hangar, the depot.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The platform follows the work to the frontline — same operational data, same evidence trail,
              designed for gloves, glare and gaps in connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CTA BAND */}
      <section className="relative overflow-hidden">
        <img src={ctaApron} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center space-y-6">
          <Eyebrow>Working Together to Power</Eyebrow>
          <h2 className="text-4xl lg:text-5xl font-bold max-w-4xl mx-auto leading-tight">
            Peak Operational Performance, Proactive Safety Management and Modern Training Management.
          </h2>
          <Button size="lg" className="gap-2 mt-4">Request a meeting <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </section>

      {/* 9. THE COMPLY365 DIFFERENCE */}
      <section className="py-24 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <Eyebrow>The Comply365 Difference</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-bold">An Operational Power Multiplier</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "Enterprise-Wide Approach", body: "Complete coverage across operations, safety and training — one platform, one ROI story, not three." },
              { icon: Workflow, title: "Connecting the Dots", body: "Interconnects what used to be siloed — operations, safety and training share the same data and workflows." },
              { icon: Globe2, title: "Configurable by Design", body: "Hybrid SaaS that adapts to your content mix and your operating model — without forking the platform." },
              { icon: Database, title: "Data-Empowered", body: "From raw operational data to Recommended Actions — the Intelligence Layer turns the journey into a workflow, not a project." },
              { icon: BadgeCheck, title: "Domain Expertise + AI", body: "Built by people who've run the operation. Fused with AI tuned to the domain — not retrofitted to it." },
              { icon: Lock, title: "Security is Paramount", body: "Top-tier credentials, sovereign deployment options, and an evidence trail your auditor will actually trust." },
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

      {/* 10. FEATURED RESOURCES */}
      <section className="py-24 border-b border-border/40 bg-muted/20">
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
              { tag: "Blog", title: "A Q&A with CEO Ilia Kostov on the AI-Powered Operational Performance Platform", img: heroCollage },
              { tag: "Blog", title: "The Intelligence Layer: Why ~90% beats ~35%", img: intelligenceVsGeneric },
              { tag: "Event", title: "Connections365: Platform & Next-Gen Brands Unveiled", img: ctaApron },
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

      {/* 11. CLOSING CTA */}
      <section className="relative overflow-hidden">
        <img src={ctaApron} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/80 to-background/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center space-y-6">
          <h2 className="text-3xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight">
            Ready to turn operational data into operational control?
          </h2>
          <Button size="lg" className="gap-2">Get Started <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}