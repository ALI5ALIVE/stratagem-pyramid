import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/automationPlaybook";
import AUUseCaseSlide from "./AUUseCaseSlide";

const AUSlide6UseCase3 = (props: SlideNarrationProps) => (
  <AUUseCaseSlide id="au-uc3" slideNumber={6} useCase={useCases[2]} {...props} />
);

export default AUSlide6UseCase3;
