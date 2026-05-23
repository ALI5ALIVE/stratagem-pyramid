import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { workstreams, type MarketAsset } from "@/data/marketDevelopmentAssets";
import logo from "@/assets/comply365-logo-white.png";

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-foreground tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function AssetCard({ asset }: { asset: MarketAsset }) {
  return (
    <Link
      to={asset.href}
      className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-xl bg-gradient-to-r from-primary to-comply-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
          <asset.icon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-[11px] font-medium text-muted-foreground bg-secondary rounded-full px-2.5 py-0.5">
          {asset.status}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {asset.title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{asset.purpose}</p>

      <div className="mt-4 flex items-center text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1">
        Open <ArrowRight className="ml-1 h-3 w-3" />
      </div>
    </Link>
  );
}

export default function MarketDevelopmentHub() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Comply365" className="h-7" />
            <div className="h-5 w-px bg-border" />
            <span className="text-sm font-medium text-muted-foreground">Stratagem</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-4">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Market Development
        </h1>
        <p className="text-muted-foreground mt-1 text-sm max-w-xl">
          Research, positioning, messaging, content and brand — the assets that build the category.
        </p>
      </div>

      {/* Workstream grids */}
      <div className="max-w-7xl mx-auto px-6 pb-16 space-y-12">
        {workstreams.map((w) => (
          <section key={w.id} id={w.id}>
            <SectionHeader title={w.label} subtitle={w.eyebrow} />
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
                w.assets.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
              }`}
            >
              {w.assets.map((asset) => (
                <AssetCard key={asset.href} asset={asset} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
