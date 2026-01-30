import { Card } from "@/components/ui/card";
import { Link2, RefreshCw, ClipboardCheck, Sparkles } from "lucide-react";

interface Capability {
  title: string;
  description: string;
}

interface IndustryCapabilitiesProps {
  industry: string;
  headline?: string;
  subhead?: string;
  capabilities?: {
    connected?: Capability;
    continuous?: Capability;
    proof?: Capability;
    ai?: Capability;
  };
}

const defaultCapabilities = {
  connected: {
    title: "Connected Foundation",
    description: "Unified data model connecting safety, content, and training into one governed system.",
  },
  continuous: {
    title: "Continuous Improvement",
    description: "Automated workflows that trigger coordinated change across the entire operation.",
  },
  proof: {
    title: "Proof at Scale",
    description: "Continuous compliance evidence and audit-ready documentation, always current.",
  },
  ai: {
    title: "AI Accelerator",
    description: "Intelligent automation that amplifies human expertise and accelerates decision-making.",
  },
};

const IndustryCapabilities = ({
  industry,
  headline = "Platform Capabilities",
  subhead,
  capabilities = {},
}: IndustryCapabilitiesProps) => {
  const mergedCapabilities = {
    ...defaultCapabilities,
    ...capabilities,
  };

  const capabilityData = [
    {
      ...mergedCapabilities.connected,
      icon: Link2,
      gradient: "from-primary/20 to-accent/20",
    },
    {
      ...mergedCapabilities.continuous,
      icon: RefreshCw,
      gradient: "from-accent/20 to-[hsl(var(--comply-teal))]/20",
    },
    {
      ...mergedCapabilities.proof,
      icon: ClipboardCheck,
      gradient: "from-[hsl(var(--comply-teal))]/20 to-[hsl(var(--comply-plum))]/20",
    },
    {
      ...mergedCapabilities.ai,
      icon: Sparkles,
      gradient: "from-[hsl(var(--comply-plum))]/20 to-primary/20",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subhead || `Four interconnected capabilities that transform ${industry.toLowerCase()} operations.`}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {capabilityData.map((capability, index) => {
            const Icon = capability.icon;
            
            return (
              <Card key={index} className="p-6 bg-card border-border/50 hover:border-primary/30 transition-colors group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">{capability.title}</h3>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryCapabilities;
