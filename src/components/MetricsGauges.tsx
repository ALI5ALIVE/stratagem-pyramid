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

  const gaugeRadius = 34;
  const cy = 40;

  return (
    <svg
      viewBox="0 0 260 80"
      className="w-full h-full"
      style={{
        filter: "drop-shadow(0 0 10px hsl(280 65% 55% / 0.6))"
      }}
    >
      <defs>
        {/* Gauge gradient - brighter */}
        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(280 70% 50%)" />
          <stop offset="50%" stopColor="hsl(280 75% 65%)" />
          <stop offset="100%" stopColor="hsl(280 80% 75%)" />
        </linearGradient>

        {/* Glow filter - stronger */}
        <filter id="gaugeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(280 70% 60%)" floodOpacity="0.7" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Hover glow - brighter */}
        <filter id="gaugeHoverGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="hsl(280 75% 70%)" floodOpacity="0.9" />
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
            {/* Semi-circle gauge background - darker for contrast */}
            <path
              d={`M ${metric.cx - gaugeRadius} ${cy} A ${gaugeRadius} ${gaugeRadius} 0 0 1 ${metric.cx + gaugeRadius} ${cy}`}
              fill="none"
              stroke="hsl(280 20% 20%)"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Gauge fill based on value */}
            <path
              d={`M ${metric.cx - gaugeRadius} ${cy} A ${gaugeRadius} ${gaugeRadius} 0 0 1 ${metric.cx + gaugeRadius} ${cy}`}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(metric.value / 100) * Math.PI * gaugeRadius} ${Math.PI * gaugeRadius}`}
              filter={isHovered ? "url(#gaugeHoverGlow)" : "url(#gaugeGlow)"}
              style={{
                opacity: isHovered ? 1 : 0.95,
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

            {/* Label - larger and brighter with outline */}
            <text
              x={metric.cx}
              y={cy + 22}
              textAnchor="middle"
              fill={isHovered ? "hsl(280 80% 92%)" : "hsl(280 70% 88%)"}
              fontSize="11"
              fontWeight="800"
              fontFamily="'Space Grotesk', sans-serif"
              letterSpacing="0.05em"
              className="pointer-events-none select-none uppercase"
              stroke="hsl(280 30% 15%)"
              strokeWidth="2"
              paintOrder="stroke fill"
              style={{
                textShadow: "0 0 12px hsl(280 80% 70%), 0 2px 4px hsl(0 0% 0% / 0.5)"
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
