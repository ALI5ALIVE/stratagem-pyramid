import { useEffect, useRef, useState } from "react";
import SlideContainer from "./SlideContainer";
import { TrendingUp, Shield, Brain, BarChart3, RotateCw, Target, Zap, Users, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Slide6Investors = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [activeTab, setActiveTab] = useState("growth");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveNode((prev) => {
        const next = (prev + 1) % 4;
        setActiveTab(flywheelNodes[next].tabValue);
        return next;
      });
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const nodeIndex = flywheelNodes.findIndex(n => n.tabValue === value);
    if (nodeIndex !== -1) {
      setActiveNode(nodeIndex);
      // Reset the interval when user manually selects
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setActiveNode((prev) => {
          const next = (prev + 1) % 4;
          setActiveTab(flywheelNodes[next].tabValue);
          return next;
        });
      }, 4000);
    }
  };

  const handleNodeClick = (nodeIndex: number) => {
    setActiveNode(nodeIndex);
    setActiveTab(flywheelNodes[nodeIndex].tabValue);
    // Reset the interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveNode((prev) => {
        const next = (prev + 1) % 4;
        setActiveTab(flywheelNodes[next].tabValue);
        return next;
      });
    }, 4000);
  };

  return (
    <SlideContainer
      id="slide-6"
      title="Why the Platform + New Category Builds Shareholder Value"
      subtitle="A category-level repositioning designed to drive scalable growth, higher-quality revenue, and long-term defensibility"
    >
      {/* Core Message Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-4 mb-6">
        <p className="text-sm text-foreground text-center">
          <span className="font-semibold text-primary">This is a category-level repositioning, not a messaging refresh.</span>{" "}
          It is designed to drive scalable growth, higher-quality revenue, and long-term defensibility.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Value Flywheel Visual */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-72 h-72 lg:w-80 lg:h-80">
            {/* Circular background */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30" />
            
            {/* Animated ring */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
              <circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke="url(#ringGradient)"
                strokeWidth="4"
                strokeDasharray="880"
                strokeDashoffset={880 - (activeNode + 1) * 220}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-bold text-primary">Shareholder</p>
                <p className="text-sm text-muted-foreground">Value</p>
              </div>
            </div>

            {/* Nodes */}
            {flywheelNodes.map((node, index) => {
              const angle = (index * 90 - 90) * (Math.PI / 180);
              const radius = 130;
              const x = 160 + radius * Math.cos(angle);
              const y = 160 + radius * Math.sin(angle);
              const isActive = activeNode === index;
              const Icon = node.icon;

              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(index)}
                  className={`
                    absolute w-20 h-20 lg:w-24 lg:h-24 -translate-x-1/2 -translate-y-1/2 rounded-xl
                    flex flex-col items-center justify-center p-2 transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/30 scale-110' 
                      : 'bg-card/50 border border-muted-foreground/30 hover:border-primary/50'}
                  `}
                  style={{ left: x, top: y }}
                >
                  <Icon className={`w-5 h-5 lg:w-6 lg:h-6 mb-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-xs text-center font-medium leading-tight ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {node.label}
                  </span>
                </button>
              );
            })}

            {/* Rotation indicator */}
            <div className="absolute top-1/2 right-0 transform translate-x-4 -translate-y-1/2">
              <RotateCw className="w-5 h-5 text-primary animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto p-1">
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
              <TabsContent key={key} value={key} className="mt-4 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground">{pillar.description}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-primary mb-2 flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {key === "revenue" ? "How revenue scales:" : key === "ai" ? "What AI accelerates:" : "What this unlocks:"}
                    </p>
                    <ul className="space-y-1.5">
                      {pillar.unlocks.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Zap className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {"critical" in pillar && pillar.critical && (
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-accent mb-1.5 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Critically:
                      </p>
                      <ul className="space-y-1">
                        {pillar.critical.map((item, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                    <p className="text-xs font-medium text-primary mb-1.5 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Shareholder impact:
                    </p>
                    <ul className="space-y-1">
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
      <div className="mt-6 bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/40 rounded-xl p-5">
        <p className="text-sm text-foreground text-center leading-relaxed">
          <span className="font-semibold text-primary">Closing takeaway:</span>{" "}
          Comply365 is repositioning around a platform category that compounds value over time — expanding market opportunity, improving revenue quality, and creating a durable operating-model moat that supports long-term shareholder value.
        </p>
      </div>
    </SlideContainer>
  );
};

export default Slide6Investors;
