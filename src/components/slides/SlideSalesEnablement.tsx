import { useState } from "react";
import { ShoppingCart, FileText, Users, BarChart3, MessageSquare, Briefcase, Radio, ChevronRight, Shield, Zap, Target, TrendingUp } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface EnablementAsset {
  title: string;
  audience: string;
  summary: string;
}

interface EnablementQuarter {
  label: string;
  theme: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderAccent: string;
  assets: EnablementAsset[];
}

const quarters: EnablementQuarter[] = [
  {
    label: "Q1",
    theme: "Foundation Toolkit",
    icon: Shield,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderAccent: "border-blue-400/40",
    assets: [
      { title: "Q1 Sales Narrative Sheet", audience: "Sales teams and account managers", summary: "Outcome-led story for Q1: why fragmented foundations limit performance and how connected models change the conversation." },
      { title: "Executive Persona One-Pager", audience: "Sales teams targeting C-suite and VP-level buyers", summary: "Tailored brief for executive conversations — connecting operational performance to strategic outcomes, investment confidence, and board-level visibility." },
      { title: "Safety Leader Persona One-Pager", audience: "Sales teams engaging safety directors and managers", summary: "Tailored brief for safety conversations — linking detection, governance, and connected workflows to measurable safety improvement." },
      { title: "Compliance Leader Persona One-Pager", audience: "Sales teams engaging compliance and regulatory leads", summary: "Tailored brief for compliance conversations — showing how connected foundations reduce audit burden and improve regulatory confidence." },
      { title: "Training Leader Persona One-Pager", audience: "Sales teams engaging training and L&D directors", summary: "Tailored brief for training conversations — repositioning readiness as a continuous performance capability rather than a completion exercise." },
      { title: "IT Leader Persona One-Pager", audience: "Sales teams engaging CIOs and IT directors", summary: "Tailored brief for IT conversations — connecting platform architecture, integration, and data governance to operational performance outcomes." },
      { title: "DTOP-to-KPI Mapping Sheet", audience: "Sales teams and solution consultants", summary: "Links the DTOP operating model directly to measurable business outcomes — giving sales a structured way to connect capabilities to value." },
      { title: "Signals-to-Outcomes Explainer", audience: "Sales teams and pre-sales consultants", summary: "A visual walkthrough showing how detection becomes coordinated action and measurable proof — designed for use in prospect meetings." },
      { title: "Objection Handling Guide", audience: "Sales teams and account managers", summary: "Structured responses to common objections around fragmentation, readiness, proof, integration complexity, and competitive alternatives." },
      { title: "Competitive Positioning Brief", audience: "Sales teams and sales leadership", summary: "Maps the competitive landscape and provides clear differentiation messaging — focusing on platform vs point solution, and outcome vs feature." },
      { title: "Discovery Question Framework", audience: "Sales teams and solution consultants", summary: "A structured set of discovery questions aligned to DTOP stages — helping sales uncover operational pain points and map them to platform value." },
      { title: "Business Case Support Materials", audience: "Sales teams supporting later-stage deals", summary: "Structured materials for investment or expansion conversations. Includes evidence frameworks, ROI structures, and outcome mapping templates." },
    ],
  },
  {
    label: "Q2",
    theme: "Signal-to-Action Support",
    icon: Zap,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderAccent: "border-amber-400/40",
    assets: [
      { title: "Q2 Sales Narrative Sheet", audience: "Sales teams and account managers", summary: "Outcome-led story for Q2: visibility alone does not improve performance — signals, triggers, and coordinated action do." },
      { title: "DTOP Demo Talking Points", audience: "Sales teams and solution consultants", summary: "Structured talking points for platform demonstrations — aligning demo flow to the DTOP narrative and Q2 signal-to-action messaging." },
      { title: "Mid-Funnel Case Study Template", audience: "Sales teams and marketing", summary: "A reusable template for structuring customer evidence around the signal-to-action narrative — designed for mid-funnel prospect conversations." },
      { title: "ROI Conversation Starter", audience: "Sales teams engaging executive sponsors", summary: "A lightweight ROI discussion tool helping sales open value-based conversations before the full business case stage." },
    ],
  },
  {
    label: "Q3",
    theme: "Readiness & Proof Tools",
    icon: Target,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderAccent: "border-emerald-400/40",
    assets: [
      { title: "Q3 Sales Narrative Sheet", audience: "Sales teams and account managers", summary: "Outcome-led story for Q3: readiness is not a training event — it is a continuous condition that drives predictable performance." },
      { title: "Readiness Value Calculator", audience: "Sales teams and solution consultants", summary: "An interactive tool helping prospects quantify the gap between current training completion and continuous readiness capability." },
      { title: "Expansion Conversation Guide", audience: "Account managers and customer success", summary: "A structured guide for existing customer conversations — identifying expansion triggers and aligning them to the readiness narrative." },
      { title: "Customer Success Story Pack", audience: "Sales teams and marketing", summary: "A curated set of customer evidence aligned to Q3 readiness themes — structured for use in proposals, presentations, and nurture sequences." },
    ],
  },
  {
    label: "Q4",
    theme: "Scale & Investment Support",
    icon: TrendingUp,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderAccent: "border-purple-400/40",
    assets: [
      { title: "Q4 Sales Narrative Sheet", audience: "Sales teams and account managers", summary: "Outcome-led story for Q4: performance only scales when progress can be proved — and that requires evidence, not just more reporting." },
      { title: "Executive Business Case Deck", audience: "Sales teams supporting board-level approvals", summary: "A structured presentation for executive sponsors making the internal case for investment or expansion — aligned to the full-year DTOP narrative." },
      { title: "Annual Review & Renewal Pack", audience: "Account managers and customer success", summary: "Materials supporting annual review conversations — summarising outcomes, proving value, and building the case for continued or expanded investment." },
      { title: "Competitive Win/Loss Analysis Template", audience: "Sales leadership and marketing", summary: "A structured template for capturing and sharing competitive intelligence — informing positioning, messaging, and enablement priorities for the next fiscal year." },
    ],
  },
];

