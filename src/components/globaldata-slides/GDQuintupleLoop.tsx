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

  const loopRadius = 18;
  const loopSpacing = 36;
  const startX = 42;
  const cy = 28;

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
      <svg viewBox="0 0 220 70" className="w-full max-w-[220px]">
        <defs>
          <filter id="gdLoopGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="hsl(173, 80%, 40%)" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="gdLoopHoverGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="hsl(173, 80%, 50%)" floodOpacity="0.8" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="gdDotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="hsl(45, 93%, 58%)" floodOpacity="0.9" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="gdCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(173, 80%, 50%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(173, 80%, 40%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central radial glow - "One Truth" */}
        <circle cx="110" cy={cy} r="40" fill="url(#gdCenterGlow)" />

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
                stroke="hsl(173, 80%, 40%)"
                strokeWidth="2"
                strokeDasharray="4 2"
                className="cursor-pointer transition-all duration-200"
                style={{ filter: isHovered ? "url(#gdLoopHoverGlow)" : "url(#gdLoopGlow)" }}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
                onClick={() => onModuleClick?.(module.id)}
              />
              
              {/* Module label */}
              <text
                x={cx}
                y={cy + loopRadius + 12}
                textAnchor="middle"
                fill={isHovered ? "hsl(173, 80%, 60%)" : "hsl(173, 60%, 70%)"}
                fontSize="6"
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
              r="3"
              fill="hsl(45, 93%, 58%)"
              style={{ filter: "url(#gdDotGlow)" }}
              className="transition-all duration-100"
            />
          );
        })}

        {/* "Unified Taxonomy" label at bottom */}
        <text
          x="110"
          y="66"
          textAnchor="middle"
          fill="hsl(173, 70%, 65%)"
          fontSize="7"
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
