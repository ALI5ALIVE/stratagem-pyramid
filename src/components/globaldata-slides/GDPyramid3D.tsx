import { useIsMobile } from "@/hooks/use-mobile";

interface PyramidLayerData {
  id: string;
  level: number;
  label: string;
  sublabel: string;
  colorClass: string;
  glowClass: string;
}

interface GDPyramid3DProps {
  layers: PyramidLayerData[];
  activeLayer: number;
  onLayerClick: (level: number) => void;
  onModuleClick?: (module: string) => void;
  compact?: boolean;
}

// Inverted layer colors: Level 1 = apex (Gold), Level 5 = base (Red)
const layerColors = {
  1: { main: "hsl(45, 93%, 58%)", dark: "hsl(45, 93%, 45%)", glow: "hsl(45, 93%, 58%)" },     // PREDICTIVE - Gold
  2: { main: "hsl(280, 65%, 55%)", dark: "hsl(280, 65%, 42%)", glow: "hsl(280, 65%, 55%)" },  // OPERATIONAL - Purple
  3: { main: "hsl(173, 80%, 40%)", dark: "hsl(173, 80%, 30%)", glow: "hsl(173, 80%, 40%)" },  // CONNECTED - Teal
  4: { main: "hsl(199, 89%, 48%)", dark: "hsl(199, 89%, 36%)", glow: "hsl(199, 89%, 48%)" },  // MANAGED - Blue
  5: { main: "hsl(0, 70%, 50%)", dark: "hsl(0, 70%, 38%)", glow: "hsl(0, 70%, 50%)" },        // FRAGMENTED - Red
};

// 5 silos for Level 4 (MANAGED)
const foundationSections = [
  { id: "market", label: "Market", sublabel: "Silo" },
  { id: "innovation", label: "Innovation", sublabel: "Silo" },
  { id: "consumer", label: "Consumer", sublabel: "Silo" },
  { id: "competitive", label: "Competitive", sublabel: "Silo" },
  { id: "commercial", label: "Commercial", sublabel: "Silo" },
];

