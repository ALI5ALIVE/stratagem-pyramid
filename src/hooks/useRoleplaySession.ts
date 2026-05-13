import { useCallback, useRef, useState } from "react";
import { Conversation } from "@elevenlabs/react";
import type { Conversation as ElevenLabsConversation } from "@elevenlabs/react";
import { supabase } from "@/integrations/supabase/client";
import type { PracticeScenario, Difficulty } from "@/data/practiceScenarios";
import { buildSystemPrompt } from "@/lib/practice/buildAgentPrompt";

export interface TranscriptTurn {
  role: "rep" | "buyer";
  text: string;
  ts: number;
}

export interface Scorecard {
  overall: number;
  rubric: Record<string, { score: number; feedback: string }>;
  strengths: string[];
  improvements: string[];
  missedKeyMessages: string[];
}

export interface UseRoleplaySession {
  status: "disconnected" | "connecting" | "connected";
  isSpeaking: boolean;
  transcript: TranscriptTurn[];
  partialUserText: string;
  start: (scenario: PracticeScenario, difficulty: Difficulty, agentId: string) => Promise<void>;
  end: () => Promise<void>;
  scoring: boolean;
  scorecard: Scorecard | null;
  scoreError: string | null;
  scoreSession: () => Promise<void>;
  reset: () => void;
  error: string | null;
  sendContext: (text: string) => void;
}

