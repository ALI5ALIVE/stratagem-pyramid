import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/automationPlaybook";
import AUUseCaseSlide from "./AUUseCaseSlide";

const AUSlide5UseCase2 = (props: SlideNarrationProps) => (
  <AUUseCaseSlide id="au-uc2" slideNumber={5} useCase={useCases[1]} {...props} />
);

export default AUSlide5UseCase2;
