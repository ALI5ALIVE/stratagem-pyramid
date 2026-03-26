import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Link, Brain, TrendingUp, Plane, Globe, Users } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const diffs = [
  { icon: Link, title: "Connected Foundation", desc: "Operational content, training, safety and compliance – unified in one connected platform that detects operational signals across all, triggers the right response automatically, driving performance and predictive insights for safer outcomes.", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  { icon: Brain, title: "Embedded Intelligence", desc: "Accelerated decisioning and organizational agility with industry specific AI innovation across our platform – CoAnalyst, CoAuthor and CoTrainer – so that airlines can operate smarter, faster, and safer.", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  { icon: TrendingUp, title: "Superior Performance", desc: "A connected, intelligent ecosystem that means fewer disruptions, protected revenue & schedules, lower operating costs, and higher trust – when operational performance becomes a growth enabler, not just a compliance function.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
];

const trust = [
  { icon: Plane, value: "550+", label: "Airlines" },
  { icon: Globe, value: "6", label: "Continents" },
  { icon: Users, value: "Global", label: "Experts" },
];

const TechSlide17WhyUs = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-17" title="Why Comply365" subtitle="The only connected operational performance platform with embedded aviation intelligence" slideNumber={slideNumber} {...narrationProps}>
    <div className="flex flex-col gap-4 justify-center">
      <div className="grid grid-cols-3 gap-4">
        {diffs.map((d) => (
          <div key={d.title} className={`rounded-xl border ${d.border} ${d.bg} p-5`}>
            <d.icon className={`h-6 w-6 ${d.color} mb-3`} />
            <h3 className={`text-base font-bold ${d.color} mb-2`}>{d.title}</h3>
            <p className="text-sm text-muted-foreground">{d.desc}</p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-center">
        <p className="text-base font-display font-bold text-foreground">Learn more about the Comply365 Operational Performance Platform for your organization</p>
        <p className="text-sm text-primary font-semibold mt-1">Book a workshop today →</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          {trust.map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <t.icon className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold text-foreground">{t.value}</span>
              <span className="text-xs text-muted-foreground">{t.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic">AI-First, Market-Leading Team, Extensive Industry Expertise</p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide17WhyUs;
