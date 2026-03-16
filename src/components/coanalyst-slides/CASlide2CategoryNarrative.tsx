import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { AlertTriangle, ArrowRight, Shield } from "lucide-react";

const CASlide2CategoryNarrative = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-category-narrative" title="Category & Market Narrative" subtitle="Why the industry needs a new category of intelligence" slideNumber={2} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-full">
        {/* Problem */}
        <div className="bg-card/60 border border-border rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">The Market Problem</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Most aviation organizations still manage safety and operations reactively. An event happens, a report is filed, analysts investigate, action is taken afterwards.
          </p>
          <div className="space-y-2 mt-auto">
            {["Data is siloed across safety, ops, maintenance, and training", "Analysts are overwhelmed by volume, not empowered by insight", "Reporting systems capture events but don't surface intelligence", "Generic AI lacks aviation precision and domain understanding"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* The Shift */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-6">The Industry Shift</h3>
          <div className="space-y-4">
            <div className="bg-card/80 border border-border rounded-lg px-4 py-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">From</p>
              <p className="text-sm font-semibold text-foreground">Reactive Event Management</p>
              <p className="text-xs text-muted-foreground mt-1">Investigate after it happens</p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary mx-auto" />
            <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-3">
              <p className="text-xs text-primary uppercase tracking-wide mb-1">To</p>
              <p className="text-sm font-semibold text-primary">Proactive Control Management</p>
              <p className="text-xs text-foreground mt-1">Manage controls before events occur</p>
            </div>
          </div>
        </div>

        {/* Missing Layer */}
        <div className="bg-card/60 border border-border rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">The Missing Layer</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Current systems execute workflows. They capture, route, and close reports. But no system transforms that data into intelligence.
          </p>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mt-auto">
            <p className="text-sm font-semibold text-emerald-400 mb-2">What's needed:</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              An intelligence layer that sits above operational systems — enriching, structuring, analyzing, and activating data to identify patterns, hazards, correlations, and weakening controls before events occur.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide2CategoryNarrative;
