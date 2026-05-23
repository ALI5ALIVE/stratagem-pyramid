import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Users,
  Gift,
  Coffee,
  ArrowRight,
  Sparkles,
  Map,
  Compass,
  Radar,
  Zap,
  Workflow,
  CheckCircle2,
  Calendar,
  MapPin,
  Mail,
  Download,
  ShieldCheck,
  Briefcase,
  Activity,
  GraduationCap,
  Scale,
  HelpCircle,
  XCircle,
  FileText,
  UserCheck,
  Phone,
  ChevronDown,
} from "lucide-react";
import {
  visionSessionAgenda,
  visionSessionLeaveBehind,
} from "@/data/week3FieldKit";

const dtopSteps = [
  {
    key: "D",
    label: "Detect",
    line: "See the weak signals — regulation, anomalies, change requests, external — before they become events.",
    icon: Radar,
    color: "sky",
  },
  {
    key: "T",
    label: "Trigger",
    line: "Turn signals into a named decision in hours, not the next committee cycle.",
    icon: Zap,
    color: "amber",
  },
  {
    key: "O",
    label: "Orchestrate",
    line: "Route the change through procedures, content, and training — one platform, no copy-paste.",
    icon: Workflow,
    color: "violet",
  },
  {
    key: "P",
    label: "Prove",
    line: "Close the loop with evidence a regulator can read in minutes.",
    icon: CheckCircle2,
    color: "emerald",
  },
] as const;

const colorMap: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  sky: { border: "border-sky-500/40", bg: "bg-sky-500/10", text: "text-sky-300", dot: "bg-sky-400" },
  amber: { border: "border-amber-500/40", bg: "bg-amber-500/10", text: "text-amber-300", dot: "bg-amber-400" },
  violet: { border: "border-violet-500/40", bg: "bg-violet-500/10", text: "text-violet-300", dot: "bg-violet-400" },
  emerald: { border: "border-emerald-500/40", bg: "bg-emerald-500/10", text: "text-emerald-300", dot: "bg-emerald-400" },
};

// Outcome line per agenda block (keyed by title — keeps internal slide untouched).
const agendaOutcomes: Record<string, string> = {
  "Where the industry is going":
    "A shared language for where oversight is heading — and why your peers are moving now.",
  "The platform story":
    "A clear mental model of one platform, three Core Apps, one Intelligence Layer.",
  "Capabilities deep-dive":
    "A view of which capabilities map to your real footprint and data shape.",
  "Operational Performance Roadmap":
    "A plotted point on the L1→L5 curve — and a named L4 target for your operation.",
  "Their DTOP loop, end-to-end":
    "One of your real use cases walked end-to-end on a whiteboard.",
  "Agreed next step":
    "A named exec sponsor, a candidate use case, and a date on the calendar.",
};

const agendaColor = (idx: number, isBreak?: boolean) => {
  if (isBreak) return "border";
  const order = ["sky", "amber", "violet", "emerald"];
  return order[idx % 4];
};

const differentiators = [
  {
    icon: Compass,
    title: "Not a demo",
    body: "Three hours of strategy and architecture — not a screen tour. We zoom out to where your operation is heading.",
  },
  {
    icon: Sparkles,
    title: "Your real use case",
    body: "In the final hour we whiteboard one of your operational scenarios end-to-end, with your team in the room.",
  },
  {
    icon: Map,
    title: "A roadmap you can take to your board",
    body: "You leave with a one-page maturity snapshot and a 90-day 'what's possible' view — not a follow-up deck.",
  },
];

