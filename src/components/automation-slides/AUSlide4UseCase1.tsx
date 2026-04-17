import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/automationPlaybook";
import AUUseCaseSlide from "./AUUseCaseSlide";

const AUSlide4UseCase1 = (props: SlideNarrationProps) => (
  <AUUseCaseSlide id="au-uc1" slideNumber={4} useCase={useCases[0]} {...props} />
);

export default AUSlide4UseCase1;
