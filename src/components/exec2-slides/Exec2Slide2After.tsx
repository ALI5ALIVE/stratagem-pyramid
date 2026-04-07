import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { ArrowRight, Clock, CheckCircle2, Shield, TrendingUp } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Exec2Slide2AfterProps extends SlideNarrationProps {
  slideNumber?: number;
}

const dtopSteps = [
  { label: "Detect", desc: "Surface signals from safety, content & training data" },
  { label: "Trigger", desc: "Automatically initiate the right response" },
  { label: "Orchestrate", desc: "Coordinate change across modules" },
  { label: "Prove", desc: "Generate audit-ready evidence of action" },
];

const outcomes = [
  { icon: TrendingUp, label: "OTP Improvement", value: "+3.2%", color: "text-emerald-400" },
  { icon: CheckCircle2, label: "Fleet Readiness", value: "94%", color: "text-blue-400" },
  { icon: Clock, label: "Audit Prep Time", value: "Months → 2hr", color: "text-amber-400" },
  { icon: Shield, label: "Repeat Events", value: "−40%", color: "text-purple-400" },
];

const Exec2Slide2After = ({
  slideNumber,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
  onPrevSlide,
}: Exec2Slide2AfterProps) => {
  return (
    <SalesSlideContainer
      id="exec2-slide-2"
      title="The After: Operational Performance Platform"
      subtitle="A connected, intelligent, and predictive platform that turns signals into orchestrated change"
      slideNumber={slideNumber}
      variant="dark"
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
      onPrevSlide={onPrevSlide}
    >
      <div className="space-y-8">
        {/* Category Definition */}
        <div className="text-center">
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-xl px-8 py-4">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">Category We're Defining</p>
            <p className="text-2xl font-bold text-foreground">Operational Performance Platform</p>
            <p className="text-sm text-muted-foreground mt-1">for Safety, Content & Training</p>
          </div>
        </div>

        {/* DTOP Pipeline */}
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-4">
            Continuous Improvement Operating Model
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {dtopSteps.map((step, i) => (
              <div key={step.label} className="relative">
                <div className="bg-card/60 border border-border/50 rounded-lg p-4 text-center h-full">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center mx-auto mb-2">
                    {i + 1}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                </div>
                {i < 3 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Illustrative Outcomes */}
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-4">
            Illustrative Target Outcomes
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className="bg-card/40 border border-border/30 rounded-lg p-4 text-center"
              >
                <outcome.icon className={`w-6 h-6 mx-auto mb-2 ${outcome.color}`} />
                <p className={`text-xl font-bold ${outcome.color}`}>{outcome.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{outcome.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default Exec2Slide2After;
