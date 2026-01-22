import React from "react";

const ConnectedIntelligenceWheel = () => {
  const centerX = 200;
  const centerY = 200;

  // Core entities in the inner ring
  const coreEntities = [
    { name: "Brands", angle: -60 },
    { name: "Sectors", angle: -20 },
    { name: "Channels", angle: 20 },
    { name: "Products", angle: 60 },
    { name: "Consumers", angle: 100 },
    { name: "Geo-\ngraphies", angle: 140 },
    { name: "Companies", angle: 180 },
  ];

  // Data points in the middle ring
  const dataPoints = [
    { name: "Market\nData", angle: -80, radius: 115 },
    { name: "Macro Data", angle: -55, radius: 115 },
    { name: "Industry\nResearch", angle: -25, radius: 120 },
    { name: "NPD\nTools", angle: 5, radius: 120 },
    { name: "Product\nLifecycle\nData", angle: 35, radius: 125 },
    { name: "Consumer\nInsights", angle: 65, radius: 120 },
    { name: "Buying\nSignals", angle: 90, radius: 115 },
    { name: "TAM\nBuilder", angle: 110, radius: 120 },
    { name: "Account Plans", angle: 130, radius: 115 },
    { name: "Issue Reports", angle: 150, radius: 115 },
    { name: "Thematic\nSignals", angle: 170, radius: 120 },
    { name: "Patent\nAnalytics", angle: 190, radius: 115 },
    { name: "News,\nDeals", angle: 210, radius: 115 },
    { name: "Company\nData", angle: 230, radius: 115 },
    { name: "Hiring\nSignals", angle: 250, radius: 115 },
  ];

  // Intelligence segments (outer ring) - Emerald/Teal theme
  const segments = [
    { name: "Market Intelligence", startAngle: -90, endAngle: -20, color: "hsl(160 70% 35%)" },
    { name: "Innovation Intelligence", startAngle: -20, endAngle: 50, color: "hsl(155 65% 45%)" },
    { name: "Sales Intelligence", startAngle: 50, endAngle: 130, color: "hsl(165 60% 50%)" },
    { name: "Strategic Intelligence", startAngle: 130, endAngle: 200, color: "hsl(170 55% 55%)" },
    { name: "Competitor Intelligence", startAngle: 200, endAngle: 270, color: "hsl(145 50% 45%)" },
  ];

  const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  };

  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const describeSegment = (cx: number, cy: number, innerR: number, outerR: number, startAngle: number, endAngle: number) => {
    const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
    const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
    const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
    const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${innerStart.x} ${innerStart.y}
            A ${innerR} ${innerR} 0 ${largeArcFlag} 1 ${innerEnd.x} ${innerEnd.y}
            L ${outerEnd.x} ${outerEnd.y}
            A ${outerR} ${outerR} 0 ${largeArcFlag} 0 ${outerStart.x} ${outerStart.y}
            Z`;
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-auto">
        <defs>
          <filter id="wheelGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="hsl(155 70% 50%)" floodOpacity="0.3" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(155 70% 50%)" />
            <stop offset="100%" stopColor="hsl(170 65% 45%)" />
          </linearGradient>
        </defs>

        {/* Outer intelligence segments */}
        {segments.map((segment, i) => {
          const midAngle = (segment.startAngle + segment.endAngle) / 2;
          const labelPos = polarToCartesian(centerX, centerY, 175, midAngle);
          const textAngle = midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle;

          return (
            <g key={i}>
              <path
                d={describeSegment(centerX, centerY, 140, 190, segment.startAngle, segment.endAngle)}
                fill={segment.color}
                stroke="white"
                strokeWidth="1"
              />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-black font-semibold"
                fontSize="8"
                transform={`rotate(${textAngle}, ${labelPos.x}, ${labelPos.y})`}
              >
                {segment.name}
              </text>
            </g>
          );
        })}

        {/* Middle ring - light emerald/teal */}
        <circle cx={centerX} cy={centerY} r="135" fill="hsl(165 50% 88%)" stroke="white" strokeWidth="1" />

        {/* Data points ring */}
        {dataPoints.map((point, i) => {
          const pos = polarToCartesian(centerX, centerY, point.radius, point.angle);
          const lines = point.name.split("\n");
          return (
            <g key={i}>
              <rect
                x={pos.x - 22}
                y={pos.y - (lines.length * 5)}
                width="44"
                height={lines.length * 10 + 4}
                rx="3"
                fill="hsl(160 60% 92%)"
                stroke="hsl(160 45% 65%)"
                strokeWidth="0.5"
              />
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={pos.x}
                  y={pos.y + (li - (lines.length - 1) / 2) * 9}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-black"
                  fontSize="5"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Inner entities ring */}
        <circle cx={centerX} cy={centerY} r="75" fill="hsl(160 55% 72%)" stroke="white" strokeWidth="1" />

        {/* Core entities */}
        {coreEntities.map((entity, i) => {
          const pos = polarToCartesian(centerX, centerY, 60, entity.angle);
          const lines = entity.name.split("\n");
          return (
            <g key={i}>
              <rect
                x={pos.x - 24}
                y={pos.y - (lines.length * 6)}
                width="48"
                height={lines.length * 12 + 4}
                rx="4"
                fill="hsl(155 65% 88%)"
                stroke="hsl(155 50% 55%)"
                strokeWidth="0.5"
              />
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={pos.x}
                  y={pos.y + (li - (lines.length - 1) / 2) * 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-black font-medium"
                  fontSize="7"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Central hub - emerald gradient */}
        <circle cx={centerX} cy={centerY} r="35" fill="url(#centerGradient)" stroke="white" strokeWidth="2" filter="url(#wheelGlow)" />
        <text x={centerX} y={centerY - 5} textAnchor="middle" dominantBaseline="middle" className="fill-white font-bold" fontSize="8">
          Connected
        </text>
        <text x={centerX} y={centerY + 6} textAnchor="middle" dominantBaseline="middle" className="fill-white font-bold" fontSize="8">
          Intelligence
        </text>

        {/* Circular arrow in center */}
        <path
          d={describeArc(centerX, centerY, 25, 30, 330)}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd="url(#arrowhead)"
        />
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="white" />
          </marker>
        </defs>
      </svg>

      {/* External labels */}
      <div className="absolute top-0 left-0 text-xs font-semibold text-black flex items-center gap-1">
        <span>Solutions</span>
        <svg width="20" height="10" className="text-black">
          <path d="M0 5 L15 5 L12 2 M15 5 L12 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute bottom-4 right-0 text-xs font-semibold text-black flex items-center gap-1">
        <svg width="20" height="10" className="text-black">
          <path d="M20 5 L5 5 L8 2 M5 5 L8 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>Products & Content</span>
      </div>
    </div>
  );
};

export default ConnectedIntelligenceWheel;
