export interface CoAnalystNarration {
  slideId: number;
  title: string;
  script: string;
  voiceId: string;
}

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

export const coanalystNarrations: CoAnalystNarration[] = [
  {
    slideId: 0,
    title: "CoAnalyst Playbook — Title",
    voiceId: DEFAULT_VOICE_ID,
    script: `Welcome to the CoAnalyst Positioning and Messaging Playbook. CoAnalyst is the intelligence layer of the Comply three six five Operational Performance Platform. It sits above the core product modules, Safety Manager, Content Manager, and Training Manager, transforming fragmented operational data into structured, actionable intelligence. The master message is simple: From reports to intelligence. From events to control. This playbook defines how we position, message, and sell CoAnalyst across every audience and channel.`,
  },
  {
    slideId: 1,
    title: "Executive Summary",
    voiceId: DEFAULT_VOICE_ID,
    script: `CoAnalyst is positioned as the intelligence engine that powers the entire Comply three six five platform. It is not a standalone product. It is the layer that activates siloed data and feeds the Detect, Trigger, Orchestrate, Prove operational model. The proof points are compelling: over ninety percent classification accuracy across aviation taxonomy, support for more than sixty languages, a seven-figure research and development investment in domain-specific AI, and a hybrid architecture combining large language models with aviation-trained classifiers. This is not generic AI bolted onto a workflow tool. This is purpose-built operational intelligence.`,
  },
  {
    slideId: 2,
    title: "The Intelligence Gap",
    voiceId: DEFAULT_VOICE_ID,
    script: `Airlines generate enormous volumes of operational data every day. Safety reports, audit findings, flight data events, maintenance records, crew feedback, passenger complaints, regulatory correspondence. The problem is not the volume of data. The problem is that it stays fragmented across systems that were never designed to talk to each other. Operational modules manage workflows. But no one is connecting the dots across domains. The industry is shifting from compliance-based oversight to performance-based oversight. That shift demands an intelligence layer that can process, enrich, and activate data across every operational domain. That is the gap CoAnalyst fills.`,
  },
  {
    slideId: 3,
    title: "Strategic Narrative",
    voiceId: DEFAULT_VOICE_ID,
    script: `The CoAnalyst story follows five phases. Today, airlines drown in operational data but lack the tools to extract meaning from it. The gap is clear: modules manage workflows, but intelligence stays trapped in silos. The shift is already underway. Regulators, boards, and operational leaders are demanding connected oversight, not just compliance checkboxes. CoAnalyst is the answer. It ingests data from every source, enriches it with aviation-trained AI, and delivers structured intelligence at four levels, from historical queries to predictive risk. The outcome is transformational: airlines move from reactive reporting to proactive, intelligence-driven operational performance.`,
  },
  {
    slideId: 4,
    title: "Product Positioning",
    voiceId: DEFAULT_VOICE_ID,
    script: `The positioning framework is precise. CoAnalyst is an AI-powered intelligence engine for safety, operations, and compliance leaders at commercial airlines and aviation organisations. The problem it solves is clear: critical operational data is fragmented across disconnected systems, making it impossible to detect patterns, predict risks, or prove performance. The timing is right because regulators are mandating performance-based oversight, and generic AI cannot handle aviation's complexity. The unique value is a hybrid AI architecture trained on aviation taxonomy, delivering over ninety percent accuracy where generic models fail. The proof is in production deployments processing millions of records across tier-one airlines.`,
  },
  {
    slideId: 5,
    title: "Messaging Architecture",
    voiceId: DEFAULT_VOICE_ID,
    script: `The messaging architecture is built on one master message: From Reports to Intelligence. From Events to Control. Five pillars support this. First, the shift from reporting to intelligence, turning unstructured data into classified, searchable knowledge. Second, from events to controls, connecting individual occurrences to systemic risk patterns. Third, aviation-trained intelligence, not generic AI, but models built on decades of aviation taxonomy. Fourth, measurable performance impact, quantified outcomes that boards and regulators can see. And fifth, scalable precision, accuracy that improves with volume rather than degrading. Every piece of content, every sales conversation, every campaign should ladder back to these five pillars.`,
  },
  {
    slideId: 6,
    title: "How It Works",
    voiceId: DEFAULT_VOICE_ID,
    script: `CoAnalyst delivers four levels of intelligence, from hindsight to foresight. Historical intelligence answers the question: what happened? It lets you query past events across years of data. Reactive intelligence answers: what is happening now? Real-time alerts and situational awareness. Proactive intelligence asks: what should we watch? Pattern detection and emerging hazard indicators that surface before incidents occur. And predictive intelligence answers: what is likely next? Likelihood modelling and forward-looking risk assessment. CoAnalyst is the intelligence layer that sits above operational systems. Other systems execute workflows. CoAnalyst enriches, structures, analyses, and activates the data that powers them.`,
  },
  {
    slideId: 7,
    title: "Business Outcomes",
    voiceId: DEFAULT_VOICE_ID,
    script: `Intelligence is only valuable if it connects to measurable business outcomes. CoAnalyst delivers across four dimensions. Time savings: analysts spend seventy percent less time on manual classification and report processing. Precision: over ninety percent accuracy in hazard classification means fewer missed risks and fewer false positives. Risk detection: cross-domain pattern analysis identifies emerging threats that siloed systems cannot see. And operational visibility: leadership gets a connected view of safety, compliance, and operational performance in real time. One safety director described it simply: CoAnalyst gave us the ability to see what we were missing. That is the business case. Not just efficiency, but intelligence that changes decisions.`,
  },
  {
    slideId: 8,
    title: "vs Generic AI",
    voiceId: DEFAULT_VOICE_ID,
    script: `The comparison with generic AI is stark. At surface level, general-purpose models like ChatGPT or Claude can summarise text and answer questions. But aviation intelligence requires depth. At level one and two categorisation, generic models perform adequately, around seventy to eighty percent accuracy. But at levels four and five, where taxonomy-specific classification matters most, generic accuracy drops to thirty to forty percent. CoAnalyst maintains over ninety percent accuracy at every level. The build versus buy argument is equally compelling. CoAnalyst represents years of domain-specific investment: curated aviation training data, regulatory framework mapping, hybrid model architecture, and continuous learning from production deployments. No airline R and D team can replicate this in-house cost-effectively.`,
  },
  {
    slideId: 9,
    title: "Persona Messaging",
    voiceId: DEFAULT_VOICE_ID,
    script: `Different stakeholders need different messages. Safety leaders care about hazard detection accuracy and regulatory confidence. Tell them CoAnalyst turns their safety data into predictive intelligence that regulators trust. Operations leaders care about efficiency and connected oversight. Show them how CoAnalyst eliminates manual classification and surfaces cross-domain patterns. Maintenance and engineering teams want technical depth and integration. Demonstrate the hybrid architecture and API connectivity. Airline executives want strategic value and competitive advantage. Frame CoAnalyst as the intelligence capability that differentiates their safety culture. And innovation leaders want scalability and future-readiness. Position CoAnalyst as the AI foundation that grows smarter with every data point.`,
  },
  {
    slideId: 10,
    title: "Objection Handling",
    voiceId: DEFAULT_VOICE_ID,
    script: `Every sales conversation surfaces objections. Here are the strategic responses. When they say their AI policy restricts external AI software, respond: customer data is never used to train public AI models from OpenAI, Microsoft, or any third party. CoAnalyst operates within a secure, isolated pipeline. Customer data is visible only to that customer, never shared across clients, and never leaves the controlled environment. We provide full transparency on our AI data architecture. When they say their safety team is building their own AI models, clarify: CoAnalyst complements internal AI projects, it does not compete with them. We have invested seven figures in domain-specific training across four thousand categories and ship new capabilities weekly. Their data science team's time is better spent on problems unique to their operation. When they say we are using ChatGPT on our own data, respond: generic models lack aviation taxonomy training and degrade at deep classification levels. When they say this is just analytics, clarify: analytics shows you dashboards. CoAnalyst creates the intelligence that makes those dashboards meaningful. When they say we will build it internally, ask: how many years of aviation AI training data do you have? CoAnalyst represents a seven-figure investment in domain-specific models you cannot replicate cost-effectively.`,
  },
  {
    slideId: 11,
    title: "Taglines & Lines",
    voiceId: DEFAULT_VOICE_ID,
    script: `This slide provides ready-to-use positioning language across three categories. Taglines for brand-level messaging, like: The intelligence layer aviation has been missing. Or: From data noise to operational clarity. Homepage headlines for digital channels, such as: Your operations generate the data. CoAnalyst generates the intelligence. And elevator pitches for conversations: CoAnalyst is the AI intelligence engine inside the Comply three six five platform. It processes safety, operations, and compliance data with aviation-trained models to deliver the intelligence that generic AI cannot. Every tagline, headline, and pitch ladders back to the master message: From reports to intelligence. From events to control.`,
  },
  {
    slideId: 12,
    title: "Website Messaging",
    voiceId: DEFAULT_VOICE_ID,
    script: `This slide provides ready-to-use copy for the CoAnalyst product page. The hero section leads with the intelligence gap: Your operations generate millions of data points. CoAnalyst turns them into intelligence. The value proposition section reinforces the four tiers from historical to predictive. The how it works section walks through the pipeline: ingest from any source, enrich with aviation-trained AI, deliver structured intelligence. The differentiators section highlights what makes CoAnalyst unique: hybrid architecture, domain training, production-proven accuracy. And the call to action drives toward a discovery conversation: See how CoAnalyst transforms your operational data into intelligence that changes decisions.`,
  },
  {
    slideId: 13,
    title: "Visual Narrative",
    voiceId: DEFAULT_VOICE_ID,
    script: `The visual narrative system defines seven concept designs that support CoAnalyst positioning across all channels. The industry shift visual shows the move from compliance to performance. The platform architecture shows CoAnalyst sitting above the three product modules. The intelligence pipeline illustrates the data flow from ingestion through enrichment to intelligence tiers. The maturity levels visual maps the four intelligence tiers from historical to predictive. The AI comparison contrasts CoAnalyst accuracy against generic models. The outcomes visual connects intelligence to measurable business results. And the master architecture brings everything together in a single connected view. These visuals should be consistent across presentations, website, collateral, and sales materials.`,
  },
  {
    slideId: 14,
    title: "Deck Structure",
    voiceId: DEFAULT_VOICE_ID,
    script: `The recommended positioning deck follows a ten-slide structure. Open with the industry shift to establish urgency. Present the intelligence gap to define the problem. Introduce CoAnalyst as the solution with the platform architecture. Walk through the four intelligence tiers. Show the comparison against generic AI. Present business outcomes with real metrics. Address the audience with persona-specific messaging. Close with a clear next step. The key strategic decisions are clear. CoAnalyst is positioned as an intelligence layer, not a standalone product. The narrative leads with the problem, not the technology. And every message ladders back to measurable operational outcomes. This playbook gives every team the tools to tell the CoAnalyst story consistently and compellingly.`,
  },
];

export const getCoAnalystNarration = (slideId: number): CoAnalystNarration | undefined => {
  return coanalystNarrations.find((n) => n.slideId === slideId);
};
