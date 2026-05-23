import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../theme";
import { DISPLAY, BODY } from "../components/Type";

const SCENES = [
  { label: "Frontline crew", icon: "👷" },
  { label: "Flight deck", icon: "✈" },
  { label: "Control room", icon: "▦" },
  { label: "Rail platform", icon: "🚆" },
];

export const Act5_Value: React.FC = () => {
  const frame = useCurrentFrame();
  const headerO = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // counter 35 -> 90
  const counter = Math.round(interpolate(frame, [80, 260], [35, 90], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const baselineO = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });

  // bar fill
  const fill = interpolate(frame, [80, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ padding: "100px 140px" }}>
      <div
        style={{
          fontFamily: BODY,
          color: COLORS.typeDim,
          letterSpacing: 8,
          textTransform: "uppercase",
          fontSize: 16,
          opacity: headerO,
        }}
      >
        Act 05 · From event to control
      </div>

      <h2
        style={{
          fontFamily: DISPLAY,
          color: COLORS.type,
          fontWeight: 500,
          fontSize: 56,
          letterSpacing: -1.2,
          margin: "16px 0 50px",
          opacity: headerO,
        }}
      >
        The operation, finally <span style={{ color: COLORS.prove }}>in concert</span>.
      </h2>

      {/* Operation row */}
      <div style={{ display: "flex", gap: 24, marginBottom: 60 }}>
        {SCENES.map((s, i) => {
          const o = interpolate(frame, [40 + i * 18, 80 + i * 18], [0, 1], { extrapolateRight: "clamp" });
          const y = interpolate(frame, [40 + i * 18, 80 + i * 18], [16, 0], { extrapolateRight: "clamp" });
          return (
            <div
              key={s.label}
              style={{
                flex: 1,
                height: 160,
                borderRadius: 12,
                border: `1px solid rgba(255,255,255,0.08)`,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                padding: 24,
                opacity: o,
                transform: `translateY(${y}px)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ fontSize: 48 }}>{s.icon}</div>
              <div
                style={{
                  fontFamily: BODY,
                  color: COLORS.typeDim,
                  fontSize: 16,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginTop: 12,
                }}
              >
                {s.label}
              </div>
              {/* travelling signal pulse */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 24,
                  height: 2,
                  background:
                    "linear-gradient(90deg, transparent, rgba(16,185,129,0.0) 0%, rgba(16,185,129,0.85) 50%, rgba(16,185,129,0.0) 100%)",
                  transform: `translateX(${interpolate((frame + i * 12) % 90, [0, 90], [-100, 100])}%)`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Accuracy comparator */}
      <div style={{ opacity: baselineO, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: BODY, color: COLORS.typeDim, fontSize: 16, letterSpacing: 3, textTransform: "uppercase" }}>
            Domain accuracy at L4–5
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginTop: 16 }}>
            <div style={{ fontFamily: DISPLAY, color: COLORS.prove, fontSize: 160, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>
              {counter}<span style={{ fontSize: 70 }}>%</span>
            </div>
            <div style={{ fontFamily: DISPLAY, color: COLORS.typeFaint, fontSize: 60, fontWeight: 400, letterSpacing: -2 }}>
              vs ~35%
            </div>
          </div>
          <div style={{ fontFamily: BODY, color: COLORS.typeDim, fontSize: 18, marginTop: 8 }}>
            Operational intelligence vs generic AI.
          </div>
        </div>
        <div>
          {/* bar */}
          <div style={{ height: 14, background: "rgba(255,255,255,0.06)", borderRadius: 999, position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${35 * baselineO}%`,
                background: COLORS.typeFaint,
                borderRadius: 999,
              }}
            />
          </div>
          <div style={{ height: 14, background: "rgba(255,255,255,0.06)", borderRadius: 999, marginTop: 24, position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${90 * fill}%`,
                background: `linear-gradient(90deg, ${COLORS.detect}, ${COLORS.prove})`,
                borderRadius: 999,
                boxShadow: `0 0 24px ${COLORS.prove}`,
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};