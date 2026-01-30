import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MainNavigation from "@/components/MainNavigation";
import PlatformEcosystemDiagram from "@/components/PlatformEcosystemDiagram";
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
  X,
  Check,
  User,
  Linkedin,
  Twitter,
  Youtube,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import complyLogo from "@/assets/comply365-logo-white.png";

const pillars = [
  {
    title: "SAFETY PERFORMANCE",
    icon: Shield,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    hoverBorder: "group-hover:border-red-500/60",
    glowColor: "group-hover:shadow-red-500/20",
    metric: "50% faster investigation closure",
    shortDescription: "Close safety events faster. Connect root causes to training and procedures automatically.",
  },
  {
    title: "CONTENT PERFORMANCE",
    icon: FileText,
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    hoverBorder: "group-hover:border-sky-500/60",
    glowColor: "group-hover:shadow-sky-500/20",
    metric: "60% faster change cycles",
    shortDescription: "Get procedure changes to the right people, at the right time, with proof of acknowledgment.",
  },
  {
    title: "TRAINING PERFORMANCE",
    icon: GraduationCap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    hoverBorder: "group-hover:border-emerald-500/60",
    glowColor: "group-hover:shadow-emerald-500/20",
    metric: "94% workforce readiness",
    shortDescription: "Activate targeted training based on safety signals and content changes — not arbitrary schedules.",
  },
];

