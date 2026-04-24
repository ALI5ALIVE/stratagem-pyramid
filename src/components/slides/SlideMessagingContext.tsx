import SlideContainer from "./SlideContainer";
import SlidePlayButton from "@/components/SlidePlayButton";
import type { SlideNarrationProps } from "@/types/slideProps";
import { Shield, FileText, GraduationCap, ArrowRight } from "lucide-react";

const domains = [
  {
    icon: Shield,
    title: "Safety Performance",
    meaning: "Fewer incidents, reduced recurrence, faster investigation closure",
    metrics: [
      "Investigation closure time",
      "Repeat findings rate",
      "Crew safety report submission rate",
    ],
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
  },
  {
    icon: FileText,
    title: "Content Performance",
    meaning: "Faster procedural change cycles, reduced drift, compliance alignment",
    metrics: [
      "Time-to-change",
      "Revision currency",
      "Controlled distribution",
    ],
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
  },
  {
    icon: GraduationCap,
    title: "Training Performance",
    meaning: "Higher readiness, targeted qualification, faster time-to-competency",
    metrics: [
      "Qualification currency",
      "Assessment pass rates",
      "Training activation speed",
    ],
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
];

const dtopFlow = [
  {
    step: "Detect",
    example: "Operational data exceedance detected",
    domain: "Safety",
    color: "bg-red-500",
  },
  {
    step: "Trigger",
    example: "Procedure update triggered",
    domain: "Content",
    color: "bg-sky-500",
  },
  {
    step: "Orchestrate",
    example: "Targeted training activated",
    domain: "Training",
    color: "bg-emerald-500",
  },
  {
    step: "Prove",
    example: "Audit evidence generated",
    domain: "All Three",
    color: "bg-primary",
  },
];

const SlideMessagingContext = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
  onPrevSlide,
}: SlideNarrationProps) => {
  return (
    <SlideContainer 
      id="slide-14" 
      variant="dark"
      title="Operational Performance — In Context"
      subtitle="How the category applies across Safety, Training, and Content"
      slideNumber={14}
    >
      {/* Play button */}
      {onPlay && (
        <SlidePlayButton
          isPlaying={isPlaying}
          isLoading={isLoading}
          progress={progress}
          hasCompleted={hasCompleted}
          onPlay={onPlay}
          onPause={onPause ?? (() => {})}
          onNextSlide={onNextSlide}
          onPrevSlide={onPrevSlide}
        />
      )}

      <div className="space-y-5">

        {/* Three-column domain breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.title}
                className={`${domain.bgColor} ${domain.borderColor} border rounded-lg p-4 space-y-3`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${domain.bgColor}`}>
                    <Icon className={`w-5 h-5 ${domain.color}`} />
                  </div>
                  <h3 className={`font-semibold text-sm ${domain.color}`}>
                    {domain.title}
                  </h3>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {domain.meaning}
                </p>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    Key Metrics
                  </p>
                  <ul className="space-y-1">
                    {domain.metrics.map((metric) => (
                      <li
                        key={metric}
                        className="text-xs text-muted-foreground flex items-center gap-1.5"
                      >
                        <span className={`w-1 h-1 rounded-full ${domain.color.replace('text-', 'bg-')}`} />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* DTOP Flow with domain-specific examples */}
        <div className="bg-card/50 border border-border/50 rounded-lg p-4 space-y-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium text-center">
            The Connected Flow Across Domains
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {dtopFlow.map((item, index) => (
              <div key={item.step} className="flex items-center gap-2">
                <div className="text-center space-y-1">
                  <div className={`${item.color} text-white text-xs font-bold px-3 py-1.5 rounded-lg`}>
                    {item.step}
                  </div>
                  <p className="text-[10px] text-muted-foreground max-w-[100px]">
                    {item.example}
                  </p>
                  <p className="text-[9px] text-muted-foreground/60">
                    ({item.domain})
                  </p>
                </div>
                {index < dtopFlow.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Callout Box */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 max-w-3xl mx-auto">
          <p className="text-sm text-foreground leading-relaxed text-center">
            <span className="font-semibold text-primary">"Operational Performance"</span> is not OTP or dispatch reliability.
            <br className="hidden sm:block" />
            It's the coordinated execution of Safety, Content, and Training —{" "}
            <span className="text-primary font-medium">the internal processes that protect and enable OTP.</span>
          </p>
        </div>

        {/* Footer clarification */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground/60 max-w-xl mx-auto">
            When applied to these three domains, "performance" takes on specific, measurable meaning — 
            not airline OPS metrics, but the operational execution that drives those outcomes.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideMessagingContext;
