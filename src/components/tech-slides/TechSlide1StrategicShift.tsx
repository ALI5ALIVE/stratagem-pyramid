import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const beforeItems = [
  "Standalone SMS for safety reporting",
  "Separate document management for procedures",
  "Disconnected LMS for training records",
  "Manual compliance evidence collection",
  "Siloed data — no cross-functional intelligence",
];

const afterItems = [
  "Connected safety, content & training platform",
  "Automated detect → trigger → orchestrate → prove",
  "Intelligence layer linking every operational signal",
  "Continuous compliance evidence by default",
  "Single source of operational truth",
];

const categoryDrivers = [
  { label: "Regulatory Pressure", desc: "EASA/FAA demanding proactive safety management evidence" },
  { label: "Data Explosion", desc: "12K+ monthly signals across safety reports, audits, training records — mostly orphaned" },
  { label: "AI Maturity", desc: "Domain-specific AI now accurate enough for aviation categorisation" },
  { label: "Cost Pressure", desc: "Airlines can no longer afford fragmented, reactive operations" },
];

const TechSlide1StrategicShift = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-1" title="The Strategic Shift" subtitle="From point tools to an Operational Performance Platform — and why the category exists now" slideNumber={slideNumber} {...narrationProps}>
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      {/* Before / After */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-stretch flex-1 min-h-0">
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="h-5 w-5 text-red-400" />
            <h3 className="text-base font-bold text-red-400">Today: Point Tools</h3>
          </div>
          <ul className="space-y-2 flex-1 flex flex-col justify-center">
            {beforeItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex items-center"><ArrowRight className="h-8 w-8 text-primary/40" /></div>

        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-emerald-400">Tomorrow: Connected Platform</h3>
          </div>
          <ul className="space-y-2 flex-1 flex flex-col justify-center">
            {afterItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Category drivers — 2x2 */}
      <div className="grid grid-cols-2 gap-3 auto-rows-fr shrink-0">
        {categoryDrivers.map((d) => (
          <div key={d.label} className="p-3 rounded-xl border border-primary/20 bg-primary/5 h-full flex flex-col">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">{d.label}</span>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide1StrategicShift;
