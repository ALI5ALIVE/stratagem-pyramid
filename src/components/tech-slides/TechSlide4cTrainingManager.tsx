import { GraduationCap, Target, UserCheck, Award, RefreshCw, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
      <div className="flex flex-col gap-3 justify-center">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-1">Core Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {capabilities.map((c) => (
            <div key={c.label} className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 flex gap-3 items-start">
              <c.icon className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{c.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-7 h-7 text-emerald-400" />
            <h3 className="text-lg font-semibold text-emerald-400">CoTrainer — Intelligence Before Instruction</h3>
          </div>
          <div className="space-y-3">
            {dataFlow.map((d, i) => (
              <div key={d.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-400">{i + 1}</div>
                  {i < dataFlow.length - 1 && <ArrowRight className="w-4 h-4 text-emerald-400/40 rotate-90 mt-1" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{d.step}</p>
                  <p className="text-xs text-muted-foreground">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic">CoTrainer transforms every training session into a data-enriched learning event</p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide4cTrainingManager;
