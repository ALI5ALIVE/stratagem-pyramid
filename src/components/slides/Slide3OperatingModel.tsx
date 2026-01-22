import { useState, useEffect } from "react";
import SlideContainer from "./SlideContainer";
import { Radio, Bell, GitBranch, ShieldCheck, ArrowRight, Database, TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import CoreSolutionsInfinity from "../CoreSolutionsInfinity";
import type { SlideNarrationProps } from "@/types/slideProps";

// Timing markers for narration-synced step highlighting
const stepTimings = [
  { index: 0, startPercent: 15 },  // Detect
  { index: 1, startPercent: 30 },  // Trigger
  { index: 2, startPercent: 50 },  // Orchestrate
  { index: 3, startPercent: 70 },  // Prove
];

const Slide3OperatingModel = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isNarrationControlled, setIsNarrationControlled] = useState(false);

  // Sync step highlighting with narration progress
  useEffect(() => {
    if (isPlaying && progress > 0) {
      setIsNarrationControlled(true);
      
      const currentTiming = [...stepTimings]
        .reverse()
        .find(t => progress >= t.startPercent);
      
      if (currentTiming !== undefined) {
        setActiveStep(currentTiming.index);
      }
    } else if (!isPlaying && isNarrationControlled) {
      setIsNarrationControlled(false);
    }
  }, [isPlaying, progress, isNarrationControlled]);

  const steps = [
    {
      id: "detect",
      icon: Radio,
      label: "Detect",
      description: "Capture operational signals earlier (risk + issues + drift)",
      metric: "12K",
      metricLabel: "signals/mo",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/50",
    },
    {
      id: "trigger",
      icon: Bell,
      label: "Trigger",
      description: "Convert signals into coordinated actions (not manual handoffs)",
      metric: "850",
      metricLabel: "actions",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/50",
    },
    {
      id: "orchestrate",
      icon: GitBranch,
      label: "Orchestrate",
      description: "Controlled procedural change + targeted training activation",
      metric: "340",
      metricLabel: "changes",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/50",
    },
    {
      id: "prove",
      icon: ShieldCheck,
      label: "Prove",
      description: "Audit-ready evidence and readiness proof by default",
      metric: "100%",
      metricLabel: "tracked",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/50",
    },
  ];

  const dataSources = [
    { id: "foqa", label: "FOQA" },
    { id: "asap", label: "ASAP" },
    { id: "audit", label: "Audit" },
    { id: "ops", label: "Ops" },
    { id: "crew", label: "Crew" },
    { id: "mx", label: "Mx" },
  ];

  const valueOutputs = [
    { label: "OTP", value: "+3%", icon: TrendingUp },
    { label: "Ready", value: "94%", icon: Users },
    { label: "Audit", value: "2hr", icon: Clock },
    { label: "Repeat", value: "Zero", icon: CheckCircle },
  ];

  return (
    <SlideContainer
      id="slide-3"
      title="The Operational Intelligence Layer"
      subtitle="Transforming operations from cost center to value driver"
      slideNumber={3}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      {/* Core Solutions Infinity Model */}
      <div className="mb-4">
        <CoreSolutionsInfinity />
      </div>

      {/* Data Sources Row */}
      <div className="max-w-4xl mx-auto mb-3">
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 mr-1.5">
            <Database className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Sources:</span>
          </div>
          {dataSources.map((source) => (
            <div
              key={source.id}
              className="px-2 py-0.5 bg-muted/50 rounded text-[10px] font-medium text-muted-foreground border border-border"
            >
              {source.label}
            </div>
          ))}
          <div className="ml-1.5 px-2 py-0.5 bg-primary/10 rounded-full border border-primary/30">
            <span className="text-xs font-bold text-primary">65K+</span>
            <span className="text-[10px] text-muted-foreground ml-1">signals/mo</span>
          </div>
        </div>
      </div>

      {/* Main Pipeline Visual */}
      <div className="relative max-w-5xl mx-auto">
        {/* Connection line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden md:block" />
        
        {/* Progress line based on clicked step */}
        {activeStep !== null && (
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500 hidden md:block"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-2 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isStepActive = activeStep !== null && index <= activeStep;
            const isCurrentStep = activeStep === index;
            
            return (
              <div key={step.id} className="relative">
                {/* Arrow between steps (mobile hidden) */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden md:block z-10">
                    <ArrowRight className={`w-4 h-4 transition-colors duration-300 ${isStepActive ? step.color : 'text-muted-foreground/30'}`} />
                  </div>
                )}

                <button 
                  onClick={() => setActiveStep(index === activeStep ? null : index)}
                  className={`
                    relative w-full p-3 rounded-lg border transition-all duration-300 text-left
                    ${isStepActive ? `${step.bgColor} ${step.borderColor}` : 'bg-card/30 border-border hover:border-muted-foreground/50'}
                    ${isCurrentStep ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''}
                    ${isNarrationControlled && isCurrentStep ? 'animate-fade-in' : ''}
                  `}
                >
                  {/* Icon */}
                  <div className={`
                    w-8 h-8 mx-auto mb-1.5 rounded-md flex items-center justify-center transition-all duration-300
                    ${isStepActive ? `${step.bgColor} ${step.borderColor} border` : 'bg-muted/30 border-border border'}
                  `}>
                    <Icon className={`w-4 h-4 transition-colors duration-300 ${isStepActive ? step.color : 'text-muted-foreground/50'}`} />
                  </div>

                  {/* Label */}
                  <h3 className={`text-sm font-bold text-center mb-0.5 transition-colors duration-300 ${isStepActive ? step.color : 'text-muted-foreground/50'}`}>
                    {step.label}
                  </h3>

                  {/* Metric */}
                  <div className={`text-center mb-1 ${isStepActive ? 'opacity-100' : 'opacity-50'}`}>
                    <span className={`text-lg font-bold ${step.color}`}>{step.metric}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">{step.metricLabel}</span>
                  </div>

                  {/* Description */}
                  <p className={`text-[10px] text-center transition-colors duration-300 ${isStepActive ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                    {step.description}
                  </p>

                  {/* Step number */}
                  <div className={`
                    absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
                    ${isStepActive ? `${step.bgColor} ${step.color} border ${step.borderColor}` : 'bg-muted text-muted-foreground border border-border'}
                  `}>
                    {index + 1}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Value Generated Row */}
      <div className="mt-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <TrendingUp className="w-3 h-3 text-primary" />
          <span className="text-[10px] text-primary uppercase tracking-wide font-semibold">Value Generated</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {valueOutputs.map((output) => {
            const Icon = output.icon;
            return (
              <div
                key={output.label}
                className="bg-card border border-primary/20 rounded-md p-2 text-center"
              >
                <Icon className="w-3 h-3 text-primary mx-auto mb-0.5" />
                <p className="text-base font-bold text-primary">{output.value}</p>
                <p className="text-[10px] text-muted-foreground">{output.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Click instruction */}
      <p className="text-center text-[10px] text-muted-foreground mt-2">
        Click each stage to explore the data flow
      </p>
    </SlideContainer>
  );
};

export default Slide3OperatingModel;
