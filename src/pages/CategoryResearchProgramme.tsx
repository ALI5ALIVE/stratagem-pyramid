import { Link } from "react-router-dom";
import {
  FlaskConical, Target, GitBranch, Layers, ClipboardList, MessagesSquare,
  Library, LineChart, CalendarClock, ShieldCheck, Package, AlertTriangle, ArrowRight,
  ListChecks, BookOpenCheck,
} from "lucide-react";
import {
  hypotheses, surveyBlocks, quotaMatrix, interviewGuide, secondarySources,
  timelinePhases, deliverables, risks, advisoryPanel,
  surveyQuestions, interviewQuestions,
} from "@/data/categoryResearchProgramme";

const bucketColor: Record<"D" | "T" | "O" | "P", string> = {
  D: "bg-primary/15 text-primary border-primary/30",
  T: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  O: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  P: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

function Section({
  eyebrow, title, sub, icon: Icon, children, alt = false,
}: {
  eyebrow: string; title: string; sub?: string; icon: React.ElementType;
  children: React.ReactNode; alt?: boolean;
}) {
  return (
    <section className={`min-h-screen w-full ${alt ? "bg-card/30" : "bg-background"} px-6 md:px-16 lg:px-24 py-20 md:py-28 flex flex-col`}>
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-primary/80 font-medium">
            <Icon className="h-3.5 w-3.5" /> {eyebrow}
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground max-w-4xl leading-[1.1]">{title}</h2>
        {sub && <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">{sub}</p>}
        <div className="mt-10 md:mt-14 flex-1">{children}</div>
      </div>
    </section>
  );
}

function Chip({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "primary" }) {
  const cls = tone === "primary"
    ? "bg-primary/10 text-primary border-primary/30"
    : "bg-secondary text-muted-foreground border-border";
  return <span className={`inline-flex items-center text-[10px] uppercase tracking-wider font-medium border rounded-full px-2 py-0.5 ${cls}`}>{children}</span>;
}

export default function CategoryResearchProgramme() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="min-h-screen w-full px-6 md:px-16 lg:px-24 py-20 md:py-28 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.12),transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-primary font-medium">
              <FlaskConical className="h-3.5 w-3.5" /> Category research programme
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] max-w-5xl">
            Prove the category exists <span className="text-primary">before</span> we claim leadership of it.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            A mixed-methods research programme — quantitative survey, executive interviews, and secondary synthesis —
            designed to McKinsey / Forrester standards. Output: a thought-leadership report that earns the category, rather than asserts it.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#methodology" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:bg-primary/90 transition">
              See the methodology <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#deliverables" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium hover:border-primary/40 transition">
              See the deliverables
            </a>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { k: "300", v: "Survey completes" },
              { k: "18–24", v: "Exec interviews" },
              { k: "12 wks", v: "Design → publish" },
              { k: "±5.7%", v: "Margin @ 95% CI" },
            ].map((m) => (
              <div key={m.v} className="rounded-xl border border-border bg-card/60 backdrop-blur p-4">
                <div className="text-2xl md:text-3xl font-semibold text-foreground">{m.k}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <Section
        eyebrow="Why this programme exists"
        title="A new category has to be earned with evidence — not declared with a deck."
        sub="Three forces make the difference between a positioning paper that lands and one that's dismissed as vendor marketing."
        icon={Target}
        alt
      >
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "Buyers won't adopt an unnamed problem", d: "If executives can't name it for their CFO, it doesn't get funded. The category must be legible before it's purchasable.", src: "Forrester · Category creation playbook" },
            { t: "Peers validate before vendors persuade", d: "T1 operators move when other T1 operators move. Quantified peer signal is the highest-trust evidence we can produce.", src: "McKinsey · B2B Decision-maker survey" },
            { t: "Analysts gate the language", d: "Gartner, Forrester and IDC will not write about a category they can't independently evidence. The research is the price of entry.", src: "Verdantix · Analyst engagement notes" },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              <div className="mt-4 text-[10px] uppercase tracking-wider text-muted-foreground/70">Source · {c.src}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* HYPOTHESIS TREE */}
      <Section
        eyebrow="Objectives & hypotheses"
        title="One root claim, five testable sub-hypotheses, every one mapped to a method."
        sub="McKinsey-style hypothesis tree. If the data supports the root, the category exists. If it doesn't, we kill or reframe — and we'd rather know now."
        icon={GitBranch}
      >
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
          <div className="text-[10px] uppercase tracking-wider text-primary/80 font-medium">Root claim</div>
          <p className="mt-2 text-lg md:text-xl font-medium text-foreground max-w-4xl leading-snug">
            A new operational-intelligence category is forming at the intersection of compliance, safety and operations —
            and the operators who name it first will define it.
          </p>
        </div>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hypotheses.map((h) => (
            <div key={h.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-primary">{h.id}</span>
                <Chip tone="primary">{h.method}</Chip>
              </div>
              <p className="text-sm font-medium text-foreground leading-snug">{h.claim}</p>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{h.rationale}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TRIANGULATION */}
      <Section
        eyebrow="Methodology"
        title="Triangulated by design — no single method carries the claim alone."
        sub="The defensible category claim sits where quantitative scale, qualitative depth and independent secondary evidence overlap."
        icon={Layers}
        alt
      >
        <div className="grid md:grid-cols-[1fr,1fr] gap-10 items-center" id="methodology">
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <circle cx="150" cy="160" r="120" fill="hsl(var(--primary))" fillOpacity="0.18" stroke="hsl(var(--primary))" strokeOpacity="0.5" />
              <circle cx="250" cy="160" r="120" fill="#f59e0b" fillOpacity="0.18" stroke="#f59e0b" strokeOpacity="0.5" />
              <circle cx="200" cy="260" r="120" fill="#8b5cf6" fillOpacity="0.18" stroke="#8b5cf6" strokeOpacity="0.5" />
              <text x="80" y="120" fill="hsl(var(--foreground))" fontSize="13" fontWeight="600">Quant survey</text>
              <text x="270" y="120" fill="hsl(var(--foreground))" fontSize="13" fontWeight="600">Qual interviews</text>
              <text x="135" y="370" fill="hsl(var(--foreground))" fontSize="13" fontWeight="600">Secondary synthesis</text>
              <text x="200" y="210" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="700">Defensible</text>
              <text x="200" y="225" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="700">category claim</text>
            </svg>
          </div>
          <div className="space-y-4">
            {[
              { t: "Quant survey (n=300)", d: "Sizes the pain and tests preference at statistical power. Answers 'how many, how much, how strong'." },
              { t: "Qual interviews (18–24)", d: "Surfaces language, decision triggers and unspoken procurement reality. Answers 'why and how'." },
              { t: "Secondary synthesis", d: "Anchors the claim in regulator, analyst and operator-filed evidence we did not commission." },
            ].map((b) => (
              <div key={b.t} className="rounded-lg border border-border bg-card p-4">
                <div className="text-sm font-semibold text-foreground">{b.t}</div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* QUANT */}
      <Section
        eyebrow="Quantitative survey"
        title="n=300, eight instrument blocks, anti-bias controls baked in."
        sub="Stratified sample with quotas across region, industry, role and operator tier. Powered for ±5.7% overall and ±9% per industry cut."
        icon={ClipboardList}
      >
        {/* quotas */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            { label: "Region", items: quotaMatrix.regions },
            { label: "Industry", items: quotaMatrix.industries },
            { label: "Role", items: quotaMatrix.roles },
          ].map((g) => (
            <div key={g.label} className="rounded-xl border border-border bg-card p-5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-3">{g.label}</div>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li key={it.name} className="flex items-center justify-between text-sm">
                    <span className="text-foreground/90">{it.name}</span>
                    <span className="text-xs font-mono text-primary">n={it.n}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* instrument */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Block</th>
                <th className="text-left px-4 py-3">Construct measured</th>
                <th className="text-left px-4 py-3">Question type</th>
                <th className="text-left px-4 py-3">Tests</th>
              </tr>
            </thead>
            <tbody>
              {surveyBlocks.map((b) => (
                <tr key={b.block} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{b.block}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.construct}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.qType}</td>
                  <td className="px-4 py-3"><Chip tone="primary">{b.tests}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-card/60 p-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Anti-bias controls.</span> Blinded fieldwork partner · randomised option order ·
            attention checks · neutral category framing · brand mentions held to block 8 only.
          </div>
          <div className="rounded-lg border border-border bg-card/60 p-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Power.</span> n=300 → ±5.7% margin at 95% CI overall;
            ±9% per industry cut. ~18-min median completion, target drop-off &lt;15%.
          </div>
        </div>
      </Section>

      {/* SURVEY QUESTION SET */}
      <Section
        eyebrow="Survey question set"
        title="Every question, every scale, every hypothesis it serves."
        sub="Published in full so the instrument is auditable before fieldwork — and so analysts can challenge it on its merits."
        icon={ListChecks}
      >
        <div className="space-y-6">
          {surveyQuestions.map((b) => (
            <div key={b.block} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border bg-secondary/30">
                <div className="text-sm font-semibold text-foreground">{b.block}</div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{b.intent}</p>
              </div>
              <ul className="divide-y divide-border">
                {b.questions.map((q) => (
                  <li key={q.id} className="px-5 py-4 grid md:grid-cols-12 gap-3 md:gap-6 items-start">
                    <div className="md:col-span-1 text-[11px] font-mono text-primary">{q.id}</div>
                    <div className="md:col-span-7 text-sm text-foreground leading-relaxed">{q.text}</div>
                    <div className="md:col-span-3 text-xs text-muted-foreground leading-relaxed">{q.scale}</div>
                    <div className="md:col-span-1 flex md:justify-end"><Chip tone="primary">{q.maps}</Chip></div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* QUAL */}
      <Section
        eyebrow="Qualitative interviews"
        title="18–24 executive conversations, recruited to avoid the friendly-customer trap."
        sub="60% customer/prospect base, 30% cold via industry associations, 10% lapsed or lost. Coded twice by independent reviewers."
        icon={MessagesSquare}
        alt
      >
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 w-1/4">Section</th>
                <th className="text-left px-4 py-3">Sample probes</th>
                <th className="text-left px-4 py-3 w-24">Tests</th>
              </tr>
            </thead>
            <tbody>
              {interviewGuide.map((s) => (
                <tr key={s.section} className="border-t border-border align-top">
                  <td className="px-4 py-4 font-medium text-foreground">{s.section}</td>
                  <td className="px-4 py-4 text-muted-foreground">
                    <div>“{s.probes[0]}”</div>
                    <div className="mt-1.5">“{s.probes[1]}”</div>
                  </td>
                  <td className="px-4 py-4"><Chip tone="primary">{s.tests}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            { t: "Two-pass coding", d: "Open coding then axial. Inter-rater reliability target κ ≥ 0.7." },
            { t: "Anonymised quote bank", d: "Attribution by role + industry + region only. Operators sign release before publication." },
            { t: "Saturation gate", d: "Stop at the interview where the last two add no new themes, not at a fixed n." },
          ].map((b) => (
            <div key={b.t} className="rounded-lg border border-border bg-card p-4">
              <div className="text-sm font-semibold text-foreground">{b.t}</div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* INTERVIEW DISCUSSION GUIDE */}
      <Section
        eyebrow="Interview discussion guide"
        title="The full 60-minute guide — primary question, probes, and what we're listening for."
        sub="Six sections, ~60 minutes total. Probes are prompts only; interviewers follow the respondent's thread when it surfaces something the guide didn't anticipate."
        icon={BookOpenCheck}
        alt
      >
        <div className="grid md:grid-cols-2 gap-5">
          {interviewQuestions.map((s) => (
            <div key={s.section} className="rounded-xl border border-border bg-card p-5 flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-foreground">{s.section}</div>
                <div className="flex items-center gap-2">
                  <Chip>{s.durationMin} min</Chip>
                  <Chip tone="primary">{s.tests}</Chip>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Primary question</div>
                <p className="text-sm text-foreground leading-relaxed">“{s.primary}”</p>
              </div>
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Probes</div>
                <ul className="space-y-1.5">
                  {s.probes.map((p) => (
                    <li key={p} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary mt-1.5 shrink-0">→</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Listening for</div>
                <div className="flex flex-wrap gap-1.5">
                  {s.listenFors.map((l) => (
                    <Chip key={l}>{l}</Chip>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SECONDARY */}
      <Section
        eyebrow="Secondary & desk research"
        title="Evidence we did not commission — and therefore evidence the market trusts."
        icon={Library}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {secondarySources.map((s) => (
            <div key={s.class} className="rounded-xl border border-border bg-card p-5">
              <div className="text-sm font-semibold text-foreground">{s.class}</div>
              <p className="text-xs text-muted-foreground mt-1">{s.examples}</p>
              <div className="mt-3"><Chip tone="primary">{s.triangulates}</Chip></div>
            </div>
          ))}
        </div>
      </Section>

      {/* ANALYSIS */}
      <Section
        eyebrow="Analysis & synthesis"
        title="An evidence ledger per hypothesis — quant stat, qual quote, secondary source, side by side."
        sub="The synthesis discipline is what separates analyst-grade research from a vendor whitepaper."
        icon={LineChart}
        alt
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: "Evidence ledger", d: "Each hypothesis ships with one quant statistic, one anonymised quote, and one independent source." },
            { t: "Segmentation", d: "Latent-class / k-means on pain + maturity variables. Sizes the addressable category." },
            { t: "Conjoint → WTP", d: "Willingness-to-pay curves for platform vs point-tool bundles." },
            { t: "Maturity index", d: "L1–L5 scoring across 6 dimensions per respondent. Drives the public benchmark." },
            { t: "Category-language test", d: "Preferred label · comprehension lift · purchase-intent delta." },
            { t: "Weighting", d: "Post-stratification weights applied so industry mix matches public operator counts." },
          ].map((b) => (
            <div key={b.t} className="rounded-xl border border-border bg-card p-5">
              <div className="text-sm font-semibold text-foreground">{b.t}</div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TIMELINE */}
      <Section
        eyebrow="Programme timeline · 12 weeks"
        title="Design → fieldwork → analysis → publish."
        sub="Quant and qual run in parallel. Analyst pre-brief sits inside the window, not after publication."
        icon={CalendarClock}
      >
        <div className="relative">
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-5">
            {timelinePhases.map((p) => (
              <div key={p.phase} className="flex gap-5 items-start">
                <div className={`relative z-10 mt-1 flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-bold ${bucketColor[p.bucket]}`}>
                  {p.bucket}
                </div>
                <div className="flex-1 rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-primary">{p.weeks}</span>
                    <span className="text-sm font-semibold text-foreground">{p.phase}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-[10px] uppercase tracking-wider text-muted-foreground/80">
            <span><span className="inline-block w-2 h-2 rounded-full bg-primary mr-1.5" /> D · Design</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1.5" /> T · Fieldwork</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-violet-500 mr-1.5" /> O · Analysis</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5" /> P · Publish</span>
          </div>
        </div>
      </Section>

      {/* GOVERNANCE */}
      <Section
        eyebrow="Governance & quality bar"
        title="Independent advisory panel, ethics-by-design, methodology published with the report."
        sub="This is the section that turns a vendor study into a citable industry reference."
        icon={ShieldCheck}
        alt
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-3">Advisory panel</div>
            <div className="space-y-3">
              {advisoryPanel.map((a) => (
                <div key={a.role} className="rounded-lg border border-border bg-card p-4">
                  <div className="text-sm font-semibold text-foreground">{a.role}</div>
                  <p className="text-xs text-muted-foreground mt-1">{a.purpose}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-3">Quality commitments</div>
            <ul className="space-y-3">
              {[
                "GDPR-compliant, opt-in consent. No PII appears in any published artefact.",
                "Methodology appendix published alongside the report — sampling, instrument, weighting, response rates.",
                "Raw anonymised data retained for 24 months for analyst audit on request.",
                "Pre-registration of hypotheses with the advisory panel before fieldwork opens.",
              ].map((q) => (
                <li key={q} className="flex gap-3 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" /> <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* DELIVERABLES */}
      <Section
        eyebrow="Deliverables"
        title="One report, four artefacts, every one designed to be reused."
        icon={Package}
      >
        <div id="deliverables" className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {deliverables.map((d) => (
            <div key={d.n} className="rounded-xl border border-border bg-card overflow-hidden group hover:border-primary/40 transition">
              <div className="aspect-[4/5] bg-gradient-to-br from-secondary to-card relative flex items-center justify-center p-4">
                <div className="absolute inset-4 rounded-lg border border-border/60 bg-background/40 p-3 flex flex-col">
                  <div className="h-1.5 w-12 bg-primary/60 rounded mb-2" />
                  <div className="h-1 w-20 bg-muted-foreground/30 rounded mb-1" />
                  <div className="h-1 w-16 bg-muted-foreground/30 rounded mb-3" />
                  <div className="space-y-1 flex-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-0.5 bg-muted-foreground/20 rounded" style={{ width: `${60 + ((i * 7) % 35)}%` }} />
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-1">
                    <div className="h-3 bg-primary/30 rounded-sm" />
                    <div className="h-3 bg-amber-500/30 rounded-sm" />
                    <div className="h-3 bg-violet-500/30 rounded-sm" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-[10px] font-mono text-primary">{d.n}</div>
                <div className="text-sm font-semibold text-foreground mt-1">{d.title}</div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{d.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* RISKS */}
      <Section
        eyebrow="Risks & mitigations"
        title="Where this programme could fail — and what we've already done about it."
        icon={AlertTriangle}
      >
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 w-1/3">Risk</th>
                <th className="text-left px-4 py-3">Mitigation</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.risk} className="border-t border-border align-top">
                  <td className="px-4 py-4 font-medium text-foreground">{r.risk}</td>
                  <td className="px-4 py-4 text-muted-foreground">{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* CTA */}
      <section className="min-h-[60vh] w-full px-6 md:px-16 lg:px-24 py-20 flex items-center bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-[11px] uppercase tracking-[0.18em] text-primary font-medium mb-4">Next step</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-[1.1]">
            Approve the brief. Select the fieldwork partner. Kick off Week 1.
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl">
            Twelve weeks from sign-off to a published category report. Six weeks from sign-off to first-cut data your team can already act on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:bg-primary/90 transition">
              Approve the brief <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/positioning-playbook" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium hover:border-primary/40 transition">
              See current positioning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
