import { CalendarCheck, Calculator, LineChart, ArrowRight, Search, Zap, Workflow, Shield, MapPin, Target, FileText } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";
import SlidePlayButton from "@/components/SlidePlayButton";
import type { SlideNarrationProps } from "@/types/slideProps";

const whatYouGet = [
  { icon: MapPin, label: "Maturity Assessment", description: "Where you are on the 5-stage journey" },
  { icon: Target, label: "Gap Analysis", description: "Your highest-impact opportunities" },
  { icon: FileText, label: "ROI Model", description: "Custom business case for your operation" },
];

const supportingOptions = [
  { icon: Calculator, label: "ROI Assessment" },
  { icon: LineChart, label: "Maturity Assessment" },
];

interface SalesSlide9NextStepsProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide9NextSteps = ({
  slideNumber,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide9NextStepsProps) => {
  return (
    <section
      id="sales-slide-9"
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

      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Logo - top right */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <img src={complyLogo} alt="Comply365" className="h-6 sm:h-8 w-auto opacity-90" />
      </div>

      {/* Slide number - bottom right */}
      {slideNumber !== undefined && (
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10">
          <span className="text-sm font-medium text-muted-foreground">
            {String(slideNumber).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full text-center space-y-6">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
          <span className="text-foreground">Let's Make Your Operations</span>{" "}
          <span className="text-primary">Predictable</span>
        </h2>

        {/* Personalization prompt */}
        <p className="text-lg text-muted-foreground">
          Your operation has unique signals. Let's map them.
        </p>

        {/* What You'll Get */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {whatYouGet.map((item) => (
            <div
              key={item.label}
              className="bg-card/50 border border-primary/20 rounded-xl p-4 text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">{item.label}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="pt-4">
          <button className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105">
            <CalendarCheck className="w-5 h-5" />
            Schedule Discovery Session
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Supporting options */}
        <div className="flex justify-center gap-6 pt-2">
          {supportingOptions.map((opt) => (
            <button
              key={opt.label}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <opt.icon className="w-4 h-4" />
              {opt.label}
            </button>
          ))}
        </div>

        {/* Urgency note */}
        <p className="text-xs text-muted-foreground">
          Most airlines reach <span className="text-primary font-medium">Connected (Stage 3)</span> within 6 months
        </p>

        {/* Closing hook with DTOP */}
        <div className="pt-4 border-t border-border/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-400/10 border border-blue-400/30">
              <Search className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-medium text-blue-400">Detect</span>
            </div>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
              <Zap className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-medium text-amber-400">Trigger</span>
            </div>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/30">
              <Workflow className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-medium text-primary">Orchestrate</span>
            </div>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <Shield className="w-3 h-3 text-emerald-500" />
              <span className="text-[10px] font-medium text-emerald-500">Prove</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            Your journey starts now.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SalesSlide9NextSteps;
