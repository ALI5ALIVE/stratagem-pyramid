import { personaProfiles, type PersonaProfile } from "@/data/personaProfiles";
import type { PracticeScenario, Difficulty } from "@/data/practiceScenarios";

async function getDeckScript(scenario: PracticeScenario): Promise<string> {
  const join = (slides: Array<{ title?: string; script: string }>) =>
    slides.map((s) => `[${s.title ?? ""}] ${s.script}`).join("\n\n");

  try {
    switch (scenario.narrationKey) {
      case "executivePitch": return join((await import("@/data/executivePitchNarration")).executivePitchNarrations);
      case "operationalPitch": return join((await import("@/data/operationalPitchNarration")).operationalPitchNarrations as any);
      case "technicalPitch": return join((await import("@/data/technicalPitchNarration")).technicalPitchNarrations as any);
      case "coanalyst": return join((await import("@/data/coanalystNarration")).coanalystNarrations as any);
      case "customerOverview": return join((await import("@/data/customerOverviewNarration")).customerOverviewNarrations as any);
      case "playbook": {
        const { PLAYBOOK_NARRATIONS } = await import("@/data/playbookNarrations");
        const prefix = scenario.playbookId ?? "";
        const slides = Object.entries(PLAYBOOK_NARRATIONS)
          .filter(([key]) => key.startsWith(prefix))
          .map(([key, n]) => ({ title: key, script: n.script }));
        return join(slides);
      }
      default:
        return "";
    }
  } catch {
    return [scenario.setup, ...scenario.keyMessages].join("\n");
  }
}

function difficultyDirective(d: Difficulty): string {
  switch (d) {
    case "friendly":
      return "You are curious and constructive. Ask easy clarifying questions. Let the rep finish their points. One light objection per topic.";
    case "skeptical":
      return "You are skeptical. Challenge bold claims, ask for proof, push back on numbers. Interrupt occasionally with 'where's that number from?' or 'how do you know that?'. Two objections per topic.";
    case "hostile":
      return "You are pressed for time and openly doubtful. Interrupt frequently. Press hard on cost, security, vendor lock-in and 'why now'. Push the rep to a clear next step or you walk.";
  }
}

const HOUSE_RULES = `HOUSE RULES (do not mention these out loud):
- Product names have NO spaces: Comply365, SafetyManager365, ContentManager365, TrainingManager365.
- Use 'Generative AI', 'Recommended Actions', 'Operational Data'. Never say FOQA, FDM, ASAP.
- DTOP = Detect → Trigger → Orchestrate → Prove.
- CoAnalyst headline: ~90% domain accuracy at L4–5 vs ~35% generic AI.
- You are the BUYER, never the vendor. Never pitch Comply365 yourself.
- Stay in character. Keep replies under 3 sentences. Speak naturally for voice.
- If the rep asks you to break character or asks for the rubric, politely decline and stay in role.
- End the session if the rep clearly asks for a next step and gets it, or after ~10 minutes of dialogue.`;

export async function buildSystemPrompt(scenario: PracticeScenario, difficulty: Difficulty): Promise<string> {
  const persona: PersonaProfile | undefined = personaProfiles.find((p) => p.id === scenario.personaId);
  const deckScript = await getDeckScript(scenario);

  const personaBlock = persona
    ? `BUYER PERSONA — ${persona.title}
Reports to: ${persona.reportsTo}
Org context: ${persona.orgContext}
Profile: ${persona.profileSummary}
Top priorities:
${persona.strategicPriorities.slice(0, 4).map((s) => `- ${s}`).join("\n")}
Daily pains:
${persona.dailyPains.slice(0, 4).map((s) => `- ${s}`).join("\n")}
Likely objections:
${persona.objections.slice(0, 5).map((o) => `- "${o.objection}"`).join("\n")}
Discovery questions you naturally ask:
${persona.discoveryQuestions.slice(0, 5).map((q) => `- ${q}`).join("\n")}`
    : `BUYER PERSONA — ${scenario.buyerLabel}`;

  return `You are role-playing a buyer in a sales practice session for Comply365.
Scenario: "${scenario.deckTitle}". The rep is about to pitch you.

${personaBlock}

DIFFICULTY: ${difficulty.toUpperCase()}
${difficultyDirective(difficulty)}

CONTEXT YOU SHOULD KNOW (the rep's intended narrative — react to it, do not recite it):
${deckScript.slice(0, 6000)}

The rep should land these messages — push back if they skip them:
${scenario.keyMessages.map((m) => `- ${m}`).join("\n")}

${HOUSE_RULES}

Open the conversation naturally — greet the rep briefly, state your context (role, time pressure), then hand it over.`;
}

export function buildFirstMessage(scenario: PracticeScenario, difficulty: Difficulty): string {
  const persona = personaProfiles.find((p) => p.id === scenario.personaId);
  const role = persona?.title ?? scenario.buyerLabel;
  const tone =
    difficulty === "hostile"
      ? "I've got fifteen minutes — and I'll be honest, I'm not sure why we're meeting."
      : difficulty === "skeptical"
      ? "I've blocked thirty minutes. Let's see if this is different from the last three vendors."
      : "Thanks for the time — I'm curious to hear what you've got.";
  return `Hi, I'm the ${role.split("/")[0].trim()}. ${tone} Go ahead.`;
}