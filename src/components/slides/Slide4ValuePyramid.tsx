import { useState, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import SlideContainer from "./SlideContainer";
import Pyramid3D from "@/components/Pyramid3D";
import DetailsPanel, { LayerData } from "@/components/DetailsPanel";
import type { SlideNarrationProps } from "@/types/slideProps";

const layersData: LayerData[] = [
  {
    id: "PREDICTIVE",
    level: 5,
    headline: "Predictive Operations",
    sublabel: "AI-Accelerated Performance",
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
    colorClass: "bg-gradient-to-b from-pyramid-transformational to-pyramid-transformational/80",
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
  },
  {
    id: "INTELLIGENT",
    level: 4,
    headline: "Intelligent Operations",
    sublabel: "AI-Assisted Execution",
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
    colorClass: "bg-gradient-to-b from-pyramid-commercial to-pyramid-commercial/80",
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
  },
  {
    id: "CONNECTED",
    level: 3,
    headline: "Connected Governance",
    sublabel: "Platform Foundation",
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
    colorClass: "bg-gradient-to-b from-pyramid-operational to-pyramid-operational/80",
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
  },
  {
    id: "MANAGED",
    level: 2,
    headline: "Managed (Siloed) Compliance",
    sublabel: "Structured but disconnected",
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
    colorClass: "bg-gradient-to-b from-pyramid-foundation to-pyramid-foundation/80",
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
  },
  {
    id: "FRAGMENTED",
    level: 1,
    headline: "Fragmented & Reactive",
    sublabel: "The starting point",
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
    colorClass: "bg-gradient-to-b from-pyramid-fragmentation to-pyramid-fragmentation/80",
    accentColor: "hsl(0 70% 50%)",
    behavioralShift: {
      from: "Firefighting across disconnected systems",
      to: "This is where most organizations start",
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
  },
];

const glowClasses: Record<string, string> = {
  PREDICTIVE: "glow-transformational",
  INTELLIGENT: "glow-commercial",
  CONNECTED: "glow-operational",
  MANAGED: "glow-foundation",
  FRAGMENTED: "glow-fragmentation",
};

const layerOrder = ["FRAGMENTED", "MANAGED", "CONNECTED", "INTELLIGENT", "PREDICTIVE"];

// Timing markers for narration-synced stage changes
const stageTimings = [
  { stage: "FRAGMENTED", startPercent: 10 },
  { stage: "MANAGED", startPercent: 24 },
  { stage: "CONNECTED", startPercent: 38 },
  { stage: "INTELLIGENT", startPercent: 55 },
  { stage: "PREDICTIVE", startPercent: 72 },
];

const Slide4ValuePyramid = ({
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
    <SlideContainer
      id="slide-6"
      title="Operational Performance Ladder"
      subtitle="The building blocks: from fragmented compliance to predictive performance"
      slideNumber={slideNumber}
      isPlaying={narrationPlaying}
      isLoading={narrationLoading}
      progress={narrationProgress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-stretch h-full">
        {/* LEFT: Pyramid Visual */}
        <div className="w-full min-h-[260px] lg:min-h-[340px] flex items-center justify-center">
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
            
            {/* Individual solution value clarification */}
            <p className="text-[8px] text-muted-foreground/70 mt-2 text-center italic border-t border-border/20 pt-2">
              Individual solutions deliver departmental value at Stage 2. Platform integration unlocks Stages 3-5 with compounding returns.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide4ValuePyramid;
