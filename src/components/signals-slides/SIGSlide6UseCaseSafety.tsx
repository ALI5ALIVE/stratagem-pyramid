import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/signalsPlaybook";
import SIGUseCaseSlide from "./SIGUseCaseSlide";

const SIGSlide6UseCaseSafety = (props: SlideNarrationProps) => (
  <SIGUseCaseSlide id="sig-uc-safety" slideNumber={6} useCase={useCases[0]} {...props} />
);

export default SIGSlide6UseCaseSafety;