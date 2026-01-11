import { useState } from "react";

interface TransformationalIllustrationProps {
  onNodeClick?: (node: string) => void;
}

const TransformationalIllustration = ({ onNodeClick }: TransformationalIllustrationProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 300 70"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))" }}
    >
      <defs>
        {/* Deep blue gradient for Human - contrasts with yellow */}
        <linearGradient id="humanGradientContrast" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(220, 80%, 45%)" />
          <stop offset="100%" stopColor="hsl(220, 70%, 35%)" />
        </linearGradient>

        {/* Deep purple gradient for AI */}
        <linearGradient id="aiGradientContrast" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(280, 75%, 50%)" />
          <stop offset="100%" stopColor="hsl(280, 65%, 40%)" />
        </linearGradient>

        {/* Teal/green gradient for Opportunity - stands out against yellow */}
        <linearGradient id="opportunityGradientContrast" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(160, 80%, 35%)" />
          <stop offset="100%" stopColor="hsl(160, 70%, 28%)" />
        </linearGradient>

        {/* Glow filters */}
        <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(220, 80%, 50%)" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="purpleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(280, 75%, 55%)" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="tealGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="hsl(160, 80%, 45%)" floodOpacity="0.7" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Animated energy flow path from Human to AI */}
        <path id="flowPath1" d="M 65 28 Q 95 20 125 28" fill="none" />
        {/* Animated energy flow path from AI to Opportunity */}
        <path id="flowPath2" d="M 155 28 Q 190 20 225 28" fill="none" />
      </defs>

      {/* Energy flow connection lines */}
      <path 
        d="M 65 28 Q 95 22 125 28" 
        fill="none" 
        stroke="hsl(250, 60%, 50%)" 
        strokeWidth="2" 
        strokeOpacity="0.4"
      />
      <path 
        d="M 155 28 Q 190 22 225 28" 
        fill="none" 
        stroke="hsl(200, 60%, 45%)" 
        strokeWidth="2" 
        strokeOpacity="0.4"
      />

      {/* Animated particles - Human to AI */}
      {[0, 0.33, 0.66].map((offset, i) => (
        <circle key={`particle1-${i}`} r="3" fill="hsl(250, 70%, 60%)">
          <animateMotion
            dur="1.5s"
            repeatCount="indefinite"
            begin={`${offset * 1.5}s`}
          >
            <mpath href="#flowPath1" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="1.5s"
            repeatCount="indefinite"
            begin={`${offset * 1.5}s`}
          />
        </circle>
      ))}

      {/* Animated particles - AI to Opportunity */}
      {[0, 0.33, 0.66].map((offset, i) => (
        <circle key={`particle2-${i}`} r="3.5" fill="hsl(170, 70%, 50%)">
          <animateMotion
            dur="1.5s"
            repeatCount="indefinite"
            begin={`${offset * 1.5}s`}
          >
            <mpath href="#flowPath2" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="1.5s"
            repeatCount="indefinite"
            begin={`${offset * 1.5}s`}
          />
        </circle>
      ))}

      {/* HUMAN Section */}
      <g
        className="cursor-pointer"
        onClick={() => onNodeClick?.("human")}
        onMouseEnter={() => setHoveredNode("human")}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <circle
          cx="45"
          cy="28"
          r={hoveredNode === "human" ? 22 : 20}
          fill="url(#humanGradientContrast)"
          stroke="hsl(220, 60%, 60%)"
          strokeWidth="2"
          style={{ filter: hoveredNode === "human" ? "url(#blueGlow)" : "none" }}
          className="transition-all duration-200"
        />
        <text
          x="45"
          y="32"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          className="pointer-events-none select-none"
        >
          👤
        </text>
        <text
          x="45"
          y="56"
          textAnchor="middle"
          fill="hsl(220, 30%, 20%)"
          fontSize="10"
          fontWeight="700"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.06em"
          className="uppercase pointer-events-none select-none"
          style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
        >
          Human
        </text>
      </g>

      {/* Plus Sign */}
      <text
        x="95"
        y="30"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="hsl(220, 30%, 25%)"
        fontSize="24"
        fontWeight="bold"
        fontFamily="'Space Grotesk', sans-serif"
        className="pointer-events-none select-none"
        style={{ textShadow: "0 1px 2px rgba(255,255,255,0.6)" }}
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
          cx="140"
          cy="28"
          r={hoveredNode === "ai" ? 22 : 20}
          fill="url(#aiGradientContrast)"
          stroke="hsl(280, 60%, 60%)"
          strokeWidth="2"
          style={{ filter: hoveredNode === "ai" ? "url(#purpleGlow)" : "none" }}
          className="transition-all duration-200"
        />
        <text
          x="140"
          y="32"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          className="pointer-events-none select-none"
        >
          🤖
        </text>
        <text
          x="140"
          y="56"
          textAnchor="middle"
          fill="hsl(280, 30%, 25%)"
          fontSize="10"
          fontWeight="700"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.06em"
          className="uppercase pointer-events-none select-none"
          style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
        >
          AI
        </text>
      </g>

      {/* Equals Sign */}
      <text
        x="190"
        y="30"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="hsl(220, 30%, 25%)"
        fontSize="24"
        fontWeight="bold"
        fontFamily="'Space Grotesk', sans-serif"
        className="pointer-events-none select-none"
        style={{ textShadow: "0 1px 2px rgba(255,255,255,0.6)" }}
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
          cx="240"
          cy="28"
          r={hoveredNode === "opportunity" ? 24 : 22}
          fill="url(#opportunityGradientContrast)"
          stroke="hsl(160, 70%, 50%)"
          strokeWidth="2.5"
          style={{ filter: "url(#tealGlow)" }}
          className="transition-all duration-200"
        />
        <text
          x="240"
          y="32"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="22"
          className="pointer-events-none select-none"
        >
          🎯
        </text>
        <text
          x="240"
          y="58"
          textAnchor="middle"
          fill="hsl(160, 40%, 25%)"
          fontSize="9"
          fontWeight="700"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.03em"
          className="uppercase pointer-events-none select-none"
          style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
        >
          Opportunity
        </text>
      </g>
    </svg>
  );
};

export default TransformationalIllustration;
