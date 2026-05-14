import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CoAnalystSpotlight() {
  return (
    <section className="border-b border-border/40 py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-[1fr_1.1fr] lg:px-12">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3 w-3" /> CoAnalyst
          </p>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground lg:text-5xl">
            Generative AI tuned to your operation, not the open web.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            ~90% domain accuracy at L4–5 vs ~35% generic AI. Answers grounded in your Operational Data, with citations and tenant isolation by design.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/coanalyst">
                See CoAnalyst in action <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-primary/20 bg-card/60 p-6 shadow-2xl backdrop-blur lg:p-8">
          <div className="mb-4 flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-primary">CoAnalyst · Answer</span>
            <span className="text-muted-foreground">Tenant-isolated</span>
          </div>
          <p className="rounded-lg border border-border/50 bg-background/50 p-4 text-sm leading-relaxed text-foreground/90">
            "Show me the top three hazards trending across the fleet this month, ranked by exposure."
          </p>
          <div className="mt-4 space-y-2">
            {[
              { t: "Unstable approach — RWY 27", v: "+38% MoM" },
              { t: "Fatigue exposure — narrowbody fleet", v: "+22% MoM" },
              { t: "MEL deferral — aging engines", v: "+14% MoM" },
            ].map((r) => (
              <div key={r.t} className="flex items-center justify-between rounded-md border border-border/40 bg-background/40 px-3 py-2 text-xs">
                <span className="text-foreground/90">{r.t}</span>
                <span className="font-mono text-amber-400">{r.v}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["SMS hazard log", "FOM §4.2", "Training currency", "Dispatch reliability"].map((c) => (
              <span key={c} className="rounded border border-border/50 bg-background/50 px-2 py-0.5 text-[10px] text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}