export function useRoleplaySession(): UseRoleplaySession {
  const [transcript, setTranscript] = useState<TranscriptTurn[]>([]);
  const [partialUserText, setPartialUserText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [scoring, setScoring] = useState(false);
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [scoreError, setScoreError] = useState<string | null>(null);
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const scenarioRef = useRef<PracticeScenario | null>(null);
  const difficultyRef = useRef<Difficulty | null>(null);
  const conversationRef = useRef<ElevenLabsConversation | null>(null);
  const startingRef = useRef(false);
  const micStreamRef = useRef<MediaStream | null>(null);
  const contextSentRef = useRef(false);

  const appendMessage = useCallback((message: unknown) => {
    // ElevenLabs sends a normalized shape with `source` + `message`.
    const payload = message && typeof message === "object" ? message as { source?: unknown; message?: unknown } : {};
    const source = typeof payload.source === "string" ? payload.source : undefined;
    const text = typeof payload.message === "string" ? payload.message : undefined;
    if (!text) return;
    if (source === "user") {
      setTranscript((t) => [...t, { role: "rep", text, ts: Date.now() }]);
      setPartialUserText("");
    } else if (source === "ai") {
      setTranscript((t) => [...t, { role: "buyer", text, ts: Date.now() }]);
      // Send the scenario/persona context once, immediately AFTER the agent's
      // opening line. Sending earlier (in onConnect) interferes with VAD
      // turn-taking on this agent config and stops the agent from hearing
      // the rep's first reply.
      if (!contextSentRef.current && scenarioRef.current && difficultyRef.current) {
        contextSentRef.current = true;
        const sc = scenarioRef.current;
        const diff = difficultyRef.current;
        buildSystemPrompt(sc, diff)
          .then((prompt) => {
            try {
              conversationRef.current?.sendContextualUpdate(prompt);
            } catch (err) {
              console.warn("Contextual update failed", err);
            }
          })
          .catch((err) => console.warn("buildSystemPrompt failed", err));
      }
    }
  }, []);

  const normalizeError = (err: unknown) => {
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    if (err && typeof err === "object" && "message" in err && typeof (err as { message?: unknown }).message === "string") {
      return (err as { message: string }).message;
    }
    return "Failed to start session";
  };

  const start = useCallback(
    async (scenario: PracticeScenario, difficulty: Difficulty, agentId: string) => {
      if (startingRef.current || conversationRef.current) return;
      setError(null);
      setScorecard(null);
      setScoreError(null);
      setTranscript([]);
      setPartialUserText("");
      scenarioRef.current = scenario;
      difficultyRef.current = difficulty;
      startingRef.current = true;
      contextSentRef.current = false;
      setStatus("connecting");
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Microphone access is not available in this browser.");
        }
        // Pre-acquire the mic and KEEP the stream alive for the whole
        // session. Without this, some browsers hand the SDK a stream that
        // is never actually opened, so the agent can hear nothing.
        micStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

        const { data, error: fnError } = await supabase.functions.invoke(
          "elevenlabs-roleplay-token",
          { body: { agentId } },
        );
        if (fnError) throw new Error(fnError.message);
        const signedUrl = typeof data?.signedUrl === "string" ? data.signedUrl : null;
        if (!signedUrl) {
          throw new Error("No ElevenLabs signed URL returned");
        }

        const conversation = await Conversation.startSession({
          connectionType: "websocket",
          signedUrl,
          overrides: {
            tts: { voiceId: scenario.voiceId },
          },
          onConnect: () => {
            setError(null);
            setStatus("connected");
          },
          onDisconnect: (details) => {
            conversationRef.current = null;
            setIsSpeaking(false);
            setStatus("disconnected");
            micStreamRef.current?.getTracks().forEach((t) => t.stop());
            micStreamRef.current = null;
            if (details?.reason === "error") {
              setError(details.message || "The voice session disconnected before it could start.");
            }
          },
          onStatusChange: ({ status: nextStatus }) => {
            setStatus(nextStatus === "connected" ? "connected" : nextStatus === "connecting" ? "connecting" : "disconnected");
          },
          onModeChange: ({ mode }) => setIsSpeaking(mode === "speaking"),
          onMessage: appendMessage,
          onError: (message, context) => {
            setError(normalizeError(message));
            if (context) console.error("ElevenLabs roleplay error", context);
          },
        });
        conversationRef.current = conversation;
        setStatus("connected");
      } catch (e) {
        micStreamRef.current?.getTracks().forEach((t) => t.stop());
        micStreamRef.current = null;
        const msg = e instanceof Error ? e.message : "Failed to start session";
        setError(msg);
        setIsSpeaking(false);
        setStatus("disconnected");
        throw e;
      } finally {
        startingRef.current = false;
      }
    },
    [appendMessage],
  );

  const end = useCallback(async () => {
    const conversation = conversationRef.current;
    conversationRef.current = null;
    setIsSpeaking(false);
    setStatus("disconnected");
    try {
      await conversation?.endSession();
    } catch (e) {
      // ignore
    }
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
  }, []);

  const scoreSession = useCallback(async () => {
    const scenario = scenarioRef.current;
    const difficulty = difficultyRef.current;
    if (!scenario || !difficulty) {
      setScoreError("No session to score");
      return;
    }
    if (transcript.length === 0) {
      setScoreError("Transcript is empty — nothing to score");
      return;
    }
    setScoring(true);
    setScoreError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "elevenlabs-roleplay-score",
        {
          body: {
            scenarioTitle: scenario.deckTitle,
            personaTitle: scenario.buyerLabel,
            difficulty,
            transcript: transcript.map((t) => ({ role: t.role, text: t.text })),
            keyMessages: scenario.keyMessages,
          },
        },
      );
      if (fnError) throw new Error(fnError.message);
      const scoreResponse = data as (Scorecard & { error?: string });
      if (scoreResponse.error) throw new Error(scoreResponse.error);
      setScorecard(scoreResponse);
    } catch (e) {
      setScoreError(e instanceof Error ? e.message : "Scoring failed");
    } finally {
      setScoring(false);
    }
  }, [transcript]);

  const reset = useCallback(() => {
    setTranscript([]);
    setPartialUserText("");
    setScorecard(null);
    setScoreError(null);
    setError(null);
  }, []);

  const sendContext = useCallback((text: string) => {
    try {
      conversationRef.current?.sendContextualUpdate(text);
    } catch (err) {
      console.warn("sendContext failed", err);
    }
  }, []);

  return {
    status,
    isSpeaking,
    transcript,
    partialUserText,
    start,
    end,
    scoring,
    scorecard,
    scoreError,
    scoreSession,
    reset,
    error,
    sendContext,
  };
}