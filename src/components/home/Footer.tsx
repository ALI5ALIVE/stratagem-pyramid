import { Link } from "react-router-dom";

const COLS = [
  {
    title: "Platform",
    links: [
      { label: "DTOP", href: "/dtop-playbook" },
      { label: "CoAnalyst", href: "/coanalyst" },
      { label: "Mobile", href: "/mobile-playbook" },
      { label: "Regulation Management", href: "/regulation-management" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Airlines", href: "/solutions/airlines" },
      { label: "Defense", href: "/solutions/defense" },
      { label: "Rail", href: "/solutions/rail" },
    ],
  },
  {
    title: "Customers",
    links: [
      { label: "Customer overview", href: "/customer-overview" },
      { label: "Line of Sight", href: "/line-of-sight" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-background py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="font-display text-lg font-semibold tracking-tight text-foreground">
              Comply<span className="text-primary">365</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              The Operational Performance Platform. Detect → Trigger → Orchestrate → Prove.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{c.title}</div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-sm text-foreground/80 transition hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/40 pt-6 text-xs text-muted-foreground lg:flex-row lg:items-center">
          <div>(c) {new Date().getFullYear()} Comply365. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>SOC 2</span>
            <span>ISO 27001</span>
            <span>SSO / SAML</span>
            <span>Tenant isolation</span>
            <a href="#" className="hover:text-foreground">Status</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}