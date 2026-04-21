import { GraduationCap, Target, UserCheck, Award, RefreshCw, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import ArchitectureLayerBadge from "@/components/tech-slides/ArchitectureLayerBadge";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const capabilities = [
  { icon: Target, label: "Competency-Based Training", desc: "Map training to specific competency frameworks and regulatory requirements" },
  { icon: UserCheck, label: "Targeted Assignments", desc: "Assign courses based on role, fleet, route, or safety event triggers" },
  { icon: Award, label: "Completion Evidence", desc: "Digital records of completion with assessment scores and sign-offs" },
  { icon: GraduationCap, label: "Qualification Records", desc: "Centralised crew qualification tracking with expiry alerts" },
  { icon: RefreshCw, label: "Recurrent Automation", desc: "Automated scheduling of recurrent training with compliance monitoring" },
  { icon: BarChart3, label: "Gap Analysis", desc: "Identify competency gaps across fleet, base, or individual performance" },
];

const dataFlow = [
  { step: "Debrief Transcription", desc: "Transcribes every debrief, generates summaries, coaching cues, and improvement areas" },
  { step: "Automated Grading", desc: "Accelerates grading and generates rich, actionable trainee feedback" },
  { step: "Feedback Enhancement", desc: "Analyzes instructor feedback to improve clarity, tone, and constructiveness" },
  { step: "Personalised Training", desc: "Prior performance data personalises each session for improved crew readiness" },
];

const TechSlide4cTrainingManager = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-4c" title="TrainingManager365 + CoTrainer" subtitle="Higher-quality training with less effort — from compliance checklists to competency-driven workforce readiness" slideNumber={slideNumber} {...narrationProps}>
    <ArchitectureLayerBadge active="core" sublayer="training" className="mb-2" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0 items-stretch">
      <div className="flex flex-col gap-3 h-full">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 shrink-0">Core Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 auto-rows-fr flex-1">
          {capabilities.map((c) => (
            <div key={c.label} className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 flex gap-3 items-start h-full">
              <c.icon className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground">{c.label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            <h3 className="text-base font-bold text-emerald-400">CoTrainer — Intelligence Before Instruction</h3>
          </div>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {dataFlow.map((d, i) => (
              <div key={d.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-400">{i + 1}</div>
                  {i < dataFlow.length - 1 && <ArrowRight className="w-4 h-4 text-emerald-400/40 rotate-90 mt-1" />}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-bold text-foreground">{d.step}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic text-center shrink-0">CoTrainer transforms every training session into a data-enriched learning event</p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide4cTrainingManager;
