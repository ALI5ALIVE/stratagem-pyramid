import { useState } from "react";

interface AIAcceleratorProps {
  onNodeClick?: (node: string) => void;
}

const AIAccelerator = ({ onNodeClick }: AIAcceleratorProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const centerX = 80;
  const centerY = 45;
  const nodeDistance = 32;

  const nodes = [
    { id: "detect", label: "Detect", angle: -120 },
    { id: "human", label: "Human", angle: -60 },
    { id: "execute", label: "Execute", angle: 0 },
  ];

  return (
    <svg
      viewBox="0 0 160 80"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      style={{
        filter: "drop-shadow(0 0 8px hsl(45 93% 58% / 0.6))"
      }}
    >
      <defs>
        <linearGradient id="aiGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(45 95% 55%)" />
          <stop offset="50%" stopColor="hsl(45 95% 70%)" />
          <stop offset="100%" stopColor="hsl(40 92% 60%)" />
        </linearGradient>

        <filter id="aiCoreGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="hsl(45 95% 65%)" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="hsl(45 95% 70%)" floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
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
              strokeWidth={isHovered ? "1.5" : "1"}
              strokeOpacity={isHovered ? 1 : 0.7}
              className="transition-all duration-300"
            />
            
            {/* Animated pulse dot */}
            <circle r="2" fill="hsl(45 93% 75%)" opacity="0.8">
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
        <polygon
          points={`
            ${centerX},${centerY - 14}
            ${centerX + 12},${centerY - 7}
            ${centerX + 12},${centerY + 7}
            ${centerX},${centerY + 14}
            ${centerX - 12},${centerY + 7}
            ${centerX - 12},${centerY - 7}
          `}
          fill="url(#aiGoldGradient)"
          stroke="hsl(45 95% 75%)"
          strokeWidth="1.5"
          className="cursor-pointer"
          onClick={() => onNodeClick?.("ai-core")}
        />
        
        <text
          x={centerX}
          y={centerY + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(45 30% 15%)"
          fontSize="10"
          fontWeight="800"
          fontFamily="'Space Grotesk', sans-serif"
          className="pointer-events-none select-none"
        >
          AI
        </text>

        <circle
          cx={centerX}
          cy={centerY}
          r="20"
          fill="none"
          stroke="hsl(45 95% 65%)"
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
            <circle
              cx={nodeX}
              cy={nodeY}
              r={isHuman ? "8" : "7"}
              fill={isHuman ? "hsl(210 40% 25%)" : "hsl(45 95% 55%)"}
              stroke={isHovered ? "hsl(45 95% 80%)" : "hsl(45 95% 65%)"}
              strokeWidth={isHovered ? "2" : "1.5"}
              filter={isHovered ? "url(#nodeGlow)" : undefined}
              className="transition-all duration-300"
            />

            {isHuman && (
              <g fill="hsl(45 93% 70%)" className="pointer-events-none">
                <circle cx={nodeX} cy={nodeY - 2} r="1.5" />
                <path
                  d={`M ${nodeX - 3} ${nodeY + 4} L ${nodeX} ${nodeY + 1} L ${nodeX + 3} ${nodeY + 4}`}
                  stroke="hsl(45 93% 70%)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </g>
            )}

            <text
              x={nodeX}
              y={nodeY + (node.angle < -60 ? -12 : 16)}
              textAnchor="middle"
              fill={isHovered ? "hsl(45 95% 92%)" : "hsl(45 90% 85%)"}
              fontSize="7"
              fontWeight="700"
              fontFamily="'Space Grotesk', sans-serif"
              letterSpacing="0.03em"
              className="pointer-events-none select-none uppercase"
              stroke="hsl(45 30% 10%)"
              strokeWidth="2"
              paintOrder="stroke fill"
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
