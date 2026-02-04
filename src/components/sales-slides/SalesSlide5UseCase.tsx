import { useState } from "react";
import { Search, Zap, Workflow, Shield, TrendingDown, Plane, Wind, ChevronRight, CheckCircle2 } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface UseCase {
  id: string;
  title: string;
  icon: React.ElementType;
  iconColor: string;
  detect: { label: string; detail: string };
  trigger: { label: string; detail: string };
  orchestrate: { label: string; detail: string };
  prove: { label: string; metric: string };
}

const useCases: UseCase[] = [
  {
    id: "hard-landing",
    title: "Hard Landing Detection",
    icon: Plane,
    iconColor: "hsl(199 89% 48%)",
    detect: { label: "FOQA flags trend", detail: "Hard landing pattern across 47 pilots" },
    trigger: { label: "Platform identifies crew", detail: "Cross-references with training records" },
    orchestrate: { label: "Targeted training deployed", detail: "Simulator sessions scheduled within 48hr" },
    prove: { label: "78% reduction", metric: "in repeat events within 90 days" },
  },
  {
    id: "smoke-fumes",
    title: "Smoke & Fumes Detection",
    icon: Wind,
    iconColor: "hsl(173 80% 40%)",
    detect: { label: "Report cluster identified", detail: "Elevated reports at specific hub" },
    trigger: { label: "Root cause correlation", detail: "De-icing operations linked" },
    orchestrate: { label: "Procedure updated", detail: "New ventilation protocols deployed" },
    prove: { label: "92% reduction", metric: "in reports within 60 days" },
  },
];

interface SalesSlide5UseCaseProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide5UseCase = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide5UseCaseProps) => {
  const [expandedCase, setExpandedCase] = useState<string>("hard-landing");

  return (
    <SalesSlideContainer
      id="sales-slide-5"
      title="From Signal to Outcome"
      subtitle="Real patterns, real results"
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-4">
        {/* DTOP Legend */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-400/10 border border-blue-400/30">
            <Search className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-medium text-blue-400">Detect</span>
          </div>
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
            <Zap className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] font-medium text-amber-400">Trigger</span>
          </div>
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 border border-primary/30">
            <Workflow className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-medium text-primary">Orchestrate</span>
          </div>
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span className="text-[10px] font-medium text-emerald-500">Prove</span>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto w-full">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            const isExpanded = expandedCase === useCase.id;

            return (
              <div
                key={useCase.id}
                className={cn(
                  "bg-card/50 border rounded-xl p-4 cursor-pointer transition-all duration-300",
                  isExpanded ? "border-primary/50 shadow-lg shadow-primary/10" : "border-border/50 hover:border-primary/30"
                )}
                onClick={() => setExpandedCase(useCase.id)}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${useCase.iconColor}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: useCase.iconColor }} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{useCase.title}</h3>
                </div>

                {/* DTOP Flow */}
                <div className="space-y-2.5">
                  {/* Detect */}
                  <div className="relative pl-4 border-l-2 border-blue-400/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-400" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 mb-0.5">Detect</div>
                    <div className="text-xs font-medium text-foreground">{useCase.detect.label}</div>
                    {isExpanded && (
                      <div className="text-[10px] text-muted-foreground animate-fade-in">{useCase.detect.detail}</div>
                    )}
                  </div>

                  {/* Trigger */}
                  <div className="relative pl-4 border-l-2 border-amber-400/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-amber-400" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-0.5">Trigger</div>
                    <div className="text-xs font-medium text-foreground">{useCase.trigger.label}</div>
                    {isExpanded && (
                      <div className="text-[10px] text-muted-foreground animate-fade-in">{useCase.trigger.detail}</div>
                    )}
                  </div>

                  {/* Orchestrate */}
                  <div className="relative pl-4 border-l-2 border-primary/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-0.5">Orchestrate</div>
                    <div className="text-xs font-medium text-foreground">{useCase.orchestrate.label}</div>
                    {isExpanded && (
                      <div className="text-[10px] text-muted-foreground animate-fade-in">{useCase.orchestrate.detail}</div>
                    )}
                  </div>

                  {/* Prove */}
                  <div className="relative pl-4 border-l-2 border-emerald-500/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-emerald-500" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500 mb-0.5">Prove</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-emerald-500">{useCase.prove.label}</span>
                      <span className="text-[10px] text-muted-foreground">{useCase.prove.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div className="bg-gradient-to-r from-primary/5 to-emerald-500/5 border border-primary/20 rounded-xl p-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">This is what closing the loop looks like.</span>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            These aren't hypotheticals — they're real patterns our customers experience, and the closed-loop response that a platform makes possible.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide5UseCase;
