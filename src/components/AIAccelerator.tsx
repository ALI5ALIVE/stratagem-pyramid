import { useState } from "react";

interface AIAcceleratorProps {
  onNodeClick?: (node: string) => void;
}

const AIAccelerator = ({ onNodeClick }: AIAcceleratorProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const centerX = 100;
  const centerY = 40;
  const nodeDistance = 32;

  const nodes = [
    { id: "detect", label: "Detect", angle: -120, icon: "eye" },
    { id: "human", label: "Human", angle: -60, icon: "user" },
    { id: "execute", label: "Execute", angle: 0, icon: "zap" },
  ];

  return (
    <svg
      viewBox="0 0 200 70"
      className="w-full h-full"
      style={{
        filter: "drop-shadow(0 0 8px hsl(45 93% 58% / 0.4))"
      }}
    >
      <defs>
        {/* Gold gradient */}
        <linearGradient id="aiGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(45 93% 50%)" />
          <stop offset="50%" stopColor="hsl(45 93% 65%)" />
          <stop offset="100%" stopColor="hsl(40 90% 55%)" />
        </linearGradient>

        {/* Center AI glow */}
        <filter id="aiCoreGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(45 93% 58%)" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Node glow */}
        <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="hsl(45 93% 65%)" floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Pulse animation */}
        <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines from center to nodes */}
      {nodes.map((node, index) => {
        const nodeX = centerX + nodeDistance * Math.cos((node.angle * Math.PI) / 180);
        const nodeY = centerY + nodeDistance * Math.sin((node.angle * Math.PI) / 180);
        const isHovered = hoveredNode === node.id;

        return (
          <g key={`line-${node.id}`}>
            <line
              x1={centerX}
              y1={centerY}
              x2={nodeX}
              y2={nodeY}
              stroke={isHovered ? "hsl(45 93% 70%)" : "hsl(45 93% 55%)"}
              strokeWidth={isHovered ? "2" : "1.5"}
              strokeOpacity={isHovered ? 1 : 0.7}
              className="transition-all duration-300"
            />
            
            {/* Animated pulse dot traveling along line */}
            <circle r="2.5" fill="hsl(45 93% 75%)" filter="url(#pulseGlow)">
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                begin={`${index * 0.6}s`}
                path={`M ${centerX} ${centerY} L ${nodeX} ${nodeY}`}
              />
            </circle>
          </g>
        );
      })}

      {/* Central AI chip */}
      <g filter="url(#aiCoreGlow)">
        {/* Hexagon shape for AI core */}
        <polygon
          points={`
            ${centerX},${centerY - 12}
            ${centerX + 10},${centerY - 6}
            ${centerX + 10},${centerY + 6}
            ${centerX},${centerY + 12}
            ${centerX - 10},${centerY + 6}
            ${centerX - 10},${centerY - 6}
          `}
          fill="url(#aiGoldGradient)"
          stroke="hsl(45 93% 70%)"
          strokeWidth="1"
          className="cursor-pointer"
          onClick={() => onNodeClick?.("ai-core")}
        />
        
        {/* AI label inside */}
        <text
          x={centerX}
          y={centerY + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(45 30% 15%)"
          fontSize="7"
          fontWeight="700"
          fontFamily="'Space Grotesk', sans-serif"
          className="pointer-events-none select-none"
        >
          AI
        </text>

        {/* Rotating ring around core */}
        <circle
          cx={centerX}
          cy={centerY}
          r="16"
          fill="none"
          stroke="hsl(45 93% 60%)"
          strokeWidth="1"
          strokeDasharray="8 4"
          strokeOpacity="0.6"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${centerX} ${centerY}`}
            to={`360 ${centerX} ${centerY}`}
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Outer nodes */}
      {nodes.map((node) => {
        const nodeX = centerX + nodeDistance * Math.cos((node.angle * Math.PI) / 180);
        const nodeY = centerY + nodeDistance * Math.sin((node.angle * Math.PI) / 180);
        const isHovered = hoveredNode === node.id;
        const isHuman = node.id === "human";

        return (
          <g
            key={node.id}
            className="cursor-pointer"
            onClick={() => onNodeClick?.(node.id)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Node circle */}
            <circle
              cx={nodeX}
              cy={nodeY}
              r={isHuman ? "8" : "6"}
              fill={isHuman ? "hsl(210 40% 25%)" : "hsl(45 93% 50%)"}
              stroke={isHovered ? "hsl(45 93% 75%)" : "hsl(45 93% 60%)"}
              strokeWidth={isHovered ? "2" : "1.5"}
              filter={isHovered ? "url(#nodeGlow)" : "none"}
              className="transition-all duration-300"
            />

            {/* Human icon (simple person silhouette) */}
            {isHuman && (
              <g fill="hsl(45 93% 70%)" className="pointer-events-none">
                {/* Head */}
                <circle cx={nodeX} cy={nodeY - 2} r="2" />
                {/* Body */}
                <path
                  d={`M ${nodeX - 3} ${nodeY + 5} L ${nodeX} ${nodeY + 1} L ${nodeX + 3} ${nodeY + 5}`}
                  stroke="hsl(45 93% 70%)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </g>
            )}

            {/* Node label */}
            <text
              x={nodeX}
              y={nodeY + (node.angle < -60 ? -12 : 14)}
              textAnchor="middle"
              fill={isHovered ? "hsl(45 93% 80%)" : "hsl(210 40% 85%)"}
              fontSize="6"
              fontWeight="500"
              fontFamily="'Space Grotesk', sans-serif"
              letterSpacing="0.02em"
              className="pointer-events-none select-none uppercase"
              style={{
                textShadow: isHovered ? "0 0 6px hsl(45 93% 58%)" : "none"
              }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default AIAccelerator;
