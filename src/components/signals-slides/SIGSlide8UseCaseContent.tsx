import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/signalsPlaybook";
import SIGUseCaseSlide from "./SIGUseCaseSlide";

const SIGSlide8UseCaseContent = (props: SlideNarrationProps) => (
  <SIGUseCaseSlide id="sig-uc-content" slideNumber={8} useCase={useCases[2]} {...props} />
);

export default SIGSlide8UseCaseContent;