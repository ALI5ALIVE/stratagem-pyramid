import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import { QUARTERS, STATUSES } from "@/data/editorialPlaybook";

interface Pillar {
  id: string;
  name: string;
  color: string;
  quarter: string;
}
interface Item {
  id: string;
  title: string;
  pillar_id: string | null;
  quarter: string;
  persona: string;
  channel: string;
  asset_type: string;
  status: string;
  due_date: string | null;
}

interface Props {
  pillars: Pillar[];
  items: Item[];
  canEdit: boolean;
  onCreate: (quarter: string, pillarId?: string) => void;
  onEdit: (item: Item) => void;
  onOpen: (item: Item) => void;
}

const STATUS_MAP = Object.fromEntries(STATUSES.map((s) => [s.id, s]));

export function CalendarView({ pillars, items, canEdit, onCreate, onEdit, onOpen }: Props) {
  const [personaFilter, setPersonaFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (personaFilter === "all" || i.persona === personaFilter) &&
          (statusFilter === "all" || i.status === statusFilter),
      ),
    [items, personaFilter, statusFilter],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Persona:</span>
          {["all", "exec", "ops", "tech"].map((p) => (
            <Button
              key={p}
              size="sm"
              variant={personaFilter === p ? "default" : "outline"}
              onClick={() => setPersonaFilter(p)}
            >
              {p}
            </Button>
          ))}
          <span className="text-sm text-muted-foreground ml-4">Status:</span>
          {["all", ...STATUSES.map((s) => s.id)].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={statusFilter === s ? "default" : "outline"}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </Button>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          {filtered.length} of {items.length} assets
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {QUARTERS.map((q) => {
          const qPillars = pillars.filter((p) => p.quarter === q);
          const qItems = filtered.filter((i) => i.quarter === q);
          return (
            <div key={q} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{q} 2026</h3>
                {canEdit && (
                  <Button size="sm" variant="ghost" onClick={() => onCreate(q)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {qPillars.map((pillar) => {
                const pItems = qItems.filter((i) => i.pillar_id === pillar.id);
                return (
                  <Card key={pillar.id} className="p-3 bg-card/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: pillar.color }}
                      />
                      <span className="text-sm font-semibold flex-1">{pillar.name}</span>
                      {canEdit && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => onCreate(q, pillar.id)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    {pItems.length === 0 && (
                      <p className="text-xs text-muted-foreground italic">No items yet</p>
                    )}
                    <div className="space-y-1.5">
                      {pItems.map((item) => {
                        const st = STATUS_MAP[item.status];
                        return (
                          <div
                            key={item.id}
                            className="group p-2 rounded border border-border/50 bg-background hover:border-primary cursor-pointer"
                            onClick={() => onOpen(item)}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-sm leading-tight flex-1">{item.title}</span>
                              {canEdit && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(item);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"
                                  aria-label="Edit"
                                >
                                  <Pencil className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                              <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                                {item.persona}
                              </Badge>
                              <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                                {item.channel}
                              </Badge>
                              {st && (
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded text-white ${st.color}`}
                                >
                                  {st.label}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}