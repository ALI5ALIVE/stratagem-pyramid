import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Target, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { propensityTiers, tier1Signals, whoNotToChaseFirst } from "@/data/week3FieldKit";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const accentMap: Record<string, string> = {
  emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  sky: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  violet: "border-violet-500/40 bg-violet-500/10 text-violet-300",
};

const SEWhoToTarget = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-who-to-target"
    slideNumber={slideNumber}
    title="Who to target — start where we already have permission to talk"
    subtitle="The easiest, fastest, highest-win-rate motion is expanding inside customers who already trust one of the apps. Three tiers, ranked by propensity."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-3 max-w-7xl mx-auto px-4 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {propensityTiers.map((t) => (
          <div key={t.tier} className={`rounded-lg border p-3 flex flex-col gap-2 ${accentMap[t.accent]}`}>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-wider font-semibold">{t.tier}</span>
            </div>
            <div className="text-sm font-semibold text-foreground leading-tight">{t.label}</div>
            <p className="text-[11px] text-foreground/85 leading-snug">{t.who}</p>
            <div className="mt-1 pt-2 border-t border-border/40 space-y-1.5">
              <div>
                <div className="text-[9.5px] uppercase tracking-wider text-muted-foreground">Why high-propensity</div>
                <p className="text-[11px] text-foreground/85 leading-snug">{t.why}</p>
              </div>
              <div>
                <div className="text-[9.5px] uppercase tracking-wider text-muted-foreground">Talk track</div>
                <p className="text-[11px] text-foreground/85 leading-snug italic">{t.talkTrack}</p>
              </div>
              <div>
                <div className="text-[9.5px] uppercase tracking-wider text-muted-foreground">Next step</div>
                <p className="text-[11px] text-foreground leading-snug font-medium">{t.nextStep}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="md:col-span-3 p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
          <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold mb-2">How to spot a Tier 1 today</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
            {tier1Signals.map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-[11.5px] text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 p-3 rounded-lg border border-border/40 bg-muted/20">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" /> What NOT to chase first
          </div>
          <ul className="space-y-1">
            {whoNotToChaseFirst.map((n, i) => (
              <li key={i} className="text-[11px] text-muted-foreground leading-snug">• {n}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-foreground/85 italic">
        Once you've picked the account, here's how the call runs
        <ArrowRight className="h-3.5 w-3.5 text-primary" />
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEWhoToTarget;