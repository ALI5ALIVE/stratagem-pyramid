import { useState } from "react";
import { Crown, TrendingUp, Settings, X, ArrowDown, ArrowUp } from "lucide-react";
import {
  executiveOutcomes,
  leadingMeasures,
  useCases,
  computeMetricValue,
  type UseCase,
} from "@/data/lineOfSightData";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const stakeholderIcons: Record<string, React.ReactNode> = {
  Crown: <Crown className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
};

const tabColors: Record<string, { active: string; text: string; border: string; slider: string; badge: string }> = {
  emerald: {
    active: "data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300 data-[state=active]:border-emerald-500/50",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    slider: "[&_[role=slider]]:bg-emerald-400 [&_[class*=Range]]:bg-emerald-500",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  amber: {
    active: "data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300 data-[state=active]:border-amber-500/50",
    text: "text-amber-400",
    border: "border-amber-500/30",
    slider: "[&_[role=slider]]:bg-amber-400 [&_[class*=Range]]:bg-amber-500",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  sky: {
    active: "data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-300 data-[state=active]:border-sky-500/50",
    text: "text-sky-400",
    border: "border-sky-500/30",
    slider: "[&_[role=slider]]:bg-sky-400 [&_[class*=Range]]:bg-sky-500",
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  },
};

const SlideLineOfSight = () => {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [measureValues, setMeasureValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    leadingMeasures.forEach((m) => {
      initial[m.id] = m.baselineValue;
    });
    return initial;
  });

  const handleSliderChange = (measureId: string, value: number[]) => {
    setMeasureValues((prev) => ({ ...prev, [measureId]: value[0] }));
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              <span className="title-accent">Line of Sight</span>
            </h1>
            <p className="text-primary text-base sm:text-lg mt-2 max-w-2xl">
              From platform use case to executive outcome
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="cfo" className="w-full">
            <TabsList className="bg-card/50 border border-border/30 mb-6">
              {executiveOutcomes.map((eo) => {
                const colors = tabColors[eo.accentColor];
                return (
                  <TabsTrigger
                    key={eo.id}
                    value={eo.id}
                    className={cn(
                      "gap-2 border border-transparent transition-all",
                      colors.active
                    )}
                  >
                    {stakeholderIcons[eo.icon]}
                    {eo.stakeholder}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {executiveOutcomes.map((eo) => {
              const colors = tabColors[eo.accentColor];
              const connectedMeasures = leadingMeasures.filter((lm) =>
                lm.connectedOutcomes.includes(eo.id)
              );
              const connectedMeasureIds = new Set(connectedMeasures.map((m) => m.id));
              const connectedUseCases = useCases.filter((uc) =>
                uc.connectedMeasures.some((mId) => connectedMeasureIds.has(mId))
              );

              return (
                <TabsContent key={eo.id} value={eo.id} className="space-y-6">
                  {/* Tier 1: Lagging Metrics */}
                  <div>
                    <h3 className={cn("text-xs font-semibold uppercase tracking-wider mb-3", colors.text)}>
                      Lagging Measures — {eo.stakeholder} Outcomes
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {eo.metrics.map((metric) => {
                        const computed = computeMetricValue(metric, measureValues, leadingMeasures);
                        const delta = computed - metric.baselineValue;
                        const improved = metric.direction === "up" ? delta > 0.05 : delta < -0.05;
                        return (
                          <div
                            key={metric.id}
                            className={cn(
                              "rounded-lg border bg-gradient-to-br p-4",
                              eo.color
                            )}
                          >
                            <p className="text-xs text-muted-foreground mb-1">
                              {metric.label}
                            </p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-foreground">
                                {metric.unit === "$M"
                                  ? `$${computed.toFixed(1)}M`
                                  : `${computed.toFixed(1)}${metric.unit}`}
                              </span>
                              {Math.abs(delta) > 0.05 && (
                                <span
                                  className={cn(
                                    "flex items-center gap-0.5 text-xs font-medium",
                                    improved ? "text-emerald-400" : "text-red-400"
                                  )}
                                >
                                  {improved ? (
                                    <ArrowUp className="w-3 h-3" />
                                  ) : (
                                    <ArrowDown className="w-3 h-3" />
                                  )}
                                  {Math.abs(delta).toFixed(1)}
                                  {metric.unit === "$M" ? "M" : metric.unit}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1">
                              Baseline:{" "}
                              {metric.unit === "$M"
                                ? `$${metric.baselineValue}M`
                                : `${metric.baselineValue}${metric.unit}`}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tier 2: Leading Measures with Sliders */}
                  <div>
                    <h3 className={cn("text-xs font-semibold uppercase tracking-wider mb-3", colors.text)}>
                      Leading Measures — Adjust to See Impact
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {connectedMeasures.map((lm) => {
                        const currentVal = measureValues[lm.id] ?? lm.baselineValue;
                        const improved = currentVal < lm.baselineValue;
                        return (
                          <div
                            key={lm.id}
                            className="rounded-lg border border-border/40 bg-card/30 p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-foreground">
                                {lm.shortLabel}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={cn(
                                    "text-sm font-semibold",
                                    improved ? "text-emerald-400" : "text-foreground"
                                  )}
                                >
                                  {currentVal}
                                  {lm.unit}
                                </span>
                                {improved && (
                                  <ArrowDown className="w-3 h-3 text-emerald-400" />
                                )}
                              </div>
                            </div>
                            <Slider
                              value={[currentVal]}
                              min={lm.min}
                              max={lm.max}
                              step={lm.step}
                              onValueChange={(v) => handleSliderChange(lm.id, v)}
                              className={cn("cursor-pointer", colors.slider)}
                            />
                            <div className="flex justify-between mt-1">
                              <span className="text-[10px] text-muted-foreground">
                                Best: {lm.min}
                                {lm.unit}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                Baseline: {lm.baselineValue}
                                {lm.unit}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tier 3: Use Cases */}
                  <div>
                    <h3 className={cn("text-xs font-semibold uppercase tracking-wider mb-3", colors.text)}>
                      Platform Use Cases
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {useCases.map((uc) => {
                        const isConnected = connectedUseCases.some((c) => c.id === uc.id);
                        const isSelected = selectedUseCase?.id === uc.id;
                        return (
                          <button
                            key={uc.id}
                            onClick={() =>
                              setSelectedUseCase((prev) =>
                                prev?.id === uc.id ? null : uc
                              )
                            }
                            className={cn(
                              "rounded-md border p-2 text-left transition-all duration-300 cursor-pointer",
                              isSelected
                                ? "border-primary bg-primary/15 shadow-[0_0_15px_hsl(217_100%_50%/0.15)]"
                                : isConnected
                                  ? "border-border/50 bg-card/50 hover:border-primary/40 hover:bg-primary/5"
                                  : "border-border/20 bg-card/20 opacity-30"
                            )}
                          >
                            <span className="text-xs font-medium text-foreground">
                              {uc.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Detail Panel */}
                  {selectedUseCase && (
                    <div className="relative rounded-lg border border-primary/30 bg-primary/5 p-5">
                      <button
                        onClick={() => setSelectedUseCase(null)}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {selectedUseCase.label}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {selectedUseCase.description}
                      </p>
                      <div className="mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Measures Impacted
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {selectedUseCase.connectedMeasures.map((mId) => {
                            const measure = leadingMeasures.find((m) => m.id === mId);
                            return measure ? (
                              <span
                                key={mId}
                                className={cn(
                                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                                  colors.badge
                                )}
                              >
                                {measure.shortLabel}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                      <div className="border-t border-border/30 pt-3">
                        <p className="text-xs italic text-muted-foreground">
                          {selectedUseCase.methodology}
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SlideLineOfSight;
