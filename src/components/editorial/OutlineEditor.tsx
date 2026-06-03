import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { outlineKindFor, type OutlineKind } from "@/data/editorialCraft";
import type { AssetTypeId } from "@/data/editorialPlaybook";

interface Props {
  assetType: AssetTypeId;
  value: any[];
  onChange: (next: any[]) => void;
  disabled?: boolean;
}

export function OutlineEditor({ assetType, value, onChange, disabled }: Props) {
  const kind: OutlineKind = outlineKindFor(assetType);
  const items = Array.isArray(value) ? value : [];

  function update(i: number, patch: any) {
    const next = items.map((it, idx) => (idx === i ? { ...it, ...patch } : it));
    onChange(next);
  }
  function add() {
    if (kind === "social") {
      onChange([...items, { hook: "", body_lines: [""], closing_question: "", hashtags: [] }]);
    } else if (kind === "scenes") {
      onChange([...items, { duration_seconds: 30, visual: "", script_beats: [""], on_screen_text: "" }]);
    } else {
      onChange([...items, { heading: "", intent: "", bullets: [""], evidence: "" }]);
    }
  }
  function remove(i: number) { onChange(items.filter((_, idx) => idx !== i)); }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          No outline yet — click "Draft brief with AI" to generate one, or add a row manually.
        </p>
      )}
      {items.map((it, i) => (
        <div key={i} className="rounded border border-border bg-card/30 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-muted-foreground">
              {kind === "scenes" ? `Scene ${i + 1}` : kind === "social" ? `Post block ${i + 1}` : `Section ${i + 1}`}
            </div>
            {!disabled && (
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3 h-3" /></Button>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3 h-3" /></Button>
                <Button size="icon" variant="ghost" className="h-6 w-6 text-rose-500" onClick={() => remove(i)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            )}
          </div>

          {kind === "sections" && (
            <>
              <div>
                <Label className="text-xs">Heading</Label>
                <Input value={it.heading ?? ""} onChange={(e) => update(i, { heading: e.target.value })} disabled={disabled} />
              </div>
              <div>
                <Label className="text-xs">Intent (one line)</Label>
                <Input value={it.intent ?? ""} onChange={(e) => update(i, { intent: e.target.value })} disabled={disabled} />
              </div>
              <div>
                <Label className="text-xs">Sub-points (one per line)</Label>
                <Textarea
                  rows={3}
                  value={(it.bullets ?? []).join("\n")}
                  onChange={(e) => update(i, { bullets: e.target.value.split("\n").filter(Boolean) })}
                  disabled={disabled}
                />
              </div>
              <div>
                <Label className="text-xs">Evidence to cite</Label>
                <Input value={it.evidence ?? ""} onChange={(e) => update(i, { evidence: e.target.value })} disabled={disabled} placeholder="e.g. Eurocontrol stat, customer quote, platform module" />
              </div>
            </>
          )}

          {kind === "social" && (
            <>
              <div>
                <Label className="text-xs">Hook (line 1)</Label>
                <Input value={it.hook ?? ""} onChange={(e) => update(i, { hook: e.target.value })} disabled={disabled} />
              </div>
              <div>
                <Label className="text-xs">Body lines (one per line)</Label>
                <Textarea
                  rows={4}
                  value={(it.body_lines ?? []).join("\n")}
                  onChange={(e) => update(i, { body_lines: e.target.value.split("\n") })}
                  disabled={disabled}
                />
              </div>
              <div>
                <Label className="text-xs">Closing question</Label>
                <Input value={it.closing_question ?? ""} onChange={(e) => update(i, { closing_question: e.target.value })} disabled={disabled} />
              </div>
              <div>
                <Label className="text-xs">Hashtags (comma-separated)</Label>
                <Input
                  value={(it.hashtags ?? []).join(", ")}
                  onChange={(e) => update(i, { hashtags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                  disabled={disabled}
                />
              </div>
            </>
          )}

          {kind === "scenes" && (
            <>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <div>
                  <Label className="text-xs">Duration (s)</Label>
                  <Input
                    type="number"
                    value={it.duration_seconds ?? 30}
                    onChange={(e) => update(i, { duration_seconds: parseInt(e.target.value || "0", 10) })}
                    disabled={disabled}
                  />
                </div>
                <div>
                  <Label className="text-xs">On-screen text</Label>
                  <Input value={it.on_screen_text ?? ""} onChange={(e) => update(i, { on_screen_text: e.target.value })} disabled={disabled} />
                </div>
              </div>
              <div>
                <Label className="text-xs">VISUAL</Label>
                <Textarea rows={2} value={it.visual ?? ""} onChange={(e) => update(i, { visual: e.target.value })} disabled={disabled} placeholder="What the viewer SEES" />
              </div>
              <div>
                <Label className="text-xs">SCRIPT beats (one per line)</Label>
                <Textarea
                  rows={3}
                  value={(it.script_beats ?? []).join("\n")}
                  onChange={(e) => update(i, { script_beats: e.target.value.split("\n").filter(Boolean) })}
                  disabled={disabled}
                  placeholder="What the narrator SAYS"
                />
              </div>
            </>
          )}
        </div>
      ))}

      {!disabled && (
        <Button size="sm" variant="outline" onClick={add}>
          <Plus className="w-3 h-3 mr-1" /> Add {kind === "scenes" ? "scene" : kind === "social" ? "block" : "section"}
        </Button>
      )}
    </div>
  );
}