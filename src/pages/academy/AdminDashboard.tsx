import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    if (!user) { setIsOwner(false); return; }
    (async () => {
      const { data: r } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "owner");
      const owner = (r ?? []).length > 0;
      setIsOwner(owner);
      if (!owner) return;
      const [{ data: mods }, { data: prog }, { data: profs }] = await Promise.all([
        supabase.from("academy_modules").select("*").order("order_index"),
        supabase.from("academy_progress_per_user").select("*"),
        supabase.from("profiles").select("*"),
      ]);
      setModules(mods ?? []);
      setProgress(prog ?? []);
      const map: Record<string, any> = {};
      (profs ?? []).forEach((p: any) => { map[p.id] = p; });
      setProfiles(map);
    })();
  }, [user]);

  if (isOwner === null) return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>;
  if (!isOwner) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
      <ShieldAlert className="h-8 w-8 text-amber-500" />
      Owner access required.
      <Button asChild variant="outline" size="sm"><Link to="/academy">Back to Academy</Link></Button>
    </div>
  );

  const byUser: Record<string, Record<string, any>> = {};
  progress.forEach((p: any) => {
    if (!byUser[p.user_id]) byUser[p.user_id] = {};
    byUser[p.user_id][p.module_id] = p;
  });
  const userIds = Object.keys(byUser);

  const exportCsv = () => {
    const header = ["User", ...modules.map((m) => `M${m.module_number} score`), "Modules passed"];
    const rows = userIds.map((uid) => {
      const passed = modules.filter((m) => byUser[uid][m.id]?.passed).length;
      return [profiles[uid]?.display_name ?? uid, ...modules.map((m) => byUser[uid][m.id]?.best_score ?? ""), `${passed}/${modules.length}`];
    });
    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "academy-progress.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button asChild variant="ghost" size="sm"><Link to="/academy"><ArrowLeft className="h-4 w-4 mr-1" />Academy</Link></Button>
            <h1 className="text-2xl font-bold mt-2">Academy — Admin</h1>
            <p className="text-sm text-muted-foreground">Per-rep best score per module · {userIds.length} reviewers</p>
          </div>
          <Button onClick={exportCsv} variant="outline" size="sm">Export CSV</Button>
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left px-3 py-2 font-medium">User</th>
                {modules.map((m) => (
                  <th key={m.id} className="px-3 py-2 font-medium text-center" title={m.title}>M{m.module_number}</th>
                ))}
                <th className="px-3 py-2 font-medium text-center">Passed</th>
              </tr>
            </thead>
            <tbody>
              {userIds.map((uid) => {
                const passed = modules.filter((m) => byUser[uid][m.id]?.passed).length;
                return (
                  <tr key={uid} className="border-t border-border">
                    <td className="px-3 py-2">
                      <div className="font-medium text-foreground">{profiles[uid]?.display_name ?? "Unknown"}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{uid.slice(0, 8)}…</div>
                    </td>
                    {modules.map((m) => {
                      const p = byUser[uid][m.id];
                      if (!p) return <td key={m.id} className="text-center text-muted-foreground">—</td>;
                      return (
                        <td key={m.id} className="text-center">
                          <div className={p.passed ? "text-emerald-500 font-medium" : "text-amber-500"}>{p.best_score}%</div>
                          <div className="text-[10px] text-muted-foreground">{p.attempts}×</div>
                        </td>
                      );
                    })}
                    <td className="px-3 py-2 text-center font-medium text-foreground">{passed}/{modules.length}</td>
                  </tr>
                );
              })}
              {userIds.length === 0 && (
                <tr><td colSpan={modules.length + 2} className="px-3 py-6 text-center text-muted-foreground">No attempts yet.</td></tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}