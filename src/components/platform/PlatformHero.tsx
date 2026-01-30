import { Plane, Train, Shield } from "lucide-react";
import PlatformEcosystemDiagram from "@/components/PlatformEcosystemDiagram";

const trustSignals = [
  { icon: Plane, label: "50+ Airlines" },
  { icon: Train, label: "Major Rail Operators" },
  { icon: Shield, label: "Defense & Government" },
];

const PlatformHero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(217_100%_50%/0.08)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                The Operational Performance Platform
              </h1>
              <p className="text-xl md:text-2xl text-primary font-medium mb-6">
                for Safety, Content, and Training
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              A connected, intelligent, and predictive platform that turns signals into orchestrated change and measurable outcomes.
            </p>

            <div className="bg-card/50 border border-border/50 rounded-xl p-5">
              <p className="text-sm text-foreground mb-2 font-medium">
                Unlike point solutions that manage silos...
              </p>
              <p className="text-sm text-muted-foreground">
                Comply365 connects safety events, content updates, and training actions into a single closed-loop system — with full governance and audit trails at every step.
              </p>
            </div>

            {/* Trust Bar */}
            <div className="pt-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Trusted Across Industries
              </p>
              <div className="flex flex-wrap gap-4">
                {trustSignals.map((signal, index) => {
                  const Icon = signal.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-lg"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{signal.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg">
              <PlatformEcosystemDiagram className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformHero;
