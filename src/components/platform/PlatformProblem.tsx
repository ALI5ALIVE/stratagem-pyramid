import { AlertTriangle } from "lucide-react";
import FragmentationIllustration from "@/components/FragmentationIllustration";

const gaps = [
  "Safety events are captured but not connected to content or training",
  "Content changes happen but training doesn't automatically follow",
  "Training is assigned without knowing why or what triggered it",
  "Audit evidence is scattered across systems with no unified trail",
  "Leadership lacks real-time visibility into operational readiness",
];

const PlatformProblem = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Visual */}
          <div className="order-2 lg:order-1">
            <div className="bg-card border border-destructive/20 rounded-xl p-8">
              <FragmentationIllustration />
              
              {/* Cost callout */}
              <div className="mt-6 flex items-center justify-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <span className="text-2xl font-bold text-destructive">$2.3M</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    average annual cost of fragmentation
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Copy */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Fragmentation Problem
              </h2>
              <p className="text-lg text-muted-foreground">
                Most organizations manage safety, content, and training in separate systems. 
                This creates five operational gaps that point tools can't close.
              </p>
            </div>

            <div className="space-y-3">
              {gaps.map((gap, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-card/50 border border-border/50 rounded-lg"
                >
                  <div className="w-6 h-6 rounded-full bg-destructive/20 border border-destructive/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-destructive">{index + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{gap}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-sm text-foreground font-medium">
                The result? Delayed responses, repeated findings, and compliance as a cost center instead of a competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformProblem;
