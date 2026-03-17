import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Link, Brain, BadgeCheck, Plane, Shield, Users } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const diffs = [
  { icon: Link, title: "Connected Foundation", desc: "The only platform that connects safety, content, and training into a single operational fabric — not bolted-on integrations.", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
  { icon: Brain, title: "Embedded Intelligence", desc: "CoAnalyst is built into the platform — not a separate AI tool. Aviation-specific, 90% accurate at 4,000+ categories.", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  { icon: BadgeCheck, title: "Proof by Default", desc: "Every action generates auditable evidence. Compliance isn't a project — it's an automatic output of connected operations.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
];

const trust = [
  { icon: Plane, value: "50+", label: "Airlines" },
  { icon: Shield, value: "7/10", label: "Top NA Carriers" },
  { icon: Users, value: "300K+", label: "Users" },
];

const TechSlide17WhyUs = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-17" title="Why Comply365" subtitle="The only connected operational performance platform with embedded aviation intelligence" slideNumber={slideNumber} {...narrationProps}>
    <div className="flex-1 flex flex-col gap-5 justify-center">
      <div className="grid grid-cols-3 gap-4">
        {diffs.map((d) => (
          <div key={d.title} className={`rounded-xl border ${d.border} ${d.bg} p-5`}>
            <d.icon className={`h-6 w-6 ${d.color} mb-3`} />
            <h3 className={`text-base font-bold ${d.color} mb-2`}>{d.title}</h3>
            <p className="text-sm text-muted-foreground">{d.desc}</p>
          </div>
        ))}
      </div>
      <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 text-center">
        <p className="text-xl font-display font-bold text-foreground">Predictable. Measurable. Provable.</p>
        <p className="text-sm text-muted-foreground mt-2">The category promise of the Operational Performance Platform.</p>
      </div>
      <div className="flex items-center justify-center gap-10">
        {trust.map((t) => (
          <div key={t.label} className="flex items-center gap-2">
            <t.icon className="h-4 w-4 text-primary" />
            <span className="text-lg font-bold text-foreground">{t.value}</span>
            <span className="text-xs text-muted-foreground">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide17WhyUs;
