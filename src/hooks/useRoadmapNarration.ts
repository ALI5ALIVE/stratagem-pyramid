import { useState, useRef, useCallback } from "react";
import { getRoadmapNarration } from "@/data/roadmapNarration";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface NarrationState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSlide: string | null;
  progress: number;
  hasCompleted: boolean;
}

export const useRoadmapNarration = () => {
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
    const narration = getRoadmapNarration(slideId);
    if (!narration) throw new Error(`No roadmap narration found for slide ${slideId}`);

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
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    cacheRef.current.set(slideId, audioUrl);
    return audioUrl;
  };

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setState((prev) => ({ ...prev, isPlaying: false, isLoading: false, progress: 0 }));
  }, []);

  const play = useCallback(
    async (slideId: string) => {
      stop();
      setState({ isPlaying: false, isLoading: true, currentSlide: slideId, progress: 0, hasCompleted: false });
      try {
        const audioUrl = await fetchAudio(slideId);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.ontimeupdate = () => {
          if (audio.duration) {
            setState((prev) => ({ ...prev, progress: (audio.currentTime / audio.duration) * 100 }));
          }
        };
        audio.onended = () => {
          setState((prev) => ({ ...prev, isPlaying: false, progress: 100, hasCompleted: true }));
        };
        audio.onerror = () => {
          setState((prev) => ({ ...prev, isPlaying: false, isLoading: false }));
        };
        await audio.play();
        setState((prev) => ({ ...prev, isPlaying: true, isLoading: false }));
      } catch (error) {
        console.error("Failed to play roadmap narration:", error);
        setState((prev) => ({ ...prev, isPlaying: false, isLoading: false }));
      }
    },
    [stop]
  );

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const resetCompleted = useCallback(() => {
    setState((prev) => ({ ...prev, hasCompleted: false, progress: 0 }));
  }, []);

  return { ...state, play, pause, stop, resetCompleted };
};