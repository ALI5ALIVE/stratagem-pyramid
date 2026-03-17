import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Plane, Wind, FileWarning, Clock } from "lucide-react";

interface OpsSlide5Props extends SlideNarrationProps {
  slideNumber?: number;
}

const precisionData = [
  { tier: "Category Level 1", coanalyst: 95, generic: 70 },
  { tier: "Category Level 3", coanalyst: 92, generic: 45 },
  { tier: "Category Level 5", coanalyst: 90, generic: 30 },
];

const useCaseLinks = [
  {
    icon: Plane,
    useCase: "Hard Landing Detection",
    tier: "Proactive",
    detail: "Pattern detected across fleet before next occurrence",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/30",
  },
  {
    icon: Wind,
    useCase: "Smoke & Fumes Events",
    tier: "Predictive",
    detail: "Trend analysis flags at-risk aircraft types early",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
  },
  {
    icon: FileWarning,
    useCase: "Regulatory Change Cascade",
    tier: "Reactive",
    detail: "Auto-triggers procedure & training updates on change",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
  },
  {
    icon: Clock,
    useCase: "Crew Fatigue Detection",
    tier: "Proactive",
    detail: "Scheduling patterns correlated with safety events",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
];

const OpsSlide5Intelligence = ({ slideNumber, ...narrationProps }: OpsSlide5Props) => {
  return (
    <SalesSlideContainer
      id="ops-slide-5"
      title="CoAnalyst: The Intelligence Engine"
      subtitle="Aviation-specific AI that powers every stage of DTOP"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
          {/* Precision Gap */}
          <div className="p-5 rounded-xl border border-muted/20 bg-muted/5 flex flex-col">
            <h3 className="text-base font-semibold text-foreground mb-2">The Precision Gap</h3>
            <p className="text-xs text-muted-foreground mb-5">
              Generic AI fails at the granularity aviation demands. CoAnalyst maintains <span className="text-primary font-semibold">90% accuracy</span> across 4,000+ categories — where generic AI drops to <span className="text-red-400 font-semibold">35%</span>.
            </p>
            <div className="space-y-4 flex-1">
              {precisionData.map((row) => (
                <div key={row.tier} className="space-y-1.5">
                  <span className="text-sm text-muted-foreground">{row.tier}</span>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="h-3.5 rounded-full bg-primary/80" style={{ width: `${row.coanalyst}%` }} />
                      <span className="text-sm font-bold text-primary">{row.coanalyst}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3.5 rounded-full bg-red-400/50" style={{ width: `${row.generic}%` }} />
                      <span className="text-sm text-red-400">{row.generic}%</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary/80" /> CoAnalyst</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400/50" /> Generic AI</span>
              </div>
            </div>
          </div>

          {/* Use-case-linked intelligence cards */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">Intelligence Powering Your Use Cases</h3>
            {useCaseLinks.map((uc) => (
              <div key={uc.useCase} className={`p-3.5 rounded-lg border ${uc.border} ${uc.bg} flex items-start gap-3 flex-1`}>
                <uc.icon className={`h-5 w-5 shrink-0 mt-0.5 ${uc.color}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-sm font-bold ${uc.color}`}>{uc.useCase}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-muted/30 bg-muted/10 text-muted-foreground">{uc.tier}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{uc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide5Intelligence;
