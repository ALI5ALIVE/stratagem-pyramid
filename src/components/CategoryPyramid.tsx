import { useState, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import Pyramid3D from "./Pyramid3D";
import DetailsPanel, { LayerData } from "./DetailsPanel";
import PlatformCallout from "./PlatformCallout";
import PageNavigation from "./PageNavigation";

const layersData: LayerData[] = [
  {
    id: "PREDICTIVE",
    level: 1,
    headline: "Predictive & Agentic Reliability",
    sublabel: "AI-Accelerated",
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
    id: "CLOSED_LOOP",
    level: 2,
    headline: "Closed-Loop Operational Improvement",
    sublabel: "Outcome Engine",
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
    level: 4,
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
    level: 5,
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
  CLOSED_LOOP: "glow-commercial",
  CONNECTED: "glow-operational",
  MANAGED: "glow-foundation",
  FRAGMENTED: "glow-fragmentation",
};

const layerOrder = ["FRAGMENTED", "MANAGED", "CONNECTED", "CLOSED_LOOP", "PREDICTIVE"];

const CategoryPyramid = () => {
  const [activeLayerId, setActiveLayerId] = useState("FRAGMENTED");
  const [highlightedModule, setHighlightedModule] = useState<string | null>(null);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeLayer = layersData.find((l) => l.id === activeLayerId) || layersData[4];
  const currentIndex = layerOrder.indexOf(activeLayerId);

  // Auto-cycle through stages
  useEffect(() => {
    if (!isAutoCycling) {
      setProgress(0);
      return;
    }

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 80);

    // Stage change
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
  }, [isAutoCycling]);

  const handleLayerClick = useCallback((level: number) => {
    const layer = layersData.find((l) => l.level === level);
    if (layer) {
      setActiveLayerId(layer.id);
      setHighlightedModule(null);
      setIsAutoCycling(false); // Pause on manual interaction
    }
  }, []);

  const handleModuleClick = useCallback((module: string) => {
    setActiveLayerId("CONNECTED");
    setHighlightedModule(module);
    setIsAutoCycling(false); // Pause on manual interaction
    setTimeout(() => setHighlightedModule(null), 3000);
  }, []);

  const handleDotClick = (index: number) => {
    setActiveLayerId(layerOrder[index]);
    setIsAutoCycling(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-6 md:pb-8 px-4 sm:px-6 text-center">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-2 sm:mb-3">
          Comply365
        </p>
        <PageNavigation />
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-foreground mb-2 sm:mb-4">
          Operational Reliability &<br />
          <span className="text-gradient-primary">Readiness Platform</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2">
          From fragmented point solutions to a connected platform that delivers measurable outcomes
        </p>
      </header>

      {/* Main content - Side by side layout on desktop, stacked on mobile */}
      <main className="container max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 sm:pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-4 lg:gap-6 items-stretch lg:min-h-[650px]">
          {/* LEFT: Pyramid Visual - full size */}
          <div className="w-full min-h-[350px] sm:min-h-[450px] md:min-h-[500px] lg:h-full flex items-center justify-center order-1">
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
            />
          </div>

          {/* RIGHT: Details Panel - scrollable content */}
          <div className="h-full max-h-[60vh] sm:max-h-[70vh] lg:max-h-none lg:overflow-y-auto lg:pr-1 scrollbar-thin bg-card/30 rounded-md p-2 sm:p-3 border border-border/30 flex flex-col order-2 overflow-y-auto">
            <div className="flex-1 transition-opacity duration-300">
              <DetailsPanel layer={activeLayer} highlightedModule={highlightedModule} />
            </div>
            
            {/* Stage Indicator & Controls */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/30">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                {/* Stage dots */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {layerOrder.map((id, index) => (
                    <button
                      key={id}
                      onClick={() => handleDotClick(index)}
                      className={`relative w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 ${
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
                  <div className="flex-1 h-1 bg-muted/30 rounded-full overflow-hidden max-w-16 sm:max-w-24">
                    <div 
                      className="h-full bg-primary/60 transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                {/* Play/Pause button */}
                <button
                  onClick={() => setIsAutoCycling(!isAutoCycling)}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-medium bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={isAutoCycling ? "Pause auto-play" : "Resume auto-play"}
                >
                  {isAutoCycling ? (
                    <>
                      <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden xs:inline sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden xs:inline sm:inline">Auto-play</span>
                    </>
                  )}
                </button>
              </div>

              {/* Stage label */}
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2 text-center">
                Stage {currentIndex + 1} of {layerOrder.length} · <span className="hidden sm:inline">{isAutoCycling ? "Click pyramid or pause to explore" : "Click play to resume"}</span><span className="sm:hidden">{isAutoCycling ? "Tap to explore" : "Tap play"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Platform Callout - full width below */}
        <div className="mt-6 sm:mt-8 md:mt-12 max-w-3xl mx-auto">
          <PlatformCallout />
        </div>
      </main>

      {/* Footer attribution */}
      <footer className="py-4 sm:py-6 text-center border-t border-border/50">
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          © 2026 Comply365 · Operational Reliability & Readiness Platform
        </p>
      </footer>
    </div>
  );
};

export default CategoryPyramid;
