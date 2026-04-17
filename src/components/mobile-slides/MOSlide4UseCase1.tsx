import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/mobilePlaybook";
import MOUseCaseSlide from "./MOUseCaseSlide";

const MOSlide4UseCase1 = (props: SlideNarrationProps) => (
  <MOUseCaseSlide id="mo-uc1" slideNumber={4} useCase={useCases[0]} {...props} />
);

export default MOSlide4UseCase1;
