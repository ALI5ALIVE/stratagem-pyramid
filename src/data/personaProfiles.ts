import { Briefcase, Shield, Plane, GraduationCap, Monitor } from "lucide-react";

export interface PersonaObjection {
  objection: string;
  response: string;
}

export interface ContentAlignment {
  preferredFormats: string[];
  channels: string[];
  contentThemes: string[];
}

export interface PersonaProfile {
  id: string;
  title: string;
  titleVariants: string[];
  iconName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  reportsTo: string;
  orgContext: string;
  budgetInfluence: string;
  seniority: string;
  profileSummary: string;
  strategicPriorities: string[];
  dailyPains: string[];
  buyingTriggers: string[];
  decisionCriteria: string[];
  valueProposition: string;
  keyMessages: string[];
  objections: PersonaObjection[];
  contentAlignment: ContentAlignment;
  metricsThatMatter: string[];
  discoveryQuestions: string[];
}

export const personaProfiles: PersonaProfile[] = [
  {
    id: "ceo-coo",
    title: "CEO / COO",
    titleVariants: ["Chief Executive Officer", "Chief Operating Officer", "President", "Managing Director", "Accountable Manager"],
    iconName: "Briefcase",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    reportsTo: "Board of Directors / Shareholders",
    orgContext: "Oversees entire airline operation — typically 2,000–50,000+ employees across flight ops, ground ops, maintenance, safety, and commercial",
    budgetInfluence: "Final sign-off on enterprise technology investments >$500K; sets digital transformation strategy and budget allocation across divisions",
    seniority: "C-Suite",
    profileSummary: "The airline CEO/COO is accountable for operational performance, regulatory standing, and financial results. They think in terms of competitive advantage, margin protection, and systemic risk. They rarely evaluate individual tools — they evaluate platform investments that move multiple needles simultaneously. Their lens is always: 'Does this protect revenue, reduce risk, and create competitive separation?'",
    strategicPriorities: [
      "Revenue protection through operational reliability — every delay, cancellation, and disruption directly erodes revenue and brand equity",
      "Regulatory standing and safety culture — maintaining or upgrading regulatory posture (IOSA, SMS maturity, FAA/EASA compliance) as a license to operate",
      "Cost reduction without compromising safety or service quality — extracting more efficiency from existing operations",
      "Digital transformation ROI — ensuring technology investments deliver measurable business outcomes, not just IT modernization",
      "Competitive differentiation — finding structural advantages that competitors cannot easily replicate"
    ],
    dailyPains: [
      "Lack of a single operational intelligence view — data is siloed across safety, ops, training, and maintenance systems with no unified picture",
      "Reactive decision-making — learning about problems from incident reports rather than predictive intelligence",
      "Inability to quantify the business impact of safety and compliance investments to the board",
      "Technology sprawl — multiple point solutions creating integration complexity without delivering cross-domain insights",
      "Talent and knowledge loss — experienced operational leaders retiring without systematic capture of institutional knowledge"
    ],
    buyingTriggers: [
      "A major safety event, audit finding, or near-miss that exposes systemic gaps in visibility",
      "Board pressure to demonstrate measurable ROI from digital transformation investments",
      "Competitive pressure from airlines that are visibly outperforming on operational reliability",
      "Regulatory escalation or warning that threatens operating certificates or route authority",
      "M&A activity requiring rapid standardization across merged operations",
      "New leadership mandate (incoming CEO/COO with a transformation agenda)"
    ],
    decisionCriteria: [
      "Enterprise-wide impact — must solve problems across multiple departments, not just one function",
      "Measurable ROI within 12 months — needs clear financial business case with quantified outcomes",
      "Risk reduction — must demonstrably reduce operational, regulatory, and reputational risk",
      "Scalability — must work across fleet types, bases, and potentially across group airlines",
      "Strategic differentiation — preference for platforms that create competitive moats, not commoditized tools",
      "Vendor credibility — proven track record with 550+ airlines, not a startup experiment"
    ],
    valueProposition: "Comply365 is the intelligence platform that connects your safety, operations, training, and maintenance data into a unified operational picture — enabling you to shift from reactive incident management to proactive performance optimization. For the first time, you can quantify how safety investments protect revenue, how training gaps create operational risk, and how cross-domain intelligence creates competitive advantage.",
    keyMessages: [
      "Every hour of operational disruption costs your airline $50K–$150K. Our platform identifies the patterns behind those disruptions before they cascade.",
      "You're sitting on a goldmine of operational data trapped in silos. We connect it into intelligence that drives decisions, not just reports.",
      "Your competitors are moving from reactive safety management to predictive intelligence. The gap between leaders and laggards is widening now.",
      "We don't replace your existing systems — we make them 10x more valuable by connecting them into a single intelligence layer.",
      "550+ airlines trust us because we understand aviation operations, not just technology. We're built for this domain."
    ],
    objections: [
      {
        objection: "We already have safety and ops reporting tools in place.",
        response: "Reporting tells you what happened. Intelligence tells you what's about to happen and why. Your existing tools are valuable data sources — we connect them into predictive insights that prevent problems rather than documenting them."
      },
      {
        objection: "This sounds like a multi-year transformation project.",
        response: "We deploy in 90 days with measurable outcomes. Start with one high-impact use case — safety trend intelligence or operational disruption prediction — prove ROI, then expand. No multi-year commitment required upfront."
      },
      {
        objection: "We can build this capability in-house with our data team.",
        response: "You could — but it would take 2-3 years and $5M+ to build what we've refined across 550+ airlines over 15 years. More critically, you'd be building without the aviation-specific AI models, regulatory knowledge, and cross-airline benchmarking data that makes our intelligence actionable."
      },
      {
        objection: "How do I justify this to the board?",
        response: "We build the business case with you. Typical ROI: 15-30% reduction in safety-related operational disruptions, 20%+ improvement in audit readiness time, and quantified revenue protection from prevented delays. We'll model your specific numbers."
      }
    ],
    contentAlignment: {
      preferredFormats: ["Executive briefing (2-3 pages max)", "ROI calculator / business case builder", "Board-ready presentation deck", "Peer benchmark report", "Video testimonial from airline CEO peer"],
      channels: ["Direct executive briefing (in-person or virtual)", "Industry conference keynote / panel", "Board advisory network referral", "Aviation CEO peer network", "Strategic advisor / consultant recommendation"],
      contentThemes: ["Revenue protection through operational intelligence", "Competitive advantage through connected operations", "Digital transformation that delivers measurable ROI", "From reactive compliance to proactive performance", "The intelligence platform your airline needs now"]
    },
    metricsThatMatter: [
      "On-time performance (OTP) and completion factor",
      "Revenue per available seat mile (RASM) / cost per ASM (CASM)",
      "Safety event rate and SMS maturity level",
      "Customer satisfaction scores (NPS, complaints per 1000 pax)",
      "Regulatory audit findings and corrective action closure rate",
      "Employee engagement and turnover (especially experienced ops staff)",
      "Digital transformation ROI — technology spend vs. operational improvement"
    ],
    discoveryQuestions: [
      "When you look across safety, ops, training, and maintenance — how confident are you that you're seeing the full picture of operational risk?",
      "What was the last operational surprise that you wish you'd seen coming? What would have needed to be different to catch it?",
      "How do you currently quantify the business value of your safety investments to the board?",
      "If you could connect any two data sets in your operation that are currently siloed, which would have the biggest impact?",
      "What does your digital transformation roadmap look like for the next 18 months, and where are the gaps?",
      "How are you thinking about AI in your operation — as a cost-play, a safety-play, or a competitive-advantage play?"
    ]
  },
  {
    id: "vp-safety",
    title: "VP Safety / Safety Director",
    titleVariants: ["VP Safety", "Director of Safety", "Head of Safety", "Chief Safety Officer", "Safety & Compliance Director", "SMS Manager"],
    iconName: "Shield",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    reportsTo: "CEO / COO / Accountable Manager",
    orgContext: "Leads safety management system (SMS), safety investigations, regulatory compliance, and safety culture across all operational divisions",
    budgetInfluence: "Direct budget authority for safety technology ($100K–$1M+); strong influence on enterprise compliance and risk management spend",
    seniority: "VP / Director",
    profileSummary: "The VP Safety is the guardian of the airline's safety culture and regulatory standing. They live in a world of hazard reports, investigation backlogs, regulatory audits, and the constant tension between thoroughness and speed. Their deepest frustration is being buried in reactive work (processing reports, preparing for audits) when they know the real value is in proactive hazard identification and control monitoring. They want to be the person who prevents incidents, not just the person who investigates them.",
    strategicPriorities: [
      "Shifting from reactive investigation to proactive safety intelligence — identifying hazards before they become incidents",
      "SMS maturity advancement — moving from Level 2-3 compliance to Level 4 predictive safety management",
      "Regulatory audit readiness — maintaining continuous compliance posture rather than scrambling before audits",
      "Safety culture measurement — quantifying whether safety culture initiatives are actually changing behavior",
      "Cross-domain safety visibility — connecting safety data with ops, training, and maintenance to see systemic patterns"
    ],
    dailyPains: [
      "Investigation backlogs — too many reports, not enough investigators, and manual triage consuming 60%+ of team capacity",
      "Data trapped in safety systems that doesn't connect to operational or training data — missing the systemic patterns",
      "Audit preparation consuming weeks of manual effort to compile evidence, trend analyses, and corrective action documentation",
      "Difficulty quantifying safety ROI to leadership — 'nothing happened' is hard to sell as a success metric",
      "Generic AI tools that don't understand aviation safety taxonomy, regulatory frameworks, or investigation methodology"
    ],
    buyingTriggers: [
      "A serious incident or accident that reveals gaps in hazard identification or trend detection",
      "Upcoming IOSA audit, FAA/EASA inspection, or regulatory review with identified gaps",
      "New SMS maturity requirements or regulatory mandate (e.g., ICAO Annex 19 updates)",
      "Growing investigation backlog that's creating compliance risk",
      "Leadership mandate to demonstrate measurable safety improvement with quantified outcomes",
      "Peer airline achieving measurably better safety outcomes with fewer resources"
    ],
    decisionCriteria: [
      "Aviation-specific intelligence — must understand ICAO taxonomy, SMS frameworks, and regulatory requirements natively",
      "Hazard identification accuracy — must surface real patterns, not false positives that waste investigator time",
      "Integration with existing safety systems (safety reporting, FDAP, fatigue management) without rip-and-replace",
      "Audit evidence generation — must dramatically reduce time to compile regulatory compliance documentation",
      "Proactive alerting — must identify emerging hazards from trend analysis, not just report on historical data",
      "Data security and regulatory compliance — safety data is sensitive; must meet aviation data handling requirements"
    ],
    valueProposition: "The Comply365 Operational Performance Platform connects safety, content and training on one operational data foundation — so a hazard detected today can trigger a procedure revision and crew retraining tomorrow, with auditable proof of the loop. CoAnalyst is the intelligence layer that accelerates this: aviation-specific AI that processes your safety reports, identifies hazard patterns across the whole operation, monitors control effectiveness, and generates audit-ready documentation. Platform first, intelligence on top.",
    keyMessages: [
      "Your investigators spend 60% of their time on report processing and triage. CoAnalyst automates that work so they can focus on what matters — preventing the next incident.",
      "You're sitting on years of safety data that contains patterns your team hasn't had time to find. CoAnalyst surfaces those patterns automatically.",
      "Moving from SMS Level 2-3 to Level 4 isn't about collecting more data — it's about connecting the data you have into predictive intelligence. That's exactly what we enable.",
      "Audit preparation that takes weeks should take hours. CoAnalyst generates compliance evidence, trend analyses, and corrective action tracking automatically.",
      "Generic AI doesn't understand the difference between a bird strike and a lightning strike. Our models are trained on aviation safety data and ICAO taxonomy."
    ],
    objections: [
      {
        objection: "We already have a safety reporting system.",
        response: "Your reporting system captures data. CoAnalyst turns that data into intelligence. We integrate with your existing system — we don't replace it. Think of us as the analytical brain that sits on top of your data and finds the patterns your team doesn't have time to look for."
      },
      {
        objection: "Our safety team is resistant to AI — they don't trust it for safety-critical work.",
        response: "We designed CoAnalyst as a co-analyst, not a replacement. It surfaces patterns and recommendations — your safety professionals make the decisions. It's like giving every investigator a research assistant who's read every report you've ever filed and can cross-reference instantly."
      },
      {
        objection: "We need to see proof this works in aviation, not just demos.",
        response: "We're deployed across 550+ airlines. We can connect you with safety directors at comparable operations who've seen measurable improvements in hazard identification rates and investigation cycle times. This isn't theoretical — it's production-proven."
      },
      {
        objection: "Our data quality isn't good enough for AI.",
        response: "We hear this often, and it's rarely as bad as people think. CoAnalyst is designed to work with real-world aviation safety data — including inconsistent taxonomy, free-text narratives, and incomplete records. Part of the value is that it actually helps improve data quality by standardizing and categorizing as it processes."
      },
      {
        objection: "Why CoAnalyst over generic AI (ChatGPT, Copilot, etc.)?",
        response: "Generic AI is trained on the open internet — it doesn't know ICAO taxonomy, SMS frameworks, or your fleet's specific procedures, and it can't be trusted with safety-sensitive data on shared infrastructure. CoAnalyst runs on a tiered intelligence model (Historical → Reactive → Proactive → Predictive) trained on aviation operational data, with your data isolated in your tenant. Generic AI hits ~35% accuracy on aviation safety classification; CoAnalyst delivers ~90% because it understands the domain. It's the difference between a brilliant generalist and a specialist who's read every safety report you've ever filed."
      }
    ],
    contentAlignment: {
      preferredFormats: ["Safety case study with measurable outcomes", "SMS maturity assessment tool", "Technical whitepaper on aviation AI safety methodology", "Live demo with sample safety data", "Regulatory compliance checklist / gap analysis"],
      channels: ["Safety conference presentations (Flight Safety Foundation, IATA Safety Forum)", "Safety director peer network / safety working groups", "Regulatory body recommendations and guidance material", "Direct technical demonstration with sample data", "Aviation safety publications and journals"],
      contentThemes: ["From reactive investigation to proactive intelligence", "SMS maturity acceleration with AI", "Aviation-specific AI vs. generic AI for safety", "Audit readiness automation", "Cross-domain safety visibility and systemic hazard identification"]
    },
    metricsThatMatter: [
      "Safety event rate (per 1000 flights / 10,000 flight hours)",
      "Investigation cycle time (report to closure)",
      "Hazard identification rate (proactive vs. reactive)",
      "SMS maturity level (ICAO framework)",
      "Audit finding closure rate and time-to-close",
      "Safety reporting culture metrics (reports per employee, voluntary vs. mandatory ratio)",
      "Control effectiveness monitoring coverage"
    ],
    discoveryQuestions: [
      "Walk me through what happens when a safety report comes in today — from submission to investigation to closure. Where are the bottlenecks?",
      "How many open investigations does your team currently have, and what's the average time from report to closure?",
      "When was the last time you identified a systemic hazard from trend analysis rather than from a specific event? How did you find it?",
      "How do you currently prepare for IOSA or regulatory audits? How much time does your team spend on evidence compilation?",
      "If you could connect your safety data to one other data source in the airline (ops, training, maintenance), which would give you the most insight?",
      "What's your current SMS maturity level, and what would it take to advance to the next level?"
    ]
  },
  {
    id: "vp-ops",
    title: "VP Operations / Operations Director",
    titleVariants: ["VP Operations", "VP Flight Operations", "Director of Operations", "Head of Operations Control", "Chief Operations Officer", "Director Ground Operations"],
    iconName: "Plane",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    reportsTo: "CEO / COO",
    orgContext: "Manages day-to-day airline operations including flight ops, ground ops, dispatch, crew scheduling, and operational control centre (OCC)",
    budgetInfluence: "Direct budget authority for operational technology ($200K–$2M+); influences fleet, crew, and ground handling investments",
    seniority: "VP / Director",
    profileSummary: "The VP Operations lives in real-time. Their world is measured in minutes — departure delays, turnaround times, crew disruptions, and the cascading effects of operational irregularities. They're constantly firefighting today's problems while knowing they should be building systems to prevent tomorrow's. They value tools that give them predictive visibility and help them move from managing crises to preventing them.",
    strategicPriorities: [
      "On-time performance improvement — OTP is the most visible metric and directly impacts revenue, customer satisfaction, and competitive standing",
      "Disruption prediction and prevention — identifying operational risks before they cascade into delays, cancellations, and passenger impact",
      "Crew and resource optimization — maximizing utilization while maintaining compliance with duty time regulations",
      "Operational standardization — ensuring consistent performance across bases, fleet types, and seasonal variations",
      "Cross-functional visibility — understanding how safety events, maintenance delays, and training gaps impact daily operations"
    ],
    dailyPains: [
      "Cascading disruptions — a single delay at a hub creates ripple effects across the network that take hours to resolve manually",
      "Disconnected systems — OCC tools, crew management, maintenance tracking, and safety data don't talk to each other effectively",
      "Post-hoc analysis — understanding why disruptions happened after the fact, but lacking predictive tools to prevent them",
      "Manual turnaround monitoring — ground operations relying on radio calls and manual checks rather than real-time intelligence",
      "Seasonal and weather-driven complexity — unable to proactively adjust operations based on predicted disruption patterns"
    ],
    buyingTriggers: [
      "A sustained period of poor OTP that's impacting revenue and customer satisfaction scores",
      "A major operational disruption (weather event, system failure) that exposed gaps in resilience and response capability",
      "Competitive benchmarking showing peers achieving better operational performance with similar fleet/network",
      "Growth plans (new routes, fleet additions) that will strain existing operational management capabilities",
      "Leadership mandate to reduce operational costs while maintaining or improving performance",
      "Integration challenge from merger/acquisition requiring operational standardization"
    ],
    decisionCriteria: [
      "Real-time operational visibility — must provide actionable intelligence in the OCC timeframe (minutes, not hours)",
      "Predictive capability — must forecast disruptions and recommend mitigation actions before impact",
      "Integration with existing OCC tools — must work alongside ACARS, crew management, and ops control systems",
      "Quantified operational impact — must demonstrate measurable improvement in OTP, completion factor, or cost metrics",
      "Scalability across network — must work for domestic, international, hub, and spoke operations",
      "Ease of adoption — ops teams are time-pressured; the tool must deliver value without extensive training"
    ],
    valueProposition: "Comply365 gives your operations team the intelligence layer that connects safety, maintenance, training, and operational data into a single picture — enabling you to predict disruptions before they cascade, identify the root causes behind chronic delays, and make data-driven decisions in real-time. Stop fighting today's fires and start preventing tomorrow's.",
    keyMessages: [
      "Every minute of delay costs money, but the real cost is the cascade effect. We help you see the cascade coming before it starts.",
      "Your OCC team is making decisions with 30% of the data they need. We connect the other 70% — safety trends, maintenance patterns, crew fatigue data — into operational intelligence.",
      "You know which routes and turnarounds cause the most disruptions. We show you why — and what to change to fix them.",
      "Operational excellence isn't about working harder — it's about seeing patterns that connect safety, maintenance, and ops data into actionable intelligence.",
      "We've helped 550+ airlines improve operational performance. We know what good looks like across every operation type."
    ],
    objections: [
      {
        objection: "We already have an operations control system.",
        response: "Your OCC system manages today's operation. We provide the intelligence layer that helps you predict and prevent tomorrow's problems. We integrate with your existing tools — we're the analytical layer that makes them more valuable."
      },
      {
        objection: "Our ops team doesn't have time to learn new tools.",
        response: "That's exactly why we built CoAnalyst as a conversational interface. Your team asks questions in natural language — 'What's driving delays on the LHR-JFK route this month?' — and gets instant, data-backed answers. No training required."
      },
      {
        objection: "How does this connect to our existing data?",
        response: "We integrate with your existing systems through standard APIs and data feeds. We don't require you to change your operational workflows — we sit alongside them and provide the cross-domain intelligence that no single system can deliver on its own."
      },
      {
        objection: "We've tried analytics tools before and they didn't deliver.",
        response: "Generic analytics tools fail in aviation because they don't understand operational context. A 15-minute delay at a hub gate is fundamentally different from a 15-minute delay at an outstation. Our models understand aviation operations natively — that's why we deliver actionable insights, not just charts."
      }
    ],
    contentAlignment: {
      preferredFormats: ["Operational case study with OTP improvement metrics", "Live OCC demo with realistic operational scenarios", "Disruption cost calculator / ROI model", "Benchmark report comparing operational performance across peer airlines", "Quick-start pilot proposal (90-day implementation plan)"],
      channels: ["Airline operations conferences (IATA Ops, Airline Ops Forum)", "Direct OCC demonstration", "Ops director peer network referral", "Aviation trade publications (Aviation Week, FlightGlobal)", "Operational excellence consulting partnerships"],
      contentThemes: ["Predictive operations vs. reactive firefighting", "The hidden cost of operational disruptions", "Connected intelligence across safety, ops, and maintenance", "90-day time to value for operational improvement", "Operational excellence benchmarking across 550+ airlines"]
    },
    metricsThatMatter: [
      "On-time performance (OTP) — departure and arrival",
      "Completion factor and cancellation rate",
      "Average delay minutes per flight",
      "Turnaround time compliance",
      "Crew utilization and duty time compliance",
      "Disruption recovery time (time to restabilize after irregularity)",
      "Operational cost per block hour"
    ],
    discoveryQuestions: [
      "What's your current OTP and where does it need to be? What's the gap costing you in revenue and customer satisfaction?",
      "Walk me through your last major operational disruption — how did you identify it, respond, and recover? What would you change?",
      "How do you currently identify the root causes behind chronic delays on specific routes or at specific stations?",
      "When a safety event happens, how quickly does that information reach your OCC team and influence operational decisions?",
      "If you could predict tomorrow's disruptions today, what would you do differently in crew planning, maintenance scheduling, or network management?",
      "How are you thinking about the next 12-18 months — growth, fleet changes, new routes — and what operational challenges will that create?"
    ]
  },
  {
    id: "training-director",
    title: "Training & L&D Director",
    titleVariants: ["VP Training", "Director of Training", "Head of Learning & Development", "Chief Training Officer", "Training Standards Manager", "Director Crew Training"],
    iconName: "GraduationCap",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/30",
    reportsTo: "VP Operations / VP Safety / COO",
    orgContext: "Responsible for all crew training (flight crew, cabin crew), ground staff training, compliance training, and competency management across the airline",
    budgetInfluence: "Direct budget authority for training technology and LMS ($150K–$1.5M+); influences simulator and training facility investments",
    seniority: "VP / Director",
    profileSummary: "The Training Director is responsible for ensuring every crew member and ground staff employee is competent, current, and compliant. They manage complex training matrices across multiple fleet types, regulatory requirements (Part 121/135, EASA ORO.FC), and recurrent training cycles. Their biggest challenge is that training is often disconnected from operational reality — training programs are built on regulatory minimums rather than data-driven insights about where performance gaps actually exist. They want to move from 'training what the regulation says' to 'training what the data shows we need.'",
    strategicPriorities: [
      "Evidence-based training — using safety and operational data to identify actual competency gaps and target training resources where they have the most impact",
      "Training compliance management — maintaining continuous compliance across all crew qualifications, recurrent requirements, and regulatory mandates",
      "Content management at scale — ensuring thousands of pages of manuals, SOPs, and training materials are current, accessible, and consistently delivered",
      "Training effectiveness measurement — moving beyond completion rates to measure actual behavior change and operational impact",
      "Regulatory evolution — adapting training programs to new competency-based frameworks (CBTA, EBT) mandated by regulators"
    ],
    dailyPains: [
      "Manual compliance tracking — spreadsheets and disconnected systems for managing crew qualifications, currency, and recurrent training schedules",
      "Content revision bottlenecks — regulatory changes requiring updates across hundreds of documents with manual change management processes",
      "Training-safety disconnect — safety trends and investigation findings not systematically feeding into training program design",
      "Simulator scheduling complexity — optimizing expensive simulator time across fleet types, training events, and instructor availability",
      "Measuring training ROI — unable to demonstrate whether training investments actually reduce operational errors or safety events"
    ],
    buyingTriggers: [
      "Regulatory mandate for competency-based training (CBTA/EBT) requiring fundamental program redesign",
      "Training compliance gaps identified in regulatory audit or internal review",
      "Safety investigation revealing training-related causal factors that current programs failed to address",
      "Fleet transition or growth requiring rapid scaling of training programs and content",
      "Budget pressure to demonstrate training ROI and optimize resource allocation",
      "Content management crisis — manual revision processes causing version control failures or outdated materials in circulation"
    ],
    decisionCriteria: [
      "Regulatory compliance — must meet Part 121/135 and EASA training requirements with auditable records",
      "Integration with safety data — must connect training programs to actual safety and operational performance data",
      "Content management capability — must handle complex document revision, distribution, and acknowledgment workflows",
      "Scalability — must manage training across multiple fleet types, bases, and crew categories",
      "Ease of use for instructors — training delivery tools must be intuitive for line instructors, not just administrators",
      "Analytics and reporting — must provide competency tracking, gap analysis, and regulatory compliance dashboards"
    ],
    valueProposition: "Comply365 connects your training programs to the operational and safety data that should drive them. Our platform ensures your content is always current and accessible, your compliance is continuously managed, and your training resources are targeted at the competency gaps that actually impact operational performance — not just regulatory minimums. Move from calendar-driven training to intelligence-driven training.",
    keyMessages: [
      "Your training programs should be driven by safety and operational data, not just regulatory calendars. We connect the data that makes that possible.",
      "Managing training compliance across fleet types and crew categories shouldn't require spreadsheets. Our platform provides continuous, automated compliance tracking.",
      "When a regulatory change hits, you need to update content across hundreds of documents and ensure every crew member acknowledges the change. We automate that entire workflow.",
      "You can't improve what you can't measure. We connect training delivery to operational outcomes so you can prove which training investments actually reduce risk.",
      "The shift to competency-based training (CBTA/EBT) requires data-driven insights about actual competency gaps. That's exactly what our intelligence layer provides."
    ],
    objections: [
      {
        objection: "We already have an LMS.",
        response: "Your LMS delivers and tracks training. We provide the intelligence layer that tells you what training to deliver based on actual safety and operational data, plus the content management backbone that keeps your training materials current. We complement your LMS, not replace it."
      },
      {
        objection: "Our training programs are driven by regulatory requirements — we don't have flexibility.",
        response: "Regulatory requirements set the minimum. The question is: are you training beyond the minimum where your data shows you need to? We help you identify those gaps and build evidence-based training interventions — which regulators increasingly expect under CBTA/EBT frameworks."
      },
      {
        objection: "Our instructors won't use complex technology.",
        response: "We designed for line instructors, not IT specialists. The interface is conversational — instructors can ask 'What are the top competency gaps for 737 captains this quarter?' and get instant, actionable insights. No technical training required."
      },
      {
        objection: "We don't have the budget for a new training platform.",
        response: "The real cost is what you're spending now on manual compliance tracking, content revision cycles, and training that doesn't target actual performance gaps. We typically save 30-40% of administrative overhead while improving training effectiveness."
      }
    ],
    contentAlignment: {
      preferredFormats: ["Training effectiveness case study with measurable outcomes", "Competency-based training (CBTA/EBT) implementation guide", "Content management workflow demonstration", "Compliance automation ROI calculator", "Training-safety integration whitepaper"],
      channels: ["Training conferences (IATA Training Forum, RAeS Training Symposium)", "Training director peer networks and working groups", "Regulatory body training guidance publications", "Direct demonstration with training content examples", "Aviation training publications and forums"],
      contentThemes: ["Evidence-based training powered by operational intelligence", "From calendar-driven to data-driven training", "Content management at scale for regulated environments", "CBTA/EBT readiness and implementation", "Measuring training ROI through operational outcomes"]
    },
    metricsThatMatter: [
      "Training compliance rate (% of crew current on all required training)",
      "Training completion rate and on-time delivery",
      "Competency gap identification and closure rate",
      "Content revision cycle time (change identification to deployment)",
      "Training-related safety event correlation (events linked to training gaps)",
      "Simulator utilization rate",
      "Training cost per crew member per year"
    ],
    discoveryQuestions: [
      "How do you currently identify which competency areas need the most attention in your training programs? Is it data-driven or experience-based?",
      "Walk me through what happens when a regulatory change requires updates to your training materials — from awareness to crew acknowledgment. How long does it take?",
      "When a safety investigation identifies training as a causal factor, how does that finding systematically feed back into your training program design?",
      "How confident are you right now that every crew member is current on all required qualifications? How would you verify that if the regulator asked today?",
      "What's your biggest challenge with the transition to competency-based training? Where are the gaps in your current capability?",
      "If you could connect your training data to one other data source (safety, ops, maintenance), which would give you the most insight?"
    ]
  },
  {
    id: "cio-it",
    title: "CIO / IT Director",
    titleVariants: ["Chief Information Officer", "VP Information Technology", "Director of IT", "Head of Digital Transformation", "Chief Technology Officer", "Chief Digital Officer"],
    iconName: "Monitor",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/30",
    reportsTo: "CEO / COO / CFO",
    orgContext: "Oversees all technology infrastructure, systems integration, data architecture, cybersecurity, and digital transformation initiatives across the airline",
    budgetInfluence: "Direct budget authority for technology investments ($1M–$20M+); evaluates and approves all enterprise technology platforms",
    seniority: "C-Suite / VP",
    profileSummary: "The airline CIO/IT Director is responsible for the technology backbone that keeps the airline running. They manage a complex web of legacy systems, regulatory requirements, and integration challenges while simultaneously driving digital transformation. Their constant tension is between maintaining stability (keeping legacy systems running) and enabling innovation (deploying AI, cloud, and data platforms). They evaluate vendors through the lenses of architecture fit, security, scalability, and total cost of ownership — not just features.",
    strategicPriorities: [
      "Technology consolidation — reducing the number of point solutions and creating a more integrated, maintainable technology stack",
      "Data strategy and architecture — building a unified data platform that enables cross-domain analytics and AI capabilities",
      "AI readiness — evaluating where AI can deliver genuine value vs. hype, and building the infrastructure to support it",
      "Cybersecurity and data governance — protecting sensitive operational and passenger data while enabling data-driven innovation",
      "Cloud migration and modernization — moving from on-premise legacy systems to cloud-native platforms without disrupting operations"
    ],
    dailyPains: [
      "Integration complexity — dozens of operational systems (crew management, maintenance, safety, training) that don't share data effectively",
      "Legacy system dependency — critical operational systems running on aging technology with limited vendor support and high maintenance costs",
      "Shadow IT — operational departments buying point solutions independently, creating data silos and security gaps",
      "AI vendor noise — every vendor claims AI capability; difficult to distinguish genuine aviation AI from marketing-wrapped GPT wrappers",
      "Regulatory compliance for data — aviation data governance requirements (safety data protection, cross-border data transfer) adding complexity to technology decisions"
    ],
    buyingTriggers: [
      "Digital transformation mandate from the board with specific timeline and budget allocation",
      "Legacy system end-of-life or end-of-support forcing platform replacement decisions",
      "Data breach or cybersecurity incident requiring security posture reassessment",
      "AI pilot project approved by leadership, requiring infrastructure and vendor evaluation",
      "Integration failure causing operational impact (e.g., data not flowing between safety and ops systems)",
      "M&A technology integration challenge requiring platform standardization"
    ],
    decisionCriteria: [
      "Architecture fit — must work with existing technology stack via standard APIs (REST, GraphQL) and data formats",
      "Security and compliance — must meet aviation data governance, SOC 2, and cybersecurity requirements",
      "Total cost of ownership — not just license cost, but implementation, integration, maintenance, and training costs over 3-5 years",
      "Scalability and performance — must handle airline-scale data volumes without performance degradation",
      "Vendor viability — must be a stable, well-funded company with a proven aviation track record, not a startup that might not exist in 3 years",
      "AI transparency — must explain how AI models work, what data they're trained on, and provide auditability for safety-critical applications"
    ],
    valueProposition: "Comply365 is the aviation intelligence platform that sits at the center of your operational technology stack — connecting safety, ops, training, and maintenance data through standard integrations and turning it into actionable intelligence via aviation-specific AI. We reduce your technology sprawl, eliminate data silos, and provide the unified data platform your digital transformation strategy requires — without ripping and replacing your existing systems.",
    keyMessages: [
      "We're not another point solution — we're the integration layer that connects your existing systems and makes them collectively more intelligent.",
      "Our AI is purpose-built for aviation with models trained on domain-specific data. It's not a generic LLM wrapper with an aviation skin — it understands operational context, regulatory frameworks, and safety taxonomy natively.",
      "We reduce your technology footprint by replacing multiple point solutions with a single platform that handles content management, safety intelligence, training analytics, and operational insights.",
      "550+ airlines run on our platform. We're not a startup experiment — we're the proven, scalable foundation for your digital transformation.",
      "We meet aviation data governance requirements out of the box — SOC 2, data residency, safety data protection. Your compliance team will thank you."
    ],
    objections: [
      {
        objection: "How does this integrate with our existing systems?",
        response: "We provide standard REST APIs, webhook integrations, and pre-built connectors for common aviation systems (AMOS, AIMS, Sabre, Jeppesen, etc.). Our integration team has done this across 550+ airlines — we know the landscape and have solved most integration challenges before."
      },
      {
        objection: "We're concerned about vendor lock-in.",
        response: "Your data remains yours — we provide full data export capabilities and standard API access. Our platform enhances your existing systems; it doesn't replace them. If you ever move away, your operational systems continue to function independently."
      },
      {
        objection: "Our AI strategy involves building in-house capabilities.",
        response: "Building aviation-specific AI models in-house would require 2-3 years, a dedicated data science team, and access to training data across hundreds of airlines. We provide that capability immediately, and our APIs allow your data science team to build on top of our platform rather than starting from scratch."
      },
      {
        objection: "What about data security for safety-sensitive information?",
        response: "We're built for aviation data sensitivity from the ground up. SOC 2 Type II certified, data residency options, role-based access controls, full audit logging, and compliance with ICAO safety data protection principles. We can walk your security team through our architecture in detail."
      },
      {
        objection: "This sounds expensive.",
        response: "Compare our platform cost to what you're currently spending on: multiple point solutions (licenses, integration, maintenance), manual data analysis across siloed systems, and the opportunity cost of not having cross-domain intelligence. Our customers typically achieve 3-5x ROI within 18 months through technology consolidation and operational improvement."
      }
    ],
    contentAlignment: {
      preferredFormats: ["Technical architecture documentation and API specifications", "Security and compliance whitepaper (SOC 2, data governance)", "Integration case study with architecture diagrams", "Total cost of ownership (TCO) comparison model", "Technical proof of concept (POC) proposal"],
      channels: ["Aviation IT conferences (SITA Air Transport IT Summit, APEX TECH)", "CIO peer networks and technology advisory boards", "Gartner/Forrester analyst recommendations", "Direct technical proof of concept", "IT/digital transformation consulting partnerships"],
      contentThemes: ["Platform consolidation vs. point solution sprawl", "Aviation-specific AI vs. generic AI for operational applications", "Data architecture for cross-domain operational intelligence", "Security and compliance in aviation technology", "Digital transformation ROI — from pilot to enterprise scale"]
    },
    metricsThatMatter: [
      "Technology total cost of ownership (TCO) — all-in cost per system per year",
      "System integration coverage (% of operational systems connected)",
      "Data availability and quality scores across domains",
      "Platform uptime and reliability (SLA compliance)",
      "Time to deploy new capabilities (weeks/months from request to production)",
      "Shadow IT reduction (number of unauthorized point solutions eliminated)",
      "AI model accuracy and auditability for safety-critical applications"
    ],
    discoveryQuestions: [
      "How many distinct technology systems are currently supporting your safety, ops, training, and maintenance functions? How well do they share data?",
      "What's your current technology consolidation strategy? Where are the biggest integration gaps?",
      "How are you evaluating AI vendors for aviation applications? What criteria distinguish genuine capability from marketing hype?",
      "What's your data architecture roadmap? Are you building toward a unified data platform or connecting existing systems?",
      "What are your biggest data governance challenges, particularly around safety data protection and cross-border data transfer?",
      "If you could solve one integration problem in your technology stack, which would have the biggest operational impact?"
    ]
  }
];
