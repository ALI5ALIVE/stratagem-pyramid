import { useCallback, useMemo, useRef, useState } from "react";
import { useConversation } from "@elevenlabs/react";
import { supabase } from "@/integrations/supabase/client";
import type { PracticeScenario, Difficulty } from "@/data/practiceScenarios";
import { buildSystemPrompt, buildFirstMessage } from "@/lib/practice/buildAgentPrompt";

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
}

export function useRoleplaySession(): UseRoleplaySession {
  const [transcript, setTranscript] = useState<TranscriptTurn[]>([]);
  const [partialUserText, setPartialUserText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [scoring, setScoring] = useState(false);
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [scoreError, setScoreError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const scenarioRef = useRef<PracticeScenario | null>(null);
  const difficultyRef = useRef<Difficulty | null>(null);

  const conversation = useConversation({
    onConnect: () => setError(null),
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    },
    onMessage: (message: any) => {
      // ElevenLabs sends a normalized shape with `source` + `message`
      const source: string | undefined = message?.source;
      const text: string | undefined = message?.message;
      if (!text) return;
      if (source === "user") {
        setTranscript((t) => [...t, { role: "rep", text, ts: Date.now() }]);
        setPartialUserText("");
      } else if (source === "ai") {
        setTranscript((t) => [...t, { role: "buyer", text, ts: Date.now() }]);
      }
    },
  });

  const start = useCallback(
    async (scenario: PracticeScenario, difficulty: Difficulty, agentId: string) => {
      setError(null);
      setScorecard(null);
      setScoreError(null);
      setTranscript([]);
      setPartialUserText("");
      scenarioRef.current = scenario;
      difficultyRef.current = difficulty;
      setConnecting(true);
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });

        const { data, error: fnError } = await supabase.functions.invoke(
          "elevenlabs-roleplay-token",
          { body: { agentId } },
        );
        if (fnError) throw new Error(fnError.message);
        if (!data?.token) throw new Error("No conversation token returned");

        const prompt = buildSystemPrompt(scenario, difficulty);
        const firstMessage = buildFirstMessage(scenario, difficulty);

        await conversation.startSession({
          conversationToken: data.token,
          connectionType: "webrtc",
          overrides: {
            agent: {
              prompt: { prompt },
              firstMessage,
            },
            tts: { voiceId: scenario.voiceId },
          },
        } as any);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to start session";
        setError(msg);
        throw e;
      } finally {
        setConnecting(false);
      }
    },
    [conversation],
  );

  const end = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (e) {
      // ignore
    }
  }, [conversation]);

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
      if ((data as any)?.error) throw new Error((data as any).error);
      setScorecard(data as Scorecard);
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

  const status = useMemo<"disconnected" | "connecting" | "connected">(() => {
    if (connecting) return "connecting";
    return conversation.status === "connected" ? "connected" : "disconnected";
  }, [conversation.status, connecting]);

  return {
    status,
    isSpeaking: conversation.isSpeaking,
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
  };
}