import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface OpsSlide8Props extends SlideNarrationProps {
  slideNumber?: number;
}

const stages = [
  {
    stage: 1,
    label: "Fragmented",
    useCase: "Safety reports filed but rarely actioned. Each department operates in isolation.",
    color: "text-red-400",
    dotColor: "bg-red-400",
  },
  {
    stage: 2,
    label: "Managed",
    useCase: "Reports tracked in systems but manual coordination between teams. Some trend visibility.",
    color: "text-amber-400",
    dotColor: "bg-amber-400",
  },
  {
    stage: 3,
    label: "Connected",
    useCase: "Signals auto-flow to the right teams. Procedure changes trigger training automatically.",
    color: "text-sky-400",
    dotColor: "bg-sky-400",
  },
  {
    stage: 4,
    label: "Intelligent",
    useCase: "AI detects patterns before humans. Targeted interventions based on data, not intuition.",
    color: "text-purple-400",
    dotColor: "bg-purple-400",
  },
  {
    stage: 5,
    label: "Predictive",
    useCase: "Risk modelled before events occur. Operations run proactively with continuous proof.",
    color: "text-emerald-400",
    dotColor: "bg-emerald-400",
  },
];

const OpsSlide8MaturityRoadmap = ({ slideNumber, ...narrationProps }: OpsSlide8Props) => {
  const [activeStage, setActiveStage] = useState(1);
  const selected = stages[activeStage];

  return (
    <SalesSlideContainer
      id="ops-slide-8"
      title="The Maturity Roadmap"
      subtitle="Five stages from fragmented to predictive operations"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        {/* Curve visualization - simplified */}
        <div className="relative flex-1 flex items-end">
          {/* Curve line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
            <path
              d="M 30 180 Q 100 170 160 155 Q 220 140 280 110 Q 340 75 400 30 Q 430 15 470 5"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
          </svg>

          {/* Stage dots */}
          <div className="relative w-full flex justify-between items-end px-4 pb-4" style={{ height: "100%" }}>
            {stages.map((stage, i) => {
              const heightPercent = 15 + i * 20;
              return (
                <button
                  key={stage.stage}
                  onClick={() => setActiveStage(i)}
                  className="flex flex-col items-center gap-1 relative"
                  style={{ marginBottom: `${heightPercent}%` }}
                >
                  {/* "You are here" marker */}
                  {i <= 1 && i === activeStage && (
                    <span className="text-[9px] text-primary font-medium absolute -top-5 whitespace-nowrap">
                      You are here
                    </span>
                  )}
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full transition-all cursor-pointer",
                      stage.dotColor,
                      activeStage === i ? "scale-150 ring-2 ring-primary/30" : "opacity-60"
                    )}
                  />
                  <span className={cn(
                    "text-[10px] font-medium whitespace-nowrap",
                    activeStage === i ? stage.color : "text-muted-foreground/60"
                  )}>
                    {stage.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active stage detail */}
        <div className={cn(
          "p-4 rounded-xl border border-muted/20 bg-muted/5 transition-all"
        )}>
          <div className="flex items-center gap-2 mb-2">
            <div className={cn("w-3 h-3 rounded-full", selected.dotColor)} />
            <span className={cn("text-sm font-bold", selected.color)}>
              Stage {selected.stage}: {selected.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{selected.useCase}</p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide8MaturityRoadmap;