const personaCards = [
  {
    icon: Briefcase,
    color: "sky",
    role: "CEO / Accountable Executive",
    promise:
      "A board-ready view of where your operation sits against the industry shift to performance-based oversight.",
    takeaways: [
      "Maturity snapshot vs peers",
      "Competitive position narrative",
      "12-month vision you can present",
    ],
  },
  {
    icon: Activity,
    color: "amber",
    role: "COO / Head of Operations",
    promise:
      "A concrete picture of what predictive operations unlock — and which use case to start with.",
    takeaways: [
      "Candidate DTOP use case",
      "Operational bottleneck map",
      "Quick-win shortlist",
    ],
  },
  {
    icon: ShieldCheck,
    color: "violet",
    role: "Head of Safety / VP SMS",
    promise:
      "A clear path from prescriptive compliance to evidence-led, regulator-ready safety performance.",
    takeaways: [
      "Evidence model walkthrough",
      "Audit-readiness gap view",
      "Regulator-ready narrative",
    ],
  },
  {
    icon: GraduationCap,
    color: "emerald",
    role: "Head of Training & L&D",
    promise:
      "Closed-loop targeting — assigning the right training from operational signals, and proving it changed behaviour.",
    takeaways: [
      "Closed-loop targeting model",
      "Behaviour-change evidence (not completion %)",
      "TMS-extension plan (no rip-and-replace)",
    ],
  },
  {
    icon: Scale,
    color: "sky",
    role: "Head of Compliance / Regulatory",
    promise:
      "Confidence that performance-based oversight stands up under EASA, FAA, CAA and TCCA regimes.",
    takeaways: [
      "Regulator narrative (named regimes)",
      "Audit-evidence model",
      "Framework alignment review",
    ],
  },
] as const;

const trustChips = [
  "Tier-1 European airline",
  "North American defense prime",
  "Major European rail operator",
  "Global cargo carrier",
  "National flag carrier (APAC)",
];

const prepCards = [
  {
    icon: Phone,
    title: "30-min prep call",
    body: "We align on your operation, attendees, and the use case to whiteboard. No prep deck required from you.",
  },
  {
    icon: FileText,
    title: "Two artifacts to bring",
    body: "Your current org chart for ops/safety/training and one recent operational KPI sheet. That's enough.",
  },
  {
    icon: UserCheck,
    title: "One named exec sponsor",
    body: "The person who can say 'yes, we'll back the use case'. Their presence is what makes the third hour real.",
  },
];

const faqs = [
  {
    q: "Is this a sales pitch in disguise?",
    a: "No. Zero product demo. If a demo is useful after the session, we book it separately and it has its own agenda.",
  },
  {
    q: "Who actually facilitates the session?",
    a: "A Comply365 strategist plus a solutions engineer — both named in your prep call so you know exactly who is walking into the room.",
  },
  {
    q: "What happens to anything we share?",
    a: "Nothing leaves the room without your written approval. We sign an NDA before the session if your team requires one.",
  },
  {
    q: "What if we're early-stage and not ready to buy?",
    a: "Most attendees aren't. A significant share of sessions don't convert in-year — they're designed to help leadership think, not to close a deal.",
  },
  {
    q: "On-site or virtual — which works better?",
    a: "On-site for the whiteboard hour if calendars allow. Virtual works well for the first two hours; we can split the session across two days if that's easier.",
  },
  {
    q: "Can we bring a partner or systems integrator?",
    a: "Yes — provided they're already in your operational stack. The session is more useful when everyone in the room can act on the outcome.",
  },
];

const notForYou = [
  "You're looking for a product demo — book one with your account lead instead.",
  "You can't get an executive sponsor in the room for the full three hours.",
  "Your team isn't ready to discuss real operational data, even at a high level.",
];

const maturityLevels = [
  { level: "L1", label: "Reactive" },
  { level: "L2", label: "Compliant" },
  { level: "L3", label: "Proactive" },
  { level: "L4", label: "Predictive" },
  { level: "L5", label: "Adaptive" },
];

const leaveBehindIcons = [Map, Sparkles, Compass];

