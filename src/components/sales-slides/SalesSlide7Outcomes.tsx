import { Calendar, DollarSign, PiggyBank, Heart, ArrowRight, Clock } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const outcomes = [
  {
    icon: Calendar,
    title: "Schedule Protection",
    metric: "OTP +3.2%",
    signal: "Hard landing trend detected",
    action: "Targeted retraining deployed",
    result: "Protected departures",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
  },
  {
    icon: DollarSign,
    title: "Revenue Protection",
    metric: "$2.3M saved",
    signal: "Crew fatigue risk flagged",
    action: "Proactive scheduling adjustment",
    result: "Avoided cancellations",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    icon: PiggyBank,
    title: "Cost Savings",
    metric: "70% less admin",
    signal: "Procedure discrepancy found",
    action: "Automated content update",
    result: "Reduced rework cycles",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
  },
  {
    icon: Heart,
    title: "Customer Loyalty",
    metric: "NPS ↑",
    signal: "Compliance gap identified",
    action: "Immediate remediation",
    result: "Maintained trust",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
  },
];

// Time allocation data
const timeAllocation = {
  before: { coordination: 60, administration: 30, improvement: 10 },
  after: { coordination: 10, administration: 20, improvement: 70 },
};

interface SalesSlide7OutcomesProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide7Outcomes = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide7OutcomesProps) => {
  return (
    <SalesSlideContainer
      id="sales-slide-7"
      title="Measurable Value Across Four Pillars"
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-4">
        {/* Outcomes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-5xl mx-auto w-full">
          {outcomes.map((outcome) => (
            <div
              key={outcome.title}
              className={`${outcome.bgColor} border ${outcome.borderColor} rounded-xl p-4`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-lg ${outcome.bgColor} ${outcome.borderColor} border flex items-center justify-center`}>
                  <outcome.icon className={`w-4 h-4 ${outcome.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-semibold ${outcome.color}`}>{outcome.title}</h3>
                  <span className={`text-lg font-bold ${outcome.color}`}>{outcome.metric}</span>
                </div>
              </div>

              {/* Signal → Action → Result flow */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground shrink-0 w-12">Signal:</span>
                  <span className="text-foreground">{outcome.signal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground shrink-0 w-10">Action:</span>
                  <span className="text-foreground">{outcome.action}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground shrink-0 w-10">Result:</span>
                  <span className={`font-medium ${outcome.color}`}>{outcome.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Time Allocation Comparison */}
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-card/50 border border-border/50 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Where Teams Spend Time</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div>
                <div className="text-[10px] text-muted-foreground mb-1.5 text-center">Before</div>
                <div className="h-5 rounded overflow-hidden flex">
                  <div className="h-full flex items-center justify-center text-[8px] font-semibold text-white" style={{ width: `${timeAllocation.before.coordination}%`, backgroundColor: "hsl(0 70% 50%)" }}>
                    {timeAllocation.before.coordination}%
                  </div>
                  <div className="h-full flex items-center justify-center text-[8px] font-semibold text-white" style={{ width: `${timeAllocation.before.administration}%`, backgroundColor: "hsl(199 89% 48%)" }}>
                    {timeAllocation.before.administration}%
                  </div>
                  <div className="h-full flex items-center justify-center text-[8px] font-semibold text-white" style={{ width: `${timeAllocation.before.improvement}%`, backgroundColor: "hsl(173 80% 40%)" }}>
                  </div>
                </div>
              </div>

              {/* After */}
              <div>
                <div className="text-[10px] text-muted-foreground mb-1.5 text-center">After</div>
                <div className="h-5 rounded overflow-hidden flex">
                  <div className="h-full" style={{ width: `${timeAllocation.after.coordination}%`, backgroundColor: "hsl(0 70% 50%)" }} />
                  <div className="h-full flex items-center justify-center text-[8px] font-semibold text-white" style={{ width: `${timeAllocation.after.administration}%`, backgroundColor: "hsl(199 89% 48%)" }}>
                    {timeAllocation.after.administration}%
                  </div>
                  <div className="h-full flex items-center justify-center text-[8px] font-semibold text-white" style={{ width: `${timeAllocation.after.improvement}%`, backgroundColor: "hsl(173 80% 40%)" }}>
                    {timeAllocation.after.improvement}%
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 mt-2 text-[9px]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: "hsl(0 70% 50%)" }} />
                <span className="text-muted-foreground">Coordination</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: "hsl(199 89% 48%)" }} />
                <span className="text-muted-foreground">Admin</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: "hsl(173 80% 40%)" }} />
                <span className="text-muted-foreground">Improvement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural shift quote */}
        <div className="text-center">
          <p className="text-base font-medium text-foreground">
            <span className="text-muted-foreground">Point solutions manage silos.</span>{" "}
            <span className="text-primary">Comply365 closes the loop.</span>
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide7Outcomes;
