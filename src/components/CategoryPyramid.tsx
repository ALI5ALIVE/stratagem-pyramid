import { useState } from "react";
import Pyramid3D from "./Pyramid3D";
import DetailsPanel, { LayerData } from "./DetailsPanel";
import PlatformCallout from "./PlatformCallout";

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
  },
];

const glowClasses: Record<string, string> = {
  PREDICTIVE: "glow-transformational",
  CLOSED_LOOP: "glow-commercial",
  CONNECTED: "glow-operational",
  MANAGED: "glow-foundation",
  FRAGMENTED: "glow-fragmentation",
};

const CategoryPyramid = () => {
  const [activeLayerId, setActiveLayerId] = useState("FRAGMENTED");
  const [highlightedModule, setHighlightedModule] = useState<string | null>(null);

  const activeLayer = layersData.find((l) => l.id === activeLayerId) || layersData[4];

  const handleModuleClick = (module: string) => {
    setActiveLayerId("CONNECTED");
    setHighlightedModule(module);
    // Clear highlight after a delay
    setTimeout(() => setHighlightedModule(null), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">
          Comply365
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
          Operational Reliability &<br />
          <span className="text-gradient-primary">Readiness Platform</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          From fragmented point solutions to a connected platform that delivers measurable outcomes
        </p>
      </header>

      {/* Main content - Side by side layout */}
      <main className="container max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-6 lg:gap-8 items-start">
          {/* LEFT: Pyramid Visual - full size */}
          <div className="w-full">
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
              onLayerClick={(level) => {
                const layer = layersData.find((l) => l.level === level);
                if (layer) {
                  setActiveLayerId(layer.id);
                  setHighlightedModule(null);
                }
              }}
              onModuleClick={handleModuleClick}
            />
          </div>

          {/* RIGHT: Details Panel - scrollable content */}
          <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-2 scrollbar-thin">
            <DetailsPanel layer={activeLayer} highlightedModule={highlightedModule} />
          </div>
        </div>

        {/* Platform Callout - full width below */}
        <div className="mt-12 max-w-3xl mx-auto">
          <PlatformCallout />
        </div>
      </main>

      {/* Footer attribution */}
      <footer className="py-6 text-center border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          © 2026 Comply365 · Operational Reliability & Readiness Platform
        </p>
      </footer>
    </div>
  );
};

export default CategoryPyramid;
