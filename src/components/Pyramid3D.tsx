import { useIsMobile } from "@/hooks/use-mobile";
import TransformationalIllustration from "./TransformationalIllustration";
import MetricsGauges from "./MetricsGauges";
import TripleLoop from "./TripleLoop";
import FragmentationIllustration from "./FragmentationIllustration";

interface PyramidLayerData {
  id: string;
  level: number;
  label: string;
  sublabel: string;
  colorClass: string;
  glowClass: string;
}

interface Pyramid3DProps {
  layers: PyramidLayerData[];
  activeLayer: number;
  onLayerClick: (level: number) => void;
  onModuleClick?: (module: string) => void;
}

// 2x scaled layer colors configuration
const layerColors = {
  1: { main: "hsl(45, 93%, 58%)", dark: "hsl(45, 93%, 40%)", glow: "hsl(45, 93%, 58%)" },
  2: { main: "hsl(280, 65%, 55%)", dark: "hsl(280, 65%, 38%)", glow: "hsl(280, 65%, 55%)" },
  3: { main: "hsl(173, 80%, 40%)", dark: "hsl(173, 80%, 28%)", glow: "hsl(173, 80%, 40%)" },
  4: { main: "hsl(199, 89%, 48%)", dark: "hsl(199, 89%, 35%)", glow: "hsl(199, 89%, 48%)" },
  5: { main: "hsl(0, 70%, 50%)", dark: "hsl(0, 70%, 35%)", glow: "hsl(0, 70%, 50%)" },
};

const foundationSections = [
  { id: "safety", label: "Safety", sublabel: "Risk & Events" },
  { id: "content", label: "Content", sublabel: "Docs & Procedures" },
  { id: "training", label: "Training", sublabel: "Quals & Learning" },
];

