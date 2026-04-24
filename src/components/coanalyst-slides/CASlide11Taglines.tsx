import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

const taglines = [
  "From Reports to Intelligence. From Events to Control.",
  "The Intelligence Layer That Powers the Platform.",
  "See What Your Data Has Been Trying to Tell You.",
  "Detect. Trigger. Orchestrate. Prove.",
  "Stop Processing Reports. Start Preventing Events.",
  "Safety, Content, Training — Connected by Intelligence.",
  "Intelligence That Flies Ahead of Risk.",
  "Know Before It Happens.",
  "From Fragmented Data to Unified Intelligence.",
  "The Shift from Reactive to Proactive Starts Here.",
];

const headlines = [
  "Turn Aviation Data into Operational Intelligence",
  "The Intelligence Layer for Proactive Aviation Operations",
  "From Reactive Reporting to Predictive Control Management",
  "Aviation-Trained AI That Understands Your Operations",
  "See Patterns. Detect Hazards. Manage Controls. Protect Performance.",
  "Move Beyond Reports. Move Beyond Events. Move to Intelligence.",
  "The Intelligence Engine Behind the Operational Performance Platform",
  "Smarter Safety. Stronger Operations. Better Outcomes.",
  "CoAnalyst: Where Aviation Data Becomes Actionable Intelligence",
  "Stop Managing Events. Start Managing Controls.",
];

const pitches = [
  "CoAnalyst is the intelligence layer of the Operational Performance Platform that transforms fragmented safety and operational data into actionable intelligence — helping airlines move from reactive event management to proactive control management. Purpose-built with aviation-trained AI, it delivers precision that generic tools can't match.",
  "Airlines generate thousands of reports across safety, ops, maintenance, and training. CoAnalyst sits above SafetyManager365, ContentManager365 and TrainingManager365, connecting, enriching, and analyzing that data — revealing patterns, hazards, and weakening controls so organizations can act before events occur.",
  "Most aviation organizations still manage safety reactively. CoAnalyst changes that by delivering four levels of intelligence — historical, real-time, proactive, and predictive — powering the DTOP model so airlines can shift from investigating events to managing the controls that prevent them.",
  "Generic AI can summarize a report. CoAnalyst understands aviation operations. Built on millions of historic reports and thousands of domain-specific categories, it's the intelligence engine that makes the Operational Performance Platform intelligent.",
  "CoAnalyst sits above SafetyManager365, ContentManager365 and TrainingManager365 as the intelligence layer — enriching, structuring, and analyzing data across every domain. The result: fewer delays, fewer damages, fewer injuries, and stronger operational performance.",
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
