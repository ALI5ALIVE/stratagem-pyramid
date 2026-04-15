import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, FileSpreadsheet, AlertTriangle, Unlink, Brain, Users, Database,
  Eye, Network, Shield, Sparkles, Blocks, Receipt, Package, Layers, Code,
  ChevronRight, Target, MessageSquare, HelpCircle, Lightbulb, Building2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  solutionOverview, painPoints, positioning, valuePillars,
  howItWorksLayers, useCases, personaRelevance, commercialModel,
  objections, roadmapPhases, talkingPoints, discoveryQuestions,
} from "@/data/regulationManagementPlaybook";

const iconMap: Record<string, React.ElementType> = {
  FileSpreadsheet, AlertTriangle, Unlink, Brain, Users, Database,
  Eye, Network, Shield, Sparkles, Blocks, Receipt, Package, Layers, Code,
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "positioning", label: "Positioning" },
  { id: "pillars", label: "Value Pillars" },
  { id: "howitworks", label: "How It Works" },
  { id: "usecases", label: "Use Cases" },
  { id: "personas", label: "Personas" },
  { id: "commercial", label: "Commercial" },
  { id: "objections", label: "Objections" },
  { id: "roadmap", label: "Roadmap" },
  { id: "talking", label: "Talking Points" },
];