const Pyramid3D = ({
  layers,
  activeLayer,
  onLayerClick,
  onModuleClick,
}: Pyramid3DProps) => {
  const isMobile = useIsMobile();

  // 2x scaled layer configuration
  const layerConfig = {
    apex: { x: 750, y: 40 },
    baseLeft: { x: 80, y: 1080 },
    baseRight: { x: 1420, y: 1080 },
  };

  // 2x scaled layer boundaries
  const layerBounds = {
    1: { top: 40, bottom: 248 },
    2: { top: 248, bottom: 456 },
    3: { top: 456, bottom: 664 },
    4: { top: 664, bottom: 872 },
    5: { top: 872, bottom: 1080 },
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

  const getFoundationSectionPoints = (sectionIndex: number) => {
    const bounds = layerBounds[4];
    const topLeft = getLeftX(bounds.top);
    const topRight = getRightX(bounds.top);
    const bottomLeft = getLeftX(bounds.bottom);
    const bottomRight = getRightX(bounds.bottom);

    const topWidth = topRight - topLeft;
    const bottomWidth = bottomRight - bottomLeft;
    const sectionTopWidth = topWidth / 3;
    const sectionBottomWidth = bottomWidth / 3;

    const startTopX = topLeft + sectionIndex * sectionTopWidth;
    const endTopX = topLeft + (sectionIndex + 1) * sectionTopWidth;
    const startBottomX = bottomLeft + sectionIndex * sectionBottomWidth;
    const endBottomX = bottomLeft + (sectionIndex + 1) * sectionBottomWidth;

    return `${startTopX},${bounds.top} ${endTopX},${bounds.top} ${endBottomX},${bounds.bottom} ${startBottomX},${bounds.bottom}`;
  };

  const getLayerData = (level: number) => {
    return layers.find((l) => l.level === level);
  };

  // 2x scaled label positions
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

  // 2x scaled viewBox
  const viewBox = isMobile ? "0 0 1500 1100" : "0 0 1800 1100";

  // Pyramid coordinates for edge highlights
  const apexX = layerConfig.apex.x;
  const apexY = layerConfig.apex.y;
  const leftBaseX = layerConfig.baseLeft.x;
  const rightBaseX = layerConfig.baseRight.x;
  const baseY = layerConfig.baseLeft.y;

  // Foundation layer center
  const foundationBounds = layerBounds[4];
  const foundationCenterY = (foundationBounds.top + foundationBounds.bottom) / 2;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Main pyramid with labels SVG */}
      <svg
        viewBox={viewBox}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ 
          minWidth: isMobile ? "480px" : "720px",
          minHeight: isMobile ? "420px" : "570px",
          filter: isMobile ? "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" : "drop-shadow(0 30px 60px rgba(0,0,0,0.5))",
        }}
      >
        <defs>
          {/* Gradients for each layer */}
          {[1, 2, 3, 4, 5].map((level) => {
            const colors = layerColors[level as keyof typeof layerColors];
            return (
              <linearGradient key={`grad-${level}`} id={`layer-grad-${level}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.main} />
                <stop offset="100%" stopColor={colors.dark} />
              </linearGradient>
            );
          })}

          {/* Foundation section gradients */}
          <linearGradient id="foundation-section-0" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(199, 89%, 50%)" />
            <stop offset="100%" stopColor="hsl(199, 89%, 38%)" />
          </linearGradient>
          <linearGradient id="foundation-section-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(199, 89%, 48%)" />
            <stop offset="100%" stopColor="hsl(199, 89%, 36%)" />
          </linearGradient>
          <linearGradient id="foundation-section-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(199, 89%, 46%)" />
            <stop offset="100%" stopColor="hsl(199, 89%, 34%)" />
          </linearGradient>
          
          {/* Glow filters for active states - 2x blur */}
          {[1, 2, 3, 4, 5].map((level) => {
            const colors = layerColors[level as keyof typeof layerColors];
            return (
              <filter key={`glow-${level}`} id={`active-glow-${level}`} x="-50%" y="-50%" width="200%" height="200%">
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

          {/* Inner shadow for depth */}
          <filter id="inner-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset dx="0" dy="4" />
            <feGaussianBlur stdDeviation="4" result="shadow" />
            <feComposite in="SourceGraphic" in2="shadow" operator="over" />
          </filter>
        </defs>

        {/* Y-axis arrow - scaled */}
        <g className="performance-arrow">
          <line x1={40} y1={900} x2={40} y2={80} stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeOpacity="0.6" />
          <polygon points="40,56 28,84 52,84" fill="hsl(var(--muted-foreground))" fillOpacity="0.6" />
          <text x={-500} y={20} transform="rotate(-90)" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="20" fontWeight="600" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.08em" className="uppercase">
            Operational Performance & Readiness
          </text>
        </g>

        {/* Render layers 1-3 */}
        {[3, 2, 1].map((level) => {
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
                fill={`url(#layer-grad-${level})`}
                stroke={colors.main}
                strokeWidth={isActive ? "4" : "2"}
                className="cursor-pointer transition-all duration-300"
                onClick={() => onLayerClick(level)}
                style={{ filter: isActive ? `url(#active-glow-${level})` : "none", opacity: isActive ? 1 : 0.85 }}
              />

              {level !== 1 && (
                <line x1={getLeftX(bounds.top)} y1={bounds.top} x2={getRightX(bounds.top)} y2={bounds.top} stroke="white" strokeWidth="2" strokeOpacity={isActive ? "0.4" : "0.2"} />
              )}

              <polygon points={points} fill="transparent" className="cursor-pointer hover:fill-white/10 transition-all duration-200" onClick={() => onLayerClick(level)} />

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

        {/* Foundation Layer (Level 4) - Split into 3 sections */}
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
            
            const sectionTopCenter = topLeftX + (topWidth / 3) * (index + 0.5);
            const sectionBottomCenter = bottomLeftX + (bottomWidth / 3) * (index + 0.5);
            const sectionCenterX = (sectionTopCenter + sectionBottomCenter) / 2;

            return (
              <g key={section.id}>
                <polygon
                  points={points}
                  fill={`url(#foundation-section-${index})`}
                  stroke={colors.main}
                  strokeWidth={isActive ? "4" : "2"}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => { onLayerClick(4); handleModuleClick(section.id); }}
                  style={{ filter: isActive ? `url(#active-glow-4)` : "none", opacity: isActive ? 1 : 0.85 }}
                />
                <polygon points={points} fill="transparent" className="cursor-pointer hover:fill-white/10 transition-all duration-200" onClick={() => { onLayerClick(4); handleModuleClick(section.id); }} />

                <text x={sectionCenterX} y={foundationCenterY - 12} textAnchor="middle" fill="hsl(210, 40%, 98%)" fontSize="22" fontWeight="600" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.05em" className="uppercase pointer-events-none select-none">
                  {section.label}
                </text>
                <text x={sectionCenterX} y={foundationCenterY + 24} textAnchor="middle" fill="hsl(210, 40%, 80%)" fontSize="18" fontWeight="400" fontFamily="'Inter', sans-serif" className="pointer-events-none select-none">
                  {section.sublabel}
                </text>
              </g>
            );
          })}

          {/* Dividers between foundation sections */}
          {[0, 1].map((index) => {
            const topLeftX = getLeftX(foundationBounds.top);
            const topRightX = getRightX(foundationBounds.top);
            const bottomLeftX = getLeftX(foundationBounds.bottom);
            const bottomRightX = getRightX(foundationBounds.bottom);
            const topWidth = topRightX - topLeftX;
            const bottomWidth = bottomRightX - bottomLeftX;

            const dividerTopX = topLeftX + (topWidth / 3) * (index + 1);
            const dividerBottomX = bottomLeftX + (bottomWidth / 3) * (index + 1);

            return (
              <g key={`bridge-${index}`}>
                <line x1={dividerTopX} y1={foundationBounds.top} x2={dividerBottomX} y2={foundationBounds.bottom} stroke="hsl(199, 89%, 60%)" strokeWidth="4" strokeOpacity="0.6" />
                <circle cx={dividerTopX} cy={foundationBounds.top + 30} r="8" fill="hsl(199, 89%, 65%)" className="animate-pulse-glow" />
                <circle cx={dividerBottomX} cy={foundationBounds.bottom - 30} r="8" fill="hsl(199, 89%, 65%)" className="animate-pulse-glow" />
              </g>
            );
          })}

          {/* Top edge highlight for Foundation */}
          <line x1={getLeftX(foundationBounds.top)} y1={foundationBounds.top} x2={getRightX(foundationBounds.top)} y2={foundationBounds.top} stroke="white" strokeWidth="2" strokeOpacity={activeLayer === 4 ? "0.4" : "0.2"} />

          {/* Foundation label (right side) - hidden on mobile */}
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

        {/* Fragmentation Layer (Level 5) */}
        {(() => {
          const level = 5;
          const bounds = layerBounds[5];
          const colors = layerColors[5];
          const isActive = activeLayer === 5;
          const layerData = getLayerData(5);
          const labelPos = labelPositions[5];

          const topLeftX = getLeftX(bounds.top);
          const topRightX = getRightX(bounds.top);
          const bottomLeftX = getLeftX(bounds.bottom);
          const bottomRightX = getRightX(bounds.bottom);
          const points = `${topLeftX},${bounds.top} ${topRightX},${bounds.top} ${bottomRightX},${bounds.bottom} ${bottomLeftX},${bounds.bottom}`;

          const centerY = (bounds.top + bounds.bottom) / 2;
          const rightEdgeX = getRightX(centerY);

          return (
            <g>
              <polygon
                points={points}
                fill={`url(#layer-grad-${level})`}
                stroke={colors.main}
                strokeWidth={isActive ? "4" : "2"}
                className="cursor-pointer transition-all duration-300"
                onClick={() => onLayerClick(level)}
                style={{ filter: isActive ? `url(#active-glow-${level})` : "none", opacity: isActive ? 1 : 0.85 }}
              />
              <line x1={topLeftX} y1={bounds.top} x2={topRightX} y2={bounds.top} stroke="white" strokeWidth="2" strokeOpacity={isActive ? "0.4" : "0.2"} />
              <polygon points={points} fill="transparent" className="cursor-pointer hover:fill-white/10 transition-all duration-200" onClick={() => onLayerClick(level)} />

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
        })()}

        {/* Fragmentation Illustration embedded in layer 5 */}
        {(() => {
          const bounds = layerBounds[5];
          const centerY = (bounds.top + bounds.bottom) / 2;
          const leftX = getLeftX(centerY);
          const rightX = getRightX(centerY);
          const availableWidth = rightX - leftX;
          const width = availableWidth * 0.95;
          const startX = leftX + (availableWidth - width) / 2;
          
          return (
            <foreignObject x={startX} y={bounds.top + 10} width={width} height={bounds.bottom - bounds.top - 20}>
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <FragmentationIllustration onNodeClick={handleModuleClick} />
              </div>
            </foreignObject>
          );
        })()}

        {/* Transformational Illustration in layer 1 */}
        {(() => {
          const bounds = layerBounds[1];
          const height = 80;
          const yPosition = bounds.bottom - height - 24;
          const leftX = getLeftX(yPosition + height / 2);
          const rightX = getRightX(yPosition + height / 2);
          const availableWidth = rightX - leftX;
          const width = Math.min(availableWidth * 0.88, 360);
          const startX = (leftX + rightX) / 2 - width / 2;
          
          return (
            <foreignObject x={startX} y={yPosition} width={width} height={height} style={{ overflow: 'visible' }}>
              <div className="w-full h-full flex items-center justify-center">
                <TransformationalIllustration onNodeClick={handleModuleClick} />
              </div>
            </foreignObject>
          );
        })()}

        {/* Metrics Gauges in layer 2 */}
        {(() => {
          const bounds = layerBounds[2];
          const centerY = (bounds.top + bounds.bottom) / 2;
          const leftX = getLeftX(centerY);
          const rightX = getRightX(centerY);
          const width = rightX - leftX;
          const centerX = (leftX + rightX) / 2;
          
          return (
            <foreignObject x={centerX - width * 0.48} y={bounds.top + 12} width={width * 0.96} height={bounds.bottom - bounds.top - 24}>
              <div className="w-full h-full flex items-center justify-center rounded-lg bg-card/60 backdrop-blur-sm ring-2 ring-border/60">
                <MetricsGauges onMetricClick={handleModuleClick} />
              </div>
            </foreignObject>
          );
        })()}

        {/* Triple Loop in layer 3 */}
        {(() => {
          const bounds = layerBounds[3];
          const centerY = (bounds.top + bounds.bottom) / 2;
          const leftX = getLeftX(centerY);
          const rightX = getRightX(centerY);
          const availableWidth = rightX - leftX;
          const width = availableWidth * 0.82;
          const startX = leftX + (availableWidth - width) / 2;
          
          return (
            <foreignObject x={startX} y={bounds.top + 16} width={width} height={bounds.bottom - bounds.top - 32}>
              <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg bg-card/60 backdrop-blur-sm ring-2 ring-border/60">
                <TripleLoop onModuleClick={handleModuleClick} />
              </div>
            </foreignObject>
          );
        })()}

        {/* Outer pyramid edge highlights */}
        <path d={`M${apexX},${apexY} L${leftBaseX},${baseY}`} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.15" />
        <path d={`M${apexX},${apexY} L${rightBaseX},${baseY}`} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.25" />
        <path d={`M${leftBaseX},${baseY} L${rightBaseX},${baseY}`} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.1" />
      </svg>

      {/* Ambient glow effect */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 40% 50%, ${
            layerColors[activeLayer as keyof typeof layerColors]?.glow || "hsl(199, 89%, 48%)"
          } 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default Pyramid3D;