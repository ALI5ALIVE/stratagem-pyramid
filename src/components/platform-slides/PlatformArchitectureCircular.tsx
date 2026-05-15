import { Repeat, Smartphone, Brain, Database } from "lucide-react";

/**
 * PlatformArchitectureCircular
 * Concentric / closed-loop view of the platform:
 *   Center    → Foundation (Core Operational Apps + Data Model)
 *   Ring 1    → Intelligence & Orchestration Layer
 *   Ring 2    → Unified Mobile Experience
 *   Ring 3    → DTOP (Detect → Trigger → Orchestrate → Prove) as 4 arc segments
 */
const PlatformArchitectureCircular = () => {
  // SVG canvas
  const size = 560;
  const cx = size / 2;
  const cy = size / 2;

  // Ring radii (outer edges)
  const rDtopOuter = 270;
  const rDtopInner = 222;
  const rMobileOuter = 210;
  const rMobileInner = 168;
  const rIntelOuter = 156;
  const rIntelInner = 110;
  const rCore = 100;

  // DTOP arc segments — 4 quadrants, with small gap between
  const dtop = [
    { letter: "D", label: "Detect", color: "hsl(217 91% 60%)", start: -135, end: -47 },
    { letter: "T", label: "Trigger", color: "hsl(38 92% 55%)", start: -43, end: 45 },
    { letter: "O", label: "Orchestrate", color: "hsl(262 83% 65%)", start: 49, end: 137 },
    { letter: "P", label: "Prove", color: "hsl(160 84% 45%)", start: 141, end: 229 },
  ];

  // Helper: build an annular sector path (outer arc + inner arc back)
  const arcPath = (cx: number, cy: number, rOuter: number, rInner: number, startDeg: number, endDeg: number) => {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + rOuter * Math.cos(toRad(startDeg));
    const y1 = cy + rOuter * Math.sin(toRad(startDeg));
    const x2 = cx + rOuter * Math.cos(toRad(endDeg));
    const y2 = cy + rOuter * Math.sin(toRad(endDeg));
    const x3 = cx + rInner * Math.cos(toRad(endDeg));
    const y3 = cy + rInner * Math.sin(toRad(endDeg));
    const x4 = cx + rInner * Math.cos(toRad(startDeg));
    const y4 = cy + rInner * Math.sin(toRad(startDeg));
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  const labelPos = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  return (
    <div className="w-full flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[560px] h-auto"
        role="img"
        aria-label="Concentric platform diagram: Foundation at center wrapped by Intelligence Layer, Unified Mobile, and the DTOP closed loop."
      >
        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(217 91% 60% / 0.25)" />
            <stop offset="100%" stopColor="hsl(217 91% 60% / 0.08)" />
          </radialGradient>
          <marker id="loopArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(160 84% 55%)" />
          </marker>
        </defs>

        {/* Ring 3 — DTOP outer arcs */}
        {dtop.map((seg) => (
          <path
            key={seg.letter}
            d={arcPath(cx, cy, rDtopOuter, rDtopInner, seg.start, seg.end)}
            fill={seg.color}
            fillOpacity={0.14}
            stroke={seg.color}
            strokeOpacity={0.55}
            strokeWidth={1.5}
          />
        ))}
        {/* DTOP labels (letter + word) at midpoint of each arc */}
        {dtop.map((seg) => {
          const mid = (seg.start + seg.end) / 2;
          const letterPos = labelPos(mid, (rDtopOuter + rDtopInner) / 2 + 6);
          const wordPos = labelPos(mid, (rDtopOuter + rDtopInner) / 2 - 14);
          return (
            <g key={`lbl-${seg.letter}`}>
              <text
                x={letterPos.x}
                y={letterPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={seg.color}
                fontSize={26}
                fontWeight={800}
                fontFamily="Space Grotesk, system-ui, sans-serif"
              >
                {seg.letter}
              </text>
              <text
                x={wordPos.x}
                y={wordPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={seg.color}
                fontSize={10}
                letterSpacing={2}
                fontWeight={700}
              >
                {seg.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Closed-loop arrows hinting flow direction (between segments) */}
        {dtop.map((seg, i) => {
          const next = dtop[(i + 1) % dtop.length];
          const gapMid = (seg.end + (next.start > seg.end ? next.start : next.start + 360)) / 2;
          const a = labelPos(gapMid - 4, (rDtopOuter + rDtopInner) / 2);
          const b = labelPos(gapMid + 4, (rDtopOuter + rDtopInner) / 2);
          return (
            <line
              key={`arr-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="hsl(160 84% 55%)"
              strokeWidth={2}
              markerEnd="url(#loopArrow)"
            />
          );
        })}

        {/* Ring 2 — Mobile */}
        <circle cx={cx} cy={cy} r={rMobileOuter} fill="hsl(262 83% 65% / 0.08)" stroke="hsl(262 83% 65% / 0.5)" strokeWidth={1.25} />
        <circle cx={cx} cy={cy} r={rMobileInner} fill="hsl(222 47% 6%)" stroke="hsl(262 83% 65% / 0.4)" strokeWidth={1} />
        <text
          x={cx}
          y={cy - (rMobileOuter + rMobileInner) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(262 83% 75%)"
          fontSize={11}
          fontWeight={700}
          letterSpacing={2}
        >
          UNIFIED MOBILE EXPERIENCE
        </text>
        <text
          x={cx}
          y={cy + (rMobileOuter + rMobileInner) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(262 83% 70% / 0.85)"
          fontSize={9}
          letterSpacing={1.5}
        >
          One trusted shell · SSO · in the cockpit, hangar & depot
        </text>

        {/* Ring 1 — Intelligence */}
        <circle cx={cx} cy={cy} r={rIntelOuter} fill="hsl(38 92% 55% / 0.08)" stroke="hsl(38 92% 55% / 0.5)" strokeWidth={1.25} />
        <circle cx={cx} cy={cy} r={rIntelInner} fill="hsl(222 47% 6%)" stroke="hsl(38 92% 55% / 0.4)" strokeWidth={1} />
        <text
          x={cx}
          y={cy - (rIntelOuter + rIntelInner) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(38 92% 65%)"
          fontSize={10}
          fontWeight={700}
          letterSpacing={2}
        >
          INTELLIGENCE LAYER
        </text>
        <text
          x={cx}
          y={cy + (rIntelOuter + rIntelInner) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(38 92% 65% / 0.85)"
          fontSize={9}
          letterSpacing={1.5}
        >
          ~90% domain accuracy
        </text>

        {/* Center — Foundation */}
        <circle cx={cx} cy={cy} r={rCore} fill="url(#coreGrad)" stroke="hsl(217 91% 60% / 0.6)" strokeWidth={1.5} />
        <text x={cx} y={cy - 56} textAnchor="middle" fill="hsl(217 91% 70%)" fontSize={9} fontWeight={700} letterSpacing={2}>
          FOUNDATION
        </text>
        <text x={cx} y={cy - 38} textAnchor="middle" fill="hsl(0 0% 95%)" fontSize={11} fontWeight={700}>
          One Connected Data Model
        </text>
        <text x={cx} y={cy - 14} textAnchor="middle" fill="hsl(0 0% 90%)" fontSize={11} fontWeight={600}>
          ContentManager365
        </text>
        <text x={cx} y={cy + 4} textAnchor="middle" fill="hsl(0 0% 90%)" fontSize={11} fontWeight={600}>
          SafetyManager365
        </text>
        <text x={cx} y={cy + 22} textAnchor="middle" fill="hsl(0 0% 90%)" fontSize={11} fontWeight={600}>
          TrainingManager365
        </text>
        <text x={cx} y={cy + 48} textAnchor="middle" fill="hsl(0 0% 60%)" fontSize={9} letterSpacing={1.2}>
          Systems of record · operational data
        </text>
      </svg>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl text-xs">
        <div className="flex items-start gap-2 rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <Database className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-blue-300">Foundation</div>
            <div className="text-muted-foreground leading-tight">Core apps + connected data model</div>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <Brain className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-amber-300">Intelligence Layer</div>
            <div className="text-muted-foreground leading-tight">Domain-trained · Recommended Actions</div>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-violet-500/30 bg-violet-500/5 p-3">
          <Smartphone className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-violet-300">Unified Mobile</div>
            <div className="text-muted-foreground leading-tight">Where the platform meets the crew</div>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
          <Repeat className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-emerald-300">DTOP loop</div>
            <div className="text-muted-foreground leading-tight">Detect → Trigger → Orchestrate → Prove</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformArchitectureCircular;