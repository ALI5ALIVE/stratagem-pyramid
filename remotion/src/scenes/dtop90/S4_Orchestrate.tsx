import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, HEAD, BODY, springIn, stageFade } from "./shared";

const OUTCOMES = [
  { label: "NOTIFY CREW", icon: "👥" },
  { label: "UPDATE MANUAL", icon: "📘" },
  { label: "ASSIGN TASK", icon: "✓" },
  { label: "GROUND AIRCRAFT", icon: "✈" },
];

const PRODUCTS = ["Comply365", "SafetyManager365", "ContentManager365"];

export const S4_Orchestrate: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = stageFade(frame, durationInFrames);

  const hub = { x: 960, y: 560 };
  const targets = OUTCOMES.map((_, i) => {
    const cols = 4;
    const x = 260 + i * 380;
    const y = 820;
    return { x, y };
  });

  return (
    <AbsoluteFill style={{ opacity, color: COLORS.ink }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 80, textAlign: "center",
        opacity: springIn(frame, fps, 4),
      }}>
        <div style={{ fontFamily: BODY, fontSize: 16, letterSpacing: 8, color: COLORS.inkDim }}>STEP 03</div>
        <div style={{ fontFamily: HEAD, fontSize: 96, fontWeight: 700, color: COLORS.orchestrate, letterSpacing: 4, marginTop: 6 }}>
          ORCHESTRATE
        </div>
      </div>

      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="oglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.orchestrate} stopOpacity="0.55" />
            <stop offset="100%" stopColor={COLORS.orchestrate} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={hub.x} cy={hub.y} r={180} fill="url(#oglow)" />
        <circle cx={hub.x} cy={hub.y} r={60} fill={COLORS.orchestrate} opacity={0.9} />
        <text x={hub.x} y={hub.y + 8} textAnchor="middle" fontFamily={HEAD} fontSize={28} fontWeight={700} fill={COLORS.ink}>
          DTOP
        </text>

        {targets.map((t, i) => {
          const start = 40 + i * 18;
          const p = interpolate(frame, [start, start + 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const midY = (hub.y + t.y) / 2;
          const d = `M ${hub.x} ${hub.y} C ${hub.x} ${midY}, ${t.x} ${midY}, ${t.x} ${t.y}`;
          return (
            <g key={i}>
              <path d={d} stroke={COLORS.orchestrate} strokeWidth={2}
                fill="none" opacity={0.85}
                strokeDasharray={400} strokeDashoffset={400 - 400 * p} />
              <circle cx={t.x} cy={t.y} r={8 * p} fill={COLORS.orchestrate} />
            </g>
          );
        })}
      </svg>

      {/* outcome cards */}
      {OUTCOMES.map((o, i) => {
        const start = 70 + i * 18;
        const appear = springIn(frame, fps, start);
        const t = targets[i];
        return (
          <div key={i} style={{
            position: "absolute", left: t.x - 140, top: t.y + 24, width: 280,
            opacity: appear,
            transform: `translateY(${(1 - appear) * 12}px)`,
            padding: "16px 18px",
            border: `1px solid ${COLORS.orchestrate}`,
            background: "rgba(139,92,246,0.1)",
            borderRadius: 8,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{o.icon}</div>
            <div style={{ fontFamily: HEAD, fontSize: 18, fontWeight: 700, letterSpacing: 2, color: COLORS.ink }}>{o.label}</div>
          </div>
        );
      })}

      {/* product names */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, display: "flex", justifyContent: "center", gap: 32 }}>
        {PRODUCTS.map((p, i) => {
          const a = springIn(frame, fps, 140 + i * 14);
          return (
            <div key={p} style={{
              opacity: a, transform: `translateY(${(1 - a) * 10}px)`,
              fontFamily: HEAD, fontSize: 22, fontWeight: 600,
              padding: "10px 22px",
              border: `1px solid ${COLORS.inkFaint}`,
              borderRadius: 999,
              color: COLORS.ink,
              background: "rgba(255,255,255,0.03)",
            }}>{p}</div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};