import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../theme";
import { DISPLAY, BODY } from "../components/Type";

const SCENES = [
  { label: "Frontline crew", icon: "👷" },
  { label: "Flight deck", icon: "✈" },
  { label: "Control room", icon: "▦" },
  { label: "Rail platform", icon: "🚆" },
];

const OUTCOMES = [
  { kicker: "Time", value: "–70%", label: "time-to-resolve cross-silo signals", color: COLORS.detect, at: 140 },
  { kicker: "Cost", value: "–30%", label: "operational coordination cost", color: COLORS.trigger, at: 220 },
  { kicker: "Outcomes", value: "3×", label: "more proactive interventions before incident", color: COLORS.prove, at: 300 },
];

export const Act5_Value: React.FC = () => {
  const frame = useCurrentFrame();
  const headerO = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const outO = interpolate(frame, [555, 600], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ padding: "100px 140px", opacity: outO }}>
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

      {/* Outcomes panel — Time / Cost / Outcomes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36 }}>
        {OUTCOMES.map((o) => {
          const op = interpolate(frame, [o.at, o.at + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const y = interpolate(frame, [o.at, o.at + 40], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={o.kicker}
              style={{
                opacity: op,
                transform: `translateY(${y}px)`,
                borderTop: `2px solid ${o.color}`,
                paddingTop: 22,
              }}
            >
              <div
                style={{
                  fontFamily: BODY,
                  color: o.color,
                  fontSize: 14,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                }}
              >
                {o.kicker}
              </div>
              <div
                style={{
                  fontFamily: DISPLAY,
                  color: COLORS.type,
                  fontSize: 130,
                  fontWeight: 700,
                  letterSpacing: -5,
                  lineHeight: 1,
                  marginTop: 10,
                }}
              >
                {o.value}
              </div>
              <div
                style={{
                  fontFamily: BODY,
                  color: COLORS.typeDim,
                  fontSize: 18,
                  marginTop: 12,
                  lineHeight: 1.4,
                  maxWidth: 320,
                }}
              >
                {o.label}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          fontFamily: BODY,
          color: COLORS.typeDim,
          fontSize: 16,
          letterSpacing: 3,
          textTransform: "uppercase",
          marginTop: 40,
          opacity: interpolate(frame, [380, 430], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        Not a faster silo. A different operation.
      </div>
    </AbsoluteFill>
  );
};