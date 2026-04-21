import { useState, useRef, useLayoutEffect, useCallback } from "react";
import SlidePlayButton from "@/components/SlidePlayButton";
import { Crown, TrendingUp, Settings, ArrowUp, ArrowDown } from "lucide-react";
import {
  executiveOutcomes,
  leadingMeasures,
  useCases,
  computeMetricValue,
  type AirlineProfile,
} from "@/data/lineOfSightData";
import { cn } from "@/lib/utils";

interface NarrationProps {
  isPlaying: boolean;
  isLoading: boolean;
  progress: number;
  hasCompleted: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNextSlide?: () => void;
}

interface LineOfSightTreeProps {
  useCaseValues: Record<string, number>;
  leadingValues: Record<string, number>;
  totalCostAvoidance: number;
  airlineProfile: AirlineProfile;
  narration?: NarrationProps;
}

interface NodeRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const stakeholderIcons: Record<string, React.ReactNode> = {
  Crown: <Crown className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
};

const accentColors: Record<string, { line: string; bg: string; text: string; glow: string }> = {
  emerald: { line: "#34d399", bg: "bg-emerald-500/15", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
  amber: { line: "#fbbf24", bg: "bg-amber-500/15", text: "text-amber-400", glow: "shadow-amber-500/20" },
  sky: { line: "#38bdf8", bg: "bg-sky-500/15", text: "text-sky-400", glow: "shadow-sky-500/20" },
};

// Build connection maps
function buildConnections() {
  // UC -> LM connections (from impactOnMeasures)
  const ucToLm: { ucId: string; lmId: string; weight: number }[] = [];
  for (const uc of useCases) {
    for (const [lmId, weight] of Object.entries(uc.impactOnMeasures)) {
      ucToLm.push({ ucId: uc.id, lmId, weight });
    }
  }

  // LM -> EO connections (from metric.weights)
  const lmToEo: { lmId: string; eoId: string; metricId: string; weight: number; color: string }[] = [];
  for (const eo of executiveOutcomes) {
    for (const metric of eo.metrics) {
      for (const [lmId, weight] of Object.entries(metric.weights)) {
        lmToEo.push({ lmId, eoId: eo.id, metricId: metric.id, weight, color: eo.accentColor });
      }
    }
  }

  return { ucToLm, lmToEo };
}

const { ucToLm, lmToEo } = buildConnections();

function getCenter(rect: NodeRect, side: "top" | "bottom"): { x: number; y: number } {
  return {
    x: rect.x + rect.width / 2,
    y: side === "top" ? rect.y : rect.y + rect.height,
  };
}

const LineOfSightTree = ({ useCaseValues, leadingValues, totalCostAvoidance, airlineProfile, narration }: LineOfSightTreeProps) => {
  const [highlighted, setHighlighted] = useState<{ type: "uc" | "lm" | "eo"; id: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ucRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lmRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const eoRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [rects, setRects] = useState<{
    uc: Record<string, NodeRect>;
    lm: Record<string, NodeRect>;
    eo: Record<string, NodeRect>;
  }>({ uc: {}, lm: {}, eo: {} });

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const offset = { x: containerRect.left, y: containerRect.top };

    const readRects = (refs: Record<string, HTMLDivElement | null>) => {
      const result: Record<string, NodeRect> = {};
      for (const [id, el] of Object.entries(refs)) {
        if (el) {
          const r = el.getBoundingClientRect();
          result[id] = { x: r.left - offset.x, y: r.top - offset.y, width: r.width, height: r.height };
        }
      }
      return result;
    };

    setRects({
      uc: readRects(ucRefs.current),
      lm: readRects(lmRefs.current),
      eo: readRects(eoRefs.current),
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Determine which connections are highlighted
  const isConnectionHighlighted = (type: "uc-lm" | "lm-eo", ids: { ucId?: string; lmId: string; eoId?: string }) => {
    if (!highlighted) return true;
    if (highlighted.type === "uc") {
      if (type === "uc-lm") return ids.ucId === highlighted.id;
      if (type === "lm-eo") {
        return ucToLm.some((c) => c.ucId === highlighted.id && c.lmId === ids.lmId);
      }
    }
    if (highlighted.type === "lm") {
      return ids.lmId === highlighted.id;
    }
    if (highlighted.type === "eo") {
      if (type === "lm-eo") return ids.eoId === highlighted.id;
      if (type === "uc-lm") {
        return lmToEo.some((c) => c.eoId === highlighted.id && c.lmId === ids.lmId);
      }
    }
    return false;
  };

  const isNodeHighlighted = (type: "uc" | "lm" | "eo", id: string) => {
    if (!highlighted) return true;
    if (highlighted.type === type && highlighted.id === id) return true;
    if (highlighted.type === "uc") {
      if (type === "lm") return ucToLm.some((c) => c.ucId === highlighted.id && c.lmId === id);
      if (type === "eo") {
        const connectedLms = ucToLm.filter((c) => c.ucId === highlighted.id).map((c) => c.lmId);
        return lmToEo.some((c) => connectedLms.includes(c.lmId) && c.eoId === id);
      }
    }
    if (highlighted.type === "lm") {
      if (type === "uc") return ucToLm.some((c) => c.lmId === highlighted.id && c.ucId === id);
      if (type === "eo") return lmToEo.some((c) => c.lmId === highlighted.id && c.eoId === id);
    }
    if (highlighted.type === "eo") {
      if (type === "lm") return lmToEo.some((c) => c.eoId === highlighted.id && c.lmId === id);
      if (type === "uc") {
        const connectedLms = lmToEo.filter((c) => c.eoId === highlighted.id).map((c) => c.lmId);
        return ucToLm.some((c) => connectedLms.includes(c.lmId) && c.ucId === id);
      }
    }
    return false;
  };

  // Determine dominant color for a leading measure based on connected EO weights
  const getLmColor = (lmId: string): string => {
    const connections = lmToEo.filter((c) => c.lmId === lmId);
    if (connections.length === 0) return "#94a3b8";
    const best = connections.reduce((a, b) => (a.weight > b.weight ? a : b));
    return accentColors[best.color]?.line ?? "#94a3b8";
  };

  return (
    <div className="h-full w-full flex flex-col relative">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              <span className="title-accent">KPI Connection Tree</span>
            </h1>
            <p className="text-primary text-base sm:text-lg mt-1">
              How use cases flow through to executive outcomes
            </p>
          </div>

          {/* Cost banner */}
          {totalCostAvoidance > 0 && (
            <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Annual Cost Avoidance</span>
              <span className="text-xl font-bold text-emerald-300">
                ${(totalCostAvoidance / 1_000_000).toFixed(1)}M
              </span>
            </div>
          )}

          {/* Tree container */}
          <div
            ref={containerRef}
            className="relative"
            onMouseLeave={() => setHighlighted(null)}
          >
            {/* SVG connection layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {/* UC -> LM lines */}
              {ucToLm.map(({ ucId, lmId, weight }) => {
                const ucRect = rects.uc[ucId];
                const lmRect = rects.lm[lmId];
                if (!ucRect || !lmRect) return null;
                const from = getCenter(ucRect, "top");
                const to = getCenter(lmRect, "bottom");
                const mid = (from.y + to.y) / 2;
                const active = isConnectionHighlighted("uc-lm", { ucId, lmId });
                return (
                  <path
                    key={`uc-lm-${ucId}-${lmId}`}
                    d={`M${from.x},${from.y} C${from.x},${mid} ${to.x},${mid} ${to.x},${to.y}`}
                    fill="none"
                    stroke={
                      highlighted?.type === "eo"
                        ? accentColors[executiveOutcomes.find(e => e.id === highlighted.id)?.accentColor ?? ""]?.line ?? getLmColor(lmId)
                        : getLmColor(lmId)
                    }
                    strokeWidth={1 + weight * 4}
                    opacity={active ? 0.6 : 0.06}
                    className="transition-opacity duration-300"
                  />
                );
              })}
              {/* LM -> EO lines */}
              {lmToEo.map(({ lmId, eoId, metricId, weight, color }) => {
                const lmRect = rects.lm[lmId];
                const eoRect = rects.eo[eoId];
                if (!lmRect || !eoRect) return null;
                const from = getCenter(lmRect, "top");
                const to = getCenter(eoRect, "bottom");
                const mid = (from.y + to.y) / 2;
                const active = isConnectionHighlighted("lm-eo", { lmId, eoId });
                return (
                  <path
                    key={`lm-eo-${lmId}-${eoId}-${metricId}`}
                    d={`M${from.x},${from.y} C${from.x},${mid} ${to.x},${mid} ${to.x},${to.y}`}
                    fill="none"
                    stroke={accentColors[color]?.line ?? "#94a3b8"}
                    strokeWidth={1 + weight * 5}
                    opacity={active ? 0.7 : 0.06}
                    className="transition-opacity duration-300"
                  />
                );
              })}
            </svg>

            {/* Row 1: Executive Outcomes */}
            <div className="relative z-10 flex justify-center gap-4 mb-16">
              {executiveOutcomes.map((eo) => {
                const colors = accentColors[eo.accentColor];
                const active = isNodeHighlighted("eo", eo.id);
                return (
                  <div
                    key={eo.id}
                    ref={(el) => { eoRefs.current[eo.id] = el; }}
                    onMouseEnter={() => setHighlighted({ type: "eo", id: eo.id })}
                    className={cn(
                      "rounded-xl border p-4 w-[220px] transition-all duration-300 cursor-pointer",
                      `border-${eo.accentColor}-500/30 bg-gradient-to-br ${eo.color}`,
                      active ? "opacity-100 shadow-lg" : "opacity-20",
                      active && colors.glow && `shadow-lg ${colors.glow}`
                    )}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {stakeholderIcons[eo.icon]}
                      <span className={cn("text-sm font-bold", colors.text)}>{eo.stakeholder}</span>
                    </div>
                    {eo.metrics.map((metric) => {
                      const computed = computeMetricValue(metric, leadingValues, leadingMeasures);
                      const delta = computed - metric.baselineValue;
                      const improved = metric.direction === "up" ? delta > 0.05 : delta < -0.05;
                      return (
                        <div key={metric.id} className="mb-2 last:mb-0">
                          <p className="text-[10px] text-muted-foreground">{metric.label}</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-bold text-foreground">
                              {metric.unit === "$M" ? `$${computed.toFixed(1)}M` : `${computed.toFixed(1)}${metric.unit}`}
                            </span>
                            {Math.abs(delta) > 0.05 && (
                              <span className={cn("flex items-center gap-0.5 text-[9px] font-medium", improved ? "text-emerald-400" : "text-red-400")}>
                                {improved ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                                {Math.abs(delta).toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Row 2: Leading Measures */}
            <div className="relative z-10 flex justify-center gap-3 mb-16 flex-wrap">
              {leadingMeasures.map((lm) => {
                const current = leadingValues[lm.id];
                const delta = lm.direction === "down"
                  ? lm.baselineValue - current
                  : current - lm.baselineValue;
                const improved = delta > 0.01;
                const active = isNodeHighlighted("lm", lm.id);
                return (
                  <div
                    key={lm.id}
                    ref={(el) => { lmRefs.current[lm.id] = el; }}
                    onMouseEnter={() => setHighlighted({ type: "lm", id: lm.id })}
                    className={cn(
                      "rounded-lg border border-border/40 bg-card/50 px-4 py-3 min-w-[120px] text-center transition-all duration-300 cursor-pointer",
                      active ? "opacity-100 shadow-md" : "opacity-20",
                      improved && active && "border-emerald-500/40 shadow-emerald-500/10 shadow-md"
                    )}
                  >
                    <p className="text-[10px] font-medium text-muted-foreground mb-1">{lm.shortLabel}</p>
                    <p className={cn("text-lg font-bold", improved ? "text-emerald-400" : "text-foreground")}>
                      {current.toFixed(1)}{lm.unit}
                    </p>
                    <p className="text-[9px] text-muted-foreground">
                      Base: {lm.baselineValue}{lm.unit}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Row 3: Use Cases */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {useCases.map((uc) => {
                const currentVal = useCaseValues[uc.id] ?? uc.input.baseline;
                const improved = currentVal < uc.input.baseline;
                const active = isNodeHighlighted("uc", uc.id);
                return (
                  <div
                    key={uc.id}
                    ref={(el) => { ucRefs.current[uc.id] = el; }}
                    onMouseEnter={() => setHighlighted({ type: "uc", id: uc.id })}
                    className={cn(
                      "rounded-lg border border-border/40 bg-card/40 p-3 transition-all duration-300 cursor-pointer",
                      active ? "opacity-100 shadow-md" : "opacity-20",
                      improved && active && "border-emerald-500/30 shadow-emerald-500/10 shadow-md"
                    )}
                  >
                    <p className="text-xs font-semibold text-foreground mb-1 leading-tight">{uc.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className={cn("text-base font-bold", improved ? "text-emerald-400" : "text-foreground")}>
                        {currentVal}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{uc.input.unit}</span>
                      {improved && <ArrowDown className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-0.5">
                      Baseline: {uc.input.baseline}{uc.input.unit}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 flex items-center justify-center gap-6 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-0.5 bg-sky-400 rounded" /> COO
            </span>
            <span className="italic">Hover any node to trace connections</span>
          </div>
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

export default LineOfSightTree;
