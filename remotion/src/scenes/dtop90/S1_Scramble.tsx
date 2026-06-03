import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";
import { COLORS, HEAD, BODY, springIn, stageFade } from "./shared";

const CHAOS_LINES = Array.from({ length: 22 });
const CHAOS_ICONS = ["@", "✉", "☎", "▦", "!", "✦", "%", "Σ"];

export const S1_Scramble: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = stageFade(frame, durationInFrames);

  return (
    <AbsoluteFill style={{ opacity, color: COLORS.ink }}>
      {/* LEFT — chaos */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 960, height: 1080, overflow: "hidden" }}>
        <svg width={960} height={1080} style={{ position: "absolute", inset: 0 }}>
          {CHAOS_LINES.map((_, i) => {
            const seed = random(`l${i}`);
            const x1 = seed * 900 + 30;
            const y1 = random(`y1-${i}`) * 1000 + 40;
            const jitter = Math.sin((frame + i * 7) / 4) * 18;
            const x2 = x1 + (random(`dx${i}`) - 0.5) * 280 + jitter;
            const y2 = y1 + (random(`dy${i}`) - 0.5) * 280 + jitter;
            const flicker = 0.25 + 0.55 * Math.abs(Math.sin((frame + i * 11) / 6));
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={i % 4 === 0 ? COLORS.signal : COLORS.inkFaint}
                strokeWidth={i % 4 === 0 ? 2 : 1}
                opacity={flicker} />
            );
          })}
          {/* sparks */}
          {Array.from({ length: 14 }).map((_, i) => {
            const cx = random(`sx${i}`) * 920 + 20;
            const cy = random(`sy${i}`) * 1040 + 20;
            const flicker = (Math.sin((frame + i * 13) / 5) + 1) / 2;
            return <circle key={i} cx={cx} cy={cy} r={2 + flicker * 3} fill={COLORS.signal} opacity={flicker * 0.9} />;
          })}
        </svg>
        {/* floating icons */}
        {CHAOS_ICONS.map((ic, i) => {
          const baseX = 80 + (i % 4) * 200;
          const baseY = 140 + Math.floor(i / 4) * 220;
          const jx = Math.sin((frame + i * 17) / 8) * 14;
          const jy = Math.cos((frame + i * 23) / 7) * 12;
          return (
            <div key={i} style={{
              position: "absolute", left: baseX + jx, top: baseY + jy,
              fontFamily: HEAD, fontSize: 38, color: COLORS.inkDim,
              border: `1px solid ${COLORS.inkFaint}`, padding: "10px 16px", borderRadius: 8,
              background: "rgba(255,255,255,0.02)",
              opacity: 0.55 + 0.35 * Math.abs(Math.sin((frame + i * 9) / 10)),
            }}>{ic}</div>
          );
        })}
      </div>

      {/* Vertical divider */}
      <div style={{ position: "absolute", left: 958, top: 80, width: 2, height: 920,
        background: `linear-gradient(to bottom, transparent, ${COLORS.inkFaint}, transparent)` }} />

      {/* RIGHT — controlled loop */}
      <div style={{ position: "absolute", right: 0, top: 0, width: 960, height: 1080 }}>
        <svg width={960} height={1080} style={{ position: "absolute", inset: 0 }}>
          <defs>
            <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.4" />
              <stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={480} cy={540} r={280} fill="url(#glow1)" />
          {[0, 1, 2].map((i) => {
            const r = 180 + i * 40;
            const dash = 2 * Math.PI * r;
            const offset = -(frame * (1 + i * 0.4)) % dash;
            return (
              <circle key={i} cx={480} cy={540} r={r}
                fill="none" stroke={COLORS.primary} strokeWidth={2 - i * 0.3}
                strokeDasharray={`${dash * 0.35} ${dash * 0.65}`}
                strokeDashoffset={offset} opacity={0.85 - i * 0.2} />
            );
          })}
          {/* pulsing core */}
          <circle cx={480} cy={540} r={28 + 8 * Math.sin(frame / 8)}
            fill={COLORS.primary} opacity={0.95} />
        </svg>
      </div>

      {/* Title */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 64, textAlign: "center",
        opacity: springIn(frame, fps, 6),
      }}>
        <div style={{ fontFamily: BODY, fontSize: 18, letterSpacing: 6, color: COLORS.inkDim, marginBottom: 12 }}>
          THE SCRAMBLE VS. THE LOOP
        </div>
      </div>

      <div style={{
        position: "absolute", left: 0, top: 980, width: 960, textAlign: "center",
        fontFamily: HEAD, fontSize: 28, color: COLORS.signal, letterSpacing: 2,
        opacity: 0.5 + 0.4 * Math.abs(Math.sin(frame / 12)),
      }}>SCRAMBLE</div>
      <div style={{
        position: "absolute", right: 0, top: 980, width: 960, textAlign: "center",
        fontFamily: HEAD, fontSize: 28, color: COLORS.primary, letterSpacing: 2,
        opacity: 0.85,
      }}>LOOP</div>
    </AbsoluteFill>
  );
};