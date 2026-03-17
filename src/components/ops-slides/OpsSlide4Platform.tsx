import { Shield, FileText, GraduationCap, Brain, ArrowRight } from "lucide-react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import PlatformEcosystemDiagram from "@/components/PlatformEcosystemDiagram";
import type { SlideNarrationProps } from "@/types/slideProps";

interface OpsSlide4PlatformProps extends SlideNarrationProps {
  slideNumber?: number;
}

const modules = [
  {
    icon: Shield,
    name: "Safety Manager365",
    color: "text-red-400",
    bgColor: "bg-red-500/10 border-red-500/20",
    capabilities: [
      "SMS event reporting & investigation workflows",
      "FOQA/FDM data ingestion & exceedance tracking",
      "Audit management & regulatory compliance",
      "Hazard register & risk assessment",
    ],
    dataFlow: "Safety events → DTOP pipeline → Corrective actions",
  },
  {
    icon: FileText,
    name: "Content Manager365",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    capabilities: [
      "Procedure authoring & revision cascades",
      "Regulatory change impact analysis",
      "Multi-format crew & ops distribution",
      "Manual management & document control",
    ],
    dataFlow: "Procedure changes → Cascade triggers → Training updates",
  },
  {
    icon: GraduationCap,
    name: "Training Manager365",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    capabilities: [
      "Competency-based training management",
      "Targeted course & assessment assignments",
      "Completion evidence & qualification records",
      "Recurrent training automation",
    ],
    dataFlow: "Safety findings → Targeted retraining → Verified competency",
  },
];

const OpsSlide4Platform = ({ slideNumber, ...narrationProps }: OpsSlide4PlatformProps) => {
  return (
    <SalesSlideContainer
      id="ops-slide-4"
      title="The Application Platform"
      subtitle="Three connected applications powering the DTOP operating model"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Left — Platform Ecosystem Image */}
        <div className="flex items-center justify-center">
          <img
            src={platformEcosystem}
            alt="Comply365 Platform Ecosystem"
            className="w-full max-w-md object-contain drop-shadow-lg"
          />
        </div>

        {/* Right — Product Module Cards */}
        <div className="flex flex-col gap-3 justify-center overflow-y-auto">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.name}
                className={`rounded-xl border p-4 ${mod.bgColor}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-6 h-6 ${mod.color}`} />
                  <h3 className={`text-base font-semibold ${mod.color}`}>{mod.name}</h3>
                </div>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
                  {mod.capabilities.map((c) => (
                    <li key={c} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">•</span>
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-xs text-primary/80 border-t border-primary/10 pt-2 mt-1">
                  <ArrowRight className="w-3 h-3" />
                  <span className="italic">{mod.dataFlow}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom — CoAnalyst Intelligence Layer Bar */}
      <div className="mt-3 rounded-xl border border-primary/30 bg-primary/5 px-6 py-3 flex items-center justify-center gap-6">
        <Brain className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium text-foreground">
          AI-Powered Intelligence Layer:
          <span className="text-primary ml-2 font-semibold">CoAuthor</span>
          <span className="text-muted-foreground mx-1">·</span>
          <span className="text-primary font-semibold">CoAnalyst</span>
          <span className="text-muted-foreground mx-1">·</span>
          <span className="text-primary font-semibold">CoTrainer</span>
        </span>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide4Platform;
