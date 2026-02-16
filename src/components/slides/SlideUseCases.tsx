import { useState } from "react";
import SlideContainer from "./SlideContainer";
import { 
  Plane, 
  Wind, 
  AlertTriangle, 
  ChevronRight, 
  TrendingDown, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  Zap,
  GitBranch
} from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface UseCase {
  id: string;
  title: string;
  icon: React.ElementType;
  iconColor: string;
  signal: {
    label: string;
    description: string;
    source: string;
  };
  action: {
    label: string;
    description: string;
    trigger: string;
  };
  orchestrate: {
    label: string;
    description: string;
    deliverable: string;
  };
  outcome: {
    label: string;
    description: string;
    metric?: string;
  };
}

const useCases: UseCase[] = [
  {
    id: "pilot-training",
    title: "Personalized Pilot Training",
    icon: Plane,
    iconColor: "hsl(199 89% 48%)",
    signal: {
      label: "Hard Landing Trend",
      description: "FOQA data shows elevated hard landing rates for specific pilots at particular airports",
      source: "Flight Operations Quality Assurance",
    },
    action: {
      label: "AI Pattern Detection",
      description: "Platform identifies pilot-airport correlation, cross-references with training records and weather patterns",
      trigger: "Automated retraining trigger generated",
    },
    orchestrate: {
      label: "Training Deployment",
      description: "Personalized competency module created, assigned to affected pilots with completion deadline",
      deliverable: "47 pilots enrolled in targeted program",
    },
    outcome: {
      label: "Targeted Retraining",
      description: "Affected pilots receive personalized competency improvement — not generic refresher courses",
      metric: "78% reduction in repeat events",
    },
  },
  {
    id: "smoke-fumes",
    title: "Smoke & Fumes Detection",
    icon: Wind,
    iconColor: "hsl(173 80% 40%)",
    signal: {
      label: "Report Cluster",
      description: "Elevated smoke & fumes reports cluster around specific hub during de-icing operations",
      source: "Safety Reports + ASAP",
    },
    action: {
      label: "Root Cause Correlation",
      description: "AI correlates reports with operational context: location, time, weather conditions, aircraft type",
      trigger: "Procedure review triggered automatically",
    },
    orchestrate: {
      label: "Procedure Update",
      description: "De-icing SOP updated with new ventilation protocols and ground crew positioning requirements",
      deliverable: "SOP v2.3 published → 120 ground crew notified",
    },
    outcome: {
      label: "Procedural Change",
      description: "De-icing procedure modified at affected hub. Training deployed to ground crews within 48 hours",
      metric: "92% reduction in reports",
    },
  },
  {
    id: "hydraulic-switch",
    title: "Hydraulic Switch Error",
    icon: AlertTriangle,
    iconColor: "hsl(45 93% 58%)",
    signal: {
      label: "Procedural Confusion",
      description: "Safety reports show recurring confusion on hydraulic switch sequence during preflight",
      source: "Crew Reports + Incident Data",
    },
    action: {
      label: "Pattern Recognition",
      description: "Platform detects procedure-specific trend, flags potential design issue in current SOP",
      trigger: "Content team alerted + procedure review initiated",
    },
    orchestrate: {
      label: "Content Revision",
      description: "Hydraulic switch procedure rewritten with clearer step sequence, visual aids, and confirmation checkpoints",
      deliverable: "Checklist v4.1 deployed to all 737 crew",
    },
    outcome: {
      label: "Proactive Prevention",
      description: "Procedure rewritten for clarity. All affected crew retrained before any incident occurs",
      metric: "100% incident prevention",
    },
  },
];

