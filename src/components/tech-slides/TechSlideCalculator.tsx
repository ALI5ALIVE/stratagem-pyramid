import { useState, useMemo } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import SlideLineOfSight from "@/components/slides/SlideLineOfSight";
import {
  useCases,
  leadingMeasures,
  computeLeadingMeasure,
  computeUseCaseCostImpact,
  defaultProfile,
  type AirlineProfile,
} from "@/data/lineOfSightData";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const TechSlideCalculator = ({ slideNumber, ...narrationProps }: Props) => {
  const [useCaseValues, setUseCaseValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    useCases.forEach((uc) => {
      initial[uc.id] = uc.input.baseline;
    });
    return initial;
  });

  const [airlineProfile, setAirlineProfile] = useState<AirlineProfile>({ ...defaultProfile });

  const leadingValues = useMemo(() => {
    const values: Record<string, number> = {};
    leadingMeasures.forEach((lm) => {
      values[lm.id] = computeLeadingMeasure(lm, useCaseValues, useCases);
    });
    return values;
  }, [useCaseValues]);

  const totalCostAvoidance = useMemo(() => {
    return useCases.reduce(
      (sum, uc) => sum + computeUseCaseCostImpact(uc, useCaseValues[uc.id] ?? uc.input.baseline, airlineProfile),
      0
    );
  }, [useCaseValues, airlineProfile]);

  return (
    <SalesSlideContainer
      id="tech-slide-calculator"
      title="Line of Sight — ROI Calculator"
      subtitle="Adjust the inputs to model your own cost avoidance, grounded in published industry benchmarks."
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 min-h-0 -mx-6 -mb-6">
        <SlideLineOfSight
          useCaseValues={useCaseValues}
          setUseCaseValues={setUseCaseValues}
          airlineProfile={airlineProfile}
          setAirlineProfile={setAirlineProfile}
          leadingValues={leadingValues}
          totalCostAvoidance={totalCostAvoidance}
        />
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlideCalculator;