import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../theme";
import { DISPLAY, BODY } from "../components/Type";

export const Act6_Resolve: React.FC = () => {
  const frame = useCurrentFrame();

  const lineO = interpolate(frame, [10, 50], [0, 1], { extrapolateRight: "clamp" });
  const lineY = interpolate(frame, [10, 50], [16, 0], { extrapolateRight: "clamp" });
  const markO = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });
  const outO = interpolate(frame, [120, 150], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: outO }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: BODY,
            color: COLORS.typeDim,
            letterSpacing: 8,
            textTransform: "uppercase",
            fontSize: 16,
            opacity: lineO,
          }}
        >
          The master message
        </div>
        <div
          style={{
            fontFamily: DISPLAY,
            color: COLORS.type,
            fontSize: 130,
            fontWeight: 500,
            letterSpacing: -3,
            marginTop: 32,
            opacity: lineO,
            transform: `translateY(${lineY}px)`,
          }}
        >
          From event to <span style={{ color: COLORS.prove }}>control.</span>
        </div>
        <div
          style={{
            marginTop: 80,
            fontFamily: DISPLAY,
            color: COLORS.type,
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: markO,
          }}
        >
          Comply<span style={{ color: COLORS.detect }}>365</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: BODY,
            color: COLORS.typeDim,
            fontSize: 13,
            letterSpacing: 0.3,
            opacity: markO * 0.7,
          }}
        >
          Research base: 21 executive interviews across 5 countries and 3 industries.
        </div>
      </div>
    </AbsoluteFill>
  );
};