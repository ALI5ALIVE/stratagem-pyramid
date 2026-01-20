import { useEffect, useRef, useState } from "react";
import SlideContainer from "./SlideContainer";
import { Radio, Bell, GitBranch, ShieldCheck, ArrowRight, Database, Workflow, Brain, BarChart3 } from "lucide-react";
import CoreSolutionsInfinity from "../CoreSolutionsInfinity";

const Slide3OperatingModel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    {
      id: "detect",
      icon: Radio,
      label: "Detect",
      description: "Capture operational signals earlier — risk, issues, drift — before they become disruptions",
      color: "text-amber-500",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/50",
      glowColor: "shadow-amber-500/30",
    },
    {
      id: "trigger",
      icon: Bell,
      label: "Trigger",
      description: "Convert signals into coordinated actions with threshold-driven, role-aware workflows",
      color: "text-orange-500",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/50",
      glowColor: "shadow-orange-500/30",
    },
    {
      id: "orchestrate",
      icon: GitBranch,
      label: "Orchestrate",
      description: "Controlled procedural change + targeted training activation with configurable governance",
      color: "text-primary",
      bgColor: "bg-primary/20",
      borderColor: "border-primary/50",
      glowColor: "shadow-primary/30",
    },
    {
      id: "prove",
      icon: ShieldCheck,
      label: "Prove",
      description: "Audit-ready evidence and readiness proof generated automatically by default",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/50",
      glowColor: "shadow-emerald-500/30",
    },
  ];

  const pillars = [
    {
      icon: Database,
      title: "Connected Foundation",
      subtitle: "Pillar 1",
      points: [
        "One version of truth across safety, procedures, and training",
        "Shared governance and full traceability",
        "Less fragmentation, less coordination overhead",
      ],
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
    },
    {
      icon: Workflow,
      title: "Continuous Improvement Execution",
      subtitle: "Pillar 2",
      points: [
        "Event → investigation → procedure update",
        "Training trigger → evidence capture",
        "Closed-loop workflow across domains",
      ],
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
    {
      icon: BarChart3,
      title: "Proof at Scale",
      subtitle: "Pillar 3",
      points: [
        "Audit-ready evidence trails by default",
        "Role-based approvals and version control",
        "Confidence across regulators and stakeholders",
      ],
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
    },
    {
      icon: Brain,
      title: "Intelligence + AI as Accelerator",
      subtitle: "Pillar 4",
      points: [
        "Earlier detection with weak signal analysis",
        "Recommended actions with explainability",
        "Exception-led oversight, not checkbox compliance",
      ],
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/30",
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
      {/* Primary Message */}
      <div className="mb-8 text-center">
        <p className="text-xl md:text-2xl font-bold text-foreground">
          <span className="text-primary">Operational excellence</span> is customer experience.
        </p>
      </div>

      {/* Core Solutions Infinity Model */}
      <div className="mb-12">
        <CoreSolutionsInfinity />
      </div>

      {/* Main Pipeline Visual */}
      <div className="relative max-w-5xl mx-auto mb-12">
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
                    relative p-5 rounded-2xl border-2 transition-all duration-500
                    ${isActive ? `${step.bgColor} ${step.borderColor} shadow-lg ${step.glowColor}` : 'bg-card/20 border-muted-foreground/20'}
                  `}
                >
                  {/* Icon */}
                  <div className={`
                    w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-500
                    ${isActive ? `${step.bgColor} ${step.borderColor} border-2` : 'bg-muted/30 border-muted-foreground/20 border'}
                  `}>
                    <Icon className={`w-7 h-7 transition-colors duration-500 ${isActive ? step.color : 'text-muted-foreground/50'}`} />
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
                    absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
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

      {/* 4 Supporting Pillars */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground text-center mb-6">Four Supporting Pillars</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={index} 
                className={`${pillar.bgColor} border ${pillar.borderColor} rounded-xl p-4`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-5 h-5 ${pillar.color}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">{pillar.subtitle}</p>
                    <h4 className={`text-sm font-semibold ${pillar.color}`}>{pillar.title}</h4>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {pillar.points.map((point, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className={`w-1 h-1 rounded-full ${pillar.color.replace('text-', 'bg-')} mt-1.5 shrink-0`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Board-level summary */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-amber-500/10 via-primary/10 to-emerald-500/10 border border-primary/20 rounded-xl p-6 text-center">
          <p className="text-base font-medium text-foreground mb-2">
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
