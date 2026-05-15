import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const rungs = [
  {
    label: "1 app",
    pct: 25,
    color: "bg-emerald-500/60",
    cost: "Foundation in one lane + platform capabilities confined to that lane",
    risk: "Reactive in the other two lanes",
    sight: "No line-of-sight across functions",
  },
  {
    label: "2 apps",
    pct: 55,
    color: "bg-amber-500/60",
    cost: "Half-loop + platform capabilities across two lanes",
    risk: "Trigger or Orchestrate breaks at the missing app",
    sight: "Partial line-of-sight; audits still need stitching",
  },
  {
    label: "3 apps",
    pct: 75,
    color: "bg-violet-500/60",
    cost: "DTOP loop closed + platform capabilities across all three lanes",
    risk: "Repeat-event rate falls; targeted retraining lands",
    sight: "Single line-of-sight from frontline to boardroom",
  },
  {
    label: "3 apps + Intelligence layer",
    pct: 100,
    color: "bg-primary",
    cost: "Loop closes and learns — cross-lane reasoning, recommendations, automated orchestration",
    risk: "Predictive risk surfacing, not just reactive logging",
    sight: "Real-time, evidence-attached decisions",
  },
];

const SEFootprintValueLadder = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-footprint-ladder"
    slideNumber={slideNumber}
    title="Value captured vs value left on the table"
    subtitle="Platform value compounds — it does not add. Each rung unlocks the one above it. Numbers are directional, not contractual."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-4 max-w-7xl mx-auto px-4 pt-2">
      <div className="space-y-3">
        {rungs.map((r) => (
          <div key={r.label} className="rounded-lg border border-border/40 bg-card/40 p-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-44 shrink-0 text-xs font-semibold text-foreground">{r.label}</div>
              <div className="flex-1 h-3 bg-muted/30 rounded-full overflow-hidden">
                <div className={`h-full ${r.color}`} style={{ width: `${r.pct}%` }} />
              </div>
              <div className="w-12 text-right text-xs font-semibold text-foreground">~{r.pct}%</div>
            </div>
            <div className="grid grid-cols-3 gap-2 pl-44">
              <div>
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">Controllable cost</div>
                <p className="text-[11px] text-foreground leading-snug">{r.cost}</p>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">Systemic risk</div>
                <p className="text-[11px] text-foreground leading-snug">{r.risk}</p>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">Line-of-sight</div>
                <p className="text-[11px] text-foreground leading-snug">{r.sight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-primary/40 bg-primary/10 p-3">
        <div className="text-[10px] uppercase tracking-wider text-primary mb-1">Coach line</div>
        <p className="text-sm text-foreground italic">
          "Never present this as 'you're missing X percent.' Present it as 'here's the loop you can't close yet — and here's what closing it is worth to you.'"
        </p>
      </div>

      <p className="text-[10px] text-muted-foreground text-center">
        Percentages are directional sales modelling, not contractual commitments. Customer-specific value is modelled in Line-of-Sight before any commercial conversation.
      </p>
    </div>
  </PitchSlideContainer>
);

export default SEFootprintValueLadder;