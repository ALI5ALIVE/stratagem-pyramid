import { Link2, Brain, Shield, CheckCircle2, X } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const differentiators = [
  {
    icon: Link2,
    title: "Connected Foundation",
    description: "One version of truth",
    proof: "65K+ data points unified across safety, content, and training",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
  },
  {
    icon: Brain,
    title: "Embedded Intelligence",
    description: "AI that's trusted, not bolted on",
    proof: "AI trained on 10+ years of aviation operational data",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    icon: Shield,
    title: "Proof by Default",
    description: "Audit-ready evidence, always",
    proof: "Every action logged, every change traced, compliance documented",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
  },
];

const competitiveContrast = [
  { type: "Point solutions", description: "Manage one domain", isUs: false },
  { type: "Bolt-on AI", description: "Dashboards, not action", isUs: false },
  { type: "Comply365", description: "Signals → Outcomes, by default", isUs: true },
];

interface SalesSlide8WhyUsProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide8WhyUs = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide8WhyUsProps) => {
  return (
    <SalesSlideContainer
      id="sales-slide-9"
      title="Why Comply365"
      subtitle="Point solutions manage silos. We close the loop."
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-5">
        {/* Competitive contrast */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-card/50 border border-border/50 rounded-xl p-3">
            <div className="grid grid-cols-3 gap-2">
              {competitiveContrast.map((item) => (
                <div
                  key={item.type}
                  className={`rounded-lg p-3 text-center ${
                    item.isUs
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-muted/30 border border-border/50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {item.isUs ? (
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    ) : (
                      <X className="w-3 h-3 text-muted-foreground" />
                    )}
                    <span className={`text-xs font-semibold ${item.isUs ? "text-primary" : "text-muted-foreground"}`}>
                      {item.type}
                    </span>
                  </div>
                  <p className={`text-[10px] ${item.isUs ? "text-foreground" : "text-muted-foreground"}`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Differentiators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto w-full">
          {differentiators.map((diff) => (
            <div
              key={diff.title}
              className={`${diff.bgColor} border ${diff.borderColor} rounded-xl p-5`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${diff.bgColor} ${diff.borderColor} border flex items-center justify-center`}>
                  <diff.icon className={`w-5 h-5 ${diff.color}`} />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${diff.color}`}>{diff.title}</h3>
                  <p className="text-xs text-muted-foreground">{diff.description}</p>
                </div>
              </div>
              <p className="text-xs text-foreground bg-background/50 rounded-lg p-2 border border-border/30">
                {diff.proof}
              </p>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="max-w-xl mx-auto w-full">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Trusted by <span className="text-primary font-semibold">50+ airlines</span>,
              including <span className="text-primary font-semibold">7 of the top 10</span> in North America
            </p>
          </div>
        </div>

        {/* Category promise */}
        <div className="text-center">
          <p className="text-lg font-medium text-foreground">
            Make operational performance
          </p>
          <p className="text-xl font-bold">
            <span className="text-primary">predictable</span>,{" "}
            <span className="text-blue-400">measurable</span>, and{" "}
            <span className="text-emerald-400">provable</span>.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide8WhyUs;
