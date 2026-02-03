import { useState, useEffect } from "react";
import SlideContainer from "./SlideContainer";
import UseCaseStageDetails from "@/components/UseCaseStageDetails";
import MaturitySummaryBanner from "@/components/MaturitySummaryBanner";
import { useIsMobile } from "@/hooks/use-mobile";
import type { SlideNarrationProps } from "@/types/slideProps";

interface UseCase {
  scenario: string;
  problem: string;
  outcome: string;
}

interface MaturityStageWithUseCase {
  id: string;
  stage: number;
  headline: string;
  sublabel: string;
  accentColor: string;
  curveAnnotations: string[];
  useCase: UseCase;
}

const stagesData: MaturityStageWithUseCase[] = [
  {
    id: "FRAGMENTED",
    stage: 1,
    headline: "Fragmented & Reactive",
    sublabel: "Manual / Reactive",
    accentColor: "hsl(0 70% 50%)",
    curveAnnotations: ["Disconnected tools", "No traceability", "High audit effort"],
    useCase: {
      scenario: "Crew Fatigue Incident",
      problem: "Fatigue reports are scattered across email threads and separate systems. No one connects the pattern until after an incident occurs. The investigation takes 3 weeks.",
      outcome: "This is where most organizations start — reactive, fragmented, and slow.",
    },
  },
  {
    id: "MANAGED",
    stage: 2,
    headline: "Managed (Siloed) Compliance",
    sublabel: "Silo Optimisation",
    accentColor: "hsl(199 89% 48%)",
    curveAnnotations: ["Better process", "Still manual handoffs", "Slow change cycles"],
    useCase: {
      scenario: "Runway Incursion Investigation",
      problem: "After a runway incursion, the safety team completes a thorough investigation. But training never gets updated. Six months later, the same issue recurs with different crew.",
      outcome: "Strong departments, but no connection between them. Lessons don't transfer.",
    },
  },
  {
    id: "CONNECTED",
    stage: 3,
    headline: "Connected Governance",
    sublabel: "Closed Loop",
    accentColor: "hsl(173 80% 40%)",
    curveAnnotations: ["Safety→Change→Training", "Evidence by default", "Reliability improves"],
    useCase: {
      scenario: "MEL Procedure Update",
      problem: "A Minimum Equipment List change is published. Automatically, the platform triggers procedure revision, reassigns affected training, and creates a complete audit trail.",
      outcome: "No manual handoffs required. Full traceability by default.",
    },
  },
  {
    id: "INTELLIGENT",
    stage: 4,
    headline: "Intelligent Operations",
    sublabel: "AI-Assisted Execution",
    accentColor: "hsl(280 65% 55%)",
    curveAnnotations: ["Weak-signal detection", "Prioritised interventions", "Faster decisions"],
    useCase: {
      scenario: "Hard Landing Detection",
      problem: "FOQA data flags a hard landing trend at a specific airport. The platform identifies 47 affected pilots and deploys targeted simulator training automatically.",
      outcome: "78% reduction in repeat events. Protected maintenance costs and schedule.",
    },
  },
  {
    id: "PREDICTIVE",
    stage: 5,
    headline: "Predictive Operations",
    sublabel: "AI-Accelerated Performance",
    accentColor: "hsl(45 93% 58%)",
    curveAnnotations: ["AI-led orchestration", "Human-in-loop control", "Continuous proof"],
    useCase: {
      scenario: "Smoke & Fumes Prevention",
      problem: "AI analyzes thousands of reports and detects a weak signal cluster — smoke and fumes incidents clustering around a specific hub. Before any reportable event occurs, the de-icing SOP is revised proactively.",
      outcome: "Zero incidents. Prevention, not reaction. This is operational intelligence.",
    },
  },
];

// Timing markers for narration-synced stage changes
const stageTimings = [
  { stage: 1, startPercent: 5 },   // "Stage One: Fragmented..."
  { stage: 2, startPercent: 22 },  // "Stage Two: Managed..."
  { stage: 3, startPercent: 40 },  // "Stage Three: Connected..."
  { stage: 4, startPercent: 58 },  // "Stage Four: Intelligent..."
  { stage: 5, startPercent: 75 },  // "Stage Five: Predictive..."
];

