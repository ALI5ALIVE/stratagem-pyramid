-- 1. Schema additions
ALTER TABLE public.academy_modules
  ADD COLUMN IF NOT EXISTS track text NOT NULL DEFAULT 'core',
  ADD COLUMN IF NOT EXISTS specialty text;

ALTER TABLE public.academy_modules
  DROP CONSTRAINT IF EXISTS academy_modules_track_check;
ALTER TABLE public.academy_modules
  ADD CONSTRAINT academy_modules_track_check CHECK (track IN ('core','specialist'));

-- Existing 3 weekly modules are explicitly core
UPDATE public.academy_modules SET track = 'core' WHERE id IN ('m-w1','m-w2','m-w3');

-- 2. Seed Specialist Playbook modules
INSERT INTO public.academy_modules
  (id, module_number, title, learning_goal, estimated_minutes, slide_ids, order_index, pass_threshold, week_number, accent_color, kicker, track, specialty)
VALUES
  ('m-signals', 4, 'Signals 101 — what they are, how they fire',
    'Define a signal in plain English, name the four sources, walk the signal lifecycle, and run one discovery question per use case.',
    12,
    ARRAY['sig-title','sig-why','sig-what','sig-sources','sig-lifecycle','sig-strength','sig-uc-safety','sig-uc-ops','sig-uc-content','sig-why-us','sig-closing']::text[],
    4, 80, NULL, 'amber', 'Playbook', 'specialist', 'signals'),
  ('m-dtop', 5, 'DTOP — Detect, Trigger, Orchestrate, Prove',
    'Walk the DTOP loop on a whiteboard, explain which step typically breaks for a prospect, and handle the top objections.',
    14,
    ARRAY['dtop-title','dtop-why','dtop-what','dtop-how-steps','dtop-uc1','dtop-uc2','dtop-uc3','dtop-value','dtop-personas','dtop-competitive','dtop-objections','dtop-closing']::text[],
    5, 80, NULL, 'blue', 'Playbook', 'specialist', 'dtop'),
  ('m-insights', 6, 'Insights & Recommendations',
    'Explain how Insights turns operational data into recommended actions, the ~90% vs ~35% accuracy line, and the locked roadmap.',
    12,
    ARRAY['ir-title','ir-why','ir-what','ir-how','ir-uc1','ir-uc2','ir-uc3','ir-value','ir-personas','ir-competitive','ir-closing']::text[],
    6, 80, NULL, 'violet', 'Playbook', 'specialist', 'insights'),
  ('m-automation', 7, 'Automation — closing the loop',
    'Pitch Automation as the orchestration step of DTOP, contrast it with generic RPA, and run the three use-case talk tracks.',
    12,
    ARRAY['au-title','au-why','au-what','au-how','au-uc1','au-uc2','au-uc3','au-value','au-personas','au-competitive','au-closing']::text[],
    7, 80, NULL, 'emerald', 'Playbook', 'specialist', 'automation'),
  ('m-mobile', 8, 'Unified Mobile App',
    'Land the one-app message for the frontline, deliver the phased H1 2026 / H2 2026 / 2027 roadmap precisely, and avoid over-promising the unified shell.',
    12,
    ARRAY['mo-title','mo-why','mo-what','mo-how','mo-uc1','mo-uc2','mo-uc3','mo-value','mo-personas','mo-competitive','mo-closing']::text[],
    8, 80, NULL, 'rose', 'Playbook', 'specialist', 'mobile'),
  ('m-platform', 9, 'The Platform deep dive',
    'Walk the four-layer architecture (Operational Core, Intelligence, Unified Mobile, DTOP) and the platform value lever in 90 seconds.',
    16,
    ARRAY['pf-title','pf-why','pf-what','pf-architecture','pf-core','pf-intelligence','pf-mobile','pf-dtop','pf-usecase','pf-value','pf-personas','pf-competitive','pf-closing']::text[],
    9, 80, NULL, 'primary', 'Playbook', 'specialist', 'platform'),
  ('m-regmgmt', 10, 'Regulation Management use case',
    'Run the Regulation Management story end-to-end — problem, positioning, DTOP mapping, value pillars, objections.',
    12,
    ARRAY['rm-title','rm-overview','rm-problem','rm-positioning','rm-value-pillars','rm-dtop','rm-how-it-works','rm-use-cases','rm-personas','rm-commercial','rm-objections','rm-roadmap']::text[],
    10, 80, NULL, 'sky', 'Playbook', 'specialist', 'regmgmt')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  learning_goal = EXCLUDED.learning_goal,
  estimated_minutes = EXCLUDED.estimated_minutes,
  slide_ids = EXCLUDED.slide_ids,
  order_index = EXCLUDED.order_index,
  accent_color = EXCLUDED.accent_color,
  kicker = EXCLUDED.kicker,
  track = EXCLUDED.track,
  specialty = EXCLUDED.specialty;

