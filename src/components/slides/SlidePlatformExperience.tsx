import SlideContainer from "./SlideContainer";
import SlidePlayButton from "@/components/SlidePlayButton";
import type { SlideNarrationProps } from "@/types/slideProps";
import complyLogo from "@/assets/comply365-logo-white.png";
import {
  Shield,
  FileText,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  LayoutDashboard,
  TrendingDown,
  TrendingUp,
  Clock,
  AlertTriangle,
  Zap,
  BookOpen,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Shield, label: "Safety Performance" },
  { icon: FileText, label: "Content Performance" },
  { icon: GraduationCap, label: "Training Performance" },
  { icon: CheckCircle2, label: "Governance & Proof" },
  { icon: Sparkles, label: "AI Insights" },
];

const domainCards = [
  {
    title: "Safety Performance",
    icon: Shield,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    metrics: [
      { label: "Open investigations", value: "47", trend: null },
      { label: "Recurrence rate", value: "4.2%", trend: "down" },
      { label: "Avg. closure time", value: "12 days", trend: null },
    ],
  },
  {
    title: "Content Performance",
    icon: FileText,
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    metrics: [
      { label: "Procedures pending update", value: "23", trend: null },
      { label: "Time-to-change", value: "8 days", trend: "down" },
      { label: "Currency rate", value: "96.4%", trend: "up" },
    ],
  },
  {
    title: "Training Performance",
    icon: GraduationCap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    metrics: [
      { label: "Workforce readiness", value: "94%", trend: "up" },
      { label: "Overdue qualifications", value: "127", trend: null },
      { label: "Activations this month", value: "342", trend: null },
    ],
  },
];

const aiRecommendations = [
  {
    icon: Zap,
    iconColor: "text-amber-400",
    text: "New FOQA trend detected — 3 procedures flagged for review",
  },
  {
    icon: BookOpen,
    iconColor: "text-sky-400",
    text: "Procedure SOP-2847 updated — 847 crew require re-acknowledgment",
  },
  {
    icon: GraduationCap,
    iconColor: "text-emerald-400",
    text: "Targeted training activated for 23 crew based on performance data",
  },
];

const dtopSteps = [
  { label: "Detect", active: true },
  { label: "Trigger", active: true },
  { label: "Orchestrate", active: false },
  { label: "Prove", active: false },
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
      title="The Platform Experience"
      subtitle="How messaging appears in the product"
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
                app.comply365.com/dashboard
              </div>
            </div>
          </div>

          {/* App layout */}
          <div className="flex h-[340px]">
            {/* Sidebar */}
            <div className="w-48 bg-muted/30 border-r border-border/50 p-3 space-y-3 hidden sm:block">
              {/* Logo */}
              <div className="flex items-center gap-2 pb-2 border-b border-border/30">
                <img src={complyLogo} alt="Comply365" className="h-5 w-auto" />
              </div>
              
              {/* Nav items */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${
                        item.active
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 space-y-3 overflow-hidden">
              {/* Domain cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {domainCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.title}
                      className={`${card.bgColor} ${card.borderColor} border rounded-lg p-3 space-y-2`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${card.color}`} />
                        <h4 className={`text-xs font-semibold ${card.color}`}>
                          {card.title}
                        </h4>
                      </div>
                      <div className="space-y-1.5">
                        {card.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="flex items-center justify-between text-[10px]"
                          >
                            <span className="text-muted-foreground">
                              {metric.label}
                            </span>
                            <span className="font-medium text-foreground flex items-center gap-0.5">
                              {metric.value}
                              {metric.trend === "up" && (
                                <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
                              )}
                              {metric.trend === "down" && (
                                <TrendingDown className="w-2.5 h-2.5 text-emerald-400" />
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI Recommendations panel */}
              <div className="bg-background/50 border border-border/50 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <h4 className="text-xs font-semibold text-foreground">
                    AI Recommendations
                  </h4>
                </div>
                <div className="space-y-1.5">
                  {aiRecommendations.map((rec, index) => {
                    const Icon = rec.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-[10px] text-muted-foreground"
                      >
                        <Icon className={`w-3 h-3 ${rec.iconColor} flex-shrink-0 mt-0.5`} />
                        <span>{rec.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DTOP flow banner */}
              <div className="bg-muted/30 border border-border/30 rounded px-3 py-2">
                <div className="flex items-center justify-center gap-2">
                  {dtopSteps.map((step, index) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div
                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          step.active
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </div>
                      {index < dtopSteps.length - 1 && (
                        <div className="w-4 h-px bg-border" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground">
            The navigation says <span className="text-primary font-medium">Safety Performance</span>,{" "}
            <span className="text-primary font-medium">Content Performance</span>,{" "}
            <span className="text-primary font-medium">Training Performance</span> — 
            not "SMS" or "LMS." The messaging and the experience are aligned.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlidePlatformExperience;
