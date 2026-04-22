import { useState } from "react";
import { CheckCircle2, Trash2, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SlideComment } from "@/hooks/useSlideComments";

interface Props {
  comments: SlideComment[];
  currentUserId: string;
  onReply: (body: string, parentId: string) => Promise<void>;
  onResolve: (id: string, resolved: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

const CommentThread = ({ comments, currentUserId, onReply, onResolve, onDelete }: Props) => {
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [saving, setSaving] = useState(false);

  const roots = comments.filter((c) => !c.parent_id);
  const repliesOf = (id: string) => comments.filter((c) => c.parent_id === id);

  const submitReply = async (parentId: string) => {
    if (!replyBody.trim()) return;
    setSaving(true);
    try {
      await onReply(replyBody, parentId);
      setReplyBody("");
      setReplyTo(null);
    } finally { setSaving(false); }
  };

  const renderComment = (c: SlideComment, isReply = false) => (
    <div key={c.id} className={cn("group", isReply && "ml-6 pl-3 border-l border-border")}>
      <div className={cn("rounded-lg p-3 bg-muted/40", c.resolved && "opacity-60")}>
        <div className="flex items-start gap-2">
          <span className="w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center text-white shrink-0"
            style={{ background: c.profile?.avatar_color ?? "#0066FF" }}>
            {(c.profile?.display_name ?? "?").charAt(0).toUpperCase()}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-foreground">{c.profile?.display_name ?? "Reviewer"}</span>
              <span className="text-muted-foreground">{formatTime(c.created_at)}</span>
              {c.resolved && <span className="text-emerald-500 text-[10px] font-semibold">RESOLVED</span>}
            </div>
            <p className="text-sm text-foreground/90 mt-1 whitespace-pre-wrap break-words">{c.body}</p>
            <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {!isReply && (
                <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px]"
                  onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}>
                  <Reply className="h-3 w-3 mr-1" /> Reply
                </Button>
              )}
              {!isReply && (
                <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px]"
                  onClick={() => onResolve(c.id, !c.resolved)}>
                  <CheckCircle2 className="h-3 w-3 mr-1" /> {c.resolved ? "Reopen" : "Resolve"}
                </Button>
              )}
              {c.user_id === currentUserId && (
                <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px] text-destructive"
                  onClick={() => onDelete(c.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {repliesOf(c.id).map((r) => renderComment(r, true))}
      {replyTo === c.id && (
        <div className="ml-6 mt-2 space-y-2">
          <Textarea value={replyBody} onChange={(e) => setReplyBody(e.target.value)}
            placeholder="Reply…" maxLength={2000} className="text-sm min-h-[60px]" />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => submitReply(c.id)} disabled={saving || !replyBody.trim()}>Post reply</Button>
            <Button size="sm" variant="ghost" onClick={() => { setReplyTo(null); setReplyBody(""); }}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );

  if (roots.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-6">No comments yet. Be the first to leave feedback.</p>;
  }

  return <div className="space-y-3">{roots.map((c) => renderComment(c))}</div>;
};

export default CommentThread;