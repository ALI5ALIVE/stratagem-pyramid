import SlideContainer from "./SlideContainer";
import { 
  ArrowRight, 
  Target, 
  Brain, 
  BarChart3, 
  Play, 
  Calculator, 
  Compass,
  CheckCircle2,
  Zap
} from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

const keyTakeaways = [
  {
    icon: Target,
    title: "Point solutions manage silos",
    highlight: "Comply365 closes the loop",
    description: "Safety, Content, and Training connected into one governed platform",
  },
  {
    icon: Brain,
    title: "AI that's embedded, not bolted on",
    highlight: "Trusted and controlled",
    description: "Intelligence that detects, recommends, and assists — with humans in control",
  },
  {
    icon: BarChart3,
    title: "Measurable outcomes",
    highlight: "Reliability, speed, and proof",
    description: "From operational performance metrics to audit-ready evidence by default",
  },
];

const ctaActions = [
  {
    icon: Play,
    title: "See the Platform in Action",
    description: "Personalized demo tailored to your operational challenges",
    buttonText: "Request Demo",
    primary: true,
  },
  {
    icon: Calculator,
    title: "Calculate Your Impact",
    description: "ROI assessment based on your current operational metrics",
    buttonText: "ROI Assessment",
    primary: false,
  },
  {
    icon: Compass,
    title: "Start Your Journey",
    description: "Maturity assessment with peer benchmarking",
    buttonText: "Maturity Assessment",
    primary: false,
  },
];

const SlideConclusion = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  // Animate elements based on narration progress
  const showTakeaways = progress >= 10 || !isPlaying;
  const showCTAs = progress >= 60 || !isPlaying;
  const highlightedTakeaway = isPlaying 
    ? progress < 25 ? 0 : progress < 45 ? 1 : progress < 60 ? 2 : -1
    : -1;

  return (
    <SlideContainer
      id="slide-conclusion"
      title="Transform Operational Performance Together"
      subtitle="Join the journey from fragmented tools to connected, intelligent operations"
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="h-full flex flex-col gap-6">
        {/* Key Takeaways */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {keyTakeaways.map((item, index) => {
            const Icon = item.icon;
            const isHighlighted = highlightedTakeaway === index;
            
            return (
              <div
                key={item.title}
                className={cn(
                  "bg-card/50 backdrop-blur-sm border rounded-xl p-5 transition-all duration-500",
                  isHighlighted 
                    ? "border-primary/50 shadow-lg shadow-primary/20 scale-[1.02]" 
                    : "border-border/50",
                  showTakeaways ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                    isHighlighted ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">
                      {item.title}
                    </p>
                    <p className="text-sm font-semibold text-primary mb-2">
                      {item.highlight}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider with operating model reminder */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/30">
            <span className="text-[10px] font-medium text-primary">Detect</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-medium text-accent">Trigger</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-medium text-cyan-500">Orchestrate</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-medium text-emerald-500">Prove</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50" />
        </div>

        {/* CTA Section */}
        <div className={cn(
          "transition-all duration-700",
          showCTAs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <h3 className="text-center text-sm font-semibold text-foreground mb-4">
            Ready to close the loop?
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {ctaActions.map((cta, index) => {
              const Icon = cta.icon;
              
              return (
                <div
                  key={cta.title}
                  className={cn(
                    "group bg-card/50 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 hover:border-primary/50 cursor-pointer",
                    cta.primary 
                      ? "border-primary/30 bg-primary/5" 
                      : "border-border/50"
                  )}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors",
                      cta.primary 
                        ? "bg-primary/20 group-hover:bg-primary/30" 
                        : "bg-primary/10 group-hover:bg-primary/20"
                    )}>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {cta.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-4">
                      {cta.description}
                    </p>
                    <button className={cn(
                      "px-4 py-2 rounded-lg text-xs font-medium transition-all",
                      cta.primary 
                        ? "bg-primary text-white hover:bg-primary/90" 
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}>
                      {cta.buttonText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer quote */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4 mt-auto">
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-5 h-5 text-primary" />
            <p className="text-sm text-foreground">
              <span className="font-medium">The Operational Performance Platform:</span>{" "}
              <span className="text-muted-foreground">Connected. Intelligent. Predictive.</span>
            </p>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideConclusion;
