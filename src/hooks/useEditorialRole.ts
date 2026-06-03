import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type EditorialRole = "owner" | "editor" | "reviewer" | null;

export function useEditorialRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<EditorialRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (cancelled) return;
        const roles = (data ?? []).map((r) => r.role as string);
        if (roles.includes("owner")) setRole("owner");
        else if (roles.includes("editor")) setRole("editor");
        else if (roles.includes("reviewer")) setRole("reviewer");
        else setRole(null);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const canEdit = role === "owner" || role === "editor";
  return { role, canEdit, loading };
}