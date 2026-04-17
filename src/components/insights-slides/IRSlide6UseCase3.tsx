import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/insightsPlaybook";
import IRUseCaseSlide from "./IRUseCaseSlide";

const IRSlide6UseCase3 = (props: SlideNarrationProps) => (
  <IRUseCaseSlide id="ir-uc3" slideNumber={6} useCase={useCases[2]} {...props} />
);

export default IRSlide6UseCase3;
