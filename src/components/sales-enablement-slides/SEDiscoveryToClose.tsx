import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Search, MonitorPlay, HandshakeIcon, HelpCircle } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const stages = [
  {
    icon: Search,
    accent: "text-sky-400 border-sky-500/40 bg-sky-500/10",
    stage: "Discovery",
    plain:
      "Find the disconnected loop. Where does a signal land today, and how long until anything changes for the crew?",
    question: "Walk me through the last safety event — what changed in your manuals or training because of it?",
  },
  {
    icon: MonitorPlay,
    accent: "text-violet-400 border-violet-500/40 bg-violet-500/10",
    stage: "Demo",
    plain:
      "Show the loop close. One signal → procedure update → training assignment → proof — in under 10 minutes, on their data shape.",
    question: "If we showed you that loop closing in your operation, what would unblock?",
  },
  {
    icon: HandshakeIcon,
    accent: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    stage: "Close",
    plain:
      "Scope a 90-day pilot around their highest-cost use case. Outcome-based, with a defined Prove milestone — not a feature checklist.",
    question: "What outcome would make a 90-day pilot a clear yes for your board?",
  },
];

const SEDiscoveryToClose = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-discovery-to-close"
    slideNumber={slideNumber}
    title="Discovery → Demo → Close"
    subtitle="The three-stage motion in plain English. One thing to say. One thing to ask. Per stage."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-3 max-w-7xl mx-auto px-4 pt-4">
      {stages.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={i} className={`grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-lg border ${s.accent}`}>
            <div className="md:col-span-2 flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <span className="text-sm font-semibold">{s.stage}</span>
            </div>
            <div className="md:col-span-6">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Say this</div>
              <p className="text-sm text-foreground leading-relaxed">{s.plain}</p>
            </div>
            <div className="md:col-span-4 md:border-l md:border-border/40 md:pl-3">
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-foreground mb-1">
                <HelpCircle className="h-3 w-3" />
                <span>Discovery question</span>
              </div>
              <p className="text-sm text-foreground italic leading-relaxed">"{s.question}"</p>
            </div>
          </div>
        );
      })}
    </div>
  </PitchSlideContainer>
);

export default SEDiscoveryToClose;