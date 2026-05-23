import { Link } from "react-router-dom";
import {
  ArrowLeft, Mic, Play, Sparkles, Radio, Workflow,
  Search, Layers, ShieldCheck, FlaskConical, Users,
  Film, Download, FileText, BookOpen, Activity, Clock,
} from "lucide-react";
import logo from "@/assets/comply365-logo-white.png";

type EnergyLevel = "build" | "high" | "peak" | "cinematic" | "resolve";

interface Beat { label: string; detail: string }
interface Act {
  id: string; number: string; title: string; intent: string;
  start: number; end: number; energy: EnergyLevel;
  onStage: string; onScreen: string; beats: Beat[];
  icon: React.ElementType; accent: "blue" | "amber" | "violet" | "emerald";
}

const acts: Act[] = [
  {
    id: "cold-open", number: "01", title: "Cold open",
    intent: "Land the tension in one sentence.",
    start: 0, end: 2.5, energy: "build", icon: Mic, accent: "blue",
    onStage: "House lights down. CEO walks to centre stage, single spotlight, no slides. 90 seconds of silence-then-line.",
    onScreen: "Black frame. One line of type fades in over 12 seconds: \"Every operator in this room is running on signals they'll never see.\"",
    beats: [
      { label: "0:00 – 0:45", detail: "Walk-on in silence. Let the room settle." },
      { label: "0:45 – 1:30", detail: "Deliver the opening line. Hold the silence after." },
      { label: "1:30 – 2:30", detail: "Frame the next 40 minutes: 'Tonight we name the thing we've been avoiding.'" },
    ],
  },
  {
    id: "silo-era", number: "02", title: "The silo era",
    intent: "Provoke. Make the cost of disconnection feel personal.",
    start: 2.5, end: 7, energy: "high", icon: Workflow, accent: "amber",
    onStage: "Step into the audience. Tell the composite 'Tuesday morning' story — the same safety signal seen by four systems, acted on by none.",
    onScreen: "Stat wall builds beat by beat. Org-chart fractures into disconnected boxes; signal-traces die at the boundaries.",
    beats: [
      { label: "~65%", detail: "Operational signals that never make it home." },
      { label: "$25–35B", detail: "Annual industry exposure from disconnected operations." },
      { label: "~35%", detail: "Accuracy of generic AI in operational decisions." },
    ],
  },
  {
    id: "research", number: "03", title: "What the research told us",
    intent: "Evidence, not pitch. Move from opinion to proof.",
    start: 7, end: 13, energy: "high", icon: FlaskConical, accent: "violet",
    onStage: "Anchor the room in the Category Research Programme. Speak as a witness to the data, not the author of the conclusion.",
    onScreen: "Three findings revealed sequentially with the methodology badge held in the corner for credibility.",
    beats: [
      { label: "Finding 01", detail: "Buyer language exists for the operating gap — and it is not 'compliance'." },
      { label: "Finding 02", detail: "Willingness-to-pay clusters around connected operations, not point tools." },
      { label: "Finding 03", detail: "18–24 executive interviews converged on a shared vocabulary." },
      { label: "Method", detail: "n=300 survey · 18–24 exec interviews · secondary synthesis. Modelled, not measured." },
    ],
  },
  {
    id: "name-the-game", number: "04", title: "Naming the new game",
    intent: "Pivot from problem to category. Reveal DTOP beat by beat.",
    start: 13, end: 18, energy: "peak", icon: Sparkles, accent: "emerald",
    onStage: "Slow tempo. Four reveals — one for each DTOP step. Each lands with its colour and a single verb.",
    onScreen: "Black background. D · T · O · P appear in sequence with full-bleed colour swatches (blue · amber · violet · emerald).",
    beats: [
      { label: "Detect", detail: "See every signal — across systems, roles, and silos." },
      { label: "Trigger", detail: "Convert a signal into an obligation the operation can act on." },
      { label: "Orchestrate", detail: "Route work to the right hands, on the right device, at the right moment." },
      { label: "Prove", detail: "Close the loop with auditable evidence of the outcome." },
      { label: "Close", detail: "Master message: 'From event to control.'" },
    ],
  },
  {
    id: "film", number: "05", title: "The film",
    intent: "Emotional pivot. Let the room feel the category before they think it.",
    start: 18, end: 20, energy: "cinematic", icon: Film, accent: "blue",
    onStage: "CEO steps off-stage into shadow. 120 seconds of pure film. No voiceover from the stage.",
    onScreen: "Cinematic 2-minute hero film: frontline crews, flight decks, control rooms, rail platforms — signals visualised as light-traces moving across the operation.",
    beats: [
      { label: "0:00 – 0:30", detail: "Open on faces. Pre-shift, pre-dawn. The operation about to begin." },
      { label: "0:30 – 1:15", detail: "Signal-traces light up across geographies; the operation responds in concert." },
      { label: "1:15 – 1:45", detail: "A single decision avoids a single incident. Calm replaces noise." },
      { label: "1:45 – 2:00", detail: "Black card: 'This is what operational performance looks like.'" },
    ],
  },
  {
    id: "intelligence", number: "06", title: "The intelligence layer",
    intent: "Proof of capability. Why Comply365 can deliver the category.",
    start: 20, end: 30, energy: "peak", icon: Layers, accent: "violet",
    onStage: "Back on stage. Walk the DTOP loop using a recorded screen capture — no live demo risk. Bring two named operators on stage via taped interview.",
    onScreen: "Headline contrast: ~90% domain accuracy at L4–5 vs ~35% generic AI. Then the loop in motion: detect → trigger → orchestrate → prove.",
    beats: [
      { label: "90% vs 35%", detail: "Domain intelligence at L4–5 versus generic AI in operational decisions." },
      { label: "Walk the loop", detail: "Recorded screens: a real signal moving through Detect → Trigger → Orchestrate → Prove." },
      { label: "Customer voice", detail: "Two named operators on what changed when they connected the loop." },
      { label: "Roadmap glimpse", detail: "Insights, Automation, Unified Mobile — locked POC dates." },
    ],
  },
  {
    id: "call-to-arms", number: "07", title: "The call to arms",
    intent: "Resolve. Ask the room to commit.",
    start: 30, end: 35, energy: "resolve", icon: ShieldCheck, accent: "emerald",
    onStage: "Tempo down. CEO returns to centre stage. Three commitments out, one ask back. Land the final line.",
    onScreen: "Three commitment cards reveal in sequence. Final frame is a single line of type on black.",
    beats: [
      { label: "Commitment 01", detail: "Investment — what Comply365 is putting behind the category." },
      { label: "Commitment 02", detail: "Partnership model — how founding operators shape the roadmap." },
      { label: "Commitment 03", detail: "Transparency — a published research and roadmap cadence." },
      { label: "The ask", detail: "A working group of 12 founding operators. Names taken in the room." },
      { label: "Close", detail: "\"We're not selling into a category. We're building one.\"" },
    ],
  },
  {
    id: "qa", number: "Q&A", title: "Q&A",
    intent: "Curated, not chaotic. Mic runners in the aisles.",
    start: 35, end: 40, energy: "resolve", icon: Users, accent: "blue",
    onStage: "CEO joined on stage by the Chief Product Officer and one customer voice.",
    onScreen: "Question prompts on screen. Soft Comply365 wordmark watermark.",
    beats: [{ label: "5 min", detail: "3 questions max. Time-boxed. Followed by drinks and named conversations." }],
  },
];

