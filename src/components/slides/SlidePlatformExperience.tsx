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
    metric: "50% faster closure",
  },
  {
    title: "Content Performance",
    icon: FileText,
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    metric: "60% faster changes",
  },
  {
    title: "Training Performance",
    icon: GraduationCap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    metric: "94% workforce ready",
  },
];

const caseStudyMetrics = [
  { icon: TrendingUp, label: "OTP", value: "+3.2%" },
  { icon: Clock, label: "Audit Prep", value: "2hrs" },
  { icon: CheckCircle2, label: "Repeat Findings", value: "Zero" },
];

const trustLogos = ["Airline 1", "Airline 2", "Airline 3", "Airline 4", "Airline 5"];

const dtopSteps = ["Detect", "Trigger", "Orchestrate", "Prove"];

const footerColumns = [
  { title: "Solutions", links: ["Safety Manager", "Content Manager", "Training Manager"] },
  { title: "Resources", links: ["Blog", "Case Studies", "Webinars"] },
  { title: "Company", links: ["About", "Careers", "Contact"] },
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

      {/* Browser Chrome Mockup - Expanded */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-2xl max-w-5xl mx-auto">
        {/* Browser toolbar */}
        <div className="bg-muted/50 border-b border-border px-3 py-1.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-background/50 border border-border/50 rounded px-3 py-0.5 text-[9px] text-muted-foreground">
              comply365.com
            </div>
          </div>
        </div>

        {/* Website content - Expanded height */}
        <div className="h-[480px] overflow-hidden bg-background">
          {/* Header Nav */}
          <div className="border-b border-border/50 px-4 py-1.5 flex items-center justify-between">
            <img src={complyLogo} alt="Comply365" className="h-4 w-auto" />
            <div className="flex items-center gap-3">
              {navItems.map((item) => (
                <span key={item} className="text-[9px] text-muted-foreground hover:text-foreground cursor-pointer">
                  {item}
                </span>
              ))}
              <Button size="sm" className="h-5 text-[9px] px-2">
                Request Demo
              </Button>
            </div>
          </div>

          {/* Hero Section */}
          <div className="px-6 py-4 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h1 className="text-base font-display font-bold text-foreground mb-1.5">
                  The Operational Performance Platform
                </h1>
                <p className="text-[10px] text-muted-foreground max-w-sm mb-2">
                  Connect Safety, Content, and Training into one governed system.
                  Turn operational signals into measurable performance.
                </p>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="h-5 text-[9px] px-2">
                    See the Platform
                  </Button>
                  <Button size="sm" variant="outline" className="h-5 text-[9px] px-2">
                    Calculate Your Impact
                  </Button>
                </div>
              </div>
              {/* Hero Visual Placeholder */}
              <div className="w-32 h-20 bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-center">
                <div className="text-[8px] text-muted-foreground text-center">
                  Platform<br/>Diagram
                </div>
              </div>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="px-4 py-1.5 border-y border-border/30 bg-muted/20 flex items-center justify-center gap-4">
            <span className="text-[8px] text-muted-foreground">Trusted by 50+ airlines worldwide</span>
            <div className="flex items-center gap-2">
              {trustLogos.map((logo, i) => (
                <div key={i} className="w-10 h-4 bg-muted/50 rounded flex items-center justify-center">
                  <span className="text-[6px] text-muted-foreground">{logo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Three Pillars */}
          <div className="px-4 py-2">
            <div className="grid grid-cols-3 gap-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className={`${pillar.bgColor} ${pillar.borderColor} border rounded-lg p-2 text-center`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Icon className={`w-2.5 h-2.5 ${pillar.color}`} />
                      <h4 className={`text-[9px] font-semibold ${pillar.color}`}>
                        {pillar.title}
                      </h4>
                    </div>
                    <span className="text-[9px] font-medium text-foreground block mb-0.5">
                      {pillar.metric}
                    </span>
                    <span className="text-[8px] text-primary cursor-pointer hover:underline">
                      Learn more →
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Case Study Banner - Enhanced */}
          <div className="px-4 py-2">
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-2">
              <p className="text-[8px] italic text-muted-foreground mb-1.5 text-center">
                "Comply365 transformed how we manage operational change across our entire fleet."
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[8px] text-primary font-medium">Featured Case Study</p>
                  <p className="text-[10px] font-semibold text-foreground">
                    Major Airline: 12-Month Performance Improvement
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {caseStudyMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.label} className="text-center">
                        <div className="flex items-center justify-center gap-0.5">
                          <Icon className="w-2.5 h-2.5 text-primary" />
                          <span className="text-[10px] font-bold text-foreground">{metric.value}</span>
                        </div>
                        <span className="text-[7px] text-muted-foreground">{metric.label}</span>
                      </div>
                    );
                  })}
                </div>
                <Button size="sm" variant="ghost" className="h-5 text-[8px] text-primary px-1">
                  Read Story <ArrowRight className="w-2.5 h-2.5 ml-0.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* DTOP Flow Section */}
          <div className="px-4 py-2">
            <div className="bg-muted/30 border border-border/30 rounded-lg p-2">
              <p className="text-[8px] text-center text-muted-foreground mb-1.5">
                One Platform. Three Performance Domains.
              </p>
              <div className="flex items-center justify-center gap-1.5">
                {dtopSteps.map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[8px] font-medium text-foreground">
                      {step}
                    </span>
                    {i < dtopSteps.length - 1 && (
                      <ArrowRight className="w-2.5 h-2.5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[7px] text-center text-muted-foreground mt-1">
                Turn operational signals into governed actions
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-muted/50 border-t border-border/30">
            <div className="flex items-start justify-between">
              <div className="flex gap-6">
                {footerColumns.map((col) => (
                  <div key={col.title}>
                    <p className="text-[8px] font-semibold text-foreground mb-0.5">{col.title}</p>
                    {col.links.map((link) => (
                      <p key={link} className="text-[7px] text-muted-foreground hover:text-foreground cursor-pointer">
                        {link}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
              <Button size="sm" className="h-5 text-[8px] px-2">
                Request Demo
              </Button>
            </div>
          </div>

          {/* Footer Tagline */}
          <div className="px-4 py-1.5 border-t border-border/30 bg-muted/30">
            <p className="text-center text-[9px] text-muted-foreground">
              <span className="font-medium text-foreground">Point solutions manage silos.</span>
              {" "}Comply365 closes the loop.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlidePlatformExperience;
