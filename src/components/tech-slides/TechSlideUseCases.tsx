import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/lineOfSightData";
import { ShieldAlert, Plane, DollarSign, Zap, TrendingDown, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const formatCurrency = (v: number) => v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `$${(v / 1_000).toFixed(0)}K` : `$${v}`;

const tabs = [
  { id: "safety", label: "Safety", icon: ShieldAlert, color: "text-rose-400", ids: ["uc1", "uc5"] },
  { id: "ops", label: "Operations", icon: Plane, color: "text-blue-400", ids: ["uc2", "uc3"] },
  { id: "financial", label: "Financial", icon: DollarSign, color: "text-amber-400", ids: ["uc7"] },
] as const;

const parseDTOP = (mechanism: string) => {
  const parts = mechanism.split(" → ");
  return {
    detect: parts[0]?.replace(/^Detect\s*\(/, "").replace(/\)$/, "") || "",
    trigger: parts[1]?.replace(/^Trigger\s*\(/, "").replace(/\)$/, "") || "",
    orchestrate: parts[2]?.replace(/^Orchestrate\s*\(/, "").replace(/\)$/, "") || "",
    prove: parts[3]?.replace(/^Prove\s*\(/, "").replace(/\)$/, "") || "",
  };
};

const TechSlideUseCases = ({ slideNumber, ...narrationProps }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("safety");
  const tab = tabs.find((t) => t.id === activeTab)!;
  const cases = useCases.filter((uc) => tab.ids.includes(uc.id));

  return (
    <SalesSlideContainer
      id="tech-slide-use-cases"
      title="Use Cases — Safety, Operations & Financial"
      subtitle="Every signal follows the same DTOP loop — different domain, same architecture"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex flex-col gap-3 flex-1 min-h-0">
        {/* Tab selector */}
        <div className="flex items-center justify-center gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all",
                  isActive
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border/50 bg-card/40 text-muted-foreground hover:border-primary/20"
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", isActive ? t.color : "")} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* DTOP legend */}
        <div className="flex items-center justify-center gap-3 text-[10px]">
          <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-amber-400" /><span className="text-amber-400 font-medium">Detect</span></span>
          <span className="text-muted-foreground/40">→</span>
          <span className="flex items-center gap-1"><TrendingDown className="h-3 w-3 text-blue-400" /><span className="text-blue-400 font-medium">Trigger</span></span>
          <span className="text-muted-foreground/40">→</span>
          <span className="flex items-center gap-1"><FileText className="h-3 w-3 text-violet-400" /><span className="text-violet-400 font-medium">Orchestrate</span></span>
          <span className="text-muted-foreground/40">→</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /><span className="text-emerald-400 font-medium">Prove</span></span>
        </div>

        {/* Use case cards */}
        <div className={cn("grid gap-3 flex-1 min-h-0", cases.length === 1 ? "grid-cols-1 max-w-2xl mx-auto w-full" : "grid-cols-1 md:grid-cols-2")}>
          {cases.map((uc) => {
            const annual = uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor;
            const dtop = parseDTOP(uc.platformMechanism);
            return (
              <div key={uc.id} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-3 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground flex-1">{uc.label}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-semibold shrink-0">{formatCurrency(annual)}/yr</span>
                </div>
                <p className="text-[10px] text-muted-foreground mb-2">{uc.description}</p>

                <div className="space-y-1.5 flex-1">
                  <div className="relative pl-3 border-l-2 border-amber-400/50">
                    <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full bg-amber-400" />
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-amber-400">Detect</div>
                    <div className="text-[11px] text-foreground leading-snug">{dtop.detect}</div>
                  </div>
                  <div className="relative pl-3 border-l-2 border-blue-400/50">
                    <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full bg-blue-400" />
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-blue-400">Trigger</div>
                    <div className="text-[11px] text-foreground leading-snug">{dtop.trigger}</div>
                  </div>
                  <div className="relative pl-3 border-l-2 border-violet-400/50">
                    <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full bg-violet-400" />
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-violet-400">Orchestrate</div>
                    <div className="text-[11px] text-foreground leading-snug">{dtop.orchestrate}</div>
                  </div>
                  <div className="relative pl-3 border-l-2 border-emerald-400/50">
                    <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full bg-emerald-400" />
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-emerald-400">Prove</div>
                    <div className="text-[11px] text-foreground leading-snug">{dtop.prove}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[10px] text-muted-foreground/70 italic text-center shrink-0">
          Cost figures are illustrative midpoints based on industry benchmarks (IATA, EUROCONTROL, SITA). Use the Line of Sight calculator to model with your own inputs.
        </p>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlideUseCases;
