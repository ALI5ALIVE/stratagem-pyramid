import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, HEAD, BODY, springIn, stageFade } from "./shared";

const SIGNALS = [
  "Maintenance flag · A320 #4471",
  "Crew duty cap · Captain Mendes",
  "Reg change · EASA Part-CAT.OP",
  "Weather · CB cell vicinity LFPG",
  "Manual revision · Rev 27.3",
  "Audit finding · open · 14d",
  "Sensor drift · ADIRU 2",
  "Slot constraint · EHAM 18:45",
];

export const S2_Detect: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = stageFade(frame, durationInFrames);

  // signal pulse traveling from left to center
  const pulseT = interpolate(frame, [10, 80], [0, 1], { extrapolateRight: "clamp" });
  const px = interpolate(pulseT, [0, 1], [80, 960]);

  return (
    <AbsoluteFill style={{ opacity, color: COLORS.ink }}>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="dglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.detect} stopOpacity="0.5" />
            <stop offset="100%" stopColor={COLORS.detect} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* central ring */}
        <circle cx={960} cy={540} r={260} fill="url(#dglow)" />
        <circle cx={960} cy={540} r={220} fill="none" stroke={COLORS.detect} strokeWidth={2} opacity={0.9} />
        <circle cx={960} cy={540} r={180} fill="none" stroke={COLORS.detect} strokeWidth={1.5} opacity={0.5} />
        {/* incoming ray */}
        <line x1={80} y1={540} x2={px} y2={540} stroke={COLORS.detect} strokeWidth={3} opacity={0.85} />
        <circle cx={px} cy={540} r={10 + 4 * Math.sin(frame / 4)} fill={COLORS.detect} />
      </svg>

      {/* DETECT label */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 80, textAlign: "center",
        opacity: springIn(frame, fps, 4),
      }}>
        <div style={{ fontFamily: BODY, fontSize: 16, letterSpacing: 8, color: COLORS.inkDim }}>STEP 01</div>
        <div style={{ fontFamily: HEAD, fontSize: 96, fontWeight: 700, color: COLORS.detect, letterSpacing: 4, marginTop: 6 }}>
          DETECT
        </div>
      </div>

      {/* signal stream right */}
      <div style={{ position: "absolute", right: 80, top: 200, width: 440, fontFamily: BODY, fontSize: 18 }}>
        <div style={{ color: COLORS.inkDim, fontSize: 13, letterSpacing: 4, marginBottom: 16 }}>SIGNAL STREAM</div>
        {SIGNALS.map((s, i) => {
          const appear = interpolate(frame, [30 + i * 14, 50 + i * 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const slide = interpolate(appear, [0, 1], [20, 0]);
          return (
            <div key={i} style={{
              opacity: appear, transform: `translateX(${slide}px)`,
              padding: "10px 14px", marginBottom: 8,
              borderLeft: `2px solid ${COLORS.detect}`,
              background: "rgba(59,130,246,0.06)",
              color: COLORS.ink,
            }}>{s}</div>
          );
        })}
      </div>

      {/* count */}
      <div style={{ position: "absolute", left: 120, top: 260, fontFamily: HEAD, color: COLORS.ink }}>
        <div style={{ fontSize: 14, letterSpacing: 4, color: COLORS.inkDim }}>DATA POINTS MONITORED</div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 8 }}>
          {Math.floor(interpolate(frame, [20, 300], [0, 12480], { extrapolateRight: "clamp" })).toLocaleString()}
        </div>
        <div style={{ fontSize: 18, color: COLORS.inkDim, marginTop: 4 }}>across maintenance · crew · regulatory · ops</div>
      </div>
    </AbsoluteFill>
  );
};