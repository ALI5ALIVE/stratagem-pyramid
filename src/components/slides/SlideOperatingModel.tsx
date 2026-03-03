import { Eye, Zap, Link2, Target, ArrowRight } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

const dtopMessaging = [
  {
    label: "Detect",
    icon: Eye,
    theme: "See what matters",
    message: "Performance begins with visibility. When safety events, training gaps, compliance risks, and content usage are tracked in isolation, organisations cannot see the patterns that drive improvement.",
    flyingHigh: "Flying High challenges the market to stop looking at functions separately and start seeing the connected signals that shape performance.",
  },
  {
    label: "Trigger",
    icon: Zap,
    theme: "Act at the right moment",
    message: "Knowing what matters is not enough. Organisations need to trigger the right response — automatically, consistently, and before small issues become systemic problems.",
    flyingHigh: "The programme shows buyers that the gap between seeing a signal and acting on it is where performance is lost — and where it can be recovered.",
  },
  {
    label: "Orchestrate",
    icon: Link2,
    theme: "Coordinate across teams",
    message: "Action in one team is not improvement across the organisation. Real performance requires safety, training, compliance, content, and IT to move together — not in parallel silos.",
    flyingHigh: "Flying High teaches the market that orchestration is the difference between activity and operational performance.",
  },
  {
    label: "Improve",
    icon: Target,
    theme: "Prove progress without raising risk",
    message: "Sustainable improvement is continuous, measurable, and does not create new risk. Leaders need line of sight from the work being done to the outcomes it delivers.",
    flyingHigh: "The programme equips buying groups with the evidence and confidence to prove that their model is working — and to justify scaling it.",
  },
];

const SlideOperatingModel = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="slide-operating-model"
      title="The Flying High Narrative"
      subtitle="How DTOP brings the content messaging to life — from awareness through to proof"
      slideNumber={2}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-3 h-full overflow-hidden">

        {/* Framing */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl px-5 py-4">
          <p className="text-sm text-foreground leading-relaxed font-medium">
            The Flying High programme is structured around <strong>DTOP</strong> — the operating model that 
            connects the market challenge to a clear path forward. Each stage of the model shapes the messaging, 
            the content, and the buyer conversation.
          </p>
        </div>

        {/* DTOP narrative cards */}
        <div className="grid grid-cols-4 gap-3 flex-1">
          {dtopMessaging.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="relative bg-card/60 border border-border/50 rounded-xl p-4 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{step.label}</p>
                    <p className="text-[10px] text-muted-foreground">{step.theme}</p>
                  </div>
                </div>

                {/* Market reality */}
                <p className="text-xs text-foreground/70 leading-relaxed mb-3 flex-1">
                  {step.message}
                </p>

                {/* Flying High angle */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-2.5 mt-auto">
                  <p className="text-[9px] text-primary uppercase tracking-wider font-semibold mb-1">Flying High Messaging</p>
                  <p className="text-[11px] text-foreground/80 leading-snug font-medium">{step.flyingHigh}</p>
                </div>

                {i < 3 && (
                  <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 z-10" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom strip — programme positioning */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl px-5 py-3">
          <p className="text-xs text-foreground/80 leading-relaxed">
            <span className="font-semibold text-foreground">The narrative arc:</span> Challenge the current model → 
            Teach what performance really means → Show how signals drive action → Help buyers prove progress. 
            This sequence shapes every asset, every quarter, and every conversation.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideOperatingModel;
