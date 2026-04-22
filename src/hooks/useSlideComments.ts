import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SlideComment {
  id: string;
  deck_id: string;
  slide_id: string;
  user_id: string;
  parent_id: string | null;
  body: string;
  resolved: boolean;
  created_at: string;
  updated_at: string;
  profile?: { display_name: string; avatar_color: string };
}

export function useSlideComments(deckId: string | undefined, slideId: string | undefined) {
  const [comments, setComments] = useState<SlideComment[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!deckId || !slideId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("slide_comments")
      .select("*, profile:profiles!slide_comments_user_id_fkey(display_name, avatar_color)")
      .eq("deck_id", deckId)
      .eq("slide_id", slideId)
      .order("created_at", { ascending: true });
    if (error) console.error("Failed to load comments", error);
    if (!error && data) setComments(data as any);
    setLoading(false);
  }, [deckId, slideId]);

  useEffect(() => {
    load();
    if (!deckId || !slideId) return;
    const channel = supabase
      .channel(`comments-${deckId}-${slideId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "slide_comments", filter: `deck_id=eq.${deckId}` },
        () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [deckId, slideId, load]);

  const addComment = async (userId: string, body: string, parentId: string | null = null) => {
    const trimmed = body.trim();
    if (trimmed.length < 1 || trimmed.length > 2000) throw new Error("Comment must be 1–2000 characters");
    const { error } = await supabase.from("slide_comments").insert({
      deck_id: deckId!, slide_id: slideId!, user_id: userId, body: trimmed, parent_id: parentId,
    });
    if (error) throw error;
  };

  const toggleResolved = async (id: string, resolved: boolean) => {
    await supabase.from("slide_comments").update({ resolved }).eq("id", id);
  };

  const deleteComment = async (id: string) => {
    await supabase.from("slide_comments").delete().eq("id", id);
  };

  const editComment = async (id: string, body: string) => {
    const trimmed = body.trim();
    if (trimmed.length < 1 || trimmed.length > 2000) throw new Error("Comment must be 1–2000 characters");
    const { error } = await supabase
      .from("slide_comments")
      .update({ body: trimmed, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;
  };

  return { comments, loading, addComment, editComment, toggleResolved, deleteComment, reload: load };
}