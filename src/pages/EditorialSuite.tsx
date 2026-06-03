import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEditorialRole } from "@/hooks/useEditorialRole";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Sparkles, BookOpen, Plus, ShieldAlert } from "lucide-react";
import { CalendarView } from "@/components/editorial/CalendarView";
import { ItemDialog } from "@/components/editorial/ItemDialog";
import { ItemDetail } from "@/components/editorial/ItemDetail";
import {
  SPINE_BEATS, DIFFERENTIATORS, PROOF_POINTS, TERMINOLOGY, PERSONAS,
} from "@/data/editorialPlaybook";
import { Link, useNavigate } from "react-router-dom";

export default function EditorialSuite() {
  const { user, loading: authLoading } = useAuth();
  const { role, canEdit, loading: roleLoading } = useEditorialRole();
  const navigate = useNavigate();

  const [pillars, setPillars] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogInitial, setDialogInitial] = useState<any | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailItemId, setDetailItemId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [p, i] = await Promise.all([
      supabase.from("content_pillars").select("*").order("order_index"),
      supabase.from("content_items").select("*").order("created_at", { ascending: false }),
    ]);
    setPillars(p.data ?? []);
    setItems(i.data ?? []);
  }, []);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  if (authLoading || roleLoading) {
    return <div className="min-h-screen bg-background" />;
  }
  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <Card className="p-8 max-w-md text-center space-y-4">
          <ShieldAlert className="w-10 h-10 mx-auto text-primary" />
          <h1 className="text-2xl font-bold">Sign in required</h1>
          <p className="text-muted-foreground">The Editorial Suite is for signed-in marketing team members.</p>
          <Button onClick={() => navigate("/auth")}>Sign in</Button>
        </Card>
      </div>
    );
  }

  const totalByStatus = (s: string) => items.filter((i) => i.status === s).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Home</Link>
            <h1 className="text-3xl font-bold mt-1">Editorial Suite</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Plan, brief, generate, and ship Q1–Q4 content aligned to the messaging playbook.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">{role ?? "no role"}</Badge>
            {canEdit && (
              <Button onClick={() => { setDialogInitial(null); setDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-1" /> New item
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {!canEdit && (
          <Card className="p-4 mb-6 bg-amber-500/10 border-amber-500/30">
            <p className="text-sm">
              You have <strong>read-only</strong> access. Ask an owner to grant you the <code>editor</code> role to plan items, write briefs, and generate assets.
            </p>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {["idea", "brief", "draft", "review", "final"].map((s) => (
            <Card key={s} className="p-4">
              <div className="text-xs uppercase text-muted-foreground">{s}</div>
              <div className="text-3xl font-bold mt-1">{totalByStatus(s)}</div>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="calendar">
          <TabsList>
            <TabsTrigger value="calendar"><Calendar className="w-4 h-4 mr-1" /> Calendar</TabsTrigger>
            <TabsTrigger value="briefs"><FileText className="w-4 h-4 mr-1" /> Briefs</TabsTrigger>
            <TabsTrigger value="assets"><Sparkles className="w-4 h-4 mr-1" /> Assets</TabsTrigger>
            <TabsTrigger value="playbook"><BookOpen className="w-4 h-4 mr-1" /> Playbook</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="mt-6">
            <CalendarView
              pillars={pillars}
              items={items}
              canEdit={canEdit}
              onCreate={(quarter, pillarId) => {
                setDialogInitial({ quarter, pillar_id: pillarId ?? null });
                setDialogOpen(true);
              }}
              onEdit={(item) => { setDialogInitial(item); setDialogOpen(true); }}
              onOpen={(item) => { setDetailItemId(item.id); setDetailOpen(true); }}
            />
          </TabsContent>

          <TabsContent value="briefs" className="mt-6">
            <BriefsList items={items} onOpen={(id) => { setDetailItemId(id); setDetailOpen(true); }} />
          </TabsContent>

          <TabsContent value="assets" className="mt-6">
            <AssetsList items={items} onOpen={(id) => { setDetailItemId(id); setDetailOpen(true); }} />
          </TabsContent>

          <TabsContent value="playbook" className="mt-6">
            <PlaybookView />
          </TabsContent>
        </Tabs>
      </main>

      <ItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        pillars={pillars}
        initial={dialogInitial}
        onSaved={load}
      />
      <ItemDetail
        open={detailOpen}
        onOpenChange={setDetailOpen}
        itemId={detailItemId}
        canEdit={canEdit}
        onChanged={load}
      />
    </div>
  );
}

function BriefsList({ items, onOpen }: { items: any[]; onOpen: (id: string) => void }) {
  const [briefs, setBriefs] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("briefs").select("*").order("updated_at", { ascending: false }).then(({ data }) => setBriefs(data ?? []));
  }, [items]);
  const itemMap = Object.fromEntries(items.map((i) => [i.id, i]));
  if (briefs.length === 0) {
    return <p className="text-muted-foreground text-sm">No briefs yet. Open an item from the Calendar to write one.</p>;
  }
  return (
    <div className="space-y-2">
      {briefs.map((b) => {
        const it = itemMap[b.content_item_id];
        if (!it) return null;
        return (
          <Card key={b.id} className="p-4 cursor-pointer hover:border-primary" onClick={() => onOpen(it.id)}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {it.persona} · {it.channel} · {it.quarter}
                </div>
              </div>
              <Badge variant={b.status === "approved" ? "default" : "outline"}>{b.status}</Badge>
            </div>
            {b.objective && <p className="text-sm mt-2 text-muted-foreground line-clamp-2">{b.objective}</p>}
          </Card>
        );
      })}
    </div>
  );
}

function AssetsList({ items, onOpen }: { items: any[]; onOpen: (id: string) => void }) {
  const [assets, setAssets] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("assets").select("*").order("updated_at", { ascending: false }).then(({ data }) => setAssets(data ?? []));
  }, [items]);
  const itemMap = Object.fromEntries(items.map((i) => [i.id, i]));
  if (assets.length === 0) {
    return <p className="text-muted-foreground text-sm">No drafts yet. Approve a brief and generate the first version.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {assets.map((a) => {
        const it = itemMap[a.content_item_id];
        if (!it) return null;
        return (
          <Card key={a.id} className="p-4 cursor-pointer hover:border-primary" onClick={() => onOpen(it.id)}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">v{a.version} · {a.model}</div>
              </div>
              <Badge variant={a.status === "final" ? "default" : "outline"}>{a.status}</Badge>
            </div>
            <p className="text-sm mt-3 text-muted-foreground line-clamp-3">{a.body.slice(0, 240)}…</p>
          </Card>
        );
      })}
    </div>
  );
}

function PlaybookView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="p-5">
        <h3 className="font-bold mb-3">5-Beat Spine</h3>
        <ol className="space-y-2">
          {SPINE_BEATS.map((b, i) => (
            <li key={b.id} className="flex gap-3">
              <span className="text-primary font-bold">{i + 1}.</span>
              <div>
                <div className="font-semibold">{b.label}</div>
                <div className="text-sm text-muted-foreground">{b.purpose}</div>
              </div>
            </li>
          ))}
        </ol>
      </Card>
      <Card className="p-5">
        <h3 className="font-bold mb-3">3 Differentiators (the close)</h3>
        <ul className="space-y-2 text-sm">
          {DIFFERENTIATORS.map((d) => <li key={d} className="flex gap-2"><span className="text-primary">▸</span>{d}</li>)}
        </ul>
      </Card>
      <Card className="p-5">
        <h3 className="font-bold mb-3">Proof Points</h3>
        <ul className="space-y-2 text-sm">
          {PROOF_POINTS.map((p) => <li key={p} className="flex gap-2"><span className="text-primary">▸</span>{p}</li>)}
        </ul>
      </Card>
      <Card className="p-5">
        <h3 className="font-bold mb-3">Personas</h3>
        <div className="space-y-3">
          {Object.entries(PERSONAS).map(([k, v]) => (
            <div key={k}>
              <div className="font-semibold">{v.label}</div>
              <div className="text-xs text-muted-foreground">Tone: {v.tone}</div>
              <div className="text-xs text-muted-foreground">Arc: {v.arc}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-5 lg:col-span-2">
        <h3 className="font-bold mb-3">Terminology</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold text-emerald-500 mb-1">Approved</div>
            <ul className="space-y-1">{TERMINOLOGY.approved.map((t) => <li key={t}>✓ {t}</li>)}</ul>
          </div>
          <div>
            <div className="font-semibold text-rose-500 mb-1">Forbidden</div>
            <ul className="space-y-1">{TERMINOLOGY.forbidden.map((t) => <li key={t}>✗ {t}</li>)}</ul>
          </div>
        </div>
      </Card>
    </div>
  );
}