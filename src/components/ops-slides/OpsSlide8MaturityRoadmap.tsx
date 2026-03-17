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

// SVG curve points for the maturity curve
const curvePoints = [
  { x: 60, y: 170 },
  { x: 150, y: 155 },
  { x: 250, y: 130 },
  { x: 350, y: 85 },
  { x: 450, y: 25 },
];

const OpsSlide8MaturityRoadmap = ({ slideNumber, ...narrationProps }: OpsSlide8Props) => {
  const [activeStage, setActiveStage] = useState(0);
  const selected = stages[activeStage];

  return (
    <SalesSlideContainer
      id="ops-slide-8"
      title="The Maturity Roadmap"
      subtitle="Five stages from fragmented to predictive operations"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Two-column: curve + detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
          {/* Left: SVG curve */}
          <div className="flex flex-col">
            <svg className="w-full flex-1" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
              {/* Grid lines */}
              {[50, 100, 150].map((y) => (
                <line key={y} x1="40" y1={y} x2="470" y2={y} stroke="hsl(var(--muted))" strokeWidth="0.5" strokeOpacity="0.2" />
              ))}
              {/* Curve */}
              <path
                d={`M ${curvePoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeOpacity="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Stage dots */}
              {curvePoints.map((pt, i) => (
                <g key={i} onClick={() => setActiveStage(i)} className="cursor-pointer">
                  {/* Glow ring for active */}
                  {activeStage === i && (
                    <circle cx={pt.x} cy={pt.y} r="14" fill="hsl(var(--primary))" fillOpacity="0.15" />
                  )}
                  <circle
                    cx={pt.x} cy={pt.y} r="8"
                    className={cn(
                      activeStage === i ? "fill-primary" : "fill-muted-foreground/40"
                    )}
                    style={{ transition: "all 0.2s" }}
                  />
                  {/* Label below */}
                  <text
                    x={pt.x} y={pt.y + 22}
                    textAnchor="middle"
                    className={cn(
                      "text-[11px] font-medium",
                      activeStage === i ? "fill-primary" : "fill-muted-foreground/50"
                    )}
                  >
                    {stages[i].label}
                  </text>
                  {/* "You are here" marker */}
                  {i <= 1 && activeStage === i && (
                    <text x={pt.x} y={pt.y - 18} textAnchor="middle" className="fill-primary text-[9px] font-medium">
                      You are here
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Right: Active stage detail */}
          <div className={cn(
            "p-6 rounded-xl border border-muted/20 bg-muted/5 flex flex-col justify-center"
          )}>
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-5 h-5 rounded-full", selected.dotColor)} />
              <span className={cn("text-xl font-bold", selected.color)}>
                Stage {selected.stage}: {selected.label}
              </span>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">{selected.useCase}</p>

            {/* Stage selector pills */}
            <div className="flex gap-2 mt-6 pt-4 border-t border-muted/20">
              {stages.map((s, i) => (
                <button
                  key={s.stage}
                  onClick={() => setActiveStage(i)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    activeStage === i
                      ? `${s.dotColor} text-white`
                      : "bg-muted/10 text-muted-foreground hover:bg-muted/20"
                  )}
                >
                  {s.stage}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide8MaturityRoadmap;
