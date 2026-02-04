import { AlertCircle, FileX, Clock, Calendar, TrendingUp, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const metrics = [
  {
    icon: AlertCircle,
    value: "12K",
    label: "signals scattered",
    subtext: "→ 0 automated triggers",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: FileX,
    value: "8K",
    label: "orphaned items",
    subtext: "→ No traceability",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Clock,
    value: "3 wks",
    label: "avg investigation",
    subtext: "→ While risks compound",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Calendar,
    value: "Months",
    label: "audit prep time",
    subtext: "→ Every single cycle",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

const regulators = ["FAA", "IOSA", "CAA", "EASA"];

interface SalesSlide2WhyNowProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide2WhyNow = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide2WhyNowProps) => {
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));

  useEffect(() => {
    const targets = [12, 8, 3, 6];
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressValue = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progressValue, 3);

      setAnimatedValues(targets.map((target) => Math.floor(target * eased)));

      if (progressValue < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  return (
    <SalesSlideContainer
      id="sales-slide-2"
      title="The Cost of Fragmentation"
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col justify-center gap-6">
        {/* Metrics grid with animated counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`${metric.bgColor} border border-border/50 rounded-xl p-5 text-center`}
            >
              <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
              <div className={`text-3xl sm:text-4xl font-bold ${metric.color} mb-1`}>
                {i === 2 ? `${animatedValues[i]}` : i === 3 ? metric.value : `${animatedValues[i]}K`}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.subtext}</div>
            </div>
          ))}
        </div>

        {/* Compound risk timeline */}
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-card/50 border border-destructive/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-destructive" />
              <span className="text-xs font-semibold uppercase tracking-wider text-destructive">
                How Delays Compound Risk
              </span>
            </div>
            <div className="flex items-center gap-2">
              {["Signal", "Week 1", "Week 2", "Week 3", "Week 4+"].map((label, i) => (
                <div key={label} className="flex-1 relative">
                  <div
                    className={`h-3 rounded ${
                      i === 0
                        ? "bg-amber-500"
                        : i === 1
                        ? "bg-orange-500"
                        : i === 2
                        ? "bg-orange-600"
                        : i === 3
                        ? "bg-destructive"
                        : "bg-destructive"
                    }`}
                    style={{ opacity: 0.3 + i * 0.15 }}
                  />
                  <div className="text-[10px] text-muted-foreground mt-1 text-center">{label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Risk exposure grows while signals wait for action
            </p>
          </div>
        </div>

        {/* Regulatory pressure */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Regulatory Pressure
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 mb-3">
              {regulators.map((reg) => (
                <div
                  key={reg}
                  className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-primary"
                >
                  {reg}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Now expect <span className="text-primary font-semibold">connected evidence</span> — not just
              compliance paperwork
            </p>
          </div>
        </div>

        {/* Closing insight */}
        <div className="text-center">
          <p className="text-lg sm:text-xl text-foreground font-medium">
            <span className="text-destructive">Every week you wait,</span> the gap widens.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide2WhyNow;
