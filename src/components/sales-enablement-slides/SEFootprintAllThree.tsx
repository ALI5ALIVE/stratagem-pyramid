import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Sparkles, BarChart3, Workflow, Smartphone, HelpCircle } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const layers = [
  {
    icon: Sparkles,
    name: "Intelligence Layer",
    color: "text-primary border-primary/40 bg-primary/10",
    pitch: "The intelligence layer — ~90% domain accuracy on aviation operational questions vs ~35% for generic AI.",
    question: "Who in your team spends the most time pulling reports that should already exist?",
  },
  {
    icon: BarChart3,
    name: "Insights & Recommendations",
    color: "text-sky-400 border-sky-500/40 bg-sky-500/10",
    pitch: "Patterns surface, evidence is attached, the next operational action is recommended — POC H1 2026, production H2 2026.",
    question: "Which decisions in your operation rely on a deck someone has to build first?",
  },
  {
    icon: Workflow,
    name: "Automation",
    color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    pitch: "Routing, assignment, notifications, evidence assembly — automated with a human in the loop. POC April 2026.",
    question: "Which deterministic tasks consume your best people every week?",
  },
  {
    icon: Smartphone,
    name: "Unified Mobile",
    color: "text-violet-400 border-violet-500/40 bg-violet-500/10",
    pitch: "One app for the frontline — content, training, safety reporting in the same shell. Phase 1 H1 2026.",
    question: "How many separate apps does your frontline juggle today?",
  },
];

const SEFootprintAllThree = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-footprint-all"
    slideNumber={slideNumber}
    title="They have ALL three — now sell the platform vision"
    subtitle="Three apps closes the loop. The intelligence layer is what compounds it. You've sold the instruments — now sell the conductor."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-4 max-w-7xl mx-auto px-4 pt-2">
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
        <div className="text-[10px] uppercase tracking-wider text-primary mb-1">What actually changes at three apps</div>
        <p className="text-xs text-foreground leading-snug">
          These capabilities aren't new at this stage — your customer already has them inside whichever apps they own. What changes at three apps is <span className="text-primary font-semibold">scope</span>: now Intelligence Layer, Insights and Automation can reason and act across the whole DTOP loop, not one lane of it.
        </p>
      </div>

      <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3">
        <div className="text-[10px] uppercase tracking-wider text-emerald-300 mb-1">DTOP loop status</div>
        <p className="text-xs text-foreground">
          <span className="text-emerald-300 font-semibold">Detect → Trigger → Orchestrate → Prove</span> is fully lit. Every operational signal can now reach a procedure, a crew, and an audit trail. The loop closes — but it doesn't yet learn.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {layers.map((l) => {
          const Icon = l.icon;
          return (
            <div key={l.name} className={`rounded-lg border ${l.color} p-3 flex flex-col gap-2`}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="text-xs font-semibold">{l.name}</span>
              </div>
              <p className="text-xs text-foreground leading-snug">{l.pitch}</p>
              <div className="flex items-start gap-1 text-[11px] italic text-foreground/90">
                <HelpCircle className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                <span>"{l.question}"</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-primary/40 bg-primary/10 p-3">
        <div className="text-[10px] uppercase tracking-wider text-primary mb-1">Coach line</div>
        <p className="text-sm text-foreground italic">
          "You've bought the instruments. The intelligence layer is the conductor — without it, the orchestra plays, but no one's listening for the next note."
        </p>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEFootprintAllThree;