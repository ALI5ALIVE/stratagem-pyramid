import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator } from "lucide-react";

const PlatformCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to transform operational performance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            See how the Operational Performance Platform can help you close the loop 
            between safety, content, and training — with measurable outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2">
              See the Platform
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Calculator className="w-4 h-4" />
              Calculate Your Impact
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Or talk to an expert about your specific operational challenges.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlatformCTA;
