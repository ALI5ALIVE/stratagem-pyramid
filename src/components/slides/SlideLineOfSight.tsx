import React, { useState } from "react";
import { Crown, TrendingUp, Settings, ArrowDown, ArrowUp, ChevronDown, ChevronUp, AlertTriangle, Plane, Building2, Info, Search, Zap, CheckCircle } from "lucide-react";
import {
  executiveOutcomes,
  leadingMeasures,
  useCases,
  computeMetricValue,
  computeUseCaseCostImpact,
  computeScaledCostMidpoint,
  airlinePresets,
  sourceCitations,
  type AirlineProfile,
} from "@/data/lineOfSightData";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SlideLineOfSightProps {
  useCaseValues: Record<string, number>;
  setUseCaseValues: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  airlineProfile: AirlineProfile;
  setAirlineProfile: React.Dispatch<React.SetStateAction<AirlineProfile>>;
  leadingValues: Record<string, number>;
  totalCostAvoidance: number;
}

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

const severityColors: Record<string, string> = {
  Low: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  Medium: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  High: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  "Very High": "bg-red-500/15 text-red-300 border-red-500/30",
};

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

function formatCompact(value: number, unit: string): string {
  if (unit === "$M") return `$${value}M`;
  if (unit === "$/flight") return `$${(value / 1000).toFixed(0)}K`;
  if (unit === "M pax") return `${value}M`;
  return `${value}`;
}

