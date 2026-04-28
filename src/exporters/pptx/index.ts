import type { BuildOpts } from "./types";

export type { BuildOpts } from "./types";

export type DeckId =
  | "tech-deep-dive"
  | "executive-pitch"
  | "executive-pitch-3"
  | "customer-overview";

export interface DeckBuilder {
  filename: string;
  label: string;
  build: (opts: BuildOpts) => Promise<Blob>;
}

/**
 * IMPORTANT: each builder is loaded lazily so that the heavy `pptxgenjs`
 * dependency graph is only fetched when the user actually clicks "Download
 * Editable PowerPoint". Importing them eagerly here used to pull the entire
 * exporter stack into the initial route bundle and white-screen the app.
 */
export const DECK_BUILDERS: Record<DeckId, DeckBuilder> = {
  "tech-deep-dive": {
    filename: "Comply365-Technical-Deep-Dive.pptx",
    label: "Technical Deep Dive",
    build: async (opts) => {
      const { buildTechnicalDeck } = await import("./buildTechnicalDeck");
      return buildTechnicalDeck(opts);
    },
  },
  "executive-pitch": {
    filename: "Comply365-Executive-Pitch.pptx",
    label: "Executive Pitch",
    build: async (opts) => {
      const { buildExecutiveDeck } = await import("./buildExecutiveDeck");
      return buildExecutiveDeck(opts);
    },
  },
  "executive-pitch-3": {
    filename: "Comply365-Executive-Pitch-Medium.pptx",
    label: "Executive Pitch · Medium",
    build: async (opts) => {
      const { buildExecutivePitch3Deck } = await import("./buildExecutivePitch3Deck");
      return buildExecutivePitch3Deck(opts);
    },
  },
  "customer-overview": {
    filename: "Comply365-Customer-Overview.pptx",
    label: "Customer Overview",
    build: async (opts) => {
      const { buildCustomerOverviewDeck } = await import("./buildCustomerOverviewDeck");
      return buildCustomerOverviewDeck(opts);
    },
  },
};