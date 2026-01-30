import SlideContainer from "./SlideContainer";
import SlidePlayButton from "@/components/SlidePlayButton";
import type { SlideNarrationProps } from "@/types/slideProps";
import complyLogo from "@/assets/comply365-logo-white.png";
import { Button } from "@/components/ui/button";
import {
  Shield,
  FileText,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

const navItems = ["Platform", "Solutions", "Customers", "Resources"];

const pillars = [
  {
    title: "Safety Performance",
    icon: Shield,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    description: "Fewer incidents, reduced recurrence, faster investigation closure",
    metric: "50% faster closure",
  },
  {
    title: "Content Performance",
    icon: FileText,
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    description: "Faster change cycles, reduced drift, compliance alignment",
    metric: "60% faster changes",
  },
  {
    title: "Training Performance",
    icon: GraduationCap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    description: "Higher readiness, targeted qualification, faster competency",
    metric: "94% workforce readiness",
  },
];

const caseStudyMetrics = [
  { icon: TrendingUp, label: "OTP Improvement", value: "+3.2%" },
  { icon: Clock, label: "Audit Prep Time", value: "2 hours" },
  { icon: CheckCircle2, label: "Repeat Findings", value: "Zero" },
];

const SlidePlatformExperience = ({
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
      id="slide-15" 
      variant="dark"
      title="The Homepage Experience"
      subtitle="How messaging appears on the website"
      slideNumber={15}
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

      <div className="space-y-3">
        {/* Browser Chrome Mockup */}
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-2xl max-w-5xl mx-auto">
          {/* Browser toolbar */}
          <div className="bg-muted/50 border-b border-border px-3 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-background/50 border border-border/50 rounded px-3 py-0.5 text-[10px] text-muted-foreground">
                comply365.com
              </div>
            </div>
          </div>

          {/* Website content */}
          <div className="h-[360px] overflow-hidden bg-background">
            {/* Header Nav */}
            <div className="border-b border-border/50 px-4 py-2 flex items-center justify-between">
              <img src={complyLogo} alt="Comply365" className="h-5 w-auto" />
              <div className="flex items-center gap-4">
                {navItems.map((item) => (
                  <span key={item} className="text-[10px] text-muted-foreground hover:text-foreground cursor-pointer">
                    {item}
                  </span>
                ))}
                <Button size="sm" className="h-6 text-[10px] px-2">
                  Request Demo
                </Button>
              </div>
            </div>

            {/* Hero Section */}
            <div className="px-6 py-5 text-center bg-gradient-to-b from-primary/5 to-transparent">
              <h1 className="text-lg sm:text-xl font-display font-bold text-foreground mb-2">
                The Operational Performance Platform
              </h1>
              <p className="text-[11px] text-muted-foreground max-w-md mx-auto mb-3">
                Connect Safety, Content, and Training into one governed system.
                Turn operational signals into measurable performance.
              </p>
              <div className="flex items-center justify-center gap-2">
                <Button size="sm" className="h-6 text-[10px] px-3">
                  See the Platform
                </Button>
                <Button size="sm" variant="outline" className="h-6 text-[10px] px-3">
                  Calculate Your Impact
                </Button>
              </div>
            </div>

            {/* Three Pillars */}
            <div className="px-4 py-3">
              <div className="grid grid-cols-3 gap-3">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className={`${pillar.bgColor} ${pillar.borderColor} border rounded-lg p-2.5 text-center`}
                    >
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Icon className={`w-3 h-3 ${pillar.color}`} />
                        <h4 className={`text-[10px] font-semibold ${pillar.color}`}>
                          {pillar.title}
                        </h4>
                      </div>
                      <p className="text-[9px] text-muted-foreground mb-1.5 line-clamp-2">
                        {pillar.description}
                      </p>
                      <span className="text-[10px] font-medium text-foreground">
                        {pillar.metric}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Case Study Banner */}
            <div className="px-4 py-3">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-primary font-medium mb-0.5">Featured Case Study</p>
                    <p className="text-xs font-semibold text-foreground">
                      How a Major Airline Improved Operational Performance in 12 Months
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {caseStudyMetrics.map((metric) => {
                      const Icon = metric.icon;
                      return (
                        <div key={metric.label} className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Icon className="w-3 h-3 text-primary" />
                            <span className="text-sm font-bold text-foreground">{metric.value}</span>
                          </div>
                          <span className="text-[8px] text-muted-foreground">{metric.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 text-[10px] text-primary">
                    Read Story <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-4 py-2 border-t border-border/30 bg-muted/30">
              <p className="text-center text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground">Point solutions manage silos.</span>
                {" "}Comply365 closes the loop.
              </p>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground">
            The same language — <span className="text-primary font-medium">Safety Performance</span>,{" "}
            <span className="text-primary font-medium">Content Performance</span>,{" "}
            <span className="text-primary font-medium">Training Performance</span> — 
            appears on the website, in sales materials, and in the product. Consistency builds category ownership.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlidePlatformExperience;
