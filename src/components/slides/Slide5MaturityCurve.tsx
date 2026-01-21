import { useState, useEffect } from "react";
import SlideContainer from "./SlideContainer";
import MaturityStageDetails from "@/components/MaturityStageDetails";
import MaturitySummaryBanner from "@/components/MaturitySummaryBanner";
import { useIsMobile } from "@/hooks/use-mobile";
import type { MaturityStage } from "@/components/MaturityCurveVisualization";

const stagesData: MaturityStage[] = [
  {
    id: "FRAGMENTED",
    stage: 1,
    headline: "Fragmented & Reactive",
    sublabel: "Manual / Reactive",
    whatItLooksLike: [
      "Disconnected systems across safety, procedures, training",
      "Investigations and changes happen manually",
      "Training not tied to operational signals",
      "Evidence assembled late and inconsistently",
    ],
    result: [
      "High variability and repeat issues",
      "Slow recovery and inconsistent readiness proof",
    ],
    whyItMatters:
      "Fragmentation creates blind spots, slows response times, and increases operational risk — this is where most organizations start",
    accentColor: "hsl(0 70% 50%)",
    behavioralShift: {
      from: "Firefighting across disconnected systems",
      to: "Reactive compliance just to keep up",
      culturalMarker: "Compliance is a burden; issues recur",
    },
    timeAllocation: {
      coordination: 60,
      administration: 30,
      improvement: 10,
    },
    valueProof: {
      metrics: ["Variability ↑", "Recovery time ↑", "Risk exposure ↑"],
      roiStatement: "Hidden costs: repeat work, audit scrambles, inconsistent readiness",
    },
    curveAnnotations: ["Disconnected tools", "No traceability", "High audit effort"],
  },
  {
    id: "MANAGED",
    stage: 2,
    headline: "Managed (Siloed) Compliance",
    sublabel: "Silo Optimisation",
    whatItLooksLike: [
      "Strong systems in specific departments",
      "Compliance and training are structured but disconnected",
      "Investigations produce actions but follow-through is inconsistent",
    ],
    result: [
      "Compliance is managed, but performance does not systematically improve",
      "Repeat issues persist",
    ],
    whyItMatters:
      "Departments operate well individually, but lack of connection prevents organizational learning",
    accentColor: "hsl(199 89% 48%)",
    behavioralShift: {
      from: "Firefighting with limited visibility",
      to: "Structured processes within each silo",
      culturalMarker: "We're compliant, but not learning",
    },
    timeAllocation: {
      coordination: 45,
      administration: 35,
      improvement: 20,
    },
    valueProof: {
      metrics: ["Dept compliance ↑", "Process consistency ↑", "Cross-func ROI limited"],
      roiStatement: "Structured compliance, but limited cross-functional ROI",
    },
    curveAnnotations: ["Better process", "Still manual handoffs", "Slow change cycles"],
  },
  {
    id: "CONNECTED",
    stage: 3,
    headline: "Connected Governance",
    sublabel: "Closed Loop",
    whatItLooksLike: [
      "Safety, procedures, training unified into one governed system of record",
      "Traceability and approvals established",
      "Visibility improves; fragmentation reduces",
    ],
    result: [
      "Improved governance and confidence",
      "Audit readiness increases",
      "Foundation for closed-loop improvement is in place",
    ],
    whyItMatters:
      "Eliminates handoffs and creates one version of operational truth",
    accentColor: "hsl(173 80% 40%)",
    behavioralShift: {
      from: "Chasing information across systems and meetings",
      to: "Single source of truth, async collaboration",
      culturalMarker: "We can see what's happening across the operation",
    },
    timeAllocation: {
      coordination: 30,
      administration: 35,
      improvement: 35,
    },
    valueProof: {
      metrics: ["Audit prep ↓ 30%", "Handoffs ↓ 50%", "Visibility ↑"],
      roiStatement: "Single source of truth reduces coordination overhead by 40%",
    },
    curveAnnotations: ["Safety→Change→Training", "Evidence by default", "Reliability improves"],
  },
  {
    id: "PREDICTIVE",
    stage: 4,
    headline: "Closed-Loop Operational Improvement",
    sublabel: "Intelligent Ops",
    whatItLooksLike: [
      "Operational signals trigger coordinated workflows",
      "Corrective actions drive controlled procedural change",
      "Training is targeted and triggered by change",
      "Evidence captured automatically",
    ],
    result: [
      "Reduced recurrence and drift",
      "Faster time-to-change",
      "Measurable reliability and readiness KPI improvement",
    ],
    whyItMatters:
      "Turns operational signals into controlled execution, not just reporting",
    accentColor: "hsl(280 65% 55%)",
    behavioralShift: {
      from: "Reactive fixes and compliance checklists",
      to: "Proactive improvement with outcome ownership",
      culturalMarker: "Issues drive real change, not just reports",
    },
    timeAllocation: {
      coordination: 20,
      administration: 30,
      improvement: 50,
    },
    valueProof: {
      metrics: ["Recurrence ↓ 50%", "Time-to-change ↓ 60%", "KPI lift ↑"],
      roiStatement: "50% reduction in repeat issues, measurable readiness lift",
    },
    curveAnnotations: ["Weak-signal detection", "Prioritised interventions", "Faster decisions"],
  },
  {
    id: "AGENTIC",
    stage: 5,
    headline: "Predictive & Agentic Reliability",
    sublabel: "Autonomous Reliability",
    whatItLooksLike: [
      "AI detects weak signals early and forecasts risk patterns",
      "Prioritised recommendations and action plans",
      "Assisted drafting of procedures and training triggers",
      "Exception-led oversight with humans governing approvals",
      "Continuous proof and reporting",
    ],
    result: [
      "Reliability becomes proactive, scalable, and continuously improving",
      "Customer experience strengthens as an operational outcome",
      "Teams shift from administration to performance leadership",
    ],
    whyItMatters:
      "AI compresses decision + execution time while keeping humans in control — reliability becomes a competitive advantage",
    accentColor: "hsl(45 93% 58%)",
    behavioralShift: {
      from: "Administration and process gatekeeping",
      to: "Performance leadership and strategic focus",
      culturalMarker: "Reliability is a competitive advantage",
    },
    timeAllocation: {
      coordination: 10,
      administration: 20,
      improvement: 70,
    },
    valueProof: {
      metrics: ["OTP ↑ 15%", "Delay mins ↓ 40%", "Admin hours ↓ 70%"],
      roiStatement: "70% less time on administration, 30% faster decision cycles",
    },
    curveAnnotations: ["AI-led orchestration", "Human-in-loop control", "Continuous proof"],
  },
];

