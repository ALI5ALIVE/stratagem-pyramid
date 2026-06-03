import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, HEAD, BODY, springIn, stageFade } from "./shared";

const FIELDS = [
  { label: "Event ID", value: "EVT-2026-0413-A4471" },
  { label: "Detected at", value: "06:14:22 UTC" },
  { label: "Workflow", value: "Crew swap · MEL deferral · Manual rev push" },
  { label: "Owner", value: "Ops Control · J. Mendes" },
  { label: "Evidence", value: "12 actions · 4 signatures · 0 gaps" },
  { label: "Resolution", value: "Closed · auditable record archived" },
];

export const S5_Prove: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = stageFade(frame, durationInFrames);

  // closed-loop circuit
  const loopDash = 2 * Math.PI * 220;
  const loopP = interpolate(frame, [0, 80], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity, color: COLORS.ink }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 80, textAlign: "center",
        opacity: springIn(frame, fps, 4),
      }}>
        <div style={{ fontFamily: BODY, fontSize: 16, letterSpacing: 8, color: COLORS.inkDim }}>STEP 04</div>
        <div style={{ fontFamily: HEAD, fontSize: 96, fontWeight: 700, color: COLORS.prove, letterSpacing: 4, marginTop: 6 }}>
          PROVE
        </div>
      </div>

      {/* form on left */}
      <div style={{
        position: "absolute", left: 140, top: 280, width: 760,
        border: `1px solid ${COLORS.prove}`,
        borderRadius: 12,
        background: "rgba(16,185,129,0.05)",
        padding: 28,
      }}>
        <div style={{ fontFamily: BODY, fontSize: 13, letterSpacing: 4, color: COLORS.prove, marginBottom: 18 }}>
          AUDIT RECORD · LIVE
        </div>
        {FIELDS.map((f, i) => {
          const start = 20 + i * 14;
          const a = interpolate(frame, [start, start + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={f.label} style={{
              display: "flex", justifyContent: "space-between", padding: "12px 0",
              borderBottom: `1px solid ${COLORS.inkFaint}`,
              opacity: a, transform: `translateX(${(1 - a) * 10}px)`,
            }}>
              <div style={{ fontFamily: BODY, fontSize: 16, color: COLORS.inkDim }}>{f.label}</div>
              <div style={{ fontFamily: HEAD, fontSize: 16, color: COLORS.ink, fontWeight: 500 }}>{f.value}</div>
            </div>
          );
        })}
        {/* check + signature */}
        <div style={{
          marginTop: 24, display: "flex", alignItems: "center", gap: 20,
          opacity: springIn(frame, fps, 160),
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28,
            background: COLORS.prove, color: "#06241B",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: HEAD, fontWeight: 700, fontSize: 32,
          }}>✓</div>
          <div>
            <div style={{ fontFamily: BODY, fontSize: 12, letterSpacing: 3, color: COLORS.inkDim }}>SIGNED</div>
            <div style={{ fontFamily: "'Caveat', cursive, serif", fontSize: 36, color: COLORS.ink, fontStyle: "italic" }}>
              J. Mendes
            </div>
          </div>
        </div>
      </div>

      {/* closed loop right */}
      <svg width={780} height={620} style={{ position: "absolute", right: 80, top: 280 }}>
        <defs>
          <radialGradient id="pglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.prove} stopOpacity="0.45" />
            <stop offset="100%" stopColor={COLORS.prove} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={390} cy={310} r={260} fill="url(#pglow)" />
        <circle cx={390} cy={310} r={220}
          fill="none" stroke={COLORS.prove} strokeWidth={4}
          strokeDasharray={loopDash}
          strokeDashoffset={loopDash - loopDash * loopP}
          transform="rotate(-90 390 310)" />
        <text x={390} y={296} textAnchor="middle" fontFamily={HEAD} fontSize={28} fontWeight={700} fill={COLORS.ink}
          opacity={springIn(frame, fps, 90)}>
          LOOP CLOSED
        </text>
        <text x={390} y={336} textAnchor="middle" fontFamily={BODY} fontSize={18} fill={COLORS.inkDim}
          opacity={springIn(frame, fps, 110)}>
          auditable · provable · final
        </text>
      </svg>
    </AbsoluteFill>
  );
};