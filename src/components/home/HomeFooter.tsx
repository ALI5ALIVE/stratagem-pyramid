import { Link } from "react-router-dom";
import logo from "@/assets/comply365-logo-white.png";

const COLS = [
  {
    title: "Platform",
    links: [
      { label: "Overview", to: "/platform" },
      { label: "ContentManager365", to: "/platform#platform" },
      { label: "SafetyManager365", to: "/platform#platform" },
      { label: "TrainingManager365", to: "/platform#platform" },
      { label: "System of Intelligence", to: "/platform#intelligence" },
      { label: "DTOP operating model", to: "/platform#dtop" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Airlines", to: "/solutions/airlines" },
      { label: "Defense", to: "/solutions/defense" },
      { label: "Rail", to: "/solutions/rail" },
      { label: "Line of sight", to: "/line-of-sight" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security", to: "/platform#security" },
      { label: "Compliance", to: "/platform#security" },
      { label: "Integrations", to: "/platform#integrations" },
      { label: "Status", to: "/platform" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/" },
      { label: "Customers", to: "/" },
      { label: "Contact", to: "/" },
      { label: "Privacy", to: "/" },
    ],
  },
];

export default function HomeFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <img src={logo} alt="Comply365" className="h-7" />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              The Operational Performance Platform. Connecting Content, Safety and Training for mission-critical operators.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.22em] text-foreground font-semibold">{col.title}</div>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Comply365. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>SOC 2 · ISO 27001 · GDPR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}