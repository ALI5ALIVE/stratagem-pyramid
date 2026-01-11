import { useState } from "react";

interface FragmentationIllustrationProps {
  onNodeClick?: (node: string) => void;
}

const FragmentationIllustration = ({ onNodeClick }: FragmentationIllustrationProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Evenly spread nodes across the full width
  const nodes = [
    { id: "docs", label: "Docs", x: 55, y: 40, icon: "📄" },
    { id: "training", label: "LMS", x: 135, y: 40, icon: "🎓" },
    { id: "comms", label: "Comms", x: 215, y: 40, icon: "📧" },
    { id: "audit", label: "Audit", x: 295, y: 40, icon: "📋" },
    { id: "safety", label: "Safety", x: 375, y: 40, icon: "⚠️" },
  ];

  // Broken connection lines between nodes
  const brokenLines = [
    { x1: 80, y1: 40, x2: 110, y2: 40 },
    { x1: 160, y1: 40, x2: 190, y2: 40 },
    { x1: 240, y1: 40, x2: 270, y2: 40 },
    { x1: 320, y1: 40, x2: 350, y2: 40 },
  ];

  return (
    <svg
      viewBox="0 0 430 100"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))" }}
    >
      <defs>
        {/* Warning glow filter */}
        <filter id="fragmentGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="hsl(0, 80%, 55%)" floodOpacity="0.7" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Subtle pulse animation */}
        <filter id="warningPulse" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feFlood floodColor="hsl(30, 100%, 55%)" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Node gradient - dark for contrast against red */}
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(222, 47%, 16%)" />
          <stop offset="100%" stopColor="hsl(222, 47%, 10%)" />
        </linearGradient>
      </defs>

      {/* Broken connection lines with X marks */}
      {brokenLines.map((line, index) => (
        <g key={`line-${index}`}>
          <line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(0, 70%, 50%)"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            strokeOpacity="0.7"
          />
          {/* X mark in middle of broken line */}
          <text
            x={(line.x1 + line.x2) / 2}
            y={line.y1 + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="hsl(0, 80%, 60%)"
            fontSize="14"
            fontWeight="bold"
          >
            ×
          </text>
        </g>
      ))}

      {/* Scattered tool nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id;
        
        return (
          <g
            key={node.id}
            className="cursor-pointer transition-all duration-200"
            onClick={() => onNodeClick?.(node.id)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transformOrigin: `${node.x}px ${node.y}px`,
            }}
          >
            {/* Node background circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isHovered ? 26 : 24}
              fill="url(#nodeGradient)"
              stroke={isHovered ? "hsl(0, 80%, 60%)" : "hsl(0, 60%, 50%)"}
              strokeWidth={isHovered ? 3 : 2.5}
              style={{
                filter: isHovered ? "url(#fragmentGlow)" : "none",
              }}
            />
            
            {/* Icon */}
            <text
              x={node.x}
              y={node.y + 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="22"
              className="pointer-events-none select-none"
            >
              {node.icon}
            </text>

            {/* Label below node */}
            <text
              x={node.x}
              y={node.y + 38}
              textAnchor="middle"
              fill={isHovered ? "hsl(0, 0%, 95%)" : "hsl(0, 0%, 85%)"}
              fontSize="12"
              fontWeight="600"
              fontFamily="'Space Grotesk', sans-serif"
              className="pointer-events-none select-none uppercase"
              letterSpacing="0.05em"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {/* Warning indicators between nodes */}
      {[
        { x: 95, y: 55 },
        { x: 175, y: 55 },
        { x: 255, y: 55 },
        { x: 335, y: 55 },
      ].map((pos, index) => (
        <g key={`warning-${index}`}>
          <circle
            cx={pos.x}
            cy={pos.y}
            r="8"
            fill="hsl(30, 100%, 55%)"
            style={{ filter: "url(#warningPulse)" }}
          >
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="2s"
              repeatCount="indefinite"
              begin={`${index * 0.5}s`}
            />
          </circle>
          <text
            x={pos.x}
            y={pos.y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="hsl(0, 0%, 100%)"
            fontSize="11"
            fontWeight="bold"
          >
            !
          </text>
        </g>
      ))}
    </svg>
  );
};

export default FragmentationIllustration;