const SlideUseCases = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  // Determine which use case to highlight based on narration progress
  const getActiveIndex = () => {
    if (progress < 8) return -1;   // Introduction
    if (progress < 35) return 0;   // Pilot Training
    if (progress < 62) return 1;   // Smoke & Fumes
    if (progress < 88) return 2;   // Hydraulic Switch
    return -1;                     // Closing - all cards visible
  };

  const activeIndex = getActiveIndex();
  const isNarrationControlled = isPlaying || progress > 0;

  return (
    <SlideContainer
      id="slide-use-cases"
      title="Use Cases in Action"
      subtitle="Real-world examples of the DTOP operating model delivering outcomes"
      slideNumber={5}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="h-full flex flex-col gap-3">
        {/* DTOP Legend */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Detect</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
            <TrendingDown className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">Trigger</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <FileText className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-xs font-medium text-cyan-500">Orchestrate</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-medium text-emerald-500">Prove</span>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0 overflow-visible">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            const isExpanded = expandedCase === useCase.id;
            const isActive = isNarrationControlled ? index === activeIndex : true;
            const isHighlighted = isNarrationControlled && index === activeIndex;

            return (
              <div
                key={useCase.id}
                className={cn(
                  "bg-card/50 backdrop-blur-sm border rounded-xl p-3 cursor-pointer transition-all duration-500 overflow-visible",
                  isHighlighted 
                    ? "border-primary/50 shadow-lg shadow-primary/20 scale-[1.02]" 
                    : isExpanded 
                      ? "border-primary/30" 
                      : "border-border/50 hover:border-primary/30",
                  isActive ? "opacity-100" : "opacity-40"
                )}
                onClick={() => setExpandedCase(isExpanded ? null : useCase.id)}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${useCase.iconColor}20` }}
                  >
                    <Icon 
                      className="w-5 h-5" 
                      style={{ color: useCase.iconColor }} 
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {useCase.title}
                  </h3>
                </div>

                {/* Signal → Action → Outcome Flow */}
                <div className="space-y-2">
                  {/* Signal (Detect) */}
                  <div className="relative pl-4 border-l-2 border-primary/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">
                      Signal Detected
                    </div>
                    <div className="text-xs font-medium text-foreground mb-0.5">
                      {useCase.signal.label}
                    </div>
                    {(isExpanded || isHighlighted) && (
                      <div className="text-[11px] text-muted-foreground animate-fade-in">
                        {useCase.signal.description}
                        <div className="text-[10px] text-primary/70 mt-1">
                          Source: {useCase.signal.source}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action (Trigger) */}
                  <div className="relative pl-4 border-l-2 border-accent/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-accent" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-1">
                      Action Triggered
                    </div>
                    <div className="text-xs font-medium text-foreground mb-0.5">
                      {useCase.action.label}
                    </div>
                    {(isExpanded || isHighlighted) && (
                      <div className="text-[11px] text-muted-foreground animate-fade-in">
                        {useCase.action.description}
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingDown className="w-3 h-3 text-accent" />
                          <span className="text-[10px] text-accent">{useCase.action.trigger}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Orchestrate */}
                  <div className="relative pl-4 border-l-2 border-cyan-500/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-cyan-500" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500 mb-1">
                      Change Orchestrated
                    </div>
                    <div className="text-xs font-medium text-foreground mb-0.5">
                      {useCase.orchestrate.label}
                    </div>
                    {(isExpanded || isHighlighted) && (
                      <div className="text-[11px] text-muted-foreground animate-fade-in">
                        {useCase.orchestrate.description}
                        <div className="flex items-center gap-1 mt-1">
                          <GitBranch className="w-3 h-3 text-cyan-500" />
                          <span className="text-[10px] text-cyan-500">{useCase.orchestrate.deliverable}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Outcome (Prove) */}
                  <div className="relative pl-4 border-l-2 border-emerald-500/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-emerald-500" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500 mb-1">
                      Outcome Proven
                    </div>
                    <div className="text-xs font-medium text-foreground mb-0.5">
                      {useCase.outcome.label}
                    </div>
                    {(isExpanded || isHighlighted) && (
                      <div className="text-[11px] text-muted-foreground animate-fade-in">
                        {useCase.outcome.description}
                        {useCase.outcome.metric && (
                          <div className="mt-2 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 inline-block">
                            <span className="text-xs font-bold text-emerald-500">
                              {useCase.outcome.metric}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expand hint */}
                {!isExpanded && !isHighlighted && (
                  <div className="mt-3 text-[10px] text-muted-foreground text-center">
                    Click to expand
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-2 mt-auto shrink-0">
          <p className="text-xs text-center text-foreground">
            <span className="font-semibold text-primary">These aren't hypotheticals.</span>{" "}
            They're real patterns our customers experience — and the closed-loop response that a platform makes possible.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideUseCases;
