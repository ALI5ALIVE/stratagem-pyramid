import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../theme";
import { DISPLAY, BODY } from "../components/Type";

export const Act3_Turn: React.FC = () => {
  const frame = useCurrentFrame();

  const tuesdayO = interpolate(frame, [0, 30, 200, 240], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const dotPulse = 0.4 + 0.6 * Math.abs(Math.sin(frame / 8));
  const dotFade = interpolate(frame, [120, 200], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fridayO = interpolate(frame, [260, 310], [0, 1], { extrapolateRight: "clamp" });
  const outO = interpolate(frame, [450, 480], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: outO, alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 1400, textAlign: "center", position: "relative" }}>
        <div
          style={{
            fontFamily: BODY,
            color: COLORS.typeDim,
            letterSpacing: 8,
            textTransform: "uppercase",
            fontSize: 16,
            opacity: tuesdayO,
          }}
        >
          Act 03 · Tuesday, 06:14
        </div>

        <div
          style={{
            marginTop: 40,
            fontFamily: DISPLAY,
            color: COLORS.type,
            fontSize: 56,
            fontWeight: 400,
            letterSpacing: -1,
            opacity: tuesdayO,
          }}
        >
          A single signal blinks inside the Safety silo.
        </div>

        {/* lone pulsing dot */}
        <div style={{ marginTop: 100, display: "flex", justifyContent: "center", height: 120 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              background: COLORS.signal,
              opacity: dotFade * dotPulse,
              boxShadow: `0 0 ${30 + dotPulse * 60}px ${COLORS.signal}`,
              transform: `scale(${0.7 + dotPulse * 0.7})`,
            }}
          />
        </div>

        <div
          style={{
            marginTop: 40,
            fontFamily: BODY,
            color: COLORS.typeDim,
            fontSize: 22,
            letterSpacing: 2,
            opacity: interpolate(frame, [160, 210], [0, 1], { extrapolateRight: "clamp" }) * interpolate(frame, [240, 280], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          Seen by one system. Acted on by none.
        </div>

        <div
          style={{
            marginTop: 60,
            fontFamily: DISPLAY,
            color: COLORS.signal,
            fontSize: 84,
            fontWeight: 500,
            letterSpacing: -2,
            opacity: fridayO,
          }}
        >
          By Friday, it was an incident.
        </div>
      </div>
    </AbsoluteFill>
  );
};