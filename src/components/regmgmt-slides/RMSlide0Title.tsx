import { ChevronDown } from "lucide-react";
import complyLogo from "@/assets/comply365-logo-white.png";
import { SlideNarrationProps } from "@/types/slideProps";

const RMSlide0Title = (_props: SlideNarrationProps) => {
  return (
    <section className="h-screen w-full flex flex-col snap-start relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <img src={complyLogo} alt="Comply365" className="h-6 sm:h-8 w-auto opacity-90" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="max-w-7xl w-full mx-auto">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Messaging & Positioning Playbook
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight mb-4">
            <span className="title-accent">Regulation</span>
            <br />
            <span className="text-foreground">Management</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mb-3">
            Always Current. Always Connected. Always Compliant.
          </p>
          <p className="text-primary font-medium text-base max-w-2xl">
            From System of Record → System of Work → System of Intelligence
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs">Scroll to begin</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
};

export default RMSlide0Title;
