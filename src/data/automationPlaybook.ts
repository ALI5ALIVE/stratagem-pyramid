// Platform-wide Automation & Orchestration — Sales Enablement Playbook Data

export interface PainPoint {
  label: string;
  detail: string;
}

export interface HowItWorksStep {
  number: number;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  color: string;
  bg: string;
  border: string;
}

export interface AutomationUseCase {
  title: string;
  scenario: string;
  question: string;
  icon: string;
  steps: {
    ask: string;
    correlate: string;
    insight: string;
    recommend: string;
  };
  outcome: string;
  metric: string;
}

export interface ValuePillar {
  title: string;
  description: string;
  bullets: string[];
  shift: string;
  icon: string;
  color: string;
}

export interface AutomationPersona {
  role: string;
  careAbout: string;
  openWith: string;
  keyMessage: string;
  sampleQuestion: string;
  color: string;
}

export interface AutomationObjection {
  objection: string;
  response: string;
  reframe: string;
}

export interface CompetitiveContrast {
  approach: string;
  isUs: boolean;
  insight: string;
  speed: string;
  scope: string;
  intelligence: string;
}

// Hero
export const heroEyebrow = "POC — Foundation for the Platform Orchestration Layer";
export const heroTitle = "Platform-wide Automation & Orchestration";
export const heroTagline = "One automation layer across your entire operation.";
export const heroSubtitle =
  "A modern, embedded orchestration layer that connects training, content and safety workflows — and the third-party tools you already run.";
export const statusLabel = "Work in progress · Targeted completion April 2026";

// Slide 1 — Why it exists
export const whyItExists = {
  headline: "Today's automation is fragmented, inconsistent and hard to scale.",
  exposureLabel:
    "Every Comply365 product has its own automation story — different toolsets, different patterns, different limits. Customers feel the seams; engineering carries the cost.",
  problems: [
    {
      label: "Different Toolsets per Product",
      detail: "Authoring Hub, Publishing Hub, Training and Safety each automate in their own way — no shared model.",
    },
    {
      label: "Legacy + Custom Mix",
      detail: "A blend of legacy engines, open-source bits and bespoke code makes every change risky and slow.",
    },
    {
      label: "Inconsistent Capabilities",
      detail: "Some products have rich workflow automation; others have almost none. The customer experience is uneven.",
    },
    {
      label: "High Maintenance Cost",
      detail: "Engineering spends disproportionate time keeping bespoke automations alive instead of shipping value.",
    },
    {
      label: "Limited Scalability",
      detail: "Hard-coded workflows don't flex to new customers, new integrations or new operational patterns.",
    },
    {
      label: "Manual Coordination",
      detail: "Cross-product handoffs (publish → train → assure) still rely on people, email and tickets.",
    },
  ] as PainPoint[],
};

// Slide 2 — What it is
export const elevatorPitch = {
  oneLiner:
    "A modern, embedded no-code/low-code orchestration layer inside Comply365 — handling triggers, events, workflows, APIs and reusable connectors across every product and the third-party tools customers already use.",
  shifts: [
    { from: "Product-specific automation", to: "Platform-wide orchestration" },
    { from: "Custom code", to: "Reusable workflows" },
    { from: "Manual coordination", to: "Event-driven flows" },
    { from: "Bespoke integrations", to: "Native connectors" },
    { from: "Engineering bottleneck", to: "Configurable at scale" },
  ],
  exampleQuestion: "When a new procedure is published, assign training and verify compliance — automatically.",
  exampleAnswer:
    "ContentManager365 publish event triggers an orchestration: TrainingManager365 assigns the new module to the affected roles, SafetyManager365 logs the compliance checkpoint, and the team is notified in Teams. Zero custom code.",
};

