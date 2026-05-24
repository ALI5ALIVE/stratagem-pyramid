import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../theme";
import { DISPLAY, BODY } from "../components/Type";

const STEPS = [
  { letter: "D", word: "Detect", desc: "See every signal across systems, roles and silos.", color: COLORS.detect, at: 60 },
  { letter: "T", word: "Trigger", desc: "Convert a signal into an obligation the operation can act on.", color: COLORS.trigger, at: 180 },
  { letter: "O", word: "Orchestrate", desc: "Route the right work to the right hands at the right moment.", color: COLORS.orchestrate, at: 300 },
  { letter: "P", word: "Prove", desc: "Close the loop with auditable evidence of the outcome.", color: COLORS.prove, at: 420 },
];

export const Act4_Insight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Light trace progress
  const trace = interpolate(frame, [40, 720], [0, 1], { extrapolateRight: "clamp" });
  const outO = interpolate(frame, [900, 960], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ padding: "100px 140px", opacity: outO }}>
      <div
        style={{
          fontFamily: BODY,
          color: COLORS.typeDim,
          letterSpacing: 8,
          textTransform: "uppercase",
          fontSize: 16,
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Act 04 · Naming the new game
      </div>

      <h2
        style={{
          fontFamily: DISPLAY,
          color: COLORS.type,
          fontWeight: 500,
          fontSize: 56,
          letterSpacing: -1.2,
          margin: "16px 0 40px",
          opacity: interpolate(frame, [10, 50], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        One operating model. Four moves.
      </h2>

      {/* Light trace line through 4 nodes */}
      <svg width={1640} height={120} style={{ display: "block", margin: "20px 0" }}>
        <defs>
          <linearGradient id="g4" x1="0" x2="1">
            <stop offset="0" stopColor={COLORS.detect} />
            <stop offset="0.33" stopColor={COLORS.trigger} />
            <stop offset="0.66" stopColor={COLORS.orchestrate} />
            <stop offset="1" stopColor={COLORS.prove} />
          </linearGradient>
        </defs>
        <line
          x1={80}
          y1={60}
          x2={1560}
          y2={60}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={2}
        />
        <line
          x1={80}
          y1={60}
          x2={80 + 1480 * trace}
          y2={60}
          stroke="url(#g4)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        {STEPS.map((s, i) => {
          const cx = 80 + (1480 / 3) * i;
          const pop = spring({ frame: frame - s.at, fps, config: { damping: 18, stiffness: 130 } });
          return (
            <g key={s.word} opacity={pop}>
              <circle cx={cx} cy={60} r={18} fill={COLORS.bgDeep} stroke={s.color} strokeWidth={3} />
              <circle cx={cx} cy={60} r={6} fill={s.color} />
            </g>
          );
        })}
      </svg>

      {/* Step cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 36, marginTop: 40 }}>
        {STEPS.map((s) => {
          const pop = spring({ frame: frame - s.at, fps, config: { damping: 20, stiffness: 110 } });
          const o = interpolate(pop, [0, 1], [0, 1]);
          const y = interpolate(pop, [0, 1], [20, 0]);
          return (
            <div
              key={s.word}
              style={{
                opacity: o,
                transform: `translateY(${y}px)`,
                borderTop: `2px solid ${s.color}`,
                paddingTop: 24,
              }}
            >
              <div
                style={{
                  fontFamily: DISPLAY,
                  color: s.color,
                  fontSize: 140,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: -4,
                }}
              >
                {s.letter}
              </div>
              <div
                style={{
                  fontFamily: DISPLAY,
                  color: COLORS.type,
                  fontSize: 36,
                  fontWeight: 500,
                  marginTop: 4,
                  letterSpacing: -0.5,
                }}
              >
                {s.word}
              </div>
              <div
                style={{
                  fontFamily: BODY,
                  color: COLORS.typeDim,
                  fontSize: 18,
                  marginTop: 12,
                  lineHeight: 1.4,
                }}
              >
                {s.desc}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 48,
          textAlign: "center",
          fontFamily: BODY,
          color: COLORS.typeDim,
          fontSize: 14,
          lineHeight: 1.5,
          maxWidth: 980,
          marginLeft: "auto",
          marginRight: "auto",
          opacity:
            interpolate(frame, [600, 660], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) *
            interpolate(frame, [860, 900], [1, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        Recommendation accuracy on a defined operational decision set at L4–L5, benchmarked against a human-expert panel. Methodology published.
      </div>
    </AbsoluteFill>
  );
};