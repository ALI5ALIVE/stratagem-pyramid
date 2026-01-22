import { useState, useEffect } from "react";

interface GDQuintupleLoopProps {
  onModuleClick?: (module: string) => void;
}

const modules = [
  { id: "market", label: "Market" },
  { id: "innovation", label: "Innovation" },
  { id: "consumer", label: "Consumer" },
  { id: "competitive", label: "Competitive" },
  { id: "commercial", label: "Commercial" },
];

const GDQuintupleLoop = ({ onModuleClick }: GDQuintupleLoopProps) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [dotPositions, setDotPositions] = useState([0, 120, 240]);

  // Animate dots flowing through the loops
  useEffect(() => {
    const interval = setInterval(() => {
      setDotPositions(prev => prev.map(pos => (pos + 2) % 360));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Enlarged dimensions for Stage 3
  const loopRadius = 50;
  const loopSpacing = 100;
  const startX = 100;
  const cy = 75;

  // Calculate dot position on the combined loop path
  const getDotPosition = (angle: number, loopIndex: number) => {
    const cx = startX + loopIndex * loopSpacing;
    const radians = (angle * Math.PI) / 180;
    return {
      x: cx + Math.cos(radians) * loopRadius,
      y: cy + Math.sin(radians) * loopRadius,
    };
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 600 180" className="w-full max-w-[600px]">
        <defs>
          <filter id="gdLoopGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="hsl(217, 100%, 50%)" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="gdLoopHoverGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feFlood floodColor="hsl(217, 100%, 60%)" floodOpacity="0.8" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="gdDotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="hsl(45, 93%, 58%)" floodOpacity="0.9" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="gdCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(217, 100%, 60%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(217, 100%, 50%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central radial glow - "One Truth" */}
        <circle cx="300" cy={cy} r="110" fill="url(#gdCenterGlow)" />

        {/* 5 interlocking circles */}
        {modules.map((module, index) => {
          const cx = startX + index * loopSpacing;
          const isHovered = hoveredModule === module.id;

          return (
            <g key={module.id}>
              <circle
                cx={cx}
                cy={cy}
                r={loopRadius}
                fill="transparent"
                stroke="hsl(217, 100%, 50%)"
                strokeWidth="4"
                strokeDasharray="8 4"
                className="cursor-pointer transition-all duration-200"
                style={{ filter: isHovered ? "url(#gdLoopHoverGlow)" : "url(#gdLoopGlow)" }}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
                onClick={() => onModuleClick?.(module.id)}
              />
              
              {/* Module label */}
              <text
                x={cx}
                y={cy + loopRadius + 28}
                textAnchor="middle"
                fill={isHovered ? "hsl(173, 80%, 20%)" : "black"}
                fontSize="16"
                fontWeight="500"
                fontFamily="'Inter', sans-serif"
                className="pointer-events-none select-none transition-colors duration-200"
              >
                {module.label.slice(0, 4)}
              </text>
            </g>
          );
        })}

        {/* Animated flowing dots */}
        {dotPositions.map((baseAngle, dotIndex) => {
          // Each dot cycles through all 5 loops
          const totalAngle = baseAngle + dotIndex * 72; // Offset each dot
          const currentLoop = Math.floor((totalAngle % 1800) / 360) % 5;
          const angleInLoop = totalAngle % 360;
          const pos = getDotPosition(angleInLoop, currentLoop);

          return (
            <circle
              key={dotIndex}
              cx={pos.x}
              cy={pos.y}
              r="8"
              fill="hsl(45, 93%, 58%)"
              style={{ filter: "url(#gdDotGlow)" }}
              className="transition-all duration-100"
            />
          );
        })}

        {/* "Unified Taxonomy" label at bottom */}
        <text
          x="300"
          y="170"
          textAnchor="middle"
          fill="black"
          fontSize="18"
          fontWeight="600"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.05em"
        >
          Unified Taxonomy
        </text>
      </svg>
    </div>
  );
};

export default GDQuintupleLoop;
