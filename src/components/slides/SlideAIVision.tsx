import { Sparkles, Zap, Brain, CheckCircle2, Lightbulb } from "lucide-react";
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
      "Pattern detection from FOQA/ASAP/crew reports",
      "Recommended actions with governance awareness",
      "Assisted drafting and execution (already deployed)",
      "Audit trail generation by default"
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
    if (progress < 18) return -1;
    if (progress < 40) return 0;
    if (progress < 62) return 1;
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-6xl mx-auto">
        
        {/* Left Column: AI Evolution Journey */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">AI Evolution Journey</h3>
          </div>

          {/* AI Stages Timeline */}
          <div className="relative space-y-2">
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
                    "bg-card/50 backdrop-blur-sm border rounded-lg p-2.5 transition-all duration-300",
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

        {/* Right Column: AI Story & Key Takeaways */}
        <div className="space-y-3">
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

          {/* What We're Already Doing */}
          <div className="bg-card/50 backdrop-blur-sm border border-emerald-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-semibold text-foreground">Already Deployed Today</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                Pattern detection from Flight Ops Quality Assurance & Aviation Safety Action Program
              </li>
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                Assisted drafting of procedures and training triggers
              </li>
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                Governance-aware automation with audit trails
              </li>
            </ul>
          </div>

          {/* Connection to Prior Slides */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground font-medium text-center">
              This is how we take customers up the Performance Ladder
            </p>
            <p className="text-xs text-muted-foreground text-center mt-2">
              The Operational Intelligence Layer powers Stage 3 → 4 → 5 progression. AI compresses decision and execution time while keeping humans in control.
            </p>
          </div>

          {/* Key Message */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
            <p className="text-sm text-foreground font-medium text-center">
              More than a platform company — an <span className="text-primary">AI company</span>
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              The Operational Intelligence Layer is our AI story — positioning Comply365 as a leader in AI-powered operational performance.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideAIVision;