-- 3. Seed quiz questions (6 per playbook)

-- Remove any prior playbook questions to keep this re-runnable
DELETE FROM public.academy_questions
WHERE module_id IN ('m-signals','m-dtop','m-insights','m-automation','m-mobile','m-platform','m-regmgmt');

-- SIGNALS
INSERT INTO public.academy_questions (module_id, prompt, options, correct_key, explanation, order_index) VALUES
('m-signals', 'In the Comply365 model, what is a "signal"?',
 '[{"key":"a","label":"Any incoming email from a regulator"},{"key":"b","label":"A piece of operational data that indicates something has changed or needs attention"},{"key":"c","label":"A log entry in the IT system"},{"key":"d","label":"A scheduled audit report"}]'::jsonb,
 'b', 'A signal is operational data that says something has changed and may need action — it is the fuel for the DTOP loop.', 1),
('m-signals', 'Which is NOT a typical source of operational signals?',
 '[{"key":"a","label":"Flight data and crew-reported events"},{"key":"b","label":"Frontline mobile submissions"},{"key":"c","label":"Marketing campaign metrics"},{"key":"d","label":"Regulatory change feeds"}]'::jsonb,
 'c', 'Signals come from operational data — flight data, crew reports, frontline submissions, regulatory change feeds. Marketing metrics are not operational signals.', 2),
('m-signals', 'What makes a signal "strong" rather than "weak"?',
 '[{"key":"a","label":"It is loud and frequent"},{"key":"b","label":"It is repeatable, attributable, and tied to a specific operational outcome"},{"key":"c","label":"It comes from senior management"},{"key":"d","label":"It is reported on paper"}]'::jsonb,
 'b', 'Strong signals are repeatable, attributable to a specific operation, and clearly tied to an outcome you can act on.', 3),
('m-signals', 'What is the correct order of the signal lifecycle?',
 '[{"key":"a","label":"Trigger → Detect → Prove → Orchestrate"},{"key":"b","label":"Detect → Trigger → Orchestrate → Prove"},{"key":"c","label":"Orchestrate → Detect → Trigger → Prove"},{"key":"d","label":"Detect → Orchestrate → Trigger → Prove"}]'::jsonb,
 'b', 'DTOP order is always Detect → Trigger → Orchestrate → Prove. Signals enter at Detect and close at Prove.', 4),
('m-signals', 'Best discovery question for a safety-led prospect?',
 '[{"key":"a","label":"How many safety reports did you file last quarter?"},{"key":"b","label":"When a recurring safety signal lands today, how long until it actually changes a procedure or training module?"},{"key":"c","label":"Do you use any AI today?"},{"key":"d","label":"How big is your safety team?"}]'::jsonb,
 'b', 'The wedge is the gap between a signal landing and a procedure/training change — that gap is usually weeks or months.', 5),
('m-signals', 'Why is Comply365 uniquely positioned on signals?',
 '[{"key":"a","label":"We have the cheapest licensing"},{"key":"b","label":"One shared operational data foundation means every signal can fire across safety, content, and training — not stop at one tool"},{"key":"c","label":"We send more emails than competitors"},{"key":"d","label":"Our app store rating is higher"}]'::jsonb,
 'b', 'Point tools detect signals but the loop stops at their boundary. Our shared foundation lets a single signal trigger a procedure or training change automatically.', 6);

-- DTOP
INSERT INTO public.academy_questions (module_id, prompt, options, correct_key, explanation, order_index) VALUES
('m-dtop', 'What does DTOP stand for?',
 '[{"key":"a","label":"Data, Training, Operations, Performance"},{"key":"b","label":"Detect, Trigger, Orchestrate, Prove"},{"key":"c","label":"Detect, Track, Operate, Plan"},{"key":"d","label":"Discover, Train, Orchestrate, Publish"}]'::jsonb,
 'b', 'Detect → Trigger → Orchestrate → Prove. Memorise the order; never reorder it on a whiteboard.', 1),
