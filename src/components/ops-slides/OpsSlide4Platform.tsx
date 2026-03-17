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
          <PlatformEcosystemDiagram className="w-full" />
        </div>

        {/* Right — Product Module Cards */}
        <div className="flex flex-col gap-2 justify-center overflow-y-auto">
          {/* Intelligence Layer Card */}
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 flex gap-3 items-start">
            <div className="mt-0.5 text-primary">
              <Brain className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-primary">CoAnalyst — Intelligence Layer</h3>
              <p className="text-xs text-muted-foreground mt-1">
                The key that unlocks data intelligence across your operation. CoAnalyst activates the data held within Safety, Content, and Training Manager — surfacing patterns, predicting risks, and driving closed-loop corrective action through <span className="text-primary font-semibold">CoAuthor</span>, <span className="text-primary font-semibold">CoAnalyst</span>, and <span className="text-primary font-semibold">CoTrainer</span>.
              </p>
            </div>
          </div>

          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.name}
                className={`rounded-xl border p-3 ${mod.bgColor}`}
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
    </SalesSlideContainer>
  );
};

export default OpsSlide4Platform;
