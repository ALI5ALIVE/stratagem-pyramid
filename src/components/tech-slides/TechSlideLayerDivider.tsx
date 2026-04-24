import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export type LayerKey = "dtop" | "mobile" | "intelligence" | "data" | "core";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
  id: string;
  layerNumber?: number;
  layerName: string;
  tagline: string;
  active: LayerKey;
  upNext: string[];
  platformGroupLabel?: string;
  hideLayerNumber?: boolean;
}

// Top-down stack order (matches PlatformArchitectureDiagram)
const stack: { key: LayerKey; label: string; accent: string; bg: string; border: string; text: string }[] = [
  { key: "dtop",         label: "Layer 5 · DTOP — System of Work",        accent: "emerald", bg: "bg-emerald-500/10", border: "border-emerald-500/40", text: "text-emerald-300" },
  { key: "mobile",       label: "Layer 4 · Unified Mobile Experience",    accent: "violet",  bg: "bg-violet-500/10",  border: "border-violet-500/40",  text: "text-violet-300" },
  { key: "intelligence", label: "Layer 3 · Intelligence & Orchestration", accent: "amber",   bg: "bg-amber-500/10",   border: "border-amber-500/40",   text: "text-amber-300" },
  { key: "data",         label: "Layer 2 · Operational Data Foundation",  accent: "cyan",    bg: "bg-cyan-500/10",    border: "border-cyan-500/40",    text: "text-cyan-300" },
  { key: "core",         label: "Layer 1 · Core Operational Apps",        accent: "blue",    bg: "bg-blue-500/10",    border: "border-blue-500/40",    text: "text-blue-300" },
];

const v4Stack: { key: LayerKey; label: string; bg: string; border: string; text: string }[] = [
  { key: "dtop",         label: "DTOP — System of Work",        bg: "bg-emerald-500/10", border: "border-emerald-500/40", text: "text-emerald-300" },
  { key: "mobile",       label: "Unified Mobile Experience",    bg: "bg-violet-500/10",  border: "border-violet-500/40",  text: "text-violet-300" },
  { key: "intelligence", label: "Intelligence & Orchestration", bg: "bg-amber-500/10",   border: "border-amber-500/40",   text: "text-amber-300" },
  { key: "core",         label: "Core Operational Apps",        bg: "bg-blue-500/10",    border: "border-blue-500/40",    text: "text-blue-300" },
];

const accentTextByKey: Record<LayerKey, string> = {
  dtop: "text-emerald-300",
  mobile: "text-violet-300",
  intelligence: "text-amber-300",
  data: "text-cyan-300",
  core: "text-blue-300",
};

const TechSlideLayerDivider = ({
  id,
  slideNumber,
  layerNumber,
  layerName,
  tagline,
  active,
  upNext,
  platformGroupLabel,
  hideLayerNumber,
  ...narrationProps
}: Props) => {
  const accentText = accentTextByKey[active];
  return (
    <SalesSlideContainer
      id={id}
      slideNumber={slideNumber}
      showHeader={false}
      {...narrationProps}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center flex-1 min-h-0">
        {/* Left: eyebrow + title + tagline + up next */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {platformGroupLabel && (
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                {platformGroupLabel}
              </span>
            </div>
          )}
          {!hideLayerNumber && layerNumber !== undefined && (
            <div className={cn("text-xs font-bold uppercase tracking-[0.25em]", accentText)}>
              Layer {layerNumber} · Architecture
            </div>
          )}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground">
            {layerName}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {tagline}
          </p>
          <div className="mt-2">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-2">
              Up next in this layer
            </div>
            <ul className="space-y-1.5">
              {upNext.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground/90">
                  <ArrowRight className={cn("h-3.5 w-3.5", accentText)} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: mini-stack with active layer lit */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-1 text-right">
            You are here
          </div>
          {stack.map((l) => {
            const isActive = l.key === active;
            return (
              <div
                key={l.key}
                className={cn(
                  "rounded-lg border p-3 transition-all",
                  isActive
                    ? cn(l.bg, l.border, "ring-1 ring-offset-0")
                    : "bg-muted/5 border-muted/15 opacity-30"
                )}
              >
                <div className={cn("text-xs font-semibold", isActive ? l.text : "text-muted-foreground")}>
                  {l.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlideLayerDivider;
