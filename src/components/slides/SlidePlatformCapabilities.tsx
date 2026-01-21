import { useState } from "react";
import SlideContainer from "./SlideContainer";
import { Database, Zap, Sparkles, ShieldCheck, TrendingUp, Trophy, ChevronRight } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

const capabilities = [
  {
    id: "data",
    icon: Database,
    title: "Data That Connects",
    tagline: "Shared models, taxonomies, and knowledge maps across domains",
    bullets: [
      "One version of truth across safety, training & content",
      "Shared governance & full traceability",
      "Less fragmentation, more insight"
    ],
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: "automation",
    icon: Zap,
    title: "Automation That Adapts",
    tagline: "Threshold-driven, role-aware workflows with no/low-code configurability",
    bullets: [
      "Event-triggered actions across modules",
      "Cross-functional orchestration",
      "Faster time-to-change"
    ],
    color: "from-cyan-400 to-teal-400"
  },
  {
    id: "intelligence",
    icon: Sparkles,
    title: "AI That Drives",
    tagline: "Embedded, transparent intelligence that evolves with usage",
    bullets: [
      "Earlier detection of weak signals",
      "Recommended actions, not just alerts",
      "Exception-led human oversight"
    ],
    color: "from-teal-400 to-emerald-400"
  }
];

const outcomes = [
  {
    icon: ShieldCheck,
    label: "Revenue Protection",
    desc: "Fewer incidents, less disruption",
    metric: "$10-50M",
    metricLabel: "saved annually"
  },
  {
    icon: TrendingUp,
    label: "Operational Efficiency",
    desc: "Reduced exposure, faster recovery",
    metric: "70%",
    metricLabel: "faster change"
  },
  {
    icon: Trophy,
    label: "Competitive Advantage",
    desc: "Lower cost, improved performance",
    metric: "40%",
    metricLabel: "less effort"
  }
];

