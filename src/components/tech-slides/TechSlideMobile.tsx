import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import ArchitectureLayerBadge from "@/components/tech-slides/ArchitectureLayerBadge";
import { SlideNarrationProps } from "@/types/slideProps";
import { Smartphone, FileText, GraduationCap, ShieldCheck, KeyRound, Bell, Layers } from "lucide-react";
import DeepDiveLink from "@/components/shared/DeepDiveLink";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const miniApps = [
  { icon: FileText, name: "Procedures", status: "Live · daily use", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  { icon: GraduationCap, name: "Training", status: "Phase 1 · Q2 2026", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  { icon: ShieldCheck, name: "Safety", status: "Phase 2 · Q4 2026", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" },
];

const pillars = [
  { icon: Smartphone, title: "Less Context Shifting, Reduced Cognitive Load", desc: "Crews stay in the app they already trust. Training and Safety stop being detours — they become tabs.", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  { icon: KeyRound, title: "Single Sign-On", desc: "One identity across the platform. Authenticate once, access ContentManager365, TrainingManager365 and SafetyManager365 from one shell.", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  { icon: Bell, title: "Unified Notifications", desc: "One notification stream — procedure changes, training due, safety follow-ups — all in the same inbox.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  { icon: Layers, title: "Simpler Deployment, Drives IT Efficiency", desc: "One MDM (Mobile Device Management) footprint, one certification, one approval cycle through customer mobile estates — instead of three. Drives IT efficiency.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
];

const TechSlideMobile = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-mobile"
    title="Layer 4 · Unified Mobile Experience"
    subtitle="One trusted entry point for the frontline — Content, Training and Safety in a single shell"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <div className="flex items-center justify-between gap-3">
        <ArchitectureLayerBadge active="mobile" />
        <DeepDiveLink to="/mobile-playbook" label="Unified Mobile" returnTo="/pitch-technical" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 flex-1 min-h-0 items-stretch">
        {/* Phone mock — fixed width */}
        <div className="lg:col-span-2 flex items-center justify-center">
          <div className="rounded-[2rem] border-4 border-muted/30 bg-card/60 p-4 w-56 aspect-[9/16] flex flex-col">
            <div className="text-center mb-3 shrink-0">
              <div className="text-[10px] text-muted-foreground">Comply365 Mobile</div>
              <div className="text-xs font-bold text-foreground">One trusted shell</div>
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-center">
              {miniApps.map((m) => (
                <div key={m.name} className={`rounded-lg border ${m.border} ${m.bg} p-2 flex items-center gap-2`}>
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-bold ${m.color}`}>{m.name}</div>
                    <div className="text-[9px] text-muted-foreground truncate">{m.status}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-center text-[9px] text-muted-foreground shrink-0">SSO · Unified shell · iOS</div>
          </div>
        </div>

        {/* Pillars 2x2 equal height */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-3 auto-rows-fr h-full">
          {pillars.map((p) => (
            <div key={p.title} className={`rounded-xl border ${p.border} ${p.bg} p-4 flex flex-col h-full`}>
              <p.icon className={`h-5 w-5 ${p.color} mb-2`} />
              <h3 className={`text-sm font-bold ${p.color} mb-1.5`}>{p.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-center shrink-0 mt-auto">
        <p className="text-sm text-foreground">
          <span className="font-semibold text-primary">Three apps a shift → one app every shift.</span>
          <span className="text-muted-foreground"> Built on the Comply365 iOS app already in daily frontline use.</span>
        </p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlideMobile;
