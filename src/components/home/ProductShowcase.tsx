import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, ShieldCheck, BookOpen, Sparkles, FileText, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

const TABS = [
  { id: "coanalyst", label: "CoAnalyst", icon: Brain },
  { id: "safety", label: "Safety control surface", icon: ShieldCheck },
  { id: "manuals", label: "Connected manuals", icon: BookOpen },
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

function CoAnalystMock() {
  return (
    <div className="relative h-full w-full bg-card flex flex-col">
      <div className="border-b border-border/60 px-5 py-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Brain className="h-3.5 w-3.5 text-primary" /> CoAnalyst · Operational Q&A
      </div>
      <div className="flex-1 p-5 space-y-4 overflow-hidden">
        <div className="rounded-lg bg-muted/40 px-3 py-2 text-sm text-foreground max-w-md">
          What changed in the engine fire procedure last quarter, and which crews still need recurrent on it?
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3 w-3" /> Recommended Action
          </div>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            Procedure <span className="font-semibold">QRH 7.12 (Engine Fire on Ground)</span> was revised on 14 Mar — step 3 changed from manual cutoff to FADEC arbitration. <span className="font-semibold">42 crews</span> have not yet completed recurrent.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
            <span className="rounded-full border border-border bg-background px-2 py-0.5 text-muted-foreground">Source: QRH r.14</span>
            <span className="rounded-full border border-border bg-background px-2 py-0.5 text-muted-foreground">Source: TrainingManager365</span>
            <span className="rounded-full border border-border bg-background px-2 py-0.5 text-muted-foreground">Source: SMS event #4421</span>
          </div>
          <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
            Assign recurrent to 42 crews <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
      <Pin n={1} top="32%" left="6%" label="Operator asks in plain English" />
      <Pin n={2} top="58%" left="62%" label="Cited from your corpus" />
      <Pin n={3} top="82%" left="22%" label="One-click action" />
    </div>
  );
}

function SafetyMock() {
  const events = [
    { sev: "high", title: "Unstable approach · LHR 27R", time: "08:42", status: "Triaged" },
    { sev: "med", title: "Cabin smoke odor · Flight 442", time: "07:31", status: "Investigating" },
    { sev: "low", title: "Ramp damage report · GVA", time: "06:18", status: "Closed" },
    { sev: "med", title: "Procedure deviation · QRH 7.12", time: "05:55", status: "Routed" },
  ];
  const sevColor = (s: string) => s === "high" ? "bg-red-500" : s === "med" ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="relative h-full w-full bg-card flex flex-col">
      <div className="border-b border-border/60 px-5 py-3 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Safety · Today</span>
        <span>4 open · 0 overdue</span>
      </div>
      <div className="flex-1 p-5 space-y-2 overflow-hidden">
        {events.map((e) => (
          <div key={e.title} className="rounded-lg border border-border bg-background/40 px-4 py-3 flex items-center gap-3">
            <span className={`h-2 w-2 rounded-full ${sevColor(e.sev)}`} />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-foreground truncate">{e.title}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">{e.time} · {e.status}</div>
            </div>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground/50" />
          </div>
        ))}
        <div className="mt-4 rounded-lg border border-violet-500/30 bg-violet-500/5 px-4 py-3">
          <div className="text-[10px] uppercase tracking-[0.18em] text-violet-300">Orchestrate</div>
          <p className="mt-1 text-sm text-foreground">3 events linked to QRH 7.12 — bundling for root-cause review.</p>
        </div>
      </div>
      <Pin n={1} top="22%" left="6%" label="All signals, prioritized" />
      <Pin n={2} top="76%" left="58%" label="Auto-grouped by root cause" />
    </div>
  );
}

function ManualsMock() {
  return (
    <div className="relative h-full w-full bg-card flex flex-col">
      <div className="border-b border-border/60 px-5 py-3 flex items-center gap-2 text-xs text-muted-foreground">
        <BookOpen className="h-3.5 w-3.5 text-amber-400" /> ContentManager365 · QRH Volume 2
      </div>
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        <div className="col-span-4 border-r border-border/60 p-4 space-y-2 text-xs">
          <div className="text-muted-foreground">7. Emergency Procedures</div>
          <div className="rounded-md bg-primary/10 text-primary px-2 py-1.5 font-medium">7.12 Engine Fire on Ground</div>
          <div className="text-muted-foreground pl-2">7.13 Smoke / Fumes</div>
          <div className="text-muted-foreground pl-2">7.14 Rapid Decompression</div>
        </div>
        <div className="col-span-8 p-5 space-y-3 text-sm">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-amber-400">
            <FileText className="h-3 w-3" /> Revision 14 · published 14 Mar
          </div>
          <h4 className="font-display font-semibold text-foreground">Engine Fire on Ground</h4>
          <ol className="list-decimal pl-5 space-y-1.5 text-muted-foreground text-xs leading-relaxed">
            <li>THRUST LEVER (affected) — IDLE</li>
            <li>FUEL CONTROL SWITCH — CUTOFF</li>
            <li className="text-foreground bg-amber-500/10 -mx-2 px-2 py-1 rounded">FADEC ARBITRATION — VERIFY <span className="text-amber-400 font-semibold">(changed)</span></li>
            <li>ENG FIRE PUSH (affected) — PUSH</li>
          </ol>
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-xs">
            <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-400">Linked</div>
            <p className="mt-1 text-foreground">3 SMS events · 1 training module · 42 crews pending recurrent</p>
          </div>
        </div>
      </div>
      <Pin n={1} top="42%" left="42%" label="Revisions tracked at step level" />
      <Pin n={2} top="78%" left="50%" label="Linked to safety + training" />
    </div>
  );
}

export default function ProductShowcase() {
  const [tab, setTab] = useState("coanalyst");
  return (
    <section className="border-b border-border/60 bg-card/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">The product</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
              What it actually looks like on Tuesday morning.
            </h2>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mt-8">
          <TabsList className="bg-card/60 border border-border h-auto p-1">
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
            <div className="relative h-[420px] md:h-[480px]">
              <TabsContent value="coanalyst" className="m-0 h-full"><CoAnalystMock /></TabsContent>
              <TabsContent value="safety" className="m-0 h-full"><SafetyMock /></TabsContent>
              <TabsContent value="manuals" className="m-0 h-full"><ManualsMock /></TabsContent>
            </div>
          </div>
        </Tabs>

        <p className="mt-4 text-xs text-muted-foreground italic">Representative product views. Specific UI may vary by deployment.</p>
      </div>
    </section>
  );
}