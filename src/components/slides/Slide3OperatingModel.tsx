import { useState, useEffect } from "react";
import SlideContainer from "./SlideContainer";
import { Radio, Bell, GitBranch, ShieldCheck, ArrowRight, Database, TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import PlatformEcosystemDiagram from "../PlatformEcosystemDiagram";
import type { SlideNarrationProps } from "@/types/slideProps";

// Timing markers for narration-synced step highlighting
// Timing markers synced to narration script phases
const stepTimings = [
  { index: 0, startPercent: 12 },  // Detect - "First, Detect"
  { index: 1, startPercent: 28 },  // Trigger - "Then, Trigger"
  { index: 2, startPercent: 45 },  // Orchestrate - "Next, Orchestrate"
  { index: 3, startPercent: 62 },  // Prove - "Finally, Prove"
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
      description: "Operational data exceedance triggers automatic alert. Signal captured with flight ID, crew, and timestamp.",
      metric: "12K",
      metricLabel: "signals/mo",
      auditTrail: "Signal ID: OPS-2024-00847 logged",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/50",
    },
    {
      id: "trigger",
      icon: Bell,
      label: "Trigger",
      description: "Procedure review workflow initiated. Linked to source signal, assigned owner, due date set.",
      metric: "850",
      metricLabel: "actions",
      auditTrail: "Workflow WF-3421 created → Owner: J.Smith",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/50",
    },
    {
      id: "orchestrate",
      icon: GitBranch,
      label: "Orchestrate",
      description: "SOP 4.2.1 updated. Training module activated for affected crew. All changes version-controlled.",
      metric: "340",
      metricLabel: "changes",
      auditTrail: "SOP v4.2.1 published → 47 crew assigned",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/50",
    },
    {
      id: "prove",
      icon: ShieldCheck,
      label: "Prove",
      description: "Complete audit trail generated. Signal → change → training → completion linked and exportable.",
      metric: "100%",
      metricLabel: "tracked",
      auditTrail: "Audit report AR-2024-0847 ready",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/50",
    },
  ];

  const dataSources = [
    { id: "ops-data", label: "Operational Data" },
    { id: "safety-reports", label: "Safety Reports" },
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
      subtitle="A connected, intelligent, and predictive platform turning signals into orchestrated change and measurable outcomes"
      slideNumber={3}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      {/* Platform Ecosystem Diagram */}
      <div className="mb-2 flex justify-center">
        <div className="w-64 h-64 lg:w-80 lg:h-80">
          <PlatformEcosystemDiagram />
        </div>
      </div>

      {/* Data Sources Row */}
      <div className="max-w-4xl mx-auto mb-2">
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
                    relative w-full p-3 rounded-lg border transition-all duration-300 text-left shadow-md
                    ${step.bgColor} ${step.borderColor}
                    ${isCurrentStep ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''}
                    ${isNarrationControlled && isCurrentStep ? 'animate-fade-in' : ''}
                  `}
                >
                  {/* Icon */}
                  <div className={`
                    w-8 h-8 mx-auto mb-1 rounded-md flex items-center justify-center transition-all duration-300
                    ${step.bgColor} ${step.borderColor} border
                  `}>
                    <Icon className={`w-4 h-4 transition-colors duration-300 ${step.color}`} />
                  </div>

                  {/* Label */}
                  <h3 className={`text-sm font-bold text-center mb-0.5 transition-colors duration-300 ${step.color}`}>
                    {step.label}
                  </h3>

                  {/* Metric */}
                  <div className="text-center mb-0.5">
                    <span className={`text-lg font-bold ${step.color}`}>{step.metric}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">{step.metricLabel}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-center transition-colors duration-300 text-foreground">
                    {step.description}
                  </p>

                  {/* Audit Trail */}
                  {isStepActive && step.auditTrail && (
                    <p className="text-[9px] text-center mt-1 font-mono text-primary/80 bg-primary/5 rounded px-1 py-0.5">
                      {step.auditTrail}
                    </p>
                  )}

                  {/* Step number */}
                  <div className={`
                    absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    ${step.bgColor} ${step.color} border ${step.borderColor}
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
      <div className="mt-2 max-w-4xl mx-auto">
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
