import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Eye, Target, TrendingUp, Clock } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

interface StageData {
  stage: number;
  label: string;
  sublabel: string;
  accentColor: string;
  whatItLooksLike: string[];
  result: string[];
  behavioralShift: { from: string; to: string; culturalMarker: string };
  timeAllocation: { coordination: number; administration: number; improvement: number };
  valueProof: { metrics: string[]; roiStatement: string };
}

const stages: StageData[] = [
  {
    stage: 1, label: "Fragmented", sublabel: "Manual / Reactive",
    accentColor: "hsl(0 70% 50%)",
    whatItLooksLike: [
      "Disconnected systems across safety, content, training",
      "Investigations and changes happen manually",
      "Training not tied to operational signals",
    ],
    result: ["High variability and repeat issues", "Slow recovery and inconsistent readiness proof"],
    behavioralShift: { from: "Firefighting across disconnected systems", to: "Reactive compliance just to keep up", culturalMarker: "Compliance is a burden; issues recur" },
    timeAllocation: { coordination: 60, administration: 30, improvement: 10 },
    valueProof: { metrics: ["Variability ↑", "Recovery time ↑", "Risk exposure ↑"], roiStatement: "Hidden costs: repeat work, audit scrambles, inconsistent readiness" },
  },
  {
    stage: 2, label: "Managed", sublabel: "Silo Optimisation",
    accentColor: "hsl(199 89% 48%)",
    whatItLooksLike: [
      "Strong systems in specific departments",
      "Compliance structured but disconnected",
      "Actions produced but follow-through inconsistent",
    ],
    result: ["Compliance managed, but no systematic improvement", "Repeat issues persist"],
    behavioralShift: { from: "Firefighting with limited visibility", to: "Structured processes within each silo", culturalMarker: "We're compliant, but not learning" },
    timeAllocation: { coordination: 45, administration: 35, improvement: 20 },
    valueProof: { metrics: ["Dept compliance ↑", "Process consistency ↑", "Cross-func ROI limited"], roiStatement: "Structured compliance, but limited cross-functional ROI" },
  },
  {
    stage: 3, label: "Connected", sublabel: "Closed Loop",
    accentColor: "hsl(173 80% 40%)",
    whatItLooksLike: [
      "Safety, content, training unified in one system",
      "Traceability and approvals established",
      "Fragmentation reduces; visibility improves",
    ],
    result: ["Improved governance and confidence", "Audit readiness increases", "Foundation for closed-loop improvement"],
    behavioralShift: { from: "Chasing information across systems", to: "Single source of truth, async collaboration", culturalMarker: "We can see what's happening across the operation" },
    timeAllocation: { coordination: 30, administration: 35, improvement: 35 },
    valueProof: { metrics: ["Audit prep ↓ 30%", "Handoffs ↓ 50%", "Visibility ↑"], roiStatement: "Single source of truth reduces coordination overhead by 40%" },
  },
  {
    stage: 4, label: "Intelligent", sublabel: "AI-Assisted",
    accentColor: "hsl(280 65% 55%)",
    whatItLooksLike: [
      "Signals trigger coordinated workflows",
      "Recommended actions drive controlled change",
      "Training targeted and triggered by change",
    ],
    result: ["Reduced recurrence and drift", "Faster time-to-change", "Measurable KPI improvement"],
    behavioralShift: { from: "Reactive fixes and compliance checklists", to: "Proactive improvement with outcome ownership", culturalMarker: "Issues drive real change, not just reports" },
    timeAllocation: { coordination: 20, administration: 30, improvement: 50 },
    valueProof: { metrics: ["Recurrence ↓ 50%", "Time-to-change ↓ 60%", "KPI lift ↑"], roiStatement: "50% reduction in repeat issues, measurable readiness lift" },
  },
  {
    stage: 5, label: "Predictive", sublabel: "AI-Accelerated",
    accentColor: "hsl(45 93% 58%)",
    whatItLooksLike: [
      "AI detects weak signals and forecasts risk",
      "Assisted drafting of procedures and training",
      "Exception-led oversight, humans govern approvals",
    ],
    result: ["Reliability becomes proactive and scalable", "Teams shift from admin to performance leadership"],
    behavioralShift: { from: "Administration and process gatekeeping", to: "Performance leadership and strategic focus", culturalMarker: "Reliability is a competitive advantage" },
    timeAllocation: { coordination: 10, administration: 20, improvement: 70 },
    valueProof: { metrics: ["OTP ↑ 15%", "Delay mins ↓ 40%", "Admin hours ↓ 70%"], roiStatement: "70% less time on administration, 30% faster decision cycles" },
  },
];

