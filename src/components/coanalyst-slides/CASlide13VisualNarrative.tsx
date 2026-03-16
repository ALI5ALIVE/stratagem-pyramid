import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { ArrowRightLeft, Layers, Cog, BarChart3, Shield, TrendingUp, Search, Globe } from "lucide-react";

const visuals = [
  {
    icon: ArrowRightLeft, color: "text-blue-400", bgColor: "bg-blue-500/10",
    title: "Industry Shift",
    purpose: "Show the transition from reactive to proactive",
    shows: "Left: event → report → investigate → act (reactive loop). Right: data → intelligence → controls → prevention (proactive model)",
    headline: "From Managing Events to Managing Controls",
    layout: "Two-column before/after with directional arrow",
  },
  {
    icon: Layers, color: "text-violet-400", bgColor: "bg-violet-500/10",
    title: "Intelligence Layer Architecture",
    purpose: "Position CoAnalyst above operational systems",
    shows: "Bottom layer: operational systems (Safety Manager, flight ops, maintenance). Middle: CoAnalyst intelligence layer. Top: insights, decisions, outcomes",
    headline: "The Intelligence Layer Above Your Operational Systems",
    layout: "Stacked horizontal layers with data flow arrows",
  },
  {
    icon: Cog, color: "text-amber-400", bgColor: "bg-amber-500/10",
    title: "How CoAnalyst Works",
    purpose: "Explain the 5-step pipeline",
    shows: "Linear flow: Ingest → Enrich → Detect → Intelligence → Control, with brief descriptions under each step",
    headline: "From Raw Data to Proactive Control Management",
    layout: "Horizontal pipeline with icons and labels",
  },
  {
    icon: BarChart3, color: "text-emerald-400", bgColor: "bg-emerald-500/10",
    title: "Four Levels of Intelligence",
    purpose: "Show intelligence maturity progression",
    shows: "Four ascending levels: Historical (what happened), Reactive (what is happening), Proactive (what is likely), Predictive (what will happen)",
    headline: "From Hindsight to Foresight",
    layout: "Ascending staircase or stacked bars",
  },
  {
    icon: Shield, color: "text-red-400", bgColor: "bg-red-500/10",
    title: "Generic AI vs CoAnalyst",
    purpose: "Differentiation comparison",
    shows: "Two columns: Generic AI capabilities (basic summarization, prompted Q&A) vs CoAnalyst capabilities (domain precision, hazard detection, pattern recognition, control insights)",
    headline: "Purpose-Built Intelligence vs Off-the-Shelf AI",
    layout: "Side-by-side comparison with check/cross marks",
  },
  {
    icon: TrendingUp, color: "text-green-400", bgColor: "bg-green-500/10",
    title: "Business Outcomes Waterfall",
    purpose: "Connect intelligence to business value",
    shows: "Flow: Intelligence → Control Management → Operational Improvement → Fewer delays, damages, injuries → Revenue protection",
    headline: "From Intelligence to Business Performance",
    layout: "Waterfall or cascade diagram left to right",
  },
  {
    icon: Search, color: "text-cyan-400", bgColor: "bg-cyan-500/10",
    title: "Use Case Example",
    purpose: "Show a concrete pattern detection scenario",
    shows: "Example: CoAnalyst detects a pattern across 50+ reports of hydraulic issues on a specific fleet type, identifies weakening maintenance controls, triggers review before a failure occurs",
    headline: "Detecting What Manual Analysis Misses",
    layout: "Timeline or narrative flow with data points",
  },
  {
    icon: Globe, color: "text-primary", bgColor: "bg-primary/10",
    title: "Master Visual — Palantir Style",
    purpose: "One diagram that tells the entire story",
    shows: "Operational systems (bottom) → CoAnalyst intelligence layer (center) → Insights & patterns (middle) → Better controls (upper) → Business outcomes (top). Cross-domain data flows in, intelligence flows out",
    headline: "The Complete Intelligence Architecture",
    layout: "Full-page layered architecture diagram with data flows",
  },
];

const CASlide13VisualNarrative = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-visual-narrative" title="Visual Narrative System" subtitle="Concept designs to support the positioning across all channels" slideNumber={13} {...props}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 h-full">
        {visuals.map((v, i) => (
          <div key={i} className={`${v.bgColor} border border-border rounded-xl p-3 flex flex-col`}>
            <div className="flex items-center gap-1.5 mb-2">
              <v.icon className={`w-3.5 h-3.5 ${v.color}`} />
              <h4 className="text-[11px] font-bold text-foreground leading-tight">{v.title}</h4>
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug mb-2">{v.purpose}</p>
            <div className="bg-card/60 border border-border rounded-lg px-2 py-1.5 mt-auto">
              <p className="text-[10px] font-semibold text-foreground leading-snug">{v.headline}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default CASlide13VisualNarrative;
