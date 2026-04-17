import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { competitiveContrast, moatStatements, competitiveExplanation } from "@/data/insightsPlaybook";
import { Check } from "lucide-react";

const IRSlide9Competitive = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="ir-competitive"
      title="Why Only Comply365"
      subtitle="A connected platform is the prerequisite for cross-domain reasoning"
      slideNumber={9}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-5 gap-px bg-border text-[10px] uppercase tracking-wider">
            <div className="p-2 bg-card text-muted-foreground">Approach</div>
            <div className="p-2 bg-card text-muted-foreground">Insight type</div>
            <div className="p-2 bg-card text-muted-foreground">Speed</div>
            <div className="p-2 bg-card text-muted-foreground">Scope</div>
            <div className="p-2 bg-card text-muted-foreground">Intelligence</div>
          </div>
          {competitiveContrast.map((row) => (
            <div
              key={row.approach}
              className={`grid grid-cols-5 gap-px bg-border text-xs ${row.isUs ? "bg-primary/5" : ""}`}
            >
              <div className={`p-2 bg-card flex items-center gap-2 ${row.isUs ? "text-primary font-semibold" : "text-foreground"}`}>
                {row.isUs && <Check className="h-3.5 w-3.5 text-primary" />}
                {row.approach}
              </div>
              <div className="p-2 bg-card text-foreground/80">{row.insight}</div>
              <div className="p-2 bg-card text-foreground/80">{row.speed}</div>
              <div className="p-2 bg-card text-foreground/80">{row.scope}</div>
              <div className="p-2 bg-card text-foreground/80">{row.intelligence}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1">
          {moatStatements.map((m, i) => (
            <div key={i} className="p-3 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-2">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-foreground/90 leading-relaxed">{m}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground italic">{competitiveExplanation}</p>
      </div>
    </SlideContainer>
  );
};

export default IRSlide9Competitive;
