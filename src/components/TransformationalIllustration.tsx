import { useState } from "react";

interface TransformationalIllustrationProps {
  onNodeClick?: (node: string) => void;
}

const TransformationalIllustration = ({ onNodeClick }: TransformationalIllustrationProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 260 50"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ filter: "drop-shadow(0 2px 8px rgba(234, 179, 8, 0.3))" }}
    >
      <defs>
        {/* Golden glow filter */}
        <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(45, 93%, 47%)" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Opportunity star glow */}
        <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="hsl(45, 100%, 60%)" floodOpacity="0.7" />
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
          cx="40"
          cy="22"
          r={hoveredNode === "human" ? 16 : 14}
          fill="url(#humanGradient)"
          stroke="hsl(220, 60%, 70%)"
          strokeWidth="1.5"
          style={{ filter: hoveredNode === "human" ? "url(#goldGlow)" : "none" }}
          className="transition-all duration-200"
        />
        <text
          x="40"
          y="25"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          className="pointer-events-none select-none"
        >
          👤
        </text>
        <text
          x="40"
          y="44"
          textAnchor="middle"
          fill="hsl(45, 90%, 70%)"
          fontSize="8"
          fontWeight="600"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.06em"
          className="uppercase pointer-events-none select-none"
        >
          Human
        </text>
      </g>

      {/* Plus Sign */}
      <text
        x="80"
        y="24"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="hsl(45, 100%, 65%)"
        fontSize="20"
        fontWeight="bold"
        fontFamily="'Space Grotesk', sans-serif"
        className="pointer-events-none select-none animate-pulse-glow"
      >
        +
      </text>

      {/* AI Section */}
      <g
        className="cursor-pointer"
        onClick={() => onNodeClick?.("ai")}
        onMouseEnter={() => setHoveredNode("ai")}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <circle
          cx="125"
          cy="22"
          r={hoveredNode === "ai" ? 16 : 14}
          fill="url(#aiGradient)"
          stroke="hsl(280, 60%, 70%)"
          strokeWidth="1.5"
          style={{ filter: hoveredNode === "ai" ? "url(#goldGlow)" : "none" }}
          className="transition-all duration-200"
        />
        <text
          x="125"
          y="25"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          className="pointer-events-none select-none"
        >
          🤖
        </text>
        <text
          x="125"
          y="44"
          textAnchor="middle"
          fill="hsl(45, 90%, 70%)"
          fontSize="8"
          fontWeight="600"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.06em"
          className="uppercase pointer-events-none select-none"
        >
          AI
        </text>
      </g>

      {/* Equals Sign */}
      <text
        x="165"
        y="24"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="hsl(45, 100%, 65%)"
        fontSize="20"
        fontWeight="bold"
        fontFamily="'Space Grotesk', sans-serif"
        className="pointer-events-none select-none animate-pulse-glow"
      >
        =
      </text>

      {/* OPPORTUNITY Section */}
      <g
        className="cursor-pointer"
        onClick={() => onNodeClick?.("opportunity")}
        onMouseEnter={() => setHoveredNode("opportunity")}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <circle
          cx="215"
          cy="22"
          r={hoveredNode === "opportunity" ? 18 : 16}
          fill="url(#opportunityGradient)"
          stroke="hsl(45, 100%, 70%)"
          strokeWidth="2"
          style={{ filter: "url(#starGlow)" }}
          className="transition-all duration-200"
        />
        <text
          x="215"
          y="25"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          className="pointer-events-none select-none"
        >
          ⭐
        </text>
        <text
          x="215"
          y="44"
          textAnchor="middle"
          fill="hsl(45, 100%, 70%)"
          fontSize="7"
          fontWeight="700"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.03em"
          className="uppercase pointer-events-none select-none"
        >
          Opportunity
        </text>
      </g>

      {/* Energy flow lines */}
      <line x1="56" y1="22" x2="109" y2="22" stroke="hsl(45, 80%, 55%)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
      <line x1="141" y1="22" x2="197" y2="22" stroke="hsl(45, 100%, 60%)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
    </svg>
  );
};

export default TransformationalIllustration;
