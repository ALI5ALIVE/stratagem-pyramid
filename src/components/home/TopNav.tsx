import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Platform", href: "/platform-playbook" },
  { label: "Solutions", href: "/solutions/airlines" },
  { label: "Customers", href: "/customer-overview" },
  { label: "Resources", href: "/sales-enablement" },
  { label: "Pricing", href: "#pricing" },
];

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-12">
        <Link to="/operational-platform" className="font-display text-lg font-semibold tracking-tight text-foreground">
          Comply<span className="text-primary">365</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <a href="#book">Book a working session</a>
        </Button>
      </div>
    </header>
  );
}