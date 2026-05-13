import { Workflow, ArrowRight } from "lucide-react";

const STEPS = [
  { letter: "D", name: "Detect", color: "blue", line: "Surface the signal in operational data.", example: "Crew report flags a procedure deviation." },
  { letter: "T", name: "Trigger", color: "amber", line: "Decide it matters. Route to the right owner.", example: "Auto-routed to Safety + Tech Pubs." },
  { letter: "O", name: "Orchestrate", color: "violet", line: "Coordinate the response across systems.", example: "Manual revision + recurrent training assigned." },
  { letter: "P", name: "Prove", color: "emerald", line: "Close the loop with evidence.", example: "Audit trail filed, KPI back on target." },
];

const colorMap: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  blue: { border: "border-blue-500/40", bg: "bg-blue-500/10", text: "text-blue-300", dot: "bg-blue-500" },
  amber: { border: "border-amber-500/40", bg: "bg-amber-500/10", text: "text-amber-300", dot: "bg-amber-500" },
  violet: { border: "border-violet-500/40", bg: "bg-violet-500/10", text: "text-violet-300", dot: "bg-violet-500" },
  emerald: { border: "border-emerald-500/40", bg: "bg-emerald-500/10", text: "text-emerald-300", dot: "bg-emerald-500" },
};

export default function AnimatedDTOP() {
  return (
    <section className="border-b border-border/60 bg-card/20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Workflow className="h-3.5 w-3.5" /> The operating model
        </div>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
          DTOP turns events into control.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Every signal travels the same path — here's what that looks like for the people running it.
        </p>

        {/* Animated pipeline */}
        <div className="mt-12 relative">
          <div className="hidden md:block absolute top-7 left-[8%] right-[8%] h-px bg-border" />
          <div
            className="hidden md:block absolute top-[26px] left-[8%] h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]"
            style={{
              animation: "dtop-travel 4s ease-in-out infinite",
            }}
          />
          <style>{`
            @keyframes dtop-travel {
              0% { left: 8%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { left: 92%; opacity: 0; }
            }
            @media (prefers-reduced-motion: reduce) {
              [data-dtop-travel] { animation: none !important; opacity: 0 !important; }
            }
          `}</style>

          <div className="grid md:grid-cols-4 gap-4 md:gap-2">
            {STEPS.map((s, i) => {
              const c = colorMap[s.color];
              return (
                <div key={s.letter} className="relative">
                  <div className={`relative z-10 mx-auto h-14 w-14 rounded-full border-2 ${c.border} ${c.bg} flex items-center justify-center font-display text-xl font-bold ${c.text} bg-background`}>
                    {s.letter}
                  </div>
                  <div className="mt-4 text-center">
                    <div className="font-display text-base font-semibold text-foreground">{s.name}</div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.line}</p>
                    <p className={`mt-3 text-[11px] italic ${c.text}`}>{s.example}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ArrowRight className="md:hidden mx-auto mt-3 h-4 w-4 text-muted-foreground/40" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}