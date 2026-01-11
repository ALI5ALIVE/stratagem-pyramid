import { useState } from "react";

interface MetricsGaugesProps {
  onMetricClick?: (metric: string) => void;
}

const MetricsGauges = ({ onMetricClick }: MetricsGaugesProps) => {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const metrics = [
    { id: "otp", label: "OTP ↑", value: 75, cx: 55 },
    { id: "readiness", label: "Ready ↑", value: 82, cx: 130 },
    { id: "audit", label: "Audit ↑", value: 90, cx: 205 },
  ];

  const gaugeRadius = 28;
  const cy = 45;

  return (
    <svg
      viewBox="0 0 260 75"
      className="w-full h-full"
      style={{
        filter: "drop-shadow(0 0 6px hsl(280 65% 55% / 0.4))"
      }}
    >
      <defs>
        {/* Gauge gradient */}
        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(280 65% 40%)" />
          <stop offset="50%" stopColor="hsl(280 65% 60%)" />
          <stop offset="100%" stopColor="hsl(280 65% 70%)" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="gaugeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="hsl(280 65% 55%)" floodOpacity="0.5" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Hover glow */}
        <filter id="gaugeHoverGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(280 65% 65%)" floodOpacity="0.7" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {metrics.map((metric, index) => {
        const isHovered = hoveredMetric === metric.id;
        // Calculate needle angle based on value (0-100 maps to 180° arc)
        const needleAngle = -180 + (metric.value / 100) * 180;
        const needleLength = gaugeRadius - 6;
        const needleX = metric.cx + needleLength * Math.cos((needleAngle * Math.PI) / 180);
        const needleY = cy + needleLength * Math.sin((needleAngle * Math.PI) / 180);

        return (
          <g
            key={metric.id}
            className="cursor-pointer"
            onClick={() => onMetricClick?.(metric.id)}
            onMouseEnter={() => setHoveredMetric(metric.id)}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            {/* Semi-circle gauge background */}
            <path
              d={`M ${metric.cx - gaugeRadius} ${cy} A ${gaugeRadius} ${gaugeRadius} 0 0 1 ${metric.cx + gaugeRadius} ${cy}`}
              fill="none"
              stroke="hsl(280 20% 25%)"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Gauge fill based on value */}
            <path
              d={`M ${metric.cx - gaugeRadius} ${cy} A ${gaugeRadius} ${gaugeRadius} 0 0 1 ${metric.cx + gaugeRadius} ${cy}`}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(metric.value / 100) * Math.PI * gaugeRadius} ${Math.PI * gaugeRadius}`}
              filter={isHovered ? "url(#gaugeHoverGlow)" : "url(#gaugeGlow)"}
              style={{
                opacity: isHovered ? 1 : 0.85,
                transition: "opacity 0.3s ease"
              }}
            />

            {/* Needle */}
            <line
              x1={metric.cx}
              y1={cy}
              x2={needleX}
              y2={needleY}
              stroke={isHovered ? "hsl(280 65% 75%)" : "hsl(280 65% 60%)"}
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                transition: "stroke 0.3s ease",
                transformOrigin: `${metric.cx}px ${cy}px`,
              }}
            >
              {/* Subtle needle animation */}
              <animateTransform
                attributeName="transform"
                type="rotate"
                values={`0 ${metric.cx} ${cy}; 3 ${metric.cx} ${cy}; -2 ${metric.cx} ${cy}; 0 ${metric.cx} ${cy}`}
                dur="4s"
                begin={`${index * 0.5}s`}
                repeatCount="indefinite"
              />
            </line>

            {/* Center dot */}
            <circle
              cx={metric.cx}
              cy={cy}
              r="3"
              fill={isHovered ? "hsl(280 65% 70%)" : "hsl(280 65% 55%)"}
            />

            {/* Label */}
            <text
              x={metric.cx}
              y={cy + 16}
              textAnchor="middle"
              fill={isHovered ? "hsl(280 65% 80%)" : "hsl(210 40% 90%)"}
              fontSize="8"
              fontWeight="600"
              fontFamily="'Space Grotesk', sans-serif"
              letterSpacing="0.03em"
              className="pointer-events-none select-none uppercase"
              style={{
                textShadow: isHovered ? "0 0 8px hsl(280 65% 55%)" : "none"
              }}
            >
              {metric.label}
            </text>
          </g>
        );
      })}

      {/* Connecting line between gauges */}
      <line
        x1={metrics[0].cx + gaugeRadius + 5}
        y1={cy}
        x2={metrics[1].cx - gaugeRadius - 5}
        y2={cy}
        stroke="hsl(280 65% 50%)"
        strokeWidth="1"
        strokeDasharray="3 2"
        strokeOpacity="0.5"
      />
      <line
        x1={metrics[1].cx + gaugeRadius + 5}
        y1={cy}
        x2={metrics[2].cx - gaugeRadius - 5}
        y2={cy}
        stroke="hsl(280 65% 50%)"
        strokeWidth="1"
        strokeDasharray="3 2"
        strokeOpacity="0.5"
      />
    </svg>
  );
};

export default MetricsGauges;
