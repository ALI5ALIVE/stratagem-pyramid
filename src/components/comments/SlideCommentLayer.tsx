import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, LogIn } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useSlideComments } from "@/hooks/useSlideComments";
import CommentThread from "./CommentThread";
import { cn } from "@/lib/utils";

interface Props {
  deckId: string;
  slideId: string;
  variant?: "dark" | "light";
}

const SlideCommentLayer = ({ deckId, slideId, variant = "dark" }: Props) => {
  const { user, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);

  const { comments, addComment, editComment, toggleResolved, deleteComment } = useSlideComments(deckId, slideId);

  const total = comments.length;
  const unresolved = comments.filter((c) => !c.parent_id && !c.resolved).length;

  const handlePost = async () => {
    if (!user || !body.trim()) return;
    setPosting(true);
    try { await addComment(user.id, body); setBody(""); }
    catch (e) { console.error(e); }
    finally { setPosting(false); }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "absolute top-6 right-20 sm:top-8 sm:right-24 z-30 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 backdrop-blur-md border transition-all hover:scale-105",
          variant === "light"
            ? "bg-white/80 border-border text-foreground"
            : "bg-background/60 border-border text-foreground"
        )}
        aria-label="Open comments"
      >
        <MessageSquare className="h-3.5 w-3.5" />
        {total > 0 && (
          <span className={cn("text-[10px] font-bold leading-none",
            unresolved > 0 ? "text-primary" : "text-muted-foreground")}>
            {total}
          </span>
        )}
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[400px] sm:max-w-[400px] flex flex-col p-0">
          <SheetHeader className="px-5 py-4 border-b border-border">
            <SheetTitle className="text-base">Slide comments</SheetTitle>
            <p className="text-[11px] text-muted-foreground font-mono">{deckId} / {slideId}</p>
          </SheetHeader>

          {!user ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <LogIn className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Sign in to leave comments.</p>
              <Button asChild size="sm"><Link to="/auth">Sign in</Link></Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <CommentThread
                  comments={comments}
                  currentUserId={user.id}
                  onReply={(b, parentId) => addComment(user.id, b, parentId)}
                  onEdit={editComment}
                  onResolve={toggleResolved}
                  onDelete={deleteComment}
                />
              </div>
              <div className="border-t border-border px-5 py-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center text-white shrink-0"
                    style={{ background: profile?.avatar_color ?? "#0066FF" }}>
                    {(profile?.display_name ?? "?").charAt(0).toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">{profile?.display_name ?? user.email}</span>
                </div>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)}
                  placeholder="Add a comment…" maxLength={2000}
                  className="text-sm min-h-[70px]" />
                <Button size="sm" className="w-full" onClick={handlePost} disabled={posting || !body.trim()}>
                  Post comment
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SlideCommentLayer;
