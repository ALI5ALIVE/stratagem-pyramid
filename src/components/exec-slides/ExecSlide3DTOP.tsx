import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Search, Zap, GitBranch, BadgeCheck, ArrowRight } from "lucide-react";

interface ExecSlide3DTOPProps extends SlideNarrationProps {
  slideNumber?: number;
}

const steps = [
  {
    icon: Search,
    label: "Detect",
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    description: "FOQA data flags hard landing trend on 737 fleet",
    example: "3× exceedances in 14 days",
  },
  {
    icon: Zap,
    label: "Trigger",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    description: "Platform triggers procedure review and training assignment",
    example: "Auto-linked to approach SOP",
  },
  {
    icon: GitBranch,
    label: "Orchestrate",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    description: "Targeted sim training for affected crews with updated procedures",
    example: "12 crews assigned in 24hrs",
  },
  {
    icon: BadgeCheck,
    label: "Prove",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    description: "Reduced recurrence with complete audit trail",
    example: "67% reduction in 60 days",
  },
];

const ExecSlide3DTOP = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: ExecSlide3DTOPProps) => {
  return (
    <SalesSlideContainer
      id="exec-slide-3"
      title="The New Operating Model"
      subtitle="One use case. Four connected steps. Closed-loop performance improvement."
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col justify-center">
        {/* Use case label */}
        <div className="mb-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            Use Case: Hard Landing → Retraining → Reduced Recurrence
          </span>
        </div>

        {/* DTOP pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div key={step.label} className="relative">
              <div className={`rounded-xl border p-5 ${step.color} space-y-3 h-full`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold">{step.label}</span>
                </div>
                <p className="text-sm text-foreground/80">{step.description}</p>
                <p className="text-xs text-muted-foreground italic">{step.example}</p>
              </div>
              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-muted-foreground/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Every step generates an auditable record. The result isn't just improvement —
            it's <span className="text-primary font-semibold">proof of improvement</span>.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default ExecSlide3DTOP;
