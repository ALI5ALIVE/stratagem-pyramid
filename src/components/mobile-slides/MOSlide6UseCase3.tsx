import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/mobilePlaybook";
import MOUseCaseSlide from "./MOUseCaseSlide";

const MOSlide6UseCase3 = (props: SlideNarrationProps) => (
  <MOUseCaseSlide id="mo-uc3" slideNumber={6} useCase={useCases[2]} {...props} />
);

export default MOSlide6UseCase3;
