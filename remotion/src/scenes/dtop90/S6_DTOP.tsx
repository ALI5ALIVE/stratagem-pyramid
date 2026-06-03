import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, HEAD, BODY, springIn, stageFade } from "./shared";

const LETTERS = [
  { ch: "D", word: "Detect", color: COLORS.detect },
  { ch: "T", word: "Trigger", color: COLORS.trigger },
  { ch: "O", word: "Orchestrate", color: COLORS.orchestrate },
  { ch: "P", word: "Prove", color: COLORS.prove },
];

export const S6_DTOP: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = stageFade(frame, durationInFrames);

  // chaos fading
  const chaosOpacity = interpolate(frame, [10, 110], [0.45, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity, color: COLORS.ink }}>
      {/* fading chaos behind */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: chaosOpacity }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const x1 = (i * 89) % 1920;
          const y1 = (i * 53) % 1080;
          const x2 = x1 + Math.sin((frame + i * 7) / 6) * 60;
          const y2 = y1 + Math.cos((frame + i * 11) / 7) * 60;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.signal} strokeWidth={1} opacity={0.5} />;
        })}
      </svg>

      {/* central glowing loop */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="finalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.45" />
            <stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={960} cy={580} r={340} fill="url(#finalGlow)" />
        <circle cx={960} cy={580} r={300}
          fill="none" strokeWidth={5}
          stroke={`url(#loopGrad)`}
          opacity={0.95} />
        <defs>
          <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={COLORS.detect} />
            <stop offset="33%" stopColor={COLORS.trigger} />
            <stop offset="66%" stopColor={COLORS.orchestrate} />
            <stop offset="100%" stopColor={COLORS.prove} />
          </linearGradient>
        </defs>
      </svg>

      {/* DTOP letters */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 380,
        display: "flex", justifyContent: "center", gap: 56,
      }}>
        {LETTERS.map((l, i) => {
          const a = springIn(frame, fps, 20 + i * 14);
          return (
            <div key={l.ch} style={{
              opacity: a, transform: `translateY(${(1 - a) * 30}px) scale(${0.7 + a * 0.3})`,
              textAlign: "center",
            }}>
              <div style={{ fontFamily: HEAD, fontSize: 220, fontWeight: 700, color: l.color,
                textShadow: `0 0 40px ${l.color}` }}>
                {l.ch}
              </div>
              <div style={{ fontFamily: BODY, fontSize: 22, letterSpacing: 4, color: COLORS.inkDim, marginTop: -8 }}>
                {l.word}
              </div>
            </div>
          );
        })}
      </div>

      {/* tagline */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 820, textAlign: "center",
        opacity: springIn(frame, fps, 110),
      }}>
        <div style={{ fontFamily: HEAD, fontSize: 36, color: COLORS.ink, fontWeight: 500 }}>
          The operating model for complex industries.
        </div>
        <div style={{ fontFamily: BODY, fontSize: 20, color: COLORS.inkDim, marginTop: 16, letterSpacing: 3 }}>
          DOMAIN INTELLIGENCE · OPERATIONAL DATA · CLOSED-LOOP CONTROL
        </div>
      </div>

      {/* 90% accuracy ribbon */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 200, textAlign: "center",
        opacity: springIn(frame, fps, 160),
      }}>
        <span style={{
          fontFamily: HEAD, fontSize: 18, letterSpacing: 4, color: COLORS.primary,
          padding: "8px 18px", border: `1px solid ${COLORS.primary}`, borderRadius: 999,
          background: "rgba(0,102,255,0.08)",
        }}>~90% DOMAIN ACCURACY · L4–L5</span>
      </div>
    </AbsoluteFill>
  );
};