const dtopSteps = [
  {
    step: "Detect",
    description: "Signal identified",
    detail: "FOQA, ASAP, audit finding captured",
  },
  {
    step: "Trigger",
    description: "Workflow activated",
    detail: "Procedure review initiated automatically",
  },
  {
    step: "Orchestrate",
    description: "Actions coordinated",
    detail: "Targeted training for affected crew",
  },
  {
    step: "Prove",
    description: "Evidence generated",
    detail: "Audit-ready documentation created",
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
  { icon: TrendingUp, label: "OTP Improvement", value: "+3.2%", subtext: "Illustrative Target*" },
  { icon: Clock, label: "Audit Prep Time", value: "2 hours", subtext: "From months to hours" },
  { icon: CheckCircle2, label: "Repeat Findings", value: "Zero", subtext: "Continuous evidence" },
];

// Animation hook for scroll reveals
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Section wrapper with scroll animation
const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const HomepageMockup = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Back to Deck Button */}
      <div className="fixed top-20 left-4 z-50">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2 backdrop-blur-sm bg-background/80">
            <ArrowLeft className="w-4 h-4" />
            Back to Deck
          </Button>
        </Link>
      </div>

      <MainNavigation />

      {/* Hero Section - Improvement #1: Reduced cognitive load, #2: Better visual */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
        
        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              {/* Badge qualifier */}
              <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-primary/30 text-primary bg-primary/5">
                For mission-critical, regulated operations
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-[1.1]">
                The Operational Performance Platform
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Connect safety, content, and training into an intelligent operating platform.{" "}
                <span className="text-foreground font-medium">Turn signals into orchestrated change and measurable outcomes.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="gap-2 text-base transition-transform hover:scale-105 w-full sm:w-auto">
                  See the Platform
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-base w-full sm:w-auto">
                  Calculate Your Impact
                </Button>
              </div>

              {/* Scroll indicator */}
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground animate-bounce">
                <ChevronDown className="w-5 h-5" />
                <span>Scroll to explore</span>
              </div>
            </div>

            {/* Hero Visual - Platform Ecosystem Diagram */}
            <div className="relative">
              <div className="max-w-lg mx-auto">
                {/* Subtle glow backdrop */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
                <PlatformEcosystemDiagram className="relative" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Improvement #3: More specific + stat-based */}
      <section className="py-6 border-y border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              <span className="font-semibold text-foreground">Trusted by 50+ airlines</span> including 7 of the top 10 in North America
            </p>
            <div className="hidden md:block w-px h-6 bg-border" />
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span><strong className="text-foreground">500K+</strong> crew members</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline"><strong className="text-foreground">99.9%</strong> uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Improvement #4: Emotional impact with bullets */}
      <AnimatedSection>
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                The Fragmentation Problem
              </h2>
              
              {/* Punchy bullet points */}
              <div className="space-y-4 text-left max-w-xl mx-auto mb-8">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                  <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">Your safety system doesn't talk to your training system.</p>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                  <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">Your document updates don't reach your crew.</p>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                  <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">Your auditors ask for proof you can't provide.</p>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                The cost? Slower investigations. Longer change cycles. Repeat findings.
              </p>
              
              {/* Bold stat */}
              <div className="inline-block px-6 py-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-2xl md:text-3xl font-bold text-destructive">
                  $2.3M lost annually
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Average airline cost from disconnected operations*
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Three Performance Domains - Improvement #5: Scannable cards */}
      <AnimatedSection>
        <section className="py-20 md:py-24 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Three Performance Domains
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                One platform. Three interconnected domains. Measurable outcomes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Card
                    key={pillar.title}
                    className={`group cursor-pointer ${pillar.bgColor} ${pillar.borderColor} ${pillar.hoverBorder} ${pillar.glowColor} border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                  >
                    <CardContent className="p-6 md:p-8">
                      {/* Icon + Title */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2.5 rounded-xl ${pillar.bgColor} border ${pillar.borderColor}`}>
                          <Icon className={`w-5 h-5 ${pillar.color}`} />
                        </div>
                        <h3 className={`text-sm font-bold tracking-wider ${pillar.color}`}>
                          {pillar.title}
                        </h3>
                      </div>
                      
                      {/* Large metric */}
                      <p className="text-xl md:text-2xl font-bold text-foreground mb-3">
                        {pillar.metric}
                      </p>
                      
                      {/* Short description (max 20 words) */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {pillar.shortDescription}
                      </p>
                      
                      {/* Learn more link */}
                      <Button variant="ghost" size="sm" className={`${pillar.color} hover:bg-transparent p-0 h-auto font-medium group-hover:translate-x-1 transition-transform`}>
                        Learn more <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* DTOP Operating Model - Improvement #6: Connected flow visualization */}
      <AnimatedSection>
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A connected, intelligent, and predictive operating layer — turning signals into orchestrated change and measurable outcomes.
              </p>
            </div>

            {/* Desktop: Horizontal connected flow */}
            <div className="hidden lg:block max-w-5xl mx-auto mb-12">
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute top-12 left-[12%] right-[12%] h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full" />
                
                <div className="grid grid-cols-4 gap-6 relative">
                  {dtopSteps.map((item, i) => (
                    <div key={item.step} className="flex flex-col items-center text-center">
                      {/* Step circle on the line */}
                      <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center mb-4 relative z-10 shadow-lg shadow-primary/20">
                        <div className="text-center">
                          <span className="text-2xl font-bold text-primary">{i + 1}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-2">{item.step}</h3>
                      <p className="text-sm font-medium text-foreground mb-1">{item.description}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: Vertical timeline */}
            <div className="lg:hidden max-w-md mx-auto mb-12">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-primary to-primary/50" />
                
                <div className="space-y-8">
                  {dtopSteps.map((item, i) => (
                    <div key={item.step} className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0 relative z-10">
                        <span className="text-lg font-bold text-primary">{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{item.step}</h3>
                        <p className="text-sm text-foreground mb-1">{item.description}</p>
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-world example */}
            <div className="max-w-3xl mx-auto">
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm font-medium text-primary mb-2">Example Scenario</p>
                <p className="text-foreground">
                  FOQA exceedance detected → triggers procedure review → activates targeted training for affected crew → generates audit evidence — <span className="font-semibold">all automatic, all connected.</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Customer Success - Improvement #7: More credibility */}
      <AnimatedSection>
        <section className="py-20 md:py-24 bg-primary/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Customer Success
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Quote with attribution */}
              <Card className="border-primary/30 mb-10 overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar placeholder */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                        <User className="w-10 h-10 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div>
                      <blockquote className="text-xl md:text-2xl text-foreground italic mb-6 leading-relaxed">
                        "Comply365 transformed how we manage operational change across our 
                        entire fleet. We went from 12-day investigation cycles to 6 days. 
                        Our auditors now ask how we generate evidence so fast."
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold text-foreground">VP Safety Operations</p>
                          <p className="text-muted-foreground">Major North American Airline</p>
                        </div>
                        {/* Placeholder for airline logo */}
                        <div className="ml-auto hidden md:block px-4 py-2 bg-muted rounded-lg">
                          <span className="text-xs text-muted-foreground font-medium">Airline Logo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Larger metrics */}
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {caseStudyMetrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.label}
                      className="bg-card border border-border rounded-xl p-4 md:p-6 text-center hover:border-primary/30 transition-colors"
                    >
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-3" />
                      <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                        {metric.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">{metric.subtext}</p>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" className="gap-2 transition-transform hover:scale-105">
                  Read the Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Platform Advantage / Comparison - Improvement #8: High contrast with icons */}
      <AnimatedSection>
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                The Platform Advantage
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                Point solutions manage silos. <span className="text-foreground font-semibold">Platforms manage outcomes.</span>
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-2">
                  <div className="bg-muted/50 p-4 font-semibold text-muted-foreground border-b border-r border-border text-center">
                    Point Solutions
                  </div>
                  <div className="bg-primary/10 p-4 font-semibold text-primary border-b border-border text-center">
                    Comply365
                  </div>
                </div>
                
                {/* Rows with icons */}
                {comparisonRows.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 border-b border-border last:border-b-0"
                  >
                    <div className="p-4 text-muted-foreground border-r border-border flex items-center gap-3">
                      <X className="w-5 h-5 text-destructive flex-shrink-0" />
                      <span className="line-through opacity-70">{row.pointSolution}</span>
                    </div>
                    <div className="p-4 text-foreground font-medium flex items-center gap-3 bg-primary/5">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{row.comply365}</span>
                    </div>
                  </div>
                ))}
                
                {/* Summary row */}
                <div className="grid grid-cols-2 bg-muted/30">
                  <div className="p-4 text-sm text-muted-foreground border-r border-border text-center">
                    5 disconnected problems
                  </div>
                  <div className="p-4 text-sm font-semibold text-primary text-center bg-primary/10">
                    1 connected platform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section - Improvement #9: Urgency + Risk reversal */}
      <AnimatedSection>
        <section className="py-20 md:py-24 bg-gradient-to-b from-primary/10 to-primary/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Ready for a connected, intelligent, and predictive platform?
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Join the 50+ airlines already transforming operations.
            </p>
            
            {/* Risk reversal */}
            <p className="text-sm text-primary font-medium mb-8">
              See results in 90 days or we'll extend your pilot free.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-8">
              <Button size="lg" className="gap-2 text-base transition-transform hover:scale-105">
                Request a Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Calculate Your ROI
              </Button>
            </div>
            
            {/* Micro-CTA */}
            <p className="text-sm text-muted-foreground">
              Not ready for a demo? <a href="#" className="text-primary hover:underline">Download the ROI Calculator</a>
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>IATA Partner</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>ISO 27001</span>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer - Added social links */}
      <footer className="bg-muted/50 border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <img src={complyLogo} alt="Comply365" className="h-8 w-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                A connected, intelligent, and predictive platform for aviation operations.
              </p>
              {/* Social links */}
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
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

      {/* CSS for custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
        }
        @keyframes float-left {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-left 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        .animate-float-delayed-2 {
          animation: float-left 3s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default HomepageMockup;
