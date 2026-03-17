import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

const deckFlow = [
  { slide: "Cover", purpose: "Set category and tone", message: "Aviation Data Intelligence — CoAnalyst" },
  { slide: "The Problem", purpose: "Frame the reactive model", message: "Aviation runs on reports, not intelligence" },
  { slide: "The Industry Shift", purpose: "Event → Control management", message: "From chasing events to managing controls" },
  { slide: "The Platform", purpose: "CoAnalyst within the platform", message: "The intelligence layer above Safety, Content, Training Manager 365" },
  { slide: "CoAnalyst", purpose: "Introduce the platform", message: "The intelligence layer above your operational systems" },
  { slide: "How It Works", purpose: "Explain the pipeline", message: "Ingest → Enrich → Detect → Intelligence → Activate" },
  { slide: "The Precision Gap", purpose: "Why not generic AI", message: "90% vs 30–40% at granular categorization" },
  { slide: "Business Outcomes", purpose: "Connect to value", message: "Fewer delays, damages, injuries. Revenue protection." },
  { slide: "Use Case", purpose: "Make it real", message: "Pattern detection and prevention in action" },
  { slide: "Next Steps", purpose: "Call to action", message: "Pilot, proof of value, deployment roadmap" },
];

const CASlide14DeckStructure = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-deck-structure" title="Recommended Deck Structure & Final Positioning" subtitle="Slide flow for a positioning deck and the strongest positioning recommendations" slideNumber={14} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        {/* Deck flow */}
        <div className="bg-card/60 border border-border rounded-xl p-4 overflow-auto">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">Positioning Deck Flow</h3>
          <div className="space-y-1.5">
            {deckFlow.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-[11px]">
                <span className="text-primary font-bold w-4 shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <span className="font-semibold text-foreground">{item.slide}</span>
                  <span className="text-muted-foreground mx-1.5">—</span>
                  <span className="text-muted-foreground">{item.purpose}</span>
                </div>
                <span className="text-[9px] text-primary/70 italic max-w-[160px] text-right">{item.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final recommendations */}
        <div className="flex flex-col gap-3">
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wide mb-3">Final Recommended Positioning</h3>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-0.5">Role</p>
                <p className="text-lg font-display font-bold text-foreground">Intelligence Layer — Operational Performance Platform</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-0.5">One-Line Pitch</p>
                <p className="text-sm font-semibold text-foreground">From Reports to Intelligence. From Events to Control.</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-0.5">Positioning</p>
                <p className="text-xs text-muted-foreground leading-relaxed">CoAnalyst is the intelligence layer of the Operational Performance Platform that transforms aviation data into operational intelligence — enabling the shift from critical event management to critical control management across safety, operations, maintenance, training, and crew domains.</p>
              </div>
            </div>
          </div>

          <div className="bg-card/60 border border-border rounded-xl p-4 flex-1">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">Key Strategic Decisions</h3>
            <div className="space-y-1.5">
              {[
                "Position CoAnalyst as a standalone product — not an add-on to Safety Manager",
                "Lead with intelligence and control management, not report processing",
                "Future roadmap: extend to training, documentation, and OCM analytics",
                "Price independently — it's a separate product with its own value",
                "Competitive narrative: precision gap (90% vs 30–40%) is the killer argument",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-[10px] text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide14DeckStructure;
