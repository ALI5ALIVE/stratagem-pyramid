import { Shield, FileText, GraduationCap, Brain } from "lucide-react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import PlatformEcosystemDiagram from "@/components/PlatformEcosystemDiagram";
import type { SlideNarrationProps } from "@/types/slideProps";

interface ExecSlide3PlatformProps extends SlideNarrationProps {
  slideNumber?: number;
}

const modules = [
  {
    icon: Shield,
    name: "SafetyManager365",
    color: "text-red-400",
    bgColor: "bg-red-500/10 border-red-500/20",
    desc: "Advanced Safety, Quality, and Risk Management solution for utmost audit readiness and highest standards of compliance.",
  },
  {
    icon: FileText,
    name: "ContentManager365 + CoAuthor",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    desc: "Next Gen Operational Content Management solution for authoring, publishing, distributing, and viewing enterprise-wide operational content.",
  },
  {
    icon: GraduationCap,
    name: "TrainingManager365 + CoTrainer",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    desc: "Higher-quality training with less effort, optimized schedules, readiness through automated qualification tracking, and continuous improvement.",
  },
];

const ExecSlide3Platform = ({ slideNumber, ...narrationProps }: ExecSlide3PlatformProps) => {
  return (
    <SalesSlideContainer
      id="exec-slide-3"
      title="The Platform"
      subtitle="Three connected applications, one operational performance platform"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Left — Platform Ecosystem Image */}
        <div className="flex items-center justify-center">
          <PlatformEcosystemDiagram className="w-full" />
        </div>

        {/* Right — Product Module Cards */}
        <div className="flex flex-col gap-3 justify-center">
          {/* Intelligence Layer Card */}
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 flex gap-4 items-start">
            <div className="mt-0.5 text-primary">
              <Brain className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary">The Intelligence Layer — CoAnalyst — CoAuthor — CoTrainer</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Embedding intelligence across the platform to move from reactive compliance to predictive insights, from managing documents and processes to anticipating issues before they escalate. Empowering better decision-making, strengthened operational resilience, and enhanced safety at scale.
              </p>
            </div>
          </div>

          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.name}
                className={`rounded-xl border p-4 flex gap-4 items-start ${mod.bgColor}`}
              >
                <div className={`mt-0.5 ${mod.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${mod.color}`}>{mod.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5">{mod.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default ExecSlide3Platform;
