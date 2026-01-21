import { ChevronDown } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";

const agendaItems = [
  { num: 1, label: "Strategic Shift", summary: "Why we're redefining the category" },
  { num: 2, label: "Before & After", summary: "What's broken — and how we fix it" },
  { num: 3, label: "Operating Model", summary: "Detect → Trigger → Orchestrate → Prove" },
  { num: 4, label: "Readiness Ladder", summary: "Building blocks of excellence" },
  { num: 5, label: "Excellence Roadmap", summary: "The measurable journey" },
  { num: 6, label: "Positioning", summary: "Where we stand vs. competitors" },
  { num: 7, label: "Customers", summary: "Measurable value delivery" },
  { num: 8, label: "Investors", summary: "Shareholder value creation" },
];

const Slide0Title = () => {
  return (
    <section
      id="slide-0"
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-16 snap-start relative overflow-hidden bg-background"
    >
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
      <div className="relative z-10 max-w-5xl w-full text-center space-y-8 sm:space-y-12">
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
              Operational Excellence
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              & Readiness Category
            </span>
          </h1>
          
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            From fragmented compliance tools to a connected platform 
            <br className="hidden sm:block" />
            that delivers <span className="text-primary font-medium">predictable excellence</span> at scale.
          </p>
        </div>

        {/* Agenda Grid */}
        <div className="pt-4 sm:pt-8">
          <div className="inline-block">
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mb-4">
              The Journey
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {agendaItems.map((item) => (
                <div 
                  key={item.num}
                  className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-left hover:border-primary/30 hover:bg-card/80 transition-all duration-200"
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Context */}
        <div className="pt-4 sm:pt-8 space-y-1">
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
