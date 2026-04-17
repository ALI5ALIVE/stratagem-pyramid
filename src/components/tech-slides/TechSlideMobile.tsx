import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Smartphone, FileText, GraduationCap, ShieldCheck, KeyRound, Bell, Layers } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const miniApps = [
  { icon: FileText, name: "Procedures", status: "Live · daily use", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  { icon: GraduationCap, name: "Training", status: "Phase 1 · Q2 2026", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  { icon: ShieldCheck, name: "Safety", status: "Phase 2 · Q4 2026", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" },
];

const pillars = [
  { icon: Smartphone, title: "Less Context Shifting", desc: "Crews stay in the app they already trust. Training and Safety stop being detours — they become tabs.", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  { icon: KeyRound, title: "Single Sign-On", desc: "One identity across the platform. Authenticate once, access ContentManager365, TrainingManager365 and SafetyManager365 from one shell.", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  { icon: Bell, title: "Unified Notifications", desc: "One notification stream — procedure changes, training due, safety follow-ups — all in the same inbox.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  { icon: Layers, title: "Simpler Deployment", desc: "One MDM footprint, one certification, one approval cycle through customer mobile estates — instead of three.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
];

const TechSlideMobile = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-mobile"
    title="The Unified Mobile Experience"
    subtitle="One trusted entry point for the frontline — Content, Training and Safety in a single shell"
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-0">
      {/* Left: phone mock */}
      <div className="lg:col-span-2 flex items-center justify-center">
        <div className="rounded-[2rem] border-4 border-muted/30 bg-card/60 p-4 w-56 aspect-[9/16] flex flex-col">
          <div className="text-center mb-3">
            <div className="text-[10px] text-muted-foreground">Comply365 Mobile</div>
            <div className="text-xs font-bold text-foreground">One trusted shell</div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            {miniApps.map((m) => (
              <div key={m.name} className={`rounded-lg border ${m.border} ${m.bg} p-2 flex items-center gap-2`}>
                <m.icon className={`h-4 w-4 ${m.color}`} />
                <div className="flex-1 min-w-0">
                  <div className={`text-[11px] font-bold ${m.color}`}>{m.name}</div>
                  <div className="text-[9px] text-muted-foreground truncate">{m.status}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-center text-[9px] text-muted-foreground">SSO · Unified shell · iOS</div>
        </div>
      </div>

      {/* Right: 4 pillars */}
      <div className="lg:col-span-3 grid grid-cols-2 gap-3">
        {pillars.map((p) => (
          <div key={p.title} className={`rounded-xl border ${p.border} ${p.bg} p-3 flex flex-col`}>
            <p.icon className={`h-5 w-5 ${p.color} mb-2`} />
            <h3 className={`text-sm font-bold ${p.color} mb-1`}>{p.title}</h3>
            <p className="text-[11px] text-muted-foreground leading-snug">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-2.5 text-center shrink-0">
      <p className="text-xs text-foreground">
        <span className="font-semibold text-primary">Three apps a shift → one app every shift.</span>
        <span className="text-muted-foreground"> Built on the Comply365 iOS app already in daily frontline use.</span>
      </p>
    </div>
  </SalesSlideContainer>
);

export default TechSlideMobile;
