import { useEffect, useMemo, useRef, useState } from "react";

interface TripleLoopProps {
  onModuleClick: (module: string) => void;
  scale?: number;
}

const TripleLoop = ({ onModuleClick, scale = 1 }: TripleLoopProps) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const modules = [
    { id: "safety", label: "Safety", cx: 70, color: "hsl(185 75% 40%)" },
    { id: "content", label: "Content", cx: 150, color: "hsl(173 80% 50%)" },
    { id: "training", label: "Training", cx: 230, color: "hsl(160 70% 45%)" },
  ];

  const loopRadius = 35;
  const cy = 50;

  // Create a proper continuous path that traces through all 3 overlapping circles
  // The path goes: around Safety (clockwise) → cross to Content → around Content (clockwise) 
  // → cross to Training → around Training (clockwise) → back through Content → back to Safety
  const createFlowPath = () => {
    const r = loopRadius;
    const y = cy;
    
    // Circle centers
    const c1 = modules[0].cx; // Safety (70)
    const c2 = modules[1].cx; // Content (150)
    const c3 = modules[2].cx; // Training (230)
    
    // Calculate actual intersection points between circles
    // Distance between centers
    const d12 = c2 - c1; // 80
    const d23 = c3 - c2; // 80
    
    // For two circles of radius r with centers d apart, intersection x offset from first center
    // Using circle intersection formula: x = (d² + r² - r²) / (2d) = d/2
    // y offset: sqrt(r² - (d/2)²)
    const intersectOffset12 = d12 / 2; // 40
    const intersectOffset23 = d23 / 2; // 40
    const yOffset12 = Math.sqrt(r * r - intersectOffset12 * intersectOffset12);
    const yOffset23 = Math.sqrt(r * r - intersectOffset23 * intersectOffset23);
    
    // Intersection points between Safety and Content
    const int1Top = { x: c1 + intersectOffset12, y: y - yOffset12 };
    const int1Bot = { x: c1 + intersectOffset12, y: y + yOffset12 };
    
    // Intersection points between Content and Training
    const int2Top = { x: c2 + intersectOffset23, y: y - yOffset23 };
    const int2Bot = { x: c2 + intersectOffset23, y: y + yOffset23 };
    
    // Build path that traces through all circles using cubic beziers for smooth transitions
    // Start at left side of Safety, go clockwise
    return `
      M ${c1 - r} ${y}
      A ${r} ${r} 0 1 1 ${int1Top.x} ${int1Top.y}
      A ${r} ${r} 0 0 1 ${c2} ${y - r}
      A ${r} ${r} 0 1 1 ${int2Top.x} ${int2Top.y}
      A ${r} ${r} 0 1 1 ${c3 - r} ${y}
      A ${r} ${r} 0 1 1 ${int2Bot.x} ${int2Bot.y}
      A ${r} ${r} 0 0 1 ${c2} ${y + r}
      A ${r} ${r} 0 1 1 ${int1Bot.x} ${int1Bot.y}
      A ${r} ${r} 0 0 1 ${c1 - r} ${y}
    `;
  };

  // Normalize path string to single line (prevents SVG parsing issues)
  const flowPath = useMemo(
    () => createFlowPath().trim().replace(/\s+/g, " "),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
      const t = ((now - start) / 8000) % 1; // 8s loop
      const p = pathEl.getPointAtLength(length * t);

      dotEl.setAttribute("cx", String(p.x));
      dotEl.setAttribute("cy", String(p.y));

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [flowPath]);

  return (
    <svg
      viewBox="0 0 300 100"
      className="w-full h-auto max-w-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ 
        transform: `scale(${scale})`,
        filter: "drop-shadow(0 0 8px hsl(173 80% 40% / 0.4))"
      }}
    >
      <defs>
        {/* Gradient for the loops */}
        <linearGradient id="tripleLoopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(173 80% 50%)" />
          <stop offset="50%" stopColor="hsl(199 89% 55%)" />
          <stop offset="100%" stopColor="hsl(173 80% 50%)" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="tripleLoopGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(173 80% 50%)" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Hover glow filter */}
        <filter id="moduleHoverGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="hsl(173 80% 60%)" floodOpacity="0.8" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Dot glow */}
        <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Three interlocking circles */}
      {modules.map((module) => {
        const isHovered = hoveredModule === module.id;
        
        return (
          <g key={module.id}>
            {/* Circle outline */}
            <circle
              cx={module.cx}
              cy={cy}
              r={loopRadius}
              fill="transparent"
              stroke={isHovered ? module.color.replace(/\d+%\)$/, "70%)") : module.color}
              strokeWidth={isHovered ? "3" : "2"}
              strokeDasharray="4 2"
              className="cursor-pointer transition-all duration-300"
              filter={isHovered ? "url(#moduleHoverGlow)" : "url(#tripleLoopGlow)"}
              onClick={() => onModuleClick(module.id)}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
              style={{
                opacity: isHovered ? 1 : 0.85,
              }}
            />
            
            {/* Module label in center */}
            <text
              x={module.cx}
              y={cy + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isHovered ? module.color.replace(/\d+%\)$/, "80%)") : "hsl(210 40% 90%)"}
              fontSize="9"
              fontWeight="600"
              fontFamily="'Space Grotesk', sans-serif"
              letterSpacing="0.05em"
              className="uppercase cursor-pointer pointer-events-none select-none transition-all duration-300"
              style={{
                textShadow: isHovered ? `0 0 10px ${module.color}` : "none"
              }}
            >
              {module.label}
            </text>
          </g>
        );
      })}

      {/* Connection overlaps (the intersections between circles) */}
      <ellipse
        cx={110}
        cy={cy}
        rx="8"
        ry="20"
        fill="hsl(179 77% 45% / 0.3)"
        className="pointer-events-none"
      />
      <ellipse
        cx={190}
        cy={cy}
        rx="8"
        ry="20"
        fill="hsl(166 75% 47% / 0.3)"
        className="pointer-events-none"
      />

      {/* Define the path for the dot to follow */}
      <path
        ref={pathRef}
        d={flowPath}
        fill="none"
        stroke="transparent"
        strokeWidth="1"
      />

      {/* Animated dot (RAF-driven for cross-browser reliability) */}
      <circle
        ref={dotRef}
        r="6"
        cx={modules[0].cx - loopRadius}
        cy={cy}
        fill="hsl(50 95% 75%)"
        filter="url(#dotGlow)"
      />
    </svg>
  );
};

export default TripleLoop;
