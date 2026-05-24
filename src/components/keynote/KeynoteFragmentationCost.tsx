import { TrendingDown, AlertTriangle, Info } from "lucide-react";
import { useCases, methodologyNote, sourceCitations } from "@/data/lineOfSightData";
import { todayEvidence } from "@/data/silosToSignalsScript";
import StatSourceChip from "@/components/shared/StatSourceChip";

function formatCost(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

/**
 * Sourced evidence wall threaded between the Silo Era and Research acts.
 * Re-uses Line-of-Sight use case costs and the OpsSlide2 citation stack.
 */
export default function KeynoteFragmentationCost() {
  const costData = useCases
    .map((uc) => ({
      id: uc.id,
      label: uc.label,
      annualCost: uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor,
      source: sourceCitations[uc.id] ?? methodologyNote,
    }))
    .sort((a, b) => b.annualCost - a.annualCost)
    .slice(0, 4);

  const maxCost = costData[0]?.annualCost || 1;

  return (
    <section
      id="cost-of-fragmentation"
      className="scroll-mt-24 border-t border-border/60 bg-card/20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-amber-400">
              <TrendingDown className="h-3 w-3" /> Where customers are today
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight max-w-3xl">
              The cost of fragmentation, in numbers customers recognise.
            </h2>
          </div>
          <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
            Every stat below is sourced. Each one anchors a beat in the silo-era act — so the room
            sees evidence, not adjectives, before the research findings land.
          </p>
        </div>

        {/* Headline evidence cluster */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {todayEvidence.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col p-4 rounded-xl border border-border bg-card"
            >
              <span className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
                {stat.value}
              </span>
              <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground leading-snug">
                {stat.label}
              </span>
              <div className="mt-3">
                <StatSourceChip source={stat.source} label="Source" />
              </div>
            </div>
          ))}
        </div>

        {/* Top cost drivers from the LoS model */}
        <div className="rounded-xl border border-border bg-card/50 p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.22em] flex items-center gap-2 mb-5">
            <TrendingDown className="h-4 w-4" />
            Top cost drivers — annual impact (mid-size carrier baseline)
          </h3>
          <div className="space-y-4">
            {costData.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex justify-between items-baseline gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-medium text-foreground truncate">{item.label}</span>
                    <StatSourceChip source={item.source} label="Source" />
                  </div>
                  <span className="text-sm font-bold text-amber-400 shrink-0">
                    {formatCost(item.annualCost)}/yr
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500/60 to-amber-400/80"
                    style={{ width: `${(item.annualCost / maxCost) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk compound + methodology */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-red-400">Risk compounds.</span>{" "}
              A single unlinked event cascades into delayed investigations, repeated incidents and
              audit findings — multiplying the cost of every missed signal.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/40 p-4 flex items-start gap-3">
            <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
              {methodologyNote} Cost-driver figures are computed from the Line-of-Sight model at
              baseline volumes; presented as illustrative annual envelopes, not measured P&amp;L.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}