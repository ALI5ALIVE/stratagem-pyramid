import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Check, X } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const rows = [
  { cap: "Event categorization across 4,000+ categories (5 levels)", co: true, gen: false },
  { cap: "90% accuracy at granular categorization", co: true, gen: false },
  { cap: "Hybrid AI: domain-trained ML + LLMs", co: true, gen: false },
  { cap: "Cross-report pattern recognition at scale", co: true, gen: false },
  { cap: "Proactive hazard detection & control monitoring", co: true, gen: false },
  { cap: "Predictive intelligence (likelihood of recurrence)", co: true, gen: false },
  { cap: "Low hallucination risk for aviation data", co: true, gen: false },
  { cap: "60+ language translation", co: true, gen: true },
  { cap: "Text summarization", co: true, gen: true },
  { cap: "Basic Q&A on prompted data", co: true, gen: true },
];

const accuracy = [
  { level: "Level 1 (~50 categories)", co: "~95%", gen: "~90%" },
  { level: "Level 2–3 (hundreds)", co: "~92%", gen: "~60%" },
  { level: "Level 4–5 (thousands)", co: "~90%", gen: "30–40%" },
];

const buildVsBuy = [
  "Years of aviation domain R&D (since 2023)",
  "Millions of historical reports for training",
  "Specialized ML & AI engineering team",
  "4,000+ category taxonomy development",
  "Continuous model tuning and validation",
  "7-figure ongoing investment",
];

const TechSlide9VsGenericAI = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-9" title="CoAnalyst vs Generative AI" subtitle="Purpose-built aviation intelligence vs off-the-shelf AI tools" slideNumber={slideNumber} {...narrationProps}>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 flex-1 min-h-0">
      <div className="lg:col-span-3 rounded-lg border border-muted/20 bg-card/60 p-2.5 overflow-auto">
        <table className="w-full text-xs">
          <thead><tr className="border-b border-border"><th className="text-left py-1.5 text-[11px] text-muted-foreground font-medium">Capability</th><th className="text-center py-1.5 text-[11px] text-primary font-bold w-20">CoAnalyst</th><th className="text-center py-1.5 text-[11px] text-muted-foreground w-20">Generic AI</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-1 text-[11px] text-muted-foreground">{r.cap}</td>
                <td className="text-center py-1">{r.co ? <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" /> : <X className="w-3.5 h-3.5 text-red-400 mx-auto" />}</td>
                <td className="text-center py-1">{r.gen ? <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" /> : <X className="w-3.5 h-3.5 text-red-400 mx-auto" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lg:col-span-2 flex flex-col gap-1.5">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5">
          <h3 className="text-[11px] font-bold text-amber-400 uppercase tracking-wide mb-2">Accuracy by Depth</h3>
          {accuracy.map((a, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] mb-1">
              <span className="text-muted-foreground flex-1">{a.level}</span>
              <span className="text-primary font-bold w-12 text-center">{a.co}</span>
              <span className="text-muted-foreground w-12 text-center">{a.gen}</span>
            </div>
          ))}
          <p className="text-[10px] text-muted-foreground mt-2 italic">LLMs hallucinate at granular levels — wrong technology for micro-categorization.</p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2.5">
          <h3 className="text-[11px] font-bold text-red-400 uppercase tracking-wide mb-2">Build vs Buy</h3>
          {buildVsBuy.map((b, i) => (<div key={i} className="text-[11px] text-muted-foreground mb-1">• {b}</div>))}
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/10 p-2.5 flex flex-col justify-center">
          <p className="text-xs font-semibold text-foreground italic">"Generic AI reads reports. CoAnalyst understands aviation operations."</p>
        </div>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide9VsGenericAI;
