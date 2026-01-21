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
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/50",
    },
    {
      id: "trigger",
      icon: Bell,
      label: "Trigger",
      description: "Convert signals into coordinated actions (not manual handoffs)",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/50",
    },
    {
      id: "orchestrate",
      icon: GitBranch,
      label: "Orchestrate",
      description: "Controlled procedural change + targeted training activation with governance",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/50",
    },
    {
      id: "prove",
      icon: ShieldCheck,
      label: "Prove",
      description: "Audit-ready evidence and readiness proof by default",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/50",
    },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);

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
      slideNumber={3}
    >
      {/* Core Solutions Infinity Model */}
      <div className="mb-12">
        <CoreSolutionsInfinity />
      </div>

      {/* Main Pipeline Visual */}
      <div className="relative max-w-5xl mx-auto">
        {/* Connection line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden md:block" />
        
        {/* Animated progress line */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500 hidden md:block"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-3 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= activeStep;
            
            return (
              <div key={step.id} className="relative">
                {/* Arrow between steps (mobile hidden) */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block z-10">
                    <ArrowRight className={`w-5 h-5 transition-colors duration-300 ${isActive ? step.color : 'text-muted-foreground/30'}`} />
                  </div>
                )}

                <div 
                  className={`
                    relative p-5 rounded-xl border transition-all duration-500
                    ${isActive ? `${step.bgColor} ${step.borderColor}` : 'bg-card/30 border-border'}
                  `}
                >
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center transition-all duration-500
                    ${isActive ? `${step.bgColor} ${step.borderColor} border` : 'bg-muted/30 border-border border'}
                  `}>
                    <Icon className={`w-6 h-6 transition-colors duration-500 ${isActive ? step.color : 'text-muted-foreground/50'}`} />
                  </div>

                  {/* Label */}
                  <h3 className={`text-lg font-bold text-center mb-2 transition-colors duration-500 ${isActive ? step.color : 'text-muted-foreground/50'}`}>
                    {step.label}
                  </h3>

                  {/* Description */}
                  <p className={`text-xs text-center transition-colors duration-500 ${isActive ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                    {step.description}
                  </p>

                  {/* Step number */}
                  <div className={`
                    absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    ${isActive ? `${step.bgColor} ${step.color} border ${step.borderColor}` : 'bg-muted text-muted-foreground border border-border'}
                  `}>
                    {index + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Board-level summary */}
      <div className="mt-10 max-w-3xl mx-auto">
        <div className="bg-card border border-primary/30 rounded-xl p-5 text-center">
          <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">
            Operating Model Name:
          </p>
          <p className="text-xl font-bold text-foreground">
            Continuous Improvement Operating System
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Detect → Trigger → Orchestrate → Prove
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide3OperatingModel;
