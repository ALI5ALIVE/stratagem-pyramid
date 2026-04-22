import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface Row {
  deck_id: string;
  slide_id: string;
  total: number;
  unresolved: number;
  last_activity: string;
}

const DECK_ROUTES: Record<string, string> = {
  "tech-deep-dive": "/pitch-technical",
  "platform-playbook": "/platform-playbook",
  "coanalyst": "/coanalyst",
  "insights-playbook": "/insights-playbook",
  "automation-playbook": "/automation-playbook",
  "mobile-playbook": "/mobile-playbook",
  "dtop-playbook": "/dtop-playbook",
  "regulation-management": "/regulation-management",
  "personas": "/personas",
};

export default function ReviewDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      const { data: comments } = await supabase
        .from("slide_comments")
        .select("deck_id, slide_id, resolved, created_at, parent_id");
      const map = new Map<string, Row>();
      const key = (d: string, s: string) => `${d}::${s}`;
      const ensure = (d: string, s: string) => {
        const k = key(d, s);
        if (!map.has(k)) map.set(k, { deck_id: d, slide_id: s, total: 0, unresolved: 0, last_activity: "" });
        return map.get(k)!;
      };
      (comments ?? []).forEach((c: any) => {
        const r = ensure(c.deck_id, c.slide_id);
        r.total++;
        if (!c.parent_id && !c.resolved) r.unresolved++;
        if (c.created_at > r.last_activity) r.last_activity = c.created_at;
      });
      setRows([...map.values()].sort((a, b) => (b.last_activity > a.last_activity ? 1 : -1)));
      setLoading(false);
    })();
  }, [user]);

  if (authLoading) return null;
  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="p-8 text-center space-y-4 max-w-md">
        <h2 className="text-lg font-semibold">Sign in required</h2>
        <p className="text-sm text-muted-foreground">You need to be signed in to view the review dashboard.</p>
        <Button asChild><Link to="/auth">Sign in</Link></Button>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold"><span className="title-accent">Review Dashboard</span></h1>
          <p className="text-sm text-muted-foreground mt-1">All slide comments across decks.</p>
        </div>
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">No reviews yet.</Card>
        ) : (
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Deck</th>
                  <th className="px-4 py-3">Slide</th>
                  <th className="px-4 py-3"><MessageSquare className="inline h-3.5 w-3.5" /></th>
                  <th className="px-4 py-3">Last activity</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const route = DECK_ROUTES[r.deck_id];
                  return (
                    <tr key={`${r.deck_id}-${r.slide_id}`} className="border-t border-border hover:bg-muted/20">
                      <td className="px-4 py-2.5 font-mono text-xs">{r.deck_id}</td>
                      <td className="px-4 py-2.5 font-mono text-xs">{r.slide_id}</td>
                      <td className="px-4 py-2.5">{r.total} {r.unresolved > 0 && <span className="text-primary">({r.unresolved} open)</span>}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{r.last_activity ? new Date(r.last_activity).toLocaleString() : "—"}</td>
                      <td className="px-4 py-2.5">
                        {route && <Link to={`${route}#${r.slide_id}`} className="text-xs text-primary hover:underline">Open →</Link>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  );
}