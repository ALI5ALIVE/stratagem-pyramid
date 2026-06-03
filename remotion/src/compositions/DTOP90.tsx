import { AbsoluteFill, Series, Sequence, Audio, staticFile, useCurrentFrame, interpolate } from "remotion";
import { PersistentBackground } from "../components/PersistentBackground";
import { S1_Scramble } from "../scenes/dtop90/S1_Scramble";
import { S2_Detect } from "../scenes/dtop90/S2_Detect";
import { S3_Trigger } from "../scenes/dtop90/S3_Trigger";
import { S4_Orchestrate } from "../scenes/dtop90/S4_Orchestrate";
import { S5_Prove } from "../scenes/dtop90/S5_Prove";
import { S6_DTOP } from "../scenes/dtop90/S6_DTOP";
import { S7_CTA } from "../scenes/dtop90/S7_CTA";
import { loadFont as loadHead } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";
import { loadFont as loadScript } from "@remotion/google-fonts/Caveat";

loadHead("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });
loadBody("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });
loadScript("normal", { weights: ["400"], subsets: ["latin"] });

// Scene durations in frames (30fps)
const SCENES = [
  { id: "s1", dur: 480, voOffset: 15, Component: S1_Scramble },
  { id: "s2", dur: 390, voOffset: 15, Component: S2_Detect },
  { id: "s3", dur: 330, voOffset: 15, Component: S3_Trigger },
  { id: "s4", dur: 570, voOffset: 15, Component: S4_Orchestrate },
  { id: "s5", dur: 420, voOffset: 15, Component: S5_Prove },
  { id: "s6", dur: 510, voOffset: 15, Component: S6_DTOP },
  { id: "s7", dur: 330, voOffset: 12, Component: S7_CTA },
];

export const DTOP90_DURATION = SCENES.reduce((a, s) => a + s.dur, 0); // 3030

// cumulative starts
const STARTS: number[] = [];
SCENES.reduce((acc, s, i) => { STARTS[i] = acc; return acc + s.dur; }, 0);

const VO_WINDOWS: Array<[number, number]> = SCENES.map((s, i) => [
  STARTS[i] + s.voOffset,
  STARTS[i] + s.dur - 10,
]);

const ScoreBed: React.FC = () => {
  const frame = useCurrentFrame();
  const envelope = interpolate(
    frame,
    [0, 60, DTOP90_DURATION - 60, DTOP90_DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const inVO = VO_WINDOWS.some(([s, e]) => frame >= s - 8 && frame <= e + 8);
  const target = inVO ? 0.14 : 0.34;
  return <Audio src={staticFile("audio/score.mp3")} volume={target * envelope} loop />;
};

export const DTOP90: React.FC = () => {
  return (
    <AbsoluteFill>
      <PersistentBackground />
      <Series>
        {SCENES.map((s) => (
          <Series.Sequence key={s.id} durationInFrames={s.dur}>
            <s.Component durationInFrames={s.dur} />
          </Series.Sequence>
        ))}
      </Series>
      {SCENES.map((s, i) => (
        <Sequence
          key={s.id}
          from={STARTS[i] + s.voOffset}
          durationInFrames={Math.max(1, s.dur - s.voOffset)}
        >
          <Audio src={staticFile(`audio/dtop90/${s.id}.mp3`)} volume={1.0} />
        </Sequence>
      ))}
      <ScoreBed />
    </AbsoluteFill>
  );
};