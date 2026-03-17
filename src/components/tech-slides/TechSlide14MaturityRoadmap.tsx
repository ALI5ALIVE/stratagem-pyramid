import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const stages = [
  { stage: 1, label: "Fragmented", useCase: "Crew fatigue — scattered reports, no connected response", color: "text-red-400", dotColor: "bg-red-400" },
  { stage: 2, label: "Managed", useCase: "Runway incursion — siloed investigation, manual evidence", color: "text-amber-400", dotColor: "bg-amber-400" },
  { stage: 3, label: "Connected", useCase: "MEL procedure update — automated traceability across modules", color: "text-sky-400", dotColor: "bg-sky-400" },
  { stage: 4, label: "Intelligent", useCase: "Hard landing detection — targeted sim training via CoAnalyst", color: "text-purple-400", dotColor: "bg-purple-400" },
  { stage: 5, label: "Predictive", useCase: "Smoke & fumes prevention — proactive AI hazard detection", color: "text-emerald-400", dotColor: "bg-emerald-400" },
];

const curvePoints = [
  { x: 10, y: 85 }, { x: 28, y: 70 }, { x: 50, y: 45 }, { x: 72, y: 25 }, { x: 90, y: 8 },
];

const TechSlide14MaturityRoadmap = ({ slideNumber, ...narrationProps }: Props) => {
  const [active, setActive] = useState(0);

  const pathD = `M ${curvePoints.map((p) => `${p.x} ${p.y}`).join(" L ")}`;

  return (
    <SalesSlideContainer id="tech-slide-14" title="Maturity Roadmap" subtitle="Five stages from fragmented to predictive — with a use case at every step" slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
        {/* SVG curve */}
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full max-h-[320px]">
            <defs>
              <linearGradient id="techCurveGrad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {[20, 40, 60, 80].map((y) => (<line key={y} x1="5" y1={y} x2="95" y2={y} stroke="hsl(var(--muted-foreground))" strokeOpacity="0.1" strokeWidth="0.3" />))}
            <path d={pathD} fill="none" stroke="url(#techCurveGrad)" strokeWidth="2" strokeLinecap="round" />
            {curvePoints.map((p, i) => (
              <g key={i} onClick={() => setActive(i)} className="cursor-pointer">
                <circle cx={p.x} cy={p.y} r={active === i ? 4 : 2.5} fill={active === i ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} fillOpacity={active === i ? 1 : 0.5} />
                {i < 2 && active !== i && (<text x={p.x} y={p.y + 8} textAnchor="middle" className="fill-muted-foreground text-[3px]">You are here</text>)}
              </g>
            ))}
          </svg>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3">
          {stages.map((s, i) => (
            <button key={s.stage} onClick={() => setActive(i)} className={cn("p-3 rounded-lg border text-left transition-all", i === active ? `${s.color} border-current bg-current/10` : "border-muted/20 bg-muted/5 text-muted-foreground")}>
              <div className="flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full", s.dotColor)} />
                <span className="text-sm font-bold">Stage {s.stage}: {s.label}</span>
              </div>
              {i === active && <p className="text-xs text-muted-foreground mt-2">{s.useCase}</p>}
            </button>
          ))}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide14MaturityRoadmap;
