import { AbsoluteFill, Series } from "remotion";
import { PersistentBackground } from "./components/PersistentBackground";
import { Act1_Pain } from "./scenes/Act1_Pain";
import { Act2_Challenge } from "./scenes/Act2_Challenge";
import { Act3_Turn } from "./scenes/Act3_Turn";
import { Act4_Insight } from "./scenes/Act4_Insight";
import { Act5_Value } from "./scenes/Act5_Value";
import { Act6_Resolve } from "./scenes/Act6_Resolve";

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <PersistentBackground />
      <Series>
        <Series.Sequence durationInFrames={450}>
          <Act1_Pain />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
          <Act2_Challenge />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
          <Act3_Turn />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
          <Act4_Insight />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
          <Act5_Value />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <Act6_Resolve />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};