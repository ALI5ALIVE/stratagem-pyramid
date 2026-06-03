import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  pillars: { id: string; name: string; quarter: string }[];
  onDone?: () => void;
}

type Voice = "corporate" | "thought_leader" | "hybrid";

export function BulkDraftDrawer({ open, onOpenChange, pillars, onDone }: Props) {
  const [quarter, setQuarter] = useState<string>("all");
  const [pillarId, setPillarId] = useState<string>("all");
  const [voice, setVoice] = useState<Voice>("corporate");
  const [onlyEmpty, setOnlyEmpty] = useState(true);
  const [previewing, setPreviewing] = useState(false);
  const [preview, setPreview] = useState<{ total: number; targets: any[] } | null>(null);
  const [starting, setStarting] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [job, setJob] = useState<any>(null);
  const pollRef = useRef<number | null>(null);

  const filteredPillars = quarter === "all" ? pillars : pillars.filter((p) => p.quarter === quarter);

  function buildPayload(extra: Record<string, unknown> = {}) {
    return {
      quarter: quarter === "all" ? undefined : quarter,
      pillarId: pillarId === "all" ? undefined : pillarId,
      voice,
      onlyEmpty,
      ...extra,
    };
  }

  async function handlePreview() {
    setPreviewing(true);
    setPreview(null);
    try {
      const { data, error } = await supabase.functions.invoke("bulk-draft-briefs", {
        body: buildPayload({ dryRun: true }),
      });
      if (error) throw error;
      setPreview({ total: data.total, targets: data.targets ?? [] });
    } catch (e: any) {
      toast.error(e?.message ?? "Preview failed");
    } finally {
      setPreviewing(false);
    }
  }

  async function handleStart() {
    setStarting(true);
    try {
      const { data, error } = await supabase.functions.invoke("bulk-draft-briefs", {
        body: buildPayload(),
      });
      if (error) throw error;
      setJobId(data.jobId);
      toast.success(`Enriching ${data.total} briefs in the background…`);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to start");
    } finally {
      setStarting(false);
    }
  }

  // Poll job
  useEffect(() => {
    if (!jobId) return;
    let cancelled = false;
    const tick = async () => {
      const { data } = await supabase.from("brief_jobs").select("*").eq("id", jobId).maybeSingle();
      if (cancelled) return;
      setJob(data);
      if (data && (data.status === "done" || data.status === "error")) {
        if (pollRef.current) window.clearInterval(pollRef.current);
        onDone?.();
      }
    };
    tick();
    pollRef.current = window.setInterval(tick, 2000);
    return () => {
      cancelled = true;
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [jobId, onDone]);

  const pct = job && job.total > 0 ? Math.round(((job.succeeded + job.failed) / job.total) * 100) : 0;
  const running = job && job.status === "running";
  const done = job && job.status === "done";
  const errored = job && job.status === "error";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Bulk draft briefs
          </SheetTitle>
          <SheetDescription>
            Populate angle, insight, outline, takeaways, sources, distribution and success metric across many briefs at once. Sibling-aware within each pillar.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5 mt-6">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Quarter</Label>
              <Select value={quarter} onValueChange={(v) => { setQuarter(v); setPillarId("all"); setPreview(null); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All quarters</SelectItem>
                  {["Q1","Q2","Q3","Q4"].map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Pillar</Label>
              <Select value={pillarId} onValueChange={(v) => { setPillarId(v); setPreview(null); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All pillars</SelectItem>
                  {filteredPillars.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs">Voice</Label>
            <Select value={voice} onValueChange={(v) => setVoice(v as Voice)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="thought_leader">Thought leader</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <div className="text-sm font-medium">Only enrich empty briefs</div>
              <div className="text-xs text-muted-foreground">Skip briefs that already have an angle written. Recommended.</div>
            </div>
            <Switch checked={onlyEmpty} onCheckedChange={(v) => { setOnlyEmpty(v); setPreview(null); }} />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview} disabled={previewing || !!jobId}>
              {previewing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Preview targets
            </Button>
            <Button
              onClick={handleStart}
              disabled={starting || !!jobId || !preview || preview.total === 0}
            >
              {starting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Start enrichment {preview ? `(${preview.total})` : ""}
            </Button>
          </div>

          {preview && !jobId && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold">{preview.total} brief{preview.total === 1 ? "" : "s"} will be drafted</div>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-1 text-xs">
                {preview.targets.map((t) => (
                  <div key={t.id} className="flex items-center justify-between gap-2 py-1 border-b border-border/40 last:border-0">
                    <span className="truncate">{t.title}</span>
                    <span className="text-muted-foreground shrink-0">{t.quarter} · {t.persona}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {job && (
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {running && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                  {done && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {errored && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                  <span className="text-sm font-semibold">
                    {running ? "Drafting…" : done ? "Complete" : errored ? "Errored" : job.status}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {job.succeeded + job.failed} / {job.total}
                </div>
              </div>
              <Progress value={pct} />
              <div className="flex gap-2 text-xs">
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-500">✓ {job.succeeded}</Badge>
                {job.failed > 0 && <Badge variant="outline" className="border-rose-500/40 text-rose-500">✗ {job.failed}</Badge>}
              </div>
              {Array.isArray(job.errors) && job.errors.length > 0 && (
                <div className="max-h-48 overflow-y-auto text-xs space-y-1 mt-2">
                  {job.errors.map((e: any, i: number) => (
                    <div key={i} className="p-2 rounded bg-rose-500/5 border border-rose-500/20">
                      <div className="font-medium">{e.title ?? e.itemId ?? "Job error"}</div>
                      <div className="text-muted-foreground">{e.message}</div>
                    </div>
                  ))}
                </div>
              )}
              {(done || errored) && (
                <Button size="sm" variant="outline" onClick={() => { setJobId(null); setJob(null); setPreview(null); }}>
                  Run another batch
                </Button>
              )}
            </Card>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}