import { useState } from "react";

interface TripleLoopProps {
  onModuleClick: (module: string) => void;
  scale?: number;
}

const TripleLoop = ({ onModuleClick, scale = 1 }: TripleLoopProps) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const modules = [
    { id: "safety", label: "Safety", cx: 70, color: "hsl(185 75% 40%)" },
    { id: "content", label: "Content", cx: 150, color: "hsl(173 80% 50%)" },
    { id: "training", label: "Training", cx: 230, color: "hsl(160 70% 45%)" },
  ];

  const loopRadius = 35;
  const cy = 50;
  const overlap = 25; // How much circles overlap

  // Calculate the continuous figure-8 path through all 3 loops
  // This creates a smooth infinity-like flow: Safety → Content → Training → Content → Safety
  const createFlowPath = () => {
    const r = loopRadius;
    const y = cy;
    
    // Circle centers
    const c1 = modules[0].cx; // Safety (70)
    const c2 = modules[1].cx; // Content (150)
    const c3 = modules[2].cx; // Training (230)
    
    // Crossover points (where circles meet)
    const cross1 = (c1 + c2) / 2; // ~110
    const cross2 = (c2 + c3) / 2; // ~190
    
    // Build a smooth continuous path
    // Start at top of Safety loop, go clockwise
    return `
      M ${c1} ${y - r}
      A ${r} ${r} 0 1 1 ${cross1} ${y}
      A ${r} ${r} 0 1 1 ${c2} ${y - r}
      A ${r} ${r} 0 1 1 ${cross2} ${y}
      A ${r} ${r} 0 1 1 ${c3} ${y - r}
      A ${r} ${r} 0 1 1 ${cross2} ${y}
      A ${r} ${r} 0 1 1 ${c2} ${y + r}
      A ${r} ${r} 0 1 1 ${cross1} ${y}
      A ${r} ${r} 0 1 1 ${c1} ${y - r}
    `;
  };

  const flowPath = createFlowPath();

  return (
    <svg
      viewBox="0 0 300 100"
      className="w-full h-full"
      style={{ 
        transform: `scale(${scale})`,
        filter: "drop-shadow(0 0 8px hsl(173 80% 40% / 0.4))"
      }}
    >
      <defs>
        {/* Gradient for the loops */}
        <linearGradient id="tripleLoopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(173 80% 50%)" />
          <stop offset="50%" stopColor="hsl(199 89% 55%)" />
          <stop offset="100%" stopColor="hsl(173 80% 50%)" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="tripleLoopGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(173 80% 50%)" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Hover glow filter */}
        <filter id="moduleHoverGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="hsl(173 80% 60%)" floodOpacity="0.8" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Dot glow */}
        <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Three interlocking circles */}
      {modules.map((module) => {
        const isHovered = hoveredModule === module.id;
        
        return (
          <g key={module.id}>
            {/* Circle outline */}
            <circle
              cx={module.cx}
              cy={cy}
              r={loopRadius}
              fill="transparent"
              stroke={isHovered ? module.color.replace(/\d+%\)$/, "70%)") : module.color}
              strokeWidth={isHovered ? "3" : "2"}
              strokeDasharray="4 2"
              className="cursor-pointer transition-all duration-300"
              filter={isHovered ? "url(#moduleHoverGlow)" : "url(#tripleLoopGlow)"}
              onClick={() => onModuleClick(module.id)}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
              style={{
                opacity: isHovered ? 1 : 0.85,
              }}
            />
            
            {/* Module label in center */}
            <text
              x={module.cx}
              y={cy + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isHovered ? module.color.replace(/\d+%\)$/, "80%)") : "hsl(210 40% 90%)"}
              fontSize="9"
              fontWeight="600"
              fontFamily="'Space Grotesk', sans-serif"
              letterSpacing="0.05em"
              className="uppercase cursor-pointer pointer-events-none select-none transition-all duration-300"
              style={{
                textShadow: isHovered ? `0 0 10px ${module.color}` : "none"
              }}
            >
              {module.label}
            </text>
          </g>
        );
      })}

      {/* Connection overlaps (the intersections between circles) */}
      <ellipse
        cx={110}
        cy={cy}
        rx="8"
        ry="20"
        fill="hsl(179 77% 45% / 0.3)"
        className="pointer-events-none"
      />
      <ellipse
        cx={190}
        cy={cy}
        rx="8"
        ry="20"
        fill="hsl(166 75% 47% / 0.3)"
        className="pointer-events-none"
      />

      {/* Single animated dot flowing through the infinity path */}
      <circle r="4" fill="hsl(50 95% 70%)" filter="url(#dotGlow)">
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path={flowPath}
        />
      </circle>
    </svg>
  );
};

export default TripleLoop;
