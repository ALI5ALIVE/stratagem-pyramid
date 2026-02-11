import { useMemo } from "react";
import { TrendingUp, TrendingDown, Users, Settings, Lightbulb, ArrowUp, ArrowDown } from "lucide-react";
import {
  balancedScorecardPerspectives,
  leadingMeasures,
  computeMetricValue,
  useCases,
  type AirlineProfile,
  type ScorecardKPI,
} from "@/data/lineOfSightData";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface BalancedScorecardProps {
  useCaseValues: Record<string, number>;
  leadingValues: Record<string, number>;
  totalCostAvoidance: number;
  airlineProfile: AirlineProfile;
}

const perspectiveIcons: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  Lightbulb: <Lightbulb className="w-5 h-5" />,
};

function computeKpiValue(
  kpi: ScorecardKPI,
  leadingValues: Record<string, number>,
  useCaseValues: Record<string, number>
): number {
  // For direct use case KPIs (like baggage rate), use the slider value
  if (kpi.directUseCaseId) {
    const uc = useCases.find((u) => u.id === kpi.directUseCaseId);
    if (uc) return useCaseValues[uc.id] ?? uc.input.baseline;
  }
  return computeMetricValue(
    { ...kpi, id: kpi.id, label: kpi.label },
    leadingValues,
    leadingMeasures
  );
}

function computeDelta(baseline: number, current: number, direction: "up" | "down", unit: string): { value: string; positive: boolean } {
  if (unit === "$M") {
    return { value: `+$${current.toFixed(1)}M`, positive: current > 0 };
  }
  const diff = current - baseline;
  const isPositive = direction === "up" ? diff > 0 : diff < 0;
  const sign = diff >= 0 ? "+" : "";
  if (unit === "%" || unit === "pts" || unit === "hrs" || unit === "/1000") {
    return { value: `${sign}${diff.toFixed(1)}${unit === "%" ? "pp" : ` ${unit}`}`, positive: isPositive };
  }
  return { value: `${sign}${diff.toFixed(1)}`, positive: isPositive };
}

function computeImprovementPct(baseline: number, current: number, direction: "up" | "down"): number {
  if (baseline === 0) return current > 0 ? 100 : 0;
  if (direction === "up") return ((current - baseline) / baseline) * 100;
  return ((baseline - current) / baseline) * 100;
}

const BalancedScorecard = ({ useCaseValues, leadingValues, totalCostAvoidance, airlineProfile }: BalancedScorecardProps) => {
  const perspectiveData = useMemo(() => {
    return balancedScorecardPerspectives.map((p) => {
      const kpiResults = p.kpis.map((kpi) => {
        const current = computeKpiValue(kpi, leadingValues, useCaseValues);
        const delta = computeDelta(kpi.baselineValue, current, kpi.direction, kpi.unit);
        const improvementPct = computeImprovementPct(kpi.baselineValue, current, kpi.direction);
        return { kpi, current, delta, improvementPct };
      });
      const avgImprovement = kpiResults.reduce((s, k) => s + k.improvementPct, 0) / kpiResults.length;
      return { perspective: p, kpiResults, avgImprovement };
    });
  }, [leadingValues, useCaseValues]);

  const overallImprovement = useMemo(() => {
    const avg = perspectiveData.reduce((s, p) => s + p.avgImprovement, 0) / perspectiveData.length;
    return avg;
  }, [perspectiveData]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Balanced Scorecard</h2>
        <p className="text-sm text-muted-foreground mt-1">Strategic objectives driven by operational use case improvements</p>
      </div>

      {/* Overall Improvement Strip */}
      <div className="rounded-lg border border-border bg-card p-4 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Overall Strategic Improvement</span>
        <div className="flex items-center gap-3">
          <Progress value={Math.min(Math.max(overallImprovement, 0), 100)} className="w-32 h-2" />
          <span className={cn(
            "text-xl font-bold",
            overallImprovement > 0 ? "text-emerald-400" : "text-muted-foreground"
          )}>
            {overallImprovement > 0 ? "+" : ""}{overallImprovement.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Perspective Cards */}
      {perspectiveData.map(({ perspective, kpiResults, avgImprovement }) => (
        <div
          key={perspective.id}
          className={cn(
            "rounded-lg border-l-4 bg-card border border-border overflow-hidden",
            perspective.color
          )}
        >
          {/* Perspective Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="text-muted-foreground">{perspectiveIcons[perspective.icon]}</div>
              <div>
                <h3 className="text-base font-semibold text-foreground">{perspective.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{perspective.objective}</p>
              </div>
            </div>
            <span className={cn(
              "text-sm font-semibold",
              avgImprovement > 0 ? "text-emerald-400" : "text-muted-foreground"
            )}>
              {avgImprovement > 0 ? "+" : ""}{avgImprovement.toFixed(1)}%
            </span>
          </div>

          {/* KPI Tiles */}
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {kpiResults.map(({ kpi, current, delta, improvementPct }) => (
              <div
                key={kpi.id}
                className="rounded-md border border-border/50 bg-secondary/30 p-3 space-y-2"
              >
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{kpi.label}</div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    {kpi.unit === "$M" ? `$${current.toFixed(1)}M` : `${current.toFixed(1)}${kpi.unit}`}
                  </span>
                  <div className={cn(
                    "flex items-center gap-0.5 text-xs font-semibold",
                    delta.positive ? "text-emerald-400" : improvementPct === 0 ? "text-muted-foreground" : "text-red-400"
                  )}>
                    {delta.positive ? <ArrowUp className="w-3 h-3" /> : improvementPct !== 0 ? <ArrowDown className="w-3 h-3" /> : null}
                    {delta.value}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={Math.min(Math.max(improvementPct, 0), 100)} className="h-1.5 flex-1" />
                  <span className="text-[10px] text-muted-foreground">
                    base: {kpi.unit === "$M" ? `$${kpi.baselineValue}M` : `${kpi.baselineValue}${kpi.unit}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Total Cost Avoidance */}
      <div className="rounded-lg border border-border bg-card p-4 text-center">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Annualised Cost Avoidance</span>
        <div className="text-3xl font-bold text-emerald-400 mt-1">
          ${(totalCostAvoidance / 1_000_000).toFixed(1)}M
        </div>
      </div>
    </div>
  );
};

export default BalancedScorecard;