const Slide5MaturityCurve = () => {
  const [activeStage, setActiveStage] = useState(1);
  const [isAnimated, setIsAnimated] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const selectedStage = stagesData.find((s) => s.stage === activeStage) || stagesData[0];

  // Hockey stick curve points
  const curvePoints = isMobile ? [
    { x: 60, y: 280 },
    { x: 120, y: 265 },
    { x: 180, y: 220 },
    { x: 250, y: 140 },
    { x: 320, y: 50 },
  ] : [
    { x: 70, y: 280 },
    { x: 160, y: 265 },
    { x: 250, y: 220 },
    { x: 350, y: 140 },
    { x: 450, y: 50 },
  ];

  const generateCurvePath = () => {
    const points = curvePoints;
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const cpX = (current.x + next.x) / 2;
      path += ` Q ${cpX} ${current.y}, ${next.x} ${next.y}`;
    }
    
    return path;
  };

  const viewBox = isMobile ? "0 0 380 350" : "0 0 520 350";

  return (
    <SlideContainer
      id="slide-5"
      title="The Maturity Curve"
      subtitle="How organisations progress up the pyramid — a measurable transformation program"
      slideNumber={5}
    >
      <div className="space-y-2">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 items-start">
          {/* LEFT: Hockey Stick Curve */}
          <div className="bg-card/30 rounded-xl border border-border/30 p-2 md:p-3">
            <svg
              viewBox={viewBox}
              className="w-full h-auto"
              style={{ maxHeight: isMobile ? "440px" : "640px" }}
            >
              <defs>
                <linearGradient id="slideGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(0 70% 50%)" />
                  <stop offset="25%" stopColor="hsl(199 89% 48%)" />
                  <stop offset="50%" stopColor="hsl(173 80% 40%)" />
                  <stop offset="75%" stopColor="hsl(280 65% 55%)" />
                  <stop offset="100%" stopColor="hsl(45 93% 58%)" />
                </linearGradient>
                
                <filter id="slideGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="slideActiveGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Y-axis */}
              <line x1="40" y1="310" x2="40" y2="25" stroke="hsl(222 47% 25%)" strokeWidth="1.5" />
              <polygon points="40,20 36,28 44,28" fill="hsl(222 47% 25%)" />
              
              <text
                x="15"
                y="165"
                fill="hsl(215 20% 65%)"
                fontSize="9"
                fontWeight="600"
                textAnchor="middle"
                transform="rotate(-90, 15, 165)"
                className="font-display"
              >
                VALUE / CAPABILITY
              </text>

              {/* X-axis */}
              <line x1="40" y1="310" x2={isMobile ? 360 : 500} y2="310" stroke="hsl(222 47% 25%)" strokeWidth="1.5" />
              <polygon points={isMobile ? "365,310 357,306 357,314" : "505,310 497,306 497,314"} fill="hsl(222 47% 25%)" />

              {/* Grid lines */}
              {[80, 140, 200, 260].map((y) => (
                <line
                  key={y}
                  x1="40"
                  y1={y}
                  x2={isMobile ? 360 : 500}
                  y2={y}
                  stroke="hsl(222 47% 15%)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              ))}

              {/* Hockey stick curve */}
              <path
                d={generateCurvePath()}
                fill="none"
                stroke="url(#slideGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#slideGlow)"
                className={`transition-all duration-1000 ${isAnimated ? "opacity-100" : "opacity-0"}`}
              />

              {/* Platform Shift marker - desktop only */}
              {!isMobile && (
                <g className={`transition-opacity duration-700 delay-500 ${isAnimated ? "opacity-100" : "opacity-0"}`}>
                  <line x1="250" y1="220" x2="250" y2="310" stroke="hsl(173 80% 40%)" strokeWidth="1.5" strokeDasharray="4,3" />
                  <rect x="210" y="240" width="80" height="18" rx="3" fill="hsl(173 80% 40% / 0.2)" stroke="hsl(173 80% 40%)" strokeWidth="1" />
                  <text x="250" y="252" fill="hsl(173 80% 50%)" fontSize="8" fontWeight="600" textAnchor="middle" className="font-display">
                    PLATFORM SHIFT
                  </text>
                </g>
              )}

              {/* Stage markers */}
              {stagesData.map((stage, index) => {
                const point = curvePoints[index];
                const isActive = activeStage === stage.stage;
                
                return (
                  <g key={stage.id} className="cursor-pointer" onClick={() => setActiveStage(stage.stage)}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isActive ? 10 : 7}
                      fill={stage.accentColor}
                      filter={isActive ? "url(#slideActiveGlow)" : "url(#slideGlow)"}
                      className={`transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                      style={{ transitionDelay: `${index * 80}ms` }}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isActive ? 5 : 3}
                      fill="hsl(222 47% 6%)"
                      className={`transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                      style={{ transitionDelay: `${index * 80}ms` }}
                    />
                    <text
                      x={point.x}
                      y={point.y + 3}
                      fill={stage.accentColor}
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                      className={`transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                      style={{ transitionDelay: `${index * 80}ms` }}
                    >
                      {stage.stage}
                    </text>

                    {/* X-axis labels - use shortened headline to match copy box */}
                    {(() => {
                      const shortLabels: Record<number, string> = {
                        1: "Fragmented",
                        2: "Managed",
                        3: "Connected",
                        4: "Closed-Loop",
                        5: "Predictive",
                      };
                      return (
                        <>
                          <text
                            x={point.x}
                            y="325"
                            fill={isActive ? stage.accentColor : "hsl(215 20% 65%)"}
                            fontSize={isMobile ? "7" : "8"}
                            fontWeight={isActive ? "700" : "500"}
                            textAnchor="middle"
                            className="font-display transition-colors duration-300"
                          >
                            {isMobile ? shortLabels[stage.stage] : shortLabels[stage.stage]}
                          </text>
                        </>
                      );
                    })()}

                    {/* Active stage annotations - desktop only */}
                    {isActive && !isMobile && (
                      <g className="animate-fade-in">
                        <rect
                          x={point.x - 55}
                          y={point.y - 60}
                          width="110"
                          height={stage.curveAnnotations.length * 12 + 10}
                          rx="4"
                          fill="hsl(222 47% 10% / 0.95)"
                          stroke={stage.accentColor}
                          strokeWidth="1"
                        />
                        {stage.curveAnnotations.map((annotation, i) => (
                          <text
                            key={i}
                            x={point.x}
                            y={point.y - 45 + i * 12}
                            fill="hsl(210 40% 98%)"
                            fontSize="7"
                            textAnchor="middle"
                            className="font-medium"
                          >
                            {annotation}
                          </text>
                        ))}
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* RIGHT: Stage Details */}
          <div className="h-full overflow-y-auto bg-card/30 rounded-md p-2 border border-border/30">
            <MaturityStageDetails stage={selectedStage} />
          </div>
        </div>

        {/* Summary Banner */}
        <MaturitySummaryBanner />
      </div>
    </SlideContainer>
  );
};

export default Slide5MaturityCurve;
