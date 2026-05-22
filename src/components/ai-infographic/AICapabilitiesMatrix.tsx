import { useEffect, useRef, useState, useLayoutEffect } from "react";
import {
  aiSolutions,
  noAISolution,
  productColumns,
  solutionColors,
} from "@/data/aiInfographic";

/**
 * 4-column infographic recreating the Comply365 AI Solutions slide.
 * Column 1: AI Solutions (left). Columns 2-4: products (right).
 * SVG arrows are drawn from each solution chip to its target capability rows.
 */
const AICapabilitiesMatrix = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const solutionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<{ id: string; d: string; color: string }[]>([]);

  const computePaths = () => {
    const wrap = containerRef.current;
    if (!wrap) return;
    const wrapBox = wrap.getBoundingClientRect();
    const next: { id: string; d: string; color: string }[] = [];
    const all = [...aiSolutions, noAISolution];
    all.forEach((sol) => {
      const src = solutionRefs.current[sol.id];
      if (!src) return;
      const sBox = src.getBoundingClientRect();
      const x1 = sBox.right - wrapBox.left;
      const y1 = sBox.top + sBox.height / 2 - wrapBox.top;
      sol.targets.forEach((tid) => {
        const tgt = rowRefs.current[tid];
        if (!tgt) return;
        const tBox = tgt.getBoundingClientRect();
        const x2 = tBox.left - wrapBox.left;
        const y2 = tBox.top + tBox.height / 2 - wrapBox.top;
        const mx = (x1 + x2) / 2;
        const d = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
        next.push({
          id: `${sol.id}-${tid}`,
          d,
          color: sol.tier === "ai" ? "hsl(217 91% 60% / 0.55)" : "hsl(215 16% 47% / 0.45)",
        });
      });
    });
    setPaths(next);
  };

  useLayoutEffect(() => {
    computePaths();
  }, []);

  useEffect(() => {
    const onResize = () => computePaths();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        aria-hidden
      >
        <defs>
          <marker
            id="ai-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(217 91% 60% / 0.7)" />
          </marker>
        </defs>
        {paths.map((p) => (
          <path
            key={p.id}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={1.5}
            markerEnd="url(#ai-arrow)"
          />
        ))}
      </svg>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 items-start">
        {/* AI Solutions column */}
        <div className="rounded-2xl border border-primary/40 bg-primary/10 p-4 backdrop-blur-sm">
          <div className="text-center text-sm font-semibold tracking-wide text-primary-foreground bg-primary rounded-xl py-2 mb-4">
            AI Solutions
          </div>
          <div className="space-y-3">
            {aiSolutions.map((sol) => (
              <div
                key={sol.id}
                ref={(el) => (solutionRefs.current[sol.id] = el)}
                className={`rounded-xl bg-gradient-to-r ${solutionColors[sol.id].bg} text-white font-semibold text-center text-sm py-3 px-3 shadow-md`}
              >
                {sol.label}
              </div>
            ))}
            <div className="pt-6">
              <div
                ref={(el) => (solutionRefs.current[noAISolution.id] = el)}
                className={`rounded-xl bg-gradient-to-r ${solutionColors.noai.bg} text-white font-semibold text-center text-sm py-3 px-3 shadow-md`}
              >
                {noAISolution.label}
              </div>
            </div>
          </div>
        </div>

        {/* Product columns */}
        {productColumns.map((col) => (
          <div
            key={col.id}
            className="rounded-2xl border border-border bg-card/40 p-4 backdrop-blur-sm"
          >
            <div className="text-center text-sm font-semibold text-primary-foreground bg-primary rounded-xl py-2 mb-4">
              {col.product}
            </div>
            <div className="space-y-3">
              {col.rows.map((row) => (
                <div
                  key={row.id}
                  ref={(el) => (rowRefs.current[row.id] = el)}
                  className={
                    row.ai
                      ? "rounded-xl bg-gradient-to-r from-blue-500/30 to-blue-400/20 border border-blue-400/30 text-foreground text-center text-sm font-medium py-3 px-3"
                      : "rounded-xl bg-muted/40 border border-border text-muted-foreground text-center text-sm font-medium py-3 px-3"
                  }
                >
                  {row.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AICapabilitiesMatrix;