const Slide5MaturityCurve = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activeStage, setActiveStage] = useState(1);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isNarrationControlled, setIsNarrationControlled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Sync stage with narration progress
  useEffect(() => {
    if (isPlaying && progress > 0) {
      setIsNarrationControlled(true);
      
      const currentTiming = [...stageTimings]
        .reverse()
        .find(t => progress >= t.startPercent);
      
      if (currentTiming && currentTiming.stage !== activeStage) {
        setActiveStage(currentTiming.stage);
      }
    } else if (!isPlaying && isNarrationControlled) {
      // Narration stopped - keep current stage but release control
      setIsNarrationControlled(false);
    }
  }, [isPlaying, progress, activeStage, isNarrationControlled]);

  const selectedStage =
    stagesData.find((s) => s.stage === activeStage) || stagesData[0];

  // 2x scaled viewBox dimensions
  const viewBox = isMobile ? "0 0 840 760" : "0 0 1160 760";

  // 2x scaled curve points
  const curvePoints = isMobile
    ? [
        { x: 100, y: 620, stage: 1 },
        { x: 240, y: 580, stage: 2 },
        { x: 400, y: 480, stage: 3 },
        { x: 580, y: 320, stage: 4 },
        { x: 760, y: 120, stage: 5 },
      ]
    : [
        { x: 160, y: 600, stage: 1 },
        { x: 360, y: 560, stage: 2 },
        { x: 560, y: 460, stage: 3 },
        { x: 780, y: 300, stage: 4 },
        { x: 1000, y: 110, stage: 5 },
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

  return (
    <SlideContainer
      id="slide-7"
      title="The Operational Performance Roadmap"
      subtitle="The measurable journey from reactive to predictive operations"
      slideNumber={7}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="space-y-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* LEFT: Hockey Stick Curve - 2x scaled */}
          <div className="bg-card/30 rounded-xl border border-border/30 p-4 md:p-6 flex items-center justify-center">
            <svg
              viewBox={viewBox}
              className="w-full h-auto max-h-[320px]"
              preserveAspectRatio="xMidYMid meet"
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
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="slideActiveGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Y-axis - 2x scaled */}
              <line x1="90" y1="660" x2="90" y2="60" stroke="hsl(222 47% 25%)" strokeWidth="3" />
              <polygon points="90,50 82,66 98,66" fill="hsl(222 47% 25%)" />
              
              <text
                x="36"
                y="360"
                fill="hsl(215 20% 65%)"
                fontSize="20"
                fontWeight="600"
                textAnchor="middle"
                transform="rotate(-90, 36, 360)"
                className="font-display"
              >
                VALUE / CAPABILITY
              </text>

              {/* X-axis - 2x scaled */}
              <line x1="90" y1="660" x2={isMobile ? 800 : 1120} y2="660" stroke="hsl(222 47% 25%)" strokeWidth="3" />
              <polygon points={isMobile ? "810,660 794,652 794,668" : "1130,660 1114,652 1114,668"} fill="hsl(222 47% 25%)" />

              {/* Grid lines - 2x scaled */}
              {[180, 320, 460, 560].map((y) => (
                <line
                  key={y}
                  x1="90"
                  y1={y}
                  x2={isMobile ? 800 : 1120}
                  y2={y}
                  stroke="hsl(222 47% 15%)"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              ))}

              {/* Hockey stick curve - 2x stroke */}
              <path
                d={generateCurvePath()}
                fill="none"
                stroke="url(#slideGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#slideGlow)"
                className={`transition-all duration-1000 ${isAnimated ? "opacity-100" : "opacity-0"}`}
              />

              {/* Platform Shift marker - desktop only, 2x scaled */}
              {!isMobile && (
                <g className={`transition-opacity duration-700 delay-500 ${isAnimated ? "opacity-100" : "opacity-0"}`}>
                  <line x1="560" y1="460" x2="560" y2="660" stroke="hsl(173 80% 40%)" strokeWidth="3" strokeDasharray="8,6" />
                  <rect x="470" y="510" width="180" height="40" rx="6" fill="hsl(173 80% 40% / 0.2)" stroke="hsl(173 80% 40%)" strokeWidth="2" />
                  <text x="560" y="538" fill="hsl(173 80% 50%)" fontSize="18" fontWeight="600" textAnchor="middle" className="font-display">
                    PLATFORM SHIFT
                  </text>
                </g>
              )}

              {/* Inflection Point marker - above Stage 3, desktop only */}
              {!isMobile && (
                <g className={`transition-opacity duration-700 delay-700 ${isAnimated ? "opacity-100" : "opacity-0"}`}>
                  <line x1="560" y1="460" x2="560" y2="380" stroke="hsl(173 80% 40%)" strokeWidth="2" strokeDasharray="4,4" />
                  <rect x="485" y="340" width="150" height="36" rx="6" fill="hsl(45 93% 58% / 0.2)" stroke="hsl(45 93% 58%)" strokeWidth="2" />
                  <text x="560" y="364" fill="hsl(45 93% 68%)" fontSize="14" fontWeight="600" textAnchor="middle" className="font-display">
                    INFLECTION POINT
                  </text>
                </g>
              )}

              {/* Stage 2 annotation - desktop only */}
              {!isMobile && (
                <g className={`transition-opacity duration-700 delay-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}>
                  <rect x="260" y="590" width="200" height="28" rx="4" fill="hsl(199 89% 48% / 0.15)" stroke="hsl(199 89% 48%)" strokeWidth="1" />
                  <text x="360" y="609" fill="hsl(199 89% 58%)" fontSize="11" textAnchor="middle">
                    Best-in-class C365 products
                  </text>
                </g>
              )}

              {/* Stage markers - 2x scaled */}
              {stagesData.map((stage, index) => {
                const point = curvePoints[index];
                const isStageActive = activeStage === stage.stage;
                
                return (
                  <g key={stage.id} className="cursor-pointer" onClick={() => setActiveStage(stage.stage)}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isStageActive ? 24 : 18}
                      fill={stage.accentColor}
                      filter={isStageActive ? "url(#slideActiveGlow)" : "url(#slideGlow)"}
                      className={`transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                      style={{ transitionDelay: `${index * 80}ms` }}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isStageActive ? 12 : 8}
                      fill="hsl(222 47% 6%)"
                      className={`transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                      style={{ transitionDelay: `${index * 80}ms` }}
                    />
                    <text
                      x={point.x}
                      y={point.y + 8}
                      fill={stage.accentColor}
                      fontSize="18"
                      fontWeight="bold"
                      textAnchor="middle"
                      className={`transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                      style={{ transitionDelay: `${index * 80}ms` }}
                    >
                      {stage.stage}
                    </text>

                    {/* X-axis labels - 2x font */}
                    {(() => {
                      const shortLabels: Record<number, string> = {
                        1: "Fragmented",
                        2: "Managed",
                        3: "Connected",
                        4: "Intelligent",
                        5: "Predictive",
                      };
                      return (
                        <text
                          x={point.x}
                          y="696"
                          fill={isStageActive ? stage.accentColor : "hsl(215 20% 65%)"}
                          fontSize={isMobile ? "18" : "20"}
                          fontWeight={isStageActive ? "700" : "500"}
                          textAnchor="middle"
                          className="font-display transition-colors duration-300"
                        >
                          {shortLabels[stage.stage]}
                        </text>
                      );
                    })()}

                    {/* Active stage annotations - desktop only, 2x scaled */}
                    {isStageActive && !isMobile && (
                      <g className="animate-fade-in">
                        <rect
                          x={point.x - 130}
                          y={stage.stage === 5 ? point.y + 40 : point.y - 136}
                          width="260"
                          height={stage.curveAnnotations.length * 28 + 24}
                          rx="8"
                          fill="hsl(222 47% 10% / 0.95)"
                          stroke={stage.accentColor}
                          strokeWidth="2"
                        />
                        {stage.curveAnnotations.map((annotation, i) => (
                          <text
                            key={i}
                            x={point.x}
                            y={stage.stage === 5 ? point.y + 72 + i * 28 : point.y - 104 + i * 28}
                            fill="hsl(210 40% 98%)"
                            fontSize="16"
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

          {/* RIGHT: Stage Details - Use Case Display */}
          <div className={`overflow-y-auto bg-card/30 rounded-lg p-3 border border-border/30 max-h-[400px] transition-all duration-500 ${isNarrationControlled ? 'animate-fade-in' : ''}`}>
            <UseCaseStageDetails 
              stage={selectedStage.stage}
              headline={selectedStage.headline}
              sublabel={selectedStage.sublabel}
              accentColor={selectedStage.accentColor}
              useCase={selectedStage.useCase}
            />
          </div>
        </div>

        {/* Summary Banner */}
        <MaturitySummaryBanner />
      </div>
    </SlideContainer>
  );
};

export default Slide5MaturityCurve;