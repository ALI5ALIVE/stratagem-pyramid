import { useState } from "react";

interface PlatformEcosystemDiagramProps {
  className?: string;
}

const PlatformEcosystemDiagram = ({ className = "" }: PlatformEcosystemDiagramProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Center point
  const cx = 200;
  const cy = 200;

  // Ring radii
  const outerRadius = 190;
  const innerRadius = 140;
  const hubRadius = 45;

  // Product positions (triangle layout)
  const products = [
    {
      id: "content",
      name: "Content",
      subtitle: "Manager365",
      angle: 240, // top-left
      color: "hsl(210, 80%, 55%)",
      iconColor: "hsl(210, 80%, 55%)",
    },
    {
      id: "safety",
      name: "Safety",
      subtitle: "Manager365",
      angle: 0, // right
      color: "hsl(330, 80%, 55%)",
      iconColor: "hsl(330, 80%, 55%)",
    },
    {
      id: "training",
      name: "Training",
      subtitle: "Manager365",
      angle: 120, // bottom
      color: "hsl(180, 70%, 45%)",
      iconColor: "hsl(180, 70%, 45%)",
    },
  ];

  // AI assistants positions
  const aiAssistants = [
    { id: "coauthor", name: "CoAuthor", angle: 225, symbol: "✦" },
    { id: "coanalyst", name: "CoAnalyst", angle: 315, symbol: "✦" },
    { id: "cotrainer", name: "CoTrainer", angle: 90, symbol: "✦" },
  ];

  // Calculate position from angle and radius
  const getPosition = (angle: number, radius: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  // Generate arc path that follows the circle between two angles
  const getArcPath = (startAngle: number, endAngle: number, radius: number) => {
    const start = getPosition(startAngle, radius);
    const end = getPosition(endAngle, radius);
    
    // For clockwise flow around the triangle, use sweep=1
    // Arc should be less than 180 degrees, so largeArc=0
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
  };

  // Product card dimensions
  const cardWidth = 70;
  const cardHeight = 50;

  return (
    <svg
      viewBox="0 0 400 400"
      className={`w-full h-auto ${className}`}
      style={{ maxWidth: "500px" }}
    >
      <defs>
        {/* Outer ring gradient */}
        <radialGradient id="outerRingGradient" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="hsl(220, 50%, 18%)" />
          <stop offset="100%" stopColor="hsl(220, 70%, 12%)" />
        </radialGradient>

        {/* Inner ring gradient */}
        <radialGradient id="innerRingGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(220, 30%, 92%)" />
          <stop offset="100%" stopColor="hsl(220, 25%, 85%)" />
        </radialGradient>

        {/* Hub gradient */}
        <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(220, 60%, 30%)" />
          <stop offset="100%" stopColor="hsl(220, 60%, 20%)" />
        </radialGradient>

        {/* Arrow gradients */}
        <linearGradient id="pinkArrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(330, 75%, 55%)" />
          <stop offset="100%" stopColor="hsl(340, 80%, 65%)" />
        </linearGradient>

        <linearGradient id="tealArrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(180, 70%, 45%)" />
          <stop offset="100%" stopColor="hsl(190, 75%, 55%)" />
        </linearGradient>

        <linearGradient id="blueArrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(210, 80%, 55%)" />
          <stop offset="100%" stopColor="hsl(200, 85%, 60%)" />
        </linearGradient>

        {/* Hub glow filter */}
        <filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Card shadow filter */}
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>

        {/* Arrow markers */}
        <marker
          id="arrowHeadPink"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="hsl(340, 80%, 65%)" />
        </marker>

        <marker
          id="arrowHeadTeal"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="hsl(190, 75%, 55%)" />
        </marker>

        <marker
          id="arrowHeadBlue"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="hsl(200, 85%, 60%)" />
        </marker>

        {/* Curved text paths for AI-POWERED - brought slightly inward */}
        <path
          id="aiPoweredTop"
          d={`M ${cx - 85} ${cy - 160} A 160 160 0 0 1 ${cx + 85} ${cy - 160}`}
          fill="none"
        />
        <path
          id="aiPoweredBottom"
          d={`M ${cx + 85} ${cy + 160} A 160 160 0 0 1 ${cx - 85} ${cy + 160}`}
          fill="none"
        />
        <path
          id="aiPoweredLeft"
          d={`M ${cx - 160} ${cy + 70} A 160 160 0 0 1 ${cx - 160} ${cy - 70}`}
          fill="none"
        />
        <path
          id="aiPoweredRight"
          d={`M ${cx + 160} ${cy - 70} A 160 160 0 0 1 ${cx + 160} ${cy + 70}`}
          fill="none"
        />
      </defs>

      {/* Outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={outerRadius}
        fill="url(#outerRingGradient)"
        className="animate-pulse"
        style={{ animationDuration: "4s" }}
      />

      {/* AI-POWERED curved text labels */}
      <text fill="hsla(0, 0%, 100%, 0.4)" fontSize="9" fontWeight="600" letterSpacing="3">
        <textPath href="#aiPoweredTop" startOffset="50%" textAnchor="middle">
          AI-POWERED
        </textPath>
      </text>
      <text fill="hsla(0, 0%, 100%, 0.4)" fontSize="9" fontWeight="600" letterSpacing="3">
        <textPath href="#aiPoweredBottom" startOffset="50%" textAnchor="middle">
          AI-POWERED
        </textPath>
      </text>
      <text fill="hsla(0, 0%, 100%, 0.4)" fontSize="9" fontWeight="600" letterSpacing="3">
        <textPath href="#aiPoweredLeft" startOffset="50%" textAnchor="middle">
          AI-POWERED
        </textPath>
      </text>
      <text fill="hsla(0, 0%, 100%, 0.4)" fontSize="9" fontWeight="600" letterSpacing="3">
        <textPath href="#aiPoweredRight" startOffset="50%" textAnchor="middle">
          AI-POWERED
        </textPath>
      </text>

      {/* AI Assistant labels */}
      {aiAssistants.map((assistant) => {
        const pos = getPosition(assistant.angle, outerRadius - 25);
        return (
          <g key={assistant.id}>
            <text
              x={pos.x}
              y={pos.y}
              fill="white"
              fontSize="11"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {assistant.name}
            </text>
            <text
              x={pos.x + 35}
              y={pos.y}
              fill="hsl(45, 90%, 60%)"
              fontSize="10"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {assistant.symbol}
            </text>
          </g>
        );
      })}

      {/* Inner ring */}
      <circle
        cx={cx}
        cy={cy}
        r={innerRadius}
        fill="url(#innerRingGradient)"
      />

      {/* Connection arrows between products - following circular arc */}
      {/* Safety -> Content */}
      <path
        d={getArcPath(240 + 20, 360 - 20, 95)}
        fill="none"
        stroke="url(#pinkArrowGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        markerEnd="url(#arrowHeadPink)"
      />

      {/* Content -> Training */}
      <path
        d={getArcPath(0 + 20, 120 - 20, 95)}
        fill="none"
        stroke="url(#blueArrowGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        markerEnd="url(#arrowHeadBlue)"
      />

      {/* Training -> Safety */}
      <path
        d={getArcPath(120 + 20, 240 - 20, 95)}
        fill="none"
        stroke="url(#tealArrowGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        markerEnd="url(#arrowHeadTeal)"
      />

      {/* Flowing dots animation along arc paths */}
      <circle r="4" fill="hsl(330, 80%, 65%)">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path={getArcPath(240 + 20, 360 - 20, 95)}
        />
      </circle>
      <circle r="4" fill="hsl(210, 80%, 60%)">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
          path={getArcPath(0 + 20, 120 - 20, 95)}
        />
      </circle>
      <circle r="4" fill="hsl(180, 70%, 50%)">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          begin="2s"
          path={getArcPath(120 + 20, 240 - 20, 95)}
        />
      </circle>

      {/* Product cards */}
      {products.map((product) => {
        const pos = getPosition(product.angle, 100);
        const isHovered = hoveredProduct === product.id;
        
        return (
          <g
            key={product.id}
            transform={`translate(${pos.x - cardWidth / 2}, ${pos.y - cardHeight / 2})`}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Card background */}
            <rect
              width={cardWidth}
              height={cardHeight}
              rx="8"
              fill="white"
              filter="url(#cardShadow)"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                transformOrigin: "center",
                transition: "transform 0.2s ease-out",
              }}
            />
            
            {/* Color indicator bar */}
            <rect
              x="0"
              y="0"
              width="4"
              height={cardHeight}
              rx="2"
              fill={product.color}
            />
            
            {/* Product name */}
            <text
              x={cardWidth / 2 + 2}
              y={cardHeight / 2 - 6}
              fill="hsl(220, 50%, 20%)"
              fontSize="10"
              fontWeight="700"
              textAnchor="middle"
            >
              {product.name}
            </text>
            <text
              x={cardWidth / 2 + 2}
              y={cardHeight / 2 + 8}
              fill="hsl(220, 30%, 50%)"
              fontSize="8"
              textAnchor="middle"
            >
              {product.subtitle}
            </text>
          </g>
        );
      })}

      {/* Center hub */}
      <circle
        cx={cx}
        cy={cy}
        r={hubRadius}
        fill="url(#hubGradient)"
        filter="url(#hubGlow)"
      />

      {/* Hub logo text */}
      <text
        x={cx}
        y={cy}
        fill="white"
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Space Grotesk, sans-serif"
      >
        CoAnalyst
      </text>
    </svg>
  );
};

export default PlatformEcosystemDiagram;
