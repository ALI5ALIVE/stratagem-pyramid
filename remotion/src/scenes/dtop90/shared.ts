import { interpolate, spring } from "remotion";

export const COLORS = {
  bg: "hsl(222, 47%, 6%)",
  bgDeep: "hsl(222, 47%, 4%)",
  ink: "#F5F7FA",
  inkDim: "rgba(245,247,250,0.6)",
  inkFaint: "rgba(245,247,250,0.18)",
  primary: "#0066FF",
  detect: "#3B82F6",
  trigger: "#F59E0B",
  orchestrate: "#8B5CF6",
  prove: "#10B981",
  signal: "#EF4444",
};

export const HEAD = "'Space Grotesk', system-ui, sans-serif";
export const BODY = "'Inter', system-ui, sans-serif";

export const fadeIn = (frame: number, start: number, dur = 18) =>
  interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

export const fadeOut = (frame: number, start: number, dur = 18) =>
  interpolate(frame, [start, start + dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

export const springIn = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 180, mass: 0.9 } });

export const stageFade = (frame: number, dur: number) => {
  const fIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fOut = interpolate(frame, [dur - 18, dur], [1, 0], { extrapolateLeft: "clamp" });
  return Math.min(fIn, fOut);
};