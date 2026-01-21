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
      fill: "#dc2626",
    },
    {
      level: 2,
      label: "Managed Compliance",
      sublabel: "Siloed",
      description: "Strong departmental systems, but disconnected → compliance managed, performance doesn't systematically improve, repeat issues persist.",
      color: "from-amber-500 to-orange-500",
      textColor: "text-amber-400",
      fill: "#f59e0b",
    },
    {
      level: 3,
      label: "Connected Governance",
      sublabel: "Platform Foundation",
      description: "Unified governed system of record → audit readiness up; coordination overhead down.",
      color: "from-violet-500 to-purple-500",
      textColor: "text-violet-400",
      fill: "#8b5cf6",
    },
    {
      level: 4,
      label: "Continuous Improvement",
      sublabel: "Outcome Engine",
      description: "Signals trigger workflows; corrective actions drive controlled change; training targeted + triggered; evidence automatic → recurrence down; time-to-change down; KPI lift.",
      color: "from-primary to-blue-500",
      textColor: "text-primary",
      fill: "#0066ff",
    },
    {
      level: 5,
      label: "Predictive & Agentic",
      sublabel: "AI-Accelerated",
      description: "AI detects weak signals; prioritised recommendations; assisted drafting; exception-led oversight with governed approvals; continuous proof.",
      color: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-400",
      fill: "#10b981",
    },
  ];

  return (
    <SlideContainer
      id="slide-4"
      title="The Value Pyramid"
      subtitle="Why value compounds when Safety + Procedures + Training are connected"
      slideNumber={4}
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Pyramid Visual */}
        <div className="relative">
          <svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto">
            {/* Pyramid layers from bottom to top */}
            {stages.slice().reverse().map((stage, index) => {
              const layerHeight = 48;
              const y = index * layerHeight + 25;
              const topWidth = 340 - (4 - index) * 55;
              const bottomWidth = 340 - (3 - index) * 55;
              const topOffset = (400 - topWidth) / 2;
              const bottomOffset = (400 - bottomWidth) / 2;
              const isHovered = hoveredStage === stage.level;

              return (
                <g 
                  key={stage.level}
                  onMouseEnter={() => setHoveredStage(stage.level)}
                  onMouseLeave={() => setHoveredStage(null)}
                  className="cursor-pointer transition-all duration-300"
                >
                  <path
                    d={`M ${bottomOffset} ${y + layerHeight} L ${topOffset} ${y} L ${400 - topOffset} ${y} L ${400 - bottomOffset} ${y + layerHeight} Z`}
                    fill={stage.fill}
                    fillOpacity={isHovered ? 1 : 0.8}
                    stroke={isHovered ? "#fff" : stage.fill}
                    strokeWidth={isHovered ? 2 : 1}
                    className="transition-all duration-300"
                  />
                  <text
                    x="200"
                    y={y + layerHeight / 2 + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
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
            <ArrowUp className="w-6 h-6 text-primary" />
            <div className="text-xs font-semibold text-primary rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Compounding ROI
            </div>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Stage Descriptions */}
        <div className="space-y-3">
          {stages.map((stage) => (
            <div
              key={stage.level}
              className={`
                p-4 rounded-lg border transition-all duration-300 cursor-pointer
                ${hoveredStage === stage.level 
                  ? `bg-card border-current ${stage.textColor}` 
                  : 'bg-card/30 border-border hover:border-muted-foreground/40'}
              `}
              onMouseEnter={() => setHoveredStage(stage.level)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-sm font-bold ${stage.textColor}`}>
                  Stage {stage.level}
                </span>
                <span className="text-foreground font-medium text-sm">{stage.label}</span>
                <span className="text-muted-foreground text-xs">({stage.sublabel})</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
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
