import { useState } from "react";
import { Shield, FileText, GraduationCap } from "lucide-react";

interface InfinityLoopProps {
  onModuleClick: (module: string) => void;
}

const InfinityLoop = ({ onModuleClick }: InfinityLoopProps) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const modules = [
    { id: "safety", label: "Safety", icon: Shield, position: "left" },
    { id: "content", label: "Content", icon: FileText, position: "top" },
    { id: "training", label: "Training", icon: GraduationCap, position: "right" },
  ];

  return (
    <div className="relative w-full max-w-[160px] mx-auto">
      {/* Infinity Symbol SVG */}
      <svg
        viewBox="0 0 200 100"
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 0 10px hsl(199 89% 48% / 0.3))" }}
      >
        {/* Background glow */}
        <defs>
          <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(199 89% 48%)" />
            <stop offset="50%" stopColor="hsl(173 80% 50%)" />
            <stop offset="100%" stopColor="hsl(199 89% 48%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated infinity path */}
        <path
          d="M 50 50 C 50 20, 80 20, 100 50 C 120 80, 150 80, 150 50 C 150 20, 120 20, 100 50 C 80 80, 50 80, 50 50"
          fill="none"
          stroke="url(#infinityGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          className="animate-pulse-glow"
          strokeDasharray="5 3"
        />

        {/* Flow arrows/dots */}
        <circle r="4" fill="hsl(199 89% 48%)">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M 50 50 C 50 20, 80 20, 100 50 C 120 80, 150 80, 150 50 C 150 20, 120 20, 100 50 C 80 80, 50 80, 50 50"
          />
        </circle>
        <circle r="4" fill="hsl(173 80% 50%)">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            begin="1.33s"
            path="M 50 50 C 50 20, 80 20, 100 50 C 120 80, 150 80, 150 50 C 150 20, 120 20, 100 50 C 80 80, 50 80, 50 50"
          />
        </circle>
        <circle r="4" fill="hsl(199 89% 60%)">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            begin="2.66s"
            path="M 50 50 C 50 20, 80 20, 100 50 C 120 80, 150 80, 150 50 C 150 20, 120 20, 100 50 C 80 80, 50 80, 50 50"
          />
        </circle>
      </svg>

      {/* Module Labels */}
      {modules.map((module) => {
        const Icon = module.icon;
        const positionClasses = {
          left: "-left-2 top-1/2 -translate-y-1/2 -translate-x-full",
          top: "left-1/2 -top-2 -translate-x-1/2 -translate-y-full",
          right: "-right-2 top-1/2 -translate-y-1/2 translate-x-full",
        };

        return (
          <button
            key={module.id}
            onClick={() => onModuleClick(module.id)}
            onMouseEnter={() => setHoveredModule(module.id)}
            onMouseLeave={() => setHoveredModule(null)}
            className={`absolute flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-300 cursor-pointer
              ${positionClasses[module.position as keyof typeof positionClasses]}
              ${hoveredModule === module.id 
                ? "bg-primary/20 scale-110 text-primary" 
                : "text-muted-foreground hover:text-foreground"
              }`}
            style={{
              textShadow: hoveredModule === module.id ? "0 0 20px hsl(199 89% 48%)" : "none",
            }}
          >
            <Icon className="w-3 h-3" />
            <span className="text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap">
              {module.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default InfinityLoop;