const SlideLineOfSight = ({
  useCaseValues,
  setUseCaseValues,
  airlineProfile,
  setAirlineProfile,
  leadingValues,
  totalCostAvoidance,
}: SlideLineOfSightProps) => {
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleUseCaseChange = (ucId: string, value: number[]) => {
    setUseCaseValues((prev) => ({ ...prev, [ucId]: value[0] }));
  };

  const handleProfileField = (field: keyof AirlineProfile, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0) {
      setAirlineProfile((prev) => ({ ...prev, [field]: num }));
    }
  };

  // Determine which use cases are connected to a stakeholder via leading measures
  const getConnectedUseCaseIds = (outcomeId: string): Set<string> => {
    const connectedMeasureIds = new Set(
      executiveOutcomes
        .find((eo) => eo.id === outcomeId)
        ?.metrics.flatMap((m) => Object.keys(m.weights)) ?? []
    );
    return new Set(
      useCases
        .filter((uc) =>
          Object.keys(uc.impactOnMeasures).some((mId) => connectedMeasureIds.has(mId))
        )
        .map((uc) => uc.id)
    );
  };

  const getConnectedMeasureIds = (outcomeId: string): Set<string> => {
    return new Set(
      executiveOutcomes
        .find((eo) => eo.id === outcomeId)
        ?.metrics.flatMap((m) => Object.keys(m.weights)) ?? []
    );
  };

  const profileInputs: { field: keyof AirlineProfile; label: string; unit: string; step: number }[] = [
    { field: "fleetSize", label: "Aircraft", unit: "aircraft", step: 1 },
    { field: "annualFuelSpendM", label: "Fuel Spend", unit: "$M/yr", step: 10 },
    { field: "dailyDepartures", label: "Departures", unit: "/day", step: 5 },
    { field: "annualPassengersM", label: "Passengers", unit: "M/yr", step: 1 },
    { field: "revenuePerFlight", label: "Rev/Flight", unit: "$", step: 1000 },
  ];

  return (
    <div className="h-[calc(100vh-40px)] w-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto lg:overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

          {/* Airline Profile Panel */}
          <div className="mb-3 rounded-lg border border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Your Airline</span>
                {!profileOpen && (
                  <span className="text-xs text-muted-foreground ml-2">
                    {airlineProfile.fleetSize} aircraft · ${airlineProfile.annualFuelSpendM}M fuel · {airlineProfile.dailyDepartures} flights/day · {airlineProfile.annualPassengersM}M pax/yr
                  </span>
                )}
              </div>
              {profileOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>

            {profileOpen && (
              <div className="px-4 pb-4 space-y-3">
                {/* Presets */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Presets:</span>
                  {airlinePresets.map((preset) => (
                    <Button
                      key={preset.label}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs border-border/50 hover:border-primary/50 hover:bg-primary/10"
                      onClick={() => setAirlineProfile({ ...preset.profile })}
                    >
                      <Plane className="w-3 h-3 mr-1" />
                      {preset.label}
                    </Button>
                  ))}
                </div>

                {/* Input fields */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {profileInputs.map(({ field, label, unit, step }) => (
                    <div key={field} className="space-y-1">
                      <label className="text-[10px] font-medium text-muted-foreground">{label}</label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={airlineProfile[field]}
                          onChange={(e) => handleProfileField(field, e.target.value)}
                          step={step}
                          min={0}
                          className="h-8 text-sm pr-12 bg-card/50 border-border/40"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground pointer-events-none">
                          {unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Tabs defaultValue="cfo" className="w-full">
            <TabsList className="bg-card/50 border border-border/30 mb-3">
              {executiveOutcomes.map((eo) => {
                const colors = tabColors[eo.accentColor];
                return (
                  <TabsTrigger
                    key={eo.id}
                    value={eo.id}
                    className={cn("gap-2 border border-transparent transition-all", colors.active)}
                  >
                    {stakeholderIcons[eo.icon]}
                    {eo.stakeholder}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {executiveOutcomes.map((eo) => {
              const colors = tabColors[eo.accentColor];
              const connectedMeasureIds = getConnectedMeasureIds(eo.id);
              const connectedUseCaseIds = getConnectedUseCaseIds(eo.id);
              const connectedMeasures = leadingMeasures.filter((lm) => connectedMeasureIds.has(lm.id));

              return (
                <TabsContent key={eo.id} value={eo.id} className="space-y-2">
                  {/* Tier 1: Executive Outcomes + Cost Avoidance merged */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    {eo.metrics.map((metric) => {
                      const computed = computeMetricValue(metric, leadingValues, leadingMeasures);
                      const delta = computed - metric.baselineValue;
                      const improved = metric.direction === "up" ? delta > 0.05 : delta < -0.05;
                      return (
                        <div
                          key={metric.id}
                          className={cn("rounded-lg border bg-gradient-to-br p-2", eo.color)}
                        >
                          <p className="text-[10px] text-muted-foreground mb-0.5">{metric.label}</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-foreground">
                              {metric.unit === "$M"
                                ? `$${computed.toFixed(1)}M`
                                : `${computed.toFixed(1)}${metric.unit}`}
                            </span>
                            {Math.abs(delta) > 0.05 && (
                              <span
                                className={cn(
                                  "flex items-center gap-0.5 text-[10px] font-medium",
                                  improved ? "text-emerald-400" : "text-red-400"
                                )}
                              >
                                {improved ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                                {Math.abs(delta).toFixed(1)}
                                {metric.unit === "$M" ? "M" : metric.unit}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {/* Cost Avoidance as 4th card */}
                    {totalCostAvoidance > 0 && (
                      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-2">
                        <p className="text-[10px] text-emerald-400 font-semibold mb-0.5">Annual Cost Avoidance*</p>
                        <span className="text-xl font-bold text-emerald-300">{formatCurrency(totalCostAvoidance)}</span>
                      </div>
                    )}
                  </div>

                  {/* Tier 2: Leading Measures as inline pills */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Measures:</span>
                    {connectedMeasures.map((lm) => {
                      const current = leadingValues[lm.id];
                      const delta = lm.direction === "down"
                        ? lm.baselineValue - current
                        : current - lm.baselineValue;
                      const improved = delta > 0.01;
                      return (
                        <TooltipProvider key={lm.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className={cn(
                                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium cursor-default transition-colors",
                                improved
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                  : "border-border/40 bg-card/30 text-foreground"
                              )}>
                                {lm.shortLabel}
                                <span className="font-bold">{current.toFixed(1)}{lm.unit}</span>
                                {improved && (lm.direction === "down" ? <ArrowDown className="w-2.5 h-2.5" /> : <ArrowUp className="w-2.5 h-2.5" />)}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-[10px]">
                              <p>Baseline: {lm.baselineValue}{lm.unit}</p>
                              {improved && <p className="text-emerald-400">Δ {delta.toFixed(1)}{lm.unit} improvement</p>}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </div>

                  {/* Tier 3: Use Case Input Sliders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {useCases.map((uc) => {
                        const isConnected = connectedUseCaseIds.has(uc.id);
                        const currentVal = useCaseValues[uc.id] ?? uc.input.baseline;
                        const improved = currentVal < uc.input.baseline;
                        const costImpact = computeUseCaseCostImpact(uc, currentVal, airlineProfile);
                        const scaledCost = computeScaledCostMidpoint(uc, airlineProfile);
                        const isExpanded = expandedUseCase === uc.id;

                        return (
                          <div
                            key={uc.id}
                            className={cn(
                              "rounded-lg border p-2 transition-all duration-300",
                              isConnected
                                ? "border-border/50 bg-card/40"
                                : "border-border/30 bg-card/30 opacity-50"
                            )}
                          >
                            {/* Header */}
                            <button
                              onClick={() => setExpandedUseCase(isExpanded ? null : uc.id)}
                              className="w-full flex items-start justify-between mb-1.5 cursor-pointer hover:bg-muted/20 rounded p-0.5 -m-0.5 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                                <span className="text-sm font-semibold text-foreground text-left">{uc.label}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className={cn("inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] font-medium", severityColors[uc.input.severity])}>
                                  {uc.input.severity}
                                </span>
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                              </div>
                            </button>

                            {/* Slider */}
                            <div className="mb-1.5">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] text-muted-foreground">{uc.input.inputLabel}</span>
                                <div className="flex items-center gap-1">
                                  <span className={cn("text-sm font-semibold", improved ? "text-emerald-400" : "text-foreground")}>
                                    {currentVal}{uc.input.unit}
                                  </span>
                                  {improved && <ArrowDown className="w-3 h-3 text-emerald-400" />}
                                </div>
                              </div>
                              <Slider
                                value={[currentVal]}
                                min={uc.input.min}
                                max={uc.input.max}
                                step={uc.input.step}
                                onValueChange={(v) => handleUseCaseChange(uc.id, v)}
                                className={cn("cursor-pointer", colors.slider)}
                              />
                              <div className="flex justify-between mt-1">
                                <span className="text-[9px] text-muted-foreground">Best: {uc.input.min}{uc.input.unit}</span>
                                <span className="text-[9px] text-muted-foreground">Baseline: {uc.input.baseline}{uc.input.unit}</span>
                              </div>
                            </div>

                            {/* Cost impact */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] text-muted-foreground">
                                  {formatCurrency(scaledCost)} per {uc.input.unit === "%" ? "point" : uc.input.unit.replace(/s$/, "")}
                                </span>
                                {sourceCitations[uc.id] && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <span className="inline-flex cursor-help">
                                          <Info className="w-3 h-3 text-muted-foreground/50 hover:text-muted-foreground" />
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent side="top" className="max-w-[250px] text-[10px]">
                                        <p className="font-medium mb-0.5">Source</p>
                                        <p>{sourceCitations[uc.id]}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                              {costImpact > 0 && (
                                <span className="text-[10px] font-medium text-emerald-400">
                                  Saving {formatCurrency(costImpact)}/yr
                                </span>
                              )}
                            </div>

                            {/* Expandable detail */}
                            {isExpanded && (
                              <div className="mt-3 pt-3 border-t border-border/30 space-y-2">
                                <p className="text-xs text-muted-foreground">{uc.description}</p>
                                <div>
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Cost Components</span>
                                  <ul className="mt-1 space-y-0.5">
                                    {uc.input.costComponents.map((c, i) => (
                                      <li key={i} className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                                        {c}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Measures Impacted</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {Object.keys(uc.impactOnMeasures).map((mId) => {
                                      const measure = leadingMeasures.find((m) => m.id === mId);
                                      return measure ? (
                                        <span key={mId} className={cn("inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] font-medium", colors.badge)}>
                                          {measure.shortLabel}
                                        </span>
                                      ) : null;
                                    })}
                                  </div>
                                </div>
                                <p className="text-[10px] italic text-muted-foreground pt-1 border-t border-border/20">
                                  {uc.methodology}
                                </p>

                                {/* DTOP Platform Mechanism */}
                                <div className="pt-2 border-t border-border/20">
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Platform Mechanism — DTOP</span>
                                  <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                                    {(() => {
                                      const steps = uc.platformMechanism.split("→").map(s => s.trim());
                                      const stepIcons = [Search, Zap, Settings, CheckCircle];
                                      const stepColors = [
                                        "text-accent",
                                        "text-primary",
                                        "text-sky-400",
                                        "text-emerald-400",
                                      ];
                                      return steps.map((step, i) => (
                                        <span key={i} className="flex items-center gap-1">
                                          {React.createElement(stepIcons[i] || Search, { className: `w-2.5 h-2.5 ${stepColors[i] || "text-muted-foreground"}` })}
                                          <span className={cn("text-[9px] font-medium", stepColors[i] || "text-muted-foreground")}>{step}</span>
                                          {i < steps.length - 1 && <span className="text-[9px] text-muted-foreground/40 mx-0.5">→</span>}
                                        </span>
                                      ));
                                    })()}
                                  </div>
                                </div>

                                {/* Point Solution Gap */}
                                <div className="rounded-md bg-primary/5 border border-primary/20 p-2 mt-1">
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/70">Why Point Solutions Fall Short</span>
                                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{uc.pointSolutionGap}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
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
