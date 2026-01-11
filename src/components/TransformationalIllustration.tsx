import { useState } from "react";

interface TransformationalIllustrationProps {
  onNodeClick?: (node: string) => void;
}

const TransformationalIllustration = ({ onNodeClick }: TransformationalIllustrationProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 340 95"
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
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="hsl(220, 80%, 50%)" floodOpacity="0.7" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="purpleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="hsl(280, 75%, 55%)" floodOpacity="0.7" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="tealGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feFlood floodColor="hsl(160, 80%, 45%)" floodOpacity="0.8" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Animated energy flow path from Human to AI */}
        <path id="flowPath1" d="M 85 35 Q 120 25 155 35" fill="none" />
        {/* Animated energy flow path from AI to Opportunity */}
        <path id="flowPath2" d="M 195 35 Q 235 25 275 35" fill="none" />
      </defs>

      {/* Energy flow connection lines */}
      <path 
        d="M 85 35 Q 120 28 155 35" 
        fill="none" 
        stroke="hsl(250, 60%, 50%)" 
        strokeWidth="3" 
        strokeOpacity="0.5"
      />
      <path 
        d="M 195 35 Q 235 28 275 35" 
        fill="none" 
        stroke="hsl(200, 60%, 45%)" 
        strokeWidth="3" 
        strokeOpacity="0.5"
      />

      {/* Animated particles - Human to AI */}
      {[0, 0.33, 0.66].map((offset, i) => (
        <circle key={`particle1-${i}`} r="5" fill="hsl(250, 70%, 60%)">
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
        <circle key={`particle2-${i}`} r="5" fill="hsl(170, 70%, 50%)">
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
          cx="55"
          cy="35"
          r={hoveredNode === "human" ? 32 : 30}
          fill="url(#humanGradientContrast)"
          stroke="hsl(220, 60%, 60%)"
          strokeWidth="3"
          style={{ filter: hoveredNode === "human" ? "url(#blueGlow)" : "none" }}
          className="transition-all duration-200"
        />
        <text
          x="55"
          y="40"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="28"
          className="pointer-events-none select-none"
        >
          👤
        </text>
        <text
          x="55"
          y="78"
          textAnchor="middle"
          fill="hsl(0, 0%, 100%)"
          fontSize="14"
          fontWeight="800"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.08em"
          className="uppercase pointer-events-none select-none"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)" }}
        >
          Human
        </text>
      </g>

      {/* Plus Sign */}
      <text
        x="120"
        y="38"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="hsl(0, 0%, 100%)"
        fontSize="32"
        fontWeight="bold"
        fontFamily="'Space Grotesk', sans-serif"
        className="pointer-events-none select-none"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5)" }}
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
          cx="170"
          cy="35"
          r={hoveredNode === "ai" ? 32 : 30}
          fill="url(#aiGradientContrast)"
          stroke="hsl(280, 60%, 60%)"
          strokeWidth="3"
          style={{ filter: hoveredNode === "ai" ? "url(#purpleGlow)" : "none" }}
          className="transition-all duration-200"
        />
        <text
          x="170"
          y="40"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="28"
          className="pointer-events-none select-none"
        >
          🤖
        </text>
        <text
          x="170"
          y="78"
          textAnchor="middle"
          fill="hsl(0, 0%, 100%)"
          fontSize="14"
          fontWeight="800"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.08em"
          className="uppercase pointer-events-none select-none"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)" }}
        >
          AI
        </text>
      </g>

      {/* Equals Sign */}
      <text
        x="235"
        y="38"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="hsl(0, 0%, 100%)"
        fontSize="32"
        fontWeight="bold"
        fontFamily="'Space Grotesk', sans-serif"
        className="pointer-events-none select-none"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5)" }}
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
          cx="295"
          cy="35"
          r={hoveredNode === "opportunity" ? 34 : 32}
          fill="url(#opportunityGradientContrast)"
          stroke="hsl(160, 70%, 50%)"
          strokeWidth="3"
          style={{ filter: "url(#tealGlow)" }}
          className="transition-all duration-200"
        />
        <text
          x="295"
          y="40"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="30"
          className="pointer-events-none select-none"
        >
          🎯
        </text>
        <text
          x="295"
          y="80"
          textAnchor="middle"
          fill="hsl(0, 0%, 100%)"
          fontSize="12"
          fontWeight="800"
          fontFamily="'Space Grotesk', sans-serif"
          letterSpacing="0.05em"
          className="uppercase pointer-events-none select-none"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)" }}
        >
          Opportunity
        </text>
      </g>
    </svg>
  );
};

export default TransformationalIllustration;
