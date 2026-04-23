import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Boxes, Database, Brain, Smartphone, Workflow, HelpCircle } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const rows = [
  {
    layer: "Layer 1 — Core Apps",
    icon: Boxes,
    accent: "text-blue-400",
    plain: "The three apps your customer probably already owns versions of: Content, Safety, Training. Ours are best-in-class — but the magic is they share data.",
    question: "Which of Safety, Content, and Training do you run today, and how connected are they really?",
  },
  {
    layer: "Layer 2 — Operational Data Foundation",
    icon: Database,
    accent: "text-cyan-400",
    plain: "One unified data lake under the apps. No exports, no spreadsheets, no reconciliation. Every layer above reasons over the same truth.",
    question: "How long does it take to answer a cross-system question — like 'did training fix this risk'?",
  },
  {
    layer: "Layer 3 — Intelligence (CoAnalyst)",
    icon: Brain,
    accent: "text-violet-400",
    plain: "AI that turns operational data into insights, recommendations, and automated actions. Not a chatbot — an analyst that lives inside your operation.",
    question: "Who in your team spends the most time pulling reports that should already exist?",
  },
  {
    layer: "Layer 4 — Unified Mobile",
    icon: Smartphone,
    accent: "text-amber-400",
    plain: "One app for the frontline. Content, training, safety reporting — same shell, same login. The crew uses it every shift.",
    question: "How many separate apps does your frontline juggle today?",
  },
  {
    layer: "Layer 5 — DTOP",
    icon: Workflow,
    accent: "text-emerald-400",
    plain: "Detect → Trigger → Orchestrate → Prove. The operating model that wraps everything. The way of working that makes the platform actually work.",
    question: "When a safety signal lands today, how long until a procedure or training change reaches the crew — and how do you prove it worked?",
  },
];

const SELayerTalkTrack = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-layer-talktrack"
    slideNumber={slideNumber}
    title="How to talk about each layer"
    subtitle="One plain-English line per layer + the one discovery question to ask."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-2 max-w-7xl mx-auto px-4 pt-4">
      {rows.map((r, i) => {
        const Icon = r.icon;
        return (
          <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 rounded-lg border border-border bg-card items-start">
            <div className="md:col-span-3 flex items-center gap-2">
              <Icon className={`h-4 w-4 ${r.accent}`} />
              <span className={`text-xs font-semibold ${r.accent}`}>{r.layer}</span>
            </div>
            <div className="md:col-span-5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Plain English</div>
              <p className="text-xs text-foreground leading-relaxed">{r.plain}</p>
            </div>
            <div className="md:col-span-4 md:border-l md:border-border md:pl-3">
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary mb-1">
                <HelpCircle className="h-3 w-3" />
                <span>Discovery question</span>
              </div>
              <p className="text-xs text-foreground italic leading-relaxed">"{r.question}"</p>
            </div>
          </div>
        );
      })}
    </div>
  </PitchSlideContainer>
);

export default SELayerTalkTrack;