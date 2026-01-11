import { useState } from "react";

interface FragmentationIllustrationProps {
  onNodeClick?: (node: string) => void;
}

const FragmentationIllustration = ({ onNodeClick }: FragmentationIllustrationProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = [
    { id: "docs", label: "Docs", x: 60, y: 38, icon: "📄" },
    { id: "training", label: "LMS", x: 150, y: 28, icon: "🎓" },
    { id: "safety", label: "Safety", x: 340, y: 35, icon: "⚠️" },
    { id: "audit", label: "Audit", x: 245, y: 45, icon: "📋" },
    { id: "comms", label: "Comms", x: 200, y: 28, icon: "📧" },
  ];

  // Broken connection lines (dashed, not connecting properly) - spread across width
  const brokenLines = [
    { x1: 80, y1: 38, x2: 130, y2: 30 },
    { x1: 170, y1: 32, x2: 220, y2: 30 },
    { x1: 220, y1: 32, x2: 265, y2: 42 },
    { x1: 265, y1: 48, x2: 320, y2: 38 },
    { x1: 80, y1: 45, x2: 130, y2: 50 },
    { x1: 170, y1: 35, x2: 225, y2: 40 },
  ];

  return (
    <svg
      viewBox="0 0 400 90"
      className="w-full h-full"
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
              r={isHovered ? 20 : 18}
              fill="hsl(222, 47%, 12%)"
              stroke={isHovered ? "hsl(0, 70%, 55%)" : "hsl(0, 50%, 40%)"}
              strokeWidth={isHovered ? 2.5 : 2}
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
              fontSize="16"
              className="pointer-events-none select-none"
            >
              {node.icon}
            </text>

            {/* Label below node */}
            <text
              x={node.x}
              y={node.y + 30}
              textAnchor="middle"
              fill={isHovered ? "hsl(0, 70%, 65%)" : "hsl(0, 40%, 60%)"}
              fontSize="10"
              fontWeight="600"
              fontFamily="'Space Grotesk', sans-serif"
              className="pointer-events-none select-none uppercase"
              letterSpacing="0.05em"
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {/* Warning indicators scattered across width */}
      {[
        { x: 110, y: 50 },
        { x: 190, y: 55 },
        { x: 290, y: 52 },
        { x: 160, y: 65 },
        { x: 250, y: 68 },
      ].map((pos, index) => (
        <g key={`warning-${index}`} className="animate-pulse-glow">
          <circle
            cx={pos.x}
            cy={pos.y}
            r="6"
            fill="hsl(25, 90%, 50%)"
            style={{ filter: "url(#warningPulse)" }}
          />
          <text
            x={pos.x}
            y={pos.y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="8"
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
