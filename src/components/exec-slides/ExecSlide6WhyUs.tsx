import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Link2, Brain, TrendingUp, Plane, Globe, Users } from "lucide-react";

interface ExecSlide6WhyUsProps extends SlideNarrationProps {
  slideNumber?: number;
}

const differentiators = [
  {
    icon: Link2,
    title: "Connected Foundation",
    desc: "Operational content, training, safety and compliance – unified in one connected platform that detects operational signals across all, triggers the right response automatically, driving performance and predictive insights for safer outcomes.",
    color: "border-sky-500/20 bg-sky-500/5",
    iconColor: "text-sky-400",
  },
  {
    icon: Brain,
    title: "Embedded Intelligence",
    desc: "Accelerated decisioning and organizational agility with industry specific AI innovation across our platform – CoAnalyst, CoAuthor and CoTrainer – so that airlines can operate smarter, faster, and safer.",
    color: "border-purple-500/20 bg-purple-500/5",
    iconColor: "text-purple-400",
  },
  {
    icon: TrendingUp,
    title: "Superior Performance",
    desc: "A connected, intelligent ecosystem that means fewer disruptions, protected revenue & schedules, lower operating costs, and higher trust – when operational performance becomes a growth enabler, not just a compliance function.",
    color: "border-emerald-500/20 bg-emerald-500/5",
    iconColor: "text-emerald-400",
  },
];

const trustStats = [
  { icon: Plane, value: "550+", label: "Airlines" },
  { icon: Globe, value: "6", label: "Continents" },
  { icon: Users, value: "Global", label: "Experts" },
];

const ExecSlide6WhyUs = ({
  slideNumber,
  ...narrationProps
}: ExecSlide6WhyUsProps) => {
  return (
    <SalesSlideContainer
      id="exec-slide-6"
      title="Why Comply365"
      subtitle="The only connected operational performance platform with embedded aviation intelligence."
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex flex-col gap-5">
        {/* Differentiator cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {differentiators.map((d) => (
            <div key={d.title} className={`rounded-xl border p-5 flex flex-col gap-4 ${d.color}`}>
              <div className="w-12 h-12 rounded-xl bg-background/30 flex items-center justify-center">
                <d.icon className={`w-6 h-6 ${d.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
              <p className="text-sm text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA + Trust */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-display font-bold text-foreground">
              Learn more about the Comply365 Operational Performance Platform for your organization
            </p>
            <p className="text-sm text-primary font-semibold mt-1">Book a workshop today →</p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team expertise */}
        <div className="rounded-xl border border-muted/20 bg-card/50 p-4 text-center">
          <p className="text-sm font-semibold text-foreground mb-1">AI-First, Market-Leading Team, Extensive Industry Expertise</p>
          <p className="text-xs text-muted-foreground">A world-class team at the forefront of fusing technology and the latest AI innovation with our deep aviation industry expertise.</p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default ExecSlide6WhyUs;