const GDPyramid3D = ({
  layers,
  activeLayer,
  onLayerClick,
  onModuleClick,
  compact = false,
}: GDPyramid3DProps) => {
  const isMobile = useIsMobile();

  // Pyramid configuration
  const layerConfig = {
    apex: { x: 750, y: 40 },
    baseLeft: { x: 80, y: 1080 },
    baseRight: { x: 1420, y: 1080 },
  };

  // Inverted layer boundaries: Level 1 at apex, Level 5 at base
  const layerBounds = {
    1: { top: 40, bottom: 248 },    // PREDICTIVE - Apex
    2: { top: 248, bottom: 456 },   // OPERATIONAL
    3: { top: 456, bottom: 664 },   // CONNECTED
    4: { top: 664, bottom: 872 },   // MANAGED (with 5 silos)
    5: { top: 872, bottom: 1080 },  // FRAGMENTED - Base
  };

  const getLeftX = (y: number) => {
    const { apex, baseLeft } = layerConfig;
    const t = (y - apex.y) / (baseLeft.y - apex.y);
    return apex.x + t * (baseLeft.x - apex.x);
  };

  const getRightX = (y: number) => {
    const { apex, baseRight } = layerConfig;
    const t = (y - apex.y) / (baseRight.y - apex.y);
    return apex.x + t * (baseRight.x - apex.x);
  };

  const getLayerPoints = (level: number) => {
    const bounds = layerBounds[level as keyof typeof layerBounds];
    const topLeft = getLeftX(bounds.top);
    const topRight = getRightX(bounds.top);
    const bottomLeft = getLeftX(bounds.bottom);
    const bottomRight = getRightX(bounds.bottom);

    return `${topLeft},${bounds.top} ${topRight},${bounds.top} ${bottomRight},${bounds.bottom} ${bottomLeft},${bounds.bottom}`;
  };

  // 5 sections for Level 4 (MANAGED silos)
  const getFoundationSectionPoints = (sectionIndex: number) => {
    const bounds = layerBounds[4];
    const topLeft = getLeftX(bounds.top);
    const topRight = getRightX(bounds.top);
    const bottomLeft = getLeftX(bounds.bottom);
    const bottomRight = getRightX(bounds.bottom);

    const topWidth = topRight - topLeft;
    const bottomWidth = bottomRight - bottomLeft;
    const sectionTopWidth = topWidth / 5;
    const sectionBottomWidth = bottomWidth / 5;

    const startTopX = topLeft + sectionIndex * sectionTopWidth;
    const endTopX = topLeft + (sectionIndex + 1) * sectionTopWidth;
    const startBottomX = bottomLeft + sectionIndex * sectionBottomWidth;
    const endBottomX = bottomLeft + (sectionIndex + 1) * sectionBottomWidth;

    return `${startTopX},${bounds.top} ${endTopX},${bounds.top} ${endBottomX},${bounds.bottom} ${startBottomX},${bounds.bottom}`;
  };

  const getLayerData = (level: number) => {
    return layers.find((l) => l.level === level);
  };

  // Label positions
  const labelPositions = {
    1: { lineStartX: 1000, lineStartY: 140, lineEndX: 1480, lineEndY: 140, labelX: 1490, labelY: 140 },
    2: { lineStartX: 1100, lineStartY: 350, lineEndX: 1480, lineEndY: 350, labelX: 1490, labelY: 350 },
    3: { lineStartX: 1180, lineStartY: 560, lineEndX: 1480, lineEndY: 560, labelX: 1490, labelY: 560 },
    4: { lineStartX: 1250, lineStartY: 768, lineEndX: 1480, lineEndY: 768, labelX: 1490, labelY: 768 },
    5: { lineStartX: 1300, lineStartY: 976, lineEndX: 1480, lineEndY: 976, labelX: 1490, labelY: 976 },
  };

  const handleModuleClick = (module: string) => {
    if (onModuleClick) {
      onModuleClick(module);
    }
  };

  const viewBox = isMobile ? "0 0 1500 1100" : "0 0 1800 1100";

  const apexX = layerConfig.apex.x;
  const apexY = layerConfig.apex.y;
  const leftBaseX = layerConfig.baseLeft.x;
  const rightBaseX = layerConfig.baseRight.x;
  const baseY = layerConfig.baseLeft.y;

  const foundationBounds = layerBounds[4];
  const foundationCenterY = (foundationBounds.top + foundationBounds.bottom) / 2;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <svg
        viewBox={viewBox}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ 
          ...(compact ? {} : {
            minWidth: isMobile ? "480px" : "720px",
            minHeight: isMobile ? "420px" : "570px",
          }),
          filter: isMobile ? "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" : "drop-shadow(0 30px 60px rgba(0,0,0,0.5))",
        }}
      >
        <defs>
          {/* Gradients for each layer */}
          {[1, 2, 3, 4, 5].map((level) => {
            const colors = layerColors[level as keyof typeof layerColors];
            return (
              <linearGradient key={`grad-${level}`} id={`gd-layer-grad-${level}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.main} />
                <stop offset="100%" stopColor={colors.dark} />
              </linearGradient>
            );
          })}

          {/* Silo section gradients (for Level 4) */}
          {[0, 1, 2, 3, 4].map((index) => (
            <linearGradient key={`silo-${index}`} id={`gd-silo-section-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={`hsl(199, 89%, ${50 - index * 2}%)`} />
              <stop offset="100%" stopColor={`hsl(199, 89%, ${38 - index * 2}%)`} />
            </linearGradient>
          ))}
          
          {/* Glow filters for active states */}
          {[1, 2, 3, 4, 5].map((level) => {
            const colors = layerColors[level as keyof typeof layerColors];
            return (
              <filter key={`glow-${level}`} id={`gd-active-glow-${level}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="24" result="blur" />
                <feFlood floodColor={colors.glow} floodOpacity="0.7" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            );
          })}
        </defs>

        {/* Y-axis arrow - Intelligence Maturity */}
        <g className="performance-arrow">
          <line x1={40} y1={900} x2={40} y2={80} stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeOpacity="0.6" />
          <polygon points="40,56 28,84 52,84" fill="hsl(var(--muted-foreground))" fillOpacity="0.6" />
          <text x={-500} y={20} transform="rotate(-90)" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="20" fontWeight="600" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.08em" className="uppercase">
            Intelligence Maturity
          </text>
        </g>

        {/* Render layers 1, 2, 3, 5 (Level 4 is silos, rendered separately) */}
        {[1, 2, 3, 5].map((level) => {
          const points = getLayerPoints(level);
          const colors = layerColors[level as keyof typeof layerColors];
          const isActive = activeLayer === level;
          const bounds = layerBounds[level as keyof typeof layerBounds];
          const labelPos = labelPositions[level as keyof typeof labelPositions];
          const layerData = getLayerData(level);

          const centerY = (bounds.top + bounds.bottom) / 2;
          const rightEdgeX = getRightX(centerY);

          return (
            <g key={level}>
              <polygon
                points={points}
                fill={`url(#gd-layer-grad-${level})`}
                stroke={colors.main}
                strokeWidth={isActive ? "4" : "2"}
                className="cursor-pointer transition-all duration-300"
                onClick={() => onLayerClick(level)}
                style={{ filter: isActive ? `url(#gd-active-glow-${level})` : "none", opacity: isActive ? 1 : 0.85 }}
              />

              {level !== 1 && (
                <line x1={getLeftX(bounds.top)} y1={bounds.top} x2={getRightX(bounds.top)} y2={bounds.top} stroke="white" strokeWidth="2" strokeOpacity={isActive ? "0.4" : "0.2"} />
              )}

              <polygon points={points} fill="transparent" className="cursor-pointer hover:fill-white/10 transition-all duration-200" onClick={() => onLayerClick(level)} />

              {/* Layer labels on right side */}
              {!isMobile && (
                <>
                  <line x1={rightEdgeX + 10} y1={labelPos.labelY} x2={labelPos.lineEndX} y2={labelPos.labelY} stroke={isActive ? colors.main : "hsl(222, 30%, 30%)"} strokeWidth={isActive ? "3" : "2"} strokeDasharray={isActive ? "none" : "8 8"} className="transition-all duration-300" />
                  <circle cx={rightEdgeX + 10} cy={labelPos.labelY} r={isActive ? "10" : "6"} fill={isActive ? colors.main : "hsl(222, 30%, 40%)"} className="transition-all duration-300" />

                  <g className="cursor-pointer" onClick={() => onLayerClick(level)}>
                    <rect x={labelPos.lineEndX + 16} y={labelPos.labelY - 52} width="290" height="104" rx="10" fill={isActive ? "hsl(222, 47%, 12%)" : "transparent"} stroke={isActive ? colors.main : "transparent"} strokeWidth="2" className="transition-all duration-300" />
                    <text x={labelPos.lineEndX + 32} y={labelPos.labelY - 8} fill={isActive ? colors.main : "hsl(210, 40%, 80%)"} fontSize="22" fontWeight="700" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.06em" className="transition-all duration-300">
                      {layerData?.label}
                    </text>
                    <text x={labelPos.lineEndX + 32} y={labelPos.labelY + 28} fill={isActive ? "hsl(210, 40%, 90%)" : "hsl(215, 20%, 55%)"} fontSize="20" fontWeight="400" fontFamily="'Inter', sans-serif" className="transition-all duration-300">
                      {layerData?.sublabel}
                    </text>
                  </g>
                </>
              )}
            </g>
          );
        })}

        {/* Level 4 (MANAGED) - 5 Silos */}
        <g>
          {foundationSections.map((section, index) => {
            const points = getFoundationSectionPoints(index);
            const isActive = activeLayer === 4;
            const colors = layerColors[4];

            const topLeftX = getLeftX(foundationBounds.top);
            const topRightX = getRightX(foundationBounds.top);
            const bottomLeftX = getLeftX(foundationBounds.bottom);
            const bottomRightX = getRightX(foundationBounds.bottom);
            const topWidth = topRightX - topLeftX;
            const bottomWidth = bottomRightX - bottomLeftX;
            
            const sectionTopCenter = topLeftX + (topWidth / 5) * (index + 0.5);
            const sectionBottomCenter = bottomLeftX + (bottomWidth / 5) * (index + 0.5);
            const sectionCenterX = (sectionTopCenter + sectionBottomCenter) / 2;

            return (
              <g key={section.id}>
                <polygon
                  points={points}
                  fill={`url(#gd-silo-section-${index})`}
                  stroke={colors.main}
                  strokeWidth={isActive ? "4" : "2"}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => { onLayerClick(4); handleModuleClick(section.id); }}
                  style={{ filter: isActive ? `url(#gd-active-glow-4)` : "none", opacity: isActive ? 1 : 0.85 }}
                />
                <polygon points={points} fill="transparent" className="cursor-pointer hover:fill-white/10 transition-all duration-200" onClick={() => { onLayerClick(4); handleModuleClick(section.id); }} />

                <text x={sectionCenterX} y={foundationCenterY - 12} textAnchor="middle" fill="hsl(210, 40%, 98%)" fontSize="18" fontWeight="600" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.05em" className="uppercase pointer-events-none select-none">
                  {section.label}
                </text>
                <text x={sectionCenterX} y={foundationCenterY + 18} textAnchor="middle" fill="hsl(210, 40%, 80%)" fontSize="14" fontWeight="400" fontFamily="'Inter', sans-serif" className="pointer-events-none select-none">
                  {section.sublabel}
                </text>
              </g>
            );
          })}

          {/* Dividers between silos */}
          {[0, 1, 2, 3].map((index) => {
            const topLeftX = getLeftX(foundationBounds.top);
            const topRightX = getRightX(foundationBounds.top);
            const bottomLeftX = getLeftX(foundationBounds.bottom);
            const bottomRightX = getRightX(foundationBounds.bottom);
            const topWidth = topRightX - topLeftX;
            const bottomWidth = bottomRightX - bottomLeftX;

            const dividerTopX = topLeftX + (topWidth / 5) * (index + 1);
            const dividerBottomX = bottomLeftX + (bottomWidth / 5) * (index + 1);

            return (
              <g key={`divider-${index}`}>
                <line x1={dividerTopX} y1={foundationBounds.top} x2={dividerBottomX} y2={foundationBounds.bottom} stroke="hsl(199, 89%, 60%)" strokeWidth="3" strokeOpacity="0.5" />
              </g>
            );
          })}

          {/* Top edge highlight for silos */}
          <line x1={getLeftX(foundationBounds.top)} y1={foundationBounds.top} x2={getRightX(foundationBounds.top)} y2={foundationBounds.top} stroke="white" strokeWidth="2" strokeOpacity={activeLayer === 4 ? "0.4" : "0.2"} />

          {/* Silos label (right side) */}
          {!isMobile && (() => {
            const labelPos = labelPositions[4];
            const centerY = (foundationBounds.top + foundationBounds.bottom) / 2;
            const rightEdgeX = getRightX(centerY);
            const layerData = getLayerData(4);
            const isActive = activeLayer === 4;
            const colors = layerColors[4];

            return (
              <g>
                <line x1={rightEdgeX + 10} y1={labelPos.labelY} x2={labelPos.lineEndX} y2={labelPos.labelY} stroke={isActive ? colors.main : "hsl(222, 30%, 30%)"} strokeWidth={isActive ? "3" : "2"} strokeDasharray={isActive ? "none" : "8 8"} className="transition-all duration-300" />
                <circle cx={rightEdgeX + 10} cy={labelPos.labelY} r={isActive ? "10" : "6"} fill={isActive ? colors.main : "hsl(222, 30%, 40%)"} className="transition-all duration-300" />

                <g className="cursor-pointer" onClick={() => onLayerClick(4)}>
                  <rect x={labelPos.lineEndX + 16} y={labelPos.labelY - 52} width="290" height="104" rx="10" fill={isActive ? "hsl(222, 47%, 12%)" : "transparent"} stroke={isActive ? colors.main : "transparent"} strokeWidth="2" className="transition-all duration-300" />
                  <text x={labelPos.lineEndX + 32} y={labelPos.labelY - 8} fill={isActive ? colors.main : "hsl(210, 40%, 80%)"} fontSize="22" fontWeight="700" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.06em" className="transition-all duration-300">
                    {layerData?.label}
                  </text>
                  <text x={labelPos.lineEndX + 32} y={labelPos.labelY + 28} fill={isActive ? "hsl(210, 40%, 90%)" : "hsl(215, 20%, 55%)"} fontSize="20" fontWeight="400" fontFamily="'Inter', sans-serif" className="transition-all duration-300">
                    {layerData?.sublabel}
                  </text>
                </g>
              </g>
            );
          })()}
        </g>

        {/* Outer pyramid edge highlights */}
        <path d={`M${apexX},${apexY} L${leftBaseX},${baseY}`} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.15" />
        <path d={`M${apexX},${apexY} L${rightBaseX},${baseY}`} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.25" />
        <path d={`M${leftBaseX},${baseY} L${rightBaseX},${baseY}`} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.1" />

        {/* Platform Shift marker at Level 3 */}
        {!isMobile && (() => {
          const bounds = layerBounds[3];
          const leftX = getLeftX(bounds.top);
          
          return (
            <g>
              <rect x={leftX - 180} y={bounds.top + 60} width="160" height="40" rx="6" fill="hsl(173, 80%, 40%)" fillOpacity="0.9" />
              <text x={leftX - 100} y={bounds.top + 86} textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.1em">
                PLATFORM SHIFT
              </text>
            </g>
          );
        })()}
      </svg>

      {/* Ambient glow effect */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 40% 50%, ${
            layerColors[activeLayer as keyof typeof layerColors]?.glow || "hsl(173, 80%, 40%)"
          } 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default GDPyramid3D;
