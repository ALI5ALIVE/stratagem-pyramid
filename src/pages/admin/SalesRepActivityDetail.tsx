import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldAlert } from "lucide-react";

type Detail = {
  page_views: Array<{ id: string; route: string; deck_id: string | null; viewed_at: string; duration_ms: number | null }>;
  deck_counts: Array<{ deck_id: string; count: number }>;
  attempts: Array<{ module_id: string; score: number; passed: boolean; completed_at: string; correct_count: number; total_questions: number }>;
  comments: Array<{ id: string; deck_id: string; slide_id: string; body: string; created_at: string; resolved: boolean }>;
};

function fmtDateTime(ts: string) {
  return new Date(ts).toLocaleString();
}

export default function SalesRepActivityDetail() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<{ display_name: string; avatar_color: string } | null>(null);
  const [data, setData] = useState<Detail | null>(null);

  useEffect(() => {
    if (!user || !userId) return;
    (async () => {
      const { data: r } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "owner");
      const owner = (r ?? []).length > 0;
      setIsOwner(owner);
      if (!owner) return;
      const [{ data: prof }, { data: detail }] = await Promise.all([
        supabase.from("profiles").select("display_name, avatar_color").eq("id", userId).maybeSingle(),
        supabase.rpc("get_user_activity_detail", { _user_id: userId }),
      ]);
      if (prof) setProfile(prof as any);
      const row = Array.isArray(detail) ? detail[0] : detail;
      if (row) setData(row as unknown as Detail);
    })();
  }, [user, userId]);

  if (isOwner === null) return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>;
  if (!isOwner) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
      <ShieldAlert className="h-8 w-8 text-amber-500" /> Owner access required.
    </div>
  );

  const maxCount = Math.max(1, ...(data?.deck_counts ?? []).map((d) => d.count));

  return (
    <div className="min-h-screen bg-background py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <Button asChild variant="ghost" size="sm"><Link to="/admin/activity"><ArrowLeft className="h-4 w-4 mr-1" />All reps</Link></Button>
        <div className="flex items-center gap-3 mt-3 mb-6">
          <span className="w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center text-white"
            style={{ background: profile?.avatar_color ?? "#0066FF" }}>
            {(profile?.display_name ?? "?").charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{profile?.display_name ?? "User"}</h1>
            <p className="text-xs text-muted-foreground font-mono">{userId}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <h2 className="font-semibold text-sm mb-3">Top decks viewed</h2>
            <div className="space-y-1.5">
              {(data?.deck_counts ?? []).slice(0, 12).map((d) => (
                <div key={d.deck_id} className="flex items-center gap-2 text-xs">
                  <div className="w-40 truncate">{d.deck_id}</div>
                  <div className="flex-1 bg-secondary rounded-sm h-2 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(d.count / maxCount) * 100}%` }} />
                  </div>
                  <div className="w-8 text-right tabular-nums">{d.count}</div>
                </div>
              ))}
              {(data?.deck_counts ?? []).length === 0 && <div className="text-xs text-muted-foreground">No page views yet.</div>}
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="font-semibold text-sm mb-3">Academy attempts ({data?.attempts.length ?? 0})</h2>
            <div className="space-y-1.5 max-h-72 overflow-auto">
              {(data?.attempts ?? []).map((a, i) => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-border/40 pb-1.5">
                  <div>
                    <div className="font-medium">{a.module_id}</div>
                    <div className="text-[10px] text-muted-foreground">{fmtDateTime(a.completed_at)}</div>
                  </div>
                  <div className={`font-medium ${a.passed ? "text-emerald-500" : "text-amber-500"}`}>
                    {a.score}% <span className="text-muted-foreground text-[10px]">({a.correct_count}/{a.total_questions})</span>
                  </div>
                </div>
              ))}
              {(data?.attempts ?? []).length === 0 && <div className="text-xs text-muted-foreground">No attempts yet.</div>}
            </div>
          </Card>
        </div>

        <Card className="p-4 mb-6">
          <h2 className="font-semibold text-sm mb-3">Recent page views ({data?.page_views.length ?? 0})</h2>
          <div className="space-y-1 max-h-96 overflow-auto text-xs">
            {(data?.page_views ?? []).map((p) => (
              <div key={p.id} className="flex items-center justify-between border-b border-border/40 py-1">
                <div className="font-mono truncate">{p.route}</div>
                <div className="flex items-center gap-3 text-muted-foreground shrink-0">
                  {p.duration_ms != null && <span>{Math.round(p.duration_ms / 1000)}s</span>}
                  <span>{fmtDateTime(p.viewed_at)}</span>
                </div>
              </div>
            ))}
            {(data?.page_views ?? []).length === 0 && <div className="text-muted-foreground">No page views yet.</div>}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold text-sm mb-3">Comments ({data?.comments.length ?? 0})</h2>
          <div className="space-y-2 max-h-96 overflow-auto text-xs">
            {(data?.comments ?? []).map((c) => (
              <div key={c.id} className="border-b border-border/40 pb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-mono text-[10px] text-muted-foreground">{c.deck_id} · {c.slide_id}</div>
                  <div className="text-[10px] text-muted-foreground">{fmtDateTime(c.created_at)}</div>
                </div>
                <div className="text-foreground">{c.body}</div>
              </div>
            ))}
            {(data?.comments ?? []).length === 0 && <div className="text-muted-foreground">No comments yet.</div>}
          </div>
        </Card>
      </div>
    </div>
  );
}