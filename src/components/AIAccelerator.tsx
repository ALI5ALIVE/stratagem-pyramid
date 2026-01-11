import { useState } from "react";

interface AIAcceleratorProps {
  onNodeClick?: (node: string) => void;
}

const AIAccelerator = ({ onNodeClick }: AIAcceleratorProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const centerX = 100;
  const centerY = 50;
  const nodeDistance = 48;

  const nodes = [
    { id: "detect", label: "Detect", angle: -120, icon: "eye" },
    { id: "human", label: "Human", angle: -60, icon: "user" },
    { id: "execute", label: "Execute", angle: 0, icon: "zap" },
  ];

  return (
    <svg
      viewBox="0 0 200 100"
      className="w-full h-full max-w-[200px]"
      preserveAspectRatio="xMidYMid meet"
      style={{
        filter: "drop-shadow(0 0 15px hsl(45 93% 58% / 0.7))"
      }}
    >
      <defs>
        {/* Gold gradient - brighter */}
        <linearGradient id="aiGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(45 95% 55%)" />
          <stop offset="50%" stopColor="hsl(45 95% 70%)" />
          <stop offset="100%" stopColor="hsl(40 92% 60%)" />
        </linearGradient>

        {/* Center AI glow - stronger */}
        <filter id="aiCoreGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="hsl(45 95% 65%)" floodOpacity="0.8" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Node glow - stronger */}
        <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(45 95% 70%)" floodOpacity="0.7" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Pulse animation - brighter */}
        <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
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
        {/* Hexagon shape for AI core - larger */}
        <polygon
          points={`
            ${centerX},${centerY - 20}
            ${centerX + 18},${centerY - 10}
            ${centerX + 18},${centerY + 10}
            ${centerX},${centerY + 20}
            ${centerX - 18},${centerY + 10}
            ${centerX - 18},${centerY - 10}
          `}
          fill="url(#aiGoldGradient)"
          stroke="hsl(45 95% 75%)"
          strokeWidth="2"
          className="cursor-pointer"
          onClick={() => onNodeClick?.("ai-core")}
        />
        
        {/* AI label inside - larger */}
        <text
          x={centerX}
          y={centerY + 3}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(45 30% 15%)"
          fontSize="14"
          fontWeight="800"
          fontFamily="'Space Grotesk', sans-serif"
          className="pointer-events-none select-none"
        >
          AI
        </text>

        {/* Rotating ring around core - larger and brighter */}
        <circle
          cx={centerX}
          cy={centerY}
          r="28"
          fill="none"
          stroke="hsl(45 95% 65%)"
          strokeWidth="2"
          strokeDasharray="12 6"
          strokeOpacity="0.8"
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
            {/* Node circle - larger */}
            <circle
              cx={nodeX}
              cy={nodeY}
              r={isHuman ? "12" : "10"}
              fill={isHuman ? "hsl(210 40% 25%)" : "hsl(45 95% 55%)"}
              stroke={isHovered ? "hsl(45 95% 80%)" : "hsl(45 95% 65%)"}
              strokeWidth={isHovered ? "3" : "2"}
              filter={isHovered ? "url(#nodeGlow)" : "url(#pulseGlow)"}
              className="transition-all duration-300"
            />

            {/* Human icon (simple person silhouette) */}
            {isHuman && (
              <g fill="hsl(45 93% 70%)" className="pointer-events-none">
                {/* Head */}
                <circle cx={nodeX} cy={nodeY - 3} r="2.5" />
                {/* Body */}
                <path
                  d={`M ${nodeX - 4} ${nodeY + 6} L ${nodeX} ${nodeY + 1} L ${nodeX + 4} ${nodeY + 6}`}
                  stroke="hsl(45 93% 70%)"
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            )}

            {/* Node label - larger with outline for legibility */}
            <text
              x={nodeX}
              y={nodeY + (node.angle < -60 ? -20 : 24)}
              textAnchor="middle"
              fill={isHovered ? "hsl(45 95% 92%)" : "hsl(45 90% 85%)"}
              fontSize="11"
              fontWeight="700"
              fontFamily="'Space Grotesk', sans-serif"
              letterSpacing="0.04em"
              className="pointer-events-none select-none uppercase"
              stroke="hsl(45 30% 10%)"
              strokeWidth="3"
              paintOrder="stroke fill"
              style={{
                textShadow: "0 0 12px hsl(45 95% 60%), 0 2px 4px hsl(0 0% 0% / 0.7)"
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
