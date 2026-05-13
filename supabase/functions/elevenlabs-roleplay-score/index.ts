import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TranscriptTurn { role: "rep" | "buyer"; text: string }

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const {
      scenarioTitle, personaTitle, difficulty, transcript, keyMessages,
      personaLens, decisionCriteria = [], objections = [], slides = [], slidesShown = [],
    } = await req.json() as {
      scenarioTitle: string;
      personaTitle: string;
      difficulty: string;
      transcript: TranscriptTurn[];
      keyMessages: string[];
      personaLens?: string;
      decisionCriteria?: string[];
      objections?: string[];
      slides?: string[];
      slidesShown?: string[];
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
Be specific, use direct rep quotes, and reward persona-fit answers.

Scenario: ${scenarioTitle}
Buyer persona: ${personaTitle} (${difficulty} difficulty)
${personaLens ? `Buyer lens: ${personaLens}` : ""}

Key messages the rep should land (mark each as landed/missed in keyMessageStatus):
${keyMessages.map((m) => `- ${m}`).join("\n")}

${decisionCriteria.length ? `Persona decision criteria — reward answers that hit these:\n${decisionCriteria.map((d) => `- ${d}`).join("\n")}\n` : ""}
${objections.length ? `Persona objections — for EACH one, judge whether the rep addressed it and how well:\n${objections.map((o) => `- ${o}`).join("\n")}\n` : ""}
${slides.length ? `Deck slides (full deck): ${slides.join(" | ")}` : ""}
${slidesShown.length ? `Slides the rep actually presented (in order): ${slidesShown.join(" | ")}` : ""}

Return strict JSON ONLY in this exact shape:
{
  "overall": number 0-100,
  "rubric": {
    "discovery":            { "score": number 0-5, "feedback": string, "quote": string },
    "objectionHandling":    { "score": number 0-5, "feedback": string, "quote": string },
    "messageAccuracy":      { "score": number 0-5, "feedback": string, "quote": string },
    "terminologyCompliance":{ "score": number 0-5, "feedback": string, "quote": string },
    "nextStepAsk":          { "score": number 0-5, "feedback": string, "quote": string },
    "personaFit":           { "score": number 0-5, "feedback": string, "quote": string },
    "slideCoverage":        { "score": number 0-5, "feedback": string, "quote": string }
  },
  "keyMessageStatus": [{ "message": string, "landed": boolean, "evidence": string }],
  "objectionsAnswered": [{ "objection": string, "addressed": boolean, "quality": number 0-5, "comment": string }],
  "strengths": string[],
  "improvements": string[],
  "missedKeyMessages": string[],
  "coachingScript": string[]   // exactly 3 short one-line drills the rep should rehearse next time
}

Rules:
- "quote" must be a direct snippet from the REP turns; if there is no relevant quote, use "".
- "personaFit" grades how well the rep tailored to the buyer's lens (${personaLens || "n/a"}).
- "slideCoverage" grades whether the rep covered the right slides for this persona — penalise skipping critical ones.
- Terminology: must use 'Generative AI', 'Recommended Actions', 'Operational Data'. Forbidden: FOQA, FDM, ASAP. Product names have NO spaces: Comply365, SafetyManager365, ContentManager365, TrainingManager365.`;

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