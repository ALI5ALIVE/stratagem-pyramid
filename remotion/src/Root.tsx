import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { DTOP90, DTOP90_DURATION } from "./compositions/DTOP90";

export const RemotionRoot = () => (
  <>
  <Composition
    id="main"
    component={MainVideo}
    durationInFrames={3930}
    fps={30}
    width={1920}
    height={1080}
  />
    <Composition
      id="dtop90"
      component={DTOP90}
      durationInFrames={DTOP90_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);