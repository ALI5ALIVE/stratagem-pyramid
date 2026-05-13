import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Check, Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { buildKnowledgeDocs, KB_NAME_PREFIX } from "@/lib/practice/buildKnowledgeDocs";

const AGENT_ID = "agent_5601krecj299fy28nwehe96cejrm";

export default function AdminKnowledgeBase() {
  const { user } = useAuth();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setIsOwner(false); return; }
    (async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["owner", "reviewer"]);
      setIsOwner((data ?? []).length > 0);
    })();
  }, [user]);

  const handleSync = async () => {
    setSyncing(true);
    setError(null);
    setResult(null);
    try {
      const documents = await buildKnowledgeDocs();
      const { data, error: fnErr } = await supabase.functions.invoke("elevenlabs-kb-sync", {
        body: { agentId: AGENT_ID, namePrefix: KB_NAME_PREFIX, documents },
      });
      if (fnErr) {
        const ctx = (fnErr as { context?: { error?: string } }).context;
        throw new Error(ctx?.error || fnErr.message);
      }
      if (!data?.ok) throw new Error(data?.error ?? "Sync failed");
      setResult(`Synced ${data.created?.length ?? documents.length} documents to the agent's knowledge base.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  if (isOwner === null) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>;
  }
  if (!isOwner) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
        <ShieldAlert className="h-8 w-8 text-amber-500" />
        Owner access required.
        <Button asChild variant="outline" size="sm"><Link to="/practice-center"><ArrowLeft className="mr-1 h-3 w-3" /> Back</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link to="/practice-center"><ArrowLeft className="mr-1 h-3 w-3" /> Practice Center</Link>
        </Button>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Practice Agent — Knowledge Base</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Re-uploads the deck content into the ElevenLabs agent's knowledge base. Run this only when slide content
          changes — it deletes and re-creates documents and is destructive while it runs.
        </p>

        <Card className="mt-6 flex items-center justify-between gap-4 bg-card/60 p-5">
          <div>
            <div className="text-sm font-semibold">Re-sync knowledge base</div>
            <div className="text-xs text-muted-foreground">
              Owners only. Avoid running while reps are mid-session.
            </div>
          </div>
          <Button onClick={handleSync} disabled={syncing}>
            {syncing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Syncing…</>
              : result ? <><Check className="mr-2 h-4 w-4" /> Re-sync</>
              : <><BookOpen className="mr-2 h-4 w-4" /> Sync now</>}
          </Button>
        </Card>

        {result && (
          <div className="mt-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">{result}</div>
        )}
        {error && (
          <div className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</div>
        )}
      </div>
    </div>
  );
}
