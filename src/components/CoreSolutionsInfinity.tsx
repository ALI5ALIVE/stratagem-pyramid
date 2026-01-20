import { Shield, FileText, GraduationCap } from "lucide-react";

const CoreSolutionsInfinity = () => {
  const modules = [
    { id: "safety", label: "Safety", icon: Shield, cx: 80, color: "hsl(185 75% 40%)" },
    { id: "content", label: "Content", icon: FileText, cx: 200, color: "hsl(173 80% 50%)" },
    { id: "training", label: "Training", icon: GraduationCap, cx: 320, color: "hsl(160 70% 45%)" },
  ];

  const stages = [
    { id: "detect", label: "Detect", color: "hsl(38 92% 50%)", delay: "0s" },
    { id: "trigger", label: "Trigger", color: "hsl(25 95% 53%)", delay: "2s" },
    { id: "orchestrate", label: "Orchestrate", color: "hsl(199 89% 48%)", delay: "4s" },
    { id: "prove", label: "Prove", color: "hsl(152 68% 45%)", delay: "6s" },
  ];

  // Infinity-style path weaving through all three circles
  const infinityPath = `
    M 80 100 
    C 80 60, 140 60, 200 100 
    C 260 140, 320 140, 320 100 
    C 320 60, 260 60, 200 100 
    C 140 140, 80 140, 80 100
  `;

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Stage labels above */}
      <div className="flex justify-between px-8 mb-2">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: `${stage.color}20` }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: stage.color, boxShadow: `0 0 8px ${stage.color}` }}
            />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: stage.color }}>
              {stage.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main SVG visualization */}
      <svg
        viewBox="0 0 400 180"
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 4px 20px hsl(199 89% 48% / 0.2))" }}
      >
        <defs>
          {/* Gradient for the infinity path */}
          <linearGradient id="infinityPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(185 75% 40%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(173 80% 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(160 70% 45%)" stopOpacity="0.6" />
          </linearGradient>

          {/* Glow filter for animated dots */}
          <filter id="signalGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Module circle gradients */}
          {modules.map((module) => (
            <radialGradient key={`gradient-${module.id}`} id={`${module.id}Gradient`}>
              <stop offset="0%" stopColor={module.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={module.color} stopOpacity="0.1" />
            </radialGradient>
          ))}
        </defs>

        {/* Infinity connection path (background) */}
        <path
          d={infinityPath}
          fill="none"
          stroke="url(#infinityPathGradient)"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="animate-pulse"
          opacity="0.5"
        />

        {/* Three module circles */}
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <g key={module.id}>
              {/* Outer glow ring */}
              <circle
                cx={module.cx}
                cy={100}
                r={42}
                fill="none"
                stroke={module.color}
                strokeWidth="1"
                opacity="0.3"
                className="animate-pulse"
              />
              {/* Main circle */}
              <circle
                cx={module.cx}
                cy={100}
                r={35}
                fill={`url(#${module.id}Gradient)`}
                stroke={module.color}
                strokeWidth="2"
                className="transition-all duration-300 hover:stroke-[3]"
                style={{ cursor: "pointer" }}
              />
              {/* Icon placeholder - using foreignObject for React icons */}
              <foreignObject
                x={module.cx - 12}
                y={88}
                width={24}
                height={24}
                className="pointer-events-none"
              >
                <Icon
                  className="w-6 h-6"
                  style={{ color: module.color }}
                />
              </foreignObject>
              {/* Label */}
              <text
                x={module.cx}
                y={145}
                textAnchor="middle"
                className="text-xs font-semibold uppercase tracking-wider fill-current"
                style={{ fill: module.color }}
              >
                {module.label}
              </text>
            </g>
          );
        })}

        {/* Animated signal dots */}
        {stages.map((stage) => (
          <circle
            key={stage.id}
            r="6"
            fill={stage.color}
            filter="url(#signalGlow)"
          >
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              begin={stage.delay}
              path={infinityPath}
            />
          </circle>
        ))}

        {/* Connection arrows between circles */}
        <g opacity="0.6">
          {/* Safety to Content */}
          <line x1="115" y1="100" x2="165" y2="100" stroke="hsl(179 80% 45%)" strokeWidth="1.5" strokeDasharray="4 2" />
          <polygon points="165,96 173,100 165,104" fill="hsl(179 80% 45%)" />
          
          {/* Content to Training */}
          <line x1="235" y1="100" x2="285" y2="100" stroke="hsl(166 75% 47%)" strokeWidth="1.5" strokeDasharray="4 2" />
          <polygon points="285,96 293,100 285,104" fill="hsl(166 75% 47%)" />
        </g>
      </svg>

      {/* Subtitle */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        Three integrated modules powering continuous improvement
      </p>
    </div>
  );
};

export default CoreSolutionsInfinity;
