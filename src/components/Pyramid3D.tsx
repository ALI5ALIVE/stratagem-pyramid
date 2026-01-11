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
  // Layer configurations for isometric pyramid
  // Width decreases as we go up (level 1 = top, level 4 = bottom)
  const layerConfig = {
    1: { width: 80, leftFaceWidth: 32, height: 70 },
    2: { width: 160, leftFaceWidth: 64, height: 60 },
    3: { width: 240, leftFaceWidth: 96, height: 60 },
    4: { width: 320, leftFaceWidth: 128, height: 70 },
  };

  // Colors for each layer (matching the design system)
  const layerColors = {
    1: { main: "hsl(45, 93%, 58%)", dark: "hsl(45, 93%, 40%)", light: "hsl(45, 93%, 65%)" },
    2: { main: "hsl(280, 65%, 55%)", dark: "hsl(280, 65%, 38%)", light: "hsl(280, 65%, 62%)" },
    3: { main: "hsl(173, 80%, 40%)", dark: "hsl(173, 80%, 28%)", light: "hsl(173, 80%, 50%)" },
    4: { main: "hsl(199, 89%, 48%)", dark: "hsl(199, 89%, 32%)", light: "hsl(199, 89%, 55%)" },
  };

  // Sort layers for rendering (bottom to top)
  const sortedLayers = [...layers].sort((a, b) => b.level - a.level);

  return (
    <div className="relative w-full flex items-center justify-center py-8">
      {/* Pyramid container with perspective */}
      <div className="relative" style={{ perspective: "1000px" }}>
        {/* Stack layers from bottom to top */}
        <div className="relative flex flex-col-reverse items-center">
          {sortedLayers.map((layer) => {
            const config = layerConfig[layer.level as keyof typeof layerConfig];
            const colors = layerColors[layer.level as keyof typeof layerColors];
            const isActive = activeLayer === layer.level;
            const isTop = layer.level === 1;

            return (
              <button
                key={layer.id}
                onClick={() => onLayerClick(layer.level)}
                className={`relative transition-all duration-300 ease-out group ${
                  isActive ? "z-20 scale-105" : "hover:scale-[1.02]"
                }`}
                style={{
                  width: `${config.width}px`,
                  height: `${config.height}px`,
                  marginBottom: layer.level === 4 ? "0" : "-2px",
                }}
              >
                {/* 3D isometric layer using SVG */}
                <svg
                  viewBox={`0 0 ${config.width} ${config.height}`}
                  className="absolute inset-0 w-full h-full overflow-visible"
                  style={{
                    filter: isActive
                      ? `drop-shadow(0 0 20px ${colors.main})`
                      : "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                  }}
                >
                  {isTop ? (
                    /* Triangular apex for top layer */
                    <>
                      {/* Left face of triangle */}
                      <polygon
                        points={`${config.width / 2},5 ${config.leftFaceWidth},${config.height - 5} ${config.width / 2},${config.height - 5}`}
                        fill={colors.dark}
                        className="transition-all duration-300"
                        style={{
                          opacity: isActive ? 1 : 0.85,
                        }}
                      />
                      {/* Right face of triangle */}
                      <polygon
                        points={`${config.width / 2},5 ${config.width / 2},${config.height - 5} ${config.width - config.leftFaceWidth},${config.height - 5}`}
                        fill={colors.main}
                        className="transition-all duration-300"
                        style={{
                          opacity: isActive ? 1 : 0.85,
                        }}
                      />
                      {/* Highlight edge */}
                      <line
                        x1={config.width / 2}
                        y1="5"
                        x2={config.width / 2}
                        y2={config.height - 5}
                        stroke={colors.light}
                        strokeWidth="2"
                        className="transition-opacity duration-300"
                        style={{ opacity: isActive ? 0.8 : 0.4 }}
                      />
                    </>
                  ) : (
                    /* Trapezoid layers */
                    <>
                      {/* Calculate trapezoid points */}
                      {(() => {
                        const topInset = config.width * 0.12;
                        const bottomInset = 0;
                        
                        // Left face (darker)
                        const leftFacePoints = `
                          ${topInset},8
                          ${config.width / 2},8
                          ${config.width / 2},${config.height - 5}
                          ${bottomInset},${config.height - 5}
                        `;
                        
                        // Right face (lighter)
                        const rightFacePoints = `
                          ${config.width / 2},8
                          ${config.width - topInset},8
                          ${config.width - bottomInset},${config.height - 5}
                          ${config.width / 2},${config.height - 5}
                        `;

                        return (
                          <>
                            <polygon
                              points={leftFacePoints}
                              fill={colors.dark}
                              className="transition-all duration-300"
                              style={{ opacity: isActive ? 1 : 0.85 }}
                            />
                            <polygon
                              points={rightFacePoints}
                              fill={colors.main}
                              className="transition-all duration-300"
                              style={{ opacity: isActive ? 1 : 0.85 }}
                            />
                            {/* Center highlight */}
                            <line
                              x1={config.width / 2}
                              y1="8"
                              x2={config.width / 2}
                              y2={config.height - 5}
                              stroke={colors.light}
                              strokeWidth="2"
                              className="transition-opacity duration-300"
                              style={{ opacity: isActive ? 0.8 : 0.3 }}
                            />
                            {/* Top edge highlight */}
                            <line
                              x1={topInset}
                              y1="8"
                              x2={config.width - topInset}
                              y2="8"
                              stroke={colors.light}
                              strokeWidth="1.5"
                              className="transition-opacity duration-300"
                              style={{ opacity: isActive ? 0.6 : 0.2 }}
                            />
                          </>
                        );
                      })()}
                    </>
                  )}
                </svg>

                {/* Layer label - positioned to the right */}
                <div
                  className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 flex items-center gap-3 whitespace-nowrap transition-all duration-300 ${
                    isActive ? "opacity-100 translate-x-0" : "opacity-70 group-hover:opacity-90"
                  }`}
                >
                  {/* Connecting line */}
                  <div
                    className="w-8 h-0.5 transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? colors.main : "hsl(222, 47%, 25%)",
                    }}
                  />
                  
                  {/* Label content */}
                  <div className="text-left">
                    <div
                      className="text-xs font-semibold uppercase tracking-widest mb-0.5 transition-colors duration-300"
                      style={{ color: isActive ? colors.main : "hsl(215, 20%, 55%)" }}
                    >
                      Layer {layer.level}
                    </div>
                    <div
                      className={`text-sm md:text-base font-display font-bold transition-colors duration-300 ${
                        isActive ? "text-foreground" : "text-foreground/70"
                      }`}
                    >
                      {layer.label}
                    </div>
                    <div className="text-xs text-muted-foreground max-w-[180px]">
                      {layer.sublabel}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Infinity loop positioned below the pyramid */}
        {children && (
          <div className="flex justify-center mt-4">
            {children}
          </div>
        )}

        {/* Ambient glow effect */}
        <div
          className="absolute inset-0 -z-10 blur-3xl opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${
              layerColors[activeLayer as keyof typeof layerColors]?.main || "hsl(199, 89%, 48%)"
            } 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Pyramid3D;
