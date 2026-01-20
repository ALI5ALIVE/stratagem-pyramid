import SlideContainer from "./SlideContainer";
import { AlertCircle, CheckCircle2, Database, Workflow, Brain, ArrowRight } from "lucide-react";

const Slide2BeforeAfter = () => {
  const beforeItems = [
    "Manual coordination across teams (handoffs, spreadsheets, email approvals)",
    "No real-time insight into whether change has been implemented and adopted",
    "Reactive risk handling (issues discovered after disruption, not before)",
    "Procedural drift between documented procedures, training, and actual operations",
    "Duplicated effort and cost across multiple tools, duplicate data, and repeated reporting/evidence gathering",
  ];

  const afterItems = [
    "Signals from safety, procedures, and training flow through one governed system",
    "Change triggers orchestrated actions — procedure updates, training activation, evidence capture",
    "Readiness and compliance are provable by default, not assembled after the fact",
    "AI accelerates detection, prioritisation, and drafting — with human governance intact",
  ];

  const platformCapabilities = [
    {
      icon: Database,
      title: "Shared Data & Governance",
      description: "One governed system of record across safety, procedures, and training",
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      icon: Workflow,
      title: "Integrated Automation",
      description: "Threshold-driven, role-aware workflows that execute across domains",
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
    },
    {
      icon: Brain,
      title: "Embedded Intelligence",
      description: "Transparent, explainable AI that evolves with usage and maintains audit trails",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
    },
  ];

  return (
    <SlideContainer
      id="slide-2"
      title="Before & After: Point Tools vs Connected Platform"
      subtitle="From siloed compliance to a connected operating model"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Before */}
        <div className="relative">
          <div className="absolute inset-0 bg-destructive/5 blur-3xl rounded-3xl" />
          <div className="relative bg-card/30 border border-destructive/30 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Before</h3>
                <p className="text-sm text-muted-foreground">Siloed point tools</p>
              </div>
            </div>

            {/* Fragmented visual */}
            <div className="mb-6 p-4 bg-card/50 rounded-xl border border-destructive/20">
              <svg viewBox="0 0 200 80" className="w-full h-20">
                <defs>
                  <filter id="redGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Disconnected boxes */}
                <rect x="10" y="20" width="40" height="40" rx="4" fill="hsl(var(--destructive))" opacity="0.3" />
                <rect x="80" y="10" width="40" height="30" rx="4" fill="hsl(var(--destructive))" opacity="0.3" />
                <rect x="80" y="50" width="40" height="25" rx="4" fill="hsl(var(--destructive))" opacity="0.3" />
                <rect x="150" y="25" width="40" height="35" rx="4" fill="hsl(var(--destructive))" opacity="0.3" />
                {/* Broken connections */}
                <line x1="50" y1="40" x2="70" y2="40" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
                <line x1="120" y1="25" x2="140" y2="35" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
                <line x1="120" y1="62" x2="140" y2="50" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
                {/* X marks */}
                <g filter="url(#redGlow)">
                  <path d="M65 35 L75 45 M75 35 L65 45" stroke="hsl(var(--destructive))" strokeWidth="2" />
                  <path d="M135 30 L145 40 M145 30 L135 40" stroke="hsl(var(--destructive))" strokeWidth="2" />
                </g>
              </svg>
            </div>

            <ul className="space-y-3 mb-6">
              {beforeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-sm font-medium text-destructive">Result:</p>
              <p className="text-sm text-muted-foreground mt-1">
                Compliance remains reactive, operational improvement is slow, organizations struggle to prove readiness at scale.
              </p>
            </div>
          </div>
        </div>

        {/* After */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-3xl" />
          <div className="relative bg-card/30 border border-primary/30 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">After</h3>
                <p className="text-sm text-primary">Connected platform</p>
              </div>
            </div>

            {/* Connected visual */}
            <div className="mb-6 p-4 bg-card/50 rounded-xl border border-primary/20">
              <svg viewBox="0 0 200 80" className="w-full h-20">
                <defs>
                  <linearGradient id="connectedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                  <filter id="greenGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Connected flow */}
                <path d="M 20 40 Q 50 20, 100 40 T 180 40" fill="none" stroke="url(#connectedGradient)" strokeWidth="3" filter="url(#greenGlow)" />
                {/* Nodes */}
                <circle cx="20" cy="40" r="10" fill="hsl(var(--primary))" opacity="0.8" />
                <circle cx="70" cy="30" r="8" fill="hsl(var(--primary))" opacity="0.6" />
                <circle cx="100" cy="40" r="12" fill="hsl(var(--primary))" opacity="0.9" />
                <circle cx="130" cy="30" r="8" fill="hsl(var(--primary))" opacity="0.6" />
                <circle cx="180" cy="40" r="10" fill="hsl(var(--primary))" opacity="0.8" />
                {/* Infinity symbol overlay */}
                <path d="M 80 40 C 80 25, 100 25, 100 40 C 100 55, 120 55, 120 40 C 120 25, 100 25, 100 40 C 100 55, 80 55, 80 40" 
                      fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
              </svg>
            </div>

            <ul className="space-y-3 mb-6">
              {afterItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm font-medium text-primary">Result:</p>
              <p className="text-sm text-foreground mt-1">
                Operational excellence and readiness scale — with measurable outcomes and audit-ready proof.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Capabilities */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-foreground text-center mb-6">Platform Capabilities That Enable the Shift</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {platformCapabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <div key={index} className="bg-card/30 border border-muted/30 rounded-xl p-5 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${cap.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${cap.color}`} />
                </div>
                <h4 className={`font-semibold ${cap.color} mb-2`}>{cap.title}</h4>
                <p className="text-sm text-muted-foreground">{cap.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unlike callout */}
      <div className="mt-8 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/30 rounded-xl p-6 text-center">
        <p className="text-sm uppercase tracking-widest text-primary/80 mb-2">Competitive Differentiation</p>
        <p className="text-lg text-foreground">
          <span className="font-bold text-primary">"Unlike"</span> point solutions that manage silos,{" "}
          <span className="font-bold">Comply365 closes the loop</span> — connecting safety signals to procedure 
          updates to training activation to audit-ready proof.
        </p>
      </div>
    </SlideContainer>
  );
};

export default Slide2BeforeAfter;
