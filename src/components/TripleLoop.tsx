import { useState } from "react";
import { Shield, FileText, GraduationCap } from "lucide-react";

interface TripleLoopProps {
  onModuleClick: (module: string) => void;
  scale?: number;
}

const TripleLoop = ({ onModuleClick, scale = 1 }: TripleLoopProps) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const modules = [
    { id: "safety", label: "Safety", icon: Shield, cx: 70 },
    { id: "content", label: "Content", icon: FileText, cx: 150 },
    { id: "training", label: "Training", icon: GraduationCap, cx: 230 },
  ];

  const loopRadius = 35;
  const cy = 50;

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
      </defs>

      {/* Three interlocking circles */}
      {modules.map((module, index) => {
        const isHovered = hoveredModule === module.id;
        
        return (
          <g key={module.id}>
            {/* Circle outline */}
            <circle
              cx={module.cx}
              cy={cy}
              r={loopRadius}
              fill="transparent"
              stroke={isHovered ? "hsl(173 80% 60%)" : "hsl(173 80% 45%)"}
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
              fill={isHovered ? "hsl(173 80% 70%)" : "hsl(210 40% 90%)"}
              fontSize="9"
              fontWeight="600"
              fontFamily="'Space Grotesk', sans-serif"
              letterSpacing="0.05em"
              className="uppercase cursor-pointer pointer-events-none select-none transition-all duration-300"
              style={{
                textShadow: isHovered ? "0 0 10px hsl(173 80% 50%)" : "none"
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
        fill="hsl(173 80% 45% / 0.3)"
        className="pointer-events-none"
      />
      <ellipse
        cx={190}
        cy={cy}
        rx="8"
        ry="20"
        fill="hsl(173 80% 45% / 0.3)"
        className="pointer-events-none"
      />

      {/* Animated flowing dots through all 3 loops */}
      <circle r="3" fill="hsl(173 80% 60%)">
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path={`
            M ${modules[0].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[0].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[1].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[1].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[2].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[2].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[1].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[1].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[0].cx} ${cy - loopRadius}
          `}
        />
      </circle>
      <circle r="3" fill="hsl(199 89% 55%)">
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          begin="2s"
          path={`
            M ${modules[0].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[0].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[1].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[1].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[2].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[2].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[1].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[1].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[0].cx} ${cy - loopRadius}
          `}
        />
      </circle>
      <circle r="3" fill="hsl(173 80% 70%)">
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          begin="4s"
          path={`
            M ${modules[0].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[0].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[1].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[1].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[2].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[2].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[1].cx} ${cy + loopRadius}
            A ${loopRadius} ${loopRadius} 0 1 1 ${modules[1].cx} ${cy - loopRadius}
            A ${loopRadius} ${loopRadius} 0 0 0 ${modules[0].cx} ${cy - loopRadius}
          `}
        />
      </circle>
    </svg>
  );
};

export default TripleLoop;
