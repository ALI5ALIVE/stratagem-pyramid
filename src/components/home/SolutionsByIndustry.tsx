import { Link } from "react-router-dom";
import { ArrowRight, Plane, Shield, Train } from "lucide-react";

const ITEMS = [
  { icon: Plane, name: "Airlines", outcome: "Protect OTP and completion factor by closing the safety → ops → training loop.", href: "/solutions/airlines" },
  { icon: Shield, name: "Defense", outcome: "Mission-ready evidence at the speed of audit — across air, land and sustainment.", href: "/solutions/defense" },
  { icon: Train, name: "Rail", outcome: "Trace a regulator change to the rule book, the crew and the proof in one chain.", href: "/solutions/rail" },
];

export default function SolutionsByIndustry() {
  return (
    <section className="border-b border-border/40 bg-background/60 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Solutions</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
            One platform. Built for regulated, mission-critical industries.
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {ITEMS.map((i) => (
            <Link
              key={i.name}
              to={i.href}
              className="group flex flex-col justify-between rounded-xl border border-border/50 bg-card/50 p-7 transition hover:border-primary/40"
            >
              <div>
                <i.icon className="mb-5 h-7 w-7 text-primary" />
                <h3 className="mb-2 font-display text-2xl font-semibold text-foreground">{i.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{i.outcome}</p>
              </div>
              <div className="mt-8 flex items-center gap-1.5 text-sm font-medium text-primary">
                See the {i.name.toLowerCase()} solution
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}