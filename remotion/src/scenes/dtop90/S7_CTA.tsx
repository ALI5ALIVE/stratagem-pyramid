import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, HEAD, BODY, springIn, stageFade } from "./shared";

export const S7_CTA: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = stageFade(frame, durationInFrames);

  const logoA = springIn(frame, fps, 6);
  const headA = springIn(frame, fps, 20);
  const subA = springIn(frame, fps, 36);
  const btnA = springIn(frame, fps, 56);
  const pulse = 0.95 + 0.05 * Math.sin(frame / 8);

  return (
    <AbsoluteFill style={{ opacity, color: COLORS.ink, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        opacity: logoA, transform: `scale(${0.9 + logoA * 0.1})`,
        fontFamily: HEAD, fontSize: 84, fontWeight: 700, letterSpacing: 2,
        background: `linear-gradient(120deg, ${COLORS.detect}, ${COLORS.primary}, ${COLORS.prove})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        Comply365
      </div>

      <div style={{
        opacity: headA, transform: `translateY(${(1 - headA) * 12}px)`,
        fontFamily: HEAD, fontSize: 48, fontWeight: 500, color: COLORS.ink, marginTop: 28, textAlign: "center",
      }}>
        Stop chasing alerts.<br/>Start orchestrating your operations.
      </div>

      <div style={{
        opacity: subA, marginTop: 28,
        fontFamily: BODY, fontSize: 22, color: COLORS.inkDim, letterSpacing: 2,
      }}>
        See a DTOP loop for your most critical scenario.
      </div>

      <div style={{
        opacity: btnA, transform: `scale(${pulse})`,
        marginTop: 56,
        padding: "22px 48px",
        background: COLORS.primary,
        borderRadius: 999,
        fontFamily: HEAD, fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: 1,
        boxShadow: `0 12px 60px rgba(0,102,255,0.55)`,
      }}>
        See Your DTOP Loop in Action  →
      </div>

      <div style={{
        marginTop: 60, fontFamily: BODY, fontSize: 16, color: COLORS.inkDim, letterSpacing: 6,
        opacity: subA,
      }}>
        COMPLY365 · SAFETYMANAGER365 · CONTENTMANAGER365
      </div>
    </AbsoluteFill>
  );
};