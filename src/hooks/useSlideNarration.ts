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
  const abortControllerRef = useRef<AbortController | null>(null);
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentAudioIdRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  
  // CRITICAL: Use ref for mute state to avoid stale closures in async callbacks
  const isMutedRef = useRef<boolean>(false);

  // Keep mute ref in sync with state
  useEffect(() => {
    isMutedRef.current = state.isMuted;
  }, [state.isMuted]);

  // Stop current audio and clean up
  const stopCurrentAudio = useCallback(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      // Remove all event listeners
      audio.onended = null;
      audio.ontimeupdate = null;
      audio.onerror = null;
      
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
      audio.load();
      
      audioRef.current = null;
    }
    isPlayingRef.current = false;
    setState(prev => ({
      ...prev,
      isPlaying: false,
      progress: 0,
    }));
  }, []);

  // Generate audio for a slide
  const generateAudio = useCallback(async (slideId: number, signal?: AbortSignal): Promise<string> => {
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
        signal,
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

  // Preload a slide's audio (uses its own abort controller)
  const preloadSlide = useCallback(async (slideId: number) => {
    if (audioCacheRef.current.has(slideId)) return;
    
    try {
      const controller = new AbortController();
      await generateAudio(slideId, controller.signal);
      console.log(`Preloaded audio for slide ${slideId}`);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.warn(`Failed to preload slide ${slideId}:`, error);
      }
    }
  }, [generateAudio]);

  // Play narration for a specific slide
  const playNarration = useCallback(async (slideId: number) => {
    // Use ref for reliable mute check in async context
    if (isMutedRef.current) return;

    // Generate unique ID for this playback attempt
    const playbackId = ++currentAudioIdRef.current;

    // Create new abort controller for this request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null, currentSlide: slideId }));

      // Stop any current audio
      stopCurrentAudio();
      await new Promise(resolve => setTimeout(resolve, 50));

      // Validate this is still the current playback
      if (playbackId !== currentAudioIdRef.current) {
        console.log(`Playback ${playbackId} for slide ${slideId} superseded during cleanup`);
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Check mute again after cleanup
      if (isMutedRef.current) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      const audioUrl = await generateAudio(slideId, abortControllerRef.current.signal);
      
      // Validate after async fetch
      if (playbackId !== currentAudioIdRef.current) {
        console.log(`Playback ${playbackId} for slide ${slideId} superseded after fetch`);
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Final mute check before playing
      if (isMutedRef.current) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      isPlayingRef.current = true;

      // Capture slide ID for this specific audio instance
      const audioSlideId = slideId;

      audio.ontimeupdate = () => {
        // Only update if this is still the current playback for this slide
        if (audio.duration && 
            playbackId === currentAudioIdRef.current) {
          setState(prev => ({
            ...prev,
            progress: (audio.currentTime / audio.duration) * 100,
          }));
        }
      };

      audio.onended = () => {
        if (playbackId === currentAudioIdRef.current) {
          console.log(`Audio ended for slide ${audioSlideId}`);
          isPlayingRef.current = false;
          setState(prev => ({
            ...prev,
            isPlaying: false,
            progress: 0,
          }));
        }
      };

      audio.onerror = (e) => {
        if (playbackId === currentAudioIdRef.current) {
          console.error(`Audio error for slide ${audioSlideId}:`, e);
          isPlayingRef.current = false;
          setState(prev => ({
            ...prev,
            isPlaying: false,
            isLoading: false,
            error: "Audio playback failed",
          }));
        }
      };

      await audio.play();
      
      // Final validation after play starts
      if (playbackId !== currentAudioIdRef.current) {
        audio.pause();
        return;
      }
      
      console.log(`Now playing narration for slide ${slideId}`);
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
      if (error instanceof Error && error.name === 'AbortError') {
        console.log(`Fetch aborted for slide ${slideId}`);
        return;
      }
      
      if (playbackId === currentAudioIdRef.current) {
        console.error("Narration error:", error);
        isPlayingRef.current = false;
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Failed to play narration",
        }));
      }
    }
  }, [generateAudio, preloadSlide, stopCurrentAudio]);

  // Stop narration
  const stopNarration = useCallback(() => {
    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    stopCurrentAudio();
  }, [stopCurrentAudio]);

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

  // Auto-play when slide changes - CRITICAL: uses refs for reliable state access
  useEffect(() => {
    // Immediately increment playback ID to invalidate any pending playback
    const currentPlaybackId = ++currentAudioIdRef.current;
    
    // Clear any pending playback timer
    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
    
    // Cancel any in-flight fetch requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    // Immediately stop current audio
    stopCurrentAudio();
    
    // Wait 500ms after slide change before starting narration
    playbackTimerRef.current = setTimeout(() => {
      // Verify this is still the current playback request
      if (currentPlaybackId !== currentAudioIdRef.current) {
        console.log(`Slide ${activeSlide} playback cancelled - superseded`);
        return;
      }
      
      // Check mute status using ref at execution time
      if (!isMutedRef.current) {
        lastPlayedSlideRef.current = activeSlide;
        playNarration(activeSlide);
      }
    }, 500);
    
    return () => {
      if (playbackTimerRef.current) {
        clearTimeout(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    };
  }, [activeSlide, stopCurrentAudio, playNarration]);

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
      if (playbackTimerRef.current) {
        clearTimeout(playbackTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
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
