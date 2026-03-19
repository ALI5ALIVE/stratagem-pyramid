import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Search, TestTube, Rocket, MessageSquare } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const steps = [
  { icon: Search, step: "01", title: "Discover", desc: "Half-day workshop to map your operational landscape, identify high-value use cases, and define your maturity starting point.", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30", timeline: "Week 1–2" },
  { icon: TestTube, step: "02", title: "Pilot", desc: "90-day proof of value on your top use case. Measurable outcomes from week one. Full DTOP pipeline in production.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", timeline: "Months 1–3" },
  { icon: Rocket, step: "03", title: "Scale", desc: "Expand across departments and use cases with a phased roadmap. Each phase builds on proven value — no big-bang required.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30", timeline: "Months 4–12" },
];

const TechSlide18Partnership = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-18" title="Partnership Model" subtitle="Your path to connected operational performance" slideNumber={slideNumber} {...narrationProps}>
    <div className="flex flex-col justify-center gap-6">
      <div className="grid grid-cols-3 gap-4">
        {steps.map((s) => (
          <div key={s.step} className={`p-6 rounded-xl border ${s.border} ${s.bg} flex flex-col h-full`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${s.bg} border ${s.border}`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Step {s.step}</span>
                <h3 className={`text-xl font-bold ${s.color}`}>{s.title}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
            <div className="mt-4 pt-3 border-t border-muted/20">
              <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Timeline</span>
              <p className={`text-sm font-semibold ${s.color}`}>{s.timeline}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-xl border border-primary/30 bg-primary/5 text-center">
        <MessageSquare className="h-7 w-7 text-primary mx-auto mb-3" />
        <h3 className="text-xl font-display font-bold text-foreground mb-2">What does your first use case look like?</h3>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">Let's start with a discovery workshop to identify the use case that delivers the most value — and prove it in 90 days.</p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide18Partnership;
