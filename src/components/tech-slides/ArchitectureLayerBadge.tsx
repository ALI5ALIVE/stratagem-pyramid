import { cn } from "@/lib/utils";

export type Layer = "dtop" | "mobile" | "intelligence" | "data" | "core";
export type Sublayer =
  | "insights-intelligence"
  | "recommendations"
  | "automation"
  | "content"
  | "training"
  | "safety";

interface Props {
  active: Layer;
  sublayer?: Sublayer;
  className?: string;
}

const layers: { id: Layer; label: string; color: string; bg: string; border: string; ring: string }[] = [
  { id: "dtop",         label: "DTOP",          color: "text-emerald-300", bg: "bg-emerald-500/15", border: "border-emerald-500/40", ring: "ring-emerald-400/60" },
  { id: "mobile",       label: "Mobile",        color: "text-violet-300",  bg: "bg-violet-500/15",  border: "border-violet-500/40",  ring: "ring-violet-400/60" },
  { id: "intelligence", label: "Intelligence",  color: "text-amber-300",   bg: "bg-amber-500/15",   border: "border-amber-500/40",   ring: "ring-amber-400/60" },
  { id: "data",         label: "Data Foundation", color: "text-cyan-300",  bg: "bg-cyan-500/15",    border: "border-cyan-500/40",    ring: "ring-cyan-400/60" },
  { id: "core",         label: "Core Apps",     color: "text-blue-300",    bg: "bg-blue-500/15",    border: "border-blue-500/40",    ring: "ring-blue-400/60" },
];

const sublayersByLayer: Record<string, { id: Sublayer; label: string }[]> = {
  intelligence: [
    { id: "insights-intelligence", label: "Insights & Intelligence" },
    { id: "recommendations",       label: "Recommendations & Prescriptive Actions" },
    { id: "automation",            label: "Automation" },
  ],
  core: [
    { id: "content",  label: "ContentManager365" },
    { id: "training", label: "TrainingManager365" },
    { id: "safety",   label: "SafetyManager365" },
  ],
};

const ArchitectureLayerBadge = ({ active, sublayer, className }: Props) => {
  const subs = sublayersByLayer[active];
  return (
    <div className={cn("flex items-center justify-end gap-2 flex-wrap shrink-0", className)}>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mr-1">Platform</span>
      <div className="flex items-center gap-1">
        {layers.map((l, i) => {
          const isActive = l.id === active;
          return (
            <div key={l.id} className="flex items-center gap-1">
              <span
                className={cn(
                  "px-2 py-0.5 rounded-md text-[10px] font-semibold border transition-all",
                  isActive
                    ? cn(l.color, l.bg, l.border, "ring-1", l.ring)
                    : "text-muted-foreground/50 bg-muted/5 border-muted/20"
                )}
              >
                {l.label}
              </span>
              {i < layers.length - 1 && <span className="text-muted-foreground/30 text-[10px]">›</span>}
            </div>
          );
        })}
      </div>
      {subs && sublayer && (
        <>
          <span className="text-muted-foreground/40 text-[10px] mx-1">•</span>
          <div className="flex items-center gap-1">
            {subs.map((s) => {
              const isActive = s.id === sublayer;
              const layerStyle = layers.find((l) => l.id === active)!;
              return (
                <span
                  key={s.id}
                  className={cn(
                    "px-2 py-0.5 rounded-md text-[10px] font-semibold border",
                    isActive
                      ? cn(layerStyle.color, layerStyle.bg, layerStyle.border, "ring-1", layerStyle.ring)
                      : "text-muted-foreground/40 bg-muted/5 border-muted/20"
                  )}
                >
                  {s.label}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ArchitectureLayerBadge;
