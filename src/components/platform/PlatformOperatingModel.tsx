import { Radio, Bell, GitBranch, ShieldCheck, TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import CoreSolutionsInfinity from "@/components/CoreSolutionsInfinity";

const dtopSteps = [
  {
    icon: Radio,
    label: "Detect",
    description: "Capture signals from FOQA, ASAP, crew reports, and audits",
    metric: "12K",
    metricLabel: "signals/mo",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/50",
  },
  {
    icon: Bell,
    label: "Trigger",
    description: "Automatically initiate workflows with ownership and deadlines",
    metric: "850",
    metricLabel: "actions",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/50",
  },
  {
    icon: GitBranch,
    label: "Orchestrate",
    description: "Update procedures and assign training in one coordinated flow",
    metric: "340",
    metricLabel: "changes",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/50",
  },
  {
    icon: ShieldCheck,
    label: "Prove",
    description: "Generate complete audit trails linking signal to outcome",
    metric: "100%",
    metricLabel: "tracked",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/50",
  },
];

const valueOutputs = [
  { label: "OTP Impact", value: "+3%", icon: TrendingUp },
  { label: "Crew Ready", value: "94%", icon: Users },
  { label: "Audit Time", value: "2hr", icon: Clock },
  { label: "Repeat Finds", value: "Zero", icon: CheckCircle },
];

const PlatformOperatingModel = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Continuous Improvement Operating Model
              </h2>
              <p className="text-xl text-primary font-medium mb-4">
                Detect → Trigger → Orchestrate → Prove
              </p>
              <p className="text-muted-foreground">
                A closed-loop system that captures operational signals, initiates corrective actions, 
                orchestrates changes across content and training, and generates proof of compliance — automatically.
              </p>
            </div>

            {/* DTOP Steps */}
            <div className="grid grid-cols-2 gap-3">
              {dtopSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg ${step.bgColor} border ${step.borderColor}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-4 h-4 ${step.color}`} />
                      <span className={`font-semibold text-sm ${step.color}`}>{step.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-lg font-bold ${step.color}`}>{step.metric}</span>
                      <span className="text-xs text-muted-foreground">{step.metricLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Value Generated */}
            <div className="bg-card border border-primary/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary uppercase tracking-wide font-semibold">Value Generated</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {valueOutputs.map((output, index) => {
                  const Icon = output.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className="w-3 h-3 text-primary mx-auto mb-1" />
                      <p className="text-base font-bold text-primary">{output.value}</p>
                      <p className="text-[10px] text-muted-foreground">{output.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-xl">
              <CoreSolutionsInfinity />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformOperatingModel;
