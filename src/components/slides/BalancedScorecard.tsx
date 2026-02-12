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
    <div className="h-[calc(100vh-40px)] flex flex-col overflow-hidden max-w-6xl mx-auto px-4 sm:px-6 py-3">
      {/* Header + Overall Improvement + Cost Avoidance */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight">Balanced Scorecard</h2>
          <p className="text-[10px] text-muted-foreground">Strategic objectives driven by operational use case improvements</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Improvement</span>
            <Progress value={Math.min(Math.max(overallImprovement, 0), 100)} className="w-24 h-1.5" />
            <span className={cn(
              "text-sm font-bold",
              overallImprovement > 0 ? "text-emerald-400" : "text-muted-foreground"
            )}>
              {overallImprovement > 0 ? "+" : ""}{overallImprovement.toFixed(1)}%
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Cost Avoidance</span>
            <span className="text-lg font-bold text-emerald-400">
              ${(totalCostAvoidance / 1_000_000).toFixed(1)}M
            </span>
          </div>
        </div>
      </div>

      {/* 2x2 Perspective Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 min-h-0 overflow-y-auto lg:overflow-hidden">
        {perspectiveData.map(({ perspective, kpiResults, avgImprovement }) => (
          <div
            key={perspective.id}
            className={cn(
              "rounded-lg border-l-4 bg-card border border-border overflow-hidden flex flex-col",
              perspective.color
            )}
          >
            {/* Perspective Header */}
            <div className="px-3 py-2 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="text-muted-foreground">{perspectiveIcons[perspective.icon]}</div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{perspective.title}</h3>
                  <p className="text-[10px] text-muted-foreground">{perspective.objective}</p>
                </div>
              </div>
              <span className={cn(
                "text-xs font-semibold",
                avgImprovement > 0 ? "text-emerald-400" : "text-muted-foreground"
              )}>
                {avgImprovement > 0 ? "+" : ""}{avgImprovement.toFixed(1)}%
              </span>
            </div>

            {/* KPI Tiles - horizontal row */}
            <div className="p-2 grid grid-cols-3 gap-2 flex-1">
              {kpiResults.map(({ kpi, current, delta, improvementPct }) => (
                <div
                  key={kpi.id}
                  className="rounded-md border border-border/50 bg-secondary/30 p-2 space-y-1"
                >
                  <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide leading-tight">{kpi.label}</div>
                  <div className="flex items-end justify-between">
                    <span className="text-lg font-bold text-foreground">
                      {kpi.unit === "$M" ? `$${current.toFixed(1)}M` : `${current.toFixed(1)}${kpi.unit}`}
                    </span>
                    <div className={cn(
                      "flex items-center gap-0.5 text-[10px] font-semibold",
                      delta.positive ? "text-emerald-400" : improvementPct === 0 ? "text-muted-foreground" : "text-red-400"
                    )}>
                      {delta.positive ? <ArrowUp className="w-2.5 h-2.5" /> : improvementPct !== 0 ? <ArrowDown className="w-2.5 h-2.5" /> : null}
                      {delta.value}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Progress value={Math.min(Math.max(improvementPct, 0), 100)} className="h-1 flex-1" />
                    <span className="text-[9px] text-muted-foreground">
                      {kpi.unit === "$M" ? `$${kpi.baselineValue}M` : `${kpi.baselineValue}${kpi.unit}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footnote inline */}
      <p className="text-[9px] text-muted-foreground/50 text-center italic mt-1">
        Cost ranges sourced from EUROCONTROL, IATA, SITA, A4A, and WTW (2024–2025). Illustrative figures scaled to your airline profile.
      </p>
    </div>
  );
};

export default BalancedScorecard;
