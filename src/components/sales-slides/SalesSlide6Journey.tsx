import { cn } from "@/lib/utils";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const stages = [
  { num: 1, label: "Fragmented", description: "Point tools, manual processes" },
  { num: 2, label: "Managed", description: "Compliance achieved, silos remain" },
  { num: 3, label: "Connected", description: "Unified data, automated triggers" },
  { num: 4, label: "Intelligent", description: "AI-powered recommendations" },
  { num: 5, label: "Predictive", description: "Anticipate and prevent" },
];

interface SalesSlide6JourneyProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide6Journey = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide6JourneyProps) => {
  return (
    <SalesSlideContainer
      id="sales-slide-6"
      title="Your Operational Performance Roadmap"
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col justify-center">
        {/* Maturity curve visualization */}
        <div className="relative max-w-5xl mx-auto w-full mb-8">
          {/* Curve background */}
          <svg className="w-full h-48 sm:h-64" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid meet">
            {/* Gradient curve */}
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.3" />
                <stop offset="40%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(142, 76%, 36%)" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <path
              d="M 50 180 Q 200 170 300 140 T 500 80 T 750 30"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="4"
            />
            {/* Stage markers */}
            {[
              { x: 50, y: 180 },
              { x: 200, y: 165 },
              { x: 350, y: 130 },
              { x: 550, y: 70 },
              { x: 750, y: 30 },
            ].map((pos, i) => (
              <circle
                key={i}
                cx={pos.x}
                cy={pos.y}
                r="8"
                fill={i < 2 ? "hsl(var(--destructive))" : i === 2 ? "hsl(var(--primary))" : "hsl(142, 76%, 36%)"}
              />
            ))}
          </svg>
        </div>

        {/* Stage labels */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4 max-w-5xl mx-auto">
          {stages.map((stage, i) => (
            <div
              key={stage.num}
              className={cn(
                "text-center p-3 rounded-lg",
                i < 2 ? "bg-destructive/5" : i === 2 ? "bg-primary/10" : "bg-emerald-500/10"
              )}
            >
              <div className={cn(
                "text-lg sm:text-xl font-bold mb-1",
                i < 2 ? "text-destructive/70" : i === 2 ? "text-primary" : "text-emerald-500"
              )}>
                {stage.num}
              </div>
              <div className="text-xs sm:text-sm font-medium text-foreground">{stage.label}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">
                {stage.description}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline comparison */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">5-7 years</div>
            <div className="text-sm text-muted-foreground">Traditional approach</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">18-24 months</div>
            <div className="text-sm text-primary">With Comply365</div>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide6Journey;
