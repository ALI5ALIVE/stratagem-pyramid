import { useState } from "react";

interface FragmentationIllustrationProps {
  onNodeClick?: (node: string) => void;
}

const FragmentationIllustration = ({ onNodeClick }: FragmentationIllustrationProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = [
    { id: "docs", label: "Docs", x: 40, y: 32, icon: "📄" },
    { id: "training", label: "LMS", x: 100, y: 20, icon: "🎓" },
    { id: "safety", label: "Safety", x: 160, y: 35, icon: "⚠️" },
    { id: "audit", label: "Audit", x: 55, y: 65, icon: "📋" },
    { id: "comms", label: "Comms", x: 140, y: 68, icon: "📧" },
  ];

  // Broken connection lines (dashed, not connecting properly)
  const brokenLines = [
    { x1: 55, y1: 38, x2: 85, y2: 28 },
    { x1: 115, y1: 28, x2: 145, y2: 38 },
    { x1: 50, y1: 50, x2: 65, y2: 55 },
    { x1: 130, y1: 55, x2: 150, y2: 58 },
    { x1: 80, y1: 60, x2: 110, y2: 62 },
  ];

  return (
    <svg
      viewBox="0 0 200 85"
      className="w-full h-full max-w-[180px]"
      style={{ filter: "drop-shadow(0 2px 8px rgba(239, 68, 68, 0.3))" }}
    >
      <defs>
        {/* Warning glow filter */}
        <filter id="fragmentGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(0, 70%, 50%)" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Subtle pulse animation */}
        <filter id="warningPulse" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="hsl(25, 90%, 50%)" floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Broken connection lines */}
      {brokenLines.map((line, index) => (
        <g key={`line-${index}`}>
          <line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(0, 60%, 45%)"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            strokeOpacity="0.6"
          />
          {/* X mark in middle of broken line */}
          <text
            x={(line.x1 + line.x2) / 2}
            y={(line.y1 + line.y2) / 2 + 1}
            textAnchor="middle"
            fill="hsl(0, 70%, 55%)"
            fontSize="8"
            fontWeight="bold"
            className="animate-pulse-glow"
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
              r={isHovered ? 14 : 12}
              fill="hsl(222, 47%, 12%)"
              stroke={isHovered ? "hsl(0, 70%, 55%)" : "hsl(0, 50%, 40%)"}
              strokeWidth={isHovered ? 2 : 1.5}
              style={{
                filter: isHovered ? "url(#fragmentGlow)" : "none",
              }}
            />
            
            {/* Icon */}
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              className="pointer-events-none select-none"
            >
              {node.icon}
            </text>

            {/* Label below node */}
            <text
              x={node.x}
              y={node.y + 22}
              textAnchor="middle"
              fill={isHovered ? "hsl(0, 70%, 65%)" : "hsl(0, 40%, 60%)"}
              fontSize="7"
              fontWeight="500"
              fontFamily="'Inter', sans-serif"
              className="pointer-events-none select-none uppercase"
              letterSpacing="0.03em"
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {/* Warning indicators scattered around */}
      {[
        { x: 100, y: 45 },
        { x: 75, y: 75 },
        { x: 125, y: 78 },
      ].map((pos, index) => (
        <g key={`warning-${index}`} className="animate-pulse-glow">
          <circle
            cx={pos.x}
            cy={pos.y}
            r="4"
            fill="hsl(25, 90%, 50%)"
            style={{ filter: "url(#warningPulse)" }}
          />
          <text
            x={pos.x}
            y={pos.y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="5"
            fontWeight="bold"
          >
            !
          </text>
        </g>
      ))}

      {/* Central "FRAGMENTED" text */}
      <text
        x="100"
        y="48"
        textAnchor="middle"
        fill="hsl(0, 60%, 55%)"
        fontSize="6"
        fontWeight="600"
        fontFamily="'Space Grotesk', sans-serif"
        letterSpacing="0.15em"
        opacity="0.7"
        className="uppercase pointer-events-none select-none"
      >
        Disconnected
      </text>
    </svg>
  );
};

export default FragmentationIllustration;
