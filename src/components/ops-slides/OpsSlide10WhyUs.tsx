import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Layers, Brain, TrendingUp, Plane, Globe, Users } from "lucide-react";

interface OpsSlide10Props extends SlideNarrationProps {
  slideNumber?: number;
}

const differentiators = [
  {
    icon: Layers,
    title: "Connected Foundation",
    desc: "Operational content, training, safety and compliance – unified in one connected platform that detects operational signals across all, triggers the right response automatically, driving performance and predictive insights for safer outcomes.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/30",
  },
  {
    icon: Brain,
    title: "Embedded Intelligence",
    desc: "Accelerated decisioning and organizational agility with industry specific AI innovation across our platform – CoAnalyst, CoAuthor and CoTrainer – so that airlines can operate smarter, faster, and safer.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
  },
  {
    icon: TrendingUp,
    title: "Superior Performance",
    desc: "A connected, intelligent ecosystem that means fewer disruptions, protected revenue & schedules, lower operating costs, and higher trust – when operational performance becomes a growth enabler, not just a compliance function.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
];

const trustStats = [
  { icon: Plane, value: "550+", label: "Airlines" },
  { icon: Globe, value: "6", label: "Continents" },
  { icon: Users, value: "Global", label: "Experts" },
];

const OpsSlide10WhyUs = ({ slideNumber, ...narrationProps }: OpsSlide10Props) => {
  return (
    <SalesSlideContainer
      id="ops-slide-10"
      title="Why Comply365"
      subtitle="The only connected operational performance platform with embedded aviation intelligence"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex flex-col gap-4">
        {/* Differentiator cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {differentiators.map((d) => (
            <div key={d.title} className={`p-5 rounded-xl border ${d.border} ${d.bg} flex flex-col`}>
              <d.icon className={`h-8 w-8 ${d.color} mb-3`} />
              <h3 className={`text-lg font-bold ${d.color} mb-2`}>{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
          <p className="text-base font-display font-bold text-foreground text-center">
            Learn more about the Comply365 Operational Performance Platform for your organization
          </p>
          <p className="text-sm text-primary font-semibold text-center mt-1">Book a workshop today →</p>
        </div>

        {/* Trust bar + team expertise */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-10">
            {trustStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-muted-foreground">
                <stat.icon className="h-5 w-5 text-primary/50" />
                <span className="text-base font-bold text-foreground">{stat.value}</span>
                <span className="text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic">AI-First, Market-Leading Team, Extensive Industry Expertise</p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide10WhyUs;
