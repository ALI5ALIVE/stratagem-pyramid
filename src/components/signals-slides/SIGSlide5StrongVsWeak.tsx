import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { strongVsWeak } from "@/data/signalsPlaybook";
import { Activity, TrendingUp } from "lucide-react";

const SIGSlide5StrongVsWeak = (props: SlideNarrationProps) => {
  const weak = strongVsWeak.filter((s) => s.type === "Weak");
  const strong = strongVsWeak.filter((s) => s.type === "Strong");

  return (
    <SlideContainer
      id="sig-strength"
      title="Strong signals vs weak signals"
      subtitle="Strong signals are obvious — and usually too late. The competitive advantage is in detecting weak signals before they harden into events."
      slideNumber={5}
      {...props}
    >
      <div className="h-full grid grid-cols-2 gap-5">
        <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-amber-400">Weak signals</h3>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
              Where the next event hides
            </span>
          </div>
          <p className="text-sm text-foreground/80 mb-4">
            Single reports, ambiguous wording, isolated anomalies. Easy to ignore. Hard to find without an intelligence layer.
          </p>
          <div className="space-y-3 flex-1">
            {weak.map((s, i) => (
              <div key={i} className="p-3 rounded-lg border border-border bg-card">
                <p className="text-sm text-foreground mb-1">{s.example}</p>
                <p className="text-xs text-amber-400/80 leading-relaxed">{s.whyMatters}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-emerald-400">Strong signals</h3>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
              Demand orchestrated response
            </span>
          </div>
          <p className="text-sm text-foreground/80 mb-4">
            Trends, threshold breaches, regulatory changes. Obvious — but only valuable if you can act with proof.
          </p>
          <div className="space-y-3 flex-1">
            {strong.map((s, i) => (
              <div key={i} className="p-3 rounded-lg border border-border bg-card">
                <p className="text-sm text-foreground mb-1">{s.example}</p>
                <p className="text-xs text-emerald-400/80 leading-relaxed">{s.whyMatters}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SIGSlide5StrongVsWeak;