import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/signalsPlaybook";
import SIGUseCaseSlide from "./SIGUseCaseSlide";

const SIGSlide7UseCaseOps = (props: SlideNarrationProps) => (
  <SIGUseCaseSlide id="sig-uc-ops" slideNumber={7} useCase={useCases[1]} {...props} />
);

export default SIGSlide7UseCaseOps;