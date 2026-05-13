import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Props {
  trigger: ReactNode;
  defaultRole?: string;
}

export default function BookWalkthroughDialog({ trigger, defaultRole = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState(defaultRole);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({ title: "Please enter a valid work email", variant: "destructive" });
      return;
    }
    // In production this would post to an edge function / scheduling provider.
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setSubmitted(false); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle>Walkthrough requested</DialogTitle>
            <p className="text-sm text-muted-foreground">
              A specialist for {role || "your team"} will reach out within one business day.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Book a walkthrough</DialogTitle>
              <DialogDescription>
                A 30-minute working session tailored to your role. No slideware.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3 mt-2">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <input
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="">Your role…</option>
                <option>COO / Operations</option>
                <option>Head of Safety</option>
                <option>Head of Content / Tech Pubs</option>
                <option>Head of Training</option>
                <option>IT / Procurement</option>
              </select>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition"
              >
                Request walkthrough <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-[11px] text-muted-foreground text-center">
                We'll never share your details. Read our privacy policy.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}