import { TrendingUp, Clock, DollarSign, Heart, ArrowRight, Activity } from "lucide-react";
import BookWalkthroughDialog from "@/components/home/BookWalkthroughDialog";

const OUTCOMES = [
  {
    title: "Schedule Protection",
    subtitle: "Fewer disruptions, faster recovery",
    icon: Clock,
    accent: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/5",
    iconBg: "bg-primary",
    example: {
      signal: "Hard landing trend detected in operational data",
      action: "Targeted pilot retraining deployed",
      result: "Fewer maintenance delays, protected departures",
    },
  },
  {
    title: "Revenue Protection",
    subtitle: "Protect the schedule, protect the revenue",
    icon: TrendingUp,
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    iconBg: "bg-emerald-500",
    example: {
      signal: "Smoke & fumes cluster at regional hub",
      action: "De-icing procedure revised, ground crew retrained",
      result: "Fewer incidents, schedule maintained",
    },
  },
  {
    title: "Cost Savings",
    subtitle: "Less wear, fewer claims, less rework",
    icon: DollarSign,
    accent: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    iconBg: "bg-amber-500",
    example: {
      signal: "Training gaps identified via performance data",
      action: "Personalized competency modules assigned",
      result: "Reduced tire wear, fewer landing gear repairs",
    },
  },
  {
    title: "Customer Loyalty",
    subtitle: "Trust through consistent operations",
    icon: Heart,
    accent: "text-violet-400",
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    iconBg: "bg-violet-500",
    example: {
      signal: "Procedure confusion pattern detected",
      action: "SOP rewritten with clarity, crew retrained",
      result: "Fewer incidents, improved on-time performance",
    },
  },
];

const CustomerBenefits = () => (
  <section className="border-b border-border/60">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary">
        <Activity className="h-3.5 w-3.5" /> What this means for customers
      </div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-4xl">
        Connecting operational signals to measurable business outcomes.
      </h2>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Schedule protected. Revenue protected. Costs lower. Customers loyal.
      </p>

      {/* Cost Center → Operational Performance → Revenue Driver */}
      <div className="mt-10 rounded-2xl border border-border bg-card/40 p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap md:flex-nowrap">
          <div className="flex-1 min-w-[140px] text-center p-3 rounded-xl bg-muted/30 border border-border">
            <DollarSign className="w-5 h-5 mx-auto text-muted-foreground mb-1.5" />
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.18em]">Cost Center</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Reactive · Siloed</p>
          </div>
          <ArrowRight className="w-4 h-4 text-primary shrink-0" />
          <div className="flex-1 min-w-[140px] text-center p-3 rounded-xl bg-primary/10 border border-primary/30">
            <Activity className="w-5 h-5 mx-auto text-primary mb-1.5" />
            <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.18em]">Operational Performance</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Connected · Proactive</p>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
          <div className="flex-1 min-w-[140px] text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <TrendingUp className="w-5 h-5 mx-auto text-emerald-400 mb-1.5" />
            <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-[0.18em]">Revenue Driver</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Protected · Growing</p>
          </div>
        </div>
      </div>

      {/* Outcome cards */}
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {OUTCOMES.map((o) => {
          const Icon = o.icon;
          return (
            <div key={o.title} className={`rounded-2xl border ${o.border} ${o.bg} p-5`}>
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-lg ${o.iconBg} flex items-center justify-center`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className={`text-sm font-semibold ${o.accent}`}>{o.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-tight">{o.subtitle}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2.5">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-medium text-amber-500 tracking-[0.14em]">Signal</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">{o.example.signal}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-medium text-primary tracking-[0.14em]">Action</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">{o.example.action}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-medium text-emerald-500 tracking-[0.14em]">Result</p>
                    <p className="text-[11px] text-foreground font-medium leading-snug">{o.example.result}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Closing band */}
      <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-sm text-foreground">
          Operational signals → <span className="text-primary font-semibold">business outcomes</span>.
        </p>
        <BookWalkthroughDialog
          trigger={
            <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:bg-primary/90 transition-colors">
              Book a walkthrough <ArrowRight className="h-3.5 w-3.5" />
            </button>
          }
        />
      </div>
    </div>
  </section>
);

export default CustomerBenefits;
