import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ApprovalStatus = "approved" | "changes_requested" | "pending";

export interface SlideApproval {
  id: string;
  deck_id: string;
  slide_id: string;
  user_id: string;
  status: ApprovalStatus;
  note: string | null;
  updated_at: string;
  profile?: { display_name: string; avatar_color: string };
}

export function useSlideApproval(deckId: string | undefined, slideId: string | undefined, userId: string | undefined) {
  const [approvals, setApprovals] = useState<SlideApproval[]>([]);

  const load = useCallback(async () => {
    if (!deckId || !slideId) return;
    const { data } = await supabase
      .from("slide_approvals")
      .select("*, profile:profiles!slide_approvals_user_id_fkey(display_name, avatar_color)")
      .eq("deck_id", deckId)
      .eq("slide_id", slideId);
    if (data) setApprovals(data as any);
  }, [deckId, slideId]);

  useEffect(() => {
    load();
    if (!deckId || !slideId) return;
    const channel = supabase
      .channel(`approvals-${deckId}-${slideId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "slide_approvals", filter: `deck_id=eq.${deckId}` },
        () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [deckId, slideId, load]);

  const myApproval = approvals.find((a) => a.user_id === userId) ?? null;

  const setStatus = async (status: ApprovalStatus, note?: string) => {
    if (!deckId || !slideId || !userId) return;
    await supabase.from("slide_approvals").upsert(
      { deck_id: deckId, slide_id: slideId, user_id: userId, status, note: note ?? null },
      { onConflict: "deck_id,slide_id,user_id" }
    );
  };

  return { approvals, myApproval, setStatus };
}