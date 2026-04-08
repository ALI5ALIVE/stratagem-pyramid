import { useState, useMemo, useEffect, useCallback } from "react";
import { Calculator, GitBranch, LayoutGrid, BarChart3, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SlideLineOfSight from "@/components/slides/SlideLineOfSight";
import LineOfSightTree from "@/components/slides/LineOfSightTree";
import BalancedScorecard from "@/components/slides/BalancedScorecard";
import PerformanceShiftCurve from "@/components/slides/PerformanceShiftCurve";
import { Button } from "@/components/ui/button";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useLineOfSightNarration } from "@/hooks/useLineOfSightNarration";
import {
  useCases,
  leadingMeasures,
  computeLeadingMeasure,
  computeUseCaseCostImpact,
  defaultProfile,
  type AirlineProfile,
} from "@/data/lineOfSightData";

const views = [
  { id: "calculator", label: "Calculator" },
  { id: "tree", label: "KPI Tree" },
  { id: "scorecard", label: "Scorecard" },
  { id: "curve", label: "Performance Shift" },
];

type ViewId = "calculator" | "tree" | "scorecard" | "curve";

const LineOfSightPage = () => {
  const [view, setView] = useState<ViewId>("calculator");
  const { register, updateActiveIndex, unregister } = useSlideNavigation();
  const narration = useLineOfSightNarration();

  const viewIndex = views.findIndex((v) => v.id === view);

  const navigateToView = useCallback((index: number) => {
    const viewId = views[index]?.id as ViewId;
    if (viewId) setView(viewId);
  }, []);

  // Stop narration when leaving this deck
  useEffect(() => {
    return () => narration.stop();
  }, []);

  useEffect(() => {
    register(views, viewIndex, navigateToView);
    return () => unregister();
  }, []);

  useEffect(() => {
    updateActiveIndex(viewIndex);
  }, [viewIndex, updateActiveIndex]);

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
    <div className="h-screen w-full bg-background text-foreground overflow-hidden flex flex-col">
      {/* View toggle */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-4">
          <Link
            to="/pitch-executive-2"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Executive Pitch
          </Link>
          <div className="h-4 w-px bg-border/50" />
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
          <Button
            variant={view === "curve" ? "default" : "ghost"}
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => setView("curve")}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Performance Shift
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
          narration={{
            isPlaying: narration.currentView === "calculator" && narration.isPlaying,
            isLoading: narration.currentView === "calculator" && narration.isLoading,
            progress: narration.currentView === "calculator" ? narration.progress : 0,
            hasCompleted: narration.currentView === "calculator" && narration.hasCompleted,
            onPlay: () => {
              if (narration.currentView === "calculator" && !narration.hasCompleted && narration.progress > 0) {
                narration.resume();
              } else {
                narration.play("calculator");
              }
              narration.preloadNext("calculator");
            },
            onPause: () => narration.pause(),
            onNextSlide: () => { narration.stop(); setView("tree"); },
          }}
        />
      ) : view === "tree" ? (
        <LineOfSightTree
          useCaseValues={useCaseValues}
          leadingValues={leadingValues}
          totalCostAvoidance={totalCostAvoidance}
          airlineProfile={airlineProfile}
          narration={{
            isPlaying: narration.currentView === "tree" && narration.isPlaying,
            isLoading: narration.currentView === "tree" && narration.isLoading,
            progress: narration.currentView === "tree" ? narration.progress : 0,
            hasCompleted: narration.currentView === "tree" && narration.hasCompleted,
            onPlay: () => {
              if (narration.currentView === "tree" && !narration.hasCompleted && narration.progress > 0) {
                narration.resume();
              } else {
                narration.play("tree");
              }
              narration.preloadNext("tree");
            },
            onPause: () => narration.pause(),
            onNextSlide: () => { narration.stop(); setView("scorecard"); },
          }}
        />
      ) : view === "scorecard" ? (
        <BalancedScorecard
          useCaseValues={useCaseValues}
          leadingValues={leadingValues}
          totalCostAvoidance={totalCostAvoidance}
          airlineProfile={airlineProfile}
          narration={{
            isPlaying: narration.currentView === "scorecard" && narration.isPlaying,
            isLoading: narration.currentView === "scorecard" && narration.isLoading,
            progress: narration.currentView === "scorecard" ? narration.progress : 0,
            hasCompleted: narration.currentView === "scorecard" && narration.hasCompleted,
            onPlay: () => {
              if (narration.currentView === "scorecard" && !narration.hasCompleted && narration.progress > 0) {
                narration.resume();
              } else {
                narration.play("scorecard");
              }
              narration.preloadNext("scorecard");
            },
            onPause: () => narration.pause(),
            onNextSlide: () => { narration.stop(); setView("curve"); },
          }}
        />
      ) : (
        <PerformanceShiftCurve
          useCaseValues={useCaseValues}
          leadingValues={leadingValues}
          totalCostAvoidance={totalCostAvoidance}
          airlineProfile={airlineProfile}
          narration={{
            isPlaying: narration.currentView === "curve" && narration.isPlaying,
            isLoading: narration.currentView === "curve" && narration.isLoading,
            progress: narration.currentView === "curve" ? narration.progress : 0,
            hasCompleted: narration.currentView === "curve" && narration.hasCompleted,
            onPlay: () => {
              if (narration.currentView === "curve" && !narration.hasCompleted && narration.progress > 0) {
                narration.resume();
              } else {
                narration.play("curve");
              }
            },
            onPause: () => narration.pause(),
          }}
        />
      )}
    </div>
  );
};

export default LineOfSightPage;