('m-dtop', 'Between which two DTOP steps does a prospect''s loop most commonly break?',
 '[{"key":"a","label":"Detect and Trigger"},{"key":"b","label":"Trigger and Orchestrate"},{"key":"c","label":"Orchestrate and Prove"},{"key":"d","label":"Prove and Detect"}]'::jsonb,
 'b', 'Most operators detect and even trigger — but the work doesn''t orchestrate across content/training/safety. That gap is your wedge.', 2),
('m-dtop', 'What is the value lever DTOP unlocks that point solutions cannot?',
 '[{"key":"a","label":"Lower per-seat pricing"},{"key":"b","label":"A closed loop from operational signal to verified outcome with auditable proof"},{"key":"c","label":"Bigger reports"},{"key":"d","label":"More dashboards"}]'::jsonb,
 'b', 'Point solutions cover one or two steps. Only this platform closes the full loop with auditable proof.', 3),
('m-dtop', 'Best delivery tip when running DTOP in a meeting?',
 '[{"key":"a","label":"Read the slide aloud word-for-word"},{"key":"b","label":"Skip the model and jump to features"},{"key":"c","label":"Whiteboard it (even on Zoom), then ask which step breaks first for them today"},{"key":"d","label":"Send it as a PDF afterwards"}]'::jsonb,
 'c', 'Drawing DTOP earns you the right to ask the discovery question — their answer becomes your walkthrough.', 4),
('m-dtop', 'A prospect says "we already have AI for that — how is DTOP different?"',
 '[{"key":"a","label":"DTOP is also AI"},{"key":"b","label":"DTOP is the operating model — the closed loop. AI is one input at the Detect step. Generic AI cannot Orchestrate or Prove across your stack"},{"key":"c","label":"DTOP replaces all AI"},{"key":"d","label":"DTOP is open-source AI"}]'::jsonb,
 'b', 'DTOP is the operating model that closes the loop. AI sits inside Detect; only the platform Orchestrates and Proves.', 5),
('m-dtop', 'Why is DTOP placed in Week 1 (Foundation), not in the Capabilities week?',
 '[{"key":"a","label":"It is a minor feature"},{"key":"b","label":"It is the operating model that frames every capability — reps must internalise it before learning the capabilities that map onto it"},{"key":"c","label":"It is only for technical buyers"},{"key":"d","label":"It is a marketing slogan"}]'::jsonb,
 'b', 'DTOP is the frame, not a feature. Reps learn the loop first, then map each capability onto it in Week 2.', 6);

-- INSIGHTS
INSERT INTO public.academy_questions (module_id, prompt, options, correct_key, explanation, order_index) VALUES
('m-insights', 'What is Insights & Recommendations, in one sentence?',
 '[{"key":"a","label":"A static dashboard product"},{"key":"b","label":"A monthly PDF report"},{"key":"c","label":"The intelligence layer that turns operational data into recommended actions a person can take today"},{"key":"d","label":"A chatbot for HR"}]'::jsonb,
 'c', 'Insights & Recommendations is the intelligence layer — it surfaces recommended actions grounded in operational data, not chat.', 1),
('m-insights', 'What is the canonical accuracy headline for CoAnalyst vs generic AI?',
 '[{"key":"a","label":"~50% vs ~50%"},{"key":"b","label":"~90% domain accuracy vs ~35% generic AI on the same questions"},{"key":"c","label":"~70% vs ~60%"},{"key":"d","label":"It is the same"}]'::jsonb,
 'b', 'Approximately 90% domain accuracy versus around 35% for generic AI on the same operational questions — say it word-for-word.', 2),
('m-insights', 'What pain does Insights & Recommendations primarily address?',
 '[{"key":"a","label":"Slow procurement cycles"},{"key":"b","label":"Hardware refresh costs"},{"key":"c","label":"Operators sitting on years of operational data but unable to act on it — their generic-AI pilots returned plausible-sounding but unreliable answers"},{"key":"d","label":"Lack of training rooms"}]'::jsonb,
 'c', 'The pain is unactionable data and burnt generic-AI pilots. Insights closes that gap with domain-trained recommendations.', 3),
('m-insights', 'Which is a strong discovery question for Insights?',
 '[{"key":"a","label":"Do you have a CRM?"},{"key":"b","label":"How many years of operational data are you sitting on that you can''t actually act on today?"},{"key":"c","label":"What is your wifi speed?"},{"key":"d","label":"How many vendors do you use?"}]'::jsonb,
 'b', 'Anchor the conversation on unactionable data — every operator has it, and Insights is the lever to convert it into recommended actions.', 4),