const svgPoints = [
  { x: 80, y: 150 },
  { x: 230, y: 138 },
  { x: 400, y: 115 },
  { x: 570, y: 70 },
  { x: 720, y: 20 },
];

const TechSlide14MaturityRoadmap = ({ slideNumber, ...narrationProps }: Props) => {
  const [activeStage, setActiveStage] = useState(0);
  const selected = stages[activeStage];

  return (
    <SalesSlideContainer
      id="tech-slide-14"
      title="The Maturity Roadmap"
      subtitle="How teams change their way of working at every stage"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col min-h-0 gap-2">
        {/* Full-width SVG curve */}
        <svg className="w-full" viewBox="0 0 800 180" preserveAspectRatio="xMidYMid meet">
          {[60, 100, 140].map((y) => (
            <line key={y} x1="40" y1={y} x2="760" y2={y} stroke="hsl(var(--muted))" strokeWidth="0.5" strokeOpacity="0.12" />
          ))}
          <path
            d={`M ${svgPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
            fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeOpacity="0.35"
            strokeLinecap="round" strokeLinejoin="round"
          />
          {svgPoints.map((pt, i) => (
            <g key={i} onClick={() => setActiveStage(i)} className="cursor-pointer">
              {activeStage === i && <circle cx={pt.x} cy={pt.y} r="16" fill={stages[i].accentColor} fillOpacity="0.15" />}
              <circle cx={pt.x} cy={pt.y} r="9"
                fill={activeStage === i ? stages[i].accentColor : "hsl(var(--muted-foreground))"}
                fillOpacity={activeStage === i ? 1 : 0.3} style={{ transition: "all 0.2s" }}
              />
              <text x={pt.x} y={pt.y + 22} textAnchor="middle" className="text-[11px] font-bold"
                fill={activeStage === i ? stages[i].accentColor : "hsl(var(--muted-foreground))"} fillOpacity={activeStage === i ? 1 : 0.5}>
                {stages[i].label}
              </text>
              <text x={pt.x} y={pt.y + 34} textAnchor="middle" className="text-[9px]"
                fill={activeStage === i ? stages[i].accentColor : "hsl(var(--muted-foreground))"} fillOpacity={activeStage === i ? 0.8 : 0.35}>
                {stages[i].sublabel}
              </text>
            </g>
          ))}
        </svg>

        {/* Stage pills */}
        <div className="flex gap-1.5 justify-center">
          {stages.map((s, i) => (
            <button key={s.stage} onClick={() => setActiveStage(i)}
              className={cn("px-3 py-1 rounded-full text-xs font-medium transition-all border",
                activeStage === i ? "text-white border-transparent" : "bg-muted/10 text-muted-foreground border-muted/20 hover:bg-muted/20"
              )}
              style={activeStage === i ? { backgroundColor: s.accentColor } : undefined}>
              {s.stage}. {s.label}
            </button>
          ))}
        </div>

        {/* 3-column detail panel */}
        <div className="rounded-xl border border-muted/20 bg-muted/5 p-3 flex-1 min-h-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white"
              style={{ backgroundColor: selected.accentColor }}>{selected.stage}</div>
            <h3 className="text-sm font-bold text-foreground">{selected.label}</h3>
            <span className="text-[10px] font-medium" style={{ color: selected.accentColor }}>— {selected.sublabel}</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Col 1: What it looks like */}
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <Eye className="w-3 h-3" style={{ color: selected.accentColor }} />
                <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: selected.accentColor }}>What it looks like</span>
              </div>
              <ul className="space-y-1">
                {selected.whatItLooksLike.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                    <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: selected.accentColor }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: How Work Changes + Time Allocation */}
            <div className="space-y-2">
              <div className="p-2 rounded-lg border"
                style={{ borderColor: `${selected.accentColor}30`, background: `linear-gradient(135deg, ${selected.accentColor}08, transparent)` }}>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">How Work Changes</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 p-1 rounded bg-muted/10 text-[10px] text-muted-foreground leading-tight">{selected.behavioralShift.from}</div>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: selected.accentColor }} />
                  <div className="flex-1 p-1 rounded text-[10px] font-medium text-foreground leading-tight" style={{ backgroundColor: `${selected.accentColor}15` }}>{selected.behavioralShift.to}</div>
                </div>
                <p className="text-[9px] italic text-muted-foreground mt-1">"{selected.behavioralShift.culturalMarker}"</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3" style={{ color: selected.accentColor }} />
                  <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: selected.accentColor }}>Where Teams Spend Time</span>
                </div>
                <div className="h-3.5 rounded-full overflow-hidden flex">
                  <div className="h-full flex items-center justify-center transition-all duration-500" style={{ width: `${selected.timeAllocation.coordination}%`, backgroundColor: "hsl(0 70% 50%)" }}>
                    {selected.timeAllocation.coordination >= 20 && <span className="text-[7px] font-bold text-white">{selected.timeAllocation.coordination}%</span>}
                  </div>
                  <div className="h-full flex items-center justify-center transition-all duration-500" style={{ width: `${selected.timeAllocation.administration}%`, backgroundColor: "hsl(199 89% 48%)" }}>
                    {selected.timeAllocation.administration >= 20 && <span className="text-[7px] font-bold text-white">{selected.timeAllocation.administration}%</span>}
                  </div>
                  <div className="h-full flex items-center justify-center transition-all duration-500" style={{ width: `${selected.timeAllocation.improvement}%`, backgroundColor: "hsl(173 80% 40%)" }}>
                    {selected.timeAllocation.improvement >= 20 && <span className="text-[7px] font-bold text-white">{selected.timeAllocation.improvement}%</span>}
                  </div>
                </div>
                <div className="flex gap-2 mt-0.5 text-[8px]">
                  <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: "hsl(0 70% 50%)" }} />Coord {selected.timeAllocation.coordination}%</span>
                  <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: "hsl(199 89% 48%)" }} />Admin {selected.timeAllocation.administration}%</span>
                  <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: "hsl(173 80% 40%)" }} />Improve {selected.timeAllocation.improvement}%</span>
                </div>
              </div>
            </div>

            {/* Col 3: Result + Value Proof */}
            <div className="space-y-2">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Target className="w-3 h-3" style={{ color: selected.accentColor }} />
                  <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: selected.accentColor }}>Result</span>
                </div>
                <ul className="space-y-0.5">
                  {selected.result.map((r, i) => (
                    <li key={i} className="flex items-start gap-1 text-[11px] text-muted-foreground">
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: selected.accentColor }} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3" style={{ color: selected.accentColor }} />
                  <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: selected.accentColor }}>Value Proof</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-1">
                  {selected.valueProof.metrics.map((m, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded-full text-[8px] font-medium" style={{ backgroundColor: `${selected.accentColor}20`, color: selected.accentColor }}>{m}</span>
                  ))}
                </div>
                <p className="text-[9px] italic text-muted-foreground">{selected.valueProof.roiStatement}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide14MaturityRoadmap;
