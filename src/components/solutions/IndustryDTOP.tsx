import { Card } from "@/components/ui/card";
import { Search, Zap, Settings, CheckCircle, ArrowRight } from "lucide-react";

interface DTOPStep {
  step: "Detect" | "Trigger" | "Orchestrate" | "Prove";
  title: string;
  description: string;
  example: string;
}

interface IndustryDTOPProps {
  industry: string;
  headline?: string;
  subhead?: string;
  steps: DTOPStep[];
}

const stepIcons = {
  Detect: Search,
  Trigger: Zap,
  Orchestrate: Settings,
  Prove: CheckCircle,
};

const stepColors = {
  Detect: "text-accent",
  Trigger: "text-primary",
  Orchestrate: "text-[hsl(var(--comply-teal))]",
  Prove: "text-[hsl(var(--comply-plum))]",
};

const stepBgColors = {
  Detect: "bg-accent/10",
  Trigger: "bg-primary/10",
  Orchestrate: "bg-[hsl(var(--comply-teal))]/10",
  Prove: "bg-[hsl(var(--comply-plum))]/10",
};

const IndustryDTOP = ({
  industry,
  headline = "The Operating Model",
  subhead,
  steps,
}: IndustryDTOPProps) => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subhead || `A connected, intelligent, and predictive platform turning signals into orchestrated change and measurable outcomes.`}
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto relative">
          {steps.map((step, index) => {
            const Icon = stepIcons[step.step];
            const colorClass = stepColors[step.step];
            const bgClass = stepBgColors[step.step];
            
            return (
              <div key={step.step} className="relative">
                <Card className="p-6 h-full bg-card border-border/50 hover:border-primary/30 transition-colors">
                  <div className={`w-12 h-12 rounded-xl ${bgClass} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colorClass}`} />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-muted-foreground">0{index + 1}</span>
                    <h3 className={`text-lg font-semibold ${colorClass}`}>{step.step}</h3>
                  </div>
                  
                  <p className="text-sm font-medium text-foreground mb-2">{step.title}</p>
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Example</p>
                    <p className="text-sm text-foreground">{step.example}</p>
                  </div>
                </Card>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryDTOP;
