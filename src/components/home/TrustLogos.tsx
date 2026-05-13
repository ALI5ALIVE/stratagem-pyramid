const LOGOS = [
  "Qantas",
  "Royal Air Force",
  "Ministry of Defence",
  "British Airways",
  "Delta",
  "JetBlue",
  "Lufthansa Technik",
];

const METRICS = [
  { value: "550+", label: "Customers" },
  { value: "~2.5M", label: "Users" },
  { value: "6", label: "Continents" },
];

/**
 * Stylized greyscale wordmark logos. Real SVG marks should replace these
 * once licensing is confirmed; this component intentionally uses serif/sans
 * variants per brand to read as a real logo wall, not text in boxes.
 */
export default function TrustLogos() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Trusted by operators of mission-critical fleets
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            {METRICS.map((m, i) => (
              <div key={m.label} className="flex items-center gap-2">
                {i > 0 && <span className="opacity-30">·</span>}
                <span className="font-display text-foreground font-semibold">{m.value}</span>
                <span className="uppercase tracking-[0.18em]">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-8 gap-y-6 items-center">
          {LOGOS.map((name) => (
            <div
              key={name}
              className="text-center font-display text-base md:text-lg font-semibold tracking-tight text-muted-foreground/70 hover:text-foreground transition-colors grayscale opacity-80 hover:opacity-100"
              style={{ fontFamily: name === "Royal Air Force" || name === "Ministry of Defence" ? "Georgia, serif" : undefined }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}