('m-insights', 'Per the locked roadmap, when does the Insights POC land?',
 '[{"key":"a","label":"H1 2026 — and POC means an internal prototype, not customer-usable production"},{"key":"b","label":"2024"},{"key":"c","label":"2030"},{"key":"d","label":"Already shipped to all customers"}]'::jsonb,
 'a', 'Insights POC is H1 2026. POC is an internal prototype — it is NOT production functionality customers can use yet.', 5),
('m-insights', 'A prospect asks "isn''t this just GPT in a wrapper?" — best answer?',
 '[{"key":"a","label":"Yes, but with our logo"},{"key":"b","label":"It is grounded in aviation operational data and the customer''s own schema; the difference between a chat assistant and an analyst is whether it knows your operation"},{"key":"c","label":"It uses a faster model"},{"key":"d","label":"It is built on the same model as GPT"}]'::jsonb,
 'b', 'Lead with grounding. Never bash competitors by name — say "general-purpose tools" or "chat assistants".', 6);

-- AUTOMATION
INSERT INTO public.academy_questions (module_id, prompt, options, correct_key, explanation, order_index) VALUES
('m-automation', 'Where does Automation sit inside DTOP?',
 '[{"key":"a","label":"It is the Detect step"},{"key":"b","label":"It is the Trigger and Orchestrate steps — the part that actually closes the loop"},{"key":"c","label":"It is the Prove step only"},{"key":"d","label":"It is outside DTOP"}]'::jsonb,
 'b', 'Automation is what fires the Trigger and runs the Orchestrate steps — it is how the loop actually closes, not just how it''s observed.', 1),
('m-automation', 'How is Comply365 Automation different from generic RPA?',
 '[{"key":"a","label":"It clicks on screens faster"},{"key":"b","label":"It is aviation-aware and operates on the shared operational data foundation, so a single trigger can author a procedure update, push a training change, and log proof — across products"},{"key":"c","label":"It costs less"},{"key":"d","label":"It runs on Windows"}]'::jsonb,
 'b', 'RPA scripts a UI. Automation orchestrates across products on the shared foundation — that is the platform value lever.', 2),
('m-automation', 'Per the locked roadmap, the Automation POC is targeted for…',
 '[{"key":"a","label":"H2 2026 — POC means internal prototype, not GA"},{"key":"b","label":"H1 2024"},{"key":"c","label":"2030"},{"key":"d","label":"Shipping to all customers next month"}]'::jsonb,
 'a', 'Automation POC is H2 2026. POC is a prototype the team uses internally before committing to roadmap GA.', 3),
('m-automation', 'A safety signal lands. What does Automation do that a point tool will not?',
 '[{"key":"a","label":"Send a Slack message and stop"},{"key":"b","label":"Create a ticket and assign it to the safety inbox only"},{"key":"c","label":"Trigger a redline in ContentManager365, push a training delta in TrainingManager365, and log the closed loop in SafetyManager365 — all on the shared foundation"},{"key":"d","label":"Email the regulator"}]'::jsonb,
 'c', 'Automation runs across products because they share one foundation. That cross-product orchestration is the differentiator.', 4),
('m-automation', 'Best discovery question for Automation?',
 '[{"key":"a","label":"Do you like robots?"},{"key":"b","label":"When a safety or regulatory trigger fires, how many manual steps does it take today before a procedure or training change is live with crews?"},{"key":"c","label":"What is your IT budget?"},{"key":"d","label":"How many automations did you build last year?"}]'::jsonb,
 'b', 'Anchor on manual-step count between trigger and crew-live. That count is the ROI line.', 5),
('m-automation', 'What you must NOT promise on the Automation slide?',
 '[{"key":"a","label":"That POC is an internal prototype"},{"key":"b","label":"That Automation closes the DTOP loop"},{"key":"c","label":"Recommended Actions GA in H1 2026 — Paul and Barak pushed back; recommendations come later"},{"key":"d","label":"That Automation is in roadmap"}]'::jsonb,
 'c', 'Do not promise Recommended Actions GA early — that has been explicitly pushed back. Lead with POC dates only.', 6);

