import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeepDiveLinkProps {
  to: string;
  label: string;
  /** Where to send the user back. Defaults to current path. */
  returnTo?: string;
  returnLabel?: string;
  className?: string;
}

/**
 * Cross-deck navigation chip. Stores a return path in sessionStorage so the
 * destination deck can render a `← Back` button via <BackToDeckButton />.
 */
const DeepDiveLink = ({
  to,
  label,
  returnTo,
  returnLabel = "Back to Tech Deep Dive",
  className,
}: DeepDiveLinkProps) => {
  const handleClick = () => {
    try {
      const target = returnTo ?? window.location.pathname;
      sessionStorage.setItem(
        "deepDiveReturn",
        JSON.stringify({ path: target, label: returnLabel }),
      );
    } catch {
      /* sessionStorage may be blocked — non-fatal */
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full",
        "border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
        className,
      )}
    >
      Deep dive: {label}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </Link>
  );
};

export default DeepDiveLink;