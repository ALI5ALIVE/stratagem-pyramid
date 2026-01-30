import { CheckCircle2, ArrowRight } from "lucide-react";

const stages = [
  {
    number: 1,
    title: "Fragmented & Reactive",
    description: "Disconnected tools, manual coordination, reactive response",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    isBase: true,
  },
  {
    number: 2,
    title: "Managed Compliance",
    description: "Individual best-in-class products, controlled processes",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    note: "Comply365 products can take you here",
  },
  {
    number: 3,
    title: "Connected Governance",
    description: "Unified data, coordinated workflows, shared governance",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    isInflection: true,
    note: "Platform shift — requires full integration",
  },
  {
    number: 4,
    title: "Intelligent Operations",
    description: "AI-assisted execution, compressed decision cycles",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/30",
  },
  {
    number: 5,
    title: "Predictive Operations",
    description: "Proactive intervention, self-optimizing workflows",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
    isApex: true,
  },
];

const PlatformValueLadder = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Operational Performance Ladder
              </h2>
              <p className="text-lg text-muted-foreground">
                Five stages of maturity — from fragmented compliance to predictive operations. 
                The platform is what makes the leap possible.
              </p>
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium mb-2">
                    Individual products from Comply365 can take you to Stage 2.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    But to reach Stages 3-5 and unlock Connected Governance, Intelligent Operations, 
                    and Predictive capabilities — you need the full platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">The Journey</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-destructive">Reactive</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-amber-500">Managed</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-primary font-semibold">Connected</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-cyan-400">Intelligent</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-emerald-400">Predictive</span>
              </div>
            </div>
          </div>

          {/* Right: Visual - Ladder */}
          <div className="space-y-3">
            {[...stages].reverse().map((stage, index) => (
              <div 
                key={stage.number}
                className={`relative p-4 rounded-lg ${stage.bgColor} border ${stage.borderColor} transition-all duration-300 hover:scale-[1.02]`}
              >
                {stage.isInflection && (
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full ${stage.bgColor} border ${stage.borderColor} flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-sm font-bold ${stage.color}`}>{stage.number}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${stage.color}`}>{stage.title}</h4>
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                    {stage.note && (
                      <p className={`text-xs mt-1 ${stage.isInflection ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                        {stage.note}
                      </p>
                    )}
                  </div>
                  
                  {stage.isApex && (
                    <div className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs text-emerald-400 font-medium">
                      Apex
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformValueLadder;
