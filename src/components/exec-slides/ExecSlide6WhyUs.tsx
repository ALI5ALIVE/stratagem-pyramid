import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Link2, Brain, BadgeCheck, Plane, Globe, Users } from "lucide-react";

interface ExecSlide6WhyUsProps extends SlideNarrationProps {
  slideNumber?: number;
}

const differentiators = [
  {
    icon: Link2,
    title: "Connected Foundation",
    desc: "Content, training, safety, and compliance — unified in one platform. Not bolted together. Connected by design.",
    color: "border-sky-500/20 bg-sky-500/5",
    iconColor: "text-sky-400",
  },
  {
    icon: Brain,
    title: "Embedded Intelligence",
    desc: "CoAnalyst doesn't sit alongside your operations — it powers them. 90% accuracy across 4,000+ aviation categories.",
    color: "border-purple-500/20 bg-purple-500/5",
    iconColor: "text-purple-400",
  },
  {
    icon: BadgeCheck,
    title: "Proof by Default",
    desc: "Every action generates auditable evidence. Compliance isn't an afterthought — it's a byproduct of how you operate.",
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
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: ExecSlide6WhyUsProps) => {
  return (
    <SalesSlideContainer
      id="exec-slide-6"
      title="Why Comply365"
      subtitle="The only platform that connects operational intelligence to provable outcomes."
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col gap-6">
        {/* Differentiator cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {differentiators.map((d) => (
            <div key={d.title} className={`rounded-xl border p-6 flex flex-col gap-4 ${d.color}`}>
              <div className="w-12 h-12 rounded-xl bg-background/30 flex items-center justify-center">
                <d.icon className={`w-6 h-6 ${d.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
              <p className="text-sm text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Category promise + CTA */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              30-Minute Discovery Session
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              We'll map your top 3 operational signals to measurable outcomes.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default ExecSlide6WhyUs;
