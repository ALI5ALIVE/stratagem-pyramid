import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { personaPlaybook } from "@/data/week3FieldKit";
import { HelpCircle, Gauge, AlertOctagon, FileCheck2 } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const SEPersonaPlaybook = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-persona-playbook"
    slideNumber={slideNumber}
    title="Persona playbook"
    subtitle="Five rooms you'll be in. For each: the pain, the questions only they can answer, the metric they care about, the landmine to avoid, and the proof artifact to point at."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-1.5 max-w-7xl mx-auto px-4 pt-2 pb-10">
      {personaPlaybook.map((p) => (
        <div key={p.id} className="rounded-lg border border-border bg-card p-2.5 grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-3">
            <div className="text-xs font-semibold text-primary">{p.role}</div>
            <p className="text-[11px] text-foreground/80 leading-snug mt-0.5">{p.painOneLiner}</p>
          </div>
          <div className="col-span-12 md:col-span-4 border-l border-border/40 md:pl-3">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-sky-300 mb-1">
              <HelpCircle className="h-3 w-3" /> Only they can answer
            </div>
            <ul className="space-y-0.5">
              {p.onlyTheyCanAnswer.map((q, i) => (
                <li key={i} className="text-[11px] italic text-foreground/85 leading-snug">"{q}"</li>
              ))}
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2 border-l border-border/40 md:pl-3">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-300 mb-1">
              <Gauge className="h-3 w-3" /> Metric
            </div>
            <p className="text-[11px] text-foreground/85 leading-snug">{p.metricTheyCareAbout}</p>
          </div>
          <div className="col-span-6 md:col-span-3 border-l border-border/40 md:pl-3 grid grid-rows-2 gap-1">
            <div>
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-rose-300 mb-0.5">
                <AlertOctagon className="h-3 w-3" /> Landmine
              </div>
              <p className="text-[10.5px] text-foreground/80 leading-snug">{p.landmine}</p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-violet-300 mb-0.5">
                <FileCheck2 className="h-3 w-3" /> Proof
              </div>
              <p className="text-[10.5px] text-foreground/80 leading-snug">{p.proofArtifact}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </PitchSlideContainer>
);

export default SEPersonaPlaybook;