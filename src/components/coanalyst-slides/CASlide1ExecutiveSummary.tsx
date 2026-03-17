import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Brain, Target, Zap, Clock, BarChart3 } from "lucide-react";

const proofPoints = [
  { metric: "4,000+", label: "Aviation event categories across 5 classification levels" },
  { metric: "90%", label: "Event detection accuracy with hybrid AI models" },
  { metric: "3×", label: "More precise than any competing model at granular categorization" },
  { metric: "90%+", label: "Time saved in report processing (weeks → hours)" },
];

const CASlide1ExecutiveSummary = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-exec-summary" title="Executive Summary" subtitle="CoAnalyst within the Operational Performance Platform" slideNumber={1} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        {/* Left — Positioning */}
        <div className="space-y-3">
          <div className="bg-card/60 border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">Role</h3>
            </div>
            <p className="text-xl font-display font-bold text-primary">The Intelligence Layer</p>
            <p className="text-[11px] text-muted-foreground mt-1">Sits above Safety, Content, and Training Manager 365 — enriching and activating data across all three modules via the DTOP model.</p>
          </div>

          <div className="bg-card/60 border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">Positioning</h3>
            </div>
            <p className="text-foreground text-sm leading-relaxed">
              CoAnalyst transforms aviation data into operational intelligence, enabling airlines to move from <span className="text-primary font-semibold">reactive event management</span> to <span className="text-primary font-semibold">proactive control management</span>.
            </p>
          </div>

          <div className="bg-card/60 border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">Core Business Value</h3>
            </div>
            <ul className="space-y-1">
              {[
                "Fewer delays, damages, and injuries through proactive hazard detection",
                "Stronger operational reliability via continuous control monitoring",
                "Faster, higher-quality investigations with AI-enriched data",
                "Revenue protection through operational performance improvement",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — Proof Points & Why Now */}
        <div className="space-y-3">
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold text-primary uppercase tracking-wide">Proof Points</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {proofPoints.map((p, i) => (
                <div key={i} className="bg-card/60 border border-border rounded-lg p-2.5">
                  <p className="text-lg font-display font-bold text-primary">{p.metric}</p>
                  <p className="text-[10px] text-muted-foreground leading-snug">{p.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card/60 border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">Why This Matters Now</h3>
            </div>
            <ul className="space-y-1">
              {[
                "Regulators shifting from compliance checks to performance-based oversight",
                "Airlines exploring generic AI (Claude, ChatGPT) on their data — creating false confidence",
                "Data volumes growing faster than analyst capacity across all domains",
                "Industry moving from reactive reporting to predictive intelligence",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
            <p className="text-[11px] text-foreground italic leading-relaxed">
              "What took us an entire week to analyze reporting data now takes us a couple of hours."
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">— Head of Flight Operations, Major US Carrier (IATA Webinar)</p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide1ExecutiveSummary;
