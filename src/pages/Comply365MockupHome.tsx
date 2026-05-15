import { ArrowRight, Sparkles, Shield, FileText, GraduationCap, Gauge, Zap, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import TopNav from "@/components/home/TopNav";
import CustomerTrustBar from "@/components/home/CustomerTrustBar";
import CustomerQuotes from "@/components/home/CustomerQuotes";
import DayInOperationScenario from "@/components/home/DayInOperationScenario";
import Footer from "@/components/home/Footer";
import BookWalkthroughDialog from "@/components/home/BookWalkthroughDialog";
import PlatformArchitectureCircular from "@/components/platform-slides/PlatformArchitectureCircular";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import heroCollage from "@/assets/mockup/hero-platform-collage.jpg";
import intelligenceVsGeneric from "@/assets/mockup/intelligence-vs-generic.jpg";
import frontlineDevices from "@/assets/mockup/frontline-devices.jpg";
import ctaApron from "@/assets/mockup/cta-apron.jpg";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase text-primary/80">
    <span className="h-px w-8 bg-primary/40" />
    {children}
  </div>
);

export default function Comply365MockupHome() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />

      {/* 1. HERO — customer problem, named */}
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
              <Sparkles className="h-3 w-3" /> For the people accountable when operations slip
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.04] text-foreground">
              From Silos{" "}
              <span className="text-muted-foreground/70">to Signals.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Most operations are stuck in silos — Content, Safety and Training reporting in three formats, three rhythms, three blind spots. Comply365 connects them into one signal stream, and turns every signal into prescriptive action.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookWalkthroughDialog
                trigger={
                  <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors">
                    Book a walkthrough <ArrowRight className="h-4 w-4" />
                  </button>
                }
              />
              <Link to="#scenario" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                See it on a Tuesday <ArrowRight className="h-3.5 w-3.5" />
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

          {/* Product peek — kept; it's a strong asset */}
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

      {/* 2. PROOF WALL — logos + 3 outcome metrics */}
      <section className="py-16 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by the operators who can't afford to get it wrong.
          </p>
          <CustomerTrustBar />

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { v: "200+", l: "Operators running mission-critical Ops, Safety and Training on Comply365." },
              { v: "1M+",  l: "Frontline users — pilots, engineers, drivers, dispatchers — using it daily." },
              { v: "~90%", l: "Domain accuracy from the Intelligence Layer, where generic AI sits at ~35%." },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border/50 bg-card/40 p-7">
                <div className="font-display text-5xl font-bold text-foreground">{s.v}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[11px] text-muted-foreground/70 italic">
            Operator outcomes are illustrative and dependent on customer-specific operational baseline, scope and integration.
          </p>
        </div>
      </section>

      {/* 3. A DAY IN THE OPERATION — narrated scenario */}
      <div id="scenario">
        <DayInOperationScenario />
      </div>

      {/* 4. CUSTOMER STORIES — three quotes with hard metrics */}
      <CustomerQuotes />

      {/* 5. WHY OPERATORS CHOOSE COMPLY365 — outcomes, not features */}
      <section className="py-24 border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <Eyebrow>Why operators choose Comply365</Eyebrow>
              <h2 className="mt-4 font-display text-4xl lg:text-5xl font-bold leading-tight">
                Three outcomes. Every operator. Every audit.
              </h2>
            </div>
            <p className="lg:col-span-7 text-lg text-muted-foreground leading-relaxed self-end">
              Not a list of features. The three things our customers tell us changed in their operation
              the day they went live.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Faster to act on what matters.",
                body: "Weak signals reach the right person with the right context — before they become events.",
                quote: "Audit prep went from six weeks to four days.",
                who: "Director of Compliance · Tier-1 European airline",
              },
              {
                icon: BadgeCheck,
                title: "Evidence the regulator trusts.",
                body: "Every action carries its own audit trail — cited to manual, procedure and person.",
                quote: "Findings closed before the auditor finished asking.",
                who: "Head of Flight Safety · Defense aviation operator",
              },
              {
                icon: Gauge,
                title: "One platform. One ROI story.",
                body: "Ops, Safety and Training share one data model — not three teams reporting in three formats.",
                quote: "For the first time, the COO sees one operating rhythm.",
                who: "Chief Operating Officer · National rail operator",
              },
            ].map((o) => (
              <Card key={o.title} className="p-7 bg-card/60 border-border/40 hover:border-primary/40 transition-colors flex flex-col">
                <o.icon className="h-7 w-7 text-primary mb-5" />
                <h3 className="text-xl font-bold leading-snug mb-3">{o.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{o.body}</p>
                <div className="mt-auto pt-5 border-t border-border/60">
                  <p className="text-sm italic text-foreground leading-snug">"{o.quote}"</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{o.who}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PLATFORM IN ONE GLANCE — tease, don't re-explain */}
      <section className="py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Eyebrow>The platform behind the story</Eyebrow>
            <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight">
              One connected platform.<br/>
              <span className="text-muted-foreground/70">Three named modules.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ContentManager365, SafetyManager365 and TrainingManager365 share one data model,
              wrapped by an Intelligence Layer and the DTOP loop. The full architecture lives one click away.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { i: FileText,       n: "ContentManager365" },
                { i: Shield,         n: "SafetyManager365" },
                { i: GraduationCap,  n: "TrainingManager365" },
              ].map((m) => (
                <span key={m.n} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold">
                  <m.i className="h-3.5 w-3.5 text-primary" /> {m.n}
                </span>
              ))}
            </div>
            <Button asChild size="lg" variant="outline" className="gap-2 mt-2">
              <Link to="/platform-mockup">Explore the platform <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="lg:col-span-7 flex justify-center">
            <PlatformArchitectureCircular />
          </div>
        </div>
      </section>

      {/* 7. WHERE THE WORK HAPPENS */}
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
            <Eyebrow>Where the work actually happens</Eyebrow>
            <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight">
              In the cockpit. In the hangar. In the depot.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The platform follows the work to the frontline — same operational data, same evidence trail,
              designed for gloves, glare and gaps in connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* 8. RESOURCES */}
      <section className="py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Eyebrow>From the newsroom</Eyebrow>
              <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3">Operators in their own words.</h2>
            </div>
            <Button variant="outline" className="hidden md:inline-flex gap-2">View all <ArrowRight className="h-4 w-4" /></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: "Customer story", title: "How a Tier-1 carrier closed audit findings in under 24 hours.", img: heroCollage },
              { tag: "Customer story", title: "11,000 crews re-current in 9 days — without grounding the schedule.", img: intelligenceVsGeneric },
              { tag: "Customer story", title: "From 3 reporting formats to 1 operating rhythm at a national rail operator.", img: ctaApron },
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

      {/* 9. CLOSING CTA — outcome-framed */}
      <section className="relative overflow-hidden">
        <img src={ctaApron} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center space-y-6">
          <Eyebrow>Your next signal</Eyebrow>
          <h2 className="font-display text-4xl lg:text-6xl font-bold max-w-4xl mx-auto leading-[1.05]">
            Turn the next signal into your next proof point.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a 30-minute walkthrough on your operation, your manuals, your audit cycle.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <BookWalkthroughDialog
              trigger={
                <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Book a walkthrough <ArrowRight className="h-4 w-4" />
                </button>
              }
            />
            <Link to="/platform-mockup" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Explore the platform <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
