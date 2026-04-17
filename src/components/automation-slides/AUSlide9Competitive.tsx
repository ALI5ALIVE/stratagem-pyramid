import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { competitiveContrast, moatStatements, competitiveExplanation } from "@/data/automationPlaybook";
import { Check } from "lucide-react";

const AUSlide9Competitive = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="au-competitive"
      title="Why Only Comply365"
      subtitle="Embedded orchestration vs bespoke per-product automation vs generic iPaaS"
      slideNumber={9}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-2 font-medium text-muted-foreground">Approach</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Insight</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Speed</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Scope</th>
                <th className="text-left p-2 font-medium text-muted-foreground">Reusability</th>
              </tr>
            </thead>
            <tbody>
              {competitiveContrast.map((row, i) => (
                <tr
                  key={i}
                  className={`border-t border-border ${row.isUs ? "bg-primary/10" : ""}`}
                >
                  <td className={`p-2 font-medium ${row.isUs ? "text-primary" : "text-foreground"}`}>
                    <div className="flex items-center gap-2">
                      {row.isUs && <Check className="h-3.5 w-3.5 text-primary" />}
                      {row.approach}
                    </div>
                  </td>
                  <td className="p-2 text-foreground/80">{row.insight}</td>
                  <td className="p-2 text-foreground/80">{row.speed}</td>
                  <td className="p-2 text-foreground/80">{row.scope}</td>
                  <td className="p-2 text-foreground/80">{row.intelligence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1">
          {moatStatements.map((m, i) => (
            <div key={i} className="p-3 rounded-lg border border-primary/30 bg-primary/5 flex items-start gap-2">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-foreground leading-relaxed">{m}</p>
            </div>
          ))}
        </div>

        <p className="text-xs italic text-muted-foreground text-center">{competitiveExplanation}</p>
      </div>
    </SlideContainer>
  );
};

export default AUSlide9Competitive;
