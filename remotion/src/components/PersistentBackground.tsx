import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

const PARTICLES = Array.from({ length: 60 }).map((_, i) => ({
  x: (i * 97) % 1920,
  y: (i * 53) % 1080,
  r: 0.6 + ((i * 13) % 17) / 12,
  speed: 0.08 + ((i * 7) % 11) / 80,
  phase: (i * 11) % 360,
}));

export const PersistentBackground: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 80% at 50% 35%, ${COLORS.bg} 0%, ${COLORS.bgDeep} 70%, #000 100%)`,
      }}
    >
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {PARTICLES.map((p, i) => {
          const y = (p.y + frame * p.speed) % 1080;
          const opacity = 0.04 + 0.06 * Math.sin((frame + p.phase) / 30);
          return <circle key={i} cx={p.x} cy={y} r={p.r} fill="#fff" opacity={opacity} />;
        })}
      </svg>
      {/* vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};