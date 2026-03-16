import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

const taglines = [
  "From Reports to Intelligence. From Events to Control.",
  "Aviation Intelligence, Purpose-Built.",
  "See What Your Data Has Been Trying to Tell You.",
  "The Intelligence Layer Aviation Has Been Missing.",
  "Stop Processing Reports. Start Preventing Events.",
  "Aviation Data. Operational Intelligence. Business Outcomes.",
  "Intelligence That Flies Ahead of Risk.",
  "Know Before It Happens.",
  "From Fragmented Data to Unified Intelligence.",
  "The Shift from Reactive to Proactive Starts Here.",
];

const headlines = [
  "Turn Aviation Data into Operational Intelligence",
  "The Intelligence Platform for Proactive Aviation Operations",
  "From Reactive Reporting to Predictive Control Management",
  "Aviation-Trained AI That Understands Your Operations",
  "See Patterns. Detect Hazards. Manage Controls. Protect Performance.",
  "Move Beyond Reports. Move Beyond Events. Move to Intelligence.",
  "The Data Intelligence Layer Purpose-Built for Aviation",
  "Smarter Safety. Stronger Operations. Better Outcomes.",
  "CoAnalyst: Where Aviation Data Becomes Actionable Intelligence",
  "Stop Managing Events. Start Managing Controls.",
];

const pitches = [
  "CoAnalyst is the aviation data intelligence platform that transforms fragmented safety and operational data into actionable intelligence — helping airlines move from reactive event management to proactive control management. Purpose-built with aviation-trained AI, it delivers precision that generic tools can't match.",
  "Airlines generate thousands of reports across safety, ops, maintenance, and training. CoAnalyst is the intelligence layer that connects, enriches, and analyzes that data — revealing patterns, hazards, and weakening controls so organizations can act before events occur.",
  "Most aviation organizations still manage safety reactively. CoAnalyst changes that by delivering four levels of intelligence — historical, real-time, proactive, and predictive — so airlines can shift from investigating events to managing the controls that prevent them.",
  "Generic AI can summarize a report. CoAnalyst understands aviation operations. Built on millions of historic reports and thousands of domain-specific categories, it's the only intelligence platform purpose-built for aviation data.",
  "CoAnalyst sits above your operational systems as an intelligence layer — enriching, structuring, and analyzing data across every domain. The result: fewer delays, fewer damages, fewer injuries, and stronger operational performance.",
];

const CASlide11Taglines = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-taglines" title="Taglines & Messaging Lines" subtitle="Ready-to-use positioning language" slideNumber={11} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-full">
        {/* Taglines */}
        <div className="bg-card/60 border border-border rounded-xl p-3">
          <h3 className="text-[10px] font-bold text-primary uppercase tracking-wide mb-2">Tagline Options</h3>
          <ol className="space-y-1">
            {taglines.map((t, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-snug">
                <span className="text-[10px] text-primary font-bold mt-0.5 shrink-0">{i + 1}.</span>
                {t}
              </li>
            ))}
          </ol>
        </div>

        {/* Headlines */}
        <div className="bg-card/60 border border-border rounded-xl p-3">
          <h3 className="text-[10px] font-bold text-primary uppercase tracking-wide mb-2">Homepage Headlines</h3>
          <ol className="space-y-1">
            {headlines.map((h, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-snug">
                <span className="text-[10px] text-primary font-bold mt-0.5 shrink-0">{i + 1}.</span>
                {h}
              </li>
            ))}
          </ol>
        </div>

        {/* Elevator pitches */}
        <div className="bg-card/60 border border-border rounded-xl p-3">
          <h3 className="text-[10px] font-bold text-primary uppercase tracking-wide mb-2">Elevator Pitches</h3>
          <div className="space-y-2">
            {pitches.map((p, i) => (
              <div key={i} className="bg-primary/5 border border-primary/20 rounded-lg p-2">
                <p className="text-[10px] text-primary font-bold mb-0.5">Pitch {i + 1}</p>
                <p className="text-[10px] text-muted-foreground leading-snug">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide11Taglines;
