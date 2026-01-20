import { useState } from "react";
import SlideContainer from "./SlideContainer";
import { CheckCircle2, ArrowRight } from "lucide-react";

const Slide5MaturityCurve = () => {
  const [activeStage, setActiveStage] = useState(3);

  const stages = [
    { x: 50, y: 280, stage: 1, label: "Fragmented" },
    { x: 130, y: 240, stage: 2, label: "Managed" },
    { x: 220, y: 180, stage: 3, label: "Connected" },
    { x: 320, y: 100, stage: 4, label: "Continuous" },
    { x: 440, y: 30, stage: 5, label: "Predictive" },
  ];

  const stageProgression = [
    {
      stage: 1,
      from: "Disconnected tools + reactive audits",
      to: "Stabilise within silos",
    },
    {
      stage: 2,
      from: "Departmental strength, limited cross-functional execution",
      to: "Connect under shared governance",
    },
    {
      stage: 3,
      from: "Unified platform foundation",
      to: "Activate cross-functional workflows",
    },
    {
      stage: 4,
      from: "Orchestrated action + controlled change with evidence by default",
      to: "Embed AI with governance",
    },
    {
      stage: 5,
      from: "AI detects + recommends",
      to: "Humans govern approvals; proof continuous",
    },
  ];

  return (
    <SlideContainer
      id="slide-5"
      title="The Maturity Curve"
      subtitle="How organisations progress up the pyramid — a measurable transformation program"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Curve Visual */}
        <div className="relative">
          <svg viewBox="0 0 500 320" className="w-full">
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.8" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="1" />
              </linearGradient>
              <filter id="curveGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Axes */}
            <line x1="30" y1="290" x2="480" y2="290" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.3" />
            <line x1="30" y1="290" x2="30" y2="20" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.3" />
            
            {/* Axis labels */}
            <text x="250" y="310" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">Maturity Stage</text>
            <text x="15" y="155" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" transform="rotate(-90, 15, 155)">Value</text>

            {/* Hockey stick curve */}
            <path
              d="M 50 280 Q 100 270 130 240 Q 170 200 220 180 Q 280 150 320 100 Q 380 40 440 30"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#curveGlow)"
            />

            {/* Stage markers */}
            {stages.map((point) => (
              <g 
                key={point.stage}
                onClick={() => setActiveStage(point.stage)}
                className="cursor-pointer"
              >
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={activeStage === point.stage ? 16 : 12}
                  fill={activeStage === point.stage ? "hsl(var(--primary))" : "hsl(var(--card))"}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  className="transition-all duration-300"
                  filter={activeStage === point.stage ? "url(#curveGlow)" : undefined}
                />
                <text
                  x={point.x}
                  y={point.y + 4}
                  textAnchor="middle"
                  fill={activeStage === point.stage ? "white" : "hsl(var(--primary))"}
                  fontSize="12"
                  fontWeight="bold"
                >
                  {point.stage}
                </text>
                <text
                  x={point.x}
                  y={point.y + 32}
                  textAnchor="middle"
                  fill="hsl(var(--foreground))"
                  fontSize="9"
                >
                  {point.label}
                </text>
              </g>
            ))}

            {/* Proof metrics checkpoints */}
            {stages.slice(0, -1).map((point, index) => (
              <g key={`checkpoint-${index}`}>
                <line
                  x1={point.x + 30}
                  y1={point.y - 10}
                  x2={stages[index + 1].x - 30}
                  y2={stages[index + 1].y + 10}
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                  opacity="0.3"
                />
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Value Proof Checkpoints</span>
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className="space-y-6">
          {/* Stage progression */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Stage Progression:</h3>
            <div className="space-y-3">
              {stageProgression.map((item) => (
                <div
                  key={item.stage}
                  className={`
                    p-3 rounded-lg border transition-all duration-300 cursor-pointer
                    ${activeStage === item.stage 
                      ? 'bg-primary/10 border-primary/50' 
                      : 'bg-card/20 border-muted-foreground/20 hover:border-muted-foreground/40'}
                  `}
                  onClick={() => setActiveStage(item.stage)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-bold ${activeStage === item.stage ? 'text-primary' : 'text-muted-foreground'}`}>
                      Stage {item.stage}:
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{item.from}</span>
                    <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                    <span className="text-foreground font-medium">{item.to}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide5MaturityCurve;