function SectionHeading({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div id={id} className="scroll-mt-24 mb-6">
      <h2 className="text-xl font-bold text-foreground tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}

export default function RegulationManagementPlaybook() {
  const [activeSection, setActiveSection] = useState("overview");
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Regulation Management</h1>
              <p className="text-xs text-muted-foreground">Messaging & Positioning Playbook</p>
            </div>
            <Badge variant="outline" className="ml-auto text-[10px]">INTERNAL</Badge>
          </div>
          {/* Section nav chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  activeSection === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <div ref={containerRef} className="max-w-6xl mx-auto px-6 py-8 space-y-16">

        {/* ── 1. Solution Overview ── */}
        <section>
          <SectionHeading id="overview" title="Solution Overview" subtitle="Elevator pitch and strategic narrative" />
          <Card className="border-primary/20">
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-foreground leading-relaxed">{solutionOverview.elevatorPitch}</p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-primary/10 text-primary border-primary/20">{solutionOverview.narrativeArc}</Badge>
              </div>
              <blockquote className="border-l-2 border-primary pl-4 text-sm italic text-muted-foreground">
                "{solutionOverview.tagline}"
              </blockquote>
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Key Insight</p>
                <p className="text-sm text-foreground">{solutionOverview.keyInsight}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── 2. The Problem Today ── */}
        <section>
          <SectionHeading id="problem" title="The Problem Today" subtitle="Why airlines are struggling with regulation management" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((p, i) => {
              const Icon = iconMap[p.icon] || Database;
              return (
                <Card key={i} className="border-destructive/10 hover:border-destructive/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-9 w-9 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-destructive" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{p.headline}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.detail}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── 3. Solution Positioning ── */}
        <section>
          <SectionHeading id="positioning" title="Solution Positioning" subtitle="How we frame Regulation Management in the market" />
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Role", value: positioning.role },
                  { label: "Audience", value: positioning.audience },
                  { label: "Problem", value: positioning.problem },
                  { label: "Unique Value", value: positioning.uniqueValue },
                ].map((item) => (
                  <div key={item.label} className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="border border-primary/20 rounded-lg p-5 bg-primary/5">
                <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-2">Positioning Statement</p>
                <p className="text-sm text-foreground leading-relaxed">{positioning.statement}</p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4">
                <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1">Key Framing</p>
                <p className="text-sm text-foreground">{positioning.keyFraming}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── 4. Value Pillars ── */}
        <section>
          <SectionHeading id="pillars" title="Value Pillars" subtitle="Five pillars of differentiated value" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {valuePillars.map((vp, i) => {
              const Icon = iconMap[vp.icon] || Sparkles;
              return (
                <Card key={i} className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{vp.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{vp.description}</p>
                    {vp.metrics && (
                      <Badge variant="secondary" className="text-[10px]">{vp.metrics}</Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── 5. How It Works ── */}
        <section>
          <SectionHeading id="howitworks" title="How It Works" subtitle="Three-layer delivery model" />
          <div className="space-y-4">
            {howItWorksLayers.map((layer) => (
              <Card key={layer.layer} className="overflow-hidden">
                <div className="flex">
                  <div className="w-1.5 shrink-0" style={{ backgroundColor: layer.color }} />
                  <div className="p-5 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-muted-foreground">LAYER {layer.layer}</span>
                      <h3 className="text-sm font-semibold text-foreground">{layer.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{layer.description}</p>
                    <ul className="space-y-1.5">
                      {layer.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                          <ChevronRight className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 6. Use Cases ── */}
        <section>
          <SectionHeading id="usecases" title="Use Cases & Scenarios" subtitle="Real-world applications for sales conversations" />
          <Accordion type="single" collapsible className="space-y-2">
            {useCases.map((uc, i) => (
              <AccordionItem key={i} value={`uc-${i}`} className="border rounded-lg px-4 bg-card">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary shrink-0" />
                    {uc.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-2">
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Scenario</p>
                      <p className="text-xs text-foreground">{uc.scenario}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-primary uppercase mb-1">Outcome</p>
                      <p className="text-xs text-foreground">{uc.outcome}</p>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {uc.products.map((p) => (
                        <Badge key={p} variant="secondary" className="text-[10px]">{p}</Badge>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ── 7. Persona Relevance ── */}
        <section>
          <SectionHeading id="personas" title="Persona Relevance" subtitle="Who buys this and why" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personaRelevance.map((pr, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="flex">
                  <div className="w-1 shrink-0" style={{ backgroundColor: pr.color }} />
                  <CardContent className="p-5 flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-2">{pr.role}</h3>
                    <div className="mb-3">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">They care about</p>
                      <p className="text-xs text-muted-foreground">{pr.careAbout}</p>
                    </div>
                    <div className="bg-secondary/50 rounded p-3">
                      <p className="text-[10px] font-semibold text-primary uppercase mb-1">Our message</p>
                      <p className="text-xs text-foreground">{pr.message}</p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 8. Commercial Model ── */}
        <section>
          <SectionHeading id="commercial" title="Commercial Model" subtitle="How we price and package Regulation Management" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {commercialModel.map((cm, i) => {
              const Icon = iconMap[cm.icon] || Package;
              return (
                <Card key={i}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{cm.model}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cm.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── 9. Objection Handling ── */}
        <section>
          <SectionHeading id="objections" title="Objection Handling" subtitle="Strategic responses to common pushback" />
          <Accordion type="single" collapsible className="space-y-2">
            {objections.map((obj, i) => (
              <AccordionItem key={i} value={`obj-${i}`} className="border rounded-lg px-4 bg-card">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline text-left">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-destructive shrink-0" />
                    <span>"{obj.objection}"</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-xs text-foreground leading-relaxed">{obj.response}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ── 10. Phased Roadmap ── */}
        <section>
          <SectionHeading id="roadmap" title="Phased Roadmap" subtitle="From POC to platform entity" />
          <div className="space-y-4">
            {roadmapPhases.map((phase) => (
              <Card key={phase.phase} className="overflow-hidden">
                <div className="flex">
                  <div className="w-1.5 shrink-0" style={{ backgroundColor: phase.color }} />
                  <CardContent className="p-5 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className="text-[10px]" style={{ borderColor: phase.color, color: phase.color }}>
                        {phase.phase}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{phase.timeline}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">{phase.title}</h3>
                    <ul className="space-y-1.5">
                      {phase.outcomes.map((o, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                          <ChevronRight className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 11. Talking Points & Discovery Questions ── */}
        <section>
          <SectionHeading id="talking" title="Key Talking Points & Discovery Questions" subtitle="Ready-to-use conversation starters" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Talking Points */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-accent" />
                  Talking Points
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {talkingPoints.map((tp, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 text-[10px] font-bold">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{tp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Discovery Questions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Discovery Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {discoveryQuestions.map((dq, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-[10px] font-bold">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{dq}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
}
