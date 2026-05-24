// Generates per-act voiceover MP3s (Brian) + a 2-minute music bed via ElevenLabs.
// Run: ELEVENLABS_API_KEY=... node remotion/scripts/generate-audio.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_VO = path.resolve(__dirname, "../public/audio/vo");
const OUT_SCORE = path.resolve(__dirname, "../public/audio/score.mp3");
fs.mkdirSync(OUT_VO, { recursive: true });

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) throw new Error("ELEVENLABS_API_KEY missing");

const BRIAN = "nPczCjzI2devNBz1zQrb";

const ACTS = [
  { id: "act1", text: "Every operator runs on signals they'll never see. A near-miss in the cockpit. A pattern in the data. A line in a regulation that just changed. The signal is there. The system isn't listening." },
  { id: "act2", text: "We built three silos to keep operations safe. Safety. Content. Training. Each one is brilliant on its own. None of them talk. About sixty-five percent of operational signals never make it home. The industry carries twenty-five to thirty-five billion dollars in avoidable annual exposure. And today, a single cross-silo signal takes five to seven days to resolve, pulling people from every team. The operation is reacting to events, not controlling them. This isn't a tooling problem. It's an architecture problem." },
  { id: "act3", text: "Tuesday, six fourteen. A single safety signal blinks. Seen by one system. Acted on by none. By Friday, it was an incident." },
  { id: "act4", text: "So we named the new game. One operating model. Four moves. Detect — see every signal, across every system, role and silo. Trigger — turn that signal into an obligation the operation can act on. Orchestrate — route the right work, to the right hands, at the right moment. Prove — close the loop with auditable evidence of the outcome. This is how a silo becomes a signal. And a signal becomes control." },
  { id: "act5", text: "On the frontline. On the flight deck. In the control room. The same operating model, threading every decision. Time-to-resolve drops by around seventy percent. Coordination cost falls by a third. And teams act on three times more signals before they become incidents. Not a faster silo. A different operation." },
  { id: "act6", text: "From event. To control. Comply three sixty five." },
];

async function tts(text, prev, next) {
  const r = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${BRIAN}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        previous_text: prev,
        next_text: next,
        voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true, speed: 0.95 },
      }),
    }
  );
  if (!r.ok) throw new Error(`TTS ${r.status}: ${await r.text()}`);
  return Buffer.from(await r.arrayBuffer());
}

async function music() {
  const prompt = "Two-minute hybrid orchestral-electronic cinematic score. Opens dawn-grey with sparse piano and low sub-pulse. Tension builds with muted strings around forty-five seconds. At one minute, a hopeful turn — strings layered with warm synth pads and subtle electronic percussion. Triumphant orchestral swell at one minute thirty-five seconds. Soft resolved piano at one minute fifty-two seconds. Apple-keynote energy. Restrained, emotional, no vocals, no drums in the first sixty seconds.";
  const r = await fetch("https://api.elevenlabs.io/v1/music", {
    method: "POST",
    headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, music_length_ms: 120000 }),
  });
  if (!r.ok) throw new Error(`Music ${r.status}: ${await r.text()}`);
  return Buffer.from(await r.arrayBuffer());
}

for (let i = 0; i < ACTS.length; i++) {
  const a = ACTS[i];
  const prev = ACTS[i - 1]?.text;
  const next = ACTS[i + 1]?.text;
  console.log(`TTS ${a.id}...`);
  const buf = await tts(a.text, prev, next);
  fs.writeFileSync(path.join(OUT_VO, `${a.id}.mp3`), buf);
  console.log(`  -> ${buf.length} bytes`);
}

console.log("Music...");
const m = await music();
fs.writeFileSync(OUT_SCORE, m);
console.log(`  -> ${m.length} bytes`);
console.log("Done.");