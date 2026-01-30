import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import complyLogo from "@/assets/comply365-logo-white.png";
import {
  Shield,
  FileText,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { label: "Platform", hasDropdown: true },
  { label: "Solutions", hasDropdown: true },
  { label: "Customers", hasDropdown: false },
  { label: "Resources", hasDropdown: true },
];

const trustLogos = [
  "Delta Air Lines",
  "United Airlines", 
  "Southwest",
  "JetBlue",
  "Alaska Airlines",
  "Spirit Airlines",
];

const pillars = [
  {
    title: "Safety Performance",
    icon: Shield,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    hoverBorder: "hover:border-red-500/50",
    metric: "50% faster investigation closure",
    description: "When a safety event occurs, every minute matters. Comply365 detects signals from multiple sources — FOQA, ASAP, audit findings — and connects them to action. Investigations close 50% faster because the right people see the right data immediately. Recurrence drops because root causes connect to training gaps and procedural fixes automatically.",
  },
  {
    title: "Content Performance",
    icon: FileText,
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    hoverBorder: "hover:border-sky-500/50",
    metric: "60% faster change cycles",
    description: "Procedures change constantly. New regulations. Audit findings. Safety learnings. The challenge isn't making the change — it's ensuring it reaches everyone who needs it, when they need it. Comply365 cuts change cycles by 60% and creates an unbroken chain of evidence from revision to acknowledgment.",
  },
  {
    title: "Training Performance",
    icon: GraduationCap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    hoverBorder: "hover:border-emerald-500/50",
    metric: "94% workforce readiness",
    description: "Training isn't about seat time. It's about readiness. Comply365 connects training to performance — activating targeted learning when safety data or content changes demand it, not on arbitrary schedules. The result: 94% workforce readiness, reduced training waste, and proof that your people are qualified for what they're doing.",
  },
];

const dtopSteps = [
  {
    step: "Detect",
    description: "A FOQA exceedance or audit finding is identified",
    detail: "Safety signals from multiple sources automatically captured",
  },
  {
    step: "Trigger",
    description: "Automatically triggers procedure review",
    detail: "Connected workflows activate without manual intervention",
  },
  {
    step: "Orchestrate",
    description: "Targeted training activated for affected crew",
    detail: "The right people get the right content at the right time",
  },
  {
    step: "Prove",
    description: "Audit evidence generated automatically",
    detail: "Continuous compliance documentation without scrambling",
  },
];

const comparisonRows = [
  { pointSolution: "Isolated silos", comply365: "Connected system" },
  { pointSolution: "Manual handoffs", comply365: "Automated triggers" },
  { pointSolution: "Audit scrambles", comply365: "Continuous proof" },
  { pointSolution: "Reactive training", comply365: "Targeted activation" },
  { pointSolution: "Data trapped in tools", comply365: "Intelligence flows" },
];

