import { useState } from "react";

interface PlatformEcosystemDiagramProps {
  className?: string;
}

const PlatformEcosystemDiagram = ({ className = "" }: PlatformEcosystemDiagramProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const cx = 200;
  const cy = 240;

  const outerRadius = 190;
  const innerRadius = 140;
  const hubRadius = 45;

  const products = [
    { id: "safety", name: "Safety", subtitle: "Manager365", angle: 240, color: "hsl(330, 80%, 55%)" },
    { id: "content", name: "Content", subtitle: "Manager365", angle: 0, color: "hsl(210, 80%, 55%)" },
    { id: "training", name: "Training", subtitle: "Manager365", angle: 120, color: "hsl(180, 70%, 45%)" },
  ];

  const aiAssistants = [
    { id: "coauthor", name: "CoAuthor", angle: 225, symbol: "✦" },
    { id: "coanalyst", name: "CoAnalyst", angle: 315, symbol: "✦" },
    { id: "cotrainer", name: "CoTrainer", angle: 90, symbol: "✦" },
  ];

  const getPosition = (angle: number, radius: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const getArcPath = (startAngle: number, endAngle: number, radius: number) => {
    const start = getPosition(startAngle, radius);
    const end = getPosition(endAngle, radius);
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
  };

  const cardWidth = 70;
  const cardHeight = 50;

  // Connection line targets (product card positions)
  const safetyPos = getPosition(240, 100);
  const contentPos = getPosition(0, 100);
  const trainingPos = getPosition(120, 100);

  const bannerY = 5;
  const bannerH = 45;
  const bannerBottom = bannerY + bannerH;

  const connectionLines = [
    { target: safetyPos, color: "hsl(45, 85%, 55%)", delay: "0s" },
    { target: { x: cx, y: cy - outerRadius }, color: "hsl(45, 85%, 55%)", delay: "1s" },
    { target: contentPos, color: "hsl(45, 85%, 55%)", delay: "2s" },
  ];

  return (
    <svg
      viewBox="0 0 400 460"
      className={`w-full h-auto ${className}`}
      style={{ maxWidth: "500px" }}
    >
      <defs>
        <radialGradient id="outerRingGradient" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="hsl(220, 50%, 18%)" />
          <stop offset="100%" stopColor="hsl(220, 70%, 12%)" />
        </radialGradient>
        <radialGradient id="innerRingGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(220, 30%, 92%)" />
          <stop offset="100%" stopColor="hsl(220, 25%, 85%)" />
        </radialGradient>
        <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(220, 60%, 30%)" />
          <stop offset="100%" stopColor="hsl(220, 60%, 20%)" />
        </radialGradient>

        <linearGradient id="goldBannerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(40, 70%, 20%)" />
          <stop offset="50%" stopColor="hsl(42, 80%, 25%)" />
          <stop offset="100%" stopColor="hsl(38, 70%, 20%)" />
        </linearGradient>
        <linearGradient id="goldBorderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(45, 90%, 50%)" />
          <stop offset="50%" stopColor="hsl(45, 95%, 65%)" />
          <stop offset="100%" stopColor="hsl(45, 90%, 50%)" />
        </linearGradient>

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

        <filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>
        <filter id="bannerGlow" x="-10%" y="-30%" width="120%" height="160%">
          <feGaussianBlur stdDeviation="6" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <marker id="arrowHeadPink" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="hsl(340, 80%, 65%)" />
        </marker>
        <marker id="arrowHeadTeal" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="hsl(190, 75%, 55%)" />
        </marker>
        <marker id="arrowHeadBlue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="hsl(200, 85%, 60%)" />
        </marker>
        <marker id="arrowHeadGold" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="hsl(45, 90%, 60%)" />
        </marker>
      </defs>

      {/* === CoAnalyst Banner === */}
      <rect x="60" y={bannerY} width="280" height={bannerH} rx="12" fill="url(#goldBannerGradient)" filter="url(#bannerGlow)" />
      <rect x="60" y={bannerY} width="280" height={bannerH} rx="12" fill="none" stroke="url(#goldBorderGradient)" strokeWidth="1.5" />
      <text x={cx - 10} y={bannerY + 20} fill="hsl(45, 90%, 65%)" fontSize="10" fontWeight="600" textAnchor="middle" dominantBaseline="middle">✦</text>
      <text x={cx + 10} y={bannerY + 20} fill="hsl(45, 95%, 80%)" fontSize="14" fontWeight="700" textAnchor="start" dominantBaseline="middle" fontFamily="Space Grotesk, sans-serif">
        CoAnalyst
      </text>
      <text x={cx} y={bannerY + 36} fill="hsl(45, 60%, 60%)" fontSize="8" fontWeight="500" textAnchor="middle" letterSpacing="2">
        INTELLIGENCE LAYER
      </text>

      {/* === Connection lines from banner to diagram === */}
      {[safetyPos, { x: cx, y: cy - outerRadius + 10 }, contentPos].map((target, i) => {
        const path = `M ${60 + 70 * (i + 1)} ${bannerBottom} Q ${60 + 70 * (i + 1)} ${bannerBottom + 20} ${target.x} ${target.y}`;
        return (
          <g key={`conn-${i}`}>
            <path d={path} fill="none" stroke="hsl(45, 70%, 40%)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" markerEnd="url(#arrowHeadGold)" />
            <circle r="3" fill="hsl(45, 90%, 60%)">
              <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${i * 0.8}s`} path={path} />
            </circle>
          </g>
        );
      })}

      {/* === Outer ring === */}
      <circle cx={cx} cy={cy} r={outerRadius} fill="url(#outerRingGradient)" className="animate-pulse" style={{ animationDuration: "4s" }} />

      {/* === AI Assistant decorative labels on outer ring === */}
      {aiAssistants.map((assistant) => {
        const pos = getPosition(assistant.angle, outerRadius - 25);
        return (
          <g key={assistant.id}>
            <text x={pos.x} y={pos.y} fill="white" fontSize="11" fontWeight="600" textAnchor="middle" dominantBaseline="middle">
              {assistant.name}
            </text>
            <text x={pos.x + 35} y={pos.y} fill="hsl(45, 90%, 60%)" fontSize="10" textAnchor="middle" dominantBaseline="middle">
              {assistant.symbol}
            </text>
          </g>
        );
      })}

      {/* === Inner ring === */}
      <circle cx={cx} cy={cy} r={innerRadius} fill="url(#innerRingGradient)" />

      {/* === Connection arrows between products === */}
      <path d={getArcPath(240 + 20, 360 - 20, 95)} fill="none" stroke="url(#pinkArrowGradient)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowHeadPink)" />
      <path d={getArcPath(0 + 20, 120 - 20, 95)} fill="none" stroke="url(#blueArrowGradient)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowHeadBlue)" />
      <path d={getArcPath(120 + 20, 240 - 20, 95)} fill="none" stroke="url(#tealArrowGradient)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowHeadTeal)" />

      {/* Flowing dots on arcs */}
      <circle r="4" fill="hsl(330, 80%, 65%)">
        <animateMotion dur="3s" repeatCount="indefinite" path={getArcPath(240 + 20, 360 - 20, 95)} />
      </circle>
      <circle r="4" fill="hsl(210, 80%, 60%)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="1s" path={getArcPath(0 + 20, 120 - 20, 95)} />
      </circle>
      <circle r="4" fill="hsl(180, 70%, 50%)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="2s" path={getArcPath(120 + 20, 240 - 20, 95)} />
      </circle>

      {/* === Product cards === */}
      {products.map((product) => {
        const pos = getPosition(product.angle, 100);
        const isHovered = hoveredProduct === product.id;
        return (
          <g key={product.id} transform={`translate(${pos.x - cardWidth / 2}, ${pos.y - cardHeight / 2})`} onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)} style={{ cursor: "pointer" }}>
            <rect width={cardWidth} height={cardHeight} rx="8" fill="white" filter="url(#cardShadow)" style={{ transform: isHovered ? "scale(1.05)" : "scale(1)", transformOrigin: "center", transition: "transform 0.2s ease-out" }} />
            <rect x="0" y="0" width="4" height={cardHeight} rx="2" fill={product.color} />
            <text x={cardWidth / 2 + 2} y={cardHeight / 2 - 6} fill="hsl(220, 50%, 20%)" fontSize="10" fontWeight="700" textAnchor="middle">{product.name}</text>
            <text x={cardWidth / 2 + 2} y={cardHeight / 2 + 8} fill="hsl(220, 30%, 50%)" fontSize="8" textAnchor="middle">{product.subtitle}</text>
          </g>
        );
      })}

      {/* === Center hub === */}
      <circle cx={cx} cy={cy} r={hubRadius} fill="url(#hubGradient)" filter="url(#hubGlow)" />
      <text x={cx} y={cy - 6} fill="white" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Space Grotesk, sans-serif">COMPLY</text>
      <text x={cx} y={cy + 10} fill="hsl(200, 100%, 70%)" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Space Grotesk, sans-serif">365</text>
    </svg>
  );
};

export default PlatformEcosystemDiagram;
