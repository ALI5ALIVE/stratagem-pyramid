import React, { useState } from "react";
import { Crown, TrendingUp, Settings, ArrowDown, ArrowUp, ChevronDown, ChevronUp, AlertTriangle, Plane, Building2, Search, Zap, CheckCircle } from "lucide-react";
import {
  executiveOutcomes,
  leadingMeasures,
  useCases,
  computeMetricValue,
  computeUseCaseCostImpact,
  computeScaledCostMidpoint,
  airlinePresets,
  type AirlineProfile,
  type ExecutiveOutcome,
} from "@/data/lineOfSightData";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

interface SlideLineOfSightProps {
  useCaseValues: Record<string, number>;
  setUseCaseValues: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  airlineProfile: AirlineProfile;
  setAirlineProfile: React.Dispatch<React.SetStateAction<AirlineProfile>>;
  leadingValues: Record<string, number>;
  totalCostAvoidance: number;
  narration?: NarrationProps;
}

const tabColors: Record<string, { text: string; border: string; slider: string; badge: string; icon: React.ReactNode; tabActive: string }> = {
  cfo: {
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    slider: "[&_[role=slider]]:bg-emerald-400 [&_[class*=Range]]:bg-emerald-500",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    tabActive: "data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-300",
  },
  ceo: {
    text: "text-amber-400",
    border: "border-amber-500/30",
    slider: "[&_[role=slider]]:bg-amber-400 [&_[class*=Range]]:bg-amber-500",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    icon: <Crown className="w-3.5 h-3.5" />,
    tabActive: "data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-300",
  },
  coo: {
    text: "text-sky-400",
    border: "border-sky-500/30",
    slider: "[&_[role=slider]]:bg-sky-400 [&_[class*=Range]]:bg-sky-500",
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    icon: <Settings className="w-3.5 h-3.5" />,
    tabActive: "data-[state=active]:bg-sky-500/15 data-[state=active]:text-sky-300",
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

const SIMPLE_USE_CASE_IDS = ["uc3", "uc7"];

const SlideLineOfSight = ({
  useCaseValues,
  setUseCaseValues,
  airlineProfile,
  setAirlineProfile,
  leadingValues,
  totalCostAvoidance,
  narration,
}: SlideLineOfSightProps) => {
  const [activeTab, setActiveTab] = useState<string>("cfo");
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(true);
  const [calculatorMode, setCalculatorMode] = useState<"simple" | "advanced">("simple");

  const visibleUseCases = calculatorMode === "simple"
    ? useCases.filter((uc) => SIMPLE_USE_CASE_IDS.includes(uc.id))
    : useCases;

  const handleUseCaseChange = (ucId: string, value: number[]) => {
    setUseCaseValues((prev) => ({ ...prev, [ucId]: value[0] }));
  };

  const handleProfileField = (field: keyof AirlineProfile, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0) {
      setAirlineProfile((prev) => ({ ...prev, [field]: num }));
    }
  };

  const activeOutcome: ExecutiveOutcome =
    executiveOutcomes.find((eo) => eo.id === activeTab) ?? executiveOutcomes[0];
  const colors = tabColors[activeOutcome.id] ?? tabColors.cfo;

  const connectedMeasureIds = new Set(activeOutcome.metrics.flatMap((m) => Object.keys(m.weights)));
  const connectedUseCaseIds = new Set(
    useCases
      .filter((uc) => Object.keys(uc.impactOnMeasures).some((mId) => connectedMeasureIds.has(mId)))
      .map((uc) => uc.id)
  );
  const connectedMeasures = leadingMeasures.filter((lm) => connectedMeasureIds.has(lm.id));

  const profileInputs: { field: keyof AirlineProfile; label: string; unit: string; step: number }[] = [
    { field: "fleetSize", label: "Aircraft", unit: "aircraft", step: 1 },
    { field: "annualFuelSpendM", label: "Fuel Spend", unit: "$M/yr", step: 10 },
    { field: "dailyDepartures", label: "Departures", unit: "/day", step: 5 },
    { field: "annualPassengersM", label: "Passengers", unit: "M/yr", step: 1 },
    { field: "revenuePerFlight", label: "Rev/Flight", unit: "$", step: 1000 },
  ];

  return (
    <div className="h-[calc(100vh-40px)] w-full flex flex-col overflow-hidden relative">
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

          {/* Stakeholder Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-3">
            <TabsList className="grid grid-cols-3 w-full max-w-xl bg-card/40 border border-border/30">
              {executiveOutcomes.map((eo) => {
                const c = tabColors[eo.id] ?? tabColors.cfo;
                return (
                  <TabsTrigger
                    key={eo.id}
                    value={eo.id}
                    className={cn("flex items-center gap-1.5 text-xs font-semibold", c.tabActive)}
                  >
                    {c.icon}
                    {eo.stakeholder}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          {/* Tier 1: Executive Outcome Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            {activeOutcome.metrics.map((metric) => {
              const computed = computeMetricValue(metric, leadingValues, leadingMeasures);
              const delta = computed - metric.baselineValue;
              const improved = metric.direction === "up" ? delta > 0.05 : delta < -0.05;
              const valStr = metric.unit === "$M" ? `$${computed.toFixed(1)}M` : `${computed.toFixed(1)}${metric.unit}`;
              return (
                <div key={metric.id} className={cn("rounded-lg border bg-gradient-to-br p-2.5", activeOutcome.color)}>
                  <p className="text-[10px] text-muted-foreground mb-0.5">{metric.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-foreground">{valStr}</span>
                    {Math.abs(delta) > 0.05 && (
                      <span className={cn("flex items-center gap-0.5 text-[10px] font-medium", improved ? "text-emerald-400" : "text-red-400")}>
                        {improved ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                        {Math.abs(delta).toFixed(1)}{metric.unit === "$M" ? "M" : metric.unit}
                      </span>
                    )}
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-0.5">Baseline: {metric.unit === "$M" ? `$${metric.baselineValue}M` : `${metric.baselineValue}${metric.unit}`}</p>
                </div>
              );
            })}
          </div>

          {/* Tier 2: Leading Measures with % gain badges */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Leading Measures:</span>
            {connectedMeasures.map((lm) => {
              const current = leadingValues[lm.id] ?? lm.baselineValue;
              const diff = lm.direction === "down" ? lm.baselineValue - current : current - lm.baselineValue;
              const pct = lm.baselineValue !== 0 ? (diff / lm.baselineValue) * 100 : 0;
              const improved = pct > 0.05;
              const arrow = lm.direction === "down" ? "↓" : "↑";
              const unitLabel = lm.unit === "%" ? "%" : ` ${lm.unit}`;
              return (
                <span
                  key={lm.id}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    improved
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-border/40 bg-card/30 text-foreground"
                  )}
                >
                  {lm.shortLabel}
                  <span className="text-sm font-bold">
                    {improved ? `${arrow} ${Math.abs(pct).toFixed(1)}${unitLabel}` : "—"}
                  </span>
                </span>
              );
            })}
          </div>

          {/* Calculator Mode Toggle */}
          <div className="flex items-center gap-2 mb-1">
            <div className="inline-flex rounded-lg border border-border/30 bg-card/50 p-0.5">
              <Button
                variant={calculatorMode === "simple" ? "default" : "ghost"}
                size="sm"
                className="h-6 text-[10px] px-2.5"
                onClick={() => setCalculatorMode("simple")}
              >
                Quick View (2)
              </Button>
              <Button
                variant={calculatorMode === "advanced" ? "default" : "ghost"}
                size="sm"
                className="h-6 text-[10px] px-2.5"
                onClick={() => setCalculatorMode("advanced")}
              >
                Full Model ({useCases.length})
              </Button>
            </div>
            {calculatorMode === "simple" && (
              <span className="text-[9px] text-muted-foreground">
                Showing {SIMPLE_USE_CASE_IDS.length} of {useCases.length} use cases — switch to Full Model for complete analysis
              </span>
            )}
          </div>

          {/* Tier 3: Use Case Input Sliders */}
          <div className={cn("grid gap-1.5", calculatorMode === "simple" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4")}>
            {visibleUseCases.map((uc) => {
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
                    "rounded-lg border p-1.5 transition-all duration-300",
                    isConnected
                      ? "border-border/50 bg-card/40"
                      : "border-border/30 bg-card/30 opacity-50",
                    isExpanded && "ring-1 ring-primary/40"
                  )}
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedUseCase(isExpanded ? null : uc.id)}
                    className="w-full flex items-start justify-between mb-1 cursor-pointer hover:bg-muted/20 rounded p-0.5 -m-0.5 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-foreground text-left leading-tight">{uc.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={cn(
                        "inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] font-bold",
                        severityColors[uc.input.severity]
                      )}>
                        {uc.input.severity}
                      </span>
                      {isExpanded ? <ChevronUp className="w-3 h-3 text-muted-foreground" /> : <ChevronDown className="w-3 h-3 text-muted-foreground" />}
                    </div>
                  </button>

                  {/* Slider */}
                  <div className="mb-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] text-muted-foreground">{uc.input.inputLabel}</span>
                      <div className="flex items-center gap-1">
                        <span className={cn("text-xs font-semibold", improved ? "text-emerald-400" : "text-foreground")}>
                          {currentVal}{uc.input.unit}
                        </span>
                        {improved && <ArrowDown className="w-2.5 h-2.5 text-emerald-400" />}
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
                    <div className="flex justify-between mt-0.5">
                      <span className="text-[8px] text-muted-foreground">Best: {uc.input.min}{uc.input.unit}</span>
                      <span className="text-[8px] text-muted-foreground">Baseline: {uc.input.baseline}{uc.input.unit}</span>
                    </div>
                  </div>

                  {/* Cost basis */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-muted-foreground">
                      {formatCurrency(scaledCost)} per {uc.input.unit === "%" ? "point" : uc.input.unit.replace(/s$/, "")}
                    </span>
                    {improved && costImpact > 0 && (
                      <span className="text-[9px] font-semibold text-emerald-400">
                        −{formatCurrency(costImpact)}/yr
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total cost avoidance footer */}
          {totalCostAvoidance > 0 && (
            <div className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Total Annual Cost Avoidance</span>
              <span className="text-xl font-bold text-emerald-300">{formatCurrency(totalCostAvoidance)}</span>
            </div>
          )}

          {/* Use Case Detail Dialog */}
          <Dialog open={!!expandedUseCase} onOpenChange={(open) => { if (!open) setExpandedUseCase(null); }}>
            <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
              {(() => {
                const uc = useCases.find((u) => u.id === expandedUseCase);
                if (!uc) return null;
                return (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-sm font-semibold">{uc.label}</DialogTitle>
                    </DialogHeader>
                    <p className="text-xs text-muted-foreground">{uc.description}</p>
                    <div className="grid grid-cols-2 gap-3">
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
                              <span key={mId} className={cn("inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium", colors.badge)}>
                                {measure.shortLabel}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] italic text-muted-foreground pt-2 border-t border-border/20">
                      {uc.methodology}
                    </p>
                    <div className="pt-2 border-t border-border/20">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Platform Mechanism — DTOP</span>
                      <div className="flex items-center gap-1 mt-1 flex-wrap">
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
                              <span className={cn("text-[10px] font-medium", stepColors[i] || "text-muted-foreground")}>{step}</span>
                              {i < steps.length - 1 && <span className="text-[10px] text-muted-foreground/40 mx-0.5">→</span>}
                            </span>
                          ));
                        })()}
                      </div>
                    </div>
                    <div className="rounded-md bg-primary/5 border border-primary/20 p-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/70">Why Point Solutions Fall Short</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{uc.pointSolutionGap}</p>
                    </div>
                  </>
                );
              })()}
            </DialogContent>
          </Dialog>

        </div>
      </div>

      {narration && (
        <SlidePlayButton
          isPlaying={narration.isPlaying}
          isLoading={narration.isLoading}
          progress={narration.progress}
          hasCompleted={narration.hasCompleted}
          onPlay={narration.onPlay}
          onPause={narration.onPause}
          onNextSlide={narration.onNextSlide}
        />
      )}
    </div>
  );
};

export default SlideLineOfSight;
