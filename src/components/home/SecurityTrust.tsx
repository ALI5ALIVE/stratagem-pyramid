import { ShieldCheck, Lock, Globe, Server, KeyRound } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "SOC 2" },
  { icon: Lock, label: "ISO 27001" },
  { icon: Globe, label: "Regional data residency" },
  { icon: Server, label: "Tenant isolation" },
  { icon: KeyRound, label: "SSO / SAML" },
];

export default function SecurityTrust() {
  return (
    <section className="border-b border-border/40 bg-background/60 py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Security & trust</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
            Tenant-isolated by design, integrated with your IdP, deployable to your region.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/40 px-4 py-3"
            >
              <b.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}