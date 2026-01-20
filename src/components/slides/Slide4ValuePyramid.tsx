import { useState } from "react";
import SlideContainer from "./SlideContainer";
import { ArrowUp, TrendingUp } from "lucide-react";

const Slide4ValuePyramid = () => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const stages = [
    {
      level: 1,
      label: "Fragmented & Reactive",
      sublabel: "Starting Point",
      description: "Disconnected systems; manual coordination; training not tied to signals; evidence late → variability + repeat issues + slow recovery.",
      color: "from-red-500 to-rose-500",
      textColor: "text-red-400",
    },
    {
      level: 2,
      label: "Managed Compliance",
      sublabel: "Siloed",
      description: "Strong departmental systems, but disconnected → compliance managed, performance doesn't systematically improve, repeat issues persist.",
      color: "from-amber-500 to-orange-500",
      textColor: "text-amber-400",
    },
    {
      level: 3,
      label: "Connected Governance",
      sublabel: "Platform Foundation",
      description: "Unified governed system of record → audit readiness up; coordination overhead down.",
      color: "from-violet-500 to-purple-500",
      textColor: "text-violet-400",
    },
    {
      level: 4,
      label: "Continuous Improvement",
      sublabel: "Outcome Engine",
      description: "Signals trigger workflows; corrective actions drive controlled change; training targeted + triggered; evidence automatic → recurrence down; time-to-change down; KPI lift.",
      color: "from-primary to-blue-500",
      textColor: "text-primary",
    },
    {
      level: 5,
      label: "Predictive & Agentic",
      sublabel: "AI-Accelerated",
      description: "AI detects weak signals; prioritised recommendations; assisted drafting; exception-led oversight with governed approvals; continuous proof.",
      color: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-400",
    },
  ];

  return (
    <SlideContainer
      id="slide-4"
      title="The Value Pyramid"
      subtitle="Why value compounds when Safety + Procedures + Training are connected"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Pyramid Visual */}
        <div className="relative">
          <svg viewBox="0 0 400 350" className="w-full max-w-md mx-auto">
            <defs>
              {stages.map((stage) => (
                <linearGradient key={`grad-${stage.level}`} id={`pyramidGrad${stage.level}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className={stage.color.split(' ')[0].replace('from-', 'stop-')} stopColor="currentColor" />
                  <stop offset="100%" className={stage.color.split(' ')[1].replace('to-', 'stop-')} stopColor="currentColor" />
                </linearGradient>
              ))}
              <filter id="pyramidGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Pyramid layers from bottom to top */}
            {stages.slice().reverse().map((stage, index) => {
              const layerHeight = 50;
              const y = index * layerHeight + 30;
              const topWidth = 360 - (4 - index) * 60;
              const bottomWidth = 360 - (3 - index) * 60;
              const topOffset = (400 - topWidth) / 2;
              const bottomOffset = (400 - bottomWidth) / 2;
              const isHovered = hoveredStage === stage.level;

              // Determine fill color based on stage
              const fillColors = {
                1: "#ef4444", // red
                2: "#f59e0b", // amber
                3: "#8b5cf6", // violet
                4: "#3b82f6", // primary blue
                5: "#10b981", // emerald
              };

              return (
                <g 
                  key={stage.level}
                  onMouseEnter={() => setHoveredStage(stage.level)}
                  onMouseLeave={() => setHoveredStage(null)}
                  className="cursor-pointer transition-all duration-300"
                >
                  <path
                    d={`M ${bottomOffset} ${y + layerHeight} L ${topOffset} ${y} L ${400 - topOffset} ${y} L ${400 - bottomOffset} ${y + layerHeight} Z`}
                    fill={fillColors[stage.level as keyof typeof fillColors]}
                    fillOpacity={isHovered ? 0.9 : 0.7}
                    stroke={fillColors[stage.level as keyof typeof fillColors]}
                    strokeWidth={isHovered ? 2 : 1}
                    filter={isHovered ? "url(#pyramidGlow)" : undefined}
                    className="transition-all duration-300"
                  />
                  <text
                    x="200"
                    y={y + layerHeight / 2 + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="600"
                    className="pointer-events-none"
                  >
                    {stage.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Compounding ROI Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 hidden lg:flex">
            <ArrowUp className="w-8 h-8 text-primary animate-bounce" />
            <div className="writing-mode-vertical text-sm font-semibold text-primary rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Compounding ROI
            </div>
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Stage Descriptions */}
        <div className="space-y-4">
          {stages.map((stage) => (
            <div
              key={stage.level}
              className={`
                p-4 rounded-xl border transition-all duration-300 cursor-pointer
                ${hoveredStage === stage.level 
                  ? `bg-gradient-to-r ${stage.color} bg-opacity-20 border-current shadow-lg` 
                  : 'bg-card/30 border-muted-foreground/20 hover:border-muted-foreground/40'}
              `}
              onMouseEnter={() => setHoveredStage(stage.level)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-lg font-bold ${stage.textColor}`}>
                  Stage {stage.level}
                </span>
                <span className="text-foreground font-semibold">—</span>
                <span className="text-foreground font-medium">{stage.label}</span>
                <span className="text-muted-foreground text-sm">({stage.sublabel})</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide4ValuePyramid;
