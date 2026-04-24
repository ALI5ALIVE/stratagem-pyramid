import { Link } from "react-router-dom";
import { useAcademy, isModuleUnlocked } from "@/hooks/useAcademyProgress";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Lock, PlayCircle, Award, ShieldCheck, ArrowRight, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AcademyHome() {
  const { user, profile } = useAuth();
  const { modules, progress, loading } = useAcademy();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "owner")
      .then(({ data }) => setIsOwner((data ?? []).length > 0));
  }, [user]);

  const passedCount = modules.filter((m) => progress[m.id]?.passed).length;
  const allDone = modules.length > 0 && passedCount === modules.length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-primary font-mono mb-1">Academy</div>
            <h1 className="text-2xl font-bold tracking-tight">Sales Enablement Academy</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Six 5-minute modules. Watch, then pass the quiz to mark each module complete.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isOwner && (
              <Button asChild variant="outline" size="sm">
                <Link to="/academy/admin"><ShieldCheck className="h-4 w-4 mr-1.5" />Admin</Link>
              </Button>
            )}
            {allDone && (
              <Button asChild size="sm">
                <Link to="/academy/certificate"><Award className="h-4 w-4 mr-1.5" />Certificate</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Hello {profile?.display_name ?? "there"} —
          </div>
          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${modules.length ? (passedCount / modules.length) * 100 : 0}%` }}
            />
          </div>
          <div className="text-sm font-medium text-foreground">
            {passedCount} / {modules.length} passed
          </div>
        </div>

        {loading ? (
          <div className="text-sm text-muted-foreground">Loading modules…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((m) => {
              const p = progress[m.id];
              const unlocked = isModuleUnlocked(m, modules, progress);
              const passed = !!p?.passed;
              const inProgress = !!p && !p.passed;
              return (
                <Card key={m.id} className={`p-5 ${!unlocked ? "opacity-60" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border border-primary/40 bg-primary/10 text-primary">
                        Module {m.module_number}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />~{m.estimated_minutes} min
                      </span>
                    </div>
                    {passed ? (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Passed · {p?.best_score}%
                      </span>
                    ) : !unlocked ? (
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Lock className="h-3 w-3" />Locked
                      </span>
                    ) : inProgress ? (
                      <span className="text-[11px] text-amber-500 font-medium">Best {p?.best_score}% · retry</span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">Not started</span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5 leading-snug">{m.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {m.learning_goal}
                  </p>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant={passed ? "outline" : "default"} disabled={!unlocked}>
                      <Link to={unlocked ? `/academy/${m.id}` : "#"}>
                        <PlayCircle className="h-4 w-4 mr-1.5" />
                        {passed ? "Re-watch" : "Start lesson"}
                      </Link>
                    </Button>
                    {(inProgress || unlocked) && (
                      <Button asChild size="sm" variant="ghost" disabled={!unlocked}>
                        <Link to={unlocked ? `/academy/${m.id}/quiz` : "#"}>
                          Take quiz <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-[11px] text-muted-foreground">
          Need the full deck? <Link to="/sales-enablement" className="text-primary hover:underline">Open the full Sales Enablement presentation →</Link>
        </div>
      </div>
    </div>
  );
}