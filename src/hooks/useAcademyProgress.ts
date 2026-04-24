import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface AcademyModule {
  id: string;
  module_number: number;
  title: string;
  learning_goal: string;
  estimated_minutes: number;
  slide_ids: string[];
  order_index: number;
  pass_threshold: number;
}

export interface ProgressRow {
  module_id: string;
  best_score: number;
  passed: boolean;
  attempts: number;
  last_attempt_at: string;
}

export function useAcademy() {
  const { user } = useAuth();
  const [modules, setModules] = useState<AcademyModule[]>([]);
  const [progress, setProgress] = useState<Record<string, ProgressRow>>({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: mods } = await supabase
      .from("academy_modules")
      .select("*")
      .order("order_index");
    setModules((mods ?? []) as AcademyModule[]);

    if (user) {
      const { data: prog } = await supabase
        .from("academy_progress_per_user")
        .select("*")
        .eq("user_id", user.id);
      const map: Record<string, ProgressRow> = {};
      (prog ?? []).forEach((r: any) => {
        map[r.module_id] = r as ProgressRow;
      });
      setProgress(map);
    } else {
      setProgress({});
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { modules, progress, loading, refresh };
}

export function isModuleUnlocked(
  module: AcademyModule,
  modules: AcademyModule[],
  progress: Record<string, ProgressRow>
) {
  if (module.order_index === 1) return true;
  const prev = modules.find((m) => m.order_index === module.order_index - 1);
  if (!prev) return true;
  return !!progress[prev.id]?.passed;
}