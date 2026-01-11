import TripleLoop from "./TripleLoop";
import MetricsGauges from "./MetricsGauges";
import AIAccelerator from "./AIAccelerator";

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

const Pyramid3D = ({ layers, activeLayer, onLayerClick, onModuleClick }: Pyramid3DProps) => {
  // Colors for each layer
  const layerConfig = {
    1: { 
      main: "hsl(45, 93%, 58%)", 
      dark: "hsl(45, 93%, 45%)", 
      glow: "hsl(45, 93%, 58%)",
    },
    2: { 
      main: "hsl(280, 65%, 55%)", 
      dark: "hsl(280, 65%, 42%)", 
      glow: "hsl(280, 65%, 55%)",
    },
    3: { 
      main: "hsl(173, 80%, 40%)", 
      dark: "hsl(173, 80%, 30%)", 
      glow: "hsl(173, 80%, 40%)",
    },
    4: { 
      main: "hsl(199, 89%, 48%)", 
      dark: "hsl(199, 89%, 36%)", 
      glow: "hsl(199, 89%, 48%)",
    },
  };

  // Foundation section configuration
  const foundationSections = [
    { id: "safety", label: "Safety", sublabel: "Risk & Events" },
    { id: "content", label: "Content", sublabel: "Procedures" },
    { id: "training", label: "Training", sublabel: "Readiness" },
  ];

  // Calculate X position for any Y on the pyramid slope
  // Apex at (400, 30), left base at (40, 450), right base at (760, 450)
  const getLeftX = (y: number) => {
    const slope = (400 - 40) / (30 - 450); // dx/dy
    return 400 + slope * (y - 30);
  };

  const getRightX = (y: number) => {
    const slope = (760 - 400) / (450 - 30); // dx/dy
    return 400 + slope * (y - 30);
  };

  // Layer Y boundaries (unified straight edges)
  const layerBounds = {
    1: { top: 30, bottom: 135 },   // Transformational
    2: { top: 135, bottom: 240 },  // Commercial
    3: { top: 240, bottom: 345 },  // Operational
    4: { top: 345, bottom: 450 },  // Foundation
  };

  // Generate polygon points for each layer (excluding Foundation which is split)
  const getLayerPoints = (level: number) => {
    const bounds = layerBounds[level as keyof typeof layerBounds];
    const topLeftX = getLeftX(bounds.top);
    const topRightX = getRightX(bounds.top);
    const bottomLeftX = getLeftX(bounds.bottom);
    const bottomRightX = getRightX(bounds.bottom);

    if (level === 1) {
      // Triangle apex
      return `400,${bounds.top} ${bottomRightX},${bounds.bottom} ${bottomLeftX},${bounds.bottom}`;
    }
    // Trapezoid
    return `${topLeftX},${bounds.top} ${topRightX},${bounds.top} ${bottomRightX},${bounds.bottom} ${bottomLeftX},${bounds.bottom}`;
  };

  // Get Foundation section polygon points (divides foundation into 3 parts)
  const getFoundationSectionPoints = (sectionIndex: number) => {
    const bounds = layerBounds[4];
    const topLeftX = getLeftX(bounds.top);
    const topRightX = getRightX(bounds.top);
    const bottomLeftX = getLeftX(bounds.bottom);
    const bottomRightX = getRightX(bounds.bottom);

    const topWidth = topRightX - topLeftX;
    const bottomWidth = bottomRightX - bottomLeftX;

    // Calculate section boundaries
    const sectionTopLeft = topLeftX + (topWidth / 3) * sectionIndex;
    const sectionTopRight = topLeftX + (topWidth / 3) * (sectionIndex + 1);
    const sectionBottomLeft = bottomLeftX + (bottomWidth / 3) * sectionIndex;
    const sectionBottomRight = bottomLeftX + (bottomWidth / 3) * (sectionIndex + 1);

    return `${sectionTopLeft},${bounds.top} ${sectionTopRight},${bounds.top} ${sectionBottomRight},${bounds.bottom} ${sectionBottomLeft},${bounds.bottom}`;
  };

  const getLayerData = (level: number) => {
    const layer = layers.find(l => l.level === level);
    return layer || { id: "", label: "", sublabel: "" };
  };

  // Label positions (right side of pyramid with connecting lines)
  const labelPositions = {
    1: { y: 82, lineEndX: 520 },
    2: { y: 187, lineEndX: 580 },
    3: { y: 292, lineEndX: 640 },
    4: { y: 397, lineEndX: 700 },
  };

  // Get center position for the triple loop in operational layer
  const operationalBounds = layerBounds[3];
  const operationalCenterY = (operationalBounds.top + operationalBounds.bottom) / 2;
  const operationalLeftX = getLeftX(operationalCenterY);
  const operationalRightX = getRightX(operationalCenterY);
  const operationalWidth = operationalRightX - operationalLeftX;
  const operationalCenterX = (operationalLeftX + operationalRightX) / 2;

  // Foundation section center calculations
  const foundationBounds = layerBounds[4];
  const foundationCenterY = (foundationBounds.top + foundationBounds.bottom) / 2;

  const handleModuleClick = (module: string) => {
    if (onModuleClick) {
      onModuleClick(module);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4">
      {/* Main pyramid with labels SVG */}
      <svg
        viewBox="0 0 950 480"
        className="w-full max-w-[900px] h-auto"
        style={{ 
          filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))",
        }}
      >
        <defs>
          {/* Gradients for each layer - vertical gradient for depth */}
          {[1, 2, 3, 4].map((level) => {
            const colors = layerConfig[level as keyof typeof layerConfig];
            return (
              <linearGradient key={`grad-${level}`} id={`layer-grad-${level}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.main} />
                <stop offset="100%" stopColor={colors.dark} />
              </linearGradient>
            );
          })}

          {/* Slightly varied foundation section gradients */}
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
          
          {/* Glow filters for active states */}
          {[1, 2, 3, 4].map((level) => {
            const colors = layerConfig[level as keyof typeof layerConfig];
            return (
              <filter key={`glow-${level}`} id={`active-glow-${level}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feFlood floodColor={colors.glow} floodOpacity="0.7" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            );
          })}

          {/* Subtle inner shadow for depth */}
          <filter id="inner-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset dx="0" dy="2" />
            <feGaussianBlur stdDeviation="2" result="shadow" />
            <feComposite in="SourceGraphic" in2="shadow" operator="over" />
          </filter>
        </defs>

        {/* Render layers 1-3 (Foundation is handled separately) */}
        {[3, 2, 1].map((level) => {
          const points = getLayerPoints(level);
          const colors = layerConfig[level as keyof typeof layerConfig];
          const isActive = activeLayer === level;
          const bounds = layerBounds[level as keyof typeof layerBounds];
          const labelPos = labelPositions[level as keyof typeof labelPositions];
          const layerData = getLayerData(level);

          // Calculate the right edge X at the layer's vertical center for the connector line
          const centerY = (bounds.top + bounds.bottom) / 2;
          const rightEdgeX = getRightX(centerY);

          return (
            <g key={level}>
              {/* Main layer polygon */}
              <polygon
                points={points}
                fill={`url(#layer-grad-${level})`}
                stroke={colors.main}
                strokeWidth={isActive ? "2" : "1"}
                className="cursor-pointer transition-all duration-300"
                onClick={() => onLayerClick(level)}
                style={{
                  filter: isActive ? `url(#active-glow-${level})` : "none",
                  opacity: isActive ? 1 : 0.85,
                }}
              />

              {/* Top edge highlight for 3D effect (except apex) */}
              {level !== 1 && (
                <line
                  x1={getLeftX(bounds.top)}
                  y1={bounds.top}
                  x2={getRightX(bounds.top)}
                  y2={bounds.top}
                  stroke="white"
                  strokeWidth="1"
                  strokeOpacity={isActive ? "0.4" : "0.2"}
                />
              )}

              {/* Hover overlay */}
              <polygon
                points={points}
                fill="transparent"
                className="cursor-pointer hover:fill-white/10 transition-all duration-200"
                onClick={() => onLayerClick(level)}
              />

              {/* Connecting line from pyramid to label */}
              <line
                x1={rightEdgeX + 5}
                y1={labelPos.y}
                x2={labelPos.lineEndX}
                y2={labelPos.y}
                stroke={isActive ? colors.main : "hsl(222, 30%, 30%)"}
                strokeWidth={isActive ? "2" : "1"}
                strokeDasharray={isActive ? "none" : "4 4"}
                className="transition-all duration-300"
              />

              {/* Connector dot on pyramid edge */}
              <circle
                cx={rightEdgeX + 5}
                cy={labelPos.y}
                r={isActive ? "5" : "3"}
                fill={isActive ? colors.main : "hsl(222, 30%, 40%)"}
                className="transition-all duration-300"
              />

              {/* Label group (right side) */}
              <g
                className="cursor-pointer"
                onClick={() => onLayerClick(level)}
              >
                {/* Label background for readability */}
                <rect
                  x={labelPos.lineEndX + 10}
                  y={labelPos.y - 24}
                  width="220"
                  height="48"
                  rx="6"
                  fill={isActive ? "hsl(222, 47%, 12%)" : "transparent"}
                  stroke={isActive ? colors.main : "transparent"}
                  strokeWidth="1"
                  className="transition-all duration-300"
                />

                {/* Layer name */}
                <text
                  x={labelPos.lineEndX + 20}
                  y={labelPos.y - 4}
                  fill={isActive ? colors.main : "hsl(210, 40%, 80%)"}
                  fontSize="14"
                  fontWeight="700"
                  fontFamily="'Space Grotesk', sans-serif"
                  letterSpacing="0.08em"
                  className="uppercase transition-all duration-300"
                >
                  {layerData.label}
                </text>
                
                {/* Sublabel */}
                <text
                  x={labelPos.lineEndX + 20}
                  y={labelPos.y + 16}
                  fill={isActive ? "hsl(210, 40%, 90%)" : "hsl(215, 20%, 55%)"}
                  fontSize="12"
                  fontWeight="400"
                  fontFamily="'Inter', sans-serif"
                  className="transition-all duration-300"
                >
                  {layerData.sublabel}
                </text>
              </g>
            </g>
          );
        })}

        {/* Foundation Layer - Split into 3 connected sections */}
        <g>
          {foundationSections.map((section, index) => {
            const points = getFoundationSectionPoints(index);
            const isActive = activeLayer === 4;
            const colors = layerConfig[4];

            // Calculate section center for labels
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
                {/* Section polygon */}
                <polygon
                  points={points}
                  fill={`url(#foundation-section-${index})`}
                  stroke={colors.main}
                  strokeWidth={isActive ? "2" : "1"}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => {
                    onLayerClick(4);
                    handleModuleClick(section.id);
                  }}
                  style={{
                    filter: isActive ? `url(#active-glow-4)` : "none",
                    opacity: isActive ? 1 : 0.85,
                  }}
                />

                {/* Hover overlay */}
                <polygon
                  points={points}
                  fill="transparent"
                  className="cursor-pointer hover:fill-white/10 transition-all duration-200"
                  onClick={() => {
                    onLayerClick(4);
                    handleModuleClick(section.id);
                  }}
                />

                {/* Section label */}
                <text
                  x={sectionCenterX}
                  y={foundationCenterY - 6}
                  textAnchor="middle"
                  fill="hsl(210, 40%, 98%)"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="'Space Grotesk', sans-serif"
                  letterSpacing="0.05em"
                  className="uppercase pointer-events-none select-none"
                >
                  {section.label}
                </text>
                <text
                  x={sectionCenterX}
                  y={foundationCenterY + 12}
                  textAnchor="middle"
                  fill="hsl(210, 40%, 80%)"
                  fontSize="9"
                  fontWeight="400"
                  fontFamily="'Inter', sans-serif"
                  className="pointer-events-none select-none"
                >
                  {section.sublabel}
                </text>
              </g>
            );
          })}

          {/* Connecting bridges between foundation sections */}
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
                {/* Vertical divider line */}
                <line
                  x1={dividerTopX}
                  y1={foundationBounds.top}
                  x2={dividerBottomX}
                  y2={foundationBounds.bottom}
                  stroke="hsl(199, 89%, 60%)"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
                
                {/* Connection dots at top and bottom */}
                <circle
                  cx={dividerTopX}
                  cy={foundationBounds.top + 15}
                  r="4"
                  fill="hsl(199, 89%, 65%)"
                  className="animate-pulse-glow"
                />
                <circle
                  cx={dividerBottomX}
                  cy={foundationBounds.bottom - 15}
                  r="4"
                  fill="hsl(199, 89%, 65%)"
                  className="animate-pulse-glow"
                />
              </g>
            );
          })}

          {/* Top edge highlight for Foundation */}
          <line
            x1={getLeftX(foundationBounds.top)}
            y1={foundationBounds.top}
            x2={getRightX(foundationBounds.top)}
            y2={foundationBounds.top}
            stroke="white"
            strokeWidth="1"
            strokeOpacity={activeLayer === 4 ? "0.4" : "0.2"}
          />

          {/* Foundation label (right side) */}
          {(() => {
            const labelPos = labelPositions[4];
            const centerY = (foundationBounds.top + foundationBounds.bottom) / 2;
            const rightEdgeX = getRightX(centerY);
            const layerData = getLayerData(4);
            const isActive = activeLayer === 4;
            const colors = layerConfig[4];

            return (
              <g>
                {/* Connecting line from pyramid to label */}
                <line
                  x1={rightEdgeX + 5}
                  y1={labelPos.y}
                  x2={labelPos.lineEndX}
                  y2={labelPos.y}
                  stroke={isActive ? colors.main : "hsl(222, 30%, 30%)"}
                  strokeWidth={isActive ? "2" : "1"}
                  strokeDasharray={isActive ? "none" : "4 4"}
                  className="transition-all duration-300"
                />

                {/* Connector dot */}
                <circle
                  cx={rightEdgeX + 5}
                  cy={labelPos.y}
                  r={isActive ? "5" : "3"}
                  fill={isActive ? colors.main : "hsl(222, 30%, 40%)"}
                  className="transition-all duration-300"
                />

                {/* Label group */}
                <g
                  className="cursor-pointer"
                  onClick={() => onLayerClick(4)}
                >
                  <rect
                    x={labelPos.lineEndX + 10}
                    y={labelPos.y - 24}
                    width="220"
                    height="48"
                    rx="6"
                    fill={isActive ? "hsl(222, 47%, 12%)" : "transparent"}
                    stroke={isActive ? colors.main : "transparent"}
                    strokeWidth="1"
                    className="transition-all duration-300"
                  />
                  <text
                    x={labelPos.lineEndX + 20}
                    y={labelPos.y - 4}
                    fill={isActive ? colors.main : "hsl(210, 40%, 80%)"}
                    fontSize="14"
                    fontWeight="700"
                    fontFamily="'Space Grotesk', sans-serif"
                    letterSpacing="0.08em"
                    className="uppercase transition-all duration-300"
                  >
                    {layerData.label}
                  </text>
                  <text
                    x={labelPos.lineEndX + 20}
                    y={labelPos.y + 16}
                    fill={isActive ? "hsl(210, 40%, 90%)" : "hsl(215, 20%, 55%)"}
                    fontSize="12"
                    fontWeight="400"
                    fontFamily="'Inter', sans-serif"
                    className="transition-all duration-300"
                  >
                    {layerData.sublabel}
                  </text>
                </g>
              </g>
            );
          })()}
        </g>

        {/* AI Accelerator embedded in Transformational layer */}
        {(() => {
          const bounds = layerBounds[1];
          const centerY = (bounds.top + bounds.bottom) / 2;
          const leftX = getLeftX(centerY);
          const rightX = getRightX(centerY);
          const width = rightX - leftX;
          const centerX = (leftX + rightX) / 2;
          
          return (
            <foreignObject
              x={centerX - width * 0.45}
              y={bounds.top + 12}
              width={width * 0.9}
              height={bounds.bottom - bounds.top - 20}
            >
              <div className="w-full h-full flex items-center justify-center">
                <AIAccelerator onNodeClick={handleModuleClick} />
              </div>
            </foreignObject>
          );
        })()}

        {/* Metrics Gauges embedded in Commercial layer */}
        {(() => {
          const bounds = layerBounds[2];
          const centerY = (bounds.top + bounds.bottom) / 2;
          const leftX = getLeftX(centerY);
          const rightX = getRightX(centerY);
          const width = rightX - leftX;
          const centerX = (leftX + rightX) / 2;
          
          return (
            <foreignObject
              x={centerX - width * 0.42}
              y={bounds.top + 10}
              width={width * 0.84}
              height={bounds.bottom - bounds.top - 18}
            >
              <div className="w-full h-full flex items-center justify-center">
                <MetricsGauges onMetricClick={handleModuleClick} />
              </div>
            </foreignObject>
          );
        })()}

        {/* Triple Loop embedded in Operational layer */}
        <foreignObject
          x={operationalCenterX - operationalWidth * 0.4}
          y={operationalBounds.top + 8}
          width={operationalWidth * 0.8}
          height={operationalBounds.bottom - operationalBounds.top - 16}
        >
          <div className="w-full h-full flex items-center justify-center">
            <TripleLoop onModuleClick={handleModuleClick} />
          </div>
        </foreignObject>

        {/* Outer pyramid edge highlights for polish */}
        <path
          d="M400,30 L40,450"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.15"
        />
        <path
          d="M400,30 L760,450"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.25"
        />
        <path
          d="M40,450 L760,450"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.1"
        />
      </svg>

      {/* Ambient glow effect behind pyramid */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 40% 50%, ${
            layerConfig[activeLayer as keyof typeof layerConfig]?.glow || "hsl(199, 89%, 48%)"
          } 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default Pyramid3D;