const SlidePlatformCapabilities = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activeCapability, setActiveCapability] = useState<number | null>(null);

  return (
    <SlideContainer
      id="slide-4"
      title="The Platform That Powers It"
      subtitle="Three foundational capabilities that deliver outcomes point solutions cannot achieve alone"
      slideNumber={4}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col h-full">
        {/* Main content - Two column layout */}
        <div className="grid lg:grid-cols-2 gap-8 flex-1 items-center">
          {/* Left: Visual - Interconnected Pillars */}
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 400 320" className="w-full max-w-md h-auto">
              <defs>
                <linearGradient id="dataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(217 91% 60%)" />
                  <stop offset="100%" stopColor="hsl(187 92% 55%)" />
                </linearGradient>
                <linearGradient id="autoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(187 92% 55%)" />
                  <stop offset="100%" stopColor="hsl(168 76% 47%)" />
                </linearGradient>
                <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(168 76% 47%)" />
                  <stop offset="100%" stopColor="hsl(152 69% 47%)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Connection lines with animated flow */}
              <g className="opacity-60">
                {/* Data to Automation */}
                <path
                  d="M 140 120 Q 120 180 100 220"
                  fill="none"
                  stroke="url(#dataGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                {/* Data to AI */}
                <path
                  d="M 260 120 Q 280 180 300 220"
                  fill="none"
                  stroke="url(#aiGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                {/* Automation to AI */}
                <path
                  d="M 150 260 L 250 260"
                  fill="none"
                  stroke="url(#autoGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </g>

              {/* Data Node - Top */}
              <g
                className={`cursor-pointer transition-all duration-300 ${activeCapability === 0 ? 'scale-110' : 'hover:scale-105'}`}
                style={{ transformOrigin: '200px 80px' }}
                onClick={() => setActiveCapability(activeCapability === 0 ? null : 0)}
              >
                <circle
                  cx="200"
                  cy="80"
                  r="55"
                  fill="hsl(var(--card))"
                  stroke="url(#dataGrad)"
                  strokeWidth={activeCapability === 0 ? 3 : 2}
                  filter={activeCapability === 0 ? "url(#glow)" : ""}
                />
                <foreignObject x="165" y="50" width="70" height="60">
                  <div className="flex flex-col items-center justify-center h-full">
                    <Database className="w-8 h-8 text-blue-400" />
                    <span className="text-[10px] text-muted-foreground mt-1 text-center leading-tight">
                      Connected<br/>Data
                    </span>
                  </div>
                </foreignObject>
              </g>

              {/* Automation Node - Bottom Left */}
              <g
                className={`cursor-pointer transition-all duration-300 ${activeCapability === 1 ? 'scale-110' : 'hover:scale-105'}`}
                style={{ transformOrigin: '100px 260px' }}
                onClick={() => setActiveCapability(activeCapability === 1 ? null : 1)}
              >
                <circle
                  cx="100"
                  cy="260"
                  r="55"
                  fill="hsl(var(--card))"
                  stroke="url(#autoGrad)"
                  strokeWidth={activeCapability === 1 ? 3 : 2}
                  filter={activeCapability === 1 ? "url(#glow)" : ""}
                />
                <foreignObject x="65" y="230" width="70" height="60">
                  <div className="flex flex-col items-center justify-center h-full">
                    <Zap className="w-8 h-8 text-cyan-400" />
                    <span className="text-[10px] text-muted-foreground mt-1 text-center leading-tight">
                      Adaptive<br/>Automation
                    </span>
                  </div>
                </foreignObject>
              </g>

              {/* AI Node - Bottom Right */}
              <g
                className={`cursor-pointer transition-all duration-300 ${activeCapability === 2 ? 'scale-110' : 'hover:scale-105'}`}
                style={{ transformOrigin: '300px 260px' }}
                onClick={() => setActiveCapability(activeCapability === 2 ? null : 2)}
              >
                <circle
                  cx="300"
                  cy="260"
                  r="55"
                  fill="hsl(var(--card))"
                  stroke="url(#aiGrad)"
                  strokeWidth={activeCapability === 2 ? 3 : 2}
                  filter={activeCapability === 2 ? "url(#glow)" : ""}
                />
                <foreignObject x="265" y="230" width="70" height="60">
                  <div className="flex flex-col items-center justify-center h-full">
                    <Sparkles className="w-8 h-8 text-teal-400" />
                    <span className="text-[10px] text-muted-foreground mt-1 text-center leading-tight">
                      Embedded<br/>Intelligence
                    </span>
                  </div>
                </foreignObject>
              </g>

              {/* Center label */}
              <text x="200" y="185" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11" fontWeight="500">
                Platform Core
              </text>
            </svg>
          </div>

          {/* Right: Capability Cards */}
          <div className="flex flex-col gap-3">
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              const isCapActive = activeCapability === index;

              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveCapability(isCapActive ? null : index)}
                  className={`
                    text-left p-4 rounded-xl border transition-all duration-300
                    ${isCapActive
                      ? 'bg-card border-primary/50 shadow-lg shadow-primary/10'
                      : 'bg-card/50 border-border/50 hover:border-border hover:bg-card'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-10 h-10 rounded-lg bg-gradient-to-br ${cap.color} 
                      flex items-center justify-center flex-shrink-0
                    `}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground text-sm">{cap.title}</h4>
                        <ChevronRight className={`
                          w-4 h-4 text-muted-foreground transition-transform duration-300
                          ${isCapActive ? 'rotate-90' : ''}
                        `} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {cap.tagline}
                      </p>
                      
                      {/* Expanded content */}
                      <div className={`
                        overflow-hidden transition-all duration-300
                        ${isCapActive ? 'max-h-32 mt-3' : 'max-h-0'}
                      `}>
                        <ul className="space-y-1.5">
                          {cap.bullets.map((bullet, bIndex) => (
                            <li key={bIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cap.color} mt-1.5 flex-shrink-0`} />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            <p className="text-[10px] text-muted-foreground/60 text-center mt-2">
              Click nodes or cards to explore each capability
            </p>
          </div>
        </div>

        {/* Bottom: Value Outcomes Banner */}
        <div className="mt-6 pt-5 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4">
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-foreground">{outcome.label}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-1">{outcome.desc}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-lg font-bold text-primary">{outcome.metric}</span>
                    <span className="text-[10px] text-muted-foreground">{outcome.metricLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlidePlatformCapabilities;
