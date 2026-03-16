import { ChevronDown, Brain, Target, Compass, Crosshair, LayoutGrid, Cog, TrendingUp, Shield, Users, MessageSquare, Quote, Globe, Eye, Layers } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";
import SlidePlayButton from "@/components/SlidePlayButton";
import { SlideNarrationProps } from "@/types/slideProps";

const sections = [
  { num: 1, label: "Executive Summary", icon: Brain, color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30" },
  { num: 2, label: "Category Narrative", icon: Compass, color: "text-emerald-400", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/30" },
  { num: 3, label: "Strategic Narrative", icon: Target, color: "text-amber-400", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30" },
  { num: 4, label: "Product Positioning", icon: Crosshair, color: "text-violet-400", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/30" },
  { num: 5, label: "Messaging Architecture", icon: LayoutGrid, color: "text-cyan-400", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/30" },
  { num: 6, label: "How It Works", icon: Cog, color: "text-orange-400", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30" },
  { num: 7, label: "Business Outcomes", icon: TrendingUp, color: "text-green-400", bgColor: "bg-green-500/10", borderColor: "border-green-500/30" },
  { num: 8, label: "vs Generic AI", icon: Shield, color: "text-red-400", bgColor: "bg-red-500/10", borderColor: "border-red-500/30" },
  { num: 9, label: "Persona Messaging", icon: Users, color: "text-pink-400", bgColor: "bg-pink-500/10", borderColor: "border-pink-500/30" },
  { num: 10, label: "Objection Handling", icon: MessageSquare, color: "text-yellow-400", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/30" },
  { num: 11, label: "Taglines & Lines", icon: Quote, color: "text-indigo-400", bgColor: "bg-indigo-500/10", borderColor: "border-indigo-500/30" },
  { num: 12, label: "Website Messaging", icon: Globe, color: "text-teal-400", bgColor: "bg-teal-500/10", borderColor: "border-teal-500/30" },
  { num: 13, label: "Visual Narrative", icon: Eye, color: "text-fuchsia-400", bgColor: "bg-fuchsia-500/10", borderColor: "border-fuchsia-500/30" },
  { num: 14, label: "Deck Structure", icon: Layers, color: "text-sky-400", bgColor: "bg-sky-500/10", borderColor: "border-sky-500/30" },
];

interface CASlide0TitleProps extends SlideNarrationProps {
  onNavigateToSlide?: (index: number) => void;
}

const CASlide0Title = ({
  onNavigateToSlide,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: CASlide0TitleProps) => {
  return (
    <section className="h-screen w-full flex flex-col snap-start relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

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

      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <img src={complyLogo} alt="Comply365" className="h-6 sm:h-8 w-auto opacity-90" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="max-w-7xl w-full mx-auto">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">CoAnalyst — Positioning & Messaging Playbook</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight mb-4">
            <span className="title-accent">Aviation Data</span>
            <br />
            <span className="text-foreground">Intelligence</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mb-10">
            From reports to intelligence. From events to control.
            <br />
            <span className="text-primary font-medium">The strategic playbook for category-defining positioning.</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
            {sections.map((section) => (
              <button
                key={section.num}
                onClick={() => onNavigateToSlide?.(section.num)}
                className={`${section.bgColor} ${section.borderColor} border rounded-lg p-2.5 text-left hover:scale-[1.02] transition-all group cursor-pointer`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <section.icon className={`w-3.5 h-3.5 ${section.color}`} />
                  <span className="text-[10px] text-muted-foreground">{String(section.num).padStart(2, "0")}</span>
                </div>
                <p className="text-xs font-medium text-foreground leading-tight">{section.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs">Scroll to begin</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
};

export default CASlide0Title;
