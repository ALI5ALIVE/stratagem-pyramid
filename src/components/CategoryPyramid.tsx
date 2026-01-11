import { useState } from "react";
import PyramidLayer from "./PyramidLayer";
import DetailsPanel, { LayerData } from "./DetailsPanel";
import InfinityLoop from "./InfinityLoop";
import PlatformCallout from "./PlatformCallout";

const layersData: LayerData[] = [
  {
    id: "TRANSFORMATIONAL",
    level: 1,
    headline: "AI Accelerator / Agentic Operations",
    sublabel: "AI-powered decision acceleration",
    bullets: [
      "Earlier detection and smarter prioritisation",
      "Faster controlled change and targeted training activation",
      "New ways of working through exception-led oversight",
      "Human governance and auditability built in",
    ],
    whyItMatters:
      "AI compresses decision + execution time while keeping humans in control",
    colorClass: "bg-gradient-to-b from-pyramid-transformational to-pyramid-transformational/80",
    accentColor: "hsl(45 93% 58%)",
  },
  {
    id: "COMMERCIAL",
    level: 2,
    headline: "Measurable Reliability & Readiness Improvement",
    sublabel: "Outcomes that matter",
    bullets: [
      "OTP ↑ | delay minutes ↓ | cancellations ↓",
      "Readiness and time-to-competency ↑",
      "Audit proof readiness ↑",
    ],
    whyItMatters:
      "Converts compliance into measurable operational performance and customer experience impact",
    colorClass: "bg-gradient-to-b from-pyramid-commercial to-pyramid-commercial/80",
    accentColor: "hsl(280 65% 55%)",
  },
  {
    id: "OPERATIONAL",
    level: 3,
    headline: "Closed-Loop Operational Improvement",
    sublabel: "Signal to action",
    bullets: [
      "Signals trigger coordinated action",
      "Event → corrective action → procedure update → training → evidence",
      "Faster time-to-change and reduced recurrence",
    ],
    whyItMatters:
      "Turns operational signals into controlled execution, not just reporting",
    colorClass: "bg-gradient-to-b from-pyramid-operational to-pyramid-operational/80",
    accentColor: "hsl(173 80% 40%)",
  },
  {
    id: "FOUNDATION",
    level: 4,
    headline: "One Connected System of Record",
    sublabel: "Unified operational truth",
    bullets: [
      "Unify safety, procedures/content, and training into one connected platform",
      "Shared governance, traceability, and accountability by design",
      "Reduced fragmentation and tool sprawl",
      "Continuous data flow across modules (Safety ↔ Content ↔ Training) as an always-on loop",
    ],
    whyItMatters:
      "Eliminates handoffs and creates one version of operational truth",
    colorClass: "bg-gradient-to-b from-pyramid-foundation to-pyramid-foundation/80",
    accentColor: "hsl(199 89% 48%)",
  },
];

const glowClasses: Record<string, string> = {
  TRANSFORMATIONAL: "glow-transformational",
  COMMERCIAL: "glow-commercial",
  OPERATIONAL: "glow-operational",
  FOUNDATION: "glow-foundation",
};

const CategoryPyramid = () => {
  const [activeLayerId, setActiveLayerId] = useState("FOUNDATION");
  const [highlightedModule, setHighlightedModule] = useState<string | null>(null);

  const activeLayer = layersData.find((l) => l.id === activeLayerId) || layersData[3];

  const handleModuleClick = (module: string) => {
    setActiveLayerId("FOUNDATION");
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

      {/* Main content */}
      <main className="container max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Pyramid */}
          <div className="order-2 lg:order-1">
            <div className="relative max-w-xl mx-auto">
              {/* Ambient glow behind pyramid */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at center, hsl(199 89% 48% / 0.4) 0%, transparent 70%)",
                }}
              />

              {/* Pyramid layers - reversed for visual stacking (top first) */}
              <div className="flex flex-col gap-1">
                {layersData.map((layer) => (
                  <PyramidLayer
                    key={layer.id}
                    level={layer.level}
                    label={layer.id}
                    sublabel={layer.sublabel}
                    isActive={activeLayerId === layer.id}
                    onClick={() => {
                      setActiveLayerId(layer.id);
                      setHighlightedModule(null);
                    }}
                    colorClass={layer.colorClass}
                    glowClass={glowClasses[layer.id]}
                  >
                    {layer.id === "FOUNDATION" && (
                      <InfinityLoop onModuleClick={handleModuleClick} />
                    )}
                  </PyramidLayer>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-pyramid-foundation" />
                  Foundation
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-pyramid-operational" />
                  Operational
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-pyramid-commercial" />
                  Commercial
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-pyramid-transformational" />
                  Transformational
                </span>
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-8">
            <DetailsPanel layer={activeLayer} highlightedModule={highlightedModule} />
            
            {/* Platform Callout */}
            <div className="mt-6">
              <PlatformCallout />
            </div>
          </div>
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
