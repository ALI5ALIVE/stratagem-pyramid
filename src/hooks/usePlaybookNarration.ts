import { useCallback, useEffect, useRef, useState } from "react";
import { getPlaybookNarration } from "@/data/playbookNarrations";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface NarrationState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSlide: string | null;
  progress: number;
  hasCompleted: boolean;
}

/**
 * Generic narration controller used by every Specialist Playbook page
 * and by the Academy LessonScroller. Keys are string slide ids that match
 * the registry in src/data/playbookNarrations.ts.
 */
export const usePlaybookNarration = () => {
  const [state, setState] = useState<NarrationState>({
    isPlaying: false,
    isLoading: false,
    currentSlide: null,
    progress: 0,
    hasCompleted: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Map<string, string>>(new Map());

  const fetchAudio = async (slideId: string): Promise<string> => {
    if (cacheRef.current.has(slideId)) return cacheRef.current.get(slideId)!;
    const narration = getPlaybookNarration(slideId);
    if (!narration) throw new Error(`No playbook narration found for ${slideId}`);

    const response = await fetch(`${SUPABASE_URL}/functions/v1/elevenlabs-tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ text: narration.script, voiceId: narration.voiceId }),
    });
    if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    cacheRef.current.set(slideId, url);
    return url;
  };

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setState(prev => ({ ...prev, isPlaying: false, isLoading: false, progress: 0 }));
  }, []);

  const play = useCallback(async (slideId: string) => {
    stop();
    setState({ isPlaying: false, isLoading: true, currentSlide: slideId, progress: 0, hasCompleted: false });
    try {
      const url = await fetchAudio(slideId);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.ontimeupdate = () => {
        if (audio.duration) {
          const progress = (audio.currentTime / audio.duration) * 100;
          setState(prev => ({ ...prev, progress }));
        }
      };
      audio.onended = () => {
        setState(prev => ({ ...prev, isPlaying: false, progress: 100, hasCompleted: true }));
      };
      audio.onerror = () => {
        console.error("Audio playback error");
        setState(prev => ({ ...prev, isPlaying: false, isLoading: false }));
      };
      await audio.play();
      setState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
    } catch (err) {
      console.error("Failed to play playbook narration:", err);
      setState(prev => ({ ...prev, isPlaying: false, isLoading: false }));
    }
  }, [stop]);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  // Stop on unmount so audio doesn't leak across pages.
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { ...state, play, pause, stop };
};

export type PlaybookNarrationController = ReturnType<typeof usePlaybookNarration>;