const footerColumns = [
  {
    title: "Solutions",
    links: ["Safety Manager", "Content Manager", "Training Manager", "Governance Hub"],
  },
  {
    title: "Resources",
    links: ["Blog", "Case Studies", "Webinars", "Documentation"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact", "Partners"],
  },
];

const caseStudyMetrics = [
  { icon: TrendingUp, label: "OTP Improvement", value: "+3.2%" },
  { icon: Clock, label: "Audit Prep Time", value: "2 hours" },
  { icon: CheckCircle2, label: "Repeat Findings", value: "Zero" },
];

const HomepageMockup = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back to Deck Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Deck
          </Button>
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <img src={complyLogo} alt="Comply365" className="h-8 w-auto" />
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}
          </nav>
          <Button className="gap-2">
            Request Demo
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 via-primary/5 to-transparent">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
                The Operational Performance Platform
              </h1>
              <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                Connect Safety, Content, and Training into one governed system.
                Turn operational signals into measurable performance.
              </p>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                Airlines don't fail because of one broken process. They fail because broken 
                processes compound — a safety signal that doesn't trigger a procedure update, 
                a procedure change that doesn't reach the crew, training that doesn't prove 
                readiness. Comply365 closes these gaps with a single connected platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2">
                  See the Platform
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Calculate Your Impact
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                    <div className="text-4xl font-display font-bold text-primary">C365</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Platform Architecture Diagram
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-y border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <p className="text-sm text-muted-foreground">
              Trusted by 50+ airlines worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {trustLogos.map((logo) => (
                <div
                  key={logo}
                  className="px-4 py-2 bg-background border border-border rounded-lg"
                >
                  <span className="text-xs text-muted-foreground font-medium">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-foreground mb-6">
              The Fragmentation Problem
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Today's aviation operations run on disconnected systems. Your Safety 
              Management System doesn't talk to your Learning Management System. Your 
              document management doesn't know what your training records show. When 
              an auditor asks for proof that a procedure change reached every affected 
              crew member, you scramble.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The result? Slower investigations. Longer change cycles. Audit findings 
              that keep recurring. And a workforce that's never quite sure they have 
              the latest information.
            </p>
          </div>

          {/* Three Silos Illustration */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 border border-red-500/30 rounded-xl bg-red-500/5">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Safety SMS</h3>
              <p className="text-sm text-muted-foreground">Disconnected from training</p>
            </div>
            <div className="text-center p-6 border border-sky-500/30 rounded-xl bg-sky-500/5">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-500/20 flex items-center justify-center">
                <FileText className="w-8 h-8 text-sky-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Document Control</h3>
              <p className="text-sm text-muted-foreground">Updates don't reach crew</p>
            </div>
            <div className="text-center p-6 border border-emerald-500/30 rounded-xl bg-emerald-500/5">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Training LMS</h3>
              <p className="text-sm text-muted-foreground">Can't prove readiness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Performance Domains */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Three Performance Domains
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One platform. Three interconnected domains. Measurable outcomes.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.title}
                  className={`${pillar.bgColor} ${pillar.borderColor} ${pillar.hoverBorder} border-2 transition-all duration-300 hover:shadow-lg`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${pillar.bgColor}`}>
                        <Icon className={`w-6 h-6 ${pillar.color}`} />
                      </div>
                      <h3 className={`text-xl font-semibold ${pillar.color}`}>
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-4">
                      {pillar.metric}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    <Button variant="ghost" className={`${pillar.color} hover:bg-transparent p-0`}>
                      Learn more <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* DTOP Operating Model */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              How It Works: Detect → Trigger → Orchestrate → Prove
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Most platforms stop at visibility. Comply365 goes further. When a signal 
              is detected — a FOQA exceedance, an audit finding, a safety report — the 
              platform doesn't just log it. It triggers connected actions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {dtopSteps.map((item, i) => (
              <div key={item.step} className="relative">
                <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{i + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{item.step}</h3>
                  </div>
                  <p className="text-foreground font-medium mb-2">{item.description}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
                {i < dtopSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl text-muted-foreground italic">
              "This is what separates a platform from a collection of point solutions. 
              Not just seeing problems — closing the loop on them."
            </p>
          </div>
        </div>
      </section>

      {/* Customer Success */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Customer Success Stories
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/30 mb-12">
              <CardContent className="p-8 md:p-12">
                <blockquote className="text-2xl text-foreground italic mb-6 leading-relaxed">
                  "Comply365 transformed how we manage operational change across our 
                  entire fleet. We went from 12-day investigation cycles to 6 days. 
                  Our auditors now ask how we generate evidence so fast."
                </blockquote>
                <p className="text-muted-foreground">
                  — VP Safety, Major North American Airline
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              {caseStudyMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="bg-card border border-border rounded-xl p-6 text-center"
                  >
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="text-3xl font-bold text-foreground mb-1">
                      {metric.value}
                    </p>
                    <p className="text-muted-foreground">{metric.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="gap-2">
                Read the Full Case Study
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Advantage / Comparison */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              The Platform Advantage
            </h2>
            <p className="text-2xl text-muted-foreground mb-4">
              Point solutions manage silos. <span className="text-foreground font-medium">Platforms manage outcomes.</span>
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              When your safety, content, and training systems are connected, you don't 
              just manage compliance — you drive performance. Every signal becomes an 
              action. Every action generates proof. Every proof demonstrates control.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="bg-muted/50 p-4 font-semibold text-foreground border-b border-r border-border">
                  Point Solutions
                </div>
                <div className="bg-primary/10 p-4 font-semibold text-primary border-b border-border">
                  Comply365
                </div>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 border-b border-border last:border-b-0"
                >
                  <div className="p-4 text-muted-foreground border-r border-border">
                    {row.pointSolution}
                  </div>
                  <div className="p-4 text-foreground font-medium">
                    {row.comply365}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-primary/10 to-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-display font-bold text-foreground mb-6">
            Ready to see what connected operational performance looks like for your airline?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 50+ airlines that have moved from fragmented point solutions to 
            a unified operational performance platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2">
              Request a Demo
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline">
              Calculate Your ROI
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <img src={complyLogo} alt="Comply365" className="h-8 w-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                The Operational Performance Platform for aviation.
              </p>
            </div>
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-foreground mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2025 Comply365. All rights reserved.
              </p>
              <p className="text-sm text-foreground font-medium">
                Point solutions manage silos. <span className="text-primary">Comply365 closes the loop.</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomepageMockup;
