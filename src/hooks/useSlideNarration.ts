import { useState, useEffect, useRef, useCallback } from "react";
import { slideNarrations, getSlideNarration } from "@/data/slideNarration";

interface NarrationState {
  isPlaying: boolean;
  isMuted: boolean;
  isLoading: boolean;
  currentSlide: number;
  progress: number;
  error: string | null;
}

interface UseSlideNarrationReturn extends NarrationState {
  toggleMute: () => void;
  stopNarration: () => void;
  playNarration: (slideId: number) => Promise<void>;
  audioCache: Map<number, string>;
  preloadSlide: (slideId: number) => Promise<void>;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const useSlideNarration = (activeSlide: number): UseSlideNarrationReturn => {
  const [state, setState] = useState<NarrationState>({
    isPlaying: false,
    isMuted: false,
    isLoading: false,
    currentSlide: -1,
    progress: 0,
    error: null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Map<number, string>>(new Map());
  const lastPlayedSlideRef = useRef<number>(-1);

  // Generate audio for a slide
  const generateAudio = useCallback(async (slideId: number): Promise<string> => {
    // Check cache first
    if (audioCacheRef.current.has(slideId)) {
      return audioCacheRef.current.get(slideId)!;
    }

    const narration = getSlideNarration(slideId);
    if (!narration) {
      throw new Error(`No narration found for slide ${slideId}`);
    }

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/elevenlabs-tts`,
      {
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
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to generate audio: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Cache the audio URL
    audioCacheRef.current.set(slideId, audioUrl);
    
    return audioUrl;
  }, []);

  // Preload a slide's audio
  const preloadSlide = useCallback(async (slideId: number) => {
    if (audioCacheRef.current.has(slideId)) return;
    
    try {
      await generateAudio(slideId);
      console.log(`Preloaded audio for slide ${slideId}`);
    } catch (error) {
      console.warn(`Failed to preload slide ${slideId}:`, error);
    }
  }, [generateAudio]);

  // Play narration for a specific slide
  const playNarration = useCallback(async (slideId: number) => {
    if (state.isMuted) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Stop current audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audioUrl = await generateAudio(slideId);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Track progress
      audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
          setState(prev => ({
            ...prev,
            progress: (audio.currentTime / audio.duration) * 100,
          }));
        }
      });

      audio.addEventListener("ended", () => {
        setState(prev => ({
          ...prev,
          isPlaying: false,
          progress: 0,
        }));
      });

      audio.addEventListener("error", (e) => {
        console.error("Audio playback error:", e);
        setState(prev => ({
          ...prev,
          isPlaying: false,
          isLoading: false,
          error: "Audio playback failed",
        }));
      });

      await audio.play();
      
      setState(prev => ({
        ...prev,
        isPlaying: true,
        isLoading: false,
        currentSlide: slideId,
      }));

      // Preload next slide
      if (slideId < slideNarrations.length - 1) {
        preloadSlide(slideId + 1);
      }

    } catch (error) {
      console.error("Narration error:", error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to play narration",
      }));
    }
  }, [state.isMuted, generateAudio, preloadSlide]);

  // Stop narration
  const stopNarration = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState(prev => ({
      ...prev,
      isPlaying: false,
      progress: 0,
    }));
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setState(prev => {
      const newMuted = !prev.isMuted;
      
      if (newMuted && audioRef.current) {
        audioRef.current.pause();
      }
      
      return {
        ...prev,
        isMuted: newMuted,
        isPlaying: newMuted ? false : prev.isPlaying,
      };
    });
  }, []);

  // Auto-play when slide changes
  useEffect(() => {
    if (activeSlide !== lastPlayedSlideRef.current && !state.isMuted) {
      lastPlayedSlideRef.current = activeSlide;
      playNarration(activeSlide);
    }
  }, [activeSlide, state.isMuted, playNarration]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "m" || e.key === "M") {
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleMute]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Clean up cached blob URLs
      audioCacheRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return {
    ...state,
    toggleMute,
    stopNarration,
    playNarration,
    audioCache: audioCacheRef.current,
    preloadSlide,
  };
};
