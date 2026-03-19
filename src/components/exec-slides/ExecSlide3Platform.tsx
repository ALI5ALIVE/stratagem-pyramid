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
    name: "Safety Manager365",
    color: "text-red-400",
    bgColor: "bg-red-500/10 border-red-500/20",
    bullets: ["Safety management system (SMS)", "FOQA/FDM event analysis", "Audit & compliance tracking"],
  },
  {
    icon: FileText,
    name: "Content Manager365 + CoAuthor",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    bullets: ["Procedure authoring & revision", "Regulatory change management", "Crew & ops distribution"],
  },
  {
    icon: GraduationCap,
    name: "Training Manager365",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    bullets: ["Competency-based training", "Targeted course assignments", "Completion evidence & records"],
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
              <h3 className="text-lg font-semibold text-primary">CoAnalyst — Intelligence Layer</h3>
              <p className="text-sm text-muted-foreground mt-1">
                The key to unlocking operational intelligence. CoAnalyst connects safety, content, and training data — transforming siloed reports into actionable insights.
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
                  <ul className="mt-1.5 space-y-1">
                    {mod.bullets.map((b) => (
                      <li key={b} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
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
