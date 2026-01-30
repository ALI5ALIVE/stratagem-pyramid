import { Card } from "@/components/ui/card";
import { X, Check } from "lucide-react";

interface ChallengeItem {
  before: string;
  after: string;
}

interface IndustryChallengeProps {
  industry: string;
  headline?: string;
  subhead?: string;
  challenges: ChallengeItem[];
}

const IndustryChallenge = ({
  industry,
  headline = "The Challenge",
  subhead,
  challenges,
}: IndustryChallengeProps) => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subhead || `${industry} operations rely on disconnected systems that create risk, inefficiency, and audit scrambles.`}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Point Solutions</h3>
            </div>
            <div className="space-y-4">
              {challenges.map((item, index) => (
                <Card key={index} className="p-4 bg-card/50 border-destructive/20">
                  <p className="text-muted-foreground">{item.before}</p>
                </Card>
              ))}
            </div>
          </div>
          
          {/* After Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Connected Platform</h3>
            </div>
            <div className="space-y-4">
              {challenges.map((item, index) => (
                <Card key={index} className="p-4 bg-card/50 border-primary/20">
                  <p className="text-foreground">{item.after}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryChallenge;
