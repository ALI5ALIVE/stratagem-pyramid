import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { competitiveContrast, moatStatements, competitiveExplanation } from "@/data/mobilePlaybook";
import { Check } from "lucide-react";

const MOSlide9Competitive = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="mo-competitive"
      title="Why Only Comply365"
      subtitle="Only the vendor with a daily-use mobile shell can extend it."
      slideNumber={9}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-5 gap-2 p-3 border-b border-border bg-card/50 text-[10px] uppercase tracking-wider text-muted-foreground">
            <div>Approach</div>
            <div>Reality</div>
            <div>Friction</div>
            <div>Scope</div>
            <div>Context</div>
          </div>
          {competitiveContrast.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-5 gap-2 p-3 border-b border-border last:border-b-0 ${
                row.isUs ? "bg-primary/5" : ""
              }`}
            >
              <div className={`text-xs font-semibold flex items-center gap-1.5 ${row.isUs ? "text-primary" : "text-foreground"}`}>
                {row.isUs && <Check className="h-3.5 w-3.5" />}
                {row.approach}
              </div>
              <div className="text-xs text-muted-foreground">{row.insight}</div>
              <div className="text-xs text-muted-foreground">{row.speed}</div>
              <div className="text-xs text-muted-foreground">{row.scope}</div>
              <div className="text-xs text-muted-foreground">{row.intelligence}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {moatStatements.map((s, i) => (
            <div key={i} className="p-3 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-2">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-foreground/90 leading-relaxed">{s}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground italic text-center">{competitiveExplanation}</p>
      </div>
    </SlideContainer>
  );
};

export default MOSlide9Competitive;
