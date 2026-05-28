import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ShieldAlert, Search } from "lucide-react";

type Row = {
  user_id: string;
  display_name: string;
  email: string | null;
  avatar_color: string;
  last_sign_in_at: string | null;
  created_at: string;
  sign_in_count: number;
  academy_modules_passed: number;
  academy_avg_score: number | null;
  academy_last_attempt: string | null;
  page_views_total: number;
  decks_visited: number;
  last_page_view: string | null;
  comments_total: number;
  last_comment_at: string | null;
};

function fmt(ts: string | null) {
  if (!ts) return "—";
  const d = new Date(ts);
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString();
}

export default function SalesRepActivity() {
  const { user } = useAuth();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!user) { setIsOwner(false); return; }
    (async () => {
      const { data: r } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "owner");
      const owner = (r ?? []).length > 0;
      setIsOwner(owner);
      if (!owner) return;
      const { data } = await supabase.rpc("get_user_activity_summary");
      setRows((data ?? []) as Row[]);
    })();
  }, [user]);

  if (isOwner === null) return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>;
  if (!isOwner) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
      <ShieldAlert className="h-8 w-8 text-amber-500" />
      Owner access required.
      <Button asChild variant="outline" size="sm"><Link to="/">Home</Link></Button>
    </div>
  );

  const filtered = rows.filter((r) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (r.display_name ?? "").toLowerCase().includes(s) || (r.email ?? "").toLowerCase().includes(s);
  });

  const exportCsv = () => {
    const header = ["User", "Email", "Last sign-in", "Sign-ins", "Modules passed", "Avg score", "Page views", "Decks visited", "Last page view", "Comments", "Last comment"];
    const lines = filtered.map((r) => [
      r.display_name, r.email ?? "", r.last_sign_in_at ?? "", r.sign_in_count,
      r.academy_modules_passed, r.academy_avg_score ?? "",
      r.page_views_total, r.decks_visited, r.last_page_view ?? "",
      r.comments_total, r.last_comment_at ?? "",
    ]);
    const csv = [header, ...lines].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "rep-activity.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <Button asChild variant="ghost" size="sm"><Link to="/"><ArrowLeft className="h-4 w-4 mr-1" />Home</Link></Button>
            <h1 className="text-2xl font-bold mt-2">Sales Rep Activity</h1>
            <p className="text-sm text-muted-foreground">{rows.length} users · sign-ins, academy, decks, comments</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search reps…" className="pl-7 h-8 w-56" />
            </div>
            <Button onClick={exportCsv} variant="outline" size="sm">Export CSV</Button>
          </div>
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-secondary/50">
              <tr className="text-left">
                <th className="px-3 py-2 font-medium">User</th>
                <th className="px-3 py-2 font-medium">Last sign-in</th>
                <th className="px-3 py-2 font-medium text-right">Sign-ins</th>
                <th className="px-3 py-2 font-medium text-right">Modules</th>
                <th className="px-3 py-2 font-medium text-right">Avg</th>
                <th className="px-3 py-2 font-medium text-right">Page views</th>
                <th className="px-3 py-2 font-medium text-right">Decks</th>
                <th className="px-3 py-2 font-medium">Last activity</th>
                <th className="px-3 py-2 font-medium text-right">Comments</th>
                <th className="px-3 py-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.user_id} className="border-t border-border hover:bg-secondary/30">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center text-white shrink-0"
                        style={{ background: r.avatar_color ?? "#0066FF" }}>
                        {(r.display_name ?? "?").charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <div className="font-medium text-foreground">{r.display_name}</div>
                        <div className="text-[10px] text-muted-foreground">{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{fmt(r.last_sign_in_at)}</td>
                  <td className="px-3 py-2 text-right">{r.sign_in_count ?? 0}</td>
                  <td className="px-3 py-2 text-right">{r.academy_modules_passed}</td>
                  <td className="px-3 py-2 text-right">{r.academy_avg_score ?? "—"}</td>
                  <td className="px-3 py-2 text-right">{r.page_views_total}</td>
                  <td className="px-3 py-2 text-right">{r.decks_visited}</td>
                  <td className="px-3 py-2 text-muted-foreground">{fmt(r.last_page_view)}</td>
                  <td className="px-3 py-2 text-right">{r.comments_total}</td>
                  <td className="px-3 py-2 text-right">
                    <Button asChild variant="ghost" size="sm" className="h-7">
                      <Link to={`/admin/activity/${r.user_id}`}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="px-3 py-6 text-center text-muted-foreground">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </Card>

        <p className="text-[10px] text-muted-foreground mt-3">
          Sign-in counts come from the auth audit log (best effort). Page views are recorded from the day this feature went live.
        </p>
      </div>
    </div>
  );
}