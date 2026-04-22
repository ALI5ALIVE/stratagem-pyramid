import { useState } from "react";
import { Check, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ApprovalStatus, SlideApproval } from "@/hooks/useSlideApproval";

interface Props {
  myApproval: SlideApproval | null;
  approvals: SlideApproval[];
  onSetStatus: (status: ApprovalStatus, note?: string) => Promise<void>;
}

const ApprovalControl = ({ myApproval, approvals, onSetStatus }: Props) => {
  const [note, setNote] = useState(myApproval?.note ?? "");
  const [saving, setSaving] = useState(false);

  const handleSet = async (status: ApprovalStatus) => {
    setSaving(true);
    try { await onSetStatus(status, note.trim() || undefined); } finally { setSaving(false); }
  };

  const current = myApproval?.status ?? "pending";
  const counts = {
    approved: approvals.filter((a) => a.status === "approved").length,
    changes_requested: approvals.filter((a) => a.status === "changes_requested").length,
    pending: approvals.filter((a) => a.status === "pending").length,
  };

  return (
    <div className="space-y-3 border-t border-border pt-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your approval</div>
      <div className="grid grid-cols-3 gap-1.5">
        <Button size="sm" variant={current === "approved" ? "default" : "outline"} disabled={saving}
          onClick={() => handleSet("approved")}
          className={cn(current === "approved" && "bg-emerald-600 hover:bg-emerald-700")}>
          <Check className="h-3.5 w-3.5 mr-1" /> Approve
        </Button>
        <Button size="sm" variant={current === "changes_requested" ? "default" : "outline"} disabled={saving}
          onClick={() => handleSet("changes_requested")}
          className={cn(current === "changes_requested" && "bg-amber-600 hover:bg-amber-700")}>
          <X className="h-3.5 w-3.5 mr-1" /> Changes
        </Button>
        <Button size="sm" variant={current === "pending" ? "default" : "outline"} disabled={saving}
          onClick={() => handleSet("pending")}>
          <Clock className="h-3.5 w-3.5 mr-1" /> Pending
        </Button>
      </div>
      <Textarea value={note} onChange={(e) => setNote(e.target.value)}
        placeholder="Optional note for your decision…" maxLength={500}
        className="text-xs min-h-[60px]" />
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Reviewers:</span>
        {approvals.length === 0 && <span className="text-xs text-muted-foreground">No reviews yet</span>}
        {approvals.map((a) => (
          <div key={a.id} className="flex items-center gap-1" title={`${a.profile?.display_name ?? "Reviewer"} — ${a.status}`}>
            <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
              style={{ background: a.profile?.avatar_color ?? "#0066FF" }}>
              {(a.profile?.display_name ?? "?").charAt(0).toUpperCase()}
            </span>
            <span className={cn("text-[10px] font-semibold",
              a.status === "approved" && "text-emerald-500",
              a.status === "changes_requested" && "text-amber-500",
              a.status === "pending" && "text-muted-foreground"
            )}>
              {a.status === "approved" ? "✓" : a.status === "changes_requested" ? "✗" : "•"}
            </span>
          </div>
        ))}
        <span className="ml-auto text-[10px] text-muted-foreground">
          {counts.approved}✓ {counts.changes_requested}✗ {counts.pending}•
        </span>
      </div>
    </div>
  );
};

export default ApprovalControl;