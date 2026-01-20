import { useEffect, useRef, useState } from "react";
import SlideContainer from "./SlideContainer";
import { TrendingUp, Shield, Database, Brain, ArrowRight, RotateCw } from "lucide-react";

const Slide6Investors = () => {
  const [activeNode, setActiveNode] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const flywheelNodes = [
    { id: 0, label: "More Connected Workflows", icon: GitBranch, position: "top" },
    { id: 1, label: "More Proof", icon: Shield, position: "right" },
    { id: 2, label: "Better Outcomes", icon: TrendingUp, position: "bottom" },
    { id: 3, label: "Broader Adoption", icon: Users, position: "left" },
  ];

  const commercialAdvantages = [
    "Improves operational excellence by reducing repeat issues and disruption",
    "Lowers compliance cost by eliminating manual audit preparation and duplication",
    "Accelerates execution by compressing time-to-change",
    "Keeps proof always-on through automated traceability and evidence generation",
  ];

  const defensibility = [
    {
      icon: Database,
      title: "Shared data & governance",
      description: "One governed system of record across safety, procedures, training",
    },
    {
      icon: RotateCw,
      title: "Operating model as the moat",
      description: "Detect → Trigger → Orchestrate → Prove",
    },
    {
      icon: Brain,
      title: "Intelligence + AI embedded",
      description: "Trust controls (human-in-loop, explainability, audit trails)",
    },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 1500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <SlideContainer
      id="slide-6"
      title="What This Means for Investors"
      subtitle="Why this positioning is a growth and defensibility lever"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Value Flywheel Visual */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-80 h-80">
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
                <p className="text-lg font-bold text-primary">Value</p>
                <p className="text-sm text-muted-foreground">Flywheel</p>
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
                <div
                  key={node.id}
                  className={`
                    absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-xl
                    flex flex-col items-center justify-center p-2 transition-all duration-300
                    ${isActive 
                      ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/30 scale-110' 
                      : 'bg-card/50 border border-muted-foreground/30'}
                  `}
                  style={{ left: x, top: y }}
                >
                  <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-xs text-center font-medium leading-tight ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {node.label}
                  </span>
                </div>
              );
            })}

            {/* Rotation arrows */}
            <div className="absolute top-1/2 right-0 transform translate-x-4 -translate-y-1/2">
              <RotateCw className="w-5 h-5 text-primary animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Core takeaway */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-5">
            <p className="text-sm text-muted-foreground mb-2">Core investor takeaway:</p>
            <p className="text-foreground font-medium">
              This category shift reframes Comply365 from "tools in silos" to an <span className="text-primary font-bold">operating system that scales outcomes</span> across regulated operations.
            </p>
          </div>

          {/* Commercial advantages */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Why the platform wins commercially:</h3>
            <ul className="space-y-3">
              {commercialAdvantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {advantage}
                </li>
              ))}
            </ul>
          </div>

          {/* Platform defensibility */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Platform defensibility:</h3>
            <div className="space-y-3">
              {defensibility.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 bg-card/30 rounded-lg border border-muted-foreground/20">
                    <Icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

// Import icons used in flywheelNodes
import { GitBranch, Users } from "lucide-react";

export default Slide6Investors;
