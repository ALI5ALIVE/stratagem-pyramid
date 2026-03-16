import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Brain, Target, Zap, Clock } from "lucide-react";

const CASlide1ExecutiveSummary = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-exec-summary" title="Executive Summary" subtitle="Category definition, positioning, and strategic rationale" slideNumber={1} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left — Positioning */}
        <div className="space-y-5">
          <div className="bg-card/60 border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Category</h3>
            </div>
            <p className="text-2xl font-display font-bold text-primary">Aviation Data Intelligence</p>
          </div>

          <div className="bg-card/60 border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">One-Line Positioning</h3>
            </div>
            <p className="text-foreground text-base leading-relaxed">
              CoAnalyst transforms aviation data into operational intelligence, enabling airlines to move from reactive event management to proactive control management.
            </p>
          </div>

          <div className="bg-card/60 border border-border rounded-xl p-5">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Expanded Positioning</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              CoAnalyst is a purpose-built aviation data intelligence platform that ingests, enriches, and analyzes safety and operational data across domains. It delivers four levels of intelligence — historical, real-time, proactive, and predictive — enabling organizations to identify patterns, detect weakening controls, and shift from managing events after they occur to managing the controls that prevent them.
            </p>
          </div>
        </div>

        {/* Right — Value & Why Now */}
        <div className="space-y-5">
          <div className="bg-card/60 border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Core Business Value</h3>
            </div>
            <ul className="space-y-2">
              {[
                "Fewer delays, damages, and injuries through proactive hazard detection",
                "Stronger operational reliability via continuous control monitoring",
                "Faster, higher-quality investigations with AI-enriched data",
                "Revenue protection through operational performance improvement",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide">Why This Matters Now</h3>
            </div>
            <ul className="space-y-2">
              {[
                "Regulators are shifting from compliance checks to performance-based oversight",
                "Generic AI tools create a false sense of capability — airlines need aviation-specific precision",
                "Data volumes are growing faster than analyst capacity",
                "The industry is moving from reactive reporting to predictive intelligence",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide1ExecutiveSummary;
