import { useState, useEffect } from "react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { Zap } from "lucide-react";

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
        <div className="flex-1 flex justify-center items-center">
          <svg viewBox="0 0 500 380" className="w-full max-w-3xl h-auto">
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

        {/* Timeline comparison */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="grid grid-cols-2 gap-4">
            {/* Traditional */}
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
              <div className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2">Traditional Path</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-destructive/30 rounded" />
                <span className="text-lg font-bold text-destructive">5-7 years</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Manual coordination, siloed systems</p>
            </div>

            {/* With Platform */}
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1">
                <Zap className="w-3 h-3" /> With Platform
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1/3 h-3 bg-primary rounded" />
                <span className="text-lg font-bold text-primary">18-24 months</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Connected, intelligent, predictive</p>
            </div>
          </div>
        </div>

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
