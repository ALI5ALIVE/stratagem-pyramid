import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/mobilePlaybook";
import MOUseCaseSlide from "./MOUseCaseSlide";

const MOSlide5UseCase2 = (props: SlideNarrationProps) => (
  <MOUseCaseSlide id="mo-uc2" slideNumber={5} useCase={useCases[1]} {...props} />
);

export default MOSlide5UseCase2;
