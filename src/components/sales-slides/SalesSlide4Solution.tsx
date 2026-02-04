import { useState } from "react";
import { Search, Zap, Workflow, Shield, ArrowRight, Database, TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import SalesSlideContainer from "./SalesSlideContainer";
import PlatformEcosystemDiagram from "@/components/PlatformEcosystemDiagram";
import type { SlideNarrationProps } from "@/types/slideProps";

const dtopSteps = [
  {
    icon: Search,
    letter: "D",
    label: "Detect",
    description: "Surface signals from safety, content, and training data",
    metric: "12K",
    metricLabel: "signals/mo",
    auditTrail: "Signal ID: FOQA-2024-00847 logged",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
  },
  {
    icon: Zap,
    letter: "T",
    label: "Trigger",
    description: "Automatically initiate the right workflows",
    metric: "850",
    metricLabel: "actions",
    auditTrail: "Workflow WF-3421 created → Owner: J.Smith",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
  },
  {
    icon: Workflow,
    letter: "O",
    label: "Orchestrate",
    description: "Coordinate training, content, and compliance response",
    metric: "340",
    metricLabel: "changes",
    auditTrail: "SOP v4.2.1 published → 47 crew assigned",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    icon: Shield,
    letter: "P",
    label: "Prove",
    description: "Document every action for audit-ready evidence",
    metric: "100%",
    metricLabel: "tracked",
    auditTrail: "Audit report AR-2024-0847 ready",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
  },
];

const dataSources = ["FOQA", "ASAP", "Audit", "Ops", "Crew", "Mx"];

const valueOutputs = [
  { label: "OTP", value: "+3%", icon: TrendingUp },
  { label: "Ready", value: "94%", icon: Users },
  { label: "Audit", value: "2hr", icon: Clock },
  { label: "Repeat", value: "Zero", icon: CheckCircle },
];

interface SalesSlide4SolutionProps extends SlideNarrationProps {
  slideNumber?: number;
}

const SalesSlide4Solution = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: SalesSlide4SolutionProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <SalesSlideContainer
      id="sales-slide-4"
      title="Detect → Trigger → Orchestrate → Prove"
      subtitle="Signals become outcomes. By default."
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-3">
        {/* Platform Ecosystem Diagram */}
        <div className="flex justify-center">
          <div className="w-48 h-48 sm:w-56 sm:h-56">
            <PlatformEcosystemDiagram />
          </div>
        </div>

        {/* Data Sources Row */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 mr-1.5">
            <Database className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Sources:</span>
          </div>
          {dataSources.map((source) => (
            <div
              key={source}
              className="px-2 py-0.5 bg-muted/50 rounded text-[10px] font-medium text-muted-foreground border border-border"
            >
              {source}
            </div>
          ))}
          <div className="ml-1.5 px-2 py-0.5 bg-primary/10 rounded-full border border-primary/30">
            <span className="text-xs font-bold text-primary">65K+</span>
            <span className="text-[10px] text-muted-foreground ml-1">signals/mo</span>
          </div>
        </div>

        {/* DTOP Pipeline */}
        <div className="relative max-w-5xl mx-auto w-full">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden sm:block" />

          {/* Progress line */}
          {activeStep !== null && (
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500 hidden sm:block"
              style={{ width: `${((activeStep + 1) / dtopSteps.length) * 100}%` }}
            />
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative">
            {dtopSteps.map((step, i) => {
              const isActive = activeStep !== null && i <= activeStep;
              const isCurrent = activeStep === i;

              return (
                <div key={step.letter} className="flex items-center">
                  <button
                    onClick={() => setActiveStep(i === activeStep ? null : i)}
                    className={`
                      flex-1 p-3 rounded-lg border transition-all duration-300 text-left
                      ${isActive ? `${step.bgColor} ${step.borderColor}` : "bg-card/30 border-border hover:border-muted-foreground/50"}
                      ${isCurrent ? "ring-2 ring-offset-2 ring-offset-background ring-primary" : ""}
                    `}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-7 h-7 rounded-md ${step.bgColor} ${step.borderColor} border flex items-center justify-center`}>
                        <step.icon className={`w-3.5 h-3.5 ${step.color}`} />
                      </div>
                      <div>
                        <span className={`text-lg font-bold ${step.color}`}>{step.letter}</span>
                        <span className="text-sm font-semibold text-foreground ml-0.5">{step.label}</span>
                      </div>
                    </div>

                    {/* Metric */}
                    <div className={`mb-1.5 ${isActive ? "opacity-100" : "opacity-50"}`}>
                      <span className={`text-lg font-bold ${step.color}`}>{step.metric}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">{step.metricLabel}</span>
                    </div>

                    <p className={`text-[10px] transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground/50"}`}>
                      {step.description}
                    </p>

                    {/* Audit Trail */}
                    {isActive && (
                      <p className="text-[9px] mt-1.5 font-mono text-primary/80 bg-primary/5 rounded px-1.5 py-0.5">
                        {step.auditTrail}
                      </p>
                    )}
                  </button>
                  {i < dtopSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground/30 mx-1 hidden sm:block shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Value Generated Row */}
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <TrendingUp className="w-3 h-3 text-primary" />
            <span className="text-[10px] text-primary uppercase tracking-wide font-semibold">Value Generated</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {valueOutputs.map((output) => {
              const Icon = output.icon;
              return (
                <div key={output.label} className="bg-card border border-primary/20 rounded-md p-2 text-center">
                  <Icon className="w-3 h-3 text-primary mx-auto mb-0.5" />
                  <p className="text-base font-bold text-primary">{output.value}</p>
                  <p className="text-[10px] text-muted-foreground">{output.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default SalesSlide4Solution;
