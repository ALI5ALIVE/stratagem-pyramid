import { useEffect, useRef, useState } from "react";
import SlideContainer from "./SlideContainer";
import { Radio, Bell, GitBranch, ShieldCheck, ArrowRight } from "lucide-react";
import CoreSolutionsInfinity from "../CoreSolutionsInfinity";

const Slide3OperatingModel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    {
      id: "detect",
      icon: Radio,
      label: "Detect",
      description: "Capture operational signals earlier (risk + issues + drift)",
      color: "text-amber-500",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/50",
      glowColor: "shadow-amber-500/30",
    },
    {
      id: "trigger",
      icon: Bell,
      label: "Trigger",
      description: "Convert signals into coordinated actions (not manual handoffs)",
      color: "text-orange-500",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/50",
      glowColor: "shadow-orange-500/30",
    },
    {
      id: "orchestrate",
      icon: GitBranch,
      label: "Orchestrate",
      description: "Controlled procedural change + targeted training activation with governance",
      color: "text-primary",
      bgColor: "bg-primary/20",
      borderColor: "border-primary/50",
      glowColor: "shadow-primary/30",
    },
    {
      id: "prove",
      icon: ShieldCheck,
      label: "Prove",
      description: "Audit-ready evidence and readiness proof by default",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/50",
      glowColor: "shadow-emerald-500/30",
    },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <SlideContainer
      id="slide-3"
      title="The Continuous Improvement Operating System"
      subtitle="The narrative spine that powers every outcome"
    >
      {/* Core Solutions Infinity Model */}
      <div className="mb-16">
        <CoreSolutionsInfinity />
      </div>

      {/* Main Pipeline Visual */}
      <div className="relative max-w-5xl mx-auto">
        {/* Connection line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/30 via-primary/30 to-emerald-500/30 -translate-y-1/2 hidden md:block" />
        
        {/* Animated progress line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-500 via-primary to-emerald-500 -translate-y-1/2 transition-all duration-500 hidden md:block"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= activeStep;
            
            return (
              <div key={step.id} className="relative">
                {/* Arrow between steps (mobile hidden) */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-5 top-1/2 -translate-y-1/2 hidden md:block z-10">
                    <ArrowRight className={`w-6 h-6 transition-colors duration-300 ${isActive ? step.color : 'text-muted-foreground/30'}`} />
                  </div>
                )}

                <div 
                  className={`
                    relative p-6 rounded-2xl border-2 transition-all duration-500
                    ${isActive ? `${step.bgColor} ${step.borderColor} shadow-lg ${step.glowColor}` : 'bg-card/20 border-muted-foreground/20'}
                  `}
                >
                  {/* Icon */}
                  <div className={`
                    w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-500
                    ${isActive ? `${step.bgColor} ${step.borderColor} border-2` : 'bg-muted/30 border-muted-foreground/20 border'}
                  `}>
                    <Icon className={`w-8 h-8 transition-colors duration-500 ${isActive ? step.color : 'text-muted-foreground/50'}`} />
                  </div>

                  {/* Label */}
                  <h3 className={`text-xl font-bold text-center mb-2 transition-colors duration-500 ${isActive ? step.color : 'text-muted-foreground/50'}`}>
                    {step.label}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm text-center transition-colors duration-500 ${isActive ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                    {step.description}
                  </p>

                  {/* Step number */}
                  <div className={`
                    absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${isActive ? `${step.bgColor} ${step.color} border-2 ${step.borderColor}` : 'bg-muted text-muted-foreground border border-muted-foreground/20'}
                  `}>
                    {index + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated dots (desktop only) */}
      <div className="relative h-8 max-w-5xl mx-auto mt-8 hidden md:block">
        <svg className="w-full h-full overflow-visible">
          <defs>
            <filter id="dotGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {[0, 1, 2].map((dotIndex) => (
            <circle
              key={dotIndex}
              r="6"
              fill="hsl(var(--primary))"
              filter="url(#dotGlow)"
              className="animate-pulse"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin={`${dotIndex * 1.3}s`}
                path="M 50 16 L 950 16"
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Board-level summary */}
      <div className="mt-12 max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-amber-500/10 via-primary/10 to-emerald-500/10 border border-primary/20 rounded-xl p-6 text-center">
          <p className="text-lg font-medium text-foreground mb-2">
            Operating Model Name:
          </p>
          <p className="text-2xl font-bold text-gradient-primary">
            Continuous Improvement Operating System
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            Detect → Trigger → Orchestrate → Prove
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide3OperatingModel;