const StrategyVisionSession = () => {
  // Scroll progress indicator
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Set document title/description (lightweight per-route head without helmet)
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "The Strategy & Vision Session — Comply365";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    const prevDesc = meta.getAttribute("content") || "";
    meta.setAttribute(
      "content",
      "A complimentary 3-hour session for operations leadership: map where your operation sits today and what predictive, performance-based oversight looks like in twelve months."
    );
    if (!meta.parentNode) document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-50">
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.10),transparent_55%)]" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            From silos to signals
            <span className="text-foreground/30">·</span>
            <span className="text-foreground/60">Complimentary · 3 hours · On-site or virtual</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
            The Strategy &amp; Vision Session
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-foreground/75 max-w-3xl leading-snug">
            Three hours with your leadership team to map where your operation sits today — and what
            predictive, performance-based oversight looks like for you in the next twelve months.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-sm font-medium">
              3 hours
            </span>
            <span className="px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-sm font-medium">
              Zero cost
            </span>
            <span className="px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-sm font-medium">
              Your team + ours
            </span>
            <span className="px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground/80">
              On-site or virtual
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="mailto:[email protected]?subject=Strategy%20%26%20Vision%20Session%20%E2%80%94%20request%20a%20date"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              <Mail className="h-4 w-4" /> Request a date
            </a>
            <a
              href="#agenda"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card hover:bg-card/70 font-semibold transition-colors"
            >
              See the 3-hour agenda <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#personas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/60 bg-transparent hover:bg-card/60 font-semibold text-foreground/80 transition-colors"
            >
              <Download className="h-4 w-4" /> What's in it for my role
            </a>
          </div>
        </div>
      </section>

      {/* Why this session exists */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
          Why this session exists
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
          The industry is shifting from prescriptive compliance to performance-based oversight. Most
          leadership conversations haven't caught up.
        </h2>
        <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
          <p>
            Regulators, boards, and insurers are asking a new question: not "did you comply?" but
            "can you prove your operation is getting safer, faster, and more efficient?" That question
            doesn't get answered in a feature demo or a quarterly review.
          </p>
          <p>
            The Strategy &amp; Vision Session is three hours in a room with your decision-makers and ours,
            mapped to where your operation is on the path from reactive to predictive — and what the
            next twelve months should look like.
          </p>
          <p className="text-foreground font-medium">
            It's the conversation your CEO, COO, and Head of Safety should be having together. We
            facilitate it, free of charge.
          </p>
        </div>
      </section>

      {/* What makes it different */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            What makes it different
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mb-12">
            This is not a vendor pitch. It's a working session.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="p-7 rounded-2xl border border-border bg-background/60 hover:border-primary/40 transition-colors"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                  <d.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{d.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Persona "what's in it for me" band */}
      <section id="personas" className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3 flex items-center gap-2">
          <Users className="h-3.5 w-3.5" /> What's in it for your role
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mb-4">
          Four people in the room. Four reasons it's worth the calendar block.
        </h2>
        <p className="text-lg text-foreground/70 max-w-3xl mb-12">
          The session is designed so every senior attendee leaves with something they can use that
          week — not a summary email.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {personaCards.map((p) => {
            const c = colorMap[p.color];
            return (
              <div
                key={p.role}
                className={`p-7 rounded-2xl border ${c.border} bg-card/40 hover:bg-card/60 transition-colors`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`h-11 w-11 rounded-xl border ${c.border} ${c.bg} flex items-center justify-center shrink-0`}>
                    <p.icon className={`h-5 w-5 ${c.text}`} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase tracking-[0.18em] font-bold ${c.text} mb-1`}>
                      For the
                    </div>
                    <h3 className="text-xl font-semibold leading-tight">{p.role}</h3>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed mb-5">{p.promise}</p>
                <div className="text-[11px] uppercase tracking-wider text-foreground/50 font-semibold mb-2">
                  You leave with
                </div>
                <ul className="space-y-1.5">
                  {p.takeaways.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className={`mt-2 h-1.5 w-1.5 rounded-full ${c.dot} shrink-0`} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <div className="text-[11px] uppercase tracking-wider text-primary font-semibold mb-2">
                Run by people who've done this
              </div>
              <p className="text-foreground/85 leading-snug">
                Comply365 strategists have led these sessions with operators across aviation,
                defense, and rail — including six of the world's twenty largest airlines.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="text-[11px] uppercase tracking-wider text-foreground/50 font-semibold mb-3">
                Recent attendees include
              </div>
              <div className="flex flex-wrap gap-2">
                {trustChips.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-full border border-border bg-background/60 text-xs text-foreground/75"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-foreground/60 italic">
                "Three hours that reframed the conversation we'd been having for a year. We came in
                talking renewals. We left with a board paper."
                <span className="not-italic text-foreground/40"> — VP Safety, Tier-1 European airline</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="max-w-5xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3 flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" /> The fixed 3-hour agenda
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mb-4">
          Designed so every minute earns its place.
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl mb-12">
          Seven blocks. One short break. By the end of hour three, your team has whiteboarded a real
          use case and agreed the next step.
        </p>

        <div className="relative">
          <div className="absolute left-[18px] md:left-[26px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-4">
            {visionSessionAgenda.map((b, idx) => {
              const color = agendaColor(idx, b.isBreak);
              const c = colorMap[color];
              const outcome = !b.isBreak ? agendaOutcomes[b.title] : undefined;
              return (
                <div key={b.time} className="relative pl-12 md:pl-16">
                  <div
                    className={`absolute left-0 top-3 h-9 w-9 md:h-[52px] md:w-[52px] rounded-full border flex items-center justify-center ${
                      b.isBreak
                        ? "border-border bg-muted text-muted-foreground"
                        : `${c.border} ${c.bg} ${c.text}`
                    }`}
                  >
                    {b.isBreak ? <Coffee className="h-4 w-4" /> : <span className="text-xs md:text-sm font-bold">{idx + 1}</span>}
                  </div>
                  <div
                    className={`p-5 md:p-6 rounded-xl border ${
                      b.isBreak
                        ? "border-border/50 bg-muted/20"
                        : "border-border bg-card/60 hover:border-primary/30 transition-colors"
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                      <span
                        className={`text-xs md:text-sm font-mono px-2.5 py-1 rounded-md border ${
                          b.isBreak ? "border-border text-muted-foreground" : `${c.border} ${c.text}`
                        }`}
                      >
                        {b.time}
                      </span>
                      <h3
                        className={`text-lg md:text-xl font-semibold ${
                          b.isBreak ? "text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {b.title}
                      </h3>
                    </div>
                    <p
                      className={`text-sm md:text-base leading-relaxed ${
                        b.isBreak ? "text-muted-foreground" : "text-foreground/75"
                      }`}
                    >
                      {b.detail}
                    </p>
                    {outcome && (
                      <div className={`mt-3 pt-3 border-t border-border/40 flex items-start gap-2 text-xs md:text-sm ${c.text}`}>
                        <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span>
                          <span className="font-semibold">You leave with:</span>{" "}
                          <span className="text-foreground/75">{outcome}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DTOP loop preview */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            The loop we'll walk together
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mb-4">
            Detect → Trigger → Orchestrate → Prove.
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mb-12">
            In hour three, we take one of <em className="text-foreground not-italic font-medium">your</em>{" "}
            real operational use cases and walk it around this loop on a whiteboard. No slides.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {dtopSteps.map((s, i) => {
              const c = colorMap[s.color];
              return (
                <div key={s.key} className={`relative p-6 rounded-2xl border ${c.border} ${c.bg}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-10 w-10 rounded-lg border ${c.border} bg-background/40 flex items-center justify-center`}>
                      <s.icon className={`h-5 w-5 ${c.text}`} />
                    </div>
                    <div>
                      <div className={`text-[10px] uppercase tracking-[0.18em] font-bold ${c.text}`}>
                        Step {i + 1}
                      </div>
                      <div className="text-xl font-bold">{s.label}</div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{s.line}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Maturity curve */}
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
          The Operational Performance curve
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mb-4">
          We'll plot where you are today — and what L4 looks like for your operation.
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl mb-12">
          Industry maturity today sits broadly at L2. L4 is where Operational Data starts predicting,
          not just describing.
        </p>

        <div className="relative p-8 md:p-10 rounded-2xl border border-border bg-card/40">
          {/* curve line */}
          <div className="relative h-2 rounded-full bg-gradient-to-r from-muted via-primary/40 to-emerald-500/70 mb-10" />

          <div className="grid grid-cols-5 gap-2 md:gap-4 -mt-14">
            {maturityLevels.map((m, idx) => {
              const isIndustryMedian = idx === 1;
              const isDestination = idx === 3;
              return (
                <div key={m.level} className="flex flex-col items-center text-center">
                  <div
                    className={`h-6 w-6 rounded-full border-2 ${
                      isDestination
                        ? "border-emerald-400 bg-emerald-400 shadow-[0_0_20px_hsl(var(--primary)/0.6)]"
                        : isIndustryMedian
                          ? "border-primary bg-primary"
                          : "border-border bg-background"
                    }`}
                  />
                  <div className="mt-3 text-xs md:text-sm font-bold">{m.level}</div>
                  <div className="text-[11px] md:text-xs text-foreground/60">{m.label}</div>
                  {isIndustryMedian && (
                    <div className="mt-2 text-[10px] md:text-xs px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary font-semibold whitespace-nowrap">
                      Industry median
                    </div>
                  )}
                  {isDestination && (
                    <div className="mt-2 text-[10px] md:text-xs px-2 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-semibold whitespace-nowrap">
                      The destination
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 pt-6 border-t border-border/50 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-foreground/60 mb-1">L1–L2</div>
              <div className="text-foreground">Reactive and compliant. Reports describe what already happened.</div>
            </div>
            <div>
              <div className="text-foreground/60 mb-1">L3</div>
              <div className="text-foreground">Proactive. Patterns visible but action still requires human assembly.</div>
            </div>
            <div>
              <div className="text-emerald-300 mb-1 font-semibold">L4 Predictive</div>
              <div className="text-foreground">Operational Data signals risk early. Recommended Actions reach the right team automatically.</div>
            </div>
          </div>
        </div>
      </section>

      {/* What you'll leave with */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3 flex items-center gap-2">
            <Gift className="h-3.5 w-3.5" /> What you'll leave with
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mb-12">
            Three deliverables you can take straight to your board.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {visionSessionLeaveBehind.map((item, i) => {
              const Icon = leaveBehindIcons[i] ?? Gift;
              return (
                <div
                  key={item}
                  className="p-7 rounded-2xl border border-border bg-background/60 hover:border-primary/40 transition-colors"
                >
                  <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-foreground/50 font-semibold mb-2">
                    Deliverable {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">{item}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to prepare */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
          How to prepare
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mb-4">
          A 30-minute call. Two artifacts. One sponsor.
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl mb-12">
          The lighter we make prep, the more senior the room. Here's exactly what's expected of your
          team before the session.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {prepCards.map((p) => (
            <div key={p.title} className="p-7 rounded-2xl border border-border bg-card/40">
              <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                <p.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Logistics */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-foreground/50 font-semibold">Duration</div>
                <div className="font-semibold">3 hours, fixed</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-foreground/50 font-semibold">Format</div>
                <div className="font-semibold">On-site or virtual</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Gift className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-foreground/50 font-semibold">Cost</div>
                <div className="font-semibold">Complimentary</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-foreground/50 font-semibold">Prep</div>
                <div className="font-semibold">~30 min pre-call</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3 flex items-center gap-2">
          <HelpCircle className="h-3.5 w-3.5" /> Questions execs ask first
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mb-12">
          Straight answers, not legal copy.
        </h2>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <button
                key={f.q}
                type="button"
                onClick={() => setOpenFaq(open ? null : i)}
                className={`w-full text-left p-5 md:p-6 rounded-xl border transition-colors ${
                  open
                    ? "border-primary/40 bg-card/70"
                    : "border-border bg-card/40 hover:bg-card/60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base md:text-lg font-semibold leading-snug">{f.q}</h3>
                  <ChevronDown
                    className={`h-5 w-5 text-foreground/60 shrink-0 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {open && (
                  <p className="mt-3 text-sm md:text-base text-foreground/75 leading-relaxed">
                    {f.a}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Not for you if */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
          <div className="text-xs uppercase tracking-[0.2em] text-foreground/60 font-semibold mb-3 flex items-center gap-2">
            <XCircle className="h-3.5 w-3.5" /> Not for you if…
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            We'd rather you skip the session than waste three hours.
          </h2>
          <ul className="space-y-3">
            {notForYou.map((n) => (
              <li key={n} className="flex items-start gap-3 text-foreground/80">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.18),transparent_65%)]" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 py-24 lg:py-32 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Three hours. Your team.<br />
            A roadmap to take to your board.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto">
            Pick a date. We'll send the prep pack and confirm the room.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:[email protected]?subject=Strategy%20%26%20Vision%20Session%20%E2%80%94%20request%20a%20date"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors"
            >
              <Mail className="h-4 w-4" /> Request a date
            </a>
            <a
              href="mailto:[email protected]?subject=Strategy%20%26%20Vision%20Session%20%E2%80%94%20book%20directly"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-border bg-card hover:bg-card/70 font-semibold text-lg transition-colors"
            >
              <Calendar className="h-4 w-4" /> Book directly on our calendar
            </a>
          </div>
          <p className="mt-6 text-sm text-foreground/60">
            Or speak to your Comply365 account lead — they'll book it for you.
          </p>
        </div>
        <div className="border-t border-border/40 py-8 text-center text-xs text-foreground/40">
          Comply365 · Strategy &amp; Vision Session
          <span className="mx-2">·</span>
          <Link to="/" className="hover:text-foreground/70 transition-colors">
            comply365.com
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StrategyVisionSession;
