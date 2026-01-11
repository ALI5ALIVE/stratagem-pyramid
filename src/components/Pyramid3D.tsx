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
  // Colors for each layer with text colors
  const layerConfig = {
    1: { 
      main: "hsl(45, 93%, 58%)", 
      dark: "hsl(45, 93%, 42%)", 
      light: "hsl(45, 93%, 68%)",
      textColor: "hsl(222, 47%, 10%)" // Dark text on gold
    },
    2: { 
      main: "hsl(280, 65%, 55%)", 
      dark: "hsl(280, 65%, 38%)", 
      light: "hsl(280, 65%, 65%)",
      textColor: "hsl(0, 0%, 100%)" // White text
    },
    3: { 
      main: "hsl(173, 80%, 40%)", 
      dark: "hsl(173, 80%, 28%)", 
      light: "hsl(173, 80%, 52%)",
      textColor: "hsl(0, 0%, 100%)" // White text
    },
    4: { 
      main: "hsl(199, 89%, 48%)", 
      dark: "hsl(199, 89%, 32%)", 
      light: "hsl(199, 89%, 58%)",
      textColor: "hsl(0, 0%, 100%)" // White text
    },
  };

  // Layer coordinates for a unified pyramid (viewBox 0 0 600 520)
  // Each layer has: leftFace points, rightFace points, text center position
  const pyramidGeometry = {
    1: { // Transformational - Triangle apex
      leftFace: "300,30 210,130 300,130",
      rightFace: "300,30 300,130 390,130",
      textY: 95,
      labelSize: 13,
    },
    2: { // Commercial - Trapezoid
      leftFace: "210,135 300,135 300,245 140,245",
      rightFace: "300,135 390,135 460,245 300,245",
      textY: 195,
      labelSize: 14,
    },
    3: { // Operational - Trapezoid
      leftFace: "140,250 300,250 300,370 60,370",
      rightFace: "300,250 460,250 540,370 300,370",
      textY: 315,
      labelSize: 15,
    },
    4: { // Foundation - Wide trapezoid base
      leftFace: "60,375 300,375 300,500 0,500",
      rightFace: "300,375 540,375 600,500 300,500",
      textY: 440,
      labelSize: 15,
    },
  };

  const getLayerData = (level: number) => {
    const layer = layers.find(l => l.level === level);
    return layer || { id: "", label: "", sublabel: "" };
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4">
      {/* Main pyramid SVG */}
      <svg
        viewBox="0 0 600 520"
        className="w-full max-w-[600px] h-auto"
        style={{ 
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
        }}
      >
        <defs>
          {/* Gradients for each layer */}
          {[1, 2, 3, 4].map((level) => {
            const colors = layerConfig[level as keyof typeof layerConfig];
            return (
              <linearGradient key={`grad-left-${level}`} id={`grad-left-${level}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.dark} />
                <stop offset="100%" stopColor={colors.dark} stopOpacity="0.9" />
              </linearGradient>
            );
          })}
          {[1, 2, 3, 4].map((level) => {
            const colors = layerConfig[level as keyof typeof layerConfig];
            return (
              <linearGradient key={`grad-right-${level}`} id={`grad-right-${level}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.main} />
                <stop offset="100%" stopColor={colors.light} stopOpacity="0.95" />
              </linearGradient>
            );
          })}
          
          {/* Glow filters for active states */}
          {[1, 2, 3, 4].map((level) => {
            const colors = layerConfig[level as keyof typeof layerConfig];
            return (
              <filter key={`glow-${level}`} id={`glow-${level}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feFlood floodColor={colors.main} floodOpacity="0.6" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            );
          })}
        </defs>

        {/* Render layers from bottom to top (4 to 1) for proper stacking */}
        {[4, 3, 2, 1].map((level) => {
          const geometry = pyramidGeometry[level as keyof typeof pyramidGeometry];
          const colors = layerConfig[level as keyof typeof layerConfig];
          const layerData = getLayerData(level);
          const isActive = activeLayer === level;

          return (
            <g
              key={level}
              onClick={() => onLayerClick(level)}
              className="cursor-pointer transition-all duration-300"
              style={{
                filter: isActive ? `url(#glow-${level})` : "none",
                transform: isActive ? "translateY(-3px)" : "none",
              }}
            >
              {/* Left face (darker) */}
              <polygon
                points={geometry.leftFace}
                fill={`url(#grad-left-${level})`}
                stroke={colors.dark}
                strokeWidth="1"
                className="transition-all duration-300"
                style={{
                  opacity: isActive ? 1 : 0.9,
                }}
              />
              
              {/* Right face (lighter) */}
              <polygon
                points={geometry.rightFace}
                fill={`url(#grad-right-${level})`}
                stroke={colors.main}
                strokeWidth="1"
                className="transition-all duration-300"
                style={{
                  opacity: isActive ? 1 : 0.9,
                }}
              />

              {/* Center ridge highlight */}
              <line
                x1="300"
                y1={level === 1 ? 30 : (level === 2 ? 135 : level === 3 ? 250 : 375)}
                x2="300"
                y2={level === 1 ? 130 : (level === 2 ? 245 : level === 3 ? 370 : 500)}
                stroke={colors.light}
                strokeWidth={isActive ? "3" : "2"}
                strokeOpacity={isActive ? "0.8" : "0.5"}
              />

              {/* Hover overlay */}
              <polygon
                points={`${geometry.leftFace} ${geometry.rightFace.split(' ').slice(1).join(' ')}`}
                fill="transparent"
                className="hover:fill-white/5 transition-all duration-200"
              />

              {/* Layer label text - INSIDE the layer */}
              <text
                x="300"
                y={geometry.textY - 10}
                textAnchor="middle"
                fill={colors.textColor}
                fontSize={geometry.labelSize}
                fontWeight="700"
                fontFamily="'Space Grotesk', sans-serif"
                letterSpacing="0.15em"
                className="uppercase pointer-events-none select-none"
                style={{
                  textShadow: level === 1 ? "none" : "0 1px 3px rgba(0,0,0,0.4)",
                }}
              >
                {layerData.label}
              </text>
              
              {/* Sublabel text */}
              <text
                x="300"
                y={geometry.textY + 10}
                textAnchor="middle"
                fill={colors.textColor}
                fontSize={geometry.labelSize - 2}
                fontWeight="400"
                fontFamily="'Inter', sans-serif"
                opacity={0.85}
                className="pointer-events-none select-none"
                style={{
                  textShadow: level === 1 ? "none" : "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                {layerData.sublabel}
              </text>
            </g>
          );
        })}

        {/* Outer pyramid edge highlights */}
        <path
          d="M300,30 L60,370 L0,500"
          fill="none"
          stroke="hsl(199, 89%, 60%)"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <path
          d="M300,30 L540,370 L600,500"
          fill="none"
          stroke="hsl(199, 89%, 70%)"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
      </svg>

      {/* Infinity loop positioned below pyramid */}
      {children && (
        <div className="mt-6 relative z-10">
          {children}
        </div>
      )}

      {/* Ambient glow effect behind pyramid */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-25 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center 40%, ${
            layerConfig[activeLayer as keyof typeof layerConfig]?.main || "hsl(199, 89%, 48%)"
          } 0%, transparent 60%)`,
        }}
      />
    </div>
  );
};

export default Pyramid3D;
