import { Sparkles, Zap, Brain, CheckCircle2, Clock, Lightbulb, Star } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

const aiStages = [
  {
    id: "today",
    label: "Today",
    stage: "Stage 3-4",
    status: "Active",
    statusColor: "bg-emerald-500",
    title: "Embedded Intelligence",
    icon: Zap,
    capabilities: [
      "Pattern detection from operational signals",
      "Recommended actions with governance awareness",
      "Assisted drafting and execution",
      "Audit trail generation"
    ],
    gradient: "from-primary to-accent"
  },
  {
    id: "nearterm",
    label: "Near-term",
    stage: "Stage 4-5",
    status: "In Development",
    statusColor: "bg-amber-500",
    title: "Predictive Operations",
    icon: Lightbulb,
    capabilities: [
      "Weak signal detection before incidents",
      "Proactive intervention recommendations",
      "Risk forecasting models",
      "Compressed decision cycles"
    ],
    gradient: "from-accent to-cyan-400"
  },
  {
    id: "future",
    label: "Future",
    stage: "Stage 5+",
    status: "Vision",
    statusColor: "bg-purple-500",
    title: "Agentic Reliability",
    icon: Brain,
    capabilities: [
      "Autonomous orchestration of routine tasks",
      "Human-in-the-loop exception handling",
      "Continuous automated proof generation",
      "Self-optimizing operational workflows"
    ],
    gradient: "from-cyan-400 to-emerald-400"
  }
];

const domainOptions = [
  {
    domain: "comply365.ai",
    position: "AI-First Signal",
    pros: ["Clear AI company positioning", "Modern and memorable", "Brand continuity"],
    cons: ["Requires domain acquisition", "Migration effort"],
    recommended: true
  },
  {
    domain: "comply.ai",
    position: "Premium AI Brand",
    pros: ["Shorter, cleaner", "Premium positioning"],
    cons: ["Less brand continuity", "May be unavailable"],
    recommended: false
  },
  {
    domain: "c365.ai",
    position: "Tech-Forward",
    pros: ["Concise", "Modern tech aesthetic"],
    cons: ["May lose brand recognition", "Less intuitive"],
    recommended: false
  },
  {
    domain: "comply365.com",
    position: "Stability + AI Layer",
    pros: ["Established equity", "No migration", "Lower risk"],
    cons: ["Doesn't signal AI shift"],
    recommended: false
  }
];

const operatingModelSteps = [
  { label: "Detect", color: "bg-primary" },
  { label: "Trigger", color: "bg-accent" },
  { label: "Orchestrate", color: "bg-cyan-500" },
  { label: "Prove", color: "bg-emerald-500" }
];

interface SlideAIVisionProps extends SlideNarrationProps {}

const SlideAIVision = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideAIVisionProps) => {
  // Determine which stage to highlight based on narration progress
  const getActiveStageIndex = () => {
    if (progress < 15) return -1;
    if (progress < 35) return 0;
    if (progress < 55) return 1;
    if (progress < 75) return 2;
    return 2;
  };

  const showDomainSection = progress >= 75;
  const activeStageIndex = getActiveStageIndex();
  const isNarrationControlled = isPlaying || progress > 0;

  return (
    <SlideContainer
      id="slide-10"
      title="Becoming an AI Company"
      subtitle="The intelligence layer that's already built — and the roadmap to what's next"
      variant="dark"
      slideNumber={16}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
        
        {/* Left Column: AI Evolution Journey */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">AI Evolution Journey</h3>
          </div>

          {/* AI Stages Timeline */}
          <div className="relative space-y-3">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-border" />

            {aiStages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = isNarrationControlled ? index <= activeStageIndex : true;
              const isCurrentStage = isNarrationControlled && index === activeStageIndex;

              return (
                <div
                  key={stage.id}
                  className={cn(
                    "relative pl-10 transition-all duration-500",
                    isActive ? "opacity-100" : "opacity-40"
                  )}
                >
                  {/* Timeline dot */}
                  <div className={cn(
                    "absolute left-0 top-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    isCurrentStage 
                      ? `bg-gradient-to-br ${stage.gradient} shadow-lg shadow-primary/30 scale-110` 
                      : isActive 
                        ? "bg-card border-2 border-primary" 
                        : "bg-card border border-border"
                  )}>
                    <Icon className={cn(
                      "w-4 h-4",
                      isCurrentStage ? "text-white" : isActive ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>

                  {/* Stage card */}
                  <div className={cn(
                    "bg-card/50 backdrop-blur-sm border rounded-lg p-3 transition-all duration-300",
                    isCurrentStage 
                      ? "border-primary/50 bg-card/80 shadow-lg shadow-primary/10" 
                      : "border-border/50"
                  )}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">{stage.stage}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-medium text-white",
                          stage.statusColor
                        )}>
                          {stage.status}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{stage.label}</span>
                    </div>
                    
                    <h4 className={cn(
                      "font-semibold text-sm mb-2",
                      isCurrentStage 
                        ? "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" 
                        : "text-foreground"
                    )}>
                      {stage.title}
                    </h4>

                    <ul className="space-y-1">
                      {stage.capabilities.map((cap, capIndex) => (
                        <li key={capIndex} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 className={cn(
                            "w-3 h-3 mt-0.5 flex-shrink-0",
                            isActive ? "text-primary" : "text-muted-foreground/50"
                          )} />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Story & Brand Evolution */}
        <div className="space-y-4">
          {/* Operating Model Callback */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">The Operational Intelligence Layer IS the AI Story</h3>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-3">
              {operatingModelSteps.map((step, index) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium text-white",
                    step.color
                  )}>
                    {step.label}
                  </div>
                  {index < operatingModelSteps.length - 1 && (
                    <span className="text-muted-foreground">→</span>
                  )}
                </div>
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              AI is embedded at every stage — not bolted on. Intelligence that learns, detects, and assists.
            </p>
          </div>

          {/* Domain Rebranding Section */}
          <div className={cn(
            "transition-all duration-500",
            isNarrationControlled && !showDomainSection ? "opacity-40" : "opacity-100"
          )}>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Brand Evolution</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {domainOptions.map((option) => (
                <div
                  key={option.domain}
                  className={cn(
                    "bg-card/50 backdrop-blur-sm border rounded-lg p-3 transition-all duration-300 hover:border-primary/50",
                    option.recommended 
                      ? "border-primary/30 bg-primary/5" 
                      : "border-border/50"
                  )}
                >
                  {option.recommended && (
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/20 text-primary mb-2">
                      Recommended
                    </span>
                  )}
                  
                  <div className="font-mono text-sm font-semibold text-foreground mb-1">
                    {option.domain}
                  </div>
                  
                  <div className="text-[10px] text-muted-foreground mb-2">
                    {option.position}
                  </div>

                  <div className="space-y-1">
                    {option.pros.slice(0, 2).map((pro, index) => (
                      <div key={index} className="flex items-center gap-1 text-[10px] text-accent">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        {pro}
                      </div>
                    ))}
                    {option.cons.slice(0, 1).map((con, index) => (
                      <div key={index} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="w-2.5 h-2.5" />
                        {con}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Message */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground font-medium text-center">
              The domain is a choice. But the direction is clear.
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              The Operational Intelligence Layer is our AI story — and this journey positions Comply365 as a leader in AI-powered operational performance.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideAIVision;
