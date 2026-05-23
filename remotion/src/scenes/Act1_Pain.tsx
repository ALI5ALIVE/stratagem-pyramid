import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../theme";
import { DISPLAY, BODY } from "../components/Type";

const LINE = "Every operator runs on signals they'll never see.";

export const Act1_Pain: React.FC = () => {
  const frame = useCurrentFrame();
  // type-in over 90 frames starting at frame 60
  const chars = Math.max(0, Math.min(LINE.length, Math.floor((frame - 60) / 2.2)));
  const text = LINE.slice(0, chars);
  // heartbeat pulse
  const beat = 0.4 + 0.6 * Math.abs(Math.sin(frame / 14));
  const lineOpacity = interpolate(frame, [30, 90], [0, 1], { extrapolateRight: "clamp" });
  const eyebrow = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [400, 450], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeOut, alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 1400, textAlign: "center" }}>
        <div
          style={{
            fontFamily: BODY,
            color: COLORS.typeDim,
            letterSpacing: 8,
            textTransform: "uppercase",
            fontSize: 18,
            opacity: eyebrow,
            marginBottom: 60,
          }}
        >
          Act 01 · The silent room
        </div>
        <div
          style={{
            fontFamily: DISPLAY,
            color: COLORS.type,
            fontWeight: 500,
            fontSize: 78,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            opacity: lineOpacity,
          }}
        >
          {text}
          <span style={{ opacity: chars < LINE.length ? beat : 0, marginLeft: 6 }}>|</span>
        </div>
        {/* heartbeat dot */}
        <div style={{ marginTop: 80, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: COLORS.signal,
              transform: `scale(${0.8 + beat * 0.6})`,
              boxShadow: `0 0 ${20 + beat * 40}px ${COLORS.signal}`,
              opacity: 0.7,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};