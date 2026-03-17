import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/lineOfSightData";
import { Shield, DollarSign, Clock, Heart, ArrowRight } from "lucide-react";

interface OpsSlide9Props extends SlideNarrationProps {
  slideNumber?: number;
}

const outcomes = [
  {
    icon: Clock,
    title: "Schedule Protection",
    signal: "Delay root cause identified",
    action: "SOP updated + crew retrained",
    result: "OTP improvement: 78% → 87%",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/30",
  },
  {
    icon: DollarSign,
    title: "Revenue Protection",
    signal: "AOG risk pattern detected",
    action: "Preventive maintenance triggered",
    result: "30% fewer unscheduled groundings",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
  {
    icon: Shield,
    title: "Cost Savings",
    signal: "Fuel exceedance trend detected",
    action: "Targeted crew training deployed",
    result: "1.2% fuel variance reduction",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
  },
  {
    icon: Heart,
    title: "Customer Loyalty",
    signal: "Baggage mishandling trend",
    action: "Ramp procedure updated + retrained",
    result: "40% fewer mishandled bags",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
  },
];

const OpsSlide9Outcomes = ({ slideNumber, ...narrationProps }: OpsSlide9Props) => {
  const totalCost = useCases.reduce(
    (sum, uc) => sum + uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor,
    0
  );
  const scaledTotal = totalCost * 0.3;
  const formatted = `$${(scaledTotal / 1_000_000).toFixed(0)}M`;

  return (
    <SalesSlideContainer
      id="ops-slide-9"
      title="Operational Outcomes"
      subtitle="From signals to measurable results"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Outcome cards */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {outcomes.map((o) => (
            <div key={o.title} className={`p-3 rounded-xl border ${o.border} ${o.bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <o.icon className={`h-5 w-5 ${o.color}`} />
                <span className={`text-sm font-bold ${o.color}`}>{o.title}</span>
              </div>
              <div className="space-y-1">
                {[
                  { label: "Signal", text: o.signal },
                  { label: "Action", text: o.action },
                  { label: "Result", text: o.result },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-start gap-1.5">
                    <span className="text-[9px] font-bold text-muted-foreground/60 mt-0.5 shrink-0">{step.label}</span>
                    <span className="text-xs text-muted-foreground">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Time allocation + total */}
        <div className="grid grid-cols-2 gap-3">
          {/* Time shift */}
          <div className="p-3 rounded-lg border border-muted/20 bg-muted/5">
            <span className="text-xs text-muted-foreground">Time Allocation Shift</span>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1">
                <div className="text-[10px] text-muted-foreground mb-1">Before: 60% coordination</div>
                <div className="h-2 rounded-full bg-muted/20 overflow-hidden">
                  <div className="h-full rounded-full bg-red-400/60" style={{ width: "60%" }} />
                </div>
              </div>
              <ArrowRight className="h-3 w-3 text-muted-foreground/30 shrink-0" />
              <div className="flex-1">
                <div className="text-[10px] text-muted-foreground mb-1">After: 70% improvement</div>
                <div className="h-2 rounded-full bg-muted/20 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-400/60" style={{ width: "70%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Total cost avoidance */}
          <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-muted-foreground">Annual Cost Avoidance Opportunity</span>
            <span className="text-3xl font-bold text-primary mt-1">{formatted}</span>
            <span className="text-[10px] text-muted-foreground">across 8 costed use cases</span>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide9Outcomes;
