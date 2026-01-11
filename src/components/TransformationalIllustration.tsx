import { useState } from "react";

interface TransformationalIllustrationProps {
  onNodeClick?: (node: string) => void;
}

const TransformationalIllustration = ({ onNodeClick }: TransformationalIllustrationProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 300 75"
      className="w-full h-auto"
      style={{ filter: "drop-shadow(0 2px 12px rgba(234, 179, 8, 0.4))", minWidth: "100%" }}
    >
      <defs>
        {/* Golden glow filter */}
        <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="hsl(45, 93%, 47%)" floodOpacity="0.7" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Opportunity star glow */}
        <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feFlood floodColor="hsl(45, 100%, 60%)" floodOpacity="0.8" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for human */}
        <linearGradient id="humanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(220, 70%, 60%)" />
          <stop offset="100%" stopColor="hsl(200, 70%, 50%)" />
        </linearGradient>

        {/* Gradient for AI */}
        <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(280, 70%, 60%)" />
          <stop offset="100%" stopColor="hsl(260, 70%, 50%)" />
        </linearGradient>

        {/* Gradient for Opportunity */}
        <linearGradient id="opportunityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(45, 100%, 60%)" />
          <stop offset="100%" stopColor="hsl(35, 100%, 50%)" />
        </linearGradient>
      </defs>

      {/* HUMAN Section */}
      <g
        className="cursor-pointer"
        onClick={() => onNodeClick?.("human")}
        onMouseEnter={() => setHoveredNode("human")}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <circle
          cx="50"
          cy="32"
          r={hoveredNode === "human" ? 20 : 18}
          fill="url(#humanGradient)"
          stroke="hsl(220, 60%, 70%)"
          strokeWidth="2"
          style={{ filter: hoveredNode === "human" ? "url(#goldGlow)" : "none" }}
          className="transition-all duration-200"
        />
        {/* Human icon */}
        <text
          x="50"
          y="36"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          className="pointer-events-none select-none"
        >
          👤
        </text>
        <text
          x="50"
          y="60"
          textAnchor="middle"
          fill="hsl(45, 90%, 70%)"
          fontSize="10"
          fontWeight="600"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.08em"
          className="uppercase pointer-events-none select-none"
        >
          Human
        </text>
      </g>

      {/* Plus Sign */}
      <g className="animate-pulse-glow">
        <text
          x="95"
          y="36"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(45, 100%, 65%)"
          fontSize="26"
          fontWeight="bold"
          fontFamily="'Space Grotesk', sans-serif"
          className="pointer-events-none select-none"
        >
          +
        </text>
      </g>

      {/* AI Section */}
      <g
        className="cursor-pointer"
        onClick={() => onNodeClick?.("ai")}
        onMouseEnter={() => setHoveredNode("ai")}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <circle
          cx="145"
          cy="32"
          r={hoveredNode === "ai" ? 20 : 18}
          fill="url(#aiGradient)"
          stroke="hsl(280, 60%, 70%)"
          strokeWidth="2"
          style={{ filter: hoveredNode === "ai" ? "url(#goldGlow)" : "none" }}
          className="transition-all duration-200"
        />
        {/* AI icon */}
        <text
          x="145"
          y="36"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          className="pointer-events-none select-none"
        >
          🤖
        </text>
        <text
          x="145"
          y="60"
          textAnchor="middle"
          fill="hsl(45, 90%, 70%)"
          fontSize="10"
          fontWeight="600"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.08em"
          className="uppercase pointer-events-none select-none"
        >
          AI
        </text>
      </g>

      {/* Equals Sign */}
      <g className="animate-pulse-glow">
        <text
          x="190"
          y="36"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(45, 100%, 65%)"
          fontSize="26"
          fontWeight="bold"
          fontFamily="'Space Grotesk', sans-serif"
          className="pointer-events-none select-none"
        >
          =
        </text>
      </g>

      {/* OPPORTUNITY Section */}
      <g
        className="cursor-pointer"
        onClick={() => onNodeClick?.("opportunity")}
        onMouseEnter={() => setHoveredNode("opportunity")}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <circle
          cx="245"
          cy="32"
          r={hoveredNode === "opportunity" ? 22 : 20}
          fill="url(#opportunityGradient)"
          stroke="hsl(45, 100%, 70%)"
          strokeWidth="2.5"
          style={{ filter: "url(#starGlow)" }}
          className="transition-all duration-200"
        />
        {/* Star icon */}
        <text
          x="245"
          y="36"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="22"
          className="pointer-events-none select-none"
        >
          ⭐
        </text>
        <text
          x="245"
          y="60"
          textAnchor="middle"
          fill="hsl(45, 100%, 70%)"
          fontSize="9"
          fontWeight="700"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.04em"
          className="uppercase pointer-events-none select-none"
        >
          Opportunity
        </text>
      </g>

      {/* Energy flow line from Human to AI */}
      <line
        x1="70"
        y1="32"
        x2="125"
        y2="32"
        stroke="hsl(45, 80%, 55%)"
        strokeWidth="2"
        strokeDasharray="4 3"
        className="animate-pulse-glow"
        opacity="0.6"
      />

      {/* Energy flow line from AI to Opportunity */}
      <line
        x1="165"
        y1="32"
        x2="223"
        y2="32"
        stroke="hsl(45, 100%, 60%)"
        strokeWidth="2"
        strokeDasharray="4 3"
        className="animate-pulse-glow"
        opacity="0.7"
      />
    </svg>
  );
};

export default TransformationalIllustration;
