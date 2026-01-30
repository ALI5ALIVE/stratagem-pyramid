import { ArrowRight, Clock, Lightbulb, Shield, Users } from "lucide-react";

const beforeItems = [
  { label: "Reactive", desc: "Risk handling" },
  { label: "Cost Center", desc: "Compliance burden" },
  { label: "Data Locked", desc: "Siloed systems" },
  { label: "Firefighting", desc: "Manual coordination" },
];

const afterItems = [
  { label: "Proactive", desc: "Detection & prevention" },
  { label: "Value Driver", desc: "Competitive advantage" },
  { label: "Data Unlocked", desc: "Connected insights" },
  { label: "Strategic", desc: "Improvement focus" },
];

const possibilities = [
  { 
    icon: Lightbulb, 
    title: "Earlier Detection", 
    desc: "AI detects weak signals before disruptions",
    metric: "∞",
    metricLabel: "earlier"
  },
  { 
    icon: Clock, 
    title: "Faster Cycles", 
    desc: "60% reduction in time-to-change",
    metric: "60%",
    metricLabel: "faster"
  },
  { 
    icon: Shield, 
    title: "Proof by Default", 
    desc: "Audit evidence generated automatically",
    metric: "100%",
    metricLabel: "coverage"
  },
  { 
    icon: Users, 
    title: "Exception-led", 
    desc: "Humans govern, AI handles routine",
    metric: "10x",
    metricLabel: "leverage"
  },
];

const PlatformTransformation = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Transformation
          </h2>
          <p className="text-lg text-primary font-medium">
            From cost center to competitive advantage
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Before/After + Time Allocation */}
          <div className="space-y-6">
            {/* Before/After Comparison */}
            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div className="relative">
                <div className="absolute top-0 -translate-y-1/2 left-3 px-2 py-1 bg-destructive/20 border border-destructive/30 rounded text-xs font-semibold text-destructive uppercase tracking-wider z-10">
                  Point Tools
                </div>
                <div className="bg-card border border-destructive/20 rounded-xl p-4 pt-6 space-y-3">
                  {beforeItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-destructive">{i + 1}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="relative">
                <div className="absolute top-0 -translate-y-1/2 left-3 px-2 py-1 bg-primary/20 border border-primary/30 rounded text-xs font-semibold text-primary uppercase tracking-wider z-10">
                  Platform
                </div>
                <div className="bg-card border border-primary/20 rounded-xl p-4 pt-6 space-y-3">
                  {afterItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{i + 1}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Allocation Shift */}
            <div className="bg-card border border-border/50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Time Allocation Shift
                </span>
              </div>
              
              <div className="space-y-4">
                {/* Before Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Before</span>
                  </div>
                  <div className="h-8 rounded-lg overflow-hidden flex">
                    <div className="h-full flex items-center justify-center bg-destructive" style={{ width: '60%' }}>
                      <span className="text-xs font-semibold text-white">Coordination 60%</span>
                    </div>
                    <div className="h-full flex items-center justify-center bg-accent" style={{ width: '30%' }}>
                      <span className="text-xs font-semibold text-white">Admin 30%</span>
                    </div>
                    <div className="h-full flex items-center justify-center bg-primary" style={{ width: '10%' }}>
                      <span className="text-xs font-semibold text-white">10%</span>
                    </div>
                  </div>
                </div>

                {/* After Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">After</span>
                  </div>
                  <div className="h-8 rounded-lg overflow-hidden flex">
                    <div className="h-full flex items-center justify-center bg-destructive" style={{ width: '10%' }}>
                      <span className="text-xs font-semibold text-white">10%</span>
                    </div>
                    <div className="h-full flex items-center justify-center bg-accent" style={{ width: '20%' }}>
                      <span className="text-xs font-semibold text-white">20%</span>
                    </div>
                    <div className="h-full flex items-center justify-center bg-primary" style={{ width: '70%' }}>
                      <span className="text-xs font-semibold text-white">Improvement 70%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-destructive" />
                  <span className="text-muted-foreground">Coordination</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-accent" />
                  <span className="text-muted-foreground">Administration</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span className="text-muted-foreground">Improvement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: New Possibilities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              New Possibilities Unlocked
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {possibilities.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={i}
                    className="bg-card border border-border/50 hover:border-primary/30 rounded-xl p-4 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-primary">{item.metric}</span>
                      <span className="text-xs text-muted-foreground">{item.metricLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="text-2xl text-primary/30">"</div>
                <div>
                  <p className="text-foreground italic leading-relaxed">
                    Point solutions manage silos.<br />
                    <span className="text-primary font-semibold not-italic">Comply365 closes the loop.</span>
                  </p>
                  <div className="mt-2 text-sm text-muted-foreground">
                    From compliance burden → Operational performance as competitive advantage
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformTransformation;
