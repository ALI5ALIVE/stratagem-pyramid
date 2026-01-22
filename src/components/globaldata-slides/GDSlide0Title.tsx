import { ChevronDown } from "lucide-react";
import SlidePlayButton from "@/components/SlidePlayButton";
import type { SlideNarrationProps } from "@/types/slideProps";
import globalDataLogo from "@/assets/globaldata-logo-white.svg";

const agendaItems = [
  { num: 1, label: "Growth Reality", summary: "Why markets reward speed and conviction" },
  { num: 2, label: "Intelligence Gap", summary: "Where growth and leadership are lost" },
  { num: 3, label: "Before & After", summary: "The transformation visualized" },
  { num: 4, label: "The Proposition", summary: "Connected Intelligence defined" },
  { num: 5, label: "Value Chain", summary: "Intelligence that operates, not just reports" },
  { num: 6, label: "Value Pyramid", summary: "How value compounds with maturity" },
  { num: 7, label: "Maturity Roadmap", summary: "From today to predictive leadership" },
  { num: 8, label: "ROI", summary: "Speed, outcomes, and cost reduction" },
  { num: 9, label: "Why GlobalData", summary: "Built for connected intelligence at scale" },
];

interface GDSlide0TitleProps extends SlideNarrationProps {
  onNavigateToSlide?: (slideIndex: number) => void;
}

const GDSlide0Title = ({ 
  onNavigateToSlide,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: GDSlide0TitleProps) => {
  return (
    <section
      id="gd-slide-0"
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-16 snap-start relative overflow-hidden bg-background"
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

      {/* Decorative gradient orbs - Comply365 blue theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(217 100% 50% / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(217 100% 50% / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-8 sm:space-y-12">
        {/* Logo */}
        <div className="flex justify-center items-center gap-3">
          <img src={globalDataLogo} alt="GlobalData" className="h-10 sm:h-12 w-auto" />
        </div>

        {/* Headline */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            <span className="text-foreground">Designing</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
              Category Leadership
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
              with Connected Intelligence
            </span>
          </h1>
          
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            How organisations turn constant change into 
            <br className="hidden sm:block" />
            <span className="text-primary font-medium">faster, more confident growth decisions</span>.
          </p>
        </div>

        {/* Executive Takeaway */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-4">
            <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-2">Executive Takeaway</p>
            <p className="text-sm text-foreground leading-relaxed">
              Category leadership is no longer defined by scale or data volume — it's defined by how quickly and confidently you act on change.
            </p>
          </div>
        </div>

        {/* Agenda Grid */}
        <div className="pt-4 sm:pt-8">
          <div className="inline-block">
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mb-4">
              The Journey
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
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
        <div className="pt-4 sm:pt-8 space-y-1">
          <p className="text-muted-foreground text-sm sm:text-base font-medium">
            Consumer Brands Strategy Session
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

      {/* Slide number - aligned with content */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 max-w-5xl">
        <span className="text-sm font-medium text-muted-foreground">00</span>
      </div>
    </section>
  );
};

export default GDSlide0Title;
