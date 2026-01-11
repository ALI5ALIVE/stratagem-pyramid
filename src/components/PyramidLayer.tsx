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
  // Level 1 is a triangle (top width = 0), others are trapezoids
  const widthPercentages = {
    1: { top: 0, bottom: 35 },      // Triangle
    2: { top: 35, bottom: 60 },     // Trapezoid
    3: { top: 60, bottom: 80 },     // Trapezoid
    4: { top: 80, bottom: 100 },    // Trapezoid (base)
  };

  const { top, bottom } = widthPercentages[level as keyof typeof widthPercentages];
  const height = level === 4 ? 140 : 120; // Equal height, Foundation slightly taller for infinity loop

  // Create clip path - triangle for level 1, trapezoid for others
  const topOffset = (100 - top) / 2;
  const bottomOffset = (100 - bottom) / 2;
  const clipPath = level === 1
    ? `polygon(50% 0%, ${100 - bottomOffset}% 100%, ${bottomOffset}% 100%)`
    : `polygon(${topOffset}% 0%, ${100 - topOffset}% 0%, ${100 - bottomOffset}% 100%, ${bottomOffset}% 100%)`;

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
