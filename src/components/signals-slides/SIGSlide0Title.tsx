import { ChevronDown, Radio } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";
import { SlideNarrationProps } from "@/types/slideProps";
import { heroTagline } from "@/data/signalsPlaybook";

const SIGSlide0Title = (_props: SlideNarrationProps) => {
  return (
    <section className="h-screen w-full flex flex-col snap-start relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <img src={complyLogo} alt="Comply365" className="h-6 sm:h-8 w-auto opacity-90" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="max-w-7xl w-full mx-auto">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center gap-2">
            <Radio className="h-4 w-4" /> Sales Enablement Playbook
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight mb-4">
            <span className="title-accent">Signals 101</span>
            <br />
            <span className="text-foreground">From Noise to Action</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mb-3">
            {heroTagline}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
            <span className="px-3 py-1 rounded-full border border-border text-muted-foreground">For new reps</span>
            <span className="px-3 py-1 rounded-full border border-border text-muted-foreground">11 slides · ~15 min</span>
            <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary">Foundational</span>
            <span className="px-3 py-1 rounded-full border border-border/60 text-muted-foreground/70 font-mono text-xs">/signals-playbook</span>
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

export default SIGSlide0Title;