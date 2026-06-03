import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, HEAD, BODY, springIn, stageFade } from "./shared";

const DOMINOES = 8;

export const S3_Trigger: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = stageFade(frame, durationInFrames);

  return (
    <AbsoluteFill style={{ opacity, color: COLORS.ink }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 80, textAlign: "center",
        opacity: springIn(frame, fps, 4),
      }}>
        <div style={{ fontFamily: BODY, fontSize: 16, letterSpacing: 8, color: COLORS.inkDim }}>STEP 02</div>
        <div style={{ fontFamily: HEAD, fontSize: 96, fontWeight: 700, color: COLORS.trigger, letterSpacing: 4, marginTop: 6 }}>
          TRIGGER
        </div>
      </div>

      {/* dominoes */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 460, display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 28 }}>
        {Array.from({ length: DOMINOES }).map((_, i) => {
          const start = 30 + i * 16;
          const rot = interpolate(frame, [start, start + 22], [0, 78], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const glow = interpolate(frame, [start, start + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              width: 50, height: 180,
              background: `linear-gradient(180deg, ${COLORS.trigger} 0%, #C2780B 100%)`,
              borderRadius: 4,
              transform: `rotate(${rot}deg)`,
              transformOrigin: "bottom right",
              boxShadow: `0 ${4 + glow * 18}px ${20 + glow * 30}px rgba(245,158,11,${0.2 + glow * 0.5})`,
              border: `1px solid rgba(255,255,255,0.15)`,
            }} />
          );
        })}
      </div>

      {/* baseline */}
      <div style={{ position: "absolute", left: 200, right: 200, top: 644, height: 2, background: COLORS.inkFaint }} />

      {/* contrasting caption */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 720, textAlign: "center" }}>
        <div style={{ fontFamily: HEAD, fontSize: 34, color: COLORS.ink, opacity: springIn(frame, fps, 60) }}>
          Not another dashboard alert —
        </div>
        <div style={{ fontFamily: HEAD, fontSize: 42, color: COLORS.trigger, fontWeight: 700, marginTop: 8,
          opacity: springIn(frame, fps, 90) }}>
          a pre-defined, fully compliant workflow.
        </div>
      </div>
    </AbsoluteFill>
  );
};