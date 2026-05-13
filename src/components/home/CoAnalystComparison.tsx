import { Brain, X, CheckCircle2 } from "lucide-react";
import StatSourceChip from "@/components/shared/StatSourceChip";

export default function CoAnalystComparison() {
  return (
    <section className="border-b border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.10),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary">
            <Brain className="h-3.5 w-3.5" /> The intelligence edge — CoAnalyst
          </div>
          <div className="mt-8 flex items-end justify-center gap-6 md:gap-12 flex-wrap">
            <div>
              <div className="font-display text-7xl md:text-8xl font-bold tracking-tight text-foreground leading-none">~90%</div>
              <div className="mt-2 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.22em] text-primary">
                Domain accuracy at L4–5
                <StatSourceChip source="Internal CoAnalyst evaluation against curated operational corpus (manuals, SMS reports, training records). Bloom's L4–5 = analyze/evaluate tasks." />
              </div>
            </div>
            <div className="text-3xl md:text-5xl font-display font-light text-muted-foreground/60 pb-2">vs</div>
            <div>
              <div className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-muted-foreground/70 leading-none">~35%</div>
              <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">Generic AI</div>
            </div>
          </div>
        </div>

        {/* Before/after answer comparison */}
        <div className="mt-14 grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <X className="h-3.5 w-3.5" /> Generic LLM
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              "In an engine fire, follow your operator's QRH. Generally, this involves moving the thrust lever to idle and using the fire suppression system…"
            </p>
            <div className="mt-4 text-[11px] text-muted-foreground/70">
              No revision awareness · No crew context · No source citation
            </div>
          </div>
          <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" /> CoAnalyst
            </div>
            <p className="mt-3 text-sm text-foreground leading-relaxed">
              "Per <span className="font-semibold">QRH 7.12 r.14</span> (effective 14 Mar): step 3 changed from manual cutoff to FADEC arbitration. <span className="font-semibold">42 crews</span> have not yet completed recurrent."
            </p>
            <div className="mt-4 text-[11px] text-primary/80">
              Cited from your corpus · Linked to TrainingManager365 · One-click action
            </div>
          </div>
        </div>

        <p className="mt-10 text-base md:text-lg text-foreground max-w-3xl mx-auto leading-relaxed text-center">
          CoAnalyst is the only operational AI that understands your manuals, your safety reports and your training records — together.
        </p>
      </div>
    </section>
  );
}