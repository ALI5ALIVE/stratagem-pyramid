import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { coreApps } from "@/data/platformPlaybook";
import { FileText, GraduationCap, ShieldCheck, ArrowDown, Database } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { FileText, GraduationCap, ShieldCheck };

const PFSlide4CoreApps = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="pf-core"
      title="The Operational Core"
      subtitle="Three systems of record. One unified data foundation."
      slideNumber={4}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
          {coreApps.map((app, i) => {
            const Icon = iconMap[app.icon];
            return (
              <div key={i} className={`rounded-lg border ${app.border} ${app.bg} p-4 flex flex-col gap-3`}>
                <div className="flex items-center gap-2">
                  <Icon className={`h-6 w-6 ${app.color} shrink-0`} />
                  <div>
                    <h3 className={`text-sm font-semibold ${app.color}`}>{app.name}</h3>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{app.short}</p>
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">{app.role}</p>
                <div className="mt-auto">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Feeds the foundation with</p>
                  <ul className="space-y-1">
                    {app.feeds.map((f, j) => (
                      <li key={j} className="text-[11px] text-foreground/70 flex gap-1.5">
                        <span className={`${app.color} shrink-0`}>•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <ArrowDown className="h-5 w-5 text-cyan-400" />
        </div>

        <div className="rounded-lg border border-cyan-500/40 bg-cyan-500/5 p-3 flex items-center gap-3">
          <Database className="h-5 w-5 text-cyan-400 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-cyan-300">Operational Data Foundation</p>
            <p className="text-xs text-foreground/80">All three core apps feed one unified data lake — the substrate every other layer reasons over.</p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default PFSlide4CoreApps;
