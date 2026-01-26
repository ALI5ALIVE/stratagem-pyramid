import { useState, useRef, useCallback } from "react";
import { getSlideNarration } from "@/data/slideNarration";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface NarrationState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSlide: number | null;
  progress: number;
  hasCompleted: boolean;
}

export const useSimpleNarration = () => {
  const [state, setState] = useState<NarrationState>({
    isPlaying: false,
    isLoading: false,
    currentSlide: null,
    progress: 0,
    hasCompleted: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Map<number, string>>(new Map());

  const fetchAudio = async (slideId: number): Promise<string> => {
    // Check cache first
    if (cacheRef.current.has(slideId)) {
      return cacheRef.current.get(slideId)!;
    }

    const narration = getSlideNarration(slideId);
    if (!narration) {
      throw new Error(`No narration found for slide ${slideId}`);
    }

    const response = await fetch(`${SUPABASE_URL}/functions/v1/elevenlabs-tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        text: narration.script,
        voiceId: narration.voiceId,
      }),
    });

    if (!response.ok) {
      throw new Error(`TTS request failed: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Cache the URL
    cacheRef.current.set(slideId, audioUrl);
    
    return audioUrl;
  };

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setState(prev => ({
      ...prev,
      isPlaying: false,
      isLoading: false,
      progress: 0,
    }));
  }, []);

  const play = useCallback(async (slideId: number) => {
    // Stop any current audio
    stop();

    setState({
      isPlaying: false,
      isLoading: true,
      currentSlide: slideId,
      progress: 0,
      hasCompleted: false,
    });

    try {
      const audioUrl = await fetchAudio(slideId);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.ontimeupdate = () => {
        if (audio.duration) {
          const progress = (audio.currentTime / audio.duration) * 100;
          setState(prev => ({ ...prev, progress }));
        }
      };

      audio.onended = () => {
        setState(prev => ({
          ...prev,
          isPlaying: false,
          progress: 100,
          hasCompleted: true,
        }));
      };

      audio.onerror = () => {
        console.error("Audio playback error");
        setState(prev => ({
          ...prev,
          isPlaying: false,
          isLoading: false,
        }));
      };

      await audio.play();
      
      setState(prev => ({
        ...prev,
        isPlaying: true,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to play narration:", error);
      setState(prev => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
      }));
    }
  }, [stop]);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && audioRef.current.paused && audioRef.current.currentTime > 0) {
      audioRef.current.play();
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, []);

  const resetCompleted = useCallback((slideId: number) => {
    if (state.currentSlide === slideId && state.hasCompleted) {
      setState(prev => ({ ...prev, hasCompleted: false, progress: 0 }));
    }
  }, [state.currentSlide, state.hasCompleted]);

  // Preload next slide's audio in background for faster playback
  const preloadNext = useCallback((currentSlideId: number) => {
    const nextSlideId = currentSlideId + 1;
    if (nextSlideId <= 15 && !cacheRef.current.has(nextSlideId)) {
      fetchAudio(nextSlideId).catch(() => {}); // Silent preload
    }
  }, []);

  return {
    ...state,
    play,
    pause,
    resume,
    stop,
    resetCompleted,
    preloadNext,
  };
};
