import { useState, useEffect } from "react";
import { BarChart3, ShoppingCart, TrendingUp, MessageCircle, FileSpreadsheet } from "lucide-react";

interface GDFragmentationIllustrationProps {
  onNodeClick?: (node: string) => void;
}

// Doubled x positions
const nodes = [
  { id: "nielsen", label: "Nielsen", icon: BarChart3, color: "hsl(199, 89%, 48%)", x: 50 },
  { id: "iri", label: "IRI", icon: ShoppingCart, color: "hsl(330, 80%, 55%)", x: 140 },
  { id: "mintel", label: "Mintel", icon: TrendingUp, color: "hsl(145, 70%, 45%)", x: 230 },
  { id: "social", label: "Social", icon: MessageCircle, color: "hsl(280, 65%, 55%)", x: 320 },
  { id: "internal", label: "Internal", icon: FileSpreadsheet, color: "hsl(30, 90%, 55%)", x: 410 },
];

const brokenConnections = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
];

const GDFragmentationIllustration = ({ onNodeClick }: GDFragmentationIllustrationProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [warningPulse, setWarningPulse] = useState(0);

  // Animate warning pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setWarningPulse(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Doubled dimensions
  const cy = 64;
  const nodeRadius = 28;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 460 140" className="w-full max-w-[460px]">
        <defs>
          <filter id="gdFragmentGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="hsl(0, 70%, 50%)" floodOpacity="0.4" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="gdNodeHoverGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feFlood floodColor="hsl(0, 70%, 55%)" floodOpacity="0.7" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="gdWarningPulse" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="hsl(30, 90%, 55%)" floodOpacity="0.8" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Node gradients */}
          {nodes.map((node) => (
            <linearGradient key={node.id} id={`gdNode-${node.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={node.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={node.color} stopOpacity="0.5" />
            </linearGradient>
          ))}
        </defs>

        {/* Broken connection lines with × marks */}
        {brokenConnections.map((conn, index) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          const midX = (fromNode.x + toNode.x) / 2;

          return (
            <g key={`conn-${index}`}>
              {/* Left segment */}
              <line
                x1={fromNode.x + nodeRadius}
                y1={cy}
                x2={midX - 12}
                y2={cy}
                stroke="hsl(0, 70%, 45%)"
                strokeWidth="3"
                strokeDasharray="8 4"
                strokeOpacity="0.6"
              />
              {/* Right segment */}
              <line
                x1={midX + 12}
                y1={cy}
                x2={toNode.x - nodeRadius}
                y2={cy}
                stroke="hsl(0, 70%, 45%)"
                strokeWidth="3"
                strokeDasharray="8 4"
                strokeOpacity="0.6"
              />
              {/* × break mark */}
              <text
                x={midX}
                y={cy + 8}
                textAnchor="middle"
                fill="hsl(0, 70%, 55%)"
                fontSize="20"
                fontWeight="bold"
              >
                ×
              </text>
            </g>
          );
        })}

        {/* Warning indicators with ≠ symbol */}
        {[95, 275].map((x, index) => {
          const pulseOpacity = 0.4 + 0.3 * Math.sin((warningPulse + index * 50) * 0.1);
          
          return (
            <g key={`warning-${index}`} style={{ filter: "url(#gdWarningPulse)" }}>
              <circle
                cx={x}
                cy={cy - 36}
                r="14"
                fill="hsl(30, 90%, 55%)"
                fillOpacity={pulseOpacity}
                stroke="hsl(30, 90%, 55%)"
                strokeWidth="2"
              />
              <text
                x={x}
                y={cy - 28}
                textAnchor="middle"
                fill="white"
                fontSize="16"
                fontWeight="bold"
              >
                ≠
              </text>
            </g>
          );
        })}

        {/* Data source nodes */}
        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const IconComponent = node.icon;

          return (
            <g
              key={node.id}
              className="cursor-pointer"
              onClick={() => onNodeClick?.(node.id)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ 
                filter: isHovered ? "url(#gdNodeHoverGlow)" : "url(#gdFragmentGlow)",
                transform: isHovered ? `scale(1.1)` : "scale(1)",
                transformOrigin: `${node.x}px ${cy}px`,
                transition: "transform 0.2s ease",
              }}
            >
              <circle
                cx={node.x}
                cy={cy}
                r={nodeRadius}
                fill={`url(#gdNode-${node.id})`}
                stroke={node.color}
                strokeWidth="4"
              />
              
              {/* Icon */}
              <foreignObject x={node.x - 14} y={cy - 14} width="28" height="28">
                <div className="w-full h-full flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </foreignObject>
              
              {/* Label */}
              <text
                x={node.x}
                y={cy + nodeRadius + 18}
                textAnchor="middle"
                fill={isHovered ? node.color : "hsl(0, 40%, 70%)"}
                fontSize="12"
                fontWeight="500"
                fontFamily="'Inter', sans-serif"
                className="transition-colors duration-200"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* "Different Taxonomy" label */}
        <text
          x="230"
          y="132"
          textAnchor="middle"
          fill="hsl(0, 50%, 60%)"
          fontSize="12"
          fontWeight="500"
          fontFamily="'Inter', sans-serif"
          fontStyle="italic"
        >
          Different Taxonomies
        </text>
      </svg>
    </div>
  );
};

export default GDFragmentationIllustration;
