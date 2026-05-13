import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShieldCheck, GraduationCap, BookOpen, Sparkles, ArrowRight, Clock } from "lucide-react";

const TABS = [
  { id: "safety", label: "Director of Safety", icon: ShieldCheck, accent: "text-emerald-300", dot: "bg-emerald-500" },
  { id: "training", label: "Head of Training", icon: GraduationCap, accent: "text-violet-300", dot: "bg-violet-500" },
  { id: "pubs", label: "Tech Pubs Manager", icon: BookOpen, accent: "text-amber-300", dot: "bg-amber-500" },
];

const Pin = ({ n, top, left, label }: { n: number; top: string; left: string; label: string }) => (
  <div className="absolute z-20" style={{ top, left }}>
    <div className="flex items-center gap-2">
      <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center ring-4 ring-background">
        {n}
      </span>
      <span className="hidden lg:inline text-[11px] font-medium text-foreground bg-background/95 border border-border rounded-md px-2 py-1 shadow-sm whitespace-nowrap">
        {label}
      </span>
    </div>
  </div>
);

const VignetteHeader = ({
  time,
  role,
  accent,
  dot,
  Icon,
}: {
  time: string;
  role: string;
  accent: string;
  dot: string;
  Icon: any;
}) => (
  <div className="flex items-center gap-3 mb-4 flex-wrap">
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      <Clock className="h-3 w-3" /> {time}
    </span>
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${accent}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} /> <Icon className="h-3 w-3" /> {role}
    </span>
  </div>
);

function SafetyVignette() {
  return (
    <div className="relative h-full w-full bg-card flex flex-col p-5">
      <VignetteHeader time="Tuesday 08:42" role="Director of Safety" accent="text-emerald-300" dot="bg-emerald-500" Icon={ShieldCheck} />
      <div className="rounded-lg border border-border bg-background/40 px-4 py-3 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-amber-500" />
        <div className="flex-1 min-w-0">
          <div className="text-sm text-foreground">Crew report · Repeat altitude deviation · Approach LHR 27R</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">Filed 08:31 · Auto-correlated</div>
        </div>
      </div>
      <div className="mt-3 rounded-lg border border-primary/30 bg-primary/5 p-4 flex-1">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3 w-3" /> Recommended Action
        </div>
        <p className="mt-2 text-sm text-foreground leading-relaxed">
          <span className="font-semibold">3 similar reports</span> in the last 14 days. Linked to <span className="font-semibold">SOP 4.2 r.9</span>. Draft investigation prepared — assign owner?
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
          <span className="rounded-full border border-border bg-background px-2 py-0.5 text-muted-foreground">SMS #4421 · #4408 · #4392</span>
          <span className="rounded-full border border-border bg-background px-2 py-0.5 text-muted-foreground">SOP 4.2 r.9</span>
        </div>
        <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
          Open investigation · Notify Tech Pubs + Training <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-[11px] text-emerald-300">
        Outcome — investigation opened by 09:05 · audit trail filed automatically
      </div>
      <Pin n={1} top="36%" left="58%" label="3 reports auto-correlated" />
    </div>
  );
}

function TrainingVignette() {
  return (
    <div className="relative h-full w-full bg-card flex flex-col p-5">
      <VignetteHeader time="Tuesday 09:14" role="Head of Training" accent="text-violet-300" dot="bg-violet-500" Icon={GraduationCap} />
      <div className="rounded-lg border border-border bg-background/40 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-foreground">QRH 7.12 r.14 · effective 14 Mar</div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-violet-300">Compliance gap</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-muted/50 overflow-hidden">
            <div className="h-full bg-violet-500" style={{ width: "67%" }} />
          </div>
          <span className="text-[11px] text-muted-foreground"><span className="font-semibold text-foreground">42</span> / 128 crews pending</span>
        </div>
      </div>
      <div className="mt-3 rounded-lg border border-primary/30 bg-primary/5 p-4 flex-1">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3 w-3" /> Recommended Action
        </div>
        <p className="mt-2 text-sm text-foreground leading-relaxed">
          Assign <span className="font-semibold">delta module 7.12-Δ14</span> to 42 crews · due 14 days · notify line managers.
        </p>
        <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
          Assign to 42 crews · 1 click <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="mt-3 rounded-md border border-violet-500/30 bg-violet-500/5 px-3 py-2 text-[11px] text-violet-300">
        Outcome — 42 crews assigned in 1 click · gap closed before next ops review
      </div>
      <Pin n={1} top="44%" left="55%" label="Delta module auto-built from revision" />
    </div>
  );
}

function PubsVignette() {
  return (
    <div className="relative h-full w-full bg-card flex flex-col p-5">
      <VignetteHeader time="Tuesday 10:02" role="Tech Pubs Manager" accent="text-amber-300" dot="bg-amber-500" Icon={BookOpen} />
      <div className="rounded-lg border border-border bg-background/40 px-4 py-3">
        <div className="text-sm text-foreground">EASA AD 2026-0098 published · affects A320 / A321 fleet</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">Ingested 09:58 · Mapped automatically</div>
      </div>
      <div className="mt-3 rounded-lg border border-primary/30 bg-primary/5 p-4 flex-1">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3 w-3" /> Recommended Action
        </div>
        <p className="mt-2 text-sm text-foreground leading-relaxed">
          <span className="font-semibold">7 procedures</span> impacted across QRH, FCOM, MEL. Drafts prepared for review · downstream training impact flagged.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-[10px]">
          <span className="rounded border border-border bg-background px-2 py-1 text-muted-foreground">QRH 7.12 → r.15</span>
          <span className="rounded border border-border bg-background px-2 py-1 text-muted-foreground">FCOM 3.4 → r.22</span>
          <span className="rounded border border-border bg-background px-2 py-1 text-muted-foreground">MEL 24-31 → r.07</span>
        </div>
        <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
          Open revision pack for review <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-[11px] text-amber-300">
        Outcome — revision cycle 6 weeks → 4 days · nothing falls through the cracks
      </div>
      <Pin n={1} top="42%" left="55%" label="AD auto-mapped to procedures" />
    </div>
  );
}

const VIEWS: Record<string, () => JSX.Element> = {
  safety: SafetyVignette,
  training: TrainingVignette,
  pubs: PubsVignette,
};

export default function ProductShowcase() {
  const [tab, setTab] = useState("safety");
  return (
    <section className="border-b border-border/60 bg-card/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">A day in the operation</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
              Tuesday morning, before coffee.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Three roles. Three signals. Three resolved by lunch.
            </p>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mt-8">
          <TabsList className="bg-card/60 border border-border h-auto p-1 flex-wrap">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <TabsTrigger key={t.id} value={t.id} className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon className="h-3.5 w-3.5" /> {t.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="mt-6 rounded-2xl border border-border bg-background overflow-hidden shadow-2xl">
            <div className="bg-muted/30 px-4 py-2 flex items-center gap-2 border-b border-border">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">comply365.app</span>
            </div>
            <div className="relative h-[520px] md:h-[540px]">
              {TABS.map((t) => {
                const View = VIEWS[t.id];
                return (
                  <TabsContent key={t.id} value={t.id} className="m-0 h-full">
                    <View />
                  </TabsContent>
                );
              })}
            </div>
          </div>
        </Tabs>

        <p className="mt-4 text-xs text-muted-foreground italic">Representative product views. Specific UI may vary by deployment.</p>
      </div>
    </section>
  );
}
