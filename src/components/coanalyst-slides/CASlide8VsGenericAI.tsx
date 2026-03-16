import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Check, X } from "lucide-react";

const comparisonRows = [
  { capability: "Aviation event categorization (1000s of categories)", coanalyst: true, generic: false },
  { capability: "Robust hazard detection", coanalyst: true, generic: false },
  { capability: "Cross-report pattern recognition", coanalyst: true, generic: false },
  { capability: "Control-management insights", coanalyst: true, generic: false },
  { capability: "Domain-trained aviation models", coanalyst: true, generic: false },
  { capability: "60+ language translation", coanalyst: true, generic: true },
  { capability: "Text summarization", coanalyst: true, generic: true },
  { capability: "Scalable production-grade analytics", coanalyst: true, generic: false },
  { capability: "Predictive intelligence with consistency", coanalyst: true, generic: false },
  { capability: "Low hallucination risk for aviation data", coanalyst: true, generic: false },
];

const buildVsBuy = [
  { item: "Years of aviation domain R&D", icon: "🔬" },
  { item: "Millions of historical reports for training", icon: "📊" },
  { item: "Specialized ML & AI engineering", icon: "⚙️" },
  { item: "Aviation taxonomy development", icon: "📋" },
  { item: "Continuous tuning and validation", icon: "🔄" },
  { item: "Significant ongoing investment", icon: "💰" },
];

const CASlide8VsGenericAI = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-vs-generic-ai" title="Why CoAnalyst Beats Generic AI" subtitle="Purpose-built aviation intelligence vs off-the-shelf AI tools" slideNumber={8} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 h-full">
        {/* Comparison table */}
        <div className="lg:col-span-3 bg-card/60 border border-border rounded-xl p-4 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Capability</th>
                <th className="text-center py-2 text-xs text-primary font-bold w-24">CoAnalyst</th>
                <th className="text-center py-2 text-xs text-muted-foreground font-medium w-24">Generic AI</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 text-xs text-muted-foreground">{row.capability}</td>
                  <td className="text-center py-2">{row.coanalyst ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                  <td className="text-center py-2">{row.generic ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Build vs buy */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h3 className="text-sm font-bold text-red-400 uppercase tracking-wide mb-3">Build vs Buy</h3>
            <p className="text-xs text-muted-foreground mb-3">Replicating CoAnalyst internally would require:</p>
            <div className="space-y-2">
              {buildVsBuy.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.icon}</span>
                  {item.item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex-1 flex flex-col justify-center">
            <p className="text-sm font-semibold text-foreground italic leading-relaxed">
              "Generic AI reads reports. CoAnalyst understands aviation operations."
            </p>
            <p className="text-xs text-muted-foreground mt-3 italic">
              "Generic AI answers questions. CoAnalyst identifies risks airlines don't yet know to ask about."
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide8VsGenericAI;
