import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp, DollarSign, BarChart3, Activity } from "lucide-react";
import { useCases, leadingMeasures, type AirlineProfile } from "@/data/lineOfSightData";
import SlidePlayButton from "@/components/SlidePlayButton";

interface NarrationProps {
  isPlaying: boolean;
  isLoading: boolean;
  progress: number;
  hasCompleted: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNextSlide?: () => void;
}

interface PerformanceShiftCurveProps {
  useCaseValues: Record<string, number>;
  leadingValues: Record<string, number>;
  totalCostAvoidance: number;
  airlineProfile: AirlineProfile;
  narration?: NarrationProps;
}

function gaussian(x: number, mean: number, stdDev: number): number {
  return (
    (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2))
  );
}

const PerformanceShiftCurve = ({
  useCaseValues,
  leadingValues,
  totalCostAvoidance,
  airlineProfile,
  narration,
}: PerformanceShiftCurveProps) => {
  const { baselineMean, improvedMean, baselineStdDev, improvedStdDev, useCasesImproved, avgLeadingShift } =
    useMemo(() => {
      // Normalise each use case to 0-100 scale (inverted: lower input = better performance)
      const baselineNorms: number[] = [];
      const improvedNorms: number[] = [];
      let improved = 0;

      useCases.forEach((uc) => {
        const { baseline, min, max } = uc.input;
        const current = useCaseValues[uc.id] ?? baseline;
        const range = max - min || 1;

        // All use cases are "lower is better" (fewer events/incidents = better)
        // Invert so improvement = higher score
        const baselineNorm = (1 - (baseline - min) / range) * 100;
        const currentNorm = (1 - (current - min) / range) * 100;

        baselineNorms.push(baselineNorm);
        improvedNorms.push(currentNorm);

        if (current < baseline) improved++;
      });

      const bMean = baselineNorms.reduce((s, v) => s + v, 0) / baselineNorms.length;
      const iMean = improvedNorms.reduce((s, v) => s + v, 0) / improvedNorms.length;

      const improvementRatio = bMean > 0 ? Math.min((iMean - bMean) / bMean, 1) : 0;
      const bStdDev = 15;
      const iStdDev = Math.max(15 - improvementRatio * 7, 8);

      // Average leading measure shift
      const shifts = leadingMeasures.map((lm) => {
        const current = leadingValues[lm.id] ?? lm.baselineValue;
        const diff = lm.direction === "up"
          ? current - lm.baselineValue
          : lm.baselineValue - current;
        return lm.baselineValue !== 0 ? (diff / lm.baselineValue) * 100 : 0;
      });
      const avgShift = shifts.reduce((s, v) => s + v, 0) / shifts.length;

      return {
        baselineMean: bMean,
        improvedMean: iMean,
        baselineStdDev: bStdDev,
        improvedStdDev: iStdDev,
        useCasesImproved: improved,
        avgLeadingShift: avgShift,
      };
    }, [useCaseValues, leadingValues]);

  const chartData = useMemo(() => {
    const points: { x: number; baseline: number; improved: number }[] = [];
    for (let x = 0; x <= 100; x += 1) {
      points.push({
        x,
        baseline: gaussian(x, baselineMean, baselineStdDev),
        improved: gaussian(x, improvedMean, improvedStdDev),
      });
    }
    return points;
  }, [baselineMean, improvedMean, baselineStdDev, improvedStdDev]);

  const overallImprovement =
    baselineMean > 0
      ? Math.round(((improvedMean - baselineMean) / baselineMean) * 100)
      : 0;

  const formatCost = (val: number) => {
    if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
    return `$${val.toFixed(0)}`;
  };

  const metrics = [
    {
      icon: TrendingUp,
      label: "Overall Improvement",
      value: `+${overallImprovement}%`,
      color: "text-emerald-400",
    },
    {
      icon: DollarSign,
      label: "Cost Avoidance",
      value: formatCost(totalCostAvoidance),
      color: "text-emerald-400",
    },
    {
      icon: BarChart3,
      label: "Use Cases Improved",
      value: `${useCasesImproved} / ${useCases.length}`,
      color: "text-sky-400",
    },
    {
      icon: Activity,
      label: "Avg Leading Shift",
      value: `+${avgLeadingShift.toFixed(1)}%`,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="flex-1 overflow-hidden relative flex flex-col">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 py-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-foreground">
            Operational Performance Distribution
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            How platform adoption shifts the entire operation toward predictable, measurable performance
          </p>
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-0 bg-card/50 rounded-xl border border-border/30 p-4 relative">
          {/* Legend */}
          <div className="absolute top-3 right-4 flex items-center gap-4 text-xs z-10">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-muted-foreground/30" />
              <span className="text-muted-foreground">Current State</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500/70" />
              <span className="text-muted-foreground">Improved State</span>
            </span>
          </div>

          {/* Shift label */}
          {overallImprovement > 0 && (
            <div className="absolute top-3 left-4 z-10">
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                Performance Shift: +{overallImprovement}%
              </span>
            </div>
          )}

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 30, right: 20, bottom: 20, left: 20 }}>
              <defs>
                <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="improvedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(152 69% 53%)" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="hsl(152 69% 53%)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="x"
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={0.3}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "Operational Performance Score",
                  position: "bottom",
                  offset: 0,
                  style: { fill: "hsl(var(--muted-foreground))", fontSize: 11 },
                }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelFormatter={(val) => `Performance Score: ${val}`}
                formatter={(value: number, name: string) => [
                  (value * 1000).toFixed(2),
                  name === "baseline" ? "Current Distribution" : "Improved Distribution",
                ]}
              />
              <ReferenceLine
                x={Math.round(baselineMean)}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="6 4"
                strokeOpacity={0.5}
                label={{
                  value: `Baseline: ${Math.round(baselineMean)}`,
                  position: "top",
                  style: { fill: "hsl(var(--muted-foreground))", fontSize: 10 },
                }}
              />
              <ReferenceLine
                x={Math.round(improvedMean)}
                stroke="hsl(152 69% 53%)"
                strokeDasharray="6 4"
                strokeOpacity={0.8}
                label={{
                  value: `Improved: ${Math.round(improvedMean)}`,
                  position: "top",
                  style: { fill: "hsl(152 69% 53%)", fontSize: 10 },
                }}
              />
              <Area
                type="monotone"
                dataKey="baseline"
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={0.4}
                fill="url(#baselineGradient)"
                fillOpacity={1}
                animationDuration={800}
              />
              <Area
                type="monotone"
                dataKey="improved"
                stroke="hsl(152 69% 53%)"
                fill="url(#improvedGradient)"
                fillOpacity={1}
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary metrics */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-card/50 rounded-lg border border-border/30 p-3 flex flex-col items-center text-center"
            >
              <m.icon className={`w-4 h-4 ${m.color} mb-1`} />
              <span className={`text-lg font-bold ${m.color}`}>{m.value}</span>
              <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {narration && <SlidePlayButton {...narration} />}
    </div>
  );
};

export default PerformanceShiftCurve;
