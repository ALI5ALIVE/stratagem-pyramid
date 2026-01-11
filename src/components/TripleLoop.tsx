import { useEffect, useRef, useState } from "react";

interface TripleLoopProps {
  onModuleClick: (module: string) => void;
  scale?: number;
}

const TripleLoop = ({ onModuleClick, scale = 1 }: TripleLoopProps) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  // Compact layout to fit within trapezoid layer
  const modules = [
    { id: "safety", label: "Safety", cx: 45, color: "hsl(185 75% 40%)" },
    { id: "content", label: "Content", cx: 90, color: "hsl(173 80% 50%)" },
    { id: "training", label: "Training", cx: 135, color: "hsl(160 70% 45%)" },
  ];

  // Radius and spacing tuned to fit within a narrower area
  // Distance between centers = 45, so radius needs to be > 22.5 for intersection
  const loopRadius = 28;
  const cy = 38;

  // Create flow path that fully circles each module before moving to the next
  const createFlowPath = () => {
    const [m1, m2, m3] = modules;
    const r = loopRadius;
    const y = cy;
    
    // Full circle for each module: start at top, go clockwise, then transition to next
    return `
      M ${m1.cx} ${y - r}
      A ${r} ${r} 0 0 1 ${m1.cx} ${y + r}
      A ${r} ${r} 0 0 1 ${m1.cx} ${y - r}
      Q ${(m1.cx + m2.cx) / 2} ${y - r * 1.3} ${m2.cx} ${y - r}
      A ${r} ${r} 0 0 1 ${m2.cx} ${y + r}
      A ${r} ${r} 0 0 1 ${m2.cx} ${y - r}
      Q ${(m2.cx + m3.cx) / 2} ${y - r * 1.3} ${m3.cx} ${y - r}
      A ${r} ${r} 0 0 1 ${m3.cx} ${y + r}
      A ${r} ${r} 0 0 1 ${m3.cx} ${y - r}
      Q ${(m2.cx + m3.cx) / 2} ${y - r * 1.3} ${m2.cx} ${y - r}
      Q ${(m1.cx + m2.cx) / 2} ${y - r * 1.3} ${m1.cx} ${y - r}
    `.trim().replace(/\s+/g, " ");
  };

  const flowPath = createFlowPath();

  const pathRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const pathEl = pathRef.current;
    const dotEl = dotRef.current;
    if (!pathEl || !dotEl) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const length = pathEl.getTotalLength();
      if (!length || isNaN(length) || length === 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      
      const t = ((now - start) / 10000) % 1; // 10s loop for full circles
      const p = pathEl.getPointAtLength(length * t);

      if (p && !isNaN(p.x) && !isNaN(p.y)) {
        dotEl.setAttribute("cx", String(p.x));
        dotEl.setAttribute("cy", String(p.y));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [flowPath]);

  return (
    <svg
      viewBox="0 0 180 76"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ 
        transform: `scale(${scale})`,
        filter: "drop-shadow(0 0 6px hsl(173 80% 40% / 0.4))"
      }}
    >
      <defs>
        <linearGradient id="tripleLoopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(173 80% 50%)" />
          <stop offset="50%" stopColor="hsl(199 89% 55%)" />
          <stop offset="100%" stopColor="hsl(173 80% 50%)" />
        </linearGradient>
        
        <filter id="tripleLoopGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="hsl(173 80% 50%)" floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="moduleHoverGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(173 80% 60%)" floodOpacity="0.7" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hidden path for animation */}
      <path
        ref={pathRef}
        d={flowPath}
        fill="none"
        stroke="transparent"
        strokeWidth="1"
      />

      {/* Three interlocking circles */}
      {modules.map((module) => {
        const isHovered = hoveredModule === module.id;
        
        return (
          <g key={module.id}>
            <circle
              cx={module.cx}
              cy={cy}
              r={loopRadius}
              fill="transparent"
              stroke={isHovered ? module.color.replace(/\d+%\)$/, "70%)") : module.color}
              strokeWidth={isHovered ? "2.5" : "1.5"}
              strokeDasharray="3 1.5"
              className="cursor-pointer transition-all duration-300"
              filter={isHovered ? "url(#moduleHoverGlow)" : "url(#tripleLoopGlow)"}
              onClick={() => onModuleClick(module.id)}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
              style={{ opacity: isHovered ? 1 : 0.85 }}
            />
            
            <text
              x={module.cx}
              y={cy + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isHovered ? module.color.replace(/\d+%\)$/, "80%)") : "hsl(210 40% 90%)"}
              fontSize="7"
              fontWeight="600"
              fontFamily="'Space Grotesk', sans-serif"
              letterSpacing="0.04em"
              className="uppercase cursor-pointer pointer-events-none select-none transition-all duration-300"
              style={{ textShadow: isHovered ? `0 0 8px ${module.color}` : "none" }}
            >
              {module.label}
            </text>
          </g>
        );
      })}

      {/* Animated dot */}
      <circle
        ref={dotRef}
        r="4"
        cx={modules[0].cx}
        cy={cy - loopRadius}
        fill="hsl(50 95% 70%)"
        filter="url(#dotGlow)"
      />
    </svg>
  );
};

export default TripleLoop;
