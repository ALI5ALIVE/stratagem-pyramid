import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Layers, Brain, BadgeCheck, Shield, Signal, Users } from "lucide-react";

interface OpsSlide10Props extends SlideNarrationProps {
  slideNumber?: number;
}

const differentiators = [
  {
    icon: Layers,
    title: "Connected Foundation",
    desc: "Safety, Content, and Training on a single platform — not bolted-on integrations but a shared data layer that connects every signal to every action.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/30",
  },
  {
    icon: Brain,
    title: "Embedded Intelligence",
    desc: "CoAnalyst delivers 90% accuracy across 4,000+ aviation categories — precision that generative AI simply cannot match at operational granularity.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
  },
  {
    icon: BadgeCheck,
    title: "Proof by Default",
    desc: "Every detection, every action, every outcome generates audit-ready evidence. Compliance isn't an afterthought — it's built into the platform.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
];

const trustStats = [
  { icon: Shield, value: "50+", label: "Airlines" },
  { icon: Signal, value: "7/10", label: "NA Carriers" },
  { icon: Users, value: "1M+", label: "Users" },
];

const OpsSlide10WhyUs = ({ slideNumber, ...narrationProps }: OpsSlide10Props) => {
  return (
    <SalesSlideContainer
      id="ops-slide-10"
      title="Why Comply365"
      subtitle="The only platform that connects detection to proof"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex flex-col gap-5">
        {/* Differentiator cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {differentiators.map((d) => (
            <div key={d.title} className={`p-5 rounded-xl border ${d.border} ${d.bg} flex flex-col`}>
              <d.icon className={`h-8 w-8 ${d.color} mb-4`} />
              <h3 className={`text-lg font-bold ${d.color} mb-3`}>{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Category promise */}
        <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <p className="text-xl font-display font-bold text-foreground mb-2">
            Predictable. Measurable. Provable.
          </p>
          <p className="text-sm text-muted-foreground">
            Operational performance you can see, measure, and prove — to regulators, insurers, and your board.
          </p>
        </div>

        {/* Trust bar */}
        <div className="flex items-center justify-center gap-10">
          {trustStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 text-muted-foreground">
              <stat.icon className="h-5 w-5 text-primary/50" />
              <span className="text-base font-bold text-foreground">{stat.value}</span>
              <span className="text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide10WhyUs;
