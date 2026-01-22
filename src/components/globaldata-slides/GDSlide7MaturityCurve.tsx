import { useState, useEffect } from "react";
import GDSlideContainer from "./GDSlideContainer";
import { useIsMobile } from "@/hooks/use-mobile";
import type { SlideNarrationProps } from "@/types/slideProps";

const stages = [
  { id: 1, label: "Fragmented", sublabel: "Manual/Reactive", annotations: ["Disconnected tools", "No shared taxonomy", "Slow decisions"] },
  { id: 2, label: "Managed", sublabel: "Silo Optimization", annotations: ["Structured locally", "Limited visibility"] },
  { id: 3, label: "Connected", sublabel: "Shared Truth", annotations: ["Market→Consumer→GTM", "Evidence by default"], isShift: true },
  { id: 4, label: "Optimized", sublabel: "Intelligent Ops", annotations: ["Embedded workflows", "Continuous improvement"] },
  { id: 5, label: "Predictive", sublabel: "Autonomous Leadership", annotations: ["AI-led insights", "Proactive positioning"] },
];

const stageTimings = [
  { stage: 0, startPercent: 10 },
  { stage: 1, startPercent: 25 },
  { stage: 2, startPercent: 45 },
  { stage: 3, startPercent: 65 },
  { stage: 4, startPercent: 80 },
];

