import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TranscriptTurn { role: "rep" | "buyer"; text: string }

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { scenarioTitle, personaTitle, difficulty, transcript, keyMessages } = await req.json() as {
      scenarioTitle: string;
      personaTitle: string;
      difficulty: string;
      transcript: TranscriptTurn[];
      keyMessages: string[];
    };

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    if (!Array.isArray(transcript) || transcript.length === 0) {
      throw new Error("Transcript is empty");
    }

    const transcriptText = transcript
      .map((t) => `${t.role === "rep" ? "REP" : "BUYER"}: ${t.text}`)
      .join("\n");

    const system = `You are a sales coach grading a Comply365 sales rep's role-play with a simulated buyer.
Scenario: ${scenarioTitle}
Buyer persona: ${personaTitle} (${difficulty} difficulty)

Key messages the rep should land:
${keyMessages.map((m) => `- ${m}`).join("\n")}

Score each rubric 0-5 and return strict JSON ONLY:
{
  "overall": number 0-100,
  "rubric": {
    "discovery": { "score": number, "feedback": string },
    "objectionHandling": { "score": number, "feedback": string },
    "messageAccuracy": { "score": number, "feedback": string },
    "terminologyCompliance": { "score": number, "feedback": string },
    "nextStepAsk": { "score": number, "feedback": string }
  },
  "strengths": string[],
  "improvements": string[],
  "missedKeyMessages": string[]
}
Terminology rules: must use 'Generative AI', 'Recommended Actions', 'Operational Data'. Forbidden: FOQA, FDM, ASAP. Product names have NO spaces: Comply365, SafetyManager365, ContentManager365.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Transcript:\n${transcriptText}\n\nReturn the JSON only.` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      throw new Error(`AI gateway error ${r.status}: ${err}`);
    }

    const data = await r.json();
    const content = data?.choices?.[0]?.message?.content ?? "{}";
    let parsed: unknown;
    try { parsed = JSON.parse(content); } catch { parsed = { raw: content }; }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("roleplay-score error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});