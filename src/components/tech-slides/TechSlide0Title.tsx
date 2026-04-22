import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Plane, Globe, Users } from "lucide-react";
import DeckPDFExportButton from "@/components/DeckPDFExportButton";
import DeckPPTXExportButton from "@/components/DeckPPTXExportButton";

interface ExportSlideDef {
  id: string;
  label: string;
  component: React.ComponentType<any>;
}

const trustStats = [
  { icon: Plane, value: "550+", label: "Airlines Worldwide" },
  { icon: Globe, value: "6", label: "Continents" },
  { icon: Users, value: "Global", label: "Aviation & AI Experts" },
];

const TechSlide0Title = ({
  exportSlides,
  ...narrationProps
}: SlideNarrationProps & { slideNumber?: number; exportSlides?: ExportSlideDef[] }) => {
  return (
    <SalesSlideContainer id="tech-slide-0" slideNumber={narrationProps.slideNumber} showHeader={false} {...narrationProps}>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">The Complete Platform Story</span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight max-w-4xl">
          Operational Performance<br />
          <span className="text-primary">Platform</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          The technical deep-dive: architecture, intelligence, every use case costed, and your roadmap to predictable, measurable, provable operations.
        </p>

        {/* Trust stats */}
        <div className="flex items-center gap-8 mt-2">
          {trustStats.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <s.icon className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
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
};

export default TechSlide0Title;
