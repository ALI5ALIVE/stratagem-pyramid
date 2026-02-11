import { useState, useMemo } from "react";
import { Calculator, GitBranch, LayoutGrid } from "lucide-react";
import SlideLineOfSight from "@/components/slides/SlideLineOfSight";
import LineOfSightTree from "@/components/slides/LineOfSightTree";
import BalancedScorecard from "@/components/slides/BalancedScorecard";
import { Button } from "@/components/ui/button";
import {
  useCases,
  leadingMeasures,
  computeLeadingMeasure,
  computeUseCaseCostImpact,
  defaultProfile,
  type AirlineProfile,
} from "@/data/lineOfSightData";

const LineOfSightPage = () => {
  const [view, setView] = useState<"calculator" | "tree" | "scorecard">("calculator");

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
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* View toggle */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-2">
          <Button
            variant={view === "calculator" ? "default" : "ghost"}
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => setView("calculator")}
          >
            <Calculator className="w-3.5 h-3.5" />
            Calculator
          </Button>
          <Button
            variant={view === "tree" ? "default" : "ghost"}
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => setView("tree")}
          >
            <GitBranch className="w-3.5 h-3.5" />
            KPI Tree
          </Button>
          <Button
            variant={view === "scorecard" ? "default" : "ghost"}
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => setView("scorecard")}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Scorecard
          </Button>
        </div>
      </div>

      {view === "calculator" ? (
        <SlideLineOfSight
          useCaseValues={useCaseValues}
          setUseCaseValues={setUseCaseValues}
          airlineProfile={airlineProfile}
          setAirlineProfile={setAirlineProfile}
          leadingValues={leadingValues}
          totalCostAvoidance={totalCostAvoidance}
        />
      ) : view === "tree" ? (
        <LineOfSightTree
          useCaseValues={useCaseValues}
          leadingValues={leadingValues}
          totalCostAvoidance={totalCostAvoidance}
          airlineProfile={airlineProfile}
        />
      ) : (
        <BalancedScorecard
          useCaseValues={useCaseValues}
          leadingValues={leadingValues}
          totalCostAvoidance={totalCostAvoidance}
          airlineProfile={airlineProfile}
        />
      )}
    </div>
  );
};

export default LineOfSightPage;
