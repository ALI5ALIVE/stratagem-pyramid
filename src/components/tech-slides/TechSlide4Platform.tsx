import { Shield, FileText, GraduationCap, Brain } from "lucide-react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import PlatformEcosystemDiagram from "@/components/PlatformEcosystemDiagram";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const modules = [
  { icon: Shield, name: "SafetyManager365", color: "text-red-400", bgColor: "bg-red-500/10 border-red-500/20", desc: "Advanced Safety, Quality, and Risk Management solution for utmost audit readiness and highest standards of compliance." },
  { icon: FileText, name: "ContentManager365 + CoAuthor", color: "text-blue-400", bgColor: "bg-blue-500/10 border-blue-500/20", desc: "Next Gen Operational Content Management solution for authoring, publishing, distributing, and viewing enterprise-wide operational content." },
  { icon: GraduationCap, name: "TrainingManager365 + CoTrainer", color: "text-emerald-400", bgColor: "bg-emerald-500/10 border-emerald-500/20", desc: "Higher-quality training with less effort, optimized schedules, readiness through automated qualification tracking, and continuous improvement." },
];

const TechSlide4Platform = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-4" title="The Operational Performance Platform" subtitle="Three connected applications, one intelligence layer, one operational performance platform" slideNumber={slideNumber} {...narrationProps}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
      <div className="flex items-center justify-center"><PlatformEcosystemDiagram className="w-full" /></div>
      <div className="flex flex-col gap-3 justify-center">
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 flex gap-4 items-start">
          <Brain className="w-7 h-7 text-primary mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary">The Intelligence Layer — CoAnalyst — CoAuthor — CoTrainer</h3>
            <p className="text-sm text-muted-foreground mt-1">Embedding intelligence across the platform to move from reactive compliance to predictive insights, from managing documents and processes to anticipating issues before they escalate. Empowering better decision-making, strengthened operational resilience, and enhanced safety at scale.</p>
          </div>
        </div>
        {modules.map((m) => (
          <div key={m.name} className={`rounded-xl border p-4 flex gap-4 items-start ${m.bgColor}`}>
            <m.icon className={`w-7 h-7 mt-0.5 ${m.color}`} />
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${m.color}`}>{m.name}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide4Platform;
