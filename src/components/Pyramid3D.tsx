import { ReactNode } from "react";

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
  children?: ReactNode;
}

const Pyramid3D = ({ layers, activeLayer, onLayerClick, children }: Pyramid3DProps) => {
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

  // Generate polygon points for each layer
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

        {/* Render layers from bottom to top (4 to 1) */}
        {[4, 3, 2, 1].map((level) => {
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

      {/* Infinity loop positioned below pyramid */}
      {children && (
        <div className="mt-4 relative z-10">
          {children}
        </div>
      )}

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
