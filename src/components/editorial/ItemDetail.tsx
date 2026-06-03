import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Copy, Download, RefreshCw, CheckCircle2 } from "lucide-react";
import {
  SPINE_BEATS, PROOF_POINTS, buildPlaybookSnapshot,
} from "@/data/editorialPlaybook";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId: string | null;
  canEdit: boolean;
  onChanged: () => void;
}

export function ItemDetail({ open, onOpenChange, itemId, canEdit, onChanged }: Props) {
  const { user } = useAuth();
  const [item, setItem] = useState<any>(null);
  const [brief, setBrief] = useState<any>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [activeAsset, setActiveAsset] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [refineNote, setRefineNote] = useState("");

  // Brief form local state
  const [objective, setObjective] = useState("");
  const [audience, setAudience] = useState("");
  const [keyMessage, setKeyMessage] = useState("");
  const [cta, setCta] = useState("");
  const [tone, setTone] = useState("");
  const [length, setLength] = useState("");
  const [spine, setSpine] = useState<Record<string, string>>({});
  const [selectedProofs, setSelectedProofs] = useState<string[]>([]);

  useEffect(() => {
    if (!open || !itemId) return;
    load();
  }, [open, itemId]);

  async function load() {
    if (!itemId) return;
    setLoading(true);
    const { data: it } = await supabase.from("content_items").select("*").eq("id", itemId).maybeSingle();
    setItem(it);
    const { data: br } = await supabase.from("briefs").select("*").eq("content_item_id", itemId).maybeSingle();
    setBrief(br);
    if (br) {
      setObjective(br.objective ?? "");
      setAudience(br.audience ?? "");
      setKeyMessage(br.key_message ?? "");
      setCta(br.cta ?? "");
      setTone(br.tone ?? "");
      setLength(br.length ?? "");
      setSpine((br.spine_beats as Record<string, string>) ?? {});
      setSelectedProofs((br.proof_points as string[]) ?? []);
    } else {
      setObjective(""); setAudience(""); setKeyMessage("");
      setCta(""); setTone(""); setLength("");
      setSpine({}); setSelectedProofs([]);
    }
    const { data: ass } = await supabase
      .from("assets")
      .select("*")
      .eq("content_item_id", itemId)
      .order("version", { ascending: false });
    setAssets(ass ?? []);
    setActiveAsset((ass ?? [])[0] ?? null);
    setLoading(false);
  }

  async function saveBrief(approve = false) {
    if (!itemId) return;
    const payload: any = {
      content_item_id: itemId,
      objective, audience, key_message: keyMessage, cta, tone, length,
      spine_beats: spine, proof_points: selectedProofs,
      status: approve ? "approved" : "draft",
    };
    if (approve) {
      payload.playbook_snapshot = buildPlaybookSnapshot();
      payload.approved_by = user?.id;
      payload.approved_at = new Date().toISOString();
    }
    let res;
    if (brief?.id) {
      res = await supabase.from("briefs").update(payload).eq("id", brief.id).select().single();
    } else {
      payload.created_by = user?.id;
      if (!approve) payload.playbook_snapshot = buildPlaybookSnapshot();
      res = await supabase.from("briefs").insert(payload).select().single();
    }
    if (res.error) { toast.error(res.error.message); return; }
    setBrief(res.data);
    if (approve) {
      await supabase.from("content_items").update({ status: "brief" }).eq("id", itemId);
    }
    toast.success(approve ? "Brief approved — ready to generate" : "Brief saved");
    onChanged();
    load();
  }

  async function generate() {
    if (!brief?.id) { toast.error("Save and approve the brief first"); return; }
    if (brief.status !== "approved") { toast.error("Approve the brief first"); return; }
    setGenerating(true);
    const { data, error } = await supabase.functions.invoke("generate-asset", {
      body: { briefId: brief.id, refineNote: refineNote || undefined },
    });
    setGenerating(false);
    if (error) { toast.error(error.message); return; }
    if (data?.error) { toast.error(data.error); return; }
    toast.success("Asset generated");
    setRefineNote("");
    onChanged();
    load();
  }

  async function setAssetStatus(status: string) {
    if (!activeAsset) return;
    const { error } = await supabase.from("assets").update({ status }).eq("id", activeAsset.id);
    if (error) { toast.error(error.message); return; }
    if (status === "final" && itemId) {
      await supabase.from("content_items").update({ status: "final" }).eq("id", itemId);
    } else if (status === "review" && itemId) {
      await supabase.from("content_items").update({ status: "review" }).eq("id", itemId);
    }
    toast.success(`Marked ${status}`);
    onChanged();
    load();
  }

  function downloadMd() {
    if (!activeAsset) return;
    const blob = new Blob([activeAsset.body], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(item?.title ?? "asset").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-v${activeAsset.version}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!open) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-3xl w-full overflow-y-auto">
        {loading || !item ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>{item.title}</SheetTitle>
              <SheetDescription>
                {item.quarter} · {item.persona} · {item.channel} · {item.asset_type}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-8">
              {/* BRIEF */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">Brief</h3>
                  {brief?.status === "approved" && (
                    <Badge className="bg-emerald-600"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</Badge>
                  )}
                </div>
                <fieldset disabled={!canEdit} className="space-y-3">
                  <div>
                    <Label>Objective</Label>
                    <Input value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="One sentence: what should this asset do?" />
                  </div>
                  <div>
                    <Label>Audience</Label>
                    <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Job title, industry, mindset" />
                  </div>
                  <div>
                    <Label>Key message</Label>
                    <Textarea value={keyMessage} onChange={(e) => setKeyMessage(e.target.value)} rows={2} placeholder="The one thing they should remember." />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div><Label>CTA</Label><Input value={cta} onChange={(e) => setCta(e.target.value)} /></div>
                    <div><Label>Tone</Label><Input value={tone} onChange={(e) => setTone(e.target.value)} /></div>
                    <div><Label>Length</Label><Input value={length} onChange={(e) => setLength(e.target.value)} /></div>
                  </div>

                  <div>
                    <Label className="mb-2 block">5-beat spine</Label>
                    <div className="space-y-2">
                      {SPINE_BEATS.map((b) => (
                        <div key={b.id} className="grid grid-cols-[140px_1fr] gap-2 items-start">
                          <div className="text-xs">
                            <div className="font-semibold">{b.label}</div>
                            <div className="text-muted-foreground">{b.purpose}</div>
                          </div>
                          <Textarea
                            value={spine[b.id] ?? ""}
                            onChange={(e) => setSpine({ ...spine, [b.id]: e.target.value })}
                            rows={2}
                            placeholder="(brief input — leave blank to use playbook default)"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Proof points</Label>
                    <div className="space-y-1.5">
                      {PROOF_POINTS.map((p) => (
                        <label key={p} className="flex items-start gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedProofs.includes(p)}
                            onChange={(e) => {
                              setSelectedProofs(
                                e.target.checked
                                  ? [...selectedProofs, p]
                                  : selectedProofs.filter((x) => x !== p),
                              );
                            }}
                            className="mt-1"
                          />
                          <span>{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </fieldset>

                {canEdit && (
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" onClick={() => saveBrief(false)}>Save draft</Button>
                    <Button onClick={() => saveBrief(true)}>
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Approve brief
                    </Button>
                  </div>
                )}
              </section>

              {/* GENERATE */}
              <section>
                <h3 className="font-bold text-lg mb-3">Generate asset</h3>
                <div className="space-y-2">
                  <Textarea
                    value={refineNote}
                    onChange={(e) => setRefineNote(e.target.value)}
                    rows={2}
                    placeholder="Optional refinement note for this generation (e.g. 'punchier hook', 'shorter')"
                    disabled={!canEdit}
                  />
                  <Button onClick={generate} disabled={!canEdit || generating || !brief || brief?.status !== "approved"}>
                    {generating ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Generating…</> : <><Sparkles className="w-4 h-4 mr-1" /> Generate v{(assets[0]?.version ?? 0) + 1}</>}
                  </Button>
                  {brief?.status !== "approved" && (
                    <p className="text-xs text-muted-foreground">Approve the brief before generating.</p>
                  )}
                </div>
              </section>

              {/* ASSETS */}
              <section>
                <h3 className="font-bold text-lg mb-3">Versions</h3>
                {assets.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No drafts yet.</p>
                ) : (
                  <>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {assets.map((a) => (
                        <Button
                          key={a.id}
                          size="sm"
                          variant={activeAsset?.id === a.id ? "default" : "outline"}
                          onClick={() => setActiveAsset(a)}
                        >
                          v{a.version} · {a.status}
                        </Button>
                      ))}
                    </div>
                    {activeAsset && (
                      <div className="space-y-3">
                        <div className="flex gap-2 flex-wrap">
                          <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(activeAsset.body); toast.success("Copied"); }}>
                            <Copy className="w-3 h-3 mr-1" /> Copy
                          </Button>
                          <Button size="sm" variant="outline" onClick={downloadMd}>
                            <Download className="w-3 h-3 mr-1" /> Download .md
                          </Button>
                          {canEdit && activeAsset.status !== "review" && (
                            <Button size="sm" variant="outline" onClick={() => setAssetStatus("review")}>
                              Mark in review
                            </Button>
                          )}
                          {canEdit && activeAsset.status !== "final" && (
                            <Button size="sm" onClick={() => setAssetStatus("final")}>
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Mark final
                            </Button>
                          )}
                          {canEdit && (
                            <Button size="sm" variant="ghost" onClick={generate} disabled={generating}>
                              <RefreshCw className="w-3 h-3 mr-1" /> Regenerate
                            </Button>
                          )}
                        </div>
                        <div className="rounded border border-border bg-card/30 p-4 max-h-[500px] overflow-y-auto">
                          <pre className="text-sm whitespace-pre-wrap font-sans">{activeAsset.body}</pre>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Generated with {activeAsset.model} · {new Date(activeAsset.created_at).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}