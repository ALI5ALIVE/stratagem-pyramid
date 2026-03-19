import { Shield, FileText, GraduationCap, Brain } from "lucide-react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import PlatformEcosystemDiagram from "@/components/PlatformEcosystemDiagram";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const modules = [
  { icon: Shield, name: "Safety Manager 365", color: "text-red-400", bgColor: "bg-red-500/10 border-red-500/20", bullets: ["SMS event reporting & investigations", "FOQA/FDM data ingestion & analysis", "Audit & compliance tracking"] },
  { icon: FileText, name: "Content Manager 365 + CoAuthor", color: "text-blue-400", bgColor: "bg-blue-500/10 border-blue-500/20", bullets: ["Procedure authoring & revision control", "Regulatory change management", "Crew & ops distribution"] },
  { icon: GraduationCap, name: "Training Manager 365", color: "text-emerald-400", bgColor: "bg-emerald-500/10 border-emerald-500/20", bullets: ["Competency-based training", "Targeted course assignments", "Completion evidence & records"] },
];

const TechSlide4Platform = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-4" title="The Application Platform" subtitle="Three connected applications, one intelligence layer, one operational performance platform" slideNumber={slideNumber} {...narrationProps}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
      <div className="flex items-center justify-center"><PlatformEcosystemDiagram className="w-full" /></div>
      <div className="flex flex-col gap-3 justify-center">
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 flex gap-4 items-start">
          <Brain className="w-7 h-7 text-primary mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary">CoAnalyst — Intelligence Layer</h3>
            <p className="text-sm text-muted-foreground mt-1">The key to unlocking operational intelligence. CoAnalyst connects safety, content, and training data — transforming siloed reports into actionable insights.</p>
          </div>
        </div>
        {modules.map((m) => (
          <div key={m.name} className={`rounded-xl border p-4 flex gap-4 items-start ${m.bgColor}`}>
            <m.icon className={`w-7 h-7 mt-0.5 ${m.color}`} />
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${m.color}`}>{m.name}</h3>
              <ul className="mt-1.5 space-y-1">{m.bullets.map((b) => (<li key={b} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-1">•</span>{b}</li>))}</ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide4Platform;
