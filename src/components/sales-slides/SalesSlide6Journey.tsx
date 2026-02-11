import { useState, useEffect } from "react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { Target, AlertTriangle, CheckCircle } from "lucide-react";

interface MaturityStage {
  stage: number;
  label: string;
  sublabel: string;
  useCase: string;
  color: string;
  x: number;
  y: number;
}

const stages: MaturityStage[] = [
  { stage: 1, label: "Fragmented", sublabel: "Reactive", useCase: "Crew Fatigue", color: "hsl(0 70% 50%)", x: 60, y: 300 },
  { stage: 2, label: "Managed", sublabel: "Siloed", useCase: "Runway Incursion", color: "hsl(199 89% 48%)", x: 150, y: 280 },
  { stage: 3, label: "Connected", sublabel: "Closed Loop", useCase: "MEL Procedure", color: "hsl(173 80% 40%)", x: 240, y: 210 },
  { stage: 4, label: "Intelligent", sublabel: "AI-Assisted", useCase: "Hard Landing", color: "hsl(280 65% 55%)", x: 330, y: 120 },
  { stage: 5, label: "Predictive", sublabel: "AI-Accelerated", useCase: "Smoke & Fumes", color: "hsl(45 93% 58%)", x: 420, y: 50 },
];

const useCases = [
  {
    scenario: "Crew Fatigue Incident",
    problem: "Fatigue reports are scattered across email threads and separate systems. No one connects the pattern until after an incident occurs. The investigation takes 3 weeks.",
    outcome: "Reactive, fragmented, slow",
  },
  {
    scenario: "Runway Incursion Investigation",
    problem: "Safety team investigates the incursion thoroughly, but training department never updates procedures. The same contributing factors appear again 6 months later.",
    outcome: "Strong departments, no connection between them",
  },
  {
    scenario: "MEL Procedure Update",
    problem: "Platform auto-triggers procedure revision, assigns targeted retraining to affected crew, and creates a complete audit trail — no manual handoffs required.",
    outcome: "No manual handoffs, full traceability",
  },
  {
    scenario: "Hard Landing Detection",
    problem: "FOQA data flags a developing trend. The platform automatically identifies 47 affected pilots and schedules targeted simulator training before any incident occurs.",
    outcome: "78% reduction in repeat events",
  },
  {
    scenario: "Smoke & Fumes Prevention",
    problem: "AI detects a weak-signal cluster across maintenance logs, crew reports, and environmental data. De-icing SOP is revised proactively before any incident materialises.",
    outcome: "Zero incidents — prevention, not reaction",
  },
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
  const [activeStage, setActiveStage] = useState(3);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Generate curve path
  const generateCurvePath = () => {
    let path = `M ${stages[0].x} ${stages[0].y}`;
    for (let i = 0; i < stages.length - 1; i++) {
      const current = stages[i];
      const next = stages[i + 1];
      const cpX = (current.x + next.x) / 2;
      path += ` Q ${cpX} ${current.y}, ${next.x} ${next.y}`;
    }
    return path;
  };

  return (
    <SalesSlideContainer
      id="sales-slide-6"
      title="Your Operational Performance Roadmap"
      subtitle="From fragmented to predictive in 18-24 months"
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
        {/* Maturity Curve SVG */}
        <div className="flex justify-center items-center max-h-[50vh]">
          <svg viewBox="0 0 500 380" className="w-full max-w-3xl h-auto max-h-[320px]">
            <defs>
              <linearGradient id="salesCurveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(0 70% 50%)" />
                <stop offset="25%" stopColor="hsl(199 89% 48%)" />
                <stop offset="50%" stopColor="hsl(173 80% 40%)" />
                <stop offset="75%" stopColor="hsl(280 65% 55%)" />
                <stop offset="100%" stopColor="hsl(45 93% 58%)" />
              </linearGradient>
              <filter id="salesGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Y-axis */}
            <line x1="40" y1="330" x2="40" y2="30" stroke="hsl(222 47% 25%)" strokeWidth="2" />
            <text x="15" y="180" fill="hsl(215 20% 65%)" fontSize="10" fontWeight="600" textAnchor="middle" transform="rotate(-90, 15, 180)">
              CAPABILITY
            </text>

            {/* X-axis */}
            <line x1="40" y1="330" x2="480" y2="330" stroke="hsl(222 47% 25%)" strokeWidth="2" />
            <text x="260" y="365" fill="hsl(215 20% 65%)" fontSize="10" fontWeight="600" textAnchor="middle">
              MATURITY JOURNEY
            </text>

            {/* Grid lines */}
            {[100, 170, 240].map((y) => (
              <line key={y} x1="40" y1={y} x2="480" y2={y} stroke="hsl(222 47% 15%)" strokeWidth="1" strokeDasharray="4,4" />
            ))}

            {/* Hockey stick curve */}
            <path
              d={generateCurvePath()}
              fill="none"
              stroke="url(#salesCurveGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#salesGlow)"
              className={`transition-all duration-1000 ${isAnimated ? "opacity-100" : "opacity-0"}`}
            />

            {/* Platform Shift marker */}
            <g className={`transition-opacity duration-700 delay-500 ${isAnimated ? "opacity-100" : "opacity-0"}`}>
              <line x1="240" y1="210" x2="240" y2="330" stroke="hsl(173 80% 40%)" strokeWidth="2" strokeDasharray="6,4" />
              <rect x="195" y="235" width="90" height="22" rx="4" fill="hsl(173 80% 40% / 0.2)" stroke="hsl(173 80% 40%)" strokeWidth="1" />
              <text x="240" y="250" fill="hsl(173 80% 50%)" fontSize="9" fontWeight="600" textAnchor="middle">
                PLATFORM SHIFT
              </text>
            </g>

            {/* Stage markers */}
            {stages.map((stage) => {
              const isActive = activeStage === stage.stage;
              return (
                <g
                  key={stage.stage}
                  className="cursor-pointer"
                  onClick={() => setActiveStage(stage.stage)}
                >
                  {/* Marker circle */}
                  <circle
                    cx={stage.x}
                    cy={stage.y}
                    r={isActive ? 14 : 10}
                    fill={stage.color}
                    filter="url(#salesGlow)"
                    className={`transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                  />
                  <circle cx={stage.x} cy={stage.y} r={isActive ? 7 : 5} fill="hsl(222 47% 6%)" className={`transition-all duration-300 ${isAnimated ? "opacity-100" : "opacity-0"}`} />
                  <text x={stage.x} y={stage.y + 4} fill={stage.color} fontSize="9" fontWeight="bold" textAnchor="middle">
                    {stage.stage}
                  </text>

                  {/* Stage label below */}
                  <text x={stage.x} y="350" fill={isActive ? stage.color : "hsl(215 20% 65%)"} fontSize="9" fontWeight={isActive ? "700" : "500"} textAnchor="middle">
                    {stage.label}
                  </text>

                  {/* Use case annotation for active stage */}
                  {isActive && (
                    <g className="animate-fade-in">
                      <rect x={stage.x - 50} y={stage.y - 45} width="100" height="28" rx="4" fill="hsl(222 47% 10% / 0.95)" stroke={stage.color} strokeWidth="1" />
                      <text x={stage.x} y={stage.y - 32} fill={stage.color} fontSize="8" fontWeight="600" textAnchor="middle">
                        {stage.sublabel}
                      </text>
                      <text x={stage.x} y={stage.y - 22} fill="hsl(210 40% 98%)" fontSize="7" textAnchor="middle">
                        {stage.useCase}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Use Case Detail Card */}
        {(() => {
          const currentStage = stages[activeStage - 1];
          const currentUseCase = useCases[activeStage - 1];
          const isProblemStage = activeStage <= 2;
          return (
            <div className="max-w-2xl mx-auto w-full">
              <div
                className="rounded-lg p-4 space-y-3"
                style={{ backgroundColor: `${currentStage.color}10`, borderLeft: `3px solid ${currentStage.color}` }}
              >
                {/* Header */}
                <div className="flex items-start gap-2">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${currentStage.color}, ${currentStage.color}80)` }}
                  >
                    {activeStage}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground leading-tight">{currentStage.label}</h3>
                    <p className="text-xs font-medium mt-0.5" style={{ color: currentStage.color }}>{currentStage.sublabel}</p>
                  </div>
                </div>
                {/* Scenario */}
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 flex-shrink-0" style={{ color: currentStage.color }} />
                  <span className="text-sm font-semibold text-foreground">{currentUseCase.scenario}</span>
                </div>
                {/* Problem */}
                <div className="flex items-start gap-2">
                  {isProblemStage ? (
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-muted-foreground" />
                  ) : (
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: currentStage.color }} />
                  )}
                  <p className="text-xs text-muted-foreground leading-relaxed">{currentUseCase.problem}</p>
                </div>
                {/* Outcome */}
                <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: `${currentStage.color}30` }}>
                  <span className="text-xs font-medium" style={{ color: currentStage.color }}>➜</span>
                  <p className="text-xs font-medium text-foreground">{currentUseCase.outcome}</p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Bottom note */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-medium">Best-in-class products</span> get you to Stage 2.{" "}
            <span className="text-primary font-medium">The full platform</span> takes you beyond.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide6Journey;