const energyColor: Record<EnergyLevel, string> = {
  build: "bg-blue-500/50", high: "bg-amber-500/70", peak: "bg-violet-500/90",
  cinematic: "bg-blue-500", resolve: "bg-emerald-500/70",
};
const energyHeight: Record<EnergyLevel, string> = {
  build: "h-[30%]", high: "h-[70%]", peak: "h-[100%]",
  cinematic: "h-[85%]", resolve: "h-[55%]",
};
const accentRing: Record<Act["accent"], string> = {
  blue: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  amber: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  violet: "border-violet-500/30 text-violet-400 bg-violet-500/10",
  emerald: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
};

function formatMin(m: number) {
  const mm = Math.floor(m);
  const ss = Math.round((m - mm) * 60);
  return `${mm}:${ss.toString().padStart(2, "0")}`;
}

function EnergyBar() {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Activity className="h-3.5 w-3.5" /> Energy curve · 40 min
        </div>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> 35 min on stage · 5 min Q&A
        </div>
      </div>
      <div className="relative h-28 flex items-end gap-1">
        {acts.map((act) => {
          const widthPct = ((act.end - act.start) / 40) * 100;
          return (
            <a key={act.id} href={`#${act.id}`} className="relative group flex flex-col justify-end" style={{ width: `${widthPct}%` }}>
              <div className={`w-full ${energyHeight[act.energy]} ${energyColor[act.energy]} rounded-sm`} />
              {act.id === "film" && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-foreground text-background px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Film className="h-2.5 w-2.5" /> 2 min
                </div>
              )}
              <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] text-foreground bg-popover border border-border rounded px-1.5 py-0.5 whitespace-nowrap pointer-events-none">
                {act.title}
              </div>
            </a>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
        <span>0:00</span><span>10:00</span><span>20:00</span><span>30:00</span><span>40:00</span>
      </div>
    </div>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 px-5 py-4">
      <div className="text-2xl font-display font-bold text-foreground tracking-tight">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
    </div>
  );
}

function ActSection({ act }: { act: Act }) {
  const Icon = act.icon;
  return (
    <section id={act.id} className="scroll-mt-24 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] ${accentRing[act.accent]}`}>
            <Icon className="h-3 w-3" /> Act {act.number}
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight">{act.title}</h2>
          <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {formatMin(act.start)} → {formatMin(act.end)} · {Math.round((act.end - act.start) * 60)}s
          </div>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed italic">{act.intent}</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                <Mic className="h-3 w-3" /> On stage
              </div>
              <p className="text-sm text-foreground leading-relaxed">{act.onStage}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                <Search className="h-3 w-3" /> On screen
              </div>
              <p className="text-sm text-foreground leading-relaxed">{act.onScreen}</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card/40 p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Beats</div>
            <div className="divide-y divide-border/60">
              {act.beats.map((b) => (
                <div key={b.label} className="py-3 flex gap-5 first:pt-0 last:pb-0">
                  <div className="shrink-0 w-28 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary">{b.label}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{b.detail}</div>
                </div>
              ))}
            </div>
          </div>
          {act.id === "film" && (
            <div className="rounded-xl border border-border bg-gradient-to-br from-blue-500/10 via-card to-violet-500/10 p-8 flex items-center gap-6">
              <div className="h-16 w-16 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
                <Play className="h-7 w-7 ml-0.5" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Hero film</div>
                <div className="font-display text-xl font-bold tracking-tight">From Silos to Signals — 2:00</div>
                <div className="text-sm text-muted-foreground mt-1">Cinematic anchor. Embedded on the night, downloadable for analyst and press use.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const downloads = [
  { icon: FileText, title: "Speaker script (PDF)", note: "40-minute on-stage script with breath beats" },
  { icon: BookOpen, title: "Keynote deck", note: "Slide companion · DTOP-themed, low text" },
  { icon: Film, title: "Hero film · From Silos to Signals", note: "2-minute master · 16:9 · captioned" },
  { icon: Sparkles, title: "Stat sheet", note: "Sourced figures · 65% · $25–35B · 90 vs 35" },
];

export default function SilosToSignalsKeynote() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Comply365" className="h-7" />
            <div className="h-5 w-px bg-border" />
            <span className="text-sm font-medium text-muted-foreground">Keynote</span>
          </div>
          <Link to="/market-development" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Market Development
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--primary)/0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(280_84%_55%/0.12),transparent_55%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            <Mic className="h-3 w-3" /> CEO Keynote · 40 min · High energy
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.02] max-w-5xl">
            From silos <span className="text-muted-foreground/60">to</span>{" "}
            <span className="bg-gradient-to-r from-primary via-violet-400 to-emerald-400 bg-clip-text text-transparent">signals.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            The keynote that turns 12 weeks of research into a category. Seven acts, one 2-minute film, one ask of the room.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatPill value="40 min" label="Runtime" />
            <StatPill value="7" label="Acts + Q&A" />
            <StatPill value="2 min" label="Hero film" />
            <StatPill value="1" label="Ask of the room" />
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-card/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 space-y-6">
          <EnergyBar />
          <div className="flex flex-wrap gap-2">
            {acts.map((act) => (
              <a key={act.id} href={`#${act.id}`} className="rounded-full border border-border bg-card px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                {act.number} · {act.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Master message</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              From event <span className="text-muted-foreground/60">to</span> control.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 text-base text-muted-foreground leading-relaxed">
            <p>
              The keynote earns the right to claim a new category by showing — not telling — that connected operations are now possible. Every act, every stat, and every frame of the film ladders to one sentence the room can quote tomorrow.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["~65% lost signals", "$25–35B exposure", "90% vs 35% accuracy", "Detect · Trigger · Orchestrate · Prove"].map((t) => (
                <span key={t} className="rounded-full border border-border bg-card px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-foreground/80">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {acts.map((act) => (<ActSection key={act.id} act={act} />))}

      <section className="border-t border-border/60 bg-card/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <Download className="h-3.5 w-3.5" /> Companion assets
          </div>
          <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold tracking-tight max-w-3xl">What ships with the keynote.</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {downloads.map((d) => (
              <div key={d.title} className="rounded-xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary mb-3">
                  <d.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm font-semibold text-foreground">{d.title}</div>
                <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{d.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.18),transparent_65%)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary">
            <Radio className="h-3.5 w-3.5" /> Closing line
          </div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.05]">
            We're not selling into a category. <span className="text-muted-foreground/60">We're building one.</span>
          </h2>
        </div>
      </section>
    </div>
  );
}