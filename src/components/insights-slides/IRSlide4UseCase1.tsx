import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/insightsPlaybook";
import IRUseCaseSlide from "./IRUseCaseSlide";

const IRSlide4UseCase1 = (props: SlideNarrationProps) => (
  <IRUseCaseSlide id="ir-uc1" slideNumber={4} useCase={useCases[0]} {...props} />
);

export default IRSlide4UseCase1;
