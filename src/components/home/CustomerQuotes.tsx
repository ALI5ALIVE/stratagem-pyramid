import { Quote, ShieldCheck } from "lucide-react";

const QUOTES = [
  {
    quote: "We stopped chasing manuals across PDFs. Revisions now travel with the safety event and the training assignment — in one motion.",
    name: "Director of Compliance",
    company: "Tier-1 European airline",
    initials: "DC",
    metric: "6 weeks → 4 days",
    metricLabel: "Audit prep",
  },
  {
    quote: "CoAnalyst gave us answers our crews trust. Cited from our actual manuals — not the internet.",
    name: "Head of Flight Safety",
    company: "Defense aviation operator",
    initials: "HS",
    metric: "~90%",
    metricLabel: "Domain accuracy",
  },
  {
    quote: "For the first time, the COO sees one operating rhythm — not three teams reporting in three formats.",
    name: "Chief Operating Officer",
    company: "National rail operator",
    initials: "CO",
    metric: "1",
    metricLabel: "Source of truth",
  },
];

export default function CustomerQuotes() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-emerald-400/90">
          <ShieldCheck className="h-3.5 w-3.5" /> Proof
        </div>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
          The people accountable when operations slip — say it works.
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {QUOTES.map((q) => (
            <figure key={q.name} className="rounded-2xl border border-border bg-card p-7 flex flex-col">
              <Quote className="h-5 w-5 text-primary/60" />
              <blockquote className="mt-4 text-sm md:text-base text-foreground leading-relaxed flex-1">
                "{q.quote}"
              </blockquote>
              <div className="mt-6 pt-5 border-t border-border/60 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                  {q.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-foreground truncate">{q.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{q.company}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-base font-bold text-primary">{q.metric}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{q.metricLabel}</div>
                </div>
              </div>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-[11px] text-muted-foreground italic">
          Customer roles and outcomes shown anonymized pending publication consent.
        </p>
      </div>
    </section>
  );
}