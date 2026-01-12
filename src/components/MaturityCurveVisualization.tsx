import { useState, useEffect } from "react";
import MaturityStageDetails from "./MaturityStageDetails";
import MaturitySummaryBanner from "./MaturitySummaryBanner";

export interface MaturityStage {
  id: string;
  stage: number;
  headline: string;
  sublabel: string;
  whatItLooksLike: string[];
  result: string[];
  whyItMatters: string;
  accentColor: string;
  behavioralShift: {
    from: string;
    to: string;
    culturalMarker: string;
  };
  timeAllocation: {
    coordination: number;
    administration: number;
    improvement: number;
  };
  valueProof: {
    metrics: string[];
    roiStatement: string;
  };
  curveAnnotations: string[];
}

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

const MaturityCurveVisualization = () => {
  const [activeStage, setActiveStage] = useState(1);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const selectedStage = stagesData.find((s) => s.stage === activeStage) || stagesData[0];

  // Hockey stick curve points (x, y) - flat at start, steep at end
  const curvePoints = [
    { x: 80, y: 380 },   // Stage 1
    { x: 200, y: 360 },  // Stage 2
    { x: 320, y: 300 },  // Stage 3 - curve starts here
    { x: 440, y: 180 },  // Stage 4
    { x: 560, y: 60 },   // Stage 5
  ];

  // Generate smooth curve path
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

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[5fr_3fr] gap-6 items-start">
        {/* LEFT: Hockey Stick Curve */}
        <div className="maturity-curve-container bg-card/30 rounded-xl border border-border/30 p-6">
          <svg
            viewBox="0 0 650 480"
            className="w-full h-auto"
            style={{ maxHeight: "550px" }}
          >
            <defs>
              {/* Gradient for curve */}
              <linearGradient id="curveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(0 70% 50%)" />
                <stop offset="25%" stopColor="hsl(199 89% 48%)" />
                <stop offset="50%" stopColor="hsl(173 80% 40%)" />
                <stop offset="75%" stopColor="hsl(280 65% 55%)" />
                <stop offset="100%" stopColor="hsl(45 93% 58%)" />
              </linearGradient>
              
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Active glow filter */}
              <filter id="activeGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Y-axis */}
            <line
              x1="50"
              y1="420"
              x2="50"
              y2="30"
              stroke="hsl(222 47% 25%)"
              strokeWidth="2"
            />
            <polygon
              points="50,25 45,35 55,35"
              fill="hsl(222 47% 25%)"
            />
            
            {/* Y-axis label */}
            <text
              x="20"
              y="220"
              fill="hsl(215 20% 65%)"
              fontSize="11"
              fontWeight="600"
              textAnchor="middle"
              transform="rotate(-90, 20, 220)"
              className="font-display"
            >
              VALUE / CAPABILITY
            </text>

            {/* X-axis */}
            <line
              x1="50"
              y1="420"
              x2="620"
              y2="420"
              stroke="hsl(222 47% 25%)"
              strokeWidth="2"
            />
            <polygon
              points="625,420 615,415 615,425"
              fill="hsl(222 47% 25%)"
            />

            {/* Grid lines */}
            {[100, 180, 260, 340].map((y) => (
              <line
                key={y}
                x1="50"
                y1={y}
                x2="620"
                y2={y}
                stroke="hsl(222 47% 15%)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            ))}

            {/* Hockey stick curve path */}
            <path
              d={generateCurvePath()}
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
              className={`transition-all duration-1000 ${isAnimated ? "opacity-100" : "opacity-0"}`}
              style={{
                strokeDasharray: isAnimated ? "none" : "1000",
                strokeDashoffset: isAnimated ? "0" : "1000",
              }}
            />

            {/* Platform Shift marker */}
            <g className={`transition-opacity duration-700 delay-500 ${isAnimated ? "opacity-100" : "opacity-0"}`}>
              <line
                x1="320"
                y1="300"
                x2="320"
                y2="420"
                stroke="hsl(173 80% 40%)"
                strokeWidth="2"
                strokeDasharray="6,4"
              />
              <rect
                x="270"
                y="330"
                width="100"
                height="24"
                rx="4"
                fill="hsl(173 80% 40% / 0.2)"
                stroke="hsl(173 80% 40%)"
                strokeWidth="1"
              />
              <text
                x="320"
                y="346"
                fill="hsl(173 80% 50%)"
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
                className="font-display"
              >
                PLATFORM SHIFT
              </text>
            </g>

            {/* Stage markers and labels */}
            {stagesData.map((stage, index) => {
              const point = curvePoints[index];
              const isActive = activeStage === stage.stage;
              
              return (
                <g key={stage.id} className="cursor-pointer" onClick={() => setActiveStage(stage.stage)}>
                  {/* Marker on curve */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isActive ? 14 : 10}
                    fill={stage.accentColor}
                    filter={isActive ? "url(#activeGlow)" : "url(#glow)"}
                    className={`transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isActive ? 8 : 5}
                    fill="hsl(222 47% 6%)"
                    className={`transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  />
                  <text
                    x={point.x}
                    y={point.y + 4}
                    fill={stage.accentColor}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    className={`transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {stage.stage}
                  </text>

                  {/* X-axis stage label */}
                  <g className={`transition-opacity duration-500 ${isAnimated ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: `${index * 100 + 200}ms` }}>
                    <text
                      x={point.x}
                      y="442"
                      fill={isActive ? stage.accentColor : "hsl(215 20% 65%)"}
                      fontSize="10"
                      fontWeight={isActive ? "700" : "500"}
                      textAnchor="middle"
                      className="font-display transition-colors duration-300"
                    >
                      Stage {stage.stage}
                    </text>
                    <text
                      x={point.x}
                      y="456"
                      fill={isActive ? stage.accentColor : "hsl(215 20% 55%)"}
                      fontSize="9"
                      fontWeight={isActive ? "600" : "400"}
                      textAnchor="middle"
                      className="transition-colors duration-300"
                    >
                      {stage.sublabel}
                    </text>
                  </g>

                  {/* Annotation callouts */}
                  {isActive && (
                    <g className="animate-fade-in">
                      <rect
                        x={point.x - 70}
                        y={point.y - 80}
                        width="140"
                        height={stage.curveAnnotations.length * 16 + 12}
                        rx="6"
                        fill="hsl(222 47% 10% / 0.95)"
                        stroke={stage.accentColor}
                        strokeWidth="1"
                      />
                      {stage.curveAnnotations.map((annotation, i) => (
                        <text
                          key={i}
                          x={point.x}
                          y={point.y - 60 + i * 16}
                          fill="hsl(210 40% 98%)"
                          fontSize="9"
                          textAnchor="middle"
                          className="font-medium"
                        >
                          • {annotation}
                        </text>
                      ))}
                    </g>
                  )}
                </g>
              );
            })}

            {/* X-axis footer label */}
            <text
              x="335"
              y="478"
              fill="hsl(215 20% 50%)"
              fontSize="10"
              fontWeight="600"
              textAnchor="middle"
              className="font-display uppercase tracking-widest"
            >
              Maturity Stages (People • Process • Platform • AI)
            </text>
          </svg>
        </div>

        {/* RIGHT: Stage Details Panel */}
        <div className="bg-card/30 rounded-xl border border-border/30 p-4 lg:max-h-[550px] lg:overflow-y-auto">
          <MaturityStageDetails stage={selectedStage} />
        </div>
      </div>

      {/* Summary Banner */}
      <MaturitySummaryBanner />
    </div>
  );
};

export default MaturityCurveVisualization;
