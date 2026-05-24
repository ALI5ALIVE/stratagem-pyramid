import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, ExternalLink, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  playbookMeta,
  audienceMap,
  thirtySecondPitch,
  category,
  masterNarrative,
  positioningStatement,
  pillars,
  personas,
  pillarPersonaMatrix,
  productStory,
  dtopSteps,
  intelligenceLayer,
  competitiveMatrix,
  objections,
  discoveryByStage,
  emailTemplates,
  demoFlow,
  whoToTarget,
  visionSessionAgenda,
  terminology,
  trustSignals,
  boilerplate,
  roiDisclaimer,
  appendixLinks,
  sections,
} from "@/data/positioningPlaybook";

function CopyBtn({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setDone(true);
        toast({ title: "Copied to clipboard" });
        setTimeout(() => setDone(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition"
    >
      {done ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
      {done ? "Copied" : label}
    </button>
  );
}

function SectionHero({ n, title, kicker, children }: { n: number; title: string; kicker?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 border-b border-border/40 pb-6">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-5xl font-bold text-primary/30 tabular-nums">{String(n).padStart(2, "0")}</span>
        <div>
          {kicker && <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-1">{kicker}</p>}
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
        </div>
      </div>
      {children && <div className="mt-4 max-w-3xl text-sm text-muted-foreground leading-relaxed">{children}</div>}
    </div>
  );
}

export default function PositioningPlaybook() {
  const [activePillar, setActivePillar] = useState<string>(pillars[0].id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-4 w-4" /> Command Centre
          </Link>
          <div className="hidden md:flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-primary font-medium">
              <Sparkles className="h-3 w-3" /> v{playbookMeta.version} · {playbookMeta.updated}
            </span>
            <span>{playbookMeta.owners}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <main className="min-w-0 space-y-24">
          {/* HERO */}
          <section className="border-b border-border/40 pb-16">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">Positioning & Messaging Playbook</p>
            <h1 className="font-display text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
              From event to control.<br />
              <span className="text-primary">On one platform.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed">
              The canonical positioning, messaging, competitive frame and field kit for Comply365. Built for the whole GTM org. Designed to be quoted, copied and shipped.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <CopyBtn text={thirtySecondPitch} label="Copy 30-sec pitch" />
              <a href="#narrative" className="text-xs text-primary hover:underline">Jump to master narrative →</a>
            </div>
          </section>

          {/* 1 USE */}
          <section id="use">
            <SectionHero n={1} title="How to use this playbook" kicker="Start here">
              This is an additive, canonical reference. Existing playbooks remain the source for deep-dive product, persona and ROI material — this asset gives the GTM org a single place for the story, the language, and the field kit.
            </SectionHero>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {audienceMap.map((a) => (
                <div key={a.role} className="rounded-xl border border-border/50 bg-card/40 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-2">{a.role}</p>
                  <p className="text-sm text-foreground/85 leading-relaxed">{a.grab}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-2">30-second pitch</p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{thirtySecondPitch}</p>
                </div>
                <CopyBtn text={thirtySecondPitch} />
              </div>
            </div>
          </section>

          {/* 2 CATEGORY */}
          <section id="category">
            <SectionHero n={2} title="Category & POV" kicker="What we stand for">
              We are not selling a tool. We are creating — and naming — a category.
            </SectionHero>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-xl border border-border/50 bg-card/40 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Category</p>
                <p className="font-display text-xl font-semibold text-foreground">{category.name}</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card/40 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">The enemy</p>
                <p className="text-sm text-foreground/85 leading-relaxed">{category.enemy}</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card/40 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">The shift</p>
                <p className="text-sm text-foreground/85 leading-relaxed">{category.shift}</p>
              </div>
            </div>
            <div className="mt-8 rounded-xl border border-border/50 bg-gradient-to-br from-card/60 to-card/20 p-8">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-4">Manifesto</p>
              <ul className="space-y-3">
                {category.manifesto.map((line, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-foreground/90 leading-relaxed font-display">
                    <span className="text-primary/60 tabular-nums text-sm mt-1">{String(i + 1).padStart(2, "0")}</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3 NARRATIVE */}
          <section id="narrative">
            <SectionHero n={3} title="Master narrative" kicker="The story" />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-destructive mb-2">Today</p>
                <p className="text-sm text-foreground/85 leading-relaxed">{masterNarrative.today}</p>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 mb-2">Tomorrow</p>
                <p className="text-sm text-foreground/85 leading-relaxed">{masterNarrative.tomorrow}</p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-primary/40 bg-primary/5 p-8 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-3">Master message</p>
              <p className="font-display text-2xl lg:text-3xl font-semibold text-foreground leading-tight">{masterNarrative.masterMessage}</p>
              <div className="mt-4 flex justify-center"><CopyBtn text={masterNarrative.masterMessage} /></div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                { label: "30-second version", text: masterNarrative.versions.thirty },
                { label: "2-minute version", text: masterNarrative.versions.two },
                { label: "One paragraph (boilerplate)", text: masterNarrative.oneParagraph },
              ].map((v) => (
                <div key={v.label} className="rounded-xl border border-border/50 bg-card/40 p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">{v.label}</p>
                    <CopyBtn text={v.text} />
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">{v.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4 POSITIONING */}
          <section id="positioning">
            <SectionHero n={4} title="Positioning architecture" kicker="The statement" />
            <div className="rounded-xl border border-border/50 bg-card/40 p-8 space-y-4 font-display text-lg leading-relaxed">
              {[
                ["For", positioningStatement.forWho],
                ["Who", positioningStatement.who],
                ["The category", positioningStatement.category],
                ["Benefit", positioningStatement.benefit],
                ["Unlike", positioningStatement.unlike],
                ["Proof", positioningStatement.proof],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-4 items-start border-b border-border/30 pb-3 last:border-0 last:pb-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary mt-2">{k}</span>
                  <span className="text-foreground/90">{v}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 5 PILLARS × PERSONAS */}
          <section id="pillars">
            <SectionHero n={5} title="Messaging pillars × personas" kicker="Pick the cell">
              Four pillars by five personas. Every cell is a one-liner you can drop into an email, slide or call.
            </SectionHero>

            <div className="flex flex-wrap gap-2 mb-6">
              {pillars.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePillar(p.id)}
                  className={`rounded-md px-4 py-2 text-xs font-medium transition border ${
                    activePillar === p.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card/40 text-muted-foreground border-border/50 hover:text-foreground"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {pillars.filter((p) => p.id === activePillar).map((p) => (
              <div key={p.id}>
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 mb-6">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-2">{p.name}</p>
                  <p className="font-display text-xl font-semibold text-foreground mb-2">{p.one}</p>
                  <p className="text-sm text-muted-foreground">{p.why}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                  {personas.map((persona) => {
                    const cell = pillarPersonaMatrix[p.id][persona.id];
                    return (
                      <div key={persona.id} className="rounded-xl border border-border/50 bg-card/40 p-5 flex flex-col">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">{persona.short}</p>
                        <p className="text-[10px] text-muted-foreground mb-3">{persona.title}</p>
                        <p className="text-sm text-foreground/90 leading-snug mb-3 flex-1">{cell.line}</p>
                        <p className="text-[11px] text-muted-foreground italic border-t border-border/30 pt-2">{cell.proof}</p>
                        <div className="mt-3"><CopyBtn text={`${cell.line} — ${cell.proof}`} /></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>

          {/* 6 PRODUCT */}
          <section id="product">
            <SectionHero n={6} title="Platform & product story" kicker="What we sell" />
            <div className="space-y-4">
              {productStory.map((p) => (
                <div key={p.name} className="rounded-xl border border-border/50 bg-card/40 p-6 grid gap-4 md:grid-cols-[200px_1fr_auto] items-start">
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground">{p.name}</p>
                    <p className="text-[11px] text-primary mt-1 italic">"{p.line}"</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-foreground/85"><span className="text-[10px] uppercase tracking-wider text-muted-foreground mr-2">What</span>{p.what}</p>
                    <p className="text-sm text-foreground/85"><span className="text-[10px] uppercase tracking-wider text-muted-foreground mr-2">Why</span>{p.why}</p>
                  </div>
                  <Link to={p.link} className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline whitespace-nowrap">
                    Deep-dive <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* 7 DTOP */}
          <section id="dtop">
            <SectionHero n={7} title="The DTOP operating model" kicker="The loop">
              One operating model the whole business can run on. Use this frame whenever you need to show the closed loop from event to control.
            </SectionHero>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {dtopSteps.map((s) => (
                <div key={s.letter} className={`rounded-xl border ${s.color} p-6`}>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className={`font-display text-5xl font-bold ${s.color.split(" ")[0]}`}>{s.letter}</span>
                    <span className="font-display text-lg font-semibold text-foreground">{s.name}</span>
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 8 INTELLIGENCE */}
          <section id="intelligence">
            <SectionHero n={8} title="Intelligence Layer positioning" kicker="The moat" />
            <div className="rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent p-8 mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-3">Headline</p>
              <p className="font-display text-3xl lg:text-4xl font-semibold text-foreground leading-tight">{intelligenceLayer.headline}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border/50 bg-card/40 p-6 md:col-span-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-3">Why defensible</p>
                <ul className="space-y-2 text-sm text-foreground/85">
                  {intelligenceLayer.whyDefensible.map((d, i) => (
                    <li key={i} className="flex gap-2"><span className="text-primary">·</span>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 mb-3">Say</p>
                <ul className="space-y-1.5 text-sm text-foreground/85">
                  {intelligenceLayer.say.map((s) => <li key={s}>✓ {s}</li>)}
                </ul>
              </div>
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-destructive mb-3">Never say</p>
                <ul className="space-y-1.5 text-sm text-foreground/85">
                  {intelligenceLayer.neverSay.map((s) => <li key={s}>✕ {s}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* 9 COMPETITIVE */}
          <section id="competitive">
            <SectionHero n={9} title="Competitive frame" kicker="Win themes" />
            <div className="space-y-4">
              {competitiveMatrix.map((c) => (
                <div key={c.competitor} className="rounded-xl border border-border/50 bg-card/40 p-6 grid gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Vs</p>
                    <p className="font-display text-base font-semibold text-foreground">{c.competitor}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Their pitch</p>
                    <p className="text-sm text-foreground/80">{c.theirPitch}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">Our win</p>
                    <p className="text-sm text-foreground/90">{c.ourWin}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-1">Trap question</p>
                    <p className="text-sm text-foreground/90 italic">"{c.trapQ}"</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 10 OBJECTIONS */}
          <section id="objections">
            <SectionHero n={10} title="Top 12 objections" kicker="Reframe → proof → close" />
            <div className="grid gap-4 md:grid-cols-2">
              {objections.map((o, i) => (
                <div key={i} className="rounded-xl border border-border/50 bg-card/40 p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="font-display text-sm font-semibold text-foreground leading-snug">"{o.q}"</p>
                    <span className="text-[10px] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="space-y-2 text-[12px]">
                    <p><span className="text-[10px] uppercase tracking-wider text-primary mr-2">Reframe</span><span className="text-foreground/85">{o.r}</span></p>
                    <p><span className="text-[10px] uppercase tracking-wider text-emerald-400 mr-2">Proof</span><span className="text-foreground/85">{o.p}</span></p>
                    <p><span className="text-[10px] uppercase tracking-wider text-amber-400 mr-2">Close</span><span className="text-foreground/85">{o.c}</span></p>
                  </div>
                  <div className="mt-3"><CopyBtn text={`Q: ${o.q}\nReframe: ${o.r}\nProof: ${o.p}\nClose: ${o.c}`} /></div>
                </div>
              ))}
            </div>
          </section>

          {/* 11 SALES KIT */}
          <section id="saleskit">
            <SectionHero n={11} title="Sales kit" kicker="Field-ready" />

            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Who to target</h3>
            <div className="grid gap-4 md:grid-cols-3 mb-10">
              {whoToTarget.map((t) => (
                <div key={t.tier} className="rounded-xl border border-border/50 bg-card/40 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-2">{t.tier}</p>
                  <p className="text-sm text-foreground/90 mb-2 font-medium">{t.who}</p>
                  <p className="text-[12px] text-muted-foreground mb-3">{t.why}</p>
                  <p className="text-[12px] text-emerald-400">→ {t.action}</p>
                </div>
              ))}
            </div>

            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Discovery question bank</h3>
            <div className="space-y-3 mb-10">
              {Object.entries(discoveryByStage).map(([stage, qs]) => (
                <div key={stage} className="rounded-xl border border-border/50 bg-card/40 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-3">{stage}</p>
                  <ul className="space-y-2 text-sm text-foreground/85">
                    {qs.map((q, i) => <li key={i} className="flex gap-2"><span className="text-primary/60">·</span>{q}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Email templates</h3>
            <div className="space-y-4 mb-10">
              {emailTemplates.map((e) => (
                <div key={e.name} className="rounded-xl border border-border/50 bg-card/40 p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">{e.name}</p>
                      <p className="text-sm font-medium text-foreground">Subject: {e.subject}</p>
                    </div>
                    <CopyBtn text={`Subject: ${e.subject}\n\n${e.body}`} />
                  </div>
                  <pre className="whitespace-pre-wrap text-[13px] text-foreground/85 font-sans leading-relaxed border-t border-border/30 pt-3 mt-3">{e.body}</pre>
                </div>
              ))}
            </div>

            <h3 className="font-display text-lg font-semibold text-foreground mb-4">50-minute demo flow</h3>
            <div className="rounded-xl border border-border/50 bg-card/40 overflow-hidden mb-10">
              {demoFlow.map((d, i) => (
                <div key={d.step} className={`grid grid-cols-[60px_140px_1fr_80px] gap-4 p-4 items-center ${i < demoFlow.length - 1 ? "border-b border-border/30" : ""}`}>
                  <span className="font-display text-2xl text-primary/40 tabular-nums">{String(d.step).padStart(2, "0")}</span>
                  <span className="font-medium text-foreground text-sm">{d.title}</span>
                  <span className="text-sm text-muted-foreground">{d.what}</span>
                  <span className="text-[11px] text-primary text-right">{d.time}</span>
                </div>
              ))}
            </div>

            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Strategy & Vision session — 3-hour agenda</h3>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <p className="text-sm text-foreground/85 mb-4">Complimentary, on-site or virtual. Fixed 3-hour agenda — your educational entry point with prospects and customers.</p>
              <div className="space-y-2">
                {visionSessionAgenda.map((a) => (
                  <div key={a.time} className="grid grid-cols-[80px_1fr] gap-4 text-sm border-b border-border/30 pb-2 last:border-0">
                    <span className="text-primary tabular-nums">{a.time}</span>
                    <span className="text-foreground/90">{a.item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 12 BRAND */}
          <section id="brand">
            <SectionHero n={12} title="Brand & terminology rules" kicker="How we talk" />
            <div className="grid gap-4 md:grid-cols-2 mb-8">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 mb-4">Approved</p>
                <ul className="space-y-3">
                  {terminology.approved.map((t) => (
                    <li key={t.term} className="text-sm">
                      <p className="font-medium text-foreground">{t.term}</p>
                      <p className="text-[12px] text-muted-foreground">{t.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-destructive mb-4">Forbidden</p>
                <ul className="space-y-3">
                  {terminology.forbidden.map((t) => (
                    <li key={t.term} className="text-sm">
                      <p className="font-medium text-foreground line-through decoration-destructive/50">{t.term}</p>
                      <p className="text-[12px] text-muted-foreground">{t.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Trust signals</h3>
            <div className="rounded-xl border border-border/50 bg-card/40 p-6 mb-8">
              <ul className="space-y-2 text-sm text-foreground/85">
                {trustSignals.map((s, i) => <li key={i} className="flex gap-2"><span className="text-primary">·</span>{s}</li>)}
              </ul>
            </div>

            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Boilerplate</h3>
            <div className="space-y-4 mb-8">
              {(["short", "medium", "long"] as const).map((k) => (
                <div key={k} className="rounded-xl border border-border/50 bg-card/40 p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">{k} version</p>
                    <CopyBtn text={boilerplate[k]} />
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed">{boilerplate[k]}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-2">ROI disclaimer (use when modelling)</p>
              <p className="text-sm text-foreground/85 leading-relaxed">{roiDisclaimer}</p>
              <div className="mt-3"><CopyBtn text={roiDisclaimer} /></div>
            </div>
          </section>

          {/* APPENDIX */}
          <section id="appendix">
            <SectionHero n={13} title="Appendix" kicker="Where this came from">
              This playbook consolidates the strategic story. Use the deep-dive playbooks below for product, persona, technical and ROI material.
            </SectionHero>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {appendixLinks.map((l) => (
                <Link key={l.href} to={l.href} className="rounded-xl border border-border/50 bg-card/40 p-4 flex items-center justify-between text-sm hover:border-primary/40 transition">
                  <span className="text-foreground/90">{l.label}</span>
                  <ExternalLink className="h-4 w-4 text-primary" />
                </Link>
              ))}
            </div>
            <div className="mt-10 pt-6 border-t border-border/40 text-[11px] text-muted-foreground flex justify-between">
              <span>Comply365 Positioning & Messaging Playbook · v{playbookMeta.version}</span>
              <span>Updated {playbookMeta.updated} · {playbookMeta.owners}</span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
