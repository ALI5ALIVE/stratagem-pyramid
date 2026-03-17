import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { useCases } from "@/data/lineOfSightData";
import { Shield, DollarSign, Clock, Heart, ArrowRight } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const outcomes = [
  { icon: Clock, title: "Schedule Protection", signal: "Delay root cause identified", action: "SOP updated + crew retrained", result: "OTP improvement: 78% → 87%", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  { icon: DollarSign, title: "Revenue Protection", signal: "AOG risk pattern detected", action: "Preventive maintenance triggered", result: "30% fewer unscheduled groundings", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
  { icon: Shield, title: "Cost Savings", signal: "Fuel exceedance trend detected", action: "Targeted crew training deployed", result: "1.2% fuel variance reduction", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  { icon: Heart, title: "Customer Loyalty", signal: "Baggage mishandling trend", action: "Ramp procedure updated + retrained", result: "40% fewer mishandled bags", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
];

const TechSlide16Outcomes = ({ slideNumber, ...narrationProps }: Props) => {
  const totalCost = useCases.reduce((s, uc) => s + uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor, 0);
  const formatted = `$${(totalCost * 0.3 / 1_000_000).toFixed(0)}M`;

  return (
    <SalesSlideContainer id="tech-slide-16" title="Operational Outcomes" subtitle="From signals to measurable results" slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {outcomes.map((o) => (
            <div key={o.title} className={`p-4 rounded-xl border ${o.border} ${o.bg} flex flex-col`}>
              <div className="flex items-center gap-2 mb-3"><o.icon className={`h-6 w-6 ${o.color}`} /><span className={`text-base font-bold ${o.color}`}>{o.title}</span></div>
              <div className="space-y-2 flex-1">
                {[{ label: "Signal", text: o.signal }, { label: "Action", text: o.action }, { label: "Result", text: o.result }].map((s) => (
                  <div key={s.label} className="flex items-start gap-2"><span className="text-xs font-bold text-muted-foreground/60 mt-0.5 shrink-0 w-10">{s.label}</span><span className="text-sm text-muted-foreground">{s.text}</span></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-muted/20 bg-muted/5">
            <span className="text-sm text-muted-foreground font-medium">Time Allocation Shift</span>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1"><div className="text-xs text-muted-foreground mb-1.5">Before: 60% coordination</div><div className="h-3 rounded-full bg-muted/20 overflow-hidden"><div className="h-full rounded-full bg-red-400/60" style={{ width: "60%" }} /></div></div>
              <ArrowRight className="h-4 w-4 text-muted-foreground/30 shrink-0" />
              <div className="flex-1"><div className="text-xs text-muted-foreground mb-1.5">After: 70% improvement</div><div className="h-3 rounded-full bg-muted/20 overflow-hidden"><div className="h-full rounded-full bg-emerald-400/60" style={{ width: "70%" }} /></div></div>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 flex flex-col items-center justify-center text-center">
            <span className="text-sm text-muted-foreground">Annual Cost Avoidance</span>
            <span className="text-4xl font-bold text-primary mt-2">{formatted}</span>
            <span className="text-xs text-muted-foreground mt-1">across 8 costed use cases</span>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide16Outcomes;
