import { ReactNode, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

const STORAGE_KEY = "lovable_gate_unlocked";
const PASSWORD = "comply2025";

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === PASSWORD) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* non-fatal */
      }
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-lg"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary mb-4">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">
          Restricted preview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter the access password to view this page.
        </p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(false);
          }}
          placeholder="Password"
          className="mt-5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {error && (
          <p className="text-xs text-destructive mt-2">Incorrect password.</p>
        )}
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          Unlock
        </button>
        <Link
          to="/"
          className="block text-center text-xs text-muted-foreground hover:text-foreground mt-4"
        >
          Back to home
        </Link>
      </form>
    </div>
  );
}