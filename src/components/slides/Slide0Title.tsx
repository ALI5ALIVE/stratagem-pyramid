import { ChevronDown } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";
import SlidePlayButton from "@/components/SlidePlayButton";
import type { SlideNarrationProps } from "@/types/slideProps";

const agendaItems = [
  { num: 1, label: "Strategic Shift", summary: "Why we're defining the category" },
  { num: 2, label: "Before & After", summary: "Fragmentation vs. connected operations" },
  { num: 3, label: "Operating Model", summary: "Detect → Trigger → Orchestrate → Prove" },
  { num: 4, label: "Use Cases", summary: "DTOP in action across real scenarios" },
  { num: 5, label: "Transformation", summary: "From cost center to value driver" },
  { num: 6, label: "Value Ladder", summary: "How value compounds with maturity" },
  { num: 7, label: "Maturity Roadmap", summary: "The measurable performance journey" },
  { num: 8, label: "AI Journey", summary: "Your intelligence acceleration path" },
  { num: 9, label: "Customers", summary: "Real-world measurable outcomes" },
  { num: 10, label: "Messaging House", summary: "Complete positioning framework" },
  { num: 11, label: "Campaign Ideas", summary: "Category leadership campaigns" },
  { num: 12, label: "Messaging in Context", summary: "How positioning applies across domains" },
  { num: 13, label: "Content Strategy", summary: "Flying High 12-month programme" },
  { num: 14, label: "Persona Map", summary: "Stakeholder content by role" },
  { num: 15, label: "Homepage Experience", summary: "Category positioning in the product" },
  { num: 16, label: "Next Steps", summary: "Your path forward" },
];

interface Slide0TitleProps extends SlideNarrationProps {
  onNavigateToSlide?: (slideIndex: number) => void;
}

const Slide0Title = ({ 
  onNavigateToSlide,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: Slide0TitleProps) => {
  return (
    <section
      id="slide-0"
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-16 snap-start relative overflow-hidden bg-background"
    >
      {/* Play button - always visible when onPlay provided */}
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
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-4 sm:space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src={complyLogo} 
            alt="Comply365" 
            className="h-10 sm:h-14 w-auto"
          />
        </div>

        {/* Headline */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            <span className="text-foreground">Defining the</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Operational Performance
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Platform
            </span>
          </h1>
          
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Connect safety, content, and training into an intelligent operating platform.
            <br className="hidden sm:block" />
            <span className="text-primary font-medium">Turn signals into orchestrated change and measurable outcomes.</span>
          </p>
        </div>

        {/* Agenda Grid */}
        <div className="pt-2 sm:pt-4">
          <div className="inline-block">
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mb-2">
              The Journey
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {agendaItems.map((item) => (
                <button 
                  key={item.num}
                  onClick={() => onNavigateToSlide?.(item.num)}
                  className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-left hover:border-primary/50 hover:bg-card/80 hover:scale-[1.02] cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-mono text-xs sm:text-sm font-bold">
                      {String(item.num).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="text-foreground text-xs sm:text-sm font-medium leading-tight">
                        {item.label}
                      </div>
                      <div className="text-muted-foreground text-[10px] sm:text-xs mt-0.5 leading-tight hidden sm:block">
                        {item.summary}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Context */}
        <div className="pt-2 sm:pt-4 space-y-1">
          <p className="text-muted-foreground text-sm sm:text-base font-medium">
            Board Strategy Session
          </p>
          <p className="text-muted-foreground/60 text-xs sm:text-sm">
            January 2026
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-pulse">
        <span className="text-xs uppercase tracking-widest">Scroll to begin</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};

export default Slide0Title;
