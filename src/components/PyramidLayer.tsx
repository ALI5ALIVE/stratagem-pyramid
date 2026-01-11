import { ReactNode } from "react";

interface PyramidLayerProps {
  level: number;
  label: string;
  sublabel: string;
  isActive: boolean;
  onClick: () => void;
  colorClass: string;
  glowClass: string;
  children?: ReactNode;
}

const PyramidLayer = ({
  level,
  label,
  sublabel,
  isActive,
  onClick,
  colorClass,
  glowClass,
  children,
}: PyramidLayerProps) => {
  // Calculate trapezoid widths based on level (1 = top/smallest, 4 = bottom/largest)
  const widthPercentages = {
    1: { top: 40, bottom: 55 },
    2: { top: 55, bottom: 70 },
    3: { top: 70, bottom: 85 },
    4: { top: 85, bottom: 100 },
  };

  const { top, bottom } = widthPercentages[level as keyof typeof widthPercentages];
  const height = level === 4 ? 140 : 90; // Foundation layer is taller to accommodate infinity loop

  // Create trapezoid clip path
  const topOffset = (100 - top) / 2;
  const bottomOffset = (100 - bottom) / 2;
  const clipPath = `polygon(${topOffset}% 0%, ${100 - topOffset}% 0%, ${100 - bottomOffset}% 100%, ${bottomOffset}% 100%)`;

  return (
    <button
      onClick={onClick}
      className={`pyramid-layer w-full relative group ${isActive ? "pyramid-layer-active z-10" : ""}`}
      style={{ height: `${height}px` }}
    >
      {/* Layer background */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${colorClass} ${
          isActive ? glowClass : ""
        }`}
        style={{
          clipPath,
          opacity: isActive ? 1 : 0.7,
        }}
      />

      {/* Hover/Active border glow */}
      <div
        className={`absolute inset-0 transition-all duration-300 border-2 ${
          isActive ? "border-white/30" : "border-transparent group-hover:border-white/20"
        }`}
        style={{ clipPath }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-4"
        style={{ clipPath }}
      >
        {/* Level indicator */}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60 mb-1">
          Layer {level}
        </span>

        {/* Main label */}
        <h3 className="text-sm md:text-base font-display font-bold text-white text-center leading-tight">
          {label}
        </h3>

        {/* Sublabel */}
        <p className="text-[10px] md:text-xs text-white/70 text-center mt-1 max-w-[80%]">
          {sublabel}
        </p>

        {/* Children (infinity loop for foundation) */}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </button>
  );
};

export default PyramidLayer;
