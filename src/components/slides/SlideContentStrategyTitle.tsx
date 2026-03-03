import { ChevronDown, Plane, Route, Layers, BookOpen, Lightbulb, ShoppingCart } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";
import SlidePlayButton from "@/components/SlidePlayButton";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

const sections = [
  {
    num: 1,
    label: "Strategy Overview",
    summary: "Market challenge, central idea, and content theme",
    icon: Plane,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    num: 2,
    label: "Messaging House",
    summary: "Master line, pillars, DTOP, and audience interpretation",
    icon: Route,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
  },
  {
    num: 3,
    label: "Quarterly Strategy",
    summary: "Q1–Q4 narratives, DTOP roles, and content journey stages",
    icon: Layers,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
  },
  {
    num: 4,
    label: "Content Architecture",
    summary: "Anchor asset, quarterly structure and content principles",
    icon: BookOpen,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
  },
  {
    num: 5,
    label: "Content Inventory",
    summary: "54 assets across the year with quarterly production schedule",
    icon: Lightbulb,
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
    borderColor: "border-rose-400/30",
  },
  {
    num: 6,
    label: "Sales Enablement",
    summary: "Bottom-of-funnel support for pipeline progression",
    icon: ShoppingCart,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/30",
  },
];

interface SlideContentStrategyTitleProps extends SlideNarrationProps {
  onNavigateToSlide?: (slideIndex: number) => void;
}

const SlideContentStrategyTitle = ({
  onNavigateToSlide,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideContentStrategyTitleProps) => {
  return (
    <section
      id="slide-cs-title"
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-16 snap-start relative overflow-hidden bg-background"
    >
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

      {/* Decorative */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl w-full text-center space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={complyLogo} alt="Comply365" className="h-10 sm:h-12 w-auto" />
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-primary uppercase tracking-[0.2em] font-semibold">
            12-Month Content Strategy
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            <span className="text-foreground">Flying High</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Raise Performance Without Raising Risk
            </span>
          </p>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A content programme about performance, not product features. Built to move
            the market from fragmented activity to connected operational performance.
          </p>
        </div>

        {/* Section cards */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.num}
                onClick={() => onNavigateToSlide?.(section.num)}
                className={cn(
                  "group text-left rounded-xl border-2 px-4 py-4 transition-all duration-200 cursor-pointer",
                  "hover:scale-[1.03] hover:shadow-lg",
                  section.bgColor,
                  section.borderColor,
                  "hover:border-primary/60"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", section.bgColor)}>
                    <Icon className={cn("w-4 h-4", section.color)} />
                  </div>
                  <div>
                    <div className="text-foreground text-sm font-bold leading-tight mb-1">
                      {section.label}
                    </div>
                    <div className="text-muted-foreground text-xs leading-snug">
                      {section.summary}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Context */}
        <p className="text-muted-foreground/60 text-xs pt-2">
          FY 2025–2026 · Aviation Content Programme
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-pulse">
        <span className="text-xs uppercase tracking-widest">Scroll to begin</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};

export default SlideContentStrategyTitle;
