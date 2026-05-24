import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../theme";
import { DISPLAY, BODY } from "../components/Type";

const LINE = "Every operator runs on signals they'll never see.";

export const Act1_Pain: React.FC = () => {
  const frame = useCurrentFrame();
  // type-in over 90 frames starting at frame 60
  const chars = Math.max(0, Math.min(LINE.length, Math.floor((frame - 60) / 2.2)));
  const text = LINE.slice(0, chars);
  // heartbeat pulse — stronger, more visible cardiac rhythm
  const beat = 0.5 + 0.5 * Math.abs(Math.sin(frame / 12));
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
        {/* heartbeat dot — pronounced pulse */}
        <div style={{ marginTop: 80, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: COLORS.signal,
              transform: `scale(${0.7 + beat * 1.1})`,
              boxShadow: `0 0 ${30 + beat * 70}px ${beat * 6}px ${COLORS.signal}`,
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};