-- MOBILE
INSERT INTO public.academy_questions (module_id, prompt, options, correct_key, explanation, order_index) VALUES
('m-mobile', 'What is the one-line message for the Unified Mobile App?',
 '[{"key":"a","label":"Cheaper than other mobile apps"},{"key":"b","label":"One app for the frontline — content, training, and safety reporting in the same shell, same login, same offline behaviour"},{"key":"c","label":"A mobile dashboard for executives"},{"key":"d","label":"An SDK for partners"}]'::jsonb,
 'b', 'One app, one login, one offline shell — that is the frontline-adoption value lever.', 1),
('m-mobile', 'Per the locked phased roadmap, what is Phase 1?',
 '[{"key":"a","label":"Full unified shell in H1 2026"},{"key":"b","label":"Training screens in the Comply iOS Mobile app — H1 2026"},{"key":"c","label":"Safety Reporting — H1 2026"},{"key":"d","label":"Marketing landing page — H1 2026"}]'::jsonb,
 'b', 'Phase 1 = Training screens in the Comply iOS Mobile app, H1 2026. Be precise — do not promise the unified shell.', 2),
('m-mobile', 'When does Phase 3 (fully unified content + training + safety) land?',
 '[{"key":"a","label":"H1 2026"},{"key":"b","label":"H2 2026"},{"key":"c","label":"2027 and beyond"},{"key":"d","label":"Already live"}]'::jsonb,
 'c', 'Phase 3 — the fully unified experience across content, training and safety — is 2027 and beyond. Do not over-promise.', 3),
('m-mobile', 'What pain does the Unified Mobile App address?',
 '[{"key":"a","label":"Crews juggle three to five separate apps with separate logins and quirks; adoption suffers"},{"key":"b","label":"Crews do not have phones"},{"key":"c","label":"The wifi is bad"},{"key":"d","label":"Crews cannot read"}]'::jsonb,
 'a', 'Multi-app fatigue kills adoption — one shell is the fix.', 4),
('m-mobile', 'Best discovery question for Mobile?',
 '[{"key":"a","label":"What phone do you carry?"},{"key":"b","label":"How many separate apps does your frontline juggle today?"},{"key":"c","label":"Do you use Android or iOS?"},{"key":"d","label":"Do you use email on mobile?"}]'::jsonb,
 'b', 'The juggling-app count is universally painful and gives you the wedge for the unified-shell value lever.', 5),
('m-mobile', 'What must reps NOT say when delivering the Mobile slide?',
 '[{"key":"a","label":"Phase 1 is H1 2026"},{"key":"b","label":"The fully unified shell is shipping next year"},{"key":"c","label":"Phase 3 is 2027 and beyond"},{"key":"d","label":"One app, one login"}]'::jsonb,
 'b', 'Do not promise the full unified shell in 2026. It is phased — Training first, Safety second, full unification 2027+.', 6);

-- PLATFORM
INSERT INTO public.academy_questions (module_id, prompt, options, correct_key, explanation, order_index) VALUES
('m-platform', 'How many architectural layers does the platform have, and what are they?',
 '[{"key":"a","label":"Three: hardware, software, services"},{"key":"b","label":"Four: Operational Core (apps), Intelligence layer, Unified Mobile, DTOP wrapping it all"},{"key":"c","label":"Two: backend and frontend"},{"key":"d","label":"Five: too many to name"}]'::jsonb,
 'b', 'Operational Core (the three -365 apps), Intelligence (CoAnalyst + Insights + Automation), Unified Mobile, and DTOP wrapping them.', 1),
('m-platform', 'Which three apps make up the Operational Core?',
 '[{"key":"a","label":"SafetyManager, ContentManager, TrainingManager"},{"key":"b","label":"SafetyManager365, ContentManager365, TrainingManager365"},{"key":"c","label":"Safety365, Content365, Training365"},{"key":"d","label":"SafetyApp, ContentApp, TrainingApp"}]'::jsonb,
 'b', 'Strict BrandNumber naming — no spaces, the "365" is part of the product name.', 2),
('m-platform', 'What is the core pain the platform addresses?',
 '[{"key":"a","label":"Customers want more dashboards"},{"key":"b","label":"Operators pay for five to seven tools that do not share data and are integrated with brittle point-to-point connections"},{"key":"c","label":"Customers cannot find a CRM"},{"key":"d","label":"Operators want cheaper email"}]'::jsonb,
 'b', 'Stack sprawl plus brittle integrations is the pain — one foundation is the platform value lever.', 3),
('m-platform', 'What is the "value lever" of a connected platform?',
 '[{"key":"a","label":"More logos in the footer"},{"key":"b","label":"One shared operational data foundation lifts every workflow on top of it — platform value compounds"},{"key":"c","label":"A faster login screen"},{"key":"d","label":"More SKUs to sell"}]'::jsonb,
 'b', 'Compounding platform value — one foundation, many workflows. That is what beats best-of-breed checklists.', 4),
('m-platform', 'How should a rep open the platform diagram in a customer meeting?',
 '[{"key":"a","label":"Read every box left to right"},{"key":"b","label":"Point to the foundation first, then the apps, then the intelligence layer, then mobile, then DTOP wrapping it all"},{"key":"c","label":"Jump straight to pricing"},{"key":"d","label":"Skip the diagram"}]'::jsonb,
 'b', 'Land the shape, not the features. Customers ask for the deep-dive when they''re ready.', 5),
('m-platform', 'Why is Comply365 uniquely positioned at the platform level?',
 '[{"key":"a","label":"It is the only vendor selling all three categories on one operational data foundation with an intelligence layer on top"},{"key":"b","label":"It has the cheapest licensing"},{"key":"c","label":"It is open source"},{"key":"d","label":"It is hosted on the same cloud as competitors"}]'::jsonb,
 'a', 'Defensible message: one foundation across safety, content, and training, with intelligence on top — competitors cover one slice at a time.', 6);

-- REGULATION MANAGEMENT
INSERT INTO public.academy_questions (module_id, prompt, options, correct_key, explanation, order_index) VALUES
('m-regmgmt', 'What problem does Regulation Management solve?',
 '[{"key":"a","label":"Regulators don''t exist"},{"key":"b","label":"Regulatory change arrives in PDFs and emails; tracing one rule change through manuals, procedures, and training takes weeks and is error-prone"},{"key":"c","label":"Customers want fewer regulations"},{"key":"d","label":"Regulators stopped publishing rules"}]'::jsonb,
 'b', 'The pain is the lag between regulator publishing and crew compliance. We compress that lag.', 1),
('m-regmgmt', 'How does Regulation Management map onto DTOP?',
 '[{"key":"a","label":"It only does Detect"},{"key":"b","label":"Detect = regulator change feed; Trigger = impacted-doc/training delta; Orchestrate = redline + publish; Prove = traceable audit trail"},{"key":"c","label":"It skips DTOP"},{"key":"d","label":"It does only Prove"}]'::jsonb,
 'b', 'It runs the full DTOP loop on regulatory signals — that is exactly why it sells.', 2),
('m-regmgmt', 'Which is a value pillar of Regulation Management?',
 '[{"key":"a","label":"Cheaper licensing"},{"key":"b","label":"Faster regulator-to-crew lead time, with an auditable trail that assembles itself"},{"key":"c","label":"More dashboards"},{"key":"d","label":"More email templates"}]'::jsonb,
 'b', 'Speed plus self-assembling audit trail — those are the defensible value pillars.', 3),
('m-regmgmt', 'How should reps avoid pitching it as a "document management system"?',
 '[{"key":"a","label":"By calling it a DMS anyway"},{"key":"b","label":"By calling it the procedural source of truth that drives action — a regulator-change signal authors a redline and pushes it to crews"},{"key":"c","label":"By avoiding the word procedure"},{"key":"d","label":"By focusing on backup and recovery"}]'::jsonb,
 'b', 'Never sell this as DMS — it is action-driving content tied to live regulatory signals.', 4),
('m-regmgmt', 'Best discovery question for Regulation Management?',
 '[{"key":"a","label":"How many regulators do you deal with?"},{"key":"b","label":"When a regulator changes a rule tomorrow, how do you know every crew has the updated procedure?"},{"key":"c","label":"What is your IT budget?"},{"key":"d","label":"How many auditors do you use?"}]'::jsonb,
 'b', 'This question forces the prospect to describe their own lag — that lag is your wedge.', 5),
('m-regmgmt', 'Which is the cleanest objection answer to "we already do this manually"?',
 '[{"key":"a","label":"Then keep doing it manually"},{"key":"b","label":"Manual works until it doesn''t — the cost is the audit gap, not the headcount. Show me the last three rule changes and how long it took to land on the line"},{"key":"c","label":"Manual is illegal"},{"key":"d","label":"Manual costs zero"}]'::jsonb,
 'b', 'Reframe from headcount to audit gap and time-to-line. That is what the platform compresses.', 6);
