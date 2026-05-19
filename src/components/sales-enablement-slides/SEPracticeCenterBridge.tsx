import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { practiceScenarios } from "@/data/practiceScenarios";
import { Mic, ArrowRight } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

// Featured scenarios mapped to the personas Week 3 just taught.
const featuredIds = [
  "exec-medium-vp-safety",
  "exec-medium-vp-ops",
  "exec-medium-cio",
];

const SEPracticeCenterBridge = ({ slideNumber, ...narrationProps }: Props) => {
  const featured = featuredIds
    .map((id) => practiceScenarios.find((s) => s.id === id))
    .filter(Boolean) as typeof practiceScenarios;

  return (
    <PitchSlideContainer
      id="se-practice-center-bridge"
      slideNumber={slideNumber}
      title="Practice — before you walk into a real call"
      subtitle="Three Week 3 role-plays. Voice-driven, scored, repeatable. Run each one until you can book the next step without thinking."
      showHeader
      {...narrationProps}
    >
      <div className="h-full flex flex-col gap-4 max-w-7xl mx-auto px-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {featured.map((s) => (
            <div key={s.id} className="rounded-lg border border-primary/30 bg-primary/5 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-primary">{s.buyerLabel}</span>
              </div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.lens}</div>
              <p className="text-xs text-foreground/85 leading-snug">{s.setup}</p>
              <div className="mt-auto pt-2 border-t border-border/40">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Key messages to land</div>
                <ul className="space-y-0.5">
                  {s.keyMessages.slice(0, 3).map((m, i) => (
                    <li key={i} className="text-[10.5px] text-foreground/80 leading-snug flex gap-1">
                      <span className="opacity-50">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <a
          href="/practice-center"
          className="self-center inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
        >
          Open Practice Center
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="text-[11px] text-muted-foreground italic text-center">
          Rule of thumb: don't run a real first call until you can score green on the matching role-play.
        </p>
      </div>
    </PitchSlideContainer>
  );
};

export default SEPracticeCenterBridge;