const GDSlide7MaturityCurve = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const isMobile = useIsMobile();
  const [activeStage, setActiveStage] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isNarrationControlled, setIsNarrationControlled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

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
      setIsNarrationControlled(false);
    }
  }, [isPlaying, progress, activeStage, isNarrationControlled]);

  const viewBox = isMobile ? "0 0 400 300" : "0 0 600 350";
  const width = isMobile ? 400 : 600;
  const height = isMobile ? 300 : 350;
  const padding = { left: 60, right: 40, top: 40, bottom: 60 };

  // Hockey stick curve points
  const curvePoints = stages.map((stage, i) => {
    const x = padding.left + (i / (stages.length - 1)) * (width - padding.left - padding.right);
    // Hockey stick: slow growth early, then acceleration
    const baseY = height - padding.bottom;
    const yValues = [0.08, 0.12, 0.35, 0.65, 0.95]; // Hockey stick progression
    const y = baseY - yValues[i] * (height - padding.top - padding.bottom);
    return { x, y, stage };
  });

  const generateCurvePath = () => {
    let path = `M ${curvePoints[0].x} ${curvePoints[0].y}`;
    for (let i = 1; i < curvePoints.length; i++) {
      const prev = curvePoints[i - 1];
      const curr = curvePoints[i];
      const cpx1 = prev.x + (curr.x - prev.x) * 0.5;
      const cpx2 = prev.x + (curr.x - prev.x) * 0.5;
      path += ` Q ${cpx1} ${prev.y}, ${cpx2} ${(prev.y + curr.y) / 2}`;
      path += ` T ${curr.x} ${curr.y}`;
    }
    return path;
  };

  return (
    <GDSlideContainer
      id="gd-slide-7"
      title="From Today's Reality to Predictive Leadership"
      subtitle="The maturity roadmap most organisations need to follow"
      slideNumber={7}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="grid lg:grid-cols-2 gap-6 h-full items-center">
        {/* Curve Visualization */}
        <div className="relative">
          <svg viewBox={viewBox} className="w-full h-auto">
            <defs>
              <linearGradient id="curveGradientGD" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(0 72% 51%)" />
                <stop offset="30%" stopColor="hsl(45 93% 47%)" />
                <stop offset="60%" stopColor="hsl(160 84% 39%)" />
                <stop offset="100%" stopColor="hsl(180 70% 45%)" />
              </linearGradient>
              <filter id="glowGD" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`hgrid-${i}`}
                x1={padding.left}
                x2={width - padding.right}
                y1={padding.top + (i * (height - padding.top - padding.bottom)) / 4}
                y2={padding.top + (i * (height - padding.top - padding.bottom)) / 4}
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))}

            {/* Y-axis label */}
            <text
              x={20}
              y={height / 2}
              fill="hsl(var(--muted-foreground))"
              fontSize="10"
              textAnchor="middle"
              transform={`rotate(-90, 20, ${height / 2})`}
            >
              Operational Value
            </text>

            {/* X-axis label */}
            <text
              x={width / 2}
              y={height - 10}
              fill="hsl(var(--muted-foreground))"
              fontSize="10"
              textAnchor="middle"
            >
              Intelligence Maturity
            </text>

            {/* The curve */}
            <path
              d={generateCurvePath()}
              fill="none"
              stroke="url(#curveGradientGD)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glowGD)"
              className={`transition-all duration-1000 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: isAnimated ? 0 : 1000,
                transition: 'stroke-dashoffset 2s ease-out, opacity 0.3s'
              }}
            />

            {/* Stage markers */}
            {curvePoints.map((point, i) => {
              const isActive = i === activeStage;
              const stage = stages[i];

              return (
                <g key={i}>
                  {/* Click target */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={16}
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => setActiveStage(i)}
                  />

                  {/* Marker */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isActive ? 10 : 6}
                    fill={isActive ? "hsl(160 84% 39%)" : "hsl(var(--card))"}
                    stroke={isActive ? "white" : "hsl(160 84% 39%)"}
                    strokeWidth={isActive ? 3 : 2}
                    className="transition-all duration-300"
                    filter={isActive ? "url(#glowGD)" : ""}
                  />

                  {/* Stage label */}
                  <text
                    x={point.x}
                    y={height - padding.bottom + 20}
                    fill={isActive ? "hsl(160 84% 39%)" : "hsl(var(--muted-foreground))"}
                    fontSize="9"
                    textAnchor="middle"
                    fontWeight={isActive ? "bold" : "normal"}
                  >
                    {stage.label}
                  </text>

                  {/* Platform shift marker */}
                  {stage.isShift && !isMobile && (
                    <g>
                      <line
                        x1={point.x}
                        y1={point.y - 15}
                        x2={point.x}
                        y2={padding.top + 10}
                        stroke="hsl(160 84% 39%)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.5"
                      />
                      <rect
                        x={point.x - 35}
                        y={padding.top}
                        width={70}
                        height={18}
                        fill="hsl(160 84% 39%)"
                        rx={4}
                      />
                      <text
                        x={point.x}
                        y={padding.top + 12}
                        fill="white"
                        fontSize="8"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        PLATFORM SHIFT
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Stage Details */}
        <div className={`space-y-4 ${isNarrationControlled ? 'animate-fade-in' : ''}`}>
          {/* Current Stage */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-emerald-400 font-mono text-sm">Stage {stages[activeStage].id}</span>
              {stages[activeStage].isShift && (
                <span className="px-2 py-0.5 bg-emerald-500 rounded text-[10px] text-white font-semibold uppercase">
                  Platform Shift
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1">{stages[activeStage].label}</h3>
            <p className="text-sm text-muted-foreground">{stages[activeStage].sublabel}</p>
          </div>

          {/* Annotations */}
          <div className="bg-card/50 border border-border/50 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">Characteristics</p>
            <ul className="space-y-2">
              {stages[activeStage].annotations.map((annotation, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  {annotation}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Message */}
          <div className="bg-card border border-border/50 rounded-lg p-4 text-center">
            <p className="text-sm text-foreground">
              Most organisations don't need more data. They need a <span className="font-bold text-emerald-400">clear, credible path forward</span>.
            </p>
          </div>

          {/* Stage Dots */}
          <div className="flex items-center justify-center gap-2">
            {stages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStage(i)}
                className={`
                  w-2.5 h-2.5 rounded-full transition-all duration-300
                  ${i === activeStage 
                    ? 'bg-emerald-400 scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </GDSlideContainer>
  );
};

export default GDSlide7MaturityCurve;
