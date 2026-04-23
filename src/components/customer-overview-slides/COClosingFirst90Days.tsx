import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Compass, Rocket, TrendingUp, Calendar, ArrowRight } from "lucide-react";

interface COClosingProps extends SlideNarrationProps {
  slideNumber?: number;
}

const phases = [
  {
    days: "Days 1–30",
    title: "Discovery Workshop",
    icon: Compass,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    bullets: [
      "Pick one high-cost use case together",
      "Baseline today's cost and recurrence rate",
      "Map the signal-to-action gap in your operation",
    ],
    outcome: "A shared, measurable starting point.",
  },
  {
    days: "Days 31–60",
    title: "Pilot",
    icon: Rocket,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
    bullets: [
      "Deploy the connected loop on the chosen use case",
      "Detect → Trigger → Orchestrate → Prove in production",
      "Weekly check-ins, no big-bang rollout",
    ],
    outcome: "Early signal, early proof.",
  },
  {
    days: "Days 61–90",
    title: "Prove & Expand",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    bullets: [
      "Present measured outcomes against baseline",
      "Define the next two use cases to onboard",
      "Agree the rollout plan and success metrics",
    ],
    outcome: "Proof in hand. Roadmap agreed.",
  },
];

const COClosingFirst90Days = ({ slideNumber, ...narration }: COClosingProps) => {
  return (
    <PitchSlideContainer
      id="co-closing-90-days"
      title="Your first 90 days with us"
      subtitle="Let's start with one use case — and prove the platform on your numbers."
      slideNumber={slideNumber}
      {...narration}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.days}
                className={`relative bg-card border ${phase.border} rounded-xl p-6 flex flex-col`}
              >
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-background border border-border text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">
                  Step {idx + 1}
                </div>

                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className={`w-10 h-10 rounded-lg ${phase.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${phase.color}`} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {phase.days}
                    </p>
                    <h3 className={`text-lg font-semibold ${phase.color}`}>{phase.title}</h3>
                  </div>
                </div>

                <ul className="space-y-2 mb-4 flex-1">
                  {phase.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/90 leading-snug">
                      <span className={`w-1.5 h-1.5 rounded-full ${phase.bg.replace("/10", "")} mt-1.5 shrink-0`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground italic">{phase.outcome}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Single CTA */}
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-accent/10 border border-primary/40 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Book a 60-minute discovery workshop</p>
              <p className="text-sm text-muted-foreground">
                One use case. One baseline. One clear path to measurable performance.
              </p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shrink-0">
            Schedule workshop
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </PitchSlideContainer>
  );
};

export default COClosingFirst90Days;