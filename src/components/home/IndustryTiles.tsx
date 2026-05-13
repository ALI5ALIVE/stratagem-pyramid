import { Link } from "react-router-dom";
import { ArrowRight, Plane, Shield, Train } from "lucide-react";

const INDUSTRIES = [
  {
    name: "Airlines",
    href: "/solutions/airlines",
    icon: Plane,
    hook: "Connect ops, safety and training across the fleet.",
  },
  {
    name: "Defense",
    href: "/solutions/defense",
    icon: Shield,
    hook: "Mission-ready manuals, qualifications and reporting.",
  },
  {
    name: "Rail",
    href: "/solutions/rail",
    icon: Train,
    hook: "Rule changes to crew competency, in one rhythm.",
  },
];

export default function IndustryTiles() {
  return (
    <section className="border-b border-border/60 bg-card/20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Built for your industry</div>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
          Pick the lens that matches your operation.
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {INDUSTRIES.map((i) => (
            <Link
              key={i.name}
              to={i.href}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
            >
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                <i.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 font-display text-lg font-semibold text-foreground">{i.name}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{i.hook}</p>
              <div className="mt-4 pt-4 border-t border-border/60 inline-flex items-center text-sm font-semibold text-primary">
                See solution <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}