// Slide 3 — How it works
export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: 1,
    title: "Event Trigger",
    tagline: "Something happens in the platform",
    description:
      "Any meaningful event across Comply365 — a publish, a training completion, a safety report, an external webhook — fires an event into the orchestration layer.",
    details: [
      "Native product events",
      "Webhook & API triggers",
      "Scheduled jobs",
      "Third-party events (Outlook, Teams)",
    ],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  {
    number: 2,
    title: "Orchestration Layer",
    tagline: "The shared automation fabric",
    description:
      "An embedded, modern orchestration engine routes the event through reusable workflows — no bespoke code, no duplicated logic per product.",
    details: [
      "No-code / low-code workflows",
      "Reusable connectors & components",
      "Centralised governance",
      "Versioned, observable, testable",
    ],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    number: 3,
    title: "Workflow Execution",
    tagline: "Cross-product steps run in order",
    description:
      "Workflows execute deterministic, multi-step logic across Training, Content, Safety and Compliance — with branching, retries and audit history built in.",
    details: [
      "Cross-product step sequencing",
      "Conditional branching & retries",
      "Audit trail per execution",
      "Configurable per customer",
    ],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    number: 4,
    title: "Connected Action",
    tagline: "Action lands where work happens",
    description:
      "The workflow completes the loop — inside Comply365 products and in the third-party tools the customer already uses (Outlook, Teams, Slack, identity providers, customer data sources).",
    details: [
      "In-product actions",
      "Native third-party connectors",
      "Customer data source integration",
      "No custom development required",
    ],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
];

// Slides 4-6 — Use cases
export const useCases: AutomationUseCase[] = [
  {
    title: "Training-Centric Automation",
    scenario:
      "A new airline customer is being onboarded — training records, course assignments and production rollouts must all happen without weeks of manual setup.",
    question: "Automate customer production, migration and onboarding for TrainingManager365.",
    icon: "GraduationCap",
    steps: {
      ask: "An onboarding event fires — a new customer tenant, a migration milestone or a production cutover in TrainingManager365.",
      correlate:
        "The orchestration layer reads the customer profile, role mappings, course catalogue and migration source — all from existing platform data.",
      insight:
        "A reusable training onboarding workflow runs: tenant provisioning, role-to-course mapping, learner imports and assignment generation — consistently across every customer.",
      recommend:
        "Action: TrainingManager365 is production-ready for the new customer in hours, not weeks. Engineering effort drops sharply per onboarding.",
    },
    outcome: "Onboarding and migration shift from bespoke project to repeatable workflow",
    metric: "Weeks → hours",
  },
  {
    title: "Cross-Product Workflows",
    scenario:
      "A new procedure is published in ContentManager365. It needs to flow into training, get acknowledged, and be tracked for compliance — without anyone chasing it.",
    question: "When a procedure is published, assign training and verify compliance automatically.",
    icon: "Workflow",
    steps: {
      ask: "ContentManager365 fires a 'procedure published' event with metadata — affected roles, criticality, effective date.",
      correlate:
        "The orchestration layer joins the affected roles to TrainingManager365 assignments, opens a SafetyManager365 compliance checkpoint and notifies the relevant operational owners.",
      insight:
        "Training is auto-assigned to the right population, the safety system tracks acknowledgement, and exceptions surface automatically — all from one publish event.",
      recommend:
        "Action: closed-loop training and compliance for every new procedure, with an auditable trail of who was assigned, when, and what was acknowledged.",
    },
    outcome: "Publish → Train → Assure runs as one connected flow",
    metric: "Zero manual handoffs",
  },
  {
    title: "Third-Party Integration",
    scenario:
      "Customers want Comply365 to land in Outlook, Teams and their own identity and data systems — without a custom integration project for each.",
    question: "Notify in Teams, sync with Outlook and pull customer data — without custom development.",
    icon: "Plug",
    steps: {
      ask: "A platform event needs to reach a customer's existing tooling — a notification in Teams, a calendar entry in Outlook, a sync to a customer data source.",
      correlate:
        "Reusable native connectors (Outlook, Teams, Slack, identity providers, customer data systems) are already configured in the orchestration layer.",
      insight:
        "The workflow uses pre-built connectors instead of bespoke integration code — secure, governed, observable and consistent across customers.",
      recommend:
        "Action: integrations land in days using configuration, not months of custom development. Maintenance burden moves from engineering to platform.",
    },
    outcome: "Integrations become configuration, not custom code",
    metric: "Months → days",
  },
];

// Slide 7 — Value pillars (external + internal)
export const valuePillars: ValuePillar[] = [
  {
    title: "One Automation Layer",
    description:
      "A single, consistent way to automate across every Comply365 product — no more product-by-product islands.",
    bullets: [
      "Shared orchestration model platform-wide",
      "Consistent customer experience across products",
      "One place to govern, observe and evolve automation",
    ],
    shift: "Product-specific automation → Platform-wide orchestration",
    icon: "Workflow",
    color: "text-blue-400",
  },
  {
    title: "Seamless Cross-Product Workflows",
    description:
      "Training, Content and Safety operate as connected workflows — events in one product trigger action in the others.",
    bullets: [
      "Publish → Train → Assure flows out of the box",
      "Event-driven instead of ticket-driven",
      "Closed-loop compliance and training",
    ],
    shift: "Manual coordination → Event-driven flows",
    icon: "GitBranch",
    color: "text-amber-400",
  },
  {
    title: "Integrate Without Custom Code",
    description:
      "Native connectors for the tools customers already run — Outlook, Teams, Slack, identity, customer data sources.",
    bullets: [
      "Reusable connectors, not bespoke integrations",
      "Configurable per customer in days",
      "No custom development per integration",
    ],
    shift: "Bespoke integrations → Native connectors",
    icon: "Plug",
    color: "text-emerald-400",
  },
  {
    title: "Faster Time-to-Value",
    description:
      "Onboarding, migration and customer-specific automation become repeatable workflows instead of bespoke projects.",
    bullets: [
      "Repeatable customer onboarding",
      "Standardised migrations",
      "Configurable, not coded",
    ],
    shift: "Engineering bottleneck → Configurable at scale",
    icon: "Rocket",
    color: "text-violet-400",
  },
  {
    title: "Future-Ready Platform",
    description:
      "A modern orchestration foundation that the rest of the platform — including AI and Insights — can plug into as it evolves.",
    bullets: [
      "Foundation for AI-driven automation",
      "Pairs with Insights & Recommended Actions",
      "Scales with new products and customers",
    ],
    shift: "Static automation → Future-ready orchestration",
    icon: "Sparkles",
    color: "text-rose-400",
  },
];

export const internalValue = {
  headline: "Why this matters for Comply365",
  points: [
    {
      title: "Standardisation across products",
      detail: "One orchestration model replaces a patchwork of legacy, open-source and custom automations.",
    },
    {
      title: "Faster delivery, lower engineering cost",
      detail: "Reusable workflows and connectors free engineering from bespoke automation maintenance.",
    },
    {
      title: "Scales onboarding and migration",
      detail: "Customer production, migration and onboarding become repeatable workflows — critical as we scale.",
    },
  ],
};

// Slide 8 — Personas
export const personas: AutomationPersona[] = [
  {
    role: "CIO / CTO",
    careAbout: "Architecture, governance, integration risk and total cost of ownership",
    openWith:
      "You don't want another integration project per product. You want one orchestration layer your team can govern.",
    keyMessage:
      "An embedded, modern orchestration layer inside Comply365 — reusable connectors, observable workflows, no bespoke automation per product to maintain.",
    sampleQuestion: "How do we standardise automation across the platform without owning an iPaaS ourselves?",
    color: "border-blue-500/30",
  },
  {
    role: "Head of Training",
    careAbout: "Speed of onboarding, migration and assignment accuracy",
    openWith:
      "Every new customer onboarding shouldn't be a project. With orchestration, it becomes a workflow.",
    keyMessage:
      "TrainingManager365 onboarding, migration and production cutover run as repeatable, configurable workflows — not bespoke engineering effort.",
    sampleQuestion: "How fast could we onboard a new airline if it was workflow-driven, not project-driven?",
    color: "border-emerald-500/30",
  },
  {
    role: "Head of Operations",
    careAbout: "Closed-loop processes across publish, train and assure",
    openWith:
      "When a new procedure goes live, who actually makes sure the right people get trained and acknowledge it? Today it's people. It should be the platform.",
    keyMessage:
      "Cross-product event-driven flows turn publish → train → assure into one connected process with a full audit trail.",
    sampleQuestion: "Where in your operation are people still chasing handoffs the system should be doing?",
    color: "border-violet-500/30",
  },
  {
    role: "Integration Lead",
    careAbout: "Outlook, Teams, identity, customer data sources — without custom code",
    openWith:
      "You shouldn't need a custom integration project for every customer's tooling. Native connectors handle it.",
    keyMessage:
      "Reusable native connectors (Outlook, Teams, Slack, identity providers, customer data) make integration a configuration task — secure, observable, and consistent.",
    sampleQuestion: "How many of your current integrations could be replaced by configurable connectors?",
    color: "border-amber-500/30",
  },
];

