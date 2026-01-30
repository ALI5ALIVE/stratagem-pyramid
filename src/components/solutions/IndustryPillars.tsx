import { Card } from "@/components/ui/card";
import { Shield, FileText, GraduationCap } from "lucide-react";

interface Pillar {
  title: string;
  metric: string;
  description: string;
}

interface IndustryPillarsProps {
  industry: string;
  headline?: string;
  subhead?: string;
  pillars: {
    safety: Pillar;
    content: Pillar;
    training: Pillar;
  };
}

const IndustryPillars = ({
  industry,
  headline = "Three Performance Pillars",
  subhead,
  pillars,
}: IndustryPillarsProps) => {
  const pillarData = [
    {
      ...pillars.safety,
      icon: Shield,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      ...pillars.content,
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      ...pillars.training,
      icon: GraduationCap,
      color: "text-[hsl(var(--comply-teal))]",
      bgColor: "bg-[hsl(var(--comply-teal))]/10",
      borderColor: "border-[hsl(var(--comply-teal))]/20",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subhead || `Operational performance means something specific in ${industry.toLowerCase()}. Here's how we define and deliver it.`}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillarData.map((pillar, index) => {
            const Icon = pillar.icon;
            
            return (
              <Card key={index} className={`p-8 bg-card ${pillar.borderColor} hover:border-primary/30 transition-colors`}>
                <div className={`w-14 h-14 rounded-xl ${pillar.bgColor} flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${pillar.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">{pillar.title}</h3>
                
                <div className={`text-3xl font-bold ${pillar.color} mb-4`}>
                  {pillar.metric}
                </div>
                
                <p className="text-muted-foreground">{pillar.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryPillars;