const conversationShifts = [
  { label: "Why the status quo is limiting performance" },
  { label: "How DTOP changes the operating model" },
  { label: "How signals improve action and accountability" },
  { label: "How readiness becomes more measurable" },
  { label: "How proof supports investment or expansion" },
];

const SlideSalesEnablement = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activeQuarter, setActiveQuarter] = useState(0);
  const q = quarters[activeQuarter];
  const totalAssets = quarters.reduce((sum, quarter) => sum + quarter.assets.length, 0);

  return (
    <SlideContainer
      id="slide-sales-enablement"
      title="Sales Enablement Strategy"
      subtitle={`${totalAssets} assets — 12 front-loaded in Q1, then 4 per quarter`}
      slideNumber={6}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
      className="!h-auto !min-h-screen !overflow-visible"
    >
      <div className="flex flex-col gap-4">
        {/* Hero statement */}
        <div className="bg-rose-400/10 border border-rose-400/30 rounded-xl px-6 py-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-5 h-5 text-rose-400" />
            <p className="text-xs text-rose-400 uppercase tracking-widest font-semibold">Bottom-of-Funnel Support</p>
          </div>
          <p className="text-sm text-foreground leading-relaxed font-medium max-w-4xl">
            Sales enablement content should help frontline teams move from feature-led product discussion 
            to outcome-led commercial conversations — making it easier to explain why the status quo limits 
            performance and how connected operations change the outcome.
          </p>
        </div>

        {/* Quarter tabs */}
        <div className="flex gap-2">
          {quarters.map((quarter, i) => {
            const Icon = quarter.icon;
            return (
              <button
                key={quarter.label}
                onClick={() => setActiveQuarter(i)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                  activeQuarter === i
                    ? `${quarter.bgColor} ${quarter.borderAccent} scale-[1.02]`
                    : "bg-card/30 border-border/20 hover:border-border/50 hover:bg-card/50"
                )}
              >
                <Icon className={cn("w-5 h-5", activeQuarter === i ? quarter.color : "text-muted-foreground")} />
                <div className="text-sm font-bold text-foreground">{quarter.label}: {quarter.theme}</div>
                <div className="text-xs text-muted-foreground">{quarter.assets.length} assets</div>
              </button>
            );
          })}
        </div>

        {/* Two-column: Assets + Conversation Shifts */}
        <div className="grid grid-cols-[2fr_1fr] gap-4">
          {/* Asset cards — masonry */}
          <div className="bg-muted border border-border rounded-2xl p-6">
            <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-4">
              {q.label} Enablement Assets · {q.assets.length} items
            </p>
            <div className="columns-2 gap-4 space-y-4">
              {q.assets.map((asset, i) => (
                <div
                  key={asset.title}
                  className={cn(
                    "break-inside-avoid rounded-xl border px-5 py-4",
                    i % 2 === 0
                      ? "bg-background border-border/60"
                      : "bg-card border-border/40"
                  )}
                >
                  <h4 className="text-sm font-bold text-foreground leading-snug">{asset.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-2">{asset.audience}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed">{asset.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What it should make easier */}
          <div className="flex flex-col gap-3">
            <div className="bg-card/60 border border-border/50 rounded-xl p-5 flex flex-col">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">What It Should Make Easier</p>
              <div className="space-y-2.5">
                {conversationShifts.map((shift, i) => (
                  <div key={i} className="bg-background/50 rounded-lg px-4 py-3 flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="text-xs text-foreground font-medium leading-snug">{shift.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution summary */}
            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Distribution</p>
              <div className="space-y-2">
                {quarters.map((quarter) => (
                  <div key={quarter.label} className="flex items-center justify-between">
                    <span className={cn("text-xs font-semibold", quarter.color)}>{quarter.label}: {quarter.theme}</span>
                    <span className="text-xs font-bold text-primary">{quarter.assets.length}</span>
                  </div>
                ))}
                <div className="border-t border-border/30 pt-2 mt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground uppercase">Total</span>
                  <span className="text-sm font-bold text-primary">{totalAssets}</span>
                </div>
              </div>
            </div>

            {/* Pipeline note */}
            <div className="bg-rose-400/5 border border-rose-400/20 rounded-xl p-4">
              <p className="text-xs text-foreground/70 leading-relaxed italic">
                This is where the programme ties most directly back to pipeline progression — 
                connecting market-level thought leadership to deal-level commercial momentum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideSalesEnablement;
