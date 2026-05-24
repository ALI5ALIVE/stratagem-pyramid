export interface KeynoteScriptAct {
  actId: string;
  stageDirection: string;
  paragraphs: string[];
  cue: string;
}

export const silosToSignalsScript: KeynoteScriptAct[] = [
  {
    actId: "film",
    stageDirection:
      "House lights down as the doors close. No introduction, no host, no walk-on. The film rolls cold. The CEO is not on stage yet — watch the room from the wings.",
    paragraphs: [
      "Director's note — this act is the film. There is no spoken line from the stage.",
      "Watch the faces. Watch the signals. Watch what an operation looks like when it moves in concert. Two minutes. No voiceover from the lectern. Let the room feel the category before anyone names it.",
      "The film ends on a black card: \"This is what operational performance looks like.\" Hold the black for three full seconds. Then the spotlight finds the CEO.",
    ],
    cue: "Film ends on black card. Hold 3 sec of dark silence. Spotlight up, centre stage, on the CEO.",
  },
  {
    actId: "cold-open",
    stageDirection:
      "Spotlight finds the CEO already standing at centre stage as the film fades. No applause cue. Hold the room for a full beat before the first word.",
    paragraphs: [
      "That film is not aspirational.",
      "Every signal you just saw is already moving through your operation tonight. The reports. The observations. The near-misses. The fatigue markers. The deferred defects. The lines of feedback from a crew member who saw something and did the right thing by writing it down.",
      "The difference between the film and your Tuesday is not the signals. It is whether anyone, anywhere in the operation, ever sees them in time to act.",
      "So here is the uncomfortable truth I want to start with tonight. Every operator in this room is running on signals they will never see.",
      "Not because your people aren't capturing them. They are. Not because your systems aren't recording them. They are. But because the signal that matters and the decision that matters almost never meet in time.",
      "For the next forty minutes I am going to name that gap, show you what our research has told us about it, and show you what we are building to close it. And at the end, I am going to ask one thing of you. Just one.",
    ],
    cue: "Hold the silence. Wait for the screen to fade to black before stepping into the audience.",
  },
  {
    actId: "silo-era",
    stageDirection:
      "Step off the stage and walk into the front rows. Conversational, but pointed. The room should feel slightly uncomfortable by the end.",
    paragraphs: [
      "Let me ground that in a Tuesday morning. It is composite — drawn from conversations with dozens of operators over the last twelve weeks — but every detail is real, and most of you will recognise it.",
      "06:14. A first officer files a fatigue report at the end of a long rotation. It goes into the safety system.",
      "06:47. A line engineer defers a minor defect on the same airframe. It goes into the technical records system.",
      "08:02. A crew scheduler, blind to both of those signals, rosters the same airframe and a similar crew pattern for a high-density day of flying. It goes into the planning system.",
      "By lunchtime, four different systems know four different pieces of the same story. And no human, anywhere in your operation, has seen the whole picture.",
      "Nothing bad happens that Tuesday. Nothing bad happens most Tuesdays. That is exactly the problem — because the absence of an incident is not the presence of control.",
      "Here is what the numbers say. Roughly sixty-five per cent of operational signals never make it home — never reach the desk where a decision could be made. Across our industries, the annual exposure from disconnected operations sits in the range of twenty-five to thirty-five billion dollars. That is not a marketing number. That is the cost of running operations where the right hand and the left hand are working from different versions of the truth.",
      "And the reason it persists is not laziness, and it is not lack of technology. It is that we have spent twenty years buying point solutions for point problems. We have a system for safety. A system for compliance. A system for tech records. A system for crew. A system for training. Each one excellent in its lane. None of them designed to talk to the others in time to change a decision.",
      "That is the silo era. And it is ending — whether we choose it or not.",
    ],
    cue: "Walk slowly back toward the stage as the stat wall finishes building. Pause at the steps.",
  },
  {
    actId: "research",
    stageDirection:
      "Back on stage, but stay near the edge. Speak as a witness to the data, not the author of the conclusion. Methodology badge held in the corner of the screen.",
    paragraphs: [
      "We did not start with a product. We started with a question. What is the operating gap that every operator we talk to describes — and none of them have a name for?",
      "Over the last twelve weeks, our Category Research Programme spoke with three hundred operators in a structured survey, and conducted between eighteen and twenty-four in-depth interviews with executives across aviation, defence, and rail. We then triangulated that primary work against secondary research from regulators, insurers, and analyst houses.",
      "Three findings came back, and they came back loudly.",
      "Finding one. Buyer language exists for this gap — and it is not the word \"compliance\". Executives talk about it as the gap between the operation they are responsible for and the operation they can actually see. They talk about \"line of sight\". They talk about \"control\". They talk about \"the system of record I wish I had\". They almost never talk about compliance. That word, in their mouths, is a floor, not a ceiling.",
      "Finding two. Willingness-to-pay clusters around connected operations — not around another point tool. When we tested price sensitivity, the line moved decisively when the offer was framed as joining the operation up. It barely moved when the offer was framed as a better version of any single existing tool. The market is telling us, with its budget, that it is done buying islands.",
      "Finding three. The vocabulary converged. Across eighteen to twenty-four executive interviews, in three industries, in five countries, the same four verbs kept appearing. Detect. Trigger. Orchestrate. Prove. Different words sometimes — \"see\", \"act\", \"route\", \"close the loop\" — but the same four moves, in the same order, every time.",
      "When that happens in research — when buyers in different industries, using different tools, start describing the same operating model in the same sequence — you are not looking at a feature request. You are looking at the early outline of a category.",
      "One last thing about the method, because credibility matters. Everything I am about to show you is modelled, not measured. The numbers are sourced. The interviews are real. The conclusions are ours, and we hold them lightly enough to revise them when the next three hundred operators tell us we got something wrong.",
    ],
    cue: "Findings cards finish revealing. Take a breath. Step back to centre stage.",
  },
  {
    actId: "name-the-game",
    stageDirection:
      "Slow the tempo deliberately. Four reveals, four colours, four verbs. Let each one land before the next. This is the act that names what the film showed.",
    paragraphs: [
      "So we gave it a name. Not because the industry needs another acronym — it does not — but because a category without a name cannot be bought, sold, or defended.",
      "We call it the DTOP Operating Model. Detect. Trigger. Orchestrate. Prove. Four moves, in that order, every time.",
      "Detect. See every signal — across systems, across roles, across silos. Not the signals that happen to land in one inbox. All of them.",
      "Trigger. Convert a signal into an obligation the operation can actually act on. Not a notification. Not a dashboard tile. A piece of work, owned by a named person, with a clock on it.",
      "Orchestrate. Route that work to the right hands, on the right device, at the right moment. The captain on the flight deck. The engineer at the airframe. The controller in the tower. Where they are, not where the system wishes they were.",
      "Prove. Close the loop with auditable evidence that the right thing happened. Not because the regulator asks. Because the operation is only as strong as its last proven outcome.",
      "Detect. Trigger. Orchestrate. Prove. That is the operating model. And the master message I want you to take out of this room and into your Monday morning is six words long.",
      "From event. To control.",
      "Everything we are building — and everything you just saw in the opening film — exists to compress the distance between those two words.",
    ],
    cue: "Hold on the black slide with \"From event to control.\" Step toward the screen for the proof act.",
  },
  {
    actId: "intelligence",
    stageDirection:
      "Back on stage. Tempo lifts. This is the proof act. Walk the DTOP loop on screen — recorded captures, no live demo risk.",
    paragraphs: [
      "A category needs more than a name. It needs a capability that makes it real. So let me show you what we have built.",
      "Sitting underneath the DTOP loop is what we call the Intelligence Layer. It is the part of the platform that turns a raw operational signal into a decision the operation can act on — without waiting for a human to notice, triage, and route it.",
      "I want to be very precise about what that means, because the market is full of vague claims about AI in operations. Let me give you the only comparison that matters.",
      "When a generic AI model is asked to make an operational decision in our domain, it gets the call right about thirty-five per cent of the time. Useful for a summary. Dangerous for a dispatch decision.",
      "When the Intelligence Layer — trained on operational data, tuned to our regulators, grounded in the workflows your people actually use — is asked the same question, it gets the call right around ninety per cent of the time at decision levels four and five. That is the difference between a model that talks about your operation and a model that can be trusted inside it.",
      "But the headline number is not the point. The point is what that accuracy collapses.",
      "Today, in most of your operations, the time between a signal being captured and a decision being made is measured in hours. Sometimes days. Sometimes — and you know this — it is measured in \"never\", because the signal sits in a queue that no human ever drains.",
      "With the Intelligence Layer inside the loop, that time collapses to minutes. In the cases we have modelled with founding customers, it collapses to seconds.",
      "And the second-order effect is bigger than the first. When detection-to-decision compresses, you stop needing a small army of people whose entire job is to move information between systems. You stop reacting to events. You start managing the operation.",
      "Let me walk the loop on screen. A real signal — anonymised — moving through Detect, Trigger, Orchestrate, Prove. Watch the clocks at the bottom of each frame. That is the operating-model shift, made visible.",
      "Detect. The signal arrives from the safety system, the tech records system, and the crew system at the same time. The Intelligence Layer sees all three. A human, on their own, would have seen one.",
      "Trigger. The platform converts those three signals into a single obligation. Named owner. Named device. Named deadline. The work exists now — not as a notification, as a task.",
      "Orchestrate. The obligation is routed to the right hands at the right moment. The engineer sees it at the airframe. The scheduler sees it before the next roster is published. The captain sees it before pushback. Same truth, three surfaces, one operation.",
      "Prove. The loop closes with auditable evidence. Who saw it. When. What they did. What outcome was achieved. Not for the regulator. For the operation itself, so the next decision is made on harder ground than the last one.",
      "That is the loop. That is the operating model. That is what \"from event to control\" looks like when you can actually see it move.",
      "A quick word on the roadmap, because I want you to know where this is going. The Intelligence Layer ships in three waves, on locked dates. Insights first — the read-only view of the connected operation. Automation next — the parts of the loop a human should never have had to touch. Unified Mobile last — one device, one truth, every role. The dates are in the appendix. We will hold ourselves to them in public.",
    ],
    cue: "Loop animation completes on the \"Prove\" frame. Hold for three beats. Lights soften.",
  },
  {
    actId: "call-to-arms",
    stageDirection:
      "Tempo down. Return to centre stage. Three commitments out, one ask back. The final line is delivered into silence.",
    paragraphs: [
      "We are nearly done. I want to close with three commitments and one ask.",
      "Commitment one. Investment. Comply365 is putting the largest capital and engineering commitment in our history behind this category. Not because the category is fashionable, but because our customers have told us, with their budgets and their interviews, that this is the operating model they intend to run on.",
      "Commitment two. Partnership. We are not building this in a lab and shipping it over a wall. We are building it with a founding group of operators who help us shape the roadmap, stress-test the loop, and decide what ships next. If you are in this room tonight, you are already on the shortlist.",
      "Commitment three. Transparency. We will publish our research cadence. We will publish our roadmap. We will publish the dates we hit, and — more usefully — the dates we miss. A category is built in daylight or not at all.",
      "And the ask. I want twelve founding operators. Twelve organisations willing to sit inside the loop with us for the next twelve months. To put real signals into the platform. To tell us, hard, when we get it wrong. And to help us write the language that the rest of the market will eventually use.",
      "We will take names in this room tonight. There is a sign-up at the back. There is no fee. There is a commitment of time and candour, and there is a seat at the table while the category is still soft enough to shape.",
      "I started by telling you that every operator in this room is running on signals they will never see. I want to end with the opposite.",
      "We are not selling into a category. We are building one.",
      "Thank you.",
    ],
    cue: "Hold on the closing line. Lights up slowly. Walk off only after the applause begins.",
  },
];