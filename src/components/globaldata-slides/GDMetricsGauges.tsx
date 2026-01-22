import { useState, useEffect } from "react";
import { Lightbulb, Clock, Target, Sparkles } from "lucide-react";

interface GDMetricsGaugesProps {
  onMetricClick?: (metric: string) => void;
}

const GDMetricsGauges = ({ onMetricClick }: GDMetricsGaugesProps) => {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);

  const metrics = [
    { id: "npd", label: "NPD Hit ↑", value: 78, icon: Lightbulb, color: "hsl(280, 65%, 55%)" },
    { id: "insight", label: "Insight ↓", value: 85, icon: Clock, color: "hsl(280, 65%, 60%)" },
    { id: "windows", label: "Windows ↑", value: 88, icon: Target, color: "hsl(280, 65%, 50%)" },
  ];

  // Animate gauge values on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(metrics.map(m => m.value));
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Doubled gauge dimensions
  const gaugeRadius = 56;
  const gaugeWidth = 12;
  const gaugeCenterY = 64;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 520 150" className="w-full max-w-[520px]">
        <defs>
          <linearGradient id="gdGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(280, 65%, 45%)" />
            <stop offset="100%" stopColor="hsl(280, 65%, 65%)" />
          </linearGradient>
          <filter id="gdGaugeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feFlood floodColor="hsl(280, 65%, 55%)" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="gdGaugeHoverGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feFlood floodColor="hsl(280, 65%, 55%)" floodOpacity="0.8" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ava sparkle indicator at top center */}
        <g transform="translate(260, 16)">
          <circle r="16" fill="hsl(45, 93%, 58%)" fillOpacity="0.3" />
          <foreignObject x="-12" y="-12" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
          </foreignObject>
        </g>

        {/* Dashed connecting lines between gauges */}
        <line x1="140" y1={gaugeCenterY} x2="200" y2={gaugeCenterY} stroke="hsl(280, 65%, 55%)" strokeWidth="2" strokeDasharray="6 4" strokeOpacity="0.5" />
        <line x1="320" y1={gaugeCenterY} x2="380" y2={gaugeCenterY} stroke="hsl(280, 65%, 55%)" strokeWidth="2" strokeDasharray="6 4" strokeOpacity="0.5" />

        {metrics.map((metric, index) => {
          const cx = 90 + index * 170;
          const isHovered = hoveredMetric === metric.id;
          const animatedValue = animatedValues[index];
          
          // Calculate arc for semi-circular gauge (180 degrees)
          const arcLength = Math.PI * gaugeRadius;
          const filledLength = (animatedValue / 100) * arcLength;
          
          // Needle angle (0 = left, 180 = right)
          const needleAngle = (animatedValue / 100) * 180 - 180;
          
          const IconComponent = metric.icon;

          return (
            <g
              key={metric.id}
              className="cursor-pointer"
              onClick={() => onMetricClick?.(metric.id)}
              onMouseEnter={() => setHoveredMetric(metric.id)}
              onMouseLeave={() => setHoveredMetric(null)}
              style={{ filter: isHovered ? "url(#gdGaugeHoverGlow)" : "url(#gdGaugeGlow)" }}
            >
              {/* Background arc */}
              <path
                d={`M ${cx - gaugeRadius} ${gaugeCenterY} A ${gaugeRadius} ${gaugeRadius} 0 0 1 ${cx + gaugeRadius} ${gaugeCenterY}`}
                fill="none"
                stroke="hsl(280, 30%, 25%)"
                strokeWidth={gaugeWidth}
                strokeLinecap="round"
              />
              
              {/* Filled arc */}
              <path
                d={`M ${cx - gaugeRadius} ${gaugeCenterY} A ${gaugeRadius} ${gaugeRadius} 0 0 1 ${cx + gaugeRadius} ${gaugeCenterY}`}
                fill="none"
                stroke="url(#gdGaugeGradient)"
                strokeWidth={gaugeWidth}
                strokeLinecap="round"
                strokeDasharray={`${filledLength} ${arcLength}`}
                className="transition-all duration-1000 ease-out"
              />
              
              {/* Needle */}
              <g transform={`translate(${cx}, ${gaugeCenterY})`}>
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={-gaugeRadius + 16}
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  transform={`rotate(${needleAngle})`}
                  className="transition-transform duration-1000 ease-out"
                />
                <circle r="8" fill={metric.color} />
              </g>
              
              {/* Icon */}
              <foreignObject x={cx - 16} y={gaugeCenterY - 36} width="32" height="32">
                <div className="w-full h-full flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white/80" strokeWidth={2} />
                </div>
              </foreignObject>
              
              {/* Value */}
              <text
                x={cx}
                y={gaugeCenterY + 40}
                textAnchor="middle"
                fill="white"
                fontSize="20"
                fontWeight="700"
                fontFamily="'Space Grotesk', sans-serif"
              >
                {animatedValue}%
              </text>
              
              {/* Label */}
              <text
                x={cx}
                y={gaugeCenterY + 64}
                textAnchor="middle"
                fill="hsl(280, 40%, 80%)"
                fontSize="14"
                fontWeight="500"
                fontFamily="'Inter', sans-serif"
              >
                {metric.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GDMetricsGauges;
