import { Database, Zap, Sparkles, ShieldCheck, TrendingUp, Trophy } from "lucide-react";
import PlatformEcosystemDiagram from "@/components/PlatformEcosystemDiagram";

const capabilities = [
  {
    icon: Database,
    title: "Data That Connects",
    tagline: "Shared models, taxonomies, and knowledge maps",
    bullets: [
      "One version of truth across safety, training & content",
      "Shared governance & full traceability",
      "Less fragmentation, more insight",
    ],
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Zap,
    title: "Automation That Adapts",
    tagline: "Threshold-driven, role-aware workflows",
    bullets: [
      "Event-triggered actions across modules",
      "Cross-functional orchestration",
      "Faster time-to-change",
    ],
    color: "from-cyan-400 to-teal-400",
  },
  {
    icon: Sparkles,
    title: "AI That Drives",
    tagline: "Embedded, transparent intelligence",
    bullets: [
      "Earlier detection of weak signals",
      "Recommended actions, not just alerts",
      "Exception-led human oversight",
    ],
    color: "from-teal-400 to-emerald-400",
  },
];

const outcomes = [
  {
    icon: ShieldCheck,
    label: "Revenue Protection",
    desc: "Fewer incidents, less disruption",
    metric: "$10-50M",
    metricLabel: "saved annually",
  },
  {
    icon: TrendingUp,
    label: "Operational Efficiency",
    desc: "Reduced exposure, faster recovery",
    metric: "70%",
    metricLabel: "faster change",
  },
  {
    icon: Trophy,
    label: "Competitive Advantage",
    desc: "Lower cost, improved performance",
    metric: "40%",
    metricLabel: "less effort",
  },
];

const PlatformCapabilities = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Platform That Powers It
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three foundational capabilities that deliver outcomes point solutions cannot achieve alone.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Visual */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <PlatformEcosystemDiagram className="w-full" />
            </div>
          </div>

          {/* Right: Capabilities */}
          <div className="space-y-4">
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <div 
                  key={index}
                  className="bg-card border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cap.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg mb-1">{cap.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{cap.tagline}</p>
                      <ul className="space-y-1.5">
                        {cap.bullets.map((bullet, bIndex) => (
                          <li key={bIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cap.color} mt-2 flex-shrink-0`} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outcomes Banner */}
        <div className="mt-16 bg-card border border-primary/20 rounded-xl p-8">
          <h3 className="text-center text-lg font-semibold text-foreground mb-6">
            Platform Outcomes
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">{outcome.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{outcome.desc}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-bold text-primary">{outcome.metric}</span>
                    <span className="text-sm text-muted-foreground">{outcome.metricLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformCapabilities;
