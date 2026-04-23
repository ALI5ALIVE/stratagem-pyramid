import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Layers } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";
import { heroEyebrow, heroTagline, heroSubtitle, statusLabel } from "@/data/platformPlaybook";
import DeckPDFExportButton from "@/components/DeckPDFExportButton";
import DeckPPTXExportButton from "@/components/DeckPPTXExportButton";

interface ExportSlideDef {
  id: string;
  label: string;
  component: React.ComponentType<any>;
}

interface Props extends SlideNarrationProps {
  slideNumber?: number;
  exportSlides?: ExportSlideDef[];
}

/**
 * Tech-deck opener — platform-hero. Mirrors the Platform Playbook title slide
 * to frame the deck around "The Operational Performance Platform".
 */
const TechSlideOpener = ({ slideNumber, exportSlides, ...narrationProps }: Props) => (
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
    {exportSlides && exportSlides.length > 0 && (
      <div className="absolute bottom-24 right-8 z-40 flex flex-col items-end gap-1 text-right">
        <div className="flex items-center gap-2">
          <DeckPPTXExportButton deckId="tech-deep-dive" />
          <DeckPDFExportButton
            slides={exportSlides}
            filename="Comply365-Technical-Deep-Dive.pdf"
            deckLabel="Technical Deep Dive"
          />
        </div>
        <span className="text-[10px] text-muted-foreground bg-background/70 backdrop-blur px-2 py-0.5 rounded max-w-[220px]">
          Interactive slides export in their default view.
        </span>
      </div>
    )}
  </SalesSlideContainer>
);

export default TechSlideOpener;