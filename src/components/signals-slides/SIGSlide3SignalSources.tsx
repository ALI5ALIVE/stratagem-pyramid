import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { signalSources } from "@/data/signalsPlaybook";
import { BookCheck, AlertTriangle, GitBranch, Globe2 } from "lucide-react";

const iconMap = {
  "Regulation Signals": BookCheck,
  "Anomalies": AlertTriangle,
  "Operational Change Requests": GitBranch,
  "Micro, Macro & Geopolitical Influences": Globe2,
};

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  sky: { text: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/30" },
  amber: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  violet: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
};

const SIGSlide3SignalSources = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="sig-sources"
      title="Where signals come from"
      subtitle="Signals live across four very different worlds — regulation, anomalies, operational change, and the world outside. Most operators see them in silos. We connect them."
      slideNumber={3}
      {...props}
    >
      <div className="h-full flex flex-col gap-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {signalSources.map((src) => {
            const Icon = iconMap[src.domain as keyof typeof iconMap];
            const c = colorMap[src.color];
            return (
              <div key={src.domain} className={`p-5 rounded-xl border ${c.border} ${c.bg} flex flex-col`}>
                <Icon className={`h-7 w-7 ${c.text} mb-3`} />
                <h4 className={`text-lg font-semibold ${c.text} mb-3`}>{src.domain}</h4>
                <ul className="space-y-2 flex-1">
                  {src.examples.map((ex) => (
                    <li key={ex} className="text-sm text-foreground flex items-start gap-2">
                      <span className={`mt-1.5 h-1 w-1 rounded-full ${c.text.replace("text-", "bg-")} shrink-0`} />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-lg border border-border bg-card/60">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-semibold">The unlock:</span> a regulation change should rewrite a
            manual. An anomaly should trigger an investigation and a training nudge. An operational change request
            should re-baseline both. A geopolitical shift should re-plan the schedule before the day starts.{" "}
            <span className="text-primary">DTOP</span> is how that actually happens.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SIGSlide3SignalSources;