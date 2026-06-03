import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ASSET_TYPES, CHANNELS, QUARTERS, STATUSES, PERSONAS,
} from "@/data/editorialPlaybook";

interface Pillar { id: string; name: string; quarter: string; }
interface Item {
  id?: string;
  title: string;
  pillar_id: string | null;
  quarter: string;
  persona: string;
  channel: string;
  asset_type: string;
  status: string;
  due_date: string | null;
  notes?: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pillars: Pillar[];
  initial?: Partial<Item> | null;
  onSaved: () => void;
}

const empty: Item = {
  title: "", pillar_id: null, quarter: "Q1", persona: "exec",
  channel: "blog", asset_type: "long_form", status: "idea", due_date: null, notes: "",
};

export function ItemDialog({ open, onOpenChange, pillars, initial, onSaved }: Props) {
  const { user } = useAuth();
  const [form, setForm] = useState<Item>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setForm({ ...empty, ...(initial ?? {}) } as Item);
  }, [open, initial]);

  const isEdit = !!initial?.id;
  const update = (k: keyof Item, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.title.trim()) { toast.error("Title required"); return; }
    setSaving(true);
    const payload: any = {
      title: form.title.trim(),
      pillar_id: form.pillar_id,
      quarter: form.quarter,
      persona: form.persona,
      channel: form.channel,
      asset_type: form.asset_type,
      status: form.status,
      due_date: form.due_date,
      notes: form.notes ?? "",
    };
    let err;
    if (isEdit && initial?.id) {
      ({ error: err } = await supabase.from("content_items").update(payload).eq("id", initial.id));
    } else {
      payload.created_by = user?.id;
      ({ error: err } = await supabase.from("content_items").insert(payload));
    }
    setSaving(false);
    if (err) { toast.error(err.message); return; }
    toast.success(isEdit ? "Updated" : "Created");
    onOpenChange(false);
    onSaved();
  };

  const remove = async () => {
    if (!initial?.id) return;
    if (!confirm("Delete this item and all related briefs/assets?")) return;
    const { error } = await supabase.from("content_items").delete().eq("id", initial.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    onOpenChange(false);
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>{isEdit ? "Edit item" : "New content item"}</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => update("title", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Quarter</Label>
              <Select value={form.quarter} onValueChange={(v) => update("quarter", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{QUARTERS.map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Pillar</Label>
              <Select value={form.pillar_id ?? "none"} onValueChange={(v) => update("pillar_id", v === "none" ? null : v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">(none)</SelectItem>
                  {pillars.filter((p) => p.quarter === form.quarter).map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Persona</Label>
              <Select value={form.persona} onValueChange={(v) => update("persona", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(PERSONAS).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Channel</Label>
              <Select value={form.channel} onValueChange={(v) => update("channel", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CHANNELS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Asset type</Label>
              <Select value={form.asset_type} onValueChange={(v) => update("asset_type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ASSET_TYPES.map((a) => <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => update("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{STATUSES.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Due date</Label>
              <Input type="date" value={form.due_date ?? ""} onChange={(e) => update("due_date", e.target.value || null)} />
            </div>
          </div>
          <div>
            <Label>Notes</Label>
            <Textarea value={form.notes ?? ""} onChange={(e) => update("notes", e.target.value)} rows={2} />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          {isEdit ? <Button variant="destructive" onClick={remove}>Delete</Button> : <div />}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}