import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { AlertTriangle, ArrowRight, Shield } from "lucide-react";

const dataTypes = [
  "Safety reports", "Injury reports", "Damage reports", "Fatigue reports",
  "Flight crew reports", "Service reports", "Maintenance events", "Ground operations",
];

const CASlide2CategoryNarrative = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-category-narrative" title="The Intelligence Gap" subtitle="Why operational modules alone aren't enough" slideNumber={2} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        {/* Problem */}
        <div className="bg-card/60 border border-border rounded-xl p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">The Market Problem</h3>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
            Aviation organizations still manage safety and operations reactively. An event happens, a report is filed, analysts investigate, action is taken afterwards. Data is siloed across domains that were never designed to talk to each other.
          </p>
          <div className="space-y-1.5">
            {["Data siloed across flight safety, ops, maintenance, cabin, ground", "Analysts overwhelmed by volume — not empowered by insight", "Competitors bolt on basic AI features and call it 'intelligence'", "Generic LLMs get 30–40% accuracy at granular aviation categorization"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px] text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-auto pt-3">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5">Data types CoAnalyst processes</p>
            <div className="flex flex-wrap gap-1">
              {dataTypes.map((t, i) => (
                <span key={i} className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded px-1.5 py-0.5">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* The Shift */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <h3 className="text-xs font-bold text-primary uppercase tracking-wide mb-5">The Industry Shift</h3>
          <div className="space-y-3">
            <div className="bg-card/80 border border-border rounded-lg px-4 py-2.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">From</p>
              <p className="text-sm font-semibold text-foreground">Critical Event Management</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Chase events after they happen</p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary mx-auto" />
            <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2.5">
              <p className="text-[10px] text-primary uppercase tracking-wide mb-0.5">To</p>
              <p className="text-sm font-semibold text-primary">Critical Control Management</p>
              <p className="text-[10px] text-foreground mt-0.5">Manage controls before events occur</p>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-4 max-w-[220px]">
            Understand which controls are performing and which need to change — before failures happen.
          </p>
        </div>

        {/* Missing Layer */}
        <div className="bg-card/60 border border-border rounded-xl p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">The Missing Layer</h3>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
            Current systems execute workflows — they capture, route, and close reports. No system transforms that data into intelligence. What's needed is an intelligence layer that sits above these operational modules.
          </p>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 mt-auto">
            <p className="text-[11px] font-semibold text-emerald-400 mb-1.5">CoAnalyst fills this gap:</p>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              The intelligence layer that sits above Safety, Content, and Training Manager 365 — enriching data and driving the Detect → Trigger → Orchestrate → Prove model across safety, ops, maintenance, training, and crew.
            </p>
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Operational domains covered</p>
            {["Flight Safety", "Flight Operations", "Cabin Operations", "Ground Operations", "Maintenance & Engineering"].map((d, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px] text-foreground">
                <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide2CategoryNarrative;
