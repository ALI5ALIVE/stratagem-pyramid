import { useState } from "react";
import SlideContainer from "./SlideContainer";
import { TrendingUp, Shield, Brain, BarChart3, Target, Zap, Users, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SlideNarrationProps } from "@/types/slideProps";

const Slide6Investors = ({
  isActive = false,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  onPlay,
  onPause,
}: SlideNarrationProps) => {
  const [activeNode, setActiveNode] = useState(0);
  const [activeTab, setActiveTab] = useState("growth");

  const flywheelNodes = [
    { id: 0, label: "Growth", subtitle: "TAM + Win Rates", icon: TrendingUp, tabValue: "growth" },
    { id: 1, label: "Revenue Quality", subtitle: "ACV + Retention", icon: BarChart3, tabValue: "revenue" },
    { id: 2, label: "Defensibility", subtitle: "Operating Moat", icon: Shield, tabValue: "defensibility" },
    { id: 3, label: "AI Multiplier", subtitle: "Intelligence", icon: Brain, tabValue: "ai" },
  ];

  const pillars = {
    growth: {
      title: "Growth: Expand TAM and Increase Win Rates",
      description: "By moving from point-solution comparisons to owning an Operational Excellence & Readiness Platform, Comply365 competes on outcomes, not features.",
      unlocks: [
        "Larger addressable market beyond 'compliance tooling'",
        "Clear differentiation in competitive sales cycles",
        "Stronger executive relevance in buying decisions",
      ],
      impacts: [
        "Higher win rates through platform differentiation",
        "Stronger positioning in enterprise and multi-year deals",
      ],
    },
    revenue: {
      title: "Revenue Quality: Higher ACV, Expansion, and Retention",
      description: "Platform value compounds as more workflows and teams are connected.",
      unlocks: [
        "Land with one module",
        "Expand across safety, procedures, and training",
        "Upsell intelligence and automation",
        "Deepen lock-in through governance and embedded workflows",
      ],
      impacts: [
        "Higher average contract value",
        "Stronger expansion revenue over time",
        "Increased net revenue retention",
        "Reduced churn as Comply365 becomes operationally embedded",
      ],
    },
    defensibility: {
      title: "Defensibility: An Operating Model Moat",
      description: "Customers don't fail because they lack tools — they fail because signals don't translate into execution.",
      unlocks: [
        "Comply365 owns the missing layer: Detect → Trigger → Orchestrate → Prove",
        "Point solutions stop at reporting or storage",
        "Comply365 orchestrates cross-functional execution with governance and proof",
      ],
      impacts: [
        "Structural differentiation competitors can't easily copy",
        "Switching costs increase as the platform becomes the operating backbone",
        "Long-term category leadership potential",
      ],
    },
    ai: {
      title: "AI as the Multiplier",
      description: "AI is embedded inside the platform operating model, not sold as standalone features.",
      unlocks: [
        "Earlier detection of weak signals",
        "Smarter prioritisation of actions",
        "Assisted drafting and execution",
        "Continuous, automated proof",
      ],
      critical: ["Humans remain in control", "Approvals and audit trails are native"],
      impacts: [
        "Enterprise-safe AI monetisation",
        "Premium positioning without regulatory risk",
        "Future-proof growth engine",
      ],
    },
  };


  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const nodeIndex = flywheelNodes.findIndex(n => n.tabValue === value);
    if (nodeIndex !== -1) {
      setActiveNode(nodeIndex);
    }
  };

  const handleNodeClick = (nodeIndex: number) => {
    setActiveNode(nodeIndex);
    setActiveTab(flywheelNodes[nodeIndex].tabValue);
  };

  return (
    <SlideContainer
      id="slide-10"
      title="Why the Platform + New Category Builds Shareholder Value"
      subtitle="How category leadership compounds into shareholder value"
      slideNumber={10}
      isActive={isActive}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      onPlay={onPlay}
      onPause={onPause}
    >
      {/* Core Message Banner */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
        <p className="text-sm text-foreground text-center">
          <span className="font-semibold text-primary">This is a category-level repositioning, not a messaging refresh.</span>{" "}
          It is designed to drive scalable growth, higher-quality revenue, and long-term defensibility.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Value Flywheel Visual */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-64 h-64 lg:w-72 lg:h-72">
            {/* Circular background */}
            <div className="absolute inset-0 rounded-full border border-dashed border-primary/30" />
            
            {/* Animated ring */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 288 288">
              <defs>
                <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
              <circle
                cx="144"
                cy="144"
                r="125"
                fill="none"
                stroke="url(#ringGrad2)"
                strokeWidth="3"
                strokeDasharray="785"
                strokeDashoffset={785 - (activeNode + 1) * 196}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-base font-bold text-primary">Shareholder</p>
                <p className="text-xs text-muted-foreground">Value</p>
              </div>
            </div>

            {/* Nodes */}
            {flywheelNodes.map((node, index) => {
              const angle = (index * 90 - 90) * (Math.PI / 180);
              const radius = 115;
              const x = 144 + radius * Math.cos(angle);
              const y = 144 + radius * Math.sin(angle);
              const isActive = activeNode === index;
              const Icon = node.icon;

              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(index)}
                  className={`
                    absolute w-16 h-16 lg:w-20 lg:h-20 -translate-x-1/2 -translate-y-1/2 rounded-lg
                    flex flex-col items-center justify-center p-2 transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'bg-primary/20 border-2 border-primary scale-110' 
                      : 'bg-card border border-border hover:border-primary/50'}
                  `}
                  style={{ left: x, top: y }}
                >
                  <Icon className={`w-4 h-4 lg:w-5 lg:h-5 mb-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-[10px] text-center font-medium leading-tight ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {node.label}
                  </span>
                </button>
              );
            })}

          </div>
        </div>

        {/* Tabbed Content */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-card">
              <TabsTrigger value="growth" className="text-xs px-2 py-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Growth</span>
              </TabsTrigger>
              <TabsTrigger value="revenue" className="text-xs px-2 py-2">
                <BarChart3 className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Revenue</span>
              </TabsTrigger>
              <TabsTrigger value="defensibility" className="text-xs px-2 py-2">
                <Shield className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Moat</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="text-xs px-2 py-2">
                <Brain className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">AI</span>
              </TabsTrigger>
            </TabsList>

            {Object.entries(pillars).map(([key, pillar]) => (
              <TabsContent key={key} value={key} className="mt-4 space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{pillar.title}</h3>
                  <p className="text-xs text-muted-foreground">{pillar.description}</p>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-primary mb-1.5 flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {key === "revenue" ? "How revenue scales:" : key === "ai" ? "What AI accelerates:" : "What this unlocks:"}
                    </p>
                    <ul className="space-y-1">
                      {pillar.unlocks.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Zap className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {"critical" in pillar && pillar.critical && (
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-2.5">
                      <p className="text-xs font-medium text-accent mb-1 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Critically:
                      </p>
                      <ul className="space-y-0.5">
                        {pillar.critical.map((item, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-2.5">
                    <p className="text-xs font-medium text-primary mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Shareholder impact:
                    </p>
                    <ul className="space-y-0.5">
                      {pillar.impacts.map((impact, idx) => (
                        <li key={idx} className="text-xs text-foreground flex items-start gap-2">
                          <TrendingUp className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                          {impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Closing Takeaway */}
      <div className="mt-6 bg-primary/10 border border-primary/30 rounded-lg p-4">
        <p className="text-xs text-foreground text-center leading-relaxed">
          <span className="font-semibold text-primary">Closing takeaway:</span>{" "}
          Comply365 is repositioning around a platform category that compounds value over time — expanding market opportunity, improving revenue quality, and creating a durable operating-model moat that supports long-term shareholder value.
        </p>
      </div>
    </SlideContainer>
  );
};

export default Slide6Investors;
