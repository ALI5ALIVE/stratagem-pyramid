import { useState, useEffect } from "react";
import SlideContainer from "./SlideContainer";
import { 
  Building2, 
  Target, 
  Users, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase,
  Server,
  Layers,
  Zap,
  Brain,
  Link,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

// Category Positioning Data
const categoryPosition = {
  name: "Operational Performance Platform",
  scope: "for Safety, Content, and Training",
  definition: "A connected, intelligent, and predictive platform that turns signals into orchestrated change and measurable outcomes.",
  operatingModel: "Continuous Improvement Operating Model",
  narrativeSpine: ["Detect", "Trigger", "Orchestrate", "Prove"]
};

// POV Data
const pointOfView = {
  marketShift: "Operational performance is now a competitive advantage. Leaders are measured on excellence, readiness, speed of change, and governance.",
  coreProblem: "Systems for safety, content, and training exist but are disconnected — creating manual coordination, reactive risk handling, procedural drift, and duplicated effort.",
  opportunity: "A connected operating model that turns signals into controlled execution and proof."
};

// Supporting Pillars
const pillars = [
  {
    icon: Link,
    title: "Connected Foundation",
    tagline: "Connect the system of record",
    points: ["One version of truth", "Shared governance & traceability", "Less fragmentation & tool sprawl"]
  },
  {
    icon: Zap,
    title: "Continuous Improvement",
    tagline: "Turn signals into orchestrated action",
    points: ["Event → Investigation → Update → Training", "Faster time-to-change", "Reduced drift & recurrence"]
  },
  {
    icon: CheckCircle2,
    title: "Proof at Scale",
    tagline: "Make readiness provable by default",
    points: ["Audit-ready evidence trails", "Role-based approvals", "Regulatory confidence"]
  },
  {
    icon: Brain,
    title: "AI Accelerator",
    tagline: "AI compresses cycle time",
    points: ["Earlier weak signal detection", "Recommended prioritisation", "Exception-led human oversight"]
  }
];

// Platform Capabilities
const capabilities = [
  {
    icon: Layers,
    title: "Shared Data & Governance",
    description: "Shared models, taxonomies, and knowledge maps across safety, content, and training."
  },
  {
    icon: Zap,
    title: "Integrated Automation",
    description: "Threshold-driven, role-aware workflows with configurable orchestration."
  },
  {
    icon: Brain,
    title: "Embedded Intelligence",
    description: "Transparent, explainable AI embedded into workflows that evolves with usage."
  }
];

// Persona Value Propositions
const personas = [
  {
    id: "executive",
    icon: Briefcase,
    title: "CEO / COO",
    valueProposition: "Reduce disruption, protect revenue, and improve customer experience by accelerating the speed and control of operational change across safety, content, and training.",
    keyMessages: [
      "Single platform for operational governance",
      "Faster speed of controlled change",
      "Reduced operational risk & disruption",
      "Demonstrable readiness to stakeholders"
    ]
  },
  {
    id: "safety",
    icon: ShieldCheck,
    title: "Safety Leader",
    valueProposition: "Reduce risk and recurrence by turning safety signals into controlled operational change and continuous readiness with traceability and proof built in.",
    keyMessages: [
      "Faster, higher-quality investigations",
      "Corrective actions that drive real change",
      "Reduced repeat issues through closed-loop follow-through",
      "Evidence and traceability for audits by default"
    ]
  },
  {
    id: "compliance",
    icon: Target,
    title: "Compliance Leader",
    valueProposition: "Improve audit readiness, governance and regulatory confidence by unifying compliance evidence, controlled change and accountability in one platform.",
    keyMessages: [
      "Evidence always audit-ready by default",
      "Stronger governance with role-based approvals",
      "Reduced manual reporting burden",
      "Confidence to demonstrate readiness"
    ]
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training Leader",
    valueProposition: "Increase workforce readiness and reduce operational variability by linking training directly to real operational risk, change, and procedural updates.",
    keyMessages: [
      "Training targeted to risk & operational change",
      "Personalized training based on role and risk",
      "Faster rollout with validated adoption",
      "Reduced time-to-competency"
    ]
  },
  {
    id: "it",
    icon: Server,
    title: "IT Leader",
    valueProposition: "Reduce fragmentation and risk by consolidating operational governance into a single platform with integrations, role-based controls, and audit trails.",
    keyMessages: [
      "Consolidate operational tool sprawl",
      "Enterprise-grade security & controls",
      "Scalable workflow orchestration",
      "Seamless integrations"
    ]
  }
];

const SlideMessagingHouse = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activePersona, setActivePersona] = useState(0);
  const [isNarrationControlled, setIsNarrationControlled] = useState(false);

  // Timing markers for narration-synced persona changes
  const personaTimings = [
    { index: 0, startPercent: 72 },  // CEO/COO
    { index: 1, startPercent: 78 },  // Safety Leader
    { index: 2, startPercent: 83 },  // Compliance Leader
    { index: 3, startPercent: 88 },  // Training Leader
  ];

  // Sync persona with narration progress
  useEffect(() => {
    if (isPlaying && progress > 0) {
      setIsNarrationControlled(true);
      
      const currentTiming = [...personaTimings]
        .reverse()
        .find(t => progress >= t.startPercent);
      
      if (currentTiming !== undefined && currentTiming.index !== activePersona) {
        setActivePersona(currentTiming.index);
      }
    } else if (!isPlaying && isNarrationControlled) {
      setIsNarrationControlled(false);
    }
  }, [isPlaying, progress, activePersona, isNarrationControlled]);

  return (
    <SlideContainer
      id="slide-12"
      title="Messaging House"
      subtitle="Complete positioning architecture for Operational Performance"
      variant="dark"
      slideNumber={12}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-full">
        {/* Left Column: House Structure */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          
          {/* Rooftop: Category Position */}
          <div className="relative">
            <div 
              className="bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 border border-primary/40 rounded-lg p-3 min-h-[80px]"
              style={{
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)"
              }}
            >
              <div className="pt-10 pb-2 text-center px-8">
                <div className="text-[10px] uppercase tracking-widest text-primary/80 mb-1">Category Position</div>
                <h3 className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                  {categoryPosition.name}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {categoryPosition.scope}
                </p>
              </div>
            </div>
          </div>

          {/* Category Definition Box */}
          <div className="bg-card/60 border border-border/50 rounded-lg p-3 -mt-2">
            <p className="text-xs text-muted-foreground leading-relaxed text-center">
              {categoryPosition.definition}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              {categoryPosition.narrativeSpine.map((step, i) => (
                <div key={step} className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-primary">{step}</span>
                  {i < categoryPosition.narrativeSpine.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* POV Section */}
          <div className="bg-card/40 border border-border/30 rounded-lg p-3">
            <div className="text-xs uppercase tracking-widest text-accent/80 mb-2">Point of View</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <div className="text-[10px] font-medium text-muted-foreground uppercase">Market Shift</div>
                <p className="text-[11px] text-foreground/80 leading-tight">{pointOfView.marketShift}</p>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-medium text-muted-foreground uppercase">Core Problem</div>
                <p className="text-[11px] text-foreground/80 leading-tight">{pointOfView.coreProblem}</p>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-medium text-muted-foreground uppercase">Opportunity</div>
                <p className="text-[11px] text-foreground/80 leading-tight">{pointOfView.opportunity}</p>
              </div>
            </div>
          </div>

          {/* Four Pillars */}
          <div className="grid grid-cols-4 gap-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.title}
                  className="bg-gradient-to-b from-card/80 to-card/40 border border-border/50 rounded-lg p-2 text-center"
                >
                  <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon className="w-3 h-3 text-primary" />
                  </div>
                  <div className="text-[10px] font-bold text-foreground leading-tight">{pillar.title}</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{pillar.tagline}</div>
                </div>
              );
            })}
          </div>

          {/* Platform Capabilities Foundation */}
          <div className="bg-muted/30 border-t-2 border-primary/50 rounded-b-lg p-3">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 text-center">Platform Capabilities</div>
            <div className="grid grid-cols-3 gap-2">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.title} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-foreground">{cap.title}</div>
                      <div className="text-[9px] text-muted-foreground leading-tight">{cap.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Persona Value Props */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Value Propositions by Persona</div>
          
          {/* Persona Tabs */}
          <div className="flex flex-wrap gap-1 mb-3">
            {personas.map((persona, index) => {
              const Icon = persona.icon;
              return (
                <button
                  key={persona.id}
                  onClick={() => setActivePersona(index)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                    activePersona === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {persona.title}
                </button>
              );
            })}
          </div>

          {/* Active Persona Content */}
          <div className={`flex-1 bg-card/60 border border-border/50 rounded-lg p-4 ${isNarrationControlled ? 'animate-fade-in' : ''}`}>
            <div className="flex items-center gap-2 mb-3">
              {(() => {
                const Icon = personas[activePersona].icon;
                return <Icon className="w-5 h-5 text-primary" />;
              })()}
              <h4 className="text-sm font-bold text-foreground">{personas[activePersona].title}</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Value Proposition</div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {personas[activePersona].valueProposition}
                </p>
              </div>
              
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Key Messages</div>
                <ul className="space-y-1">
                  {personas[activePersona].keyMessages.map((msg, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/80">
                      <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                      <span>{msg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Differentiation Statement */}
          <div className="mt-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-wider text-primary/80 mb-1">Differentiation</div>
            <p className="text-xs font-medium text-foreground">
              "Point solutions manage silos. <span className="text-primary">Comply365 closes the loop.</span>"
            </p>
            <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
              Unlike point solutions that manage safety, content, or training in isolation, Comply365 unifies all three into one governed platform.
            </p>
          </div>

          {/* Category Promise */}
          <div className="mt-2 text-center">
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground/60">Category Promise</div>
            <p className="text-xs font-semibold text-foreground/90 italic">
              "Make operational performance predictable, measurable, and provable."
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideMessagingHouse;
