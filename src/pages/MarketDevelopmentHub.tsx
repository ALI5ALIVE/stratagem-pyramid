import { Link } from "react-router-dom";
import { ArrowRight, Compass, Sparkles, Target } from "lucide-react";
import { workstreams, operatingRhythm, type MarketAsset, type MarketWorkstream } from "@/data/marketDevelopmentAssets";

const accentMap: Record<MarketWorkstream["accent"], { dot: string; ring: string; text: string; bg: string }> = {
  blue: { dot: "bg-blue-500", ring: "border-blue-500/30", text: "text-blue-400", bg: "bg-blue-500/10" },
  amber: { dot: "bg-amber-500", ring: "border-amber-500/30", text: "text-amber-400", bg: "bg-amber-500/10" },
  violet: { dot: "bg-violet-500", ring: "border-violet-500/30", text: "text-violet-400", bg: "bg-violet-500/10" },
  emerald: { dot: "bg-emerald-500", ring: "border-emerald-500/30", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  rose: { dot: "bg-rose-500", ring: "border-rose-500/30", text: "text-rose-400", bg: "bg-rose-500/10" },
};

const statusStyles: Record<MarketAsset["status"], string> = {
  Live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Draft: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "In Research": "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

function AssetCard({ asset, accent }: { asset: MarketAsset; accent: MarketWorkstream["accent"] }) {
  const a = accentMap[accent];
  return (
    <Link
      to={asset.href}
      className={`group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:${a.ring}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${a.bg}`}>
          <asset.icon className={`h-5 w-5 ${a.text}`} />
        </div>
        <span className={`text-[10px] font-medium uppercase tracking-[0.14em] rounded-full px-2 py-0.5 border ${statusStyles[asset.status]}`}>
          {asset.status}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
        {asset.title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{asset.purpose}</p>
      <div className="mt-4 flex items-center text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
        Open <ArrowRight className="ml-1 h-3 w-3" />
      </div>
    </Link>
  );
}

function WorkstreamSection({ w }: { w: MarketWorkstream }) {
  const a = accentMap[w.accent];
  return (
    <section id={w.id} className="border-b border-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-12 gap-10 mb-10">
          <div className="lg:col-span-4">
            <div className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] ${a.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
              {w.number} · {w.eyebrow}
            </div>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">
              {w.headline}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-base text-muted-foreground leading-relaxed">{w.intro}</p>
            <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60">
              {w.label} · {w.assets.length} assets
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {w.assets.map((asset) => (
            <AssetCard key={asset.href} asset={asset} accent={w.accent} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MarketDevelopmentHub() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--primary)/0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(160_84%_45%/0.10),transparent_55%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            <Compass className="h-3 w-3" /> Market Development
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.04] max-w-4xl">
            We're not selling into a category.{" "}
            <span className="text-muted-foreground/70">We're building one.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Every asset on this hub exists to shape the market — research, positioning, narrative, content and brand. Distinct from the enablement portal, which exists to close pipeline that already believes.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {workstreams.map((w, i) => (
              <span key={w.id} className="flex items-center gap-2">
                {i > 0 && <ArrowRight className="h-3 w-3 opacity-40 mr-1" />}
                <a href={`#${w.id}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <span className={`h-2 w-2 rounded-full ${accentMap[w.accent].dot}`} />
                  {w.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Programme map */}
      <section className="border-b border-border/60 bg-card/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <Target className="h-3.5 w-3.5" /> Programme map
          </div>
          <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold tracking-tight max-w-3xl">
            How the workstreams compound.
          </h2>
          <div className="mt-10 grid md:grid-cols-5 gap-3">
            {workstreams.map((w, i) => {
              const a = accentMap[w.accent];
              return (
                <div key={w.id} className="relative">
                  <div className={`rounded-xl border ${a.ring} bg-card p-5 h-full`}>
                    <div className={`text-[10px] uppercase tracking-[0.22em] ${a.text} font-semibold`}>{w.number}</div>
                    <div className="mt-2 font-display text-sm font-semibold text-foreground leading-snug">{w.label}</div>
                    <div className="mt-2 text-[11px] text-muted-foreground leading-relaxed">{w.eyebrow}</div>
                  </div>
                  {i < workstreams.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 z-10" />
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-muted-foreground max-w-3xl">
            Research grounds positioning. Positioning shapes messaging. Messaging fuels content. Content surfaces through brand. Each loop feeds the next — and every asset on this hub plays a role in at least one of them.
          </p>
        </div>
      </section>

      {/* Workstreams */}
      {workstreams.map((w) => (
        <WorkstreamSection key={w.id} w={w} />
      ))}

      {/* Operating rhythm */}
      <section className="border-b border-border/60 bg-card/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Operating rhythm</div>
              <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold tracking-tight">
                The cadence that keeps the category alive.
              </h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Market development only compounds if it operates on a clock. These are the recurring forums where evidence becomes narrative and narrative becomes published work.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 space-y-3">
              {operatingRhythm.map((r) => (
                <div key={r.item} className="rounded-xl border border-border bg-card p-5 flex items-center gap-6">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-primary font-semibold shrink-0 min-w-[80px]">
                    {r.cadence}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground">{r.item}</div>
                    <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{r.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.18),transparent_65%)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Commission new work
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
            What does the category need next?
          </h2>
          <p className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto">
            Take a real customer conversation into a three-hour vision session — or propose a new research, positioning or content asset to slot into one of the five workstreams.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/strategy-vision-session"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Book a vision session <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/category-research-programme"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              See the research programme <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
