import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Check, X } from "lucide-react";

const comparisonRows = [
  { capability: "Event categorization across 4,000+ categories (5 levels)", coanalyst: true, generic: false },
  { capability: "90% accuracy at granular categorization", coanalyst: true, generic: false },
  { capability: "Hybrid AI: domain-trained ML models + LLMs", coanalyst: true, generic: false },
  { capability: "Cross-report pattern recognition at scale", coanalyst: true, generic: false },
  { capability: "Proactive hazard detection & control monitoring", coanalyst: true, generic: false },
  { capability: "Predictive intelligence (likelihood of events recurring)", coanalyst: true, generic: false },
  { capability: "Low hallucination risk for aviation-specific data", coanalyst: true, generic: false },
  { capability: "60+ language translation", coanalyst: true, generic: true },
  { capability: "Text summarization", coanalyst: true, generic: true },
  { capability: "Basic Q&A on prompted data", coanalyst: true, generic: true },
];

const accuracyData = [
  { level: "Level 1 (top ~50 categories)", coanalyst: "~95%", generic: "~90%" },
  { level: "Level 2–3 (hundreds)", coanalyst: "~92%", generic: "~60%" },
  { level: "Level 4–5 (thousands)", coanalyst: "~90%", generic: "30–40%" },
];

const buildVsBuy = [
  { item: "Years of aviation domain R&D (since 2023, ongoing)", icon: "🔬" },
  { item: "Millions of historical reports for model training", icon: "📊" },
  { item: "Specialized ML & AI engineering team", icon: "⚙️" },
  { item: "4,000+ category taxonomy development", icon: "📋" },
  { item: "Continuous model tuning and validation", icon: "🔄" },
  { item: "7-figure ongoing investment", icon: "💰" },
];

const CASlide8VsGenericAI = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-vs-generic-ai" title="Why CoAnalyst Beats Generic AI" subtitle="Purpose-built aviation intelligence vs off-the-shelf AI tools" slideNumber={8} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 h-full">
        {/* Comparison table */}
        <div className="lg:col-span-3 bg-card/60 border border-border rounded-xl p-3 overflow-auto flex flex-col">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-1.5 text-[10px] text-muted-foreground font-medium">Capability</th>
                <th className="text-center py-1.5 text-[10px] text-primary font-bold w-20">CoAnalyst</th>
                <th className="text-center py-1.5 text-[10px] text-muted-foreground font-medium w-20">Generic AI</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-1 text-[10px] text-muted-foreground">{row.capability}</td>
                  <td className="text-center py-1">{row.coanalyst ? <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" /> : <X className="w-3.5 h-3.5 text-red-400 mx-auto" />}</td>
                  <td className="text-center py-1">{row.generic ? <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" /> : <X className="w-3.5 h-3.5 text-red-400 mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          {/* Accuracy breakdown */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
            <h3 className="text-[10px] font-bold text-amber-400 uppercase tracking-wide mb-2">Categorization Accuracy by Depth</h3>
            <div className="space-y-1.5">
              {accuracyData.map((row, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className="text-muted-foreground flex-1">{row.level}</span>
                  <span className="text-primary font-bold w-12 text-center">{row.coanalyst}</span>
                  <span className="text-muted-foreground w-12 text-center">{row.generic}</span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-muted-foreground mt-2 italic">LLMs hallucinate at granular levels — they're not the right technology for micro-categorization.</p>
          </div>

          {/* Build vs buy */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
            <h3 className="text-[10px] font-bold text-red-400 uppercase tracking-wide mb-2">Build vs Buy</h3>
            <div className="space-y-1">
              {buildVsBuy.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="text-[9px]">{item.icon}</span>
                  {item.item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 flex-1 flex flex-col justify-center">
            <p className="text-[11px] font-semibold text-foreground italic leading-relaxed">
              "Generic AI reads reports. CoAnalyst understands aviation operations."
            </p>
            <p className="text-[10px] text-muted-foreground mt-2 italic">
              "Generic AI answers questions. CoAnalyst identifies risks airlines don't yet know to ask about."
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide8VsGenericAI;
