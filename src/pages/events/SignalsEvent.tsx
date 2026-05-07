import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Radar, Zap, GitBranch, BadgeCheck, ArrowRight, Activity } from "lucide-react";

const stats = [
  { value: "12K+", label: "Monthly operational signals", sub: "per mid-size carrier — most go unheard" },
  { value: "~35%", label: "Generic AI accuracy", sub: "on aviation categorisation — too unreliable to act on" },
  { value: "~90%", label: "Domain AI accuracy", sub: "with CoAnalyst — the threshold where signals become decisions" },
];

const tracks = [
  { letter: "D", name: "Detect", color: "sky", desc: "The signals others miss.", tag: "CoAnalyst · Insights" },
  { letter: "T", name: "Trigger", color: "amber", desc: "The right action, automatically.", tag: "Automation · DTOP" },
  { letter: "O", name: "Orchestrate", color: "violet", desc: "Safety, content, and training as one system.", tag: "Platform Foundation" },
  { letter: "P", name: "Prove", color: "emerald", desc: "Continuous control to regulators and the board.", tag: "Audit · Line of Sight" },
];

const colorMap: Record<string, { text: string; bg: string; border: string; ring: string }> = {
  sky: { text: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30", ring: "ring-sky-400/40" },
  amber: { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30", ring: "ring-amber-400/40" },
  violet: { text: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/30", ring: "ring-violet-400/40" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30", ring: "ring-emerald-400/40" },
};

const trackIcons = [Radar, Zap, GitBranch, BadgeCheck];

const audiences = [
  "Heads of Safety",
  "Flight Operations",
  "Compliance",
  "Training",
  "Digital & Data Leaders",
];

const SignalsEvent = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "From Signals to Control — The Operational Performance Event";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "An industry event for aviation leaders. Turn 12,000+ monthly operational signals into measurable control across safety, content, and training.",
    );
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.18),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_hsl(var(--background)))]" />
          {/* Signal pulse rings */}
          <div className="absolute right-[-10%] top-[10%] w-[600px] h-[600px] opacity-40 pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: "4s" }} />
            <div className="absolute inset-12 rounded-full border border-sky-400/20 animate-ping" style={{ animationDuration: "5s" }} />
            <div className="absolute inset-24 rounded-full border border-violet-400/20 animate-ping" style={{ animationDuration: "6s" }} />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-24 pb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90 bg-primary/10 border border-primary/30 rounded-full px-3 py-1.5 mb-8">
            <Activity className="h-3.5 w-3.5" />
            The Operational Performance Event
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl">
            From Signals <span className="text-primary">to Control.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Aviation generates more than 12,000 operational signals every month. Most go unheard.
            The leaders of the next decade will be the operators who can detect, act on, and prove
            control over every one that matters.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#register"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-5 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Reserve your seat <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#tracks"
              className="inline-flex items-center gap-2 border border-border bg-card/40 text-foreground rounded-lg px-5 py-3 text-sm font-semibold hover:bg-card/70 transition-colors"
            >
              Request the agenda
            </a>
            <span className="text-xs text-muted-foreground/70 ml-2">
              {"{Event Date}"} · {"{Venue}"}
            </span>
          </div>
        </div>
      </section>

      {/* The Premise */}
      <section className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">The Premise</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 max-w-3xl">
            Every airline has data. Few can act on the signals inside it.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card/40 p-6">
                <div className="font-display text-4xl font-bold text-primary mb-2">{s.value}</div>
                <div className="text-sm font-semibold text-foreground mb-1">{s.label}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Shift */}
      <section className="border-b border-border/60 bg-card/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">The Shift</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 max-w-3xl">
            From event management — to signal management — to control management.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-4">
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-3">Today</div>
              <h3 className="font-display text-xl font-bold mb-3">Event Management</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Reactive — wait for incidents to surface</li>
                <li>• Fragmented across safety, content, training</li>
                <li>• Most signals orphaned, unread, or miscategorised</li>
                <li>• Compliance evidence assembled at audit time</li>
              </ul>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="h-8 w-8 text-primary/50" />
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Tomorrow</div>
              <h3 className="font-display text-xl font-bold mb-3">Signal → Control Management</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Proactive — detect patterns before they become events</li>
                <li>• Unified across the three Systems of Record</li>
                <li>• Every signal classified, routed, and actioned</li>
                <li>• Continuous, provable control — by default</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Category frame */}
      <section className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">The Category</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 max-w-3xl">
            The Operational Performance Platform.
          </h2>
          <p className="text-muted-foreground max-w-3xl mb-10">
            One platform. Three Systems of Record. One operating model — unified by CoAnalyst
            intelligence and the DTOP loop.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {["ContentManager365", "SafetyManager365", "TrainingManager365"].map((m) => (
              <div key={m} className="rounded-lg border border-border bg-card/40 px-5 py-4 text-center">
                <span className="font-display text-lg font-semibold">{m}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card/30 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 text-center">
              The DTOP Operating Model
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {tracks.map((t, i) => {
                const c = colorMap[t.color];
                return (
                  <div key={t.letter} className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 rounded-lg border px-4 py-2 ${c.border} ${c.bg}`}>
                      <span className={`font-display text-2xl font-bold ${c.text}`}>{t.letter}</span>
                      <span className={`text-sm font-semibold ${c.text}`}>{t.name}</span>
                    </div>
                    {i < tracks.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground/40" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="tracks" className="border-b border-border/60 bg-card/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">Event Tracks</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 max-w-3xl">
            Four tracks. One signal, end to end.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((t, i) => {
              const c = colorMap[t.color];
              const Icon = trackIcons[i];
              return (
                <div key={t.letter} className={`rounded-xl border p-6 h-full flex flex-col ${c.border} ${c.bg}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`font-display text-3xl font-bold ${c.text}`}>{t.letter}</span>
                    <Icon className={`h-5 w-5 ${c.text}`} />
                  </div>
                  <h3 className={`font-display text-lg font-bold mb-2 ${c.text}`}>{t.name}</h3>
                  <p className="text-sm text-foreground/80 mb-4 leading-relaxed flex-1">{t.desc}</p>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground/80 font-semibold">
                    {t.tag}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">Who Should Attend</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 max-w-3xl">
            Built for the leaders accountable for operational performance.
          </h2>
          <div className="flex flex-wrap gap-2">
            {audiences.map((a) => (
              <span
                key={a}
                className="rounded-full border border-border bg-card/40 px-4 py-1.5 text-sm text-foreground/90"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section id="register" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--primary)/0.20),_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-24 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            Walk in with a backlog of unread signals.
            <br className="hidden md:block" />
            <span className="text-primary"> Walk out with a model for measurable control.</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:events@comply365.com?subject=From%20Signals%20to%20Control%20%E2%80%94%20Reserve%20a%20seat"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Reserve your seat <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:events@comply365.com?subject=From%20Signals%20to%20Control%20%E2%80%94%20Request%20agenda"
              className="inline-flex items-center gap-2 border border-border bg-card/40 text-foreground rounded-lg px-6 py-3 text-sm font-semibold hover:bg-card/70 transition-colors"
            >
              Request the agenda
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground/70">
            {"{Event Date}"} · {"{Venue}"} · Limited seats
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="font-display text-sm font-bold tracking-tight text-foreground/80">
            Comply365
          </Link>
          <span className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Comply365 · The Operational Performance Platform
          </span>
        </div>
      </footer>
    </div>
  );
};

export default SignalsEvent;