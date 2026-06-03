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
import { Loader2, Sparkles, Copy, Download, RefreshCw, CheckCircle2, Wand2, ChevronDown } from "lucide-react";
import {
  SPINE_BEATS, PROOF_POINTS, buildPlaybookSnapshot,
  DIFFERENTIATORS, TERMINOLOGY,
} from "@/data/editorialPlaybook";
import {
  VOICES, getDefaultVoice, getFrameworks, getRubric, bandColor, emptyOutlineFor,
  type VoiceId,
} from "@/data/editorialCraft";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { OutlineEditor } from "./OutlineEditor";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [angle, setAngle] = useState("");
  const [audience, setAudience] = useState("");
  const [coreInsight, setCoreInsight] = useState("");
  const [workingTitle, setWorkingTitle] = useState("");
  const [altTitles, setAltTitles] = useState<string[]>([]);
  const [outline, setOutline] = useState<any[]>([]);
  const [takeaways, setTakeaways] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [distPrimary, setDistPrimary] = useState("");
  const [distRepurpose, setDistRepurpose] = useState<string[]>([]);
  const [successMetric, setSuccessMetric] = useState("");
  const [cta, setCta] = useState("");
  const [tone, setTone] = useState("");
  const [length, setLength] = useState("");
  const [selectedProofs, setSelectedProofs] = useState<string[]>([]);
  const [voice, setVoice] = useState<VoiceId>("corporate");
  const [drafting, setDrafting] = useState(false);
  const [guardrailsOpen, setGuardrailsOpen] = useState(false);

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
      setAngle((br as any).angle ?? br.objective ?? "");
      setAudience(br.audience ?? "");
      setCoreInsight((br as any).core_insight ?? br.key_message ?? "");
      setWorkingTitle(it?.title ?? "");
      setAltTitles(((br as any).alt_titles as string[]) ?? []);
      setOutline(((br as any).outline as any[]) ?? []);
      setTakeaways(((br as any).takeaways as string[]) ?? []);
      setSources(((br as any).sources as string[]) ?? []);
      const dist = (br as any).distribution ?? {};
      setDistPrimary(dist.primary_channel ?? "");
      setDistRepurpose(dist.repurpose ?? []);
      setSuccessMetric((br as any).success_metric ?? "");
      setCta(br.cta ?? "");
      setTone(br.tone ?? "");
      setLength(br.length ?? "");
      setSelectedProofs((br.proof_points as string[]) ?? []);
      setVoice((br.voice as VoiceId) ?? getDefaultVoice(it?.persona ?? "exec", (it?.asset_type ?? "long_form") as any));
    } else {
      setAngle(""); setAudience(""); setCoreInsight("");
      setWorkingTitle(it?.title ?? "");
      setAltTitles([]);
      setOutline(it ? emptyOutlineFor(it.asset_type as any) : []);
      setTakeaways([]); setSources([]);
      setDistPrimary(it?.channel ?? ""); setDistRepurpose([]);
      setSuccessMetric("");
      setCta(""); setTone(""); setLength("");
      setSelectedProofs([]);
      setVoice(getDefaultVoice(it?.persona ?? "exec", (it?.asset_type ?? "long_form") as any));
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
      objective: angle, // legacy alias
      angle,
      audience,
      key_message: coreInsight, // legacy alias
      core_insight: coreInsight,
      alt_titles: altTitles,
      outline,
      takeaways,
      sources,
      distribution: { primary_channel: distPrimary, repurpose: distRepurpose },
      success_metric: successMetric,
      cta, tone, length,
      proof_points: selectedProofs, voice,
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

  async function draftBriefWithAI() {
    if (!itemId) return;
    setDrafting(true);
    const { data, error } = await supabase.functions.invoke("draft-brief", {
      body: { contentItemId: itemId, voice },
    });
    setDrafting(false);
    if (error) { toast.error(error.message); return; }
    if (data?.error) { toast.error(data.error); return; }
    toast.success("Brief drafted — review, edit, then approve.");
    onChanged();
    load();
  }

  function updateAltTitle(i: number, v: string) {
    const next = [...altTitles]; next[i] = v; setAltTitles(next);
  }
  function updateTakeaway(i: number, v: string) {
    const next = [...takeaways]; next[i] = v; setTakeaways(next);
  }
  function updateSource(i: number, v: string) {
    const next = [...sources]; next[i] = v; setSources(next);
  }
  function updateRepurpose(i: number, v: string) {
    const next = [...distRepurpose]; next[i] = v; setDistRepurpose(next);
  }

  async function generate() {
    if (!brief?.id) { toast.error("Save and approve the brief first"); return; }
    if (brief.status !== "approved") { toast.error("Approve the brief first"); return; }
    setGenerating(true);
    const { data, error } = await supabase.functions.invoke("generate-asset", {
      body: { briefId: brief.id, refineNote: refineNote || undefined, voice },
    });
    setGenerating(false);
    if (error) { toast.error(error.message); return; }
    if (data?.error) { toast.error(data.error); return; }
    toast.success("Asset generated");
    setRefineNote("");
    onChanged();
    load();
  }

  function regenerateAddressingLowScores() {
    if (!activeAsset?.scores?.dimensions) return;
    const lows = (activeAsset.scores.dimensions as any[])
      .filter((d) => typeof d.score === "number" && d.score < 7)
      .sort((a, b) => a.score - b.score)
      .slice(0, 4);
    if (lows.length === 0) { toast.success("No low scores to address — this draft is strong."); return; }
    const note = "Improve these weak dimensions from the last version:\n" +
      lows.map((d) => `- ${d.id} (scored ${d.score}/10): ${d.improvement || d.rationale}`).join("\n");
    setRefineNote(note);
    toast.info("Refinement note pre-filled — click Generate to produce the next version.");
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

  const frameworks = item ? getFrameworks(item.asset_type as any) : [];
  const rubric = item ? getRubric(item.asset_type as any) : [];
  const rubricMap = Object.fromEntries(rubric.map((r) => [r.id, r]));

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
              {/* STRATEGY HEADER (derived from content item, with voice + frameworks) */}
              <section className="rounded border border-border bg-card/30 p-4 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="text-xs uppercase text-muted-foreground">Strategy</div>
                    <div className="font-semibold">{item.quarter} · {item.persona} persona · {item.channel}</div>
                    <div className="text-xs text-muted-foreground">Asset type: {item.asset_type}</div>
                  </div>
                  {brief?.status === "approved" && (
                    <Badge className="bg-emerald-600"><CheckCircle2 className="w-3 h-3 mr-1" /> Brief approved</Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-3 items-start">
                  <div>
                    <Label className="text-xs">Voice</Label>
                    <Select value={voice} onValueChange={(v) => setVoice(v as VoiceId)} disabled={!canEdit}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(VOICES).map(([k, v]) => (
                          <SelectItem key={k} value={k}>{v.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">{VOICES[voice].guide}</p>
                  </div>
                  <div>
                    <Label className="text-xs">Craft frameworks applied to this asset type</Label>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {frameworks.map((f) => (
                        <Badge key={f.name} variant="outline" className="text-xs" title={f.rules.join(" · ")}>
                          {f.name} <span className="text-muted-foreground ml-1">· {f.authority.split("·")[0].trim()}</span>
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Drafts are auto-scored against a {rubric.length}-dimension rubric (100 pts).
                    </p>
                  </div>
                </div>
              </section>

              {/* BRIEF */}
              <section>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h3 className="font-bold text-lg">Editorial brief</h3>
                  {canEdit && (
                    <Button onClick={draftBriefWithAI} disabled={drafting} variant="outline" size="sm">
                      {drafting
                        ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Drafting…</>
                        : <><Wand2 className="w-4 h-4 mr-1" /> {brief ? "Re-draft brief with AI" : "Draft brief with AI"}</>}
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Drafted from the content strategy + sibling items in this pillar, applied through the craft frameworks above. Edit anything, then approve. The 5-beat messaging spine is enforced at write-time — you don't fill it in here.
                </p>

                <fieldset disabled={!canEdit} className="space-y-4">
                  <div>
                    <Label>Working title</Label>
                    <Input value={workingTitle} onChange={(e) => setWorkingTitle(e.target.value)} placeholder="Sharper than the calendar title" />
                  </div>

                  {altTitles.length > 0 && (
                    <div>
                      <Label>Alternative titles</Label>
                      <div className="space-y-1.5">
                        {altTitles.map((t, i) => (
                          <Input key={i} value={t} onChange={(e) => updateAltTitle(i, e.target.value)} />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Angle (unique POV)</Label>
                    <Textarea value={angle} onChange={(e) => setAngle(e.target.value)} rows={2} placeholder="One sentence — what makes THIS piece different from every other in the pillar." />
                  </div>

                  <div>
                    <Label>Audience snapshot</Label>
                    <Textarea value={audience} onChange={(e) => setAudience(e.target.value)} rows={3} placeholder="Role, KPI under pressure, what they already believe, what they don't." />
                  </div>

                  <div>
                    <Label>Core insight</Label>
                    <Textarea value={coreInsight} onChange={(e) => setCoreInsight(e.target.value)} rows={2} placeholder="The non-obvious thing this asset teaches." />
                  </div>

                  <div>
                    <Label className="mb-2 block">Outline ({outline.length} {outline.length === 1 ? "block" : "blocks"})</Label>
                    <OutlineEditor
                      assetType={item.asset_type as any}
                      value={outline}
                      onChange={setOutline}
                      disabled={!canEdit}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Key takeaways (one per line)</Label>
                    <Textarea
                      rows={4}
                      value={takeaways.join("\n")}
                      onChange={(e) => setTakeaways(e.target.value.split("\n").filter(Boolean))}
                      placeholder="3–5 sentences the reader should be able to repeat"
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Proof to cite</Label>
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

                  <div>
                    <Label className="mb-2 block">External sources / references (one per line)</Label>
                    <Textarea
                      rows={3}
                      value={sources.join("\n")}
                      onChange={(e) => setSources(e.target.value.split("\n").filter(Boolean))}
                      placeholder="Eurocontrol Vol. 8 2024 · IATA Safety Report 2023 · etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Primary distribution channel</Label>
                      <Input value={distPrimary} onChange={(e) => setDistPrimary(e.target.value)} placeholder="e.g. company blog, LinkedIn, sales email" />
                    </div>
                    <div>
                      <Label>Repurpose channels (comma-separated)</Label>
                      <Input
                        value={distRepurpose.join(", ")}
                        onChange={(e) => setDistRepurpose(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                        placeholder="LinkedIn carousel, newsletter"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Success metric</Label>
                    <Input value={successMetric} onChange={(e) => setSuccessMetric(e.target.value)} placeholder="e.g. ≥3% LinkedIn engagement · ≥45s avg read time" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div><Label>CTA</Label><Input value={cta} onChange={(e) => setCta(e.target.value)} /></div>
                    <div><Label>Tone</Label><Input value={tone} onChange={(e) => setTone(e.target.value)} /></div>
                    <div><Label>Length</Label><Input value={length} onChange={(e) => setLength(e.target.value)} /></div>
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

                {/* Messaging guardrails (collapsed) */}
                <Collapsible open={guardrailsOpen} onOpenChange={setGuardrailsOpen} className="mt-6">
                  <CollapsibleTrigger asChild>
                    <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
                      <ChevronDown className={`w-3 h-3 transition-transform ${guardrailsOpen ? "rotate-0" : "-rotate-90"}`} />
                      Messaging guardrails (auto-applied at write-time)
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 rounded border border-border bg-card/30 p-3 text-xs space-y-2">
                    <div>
                      <div className="font-semibold mb-1">5-beat spine</div>
                      <ol className="list-decimal pl-4 space-y-0.5 text-muted-foreground">
                        {SPINE_BEATS.map((b) => <li key={b.id}><span className="text-foreground">{b.label}</span> — {b.purpose}</li>)}
                      </ol>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Differentiators (the close)</div>
                      <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                        {DIFFERENTIATORS.map((d) => <li key={d}>{d}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold mb-1 text-rose-500">Forbidden terms</div>
                      <p className="text-muted-foreground">{TERMINOLOGY.forbidden.join(" · ")}</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
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
                        {typeof activeAsset.score_total === "number" && (
                          <div className="rounded border border-border bg-card/30 p-4 space-y-3">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div>
                                <div className="text-xs uppercase text-muted-foreground">Editorial scorecard</div>
                                <div className="text-3xl font-bold mt-0.5">{activeAsset.score_total}<span className="text-base text-muted-foreground"> / 100</span></div>
                              </div>
                              <Badge className={bandColor(activeAsset.score_band ?? "Rework")}>
                                Grade {activeAsset.score_band ?? "—"}
                              </Badge>
                              {canEdit && (
                                <Button size="sm" variant="outline" onClick={regenerateAddressingLowScores}>
                                  <RefreshCw className="w-3 h-3 mr-1" /> Address low scores
                                </Button>
                              )}
                            </div>
                            <div className="space-y-1.5">
                              {(activeAsset.scores?.dimensions ?? []).map((d: any) => {
                                const meta = rubricMap[d.id];
                                if (!meta) return null;
                                const pct = Math.max(0, Math.min(100, (d.score ?? 0) * 10));
                                const barColor = d.score >= 8 ? "bg-emerald-500" : d.score >= 6 ? "bg-amber-500" : "bg-rose-500";
                                return (
                                  <div key={d.id} className="text-xs">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">{meta.label} <span className="text-muted-foreground">· {meta.weight}pt</span></span>
                                      <span className="font-mono">{d.score ?? 0}/10</span>
                                    </div>
                                    <div className="h-1.5 bg-muted rounded overflow-hidden mt-0.5">
                                      <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }} />
                                    </div>
                                    {d.improvement && (
                                      <p className="text-muted-foreground mt-0.5 italic">→ {d.improvement}</p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
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