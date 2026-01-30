import { Sparkles, Zap, Brain, Lightbulb, CheckCircle2 } from "lucide-react";

const aiStages = [
  {
    id: "today",
    label: "Today",
    stage: "Stage 3",
    status: "Active",
    statusColor: "bg-emerald-500",
    title: "Connected Governance",
    icon: Zap,
    capabilities: [
      "Unified data across Safety, Content, and Training",
      "Governance-aware workflows with audit trails",
      "Pattern detection from FOQA/ASAP/crew reports",
      "Coordinated change management",
    ],
  },
  {
    id: "nearterm",
    label: "Near-term",
    stage: "Stage 4",
    status: "In Development",
    statusColor: "bg-amber-500",
    title: "Intelligent Operations",
    icon: Lightbulb,
    capabilities: [
      "AI-assisted drafting and execution",
      "Recommended actions with context awareness",
      "Automated trigger orchestration",
      "Compressed decision cycles",
    ],
  },
  {
    id: "future",
    label: "Future",
    stage: "Stage 5",
    status: "Vision",
    statusColor: "bg-purple-500",
    title: "Predictive Intelligence",
    icon: Brain,
    capabilities: [
      "Weak signal detection before incidents",
      "Proactive intervention recommendations",
      "Risk forecasting models",
      "Self-optimizing operational workflows",
    ],
  },
];

const alreadyDeployed = [
  "Pattern detection from Flight Ops Quality Assurance & Aviation Safety Action Program",
  "Assisted drafting of procedures and training triggers",
  "Governance-aware automation with audit trails",
];

const PlatformAIStory = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Copy */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm text-primary uppercase tracking-wider font-semibold">
                  Becoming an AI Company
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Intelligence That's Embedded, Not Bolted On
              </h2>
              <p className="text-lg text-muted-foreground">
                AI is woven into every stage of the operating model — not added as a separate dashboard. 
                Intelligence that learns, detects, and assists while keeping humans in control.
              </p>
            </div>

            {/* Already Deployed */}
            <div className="bg-card border border-emerald-500/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h3 className="font-semibold text-foreground">Already Deployed Today</h3>
              </div>
              <ul className="space-y-3">
                {alreadyDeployed.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Message */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-5">
              <p className="text-lg text-foreground font-medium text-center">
                More than a platform company — an <span className="text-primary">AI company</span>
              </p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                The Operational Intelligence Layer is our AI story — positioning Comply365 as a leader 
                in AI-powered operational performance.
              </p>
            </div>
          </div>

          {/* Right: AI Roadmap Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Intelligence Maturity Roadmap
            </h3>
            
            <div className="relative space-y-4">
              {/* Vertical line */}
              <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-border" />

              {aiStages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div 
                    key={stage.id}
                    className="relative pl-12"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-4 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>

                    {/* Stage card */}
                    <div className="bg-card border border-border/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{stage.stage}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${stage.statusColor}`}>
                            {stage.status}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{stage.label}</span>
                      </div>
                      
                      <h4 className="font-semibold text-foreground mb-3">{stage.title}</h4>

                      <ul className="space-y-1.5">
                        {stage.capabilities.map((cap, capIndex) => (
                          <li key={capIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformAIStory;
