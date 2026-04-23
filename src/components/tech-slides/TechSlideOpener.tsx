import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Layers } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";
import { heroEyebrow, heroTagline, heroSubtitle, statusLabel } from "@/data/platformPlaybook";

interface Props extends SlideNarrationProps { slideNumber?: number; }

/**
 * Tech-deck opener — platform-hero. Mirrors the Platform Playbook title slide
 * to frame the deck around "The Operational Performance Platform".
 */
const TechSlideOpener = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-opener"
    showHeader={false}
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col justify-center">
      <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4 flex items-center gap-2">
        <Layers className="h-4 w-4" />
        {heroEyebrow}
      </p>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight mb-4">
        <span className="title-accent">One platform.</span>
        <br />
        <span className="text-foreground">One operating model. One entry point.</span>
      </h1>
      <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mb-3">{heroTagline}</p>
      <p className="text-foreground/70 text-sm sm:text-base max-w-3xl mb-6">{heroSubtitle}</p>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 self-start">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-emerald-300 font-medium">{statusLabel}</span>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlideOpener;