export interface LineOfSightNarrationEntry {
  viewId: "calculator" | "tree" | "scorecard";
  title: string;
  script: string;
  voiceId: string;
}

const GEORGE_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

export const lineOfSightNarrations: LineOfSightNarrationEntry[] = [
  {
    viewId: "calculator",
    title: "Calculator Walkthrough",
    voiceId: GEORGE_VOICE_ID,
    script: `Welcome to the Line of Sight calculator. This tool shows you exactly how operational improvements flow upward into executive outcomes that matter to your board.

The layout follows a three-tier cascade. At the bottom, you'll see individual use case cards -- things like baggage mishandling rate, fuel variance, or crew overtime hours. Each card has a slider you can drag to model what happens when that metric improves.

In the middle, you'll see leading operational measures. These are computed automatically from the use case sliders below them. They represent the intermediate metrics that connect daily operations to strategic outcomes.

At the top, executive outcomes show the numbers your C-F-O, C-E-O, and C-O-O care about most -- cost per available seat mile, on-time performance, revenue per flight, and total cost avoidance. Switch between stakeholder tabs to see how each executive's key metrics are affected.

Before you start adjusting sliders, click on "Your Airline" to expand the profile panel. Here you can set your fleet size, annual fuel spend, daily departures, passenger volume, and revenue per flight. These inputs scale every calculation in the model, so the cost avoidance figures reflect your airline's actual operating context. You can also pick a preset -- regional, mid-size, or major -- as a starting point.

Try dragging a slider now. You'll see the leading measures update instantly, and the executive outcomes at the top will shift in response. The annual cost avoidance figure in the top right shows the total dollar impact across all use cases combined.

Every improvement is powered by Comply three six five's Detect, Trigger, Orchestrate, Prove framework. That means the platform doesn't just measure change -- it creates the conditions for change through orchestrated procedure updates and targeted training delivery.`
  },
  {
    viewId: "tree",
    title: "KPI Tree Walkthrough",
    voiceId: GEORGE_VOICE_ID,
    script: `This is the K-P-I Connection Tree. It gives you a visual map of how every use case connects through to executive outcomes.

At the bottom row, you see the same eight use cases from the calculator -- baggage rates, fuel variance, crew overtime, and so on. In the middle row are the leading operational measures. And at the top, the three executive stakeholder cards: C-F-O, C-E-O, and C-O-O.

The lines between them show the strength and direction of each connection. Thicker lines mean a stronger relationship. The colour of each line corresponds to the executive it ultimately serves -- green for the C-F-O, amber for the C-E-O, and blue for the C-O-O.

Try hovering over one of the executive cards at the top. When you do, all the connected paths light up in that executive's colour, and everything else fades out. This makes it easy to trace exactly which use cases drive a specific board-level outcome.

You can also hover over a use case at the bottom to see which measures and outcomes it feeds into, or hover a leading measure in the middle to see its connections in both directions.

The values shown on each node are live -- they reflect whatever you set on the calculator sliders. If you go back and adjust a use case, then return here, the tree will show the updated values and the same connections.

This view is particularly useful in stakeholder conversations. It lets you show a C-F-O exactly which operational levers drive their cost metrics, or show a C-O-O how ground handling improvements flow into on-time performance.`
  },
  {
    viewId: "scorecard",
    title: "Scorecard Walkthrough",
    voiceId: GEORGE_VOICE_ID,
    script: `The Balanced Scorecard presents your Line of Sight data through the classic four-perspective strategic framework.

Each quadrant represents one perspective. Financial perspective at the top left tracks cost-related metrics like cost per available seat mile and total cost avoidance. Customer perspective at the top right focuses on passenger-facing outcomes like on-time performance and mishandled baggage rates.

Internal Process perspective at the bottom left covers operational efficiency -- schedule reliability, fuel efficiency, and turnaround metrics. And Learning and Growth at the bottom right tracks the capability-building foundations like training completion, procedure currency, and compliance rates.

Inside each quadrant, you'll see individual K-P-I tiles. Each tile shows the current value, the change from baseline with a green or red indicator, and a small progress bar showing how much improvement has been achieved relative to the baseline.

The overall improvement percentage in the top right aggregates progress across all four perspectives, giving you a single number for how much the platform is shifting the needle. Next to it, the total cost avoidance figure shows the combined dollar impact.

All of these values are driven by the same use case sliders from the calculator view. Adjusting a slider there will immediately update the scorecard here. This makes it easy to model different scenarios and see how they play out across all four strategic perspectives simultaneously.

The scorecard is ideal for board presentations and quarterly business reviews. It translates operational detail into the strategic language that executives use to evaluate platform investments.`
  },
];

export function getLineOfSightNarration(viewId: string): LineOfSightNarrationEntry | undefined {
  return lineOfSightNarrations.find((n) => n.viewId === viewId);
}
