// Assembles markdown knowledge-base documents for the ElevenLabs roleplay
// agent from the same content shown in the app. Run on the client and
// shipped to the elevenlabs-kb-sync edge function for upload.

export interface KbDoc {
  name: string;
  text: string;
}

const NAME_PREFIX = "lovable:";

function joinNarration(
  slides: Array<{ slideId?: string | number; title?: string; script: string }>,
): string {
  return slides
    .map(
      (s) =>
        `## ${s.title ?? String(s.slideId ?? "")}\n\n${s.script.trim()}`,
    )
    .join("\n\n");
}

export async function buildKnowledgeDocs(): Promise<KbDoc[]> {
  const [
    exec,
    ops,
    tech,
    coa,
    co,
    pb,
    personas,
    scenarios,
  ] = await Promise.all([
    import("@/data/executivePitchNarration"),
    import("@/data/operationalPitchNarration"),
    import("@/data/technicalPitchNarration"),
    import("@/data/coanalystNarration"),
    import("@/data/customerOverviewNarration"),
    import("@/data/playbookNarrations"),
    import("@/data/personaProfiles"),
    import("@/data/practiceScenarios"),
  ]);

  const docs: KbDoc[] = [];

  docs.push({
    name: `${NAME_PREFIX}executive-pitch`,
    text: `# Executive Pitch — Slide Narrations\n\n${joinNarration(
      exec.executivePitchNarrations,
    )}`,
  });

  docs.push({
    name: `${NAME_PREFIX}operational-pitch`,
    text: `# Operational Pitch — Slide Narrations\n\n${joinNarration(
      ops.operationalPitchNarrations as any,
    )}`,
  });

  docs.push({
    name: `${NAME_PREFIX}technical-pitch`,
    text: `# Technical Pitch — Slide Narrations\n\n${joinNarration(
      tech.technicalPitchNarrations as any,
    )}`,
  });

  docs.push({
    name: `${NAME_PREFIX}coanalyst`,
    text: `# Intelligence Layer Playbook — Narrations\n\n${joinNarration(
      coa.coanalystNarrations as any,
    )}`,
  });

  docs.push({
    name: `${NAME_PREFIX}customer-overview`,
    text: `# Customer Overview — Narrations\n\n${joinNarration(
      co.customerOverviewNarrations as any,
    )}`,
  });

  // Specialist playbooks — group by prefix so each playbook is its own doc.
  const playbookEntries = Object.entries(pb.PLAYBOOK_NARRATIONS);
  const groups = new Map<string, Array<{ title: string; script: string }>>();
  for (const [key, val] of playbookEntries) {
    const group = key.split("-")[0]; // dtop, automation, insights, mobile, signals, regulation, platform
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push({ title: key, script: val.script });
  }
  for (const [group, slides] of groups.entries()) {
    docs.push({
      name: `${NAME_PREFIX}playbook-${group}`,
      text: `# ${group.toUpperCase()} Specialist Playbook\n\n${joinNarration(slides)}`,
    });
  }

  // Personas
  const personaText = (personas.personaProfiles as any[])
    .map((p) => {
      const lines: string[] = [];
      lines.push(`## ${p.title}`);
      lines.push(`Reports to: ${p.reportsTo}`);
      lines.push(`Org context: ${p.orgContext}`);
      lines.push(`Profile: ${p.profileSummary}`);
      if (p.strategicPriorities?.length)
        lines.push(`\n### Strategic priorities\n${p.strategicPriorities.map((s: string) => `- ${s}`).join("\n")}`);
      if (p.dailyPains?.length)
        lines.push(`\n### Daily pains\n${p.dailyPains.map((s: string) => `- ${s}`).join("\n")}`);
      if (p.objections?.length)
        lines.push(
          `\n### Common objections\n${p.objections
            .map((o: any) => `- "${o.objection}" — Response: ${o.response}`)
            .join("\n")}`,
        );
      if (p.discoveryQuestions?.length)
        lines.push(`\n### Discovery questions they ask\n${p.discoveryQuestions.map((s: string) => `- ${s}`).join("\n")}`);
      return lines.join("\n");
    })
    .join("\n\n---\n\n");
  docs.push({
    name: `${NAME_PREFIX}personas`,
    text: `# Buyer Personas — Comply365\n\n${personaText}`,
  });

  // Scenarios + key messages
  const scenarioText = (scenarios.practiceScenarios as any[])
    .map(
      (s) =>
        `## ${s.deckTitle} — Buyer: ${s.buyerLabel}\nSetup: ${s.setup}\nKey messages:\n${s.keyMessages
          .map((m: string) => `- ${m}`)
          .join("\n")}`,
    )
    .join("\n\n");
  docs.push({
    name: `${NAME_PREFIX}scenarios`,
    text: `# Practice Scenarios — Buyers, Setup, Key Messages\n\n${scenarioText}`,
  });

  // Terminology guardrails
  docs.push({
    name: `${NAME_PREFIX}terminology-and-rules`,
    text: [
      "# Comply365 Terminology & House Rules",
      "",
      "## Product naming (NO spaces)",
      "- Comply365",
      "- SafetyManager365",
      "- ContentManager365",
      "- TrainingManager365",
      "",
      "## Approved language",
      "- Use 'Generative AI', 'Recommended Actions', 'Operational Data'.",
      "- Never say FOQA, FDM, ASAP.",
      "",
      "## DTOP Operating Model",
      "Detect → Trigger → Orchestrate → Prove. Colors: D blue · T amber · O violet · P emerald.",
      "",
      "## Intelligence Layer headline",
      "~90% domain accuracy at L4–5 vs ~35% generic AI.",
      "",
      "## Master message",
      "From reports to intelligence. From events to control.",
    ].join("\n"),
  });

  return docs;
}

export const KB_NAME_PREFIX = NAME_PREFIX;