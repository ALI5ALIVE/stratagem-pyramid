import { AbsoluteFill, Series, Sequence, Audio, staticFile, useCurrentFrame, interpolate } from "remotion";
import { PersistentBackground } from "./components/PersistentBackground";
import { Act1_Pain } from "./scenes/Act1_Pain";
import { Act2_Challenge } from "./scenes/Act2_Challenge";
import { Act3_Turn } from "./scenes/Act3_Turn";
import { Act4_Insight } from "./scenes/Act4_Insight";
import { Act5_Value } from "./scenes/Act5_Value";
import { Act6_Resolve } from "./scenes/Act6_Resolve";

// Act start frames (cumulative): 0, 450, 1410, 1890, 2850, 3450; total 3600
const ACTS = [
  { id: "act1", start: 0,    dur: 450, voOffset: 30 },
  { id: "act2", start: 450,  dur: 960, voOffset: 30 },
  { id: "act3", start: 1410, dur: 480, voOffset: 30 },
  { id: "act4", start: 1890, dur: 960, voOffset: 30 },
  { id: "act5", start: 2850, dur: 600, voOffset: 30 },
  { id: "act6", start: 3450, dur: 150, voOffset: 15 },
];

// VO speech windows for ducking (approximate, in frames @30fps)
const VO_WINDOWS: Array<[number, number]> = ACTS.map((a) => {
  // 30fps; spoken duration roughly equals act dur minus voOffset minus tail buffer
  return [a.start + a.voOffset, a.start + a.dur - 30];
});

const ScoreBed: React.FC = () => {
  const frame = useCurrentFrame();
  // Fade in 0-60, fade out 3540-3600
  const envelope = interpolate(
    frame,
    [0, 60, 3540, 3600],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  // Duck during VO
  const inVO = VO_WINDOWS.some(([s, e]) => frame >= s - 8 && frame <= e + 8);
  const target = inVO ? 0.16 : 0.42;
  return (
    <Audio src={staticFile("audio/score.mp3")} volume={target * envelope} />
  );
};

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <PersistentBackground />
      <Series>
        <Series.Sequence durationInFrames={450}>
          <Act1_Pain />
        </Series.Sequence>
        <Series.Sequence durationInFrames={960}>
          <Act2_Challenge />
        </Series.Sequence>
        <Series.Sequence durationInFrames={480}>
          <Act3_Turn />
        </Series.Sequence>
        <Series.Sequence durationInFrames={960}>
          <Act4_Insight />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
          <Act5_Value />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <Act6_Resolve />
        </Series.Sequence>
      </Series>
      {/* Voiceover per act */}
      {ACTS.map((a) => (
        <Sequence key={a.id} from={a.start + a.voOffset}>
          <Audio src={staticFile(`audio/vo/${a.id}.mp3`)} volume={1.0} />
        </Sequence>
      ))}
      {/* Music bed with ducking */}
      <ScoreBed />
    </AbsoluteFill>
  );
};