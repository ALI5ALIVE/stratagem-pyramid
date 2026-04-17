import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/insightsPlaybook";
import IRUseCaseSlide from "./IRUseCaseSlide";

const IRSlide5UseCase2 = (props: SlideNarrationProps) => (
  <IRUseCaseSlide id="ir-uc2" slideNumber={5} useCase={useCases[1]} {...props} />
);

export default IRSlide5UseCase2;
