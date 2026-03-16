import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

const deckFlow = [
  { slide: "Cover", purpose: "Set category and tone", message: "Aviation Data Intelligence — CoAnalyst" },
  { slide: "The Problem", purpose: "Frame the reactive model", message: "Aviation runs on reports, not intelligence" },
  { slide: "The Industry Shift", purpose: "Introduce the before/after", message: "From event management to control management" },
  { slide: "The Category", purpose: "Define Aviation Data Intelligence", message: "A new category for a new capability" },
  { slide: "CoAnalyst", purpose: "Introduce the product", message: "The intelligence layer above your operational systems" },
  { slide: "How It Works", purpose: "Explain the pipeline", message: "Ingest → Enrich → Detect → Intelligence → Control" },
  { slide: "Business Outcomes", purpose: "Connect to value", message: "Fewer delays, damages, injuries. Revenue protection." },
  { slide: "vs Generic AI", purpose: "Differentiation", message: "Purpose-built precision vs off-the-shelf AI" },
  { slide: "Use Case", purpose: "Make it real", message: "A concrete example of pattern detection and prevention" },
  { slide: "Next Steps", purpose: "Call to action", message: "Pilot, proof of value, deployment roadmap" },
];

const CASlide14DeckStructure = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-deck-structure" title="Recommended Deck Structure & Final Positioning" subtitle="Slide flow for a positioning deck and the strongest positioning recommendations" slideNumber={14} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full">
        {/* Deck flow */}
        <div className="bg-card/60 border border-border rounded-xl p-5 overflow-auto">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">Positioning Deck Flow</h3>
          <div className="space-y-2">
            {deckFlow.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <span className="text-primary font-bold w-4 shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <span className="font-semibold text-foreground">{item.slide}</span>
                  <span className="text-muted-foreground mx-1.5">—</span>
                  <span className="text-muted-foreground">{item.purpose}</span>
                </div>
                <span className="text-[10px] text-primary/70 italic max-w-[180px] text-right">{item.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final recommendations */}
        <div className="flex flex-col gap-4">
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-5">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-4">Final Recommended Positioning</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">Category</p>
                <p className="text-lg font-display font-bold text-foreground">Aviation Data Intelligence</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">One-Line Pitch</p>
                <p className="text-sm font-semibold text-foreground">From Reports to Intelligence. From Events to Control.</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">Positioning Statement</p>
                <p className="text-sm text-muted-foreground leading-relaxed">CoAnalyst transforms aviation data into operational intelligence, enabling airlines to move from reactive event management to proactive control management.</p>
              </div>
            </div>
          </div>

          <div className="bg-card/60 border border-border rounded-xl p-5 flex-1">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Narrative Summary</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Aviation organizations generate vast amounts of safety and operational data across multiple domains. Today, most of that data is processed reactively — events happen, reports are filed, analysts investigate, and action is taken afterwards. CoAnalyst changes this model by providing a purpose-built aviation data intelligence layer that ingests, enriches, and analyzes data across safety, operations, maintenance, training, and crew domains. It delivers four levels of intelligence — historical, real-time, proactive, and predictive — enabling organizations to identify patterns, detect weakening controls, and shift from managing events after they occur to managing the controls that prevent them. The result: fewer delays, fewer damages, fewer injuries, stronger operational reliability, and measurable revenue protection.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide14DeckStructure;
