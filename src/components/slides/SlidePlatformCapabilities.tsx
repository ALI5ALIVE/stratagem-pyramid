import { useState, useEffect } from "react";
import SlideContainer from "./SlideContainer";
import { Database, Zap, Sparkles, ShieldCheck, TrendingUp, Trophy, ChevronRight } from "lucide-react";
import platformEcosystem from "@/assets/comply365-platform-ecosystem.png";
import type { SlideNarrationProps } from "@/types/slideProps";

// Timing markers for narration-synced capability expansion
const capabilityTimings = [
  { index: 0, startPercent: 15 },  // Data That Connects
  { index: 1, startPercent: 40 },  // Automation That Adapts
  { index: 2, startPercent: 65 },  // AI That Drives
];

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
  const [isNarrationControlled, setIsNarrationControlled] = useState(false);

  // Sync capability cards with narration progress
  useEffect(() => {
    if (isPlaying && progress > 0) {
      setIsNarrationControlled(true);
      
      const currentTiming = [...capabilityTimings]
        .reverse()
        .find(t => progress >= t.startPercent);
      
      if (currentTiming && currentTiming.index !== activeCapability) {
        setActiveCapability(currentTiming.index);
      }
    } else if (!isPlaying && isNarrationControlled) {
      setIsNarrationControlled(false);
    }
  }, [isPlaying, progress, activeCapability, isNarrationControlled]);

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
          {/* Left: Visual - Ecosystem Image with Capability Labels */}
          <div className="flex items-center justify-center py-8">
            <img 
              src={platformEcosystem} 
              alt="Comply365 Platform Ecosystem" 
              className="w-72 h-72 lg:w-80 lg:h-80 object-contain"
            />
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
                        ${isNarrationControlled && isCapActive ? 'animate-fade-in' : ''}
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
              Click cards to explore each capability
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
