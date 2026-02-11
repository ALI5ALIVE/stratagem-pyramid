import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";
import SlidePlayButton from "@/components/SlidePlayButton";
import type { SlideNarrationProps } from "@/types/slideProps";

interface SalesSlide0TitleProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide0Title = ({
  slideNumber,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide0TitleProps) => {
  return (
    <section
      id="sales-slide-0"
      className="h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-16 snap-start relative overflow-hidden bg-background"
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
        />
      )}

      {/* Decorative background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Logo - top right */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <img src={complyLogo} alt="Comply365" className="h-5 sm:h-6 w-auto opacity-80" />
      </div>

      {/* Slide number - bottom right */}
      {slideNumber !== undefined && (
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10">
          <span className="text-sm font-medium text-muted-foreground">
            {String(slideNumber).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-6">
        {/* Customer-centric headline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
            What if <span className="text-primary">operational performance</span><br />
            was <span className="text-primary">predictable</span>?
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            What if every signal was tracked, trained, and proven — automatically?
          </p>
        </div>

        {/* Visual transformation: Pain Metrics → Value Outcomes */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 py-6">
          {/* Today: Pain Metrics */}
          <div className="flex flex-col items-center">
            <div className="text-xs text-destructive font-semibold uppercase tracking-wide mb-3">Today</div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-2 min-w-[160px]">
                <XCircle className="w-4 h-4 text-destructive shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold text-destructive">3 weeks</div>
                  <div className="text-xs text-muted-foreground">to investigate</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-2 min-w-[160px]">
                <XCircle className="w-4 h-4 text-destructive shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold text-destructive">60%</div>
                  <div className="text-xs text-muted-foreground">coordination time</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-2 min-w-[160px]">
                <XCircle className="w-4 h-4 text-destructive shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold text-destructive">Months</div>
                  <div className="text-xs text-muted-foreground">audit prep</div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="w-8 h-8 text-primary" />
            <span className="text-xs text-muted-foreground">Transform</span>
          </div>

          {/* Tomorrow: Value Outcomes */}
          <div className="flex flex-col items-center">
            <div className="text-xs text-emerald-500 font-semibold uppercase tracking-wide mb-3">Tomorrow</div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2 min-w-[160px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold text-emerald-500">48 hours</div>
                  <div className="text-xs text-muted-foreground">to resolution</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2 min-w-[160px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold text-emerald-500">70%</div>
                  <div className="text-xs text-muted-foreground">improvement time</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2 min-w-[160px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold text-emerald-500">2 hours</div>
                  <div className="text-xs text-muted-foreground">audit-ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="pt-2">
          <p className="text-xl sm:text-2xl font-semibold text-foreground">
            Close the loop. <span className="text-primary">Predict the outcome</span>.
          </p>
        </div>

        {/* Trust bar */}
        <div className="pt-6 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            Trusted by <span className="text-primary font-semibold">50+ airlines</span> for{" "}
            <span className="text-primary font-semibold">1M+ frontline workers</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SalesSlide0Title;
