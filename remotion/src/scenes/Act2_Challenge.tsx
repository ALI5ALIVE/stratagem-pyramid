import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { DISPLAY, BODY } from "../components/Type";

const SILOS = [
  { label: "Safety", tint: "#3a4252" },
  { label: "Operations", tint: "#3f4858" },
  { label: "Engineering", tint: "#444e5f" },
  { label: "Compliance", tint: "#49546a" },
];

const STATS = [
  { value: "~65%", label: "of operational signals never make it home", at: 180 },
  { value: "$25–35B", label: "annual industry exposure", at: 320 },
  { value: "~35%", label: "accuracy of generic AI in operational decisions", at: 460 },
];

export const Act2_Challenge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ padding: "120px 160px" }}>
      <div
        style={{
          fontFamily: BODY,
          color: COLORS.typeDim,
          letterSpacing: 8,
          textTransform: "uppercase",
          fontSize: 16,
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Act 02 · The silo era
      </div>
      <h2
        style={{
          fontFamily: DISPLAY,
          color: COLORS.type,
          fontWeight: 500,
          fontSize: 64,
          lineHeight: 1.05,
          letterSpacing: -1.5,
          margin: "20px 0 60px",
          maxWidth: 1100,
          opacity: interpolate(frame, [20, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Four systems. One reality. <span style={{ color: COLORS.typeDim }}>No shared truth.</span>
      </h2>

      {/* silos */}
      <div style={{ position: "relative", height: 460, display: "flex", gap: 36, alignItems: "flex-end" }}>
        {SILOS.map((s, i) => {
          const rise = spring({ frame: frame - (40 + i * 10), fps, config: { damping: 18, stiffness: 90 } });
          const h = 380 * rise;
          return (
            <div key={s.label} style={{ flex: 1, position: "relative", height: 460 }}>
              <div
                style={{
                  position: "absolute",
                  bottom: 50,
                  left: 0,
                  right: 0,
                  height: h,
                  background: `linear-gradient(180deg, ${s.tint} 0%, #1c2230 100%)`,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: "1px solid rgba(255,255,255,0.05)",
                  borderRight: "1px solid rgba(0,0,0,0.4)",
                }}
              >
                {/* signal dots that die at walls */}
                {[0, 1, 2].map((d) => {
                  const cycle = 70;
                  const local = (frame + i * 20 + d * 22) % cycle;
                  const o = local < 50 ? interpolate(local, [0, 25, 50], [0, 0.9, 0]) : 0;
                  const y = interpolate(local, [0, 50], [h - 30, 30]);
                  return (
                    <div
                      key={d}
                      style={{
                        position: "absolute",
                        left: `${20 + d * 30}%`,
                        top: y,
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: COLORS.detect,
                        opacity: o,
                        boxShadow: `0 0 16px ${COLORS.detect}`,
                      }}
                    />
                  );
                })}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontFamily: BODY,
                  color: COLORS.typeDim,
                  fontSize: 18,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  opacity: interpolate(frame, [50 + i * 10, 90 + i * 10], [0, 1], { extrapolateRight: "clamp" }),
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* stats overlay */}
      <div style={{ display: "flex", gap: 80, marginTop: 60 }}>
        {STATS.map((s) => {
          const o = interpolate(frame, [s.at, s.at + 30], [0, 1], { extrapolateRight: "clamp" });
          const y = interpolate(frame, [s.at, s.at + 30], [20, 0], { extrapolateRight: "clamp" });
          return (
            <div key={s.value} style={{ flex: 1, opacity: o, transform: `translateY(${y}px)` }}>
              <div style={{ fontFamily: DISPLAY, color: COLORS.type, fontSize: 72, fontWeight: 500, letterSpacing: -2 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: BODY, color: COLORS.typeDim, fontSize: 18, maxWidth: 320, marginTop: 8 }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};