// Slide 9 — Why only Comply365
export const competitiveContrast: CompetitiveContrast[] = [
  {
    approach: "Bespoke per-product automation",
    isUs: false,
    insight: "Inconsistent",
    speed: "Slow to change",
    scope: "Single product",
    intelligence: "Hard-coded",
  },
  {
    approach: "Generic iPaaS bolt-on",
    isUs: false,
    insight: "External system",
    speed: "Fast to start",
    scope: "Outside the platform",
    intelligence: "Disconnected from product context",
  },
  {
    approach: "Custom integration projects",
    isUs: false,
    insight: "Per-customer code",
    speed: "Months per integration",
    scope: "One use case",
    intelligence: "None reusable",
  },
  {
    approach: "Comply365 Automation & Orchestration",
    isUs: true,
    insight: "Embedded in the platform",
    speed: "Configurable in days",
    scope: "Whole platform + 3rd party",
    intelligence: "Reusable connectors & workflows",
  },
];

export const moatStatements = [
  "Embedded inside Comply365 — not a separate iPaaS to license, integrate and govern.",
  "One orchestration model spans Training, Content, Safety and Compliance — only possible on a connected platform.",
  "Reusable connectors and workflows turn customer onboarding and integration from project work into configuration.",
  "A foundational layer the rest of the platform — including Insights and future AI — plugs into.",
];

export const competitiveExplanation =
  "Generic iPaaS tools sit outside the platform; bespoke per-product automation can't share workflows or governance. Embedded orchestration is the only model that gives customers consistency and us scale.";

// Slide 10 — Objections
export const objections: AutomationObjection[] = [
  {
    objection: "We already have an iPaaS / integration platform.",
    response:
      "Great — we can integrate with it. The orchestration layer inside Comply365 handles the cross-product workflows that your iPaaS doesn't see, and exposes events your team can consume.",
    reframe: "Your iPaaS handles enterprise integration. Ours handles cross-product workflow.",
  },
  {
    objection: "Why not just build automation per product?",
    response:
      "That's how we got here. A shared orchestration layer means new automations are configured once and reused — instead of rebuilt per product with different tools.",
    reframe: "Standardise the layer once. Configure forever.",
  },
  {
    objection: "Is this no-code or do we still need engineers?",
    response:
      "It's no-code / low-code for most workflows, with code-level extensibility where needed. Operational owners can configure; engineering keeps governance and complex logic.",
    reframe: "Configurable for the business. Extensible for engineering.",
  },
  {
    objection: "How does this relate to Insights & Recommendations?",
    response:
      "Insights surfaces what to do. Orchestration executes it. Together they close the loop from 'what's happening' to 'action taken' — the foundation of the Comply365 Intelligence Layer.",
    reframe: "Insights decides. Orchestration acts.",
  },
  {
    objection: "Is this real today?",
    response:
      "It's a working POC, targeted for completion in April 2026. We're sharing it now so customers can shape the workflows and connectors that matter most to them.",
    reframe: "Forward-looking, demonstrable today, customer-shaped.",
  },
];

// Slide 11 — Closing
export const positioningLine = "From product-specific automation → platform-wide orchestration.";

export const elevatorClosePitch =
  "Comply365 is unifying automation into a single orchestration layer — embedded in the platform, configurable by customers, and connected to the third-party tools they already run. Onboarding becomes a workflow. Cross-product handoffs become events. Integrations become configuration.";

export const talkingPoints = [
  "Position as the Platform Orchestration Layer — the automation foundation beneath every Comply365 product.",
  "Lead with the customer outcome: faster onboarding, closed-loop publish-to-train, integrations without custom code.",
  "Anchor on the five shifts: product-specific → platform-wide; custom → reusable; manual → event-driven; bespoke → native connectors; bottleneck → configurable.",
  "Be explicit about status: this is a POC, targeted for April 2026 completion. Position as forward-looking and shape-able.",
  "Don't name the underlying engine externally — refer to it as the embedded orchestration layer.",
];

export const discoveryQuestions = [
  "Where in your operation are people still chasing handoffs that the platform should be running automatically?",
  "How long does a new customer onboarding currently take — and how much of it is one-off engineering?",
  "Which third-party tools (Outlook, Teams, identity, data sources) do you most want Comply365 to land inside natively?",
  "If you could turn your most painful cross-product handoff into a single event-driven workflow, which one would you start with?",
];

export const nextSteps = [
  {
    step: "Live Demo",
    description: "Walk a customer through a working orchestration scenario — publish → train → notify in Teams.",
    timeline: "60 minutes",
  },
  {
    step: "Discovery Workshop",
    description: "Identify the top 3 cross-product workflows and the top 3 third-party connectors that matter most.",
    timeline: "Half-day",
  },
  {
    step: "Design Partner Program",
    description: "Shape the April 2026 release as a co-design partner for the Platform Orchestration Layer.",
    timeline: "Q1–Q2 2026",
  },
];
