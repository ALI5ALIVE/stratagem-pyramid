import { useState, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import GDSlideContainer from "./GDSlideContainer";
import Pyramid3D from "@/components/Pyramid3D";
import DetailsPanel, { LayerData } from "@/components/DetailsPanel";
import type { SlideNarrationProps } from "@/types/slideProps";

const layersData: LayerData[] = [
  {
    id: "PREDICTIVE",
    level: 5,
    headline: "Predictive & Proactive Leadership",
    sublabel: "AI-Driven Foresight",
    whatItLooksLike: [
      "AI anticipates market shifts before they surface",
      "Proactive positioning recommendations generated automatically",
      "Decisions made before competitors can react",
      "Continuous market monitoring with exception-led alerts",
      "Intelligence compounds across the value chain",
    ],
    result: [
      "Category leadership through speed and foresight",
      "First-mover advantage becomes systematic",
      "Teams shift from analysis to strategic action",
    ],
    whyItMatters:
      "AI compresses the insight-to-action gap while keeping humans in control — intelligence becomes a competitive moat",
    colorClass: "bg-gradient-to-b from-pyramid-transformational to-pyramid-transformational/80",
    accentColor: "hsl(45 93% 58%)",
    behavioralShift: {
      from: "Reactive analysis and reporting",
      to: "Proactive intelligence and strategic action",
      culturalMarker: "We see what's coming before it arrives",
    },
    timeAllocation: {
      coordination: 10,
      administration: 20,
      improvement: 70,
    },
    valueProof: {
      metrics: ["Decision speed ↑ 70%", "Launch success 2x", "TCO ↓ 30%"],
      roiStatement: "70% faster decisions, 2x higher launch success rates",
    },
  },
  {
    id: "OPTIMIZED",
    level: 4,
    headline: "Optimized Operations",
    sublabel: "Embedded Workflows",
    whatItLooksLike: [
      "Intelligence embedded directly into decision workflows",
      "Continuous improvement cycles across all functions",
      "Evidence captured automatically at every decision point",
      "Cross-functional alignment through shared dashboards",
    ],
    result: [
      "Reduced decision latency",
      "Faster time-to-market",
      "Measurable performance improvement across KPIs",
    ],
    whyItMatters:
      "Turns intelligence into controlled execution, not just reporting",
    colorClass: "bg-gradient-to-b from-pyramid-commercial to-pyramid-commercial/80",
    accentColor: "hsl(280 65% 55%)",
    behavioralShift: {
      from: "Reactive fixes and analysis requests",
      to: "Proactive improvement with outcome ownership",
      culturalMarker: "Insights drive real change, not just reports",
    },
    timeAllocation: {
      coordination: 20,
      administration: 30,
      improvement: 50,
    },
    valueProof: {
      metrics: ["Latency ↓ 50%", "Time-to-market ↓ 40%", "KPI lift ↑"],
      roiStatement: "50% reduction in decision latency, measurable market lift",
    },
  },
  {
    id: "CONNECTED",
    level: 3,
    headline: "Connected Intelligence",
    sublabel: "Platform Foundation",
    whatItLooksLike: [
      "Market, Consumer, Commercial intelligence unified into one governed system",
      "Shared taxonomy and traceability established",
      "Visibility improves; fragmentation reduces",
    ],
    result: [
      "Improved governance and confidence",
      "Decision readiness increases",
      "Foundation for optimized operations is in place",
    ],
    whyItMatters:
      "Eliminates handoffs and creates one version of intelligence truth",
    colorClass: "bg-gradient-to-b from-pyramid-operational to-pyramid-operational/80",
    accentColor: "hsl(173 80% 40%)",
    behavioralShift: {
      from: "Chasing data across tools and vendors",
      to: "Single source of truth, async collaboration",
      culturalMarker: "We can see what's happening across the market",
    },
    timeAllocation: {
      coordination: 30,
      administration: 35,
      improvement: 35,
    },
    valueProof: {
      metrics: ["Decision prep ↓ 30%", "Handoffs ↓ 50%", "Visibility ↑"],
      roiStatement: "Single source of truth reduces coordination overhead by 40%",
    },
  },
  {
    id: "MANAGED",
    level: 2,
    headline: "Managed (Siloed) Intelligence",
    sublabel: "Structured but disconnected",
    whatItLooksLike: [
      "Strong systems in specific domains (market, consumer, etc.)",
      "Intelligence is structured but disconnected across teams",
      "Analysis produces insights but alignment is inconsistent",
    ],
    result: [
      "Intelligence is managed, but decisions do not systematically improve",
      "Conflicting data persists",
    ],
    whyItMatters:
      "Domains operate well individually, but lack of connection prevents organizational alignment",
    colorClass: "bg-gradient-to-b from-pyramid-foundation to-pyramid-foundation/80",
    accentColor: "hsl(199 89% 48%)",
    behavioralShift: {
      from: "Debating data across tools",
      to: "Structured processes within each silo",
      culturalMarker: "We're informed, but not aligned",
    },
    timeAllocation: {
      coordination: 45,
      administration: 35,
      improvement: 20,
    },
    valueProof: {
      metrics: ["Domain coverage ↑", "Process consistency ↑", "Cross-func ROI limited"],
      roiStatement: "Structured intelligence, but limited cross-functional ROI",
    },
  },
  {
    id: "FRAGMENTED",
    level: 1,
    headline: "Fragmented & Reactive",
    sublabel: "The starting point",
    whatItLooksLike: [
      "Disconnected tools across market, consumer, commercial",
      "Decisions debated for weeks with conflicting data",
      "No shared taxonomy across intelligence domains",
      "Manual reconciliation required for every decision",
    ],
    result: [
      "High decision latency and missed windows",
      "Launches fail due to incomplete intelligence",
    ],
    whyItMatters:
      "Fragmentation is where growth stalls, relevance erodes, and leadership is lost — this is where most organizations start",
    colorClass: "bg-gradient-to-b from-pyramid-fragmentation to-pyramid-fragmentation/80",
    accentColor: "hsl(0 70% 50%)",
    behavioralShift: {
      from: "Debating data across disconnected systems",
      to: "This is where most organizations start",
      culturalMarker: "We have data, but no confidence",
    },
    timeAllocation: {
      coordination: 60,
      administration: 30,
      improvement: 10,
    },
    valueProof: {
      metrics: ["Decision latency 12+ wks", "3-5 conflicting sources", "40% miss windows"],
      roiStatement: "Hidden costs: missed opportunities, failed launches, eroded margins",
    },
  },
];

const glowClasses: Record<string, string> = {
  PREDICTIVE: "glow-transformational",
  OPTIMIZED: "glow-commercial",
  CONNECTED: "glow-operational",
  MANAGED: "glow-foundation",
  FRAGMENTED: "glow-fragmentation",
};

const layerOrder = ["FRAGMENTED", "MANAGED", "CONNECTED", "OPTIMIZED", "PREDICTIVE"];

// Timing markers for narration-synced stage changes
const stageTimings = [
  { stage: "FRAGMENTED", startPercent: 8 },
  { stage: "MANAGED", startPercent: 22 },
  { stage: "CONNECTED", startPercent: 35 },
  { stage: "OPTIMIZED", startPercent: 52 },
  { stage: "PREDICTIVE", startPercent: 70 },
];

const GDSlide6ValuePyramid = ({
  isPlaying: narrationPlaying = false,
  isLoading: narrationLoading = false,
  progress: narrationProgress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activeLayerId, setActiveLayerId] = useState("FRAGMENTED");
  const [highlightedModule, setHighlightedModule] = useState<string | null>(null);
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isNarrationControlled, setIsNarrationControlled] = useState(false);

  const activeLayer = layersData.find((l) => l.id === activeLayerId) || layersData[4];
  const currentIndex = layerOrder.indexOf(activeLayerId);

  // Sync stage with narration progress
  useEffect(() => {
    if (narrationPlaying && narrationProgress > 0) {
      setIsNarrationControlled(true);
      setIsAutoCycling(false);
      
      const currentTiming = [...stageTimings]
        .reverse()
        .find(t => narrationProgress >= t.startPercent);
      
      if (currentTiming && currentTiming.stage !== activeLayerId) {
        setActiveLayerId(currentTiming.stage);
      }
    } else if (!narrationPlaying && isNarrationControlled) {
      // Narration stopped - keep current stage but release control
      setIsNarrationControlled(false);
    }
  }, [narrationPlaying, narrationProgress, activeLayerId, isNarrationControlled]);

  // Auto-cycle through stages (only when not narration-controlled)
  useEffect(() => {
    if (!isAutoCycling || isNarrationControlled) {
      setProgress(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 80);

    const cycleInterval = setInterval(() => {
      setActiveLayerId((prev) => {
        const currentIdx = layerOrder.indexOf(prev);
        const nextIdx = (currentIdx + 1) % layerOrder.length;
        return layerOrder[nextIdx];
      });
      setProgress(0);
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(cycleInterval);
    };
  }, [isAutoCycling, isNarrationControlled]);

  const handleLayerClick = useCallback((level: number) => {
    const layer = layersData.find((l) => l.level === level);
    if (layer) {
      setActiveLayerId(layer.id);
      setHighlightedModule(null);
      setIsAutoCycling(false);
    }
  }, []);

  const handleModuleClick = useCallback((module: string) => {
    setActiveLayerId("MANAGED"); // Foundation sections are now Stage 2
    setHighlightedModule(module);
    setIsAutoCycling(false);
    setTimeout(() => setHighlightedModule(null), 3000);
  }, []);

  const handleDotClick = (index: number) => {
    setActiveLayerId(layerOrder[index]);
    setIsAutoCycling(false);
    setProgress(0);
  };

  return (
    <GDSlideContainer
      id="slide-6"
      title="Intelligence Maturity Ladder"
      subtitle="The building blocks: from fragmented insight to predictive leadership"
      slideNumber={6}
      isPlaying={narrationPlaying}
      isLoading={narrationLoading}
      progress={narrationProgress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch h-full">
        {/* LEFT: Pyramid Visual */}
        <div className="w-full min-h-[300px] lg:min-h-[400px] flex items-center justify-center">
          <Pyramid3D
            layers={layersData.map((layer) => ({
              id: layer.id,
              level: layer.level,
              label: layer.headline,
              sublabel: layer.sublabel,
              colorClass: layer.colorClass,
              glowClass: glowClasses[layer.id],
            }))}
            activeLayer={activeLayer.level}
            onLayerClick={handleLayerClick}
            onModuleClick={handleModuleClick}
            compact={true}
          />
        </div>

        {/* RIGHT: Details Panel */}
        <div className="h-full overflow-y-auto bg-card/30 rounded-lg p-4 border border-border/30 flex flex-col">
          <div className={`flex-1 transition-all duration-500 ${isNarrationControlled ? 'animate-fade-in' : ''}`}>
            <DetailsPanel layer={activeLayer} highlightedModule={highlightedModule} />
          </div>
          
          {/* Stage Indicator & Controls */}
          <div className="mt-3 pt-3 border-t border-border/30">
            <div className="flex items-center justify-between gap-2">
              {/* Stage dots */}
              <div className="flex items-center gap-1.5">
                {layerOrder.map((id, index) => (
                  <button
                    key={id}
                    onClick={() => handleDotClick(index)}
                    className={`relative w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? "bg-primary scale-125"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to stage ${index + 1}`}
                  >
                    {index === currentIndex && isAutoCycling && (
                      <span 
                        className="absolute inset-0 rounded-full bg-primary/30 animate-ping"
                        style={{ animationDuration: "2s" }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Progress bar */}
              {isAutoCycling && (
                <div className="flex-1 h-1 bg-muted/30 rounded-full overflow-hidden max-w-16">
                  <div 
                    className="h-full bg-primary/60 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* Play/Pause button */}
              <button
                onClick={() => setIsAutoCycling(!isAutoCycling)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isAutoCycling ? "Pause auto-play" : "Resume auto-play"}
              >
                {isAutoCycling ? (
                  <>
                    <Pause className="w-2.5 h-2.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-2.5 h-2.5" />
                    <span>Auto-play</span>
                  </>
                )}
              </button>
            </div>

            {/* Stage label */}
            <p className="text-[9px] text-muted-foreground mt-1.5 text-center">
              Stage {currentIndex + 1} of {layerOrder.length} · {isAutoCycling ? "Click pyramid or pause to explore" : "Click play to resume"}
            </p>
          </div>
        </div>
      </div>
    </GDSlideContainer>
  );
};

export default GDSlide6ValuePyramid;
