import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(800px 400px at 20% 20%, hsl(217 91% 60% / 0.15), transparent), radial-gradient(700px 350px at 80% 80%, hsl(262 83% 58% / 0.12), transparent)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:px-12 lg:py-32">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The Operational Performance Platform
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground lg:text-[64px]">
            Turn operational data into operational control.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Comply365 unifies safety, ops, training and regulation into one closed loop —{" "}
            <span className="text-foreground">Detect → Trigger → Orchestrate → Prove.</span>
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#book">
                Book a working session
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border/60">
              <Link to="/platform-playbook">See the platform</Link>
            </Button>
          </div>
        </div>
        <HeroCollage />
      </div>
    </section>
  );
}

function HeroCollage() {
  return (
    <div className="relative aspect-[5/4] w-full">
      {/* OCC card */}
      <div className="absolute left-0 top-4 w-[78%] rounded-xl border border-border/50 bg-card/80 p-5 shadow-2xl backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
            OCC · Live operations
          </span>
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        </div>
        <div className="space-y-2">
          {[
            { label: "Active workflows", v: "47" },
            { label: "Recommended Actions", v: "12" },
            { label: "Audit-ready evidence", v: "100%" },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between rounded-md border border-border/40 bg-background/40 px-3 py-2 text-xs">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="font-mono font-semibold text-foreground">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Intelligence Layer answer card */}
      <div className="absolute right-0 top-32 w-[68%] rounded-xl border border-primary/30 bg-card/90 p-5 shadow-2xl backdrop-blur">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-primary/20 text-center text-xs font-bold leading-6 text-primary">CA</div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">System of Intelligence · Generative AI</span>
        </div>
        <p className="text-xs leading-relaxed text-foreground/90">
          Unstable approach trend on RWY 27 — 14 events, 30 days. Cross-references SMS hazard log and training currency.
        </p>
        <div className="mt-3 flex gap-1.5">
          {["SMS", "Training", "FOM §4.2"].map((t) => (
            <span key={t} className="rounded border border-border/50 bg-background/50 px-2 py-0.5 text-[10px] text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
      {/* Mobile shell */}
      <div className="absolute bottom-0 left-12 w-[34%] rounded-2xl border border-border/50 bg-card/80 p-3 shadow-2xl backdrop-blur">
        <div className="rounded-lg bg-background/60 p-3">
          <div className="mb-2 h-1 w-8 rounded-full bg-muted-foreground/30" />
          <div className="text-[10px] font-semibold text-foreground">Crew · Today</div>
          <div className="mt-2 space-y-1.5">
            {["Pre-flight check", "Currency renewal", "Sign duty log"].map((t, i) => (
              <div key={t} className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-emerald-400" : "bg-muted-foreground/40"}`} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}