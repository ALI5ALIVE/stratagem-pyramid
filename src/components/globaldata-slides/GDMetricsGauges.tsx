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

  const gaugeRadius = 28;
  const gaugeWidth = 6;
  const gaugeCenterY = 32;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 260 75" className="w-full max-w-[260px]">
        <defs>
          <linearGradient id="gdGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(280, 65%, 45%)" />
            <stop offset="100%" stopColor="hsl(280, 65%, 65%)" />
          </linearGradient>
          <filter id="gdGaugeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="hsl(280, 65%, 55%)" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="gdGaugeHoverGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feFlood floodColor="hsl(280, 65%, 55%)" floodOpacity="0.8" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ava sparkle indicator at top center */}
        <g transform="translate(130, 8)">
          <circle r="8" fill="hsl(45, 93%, 58%)" fillOpacity="0.3" />
          <foreignObject x="-6" y="-6" width="12" height="12">
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
          </foreignObject>
        </g>

        {/* Dashed connecting lines between gauges */}
        <line x1="70" y1={gaugeCenterY} x2="100" y2={gaugeCenterY} stroke="hsl(280, 65%, 55%)" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.5" />
        <line x1="160" y1={gaugeCenterY} x2="190" y2={gaugeCenterY} stroke="hsl(280, 65%, 55%)" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.5" />

        {metrics.map((metric, index) => {
          const cx = 45 + index * 85;
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
                  y2={-gaugeRadius + 8}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform={`rotate(${needleAngle})`}
                  className="transition-transform duration-1000 ease-out"
                />
                <circle r="4" fill={metric.color} />
              </g>
              
              {/* Icon */}
              <foreignObject x={cx - 8} y={gaugeCenterY - 18} width="16" height="16">
                <div className="w-full h-full flex items-center justify-center">
                  <IconComponent className="w-3 h-3 text-white/80" strokeWidth={2} />
                </div>
              </foreignObject>
              
              {/* Value */}
              <text
                x={cx}
                y={gaugeCenterY + 20}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="700"
                fontFamily="'Space Grotesk', sans-serif"
              >
                {animatedValue}%
              </text>
              
              {/* Label */}
              <text
                x={cx}
                y={gaugeCenterY + 32}
                textAnchor="middle"
                fill="hsl(280, 40%, 80%)"
                fontSize="7"
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
