import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { HelpCircle, Sparkles } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const scenarios = [
  {
    title: "Safety + Content",
    missing: "TrainingManager365",
    accent: "border-emerald-500/40 bg-emerald-500/5",
    chip: "text-emerald-300 bg-emerald-500/15 border-emerald-500/40",
    has: "Safety signals can drive procedure changes. Content is the procedural source of truth.",
    confined: "CoAnalyst, Insights and Automation operate across signals and procedures. The training lane is dark — no targeted retraining, no competency evidence.",
    halfLoop: "Detect → Trigger → Orchestrate (content). The Orchestrate step stops at the manual — humans still aren't being retrained on the change.",
    questions: [
      "When a procedure changes because of a safety signal, how is targeted retraining assigned today?",
      "Can you prove a regulator that the affected crews are competent on the new procedure — not just notified?",
      "How much of your training spend is decoupled from the actual procedure changes you make?",
    ],
    leftOnTable: "Procedures change, behaviour doesn't. Repeat events stay repeat events.",
  },
  {
    title: "Safety + Training",
    missing: "ContentManager365",
    accent: "border-violet-500/40 bg-violet-500/5",
    chip: "text-violet-300 bg-violet-500/15 border-violet-500/40",
    has: "Safety signals can trigger targeted retraining. Competency is evidenced.",
    confined: "CoAnalyst, Insights and Automation operate across signals and competency. Procedures stay static — intelligence can't update the manual.",
    halfLoop: "Detect → Trigger → Orchestrate (training). The procedure itself never updates — you're retraining on stale content.",
    questions: [
      "When a safety signal exposes a procedural weakness, who updates the manual — and how long does it take?",
      "How do you make sure the training and the procedure are saying the same thing on the same day?",
      "When a regulator changes a rule, how do you trace it from rule → procedure → training → evidence?",
    ],
    leftOnTable: "Training drifts ahead of content — or content drifts ahead of training. Either way, audits get awkward.",
  },
  {
    title: "Content + Training",
    missing: "SafetyManager365",
    accent: "border-amber-500/40 bg-amber-500/5",
    chip: "text-amber-300 bg-amber-500/15 border-amber-500/40",
    has: "Procedure-to-training is connected. Regulation changes can flow to crews with proof of training.",
    confined: "CoAnalyst, Insights and Automation operate across procedures and competency. The signal layer is missing — intelligence has nothing operational to react to.",
    halfLoop: "Trigger → Orchestrate → Prove. Detect is missing — there's no operational signal layer driving what should change in the first place.",
    questions: [
      "What triggers a procedure or training change today — is it ever an operational safety signal, or always a regulator or incident?",
      "Where do safety reports, flight data signals, and crew-reported events live — and who reads them?",
      "How would you know an emerging risk pattern existed before it became an incident?",
    ],
    leftOnTable: "You're managing change, not preventing it. The whole system stays reactive.",
  },
];

const SEFootprintTwoApps = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-footprint-two"
    slideNumber={slideNumber}
    title="They have TWO apps — sell the close of the loop"
    subtitle="Two apps gets you a half-loop — and platform capabilities work across both lanes. The third closes the loop and widens the lane to all three."
    showHeader
    {...narrationProps}
  >
    <div className="h-full grid grid-cols-3 gap-3 max-w-7xl mx-auto px-4 pt-2">
      {scenarios.map((s) => (
        <div key={s.title} className={`rounded-lg border ${s.accent} p-3 flex flex-col gap-2`}>
          <div className="flex items-center justify-between gap-2">
            <div className={`px-2 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wider ${s.chip}`}>
              {s.title}
            </div>
            <div className="text-[10px] text-rose-300">missing: <span className="font-semibold">{s.missing}</span></div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Value captured today</div>
            <p className="text-xs text-foreground leading-snug">{s.has}</p>
          </div>
          <div className="rounded border border-primary/30 bg-primary/5 p-2">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary mb-0.5">
              <Sparkles className="h-3 w-3" />
              Platform capabilities — across these two lanes
            </div>
            <p className="text-[11px] text-foreground leading-snug">{s.confined}</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-rose-400 mb-0.5">Where the loop breaks</div>
            <p className="text-xs text-foreground leading-snug">{s.halfLoop}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary mb-1">
              <HelpCircle className="h-3 w-3" />
              Discovery questions for the missing third
            </div>
            <ul className="space-y-1">
              {s.questions.map((q, i) => (
                <li key={i} className="text-[11px] text-foreground italic leading-snug">"{q}"</li>
              ))}
            </ul>
          </div>
          <div className="mt-auto rounded border border-rose-500/30 bg-rose-500/10 p-2">
            <div className="text-[10px] uppercase tracking-wider text-rose-300 mb-0.5">Left on the table</div>
            <p className="text-[11px] text-foreground leading-snug">{s.leftOnTable}</p>
          </div>
        </div>
      ))}
    </div>
  </PitchSlideContainer>
);

export default SEFootprintTwoApps;