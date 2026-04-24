
CREATE TABLE public.academy_modules (
  id text PRIMARY KEY,
  module_number int NOT NULL,
  title text NOT NULL,
  learning_goal text NOT NULL,
  estimated_minutes int NOT NULL DEFAULT 5,
  slide_ids text[] NOT NULL DEFAULT '{}',
  order_index int NOT NULL,
  pass_threshold int NOT NULL DEFAULT 80,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.academy_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id text NOT NULL REFERENCES public.academy_modules(id) ON DELETE CASCADE,
  prompt text NOT NULL,
  options jsonb NOT NULL,
  correct_key text NOT NULL,
  explanation text NOT NULL DEFAULT '',
  order_index int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_questions_module ON public.academy_questions(module_id);

CREATE TABLE public.academy_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  module_id text NOT NULL REFERENCES public.academy_modules(id) ON DELETE CASCADE,
  score int NOT NULL,
  passed boolean NOT NULL,
  answers jsonb NOT NULL,
  total_questions int NOT NULL,
  correct_count int NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_attempts_user ON public.academy_attempts(user_id);
CREATE INDEX idx_attempts_module ON public.academy_attempts(module_id);

CREATE TRIGGER trg_modules_updated BEFORE UPDATE ON public.academy_modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_questions_updated BEFORE UPDATE ON public.academy_questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.academy_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academy_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academy_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Modules readable by authenticated"
  ON public.academy_modules FOR SELECT TO authenticated USING (true);
CREATE POLICY "Owners manage modules"
  ON public.academy_modules FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'owner'))
  WITH CHECK (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owners read questions"
  ON public.academy_questions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'owner'));
CREATE POLICY "Owners manage questions"
  ON public.academy_questions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'owner'))
  WITH CHECK (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Users read own attempts"
  ON public.academy_attempts FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'owner'));
CREATE POLICY "Users insert own attempts"
  ON public.academy_attempts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.get_module_quiz(_module_id text)
RETURNS TABLE (id uuid, prompt text, options jsonb, order_index int)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT q.id, q.prompt, q.options, q.order_index
  FROM public.academy_questions q
  WHERE q.module_id = _module_id
  ORDER BY q.order_index, q.id;
$$;
REVOKE ALL ON FUNCTION public.get_module_quiz(text) FROM public;
GRANT EXECUTE ON FUNCTION public.get_module_quiz(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.submit_quiz_attempt(_module_id text, _answers jsonb)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_total int;
  v_correct int := 0;
  v_score int;
  v_threshold int;
  v_passed boolean;
  v_per jsonb := '[]'::jsonb;
  v_attempt_id uuid;
  rec record;
  v_chosen text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

  SELECT pass_threshold INTO v_threshold FROM public.academy_modules WHERE id = _module_id;
  IF v_threshold IS NULL THEN RAISE EXCEPTION 'Unknown module: %', _module_id; END IF;

  SELECT count(*) INTO v_total FROM public.academy_questions WHERE module_id = _module_id;
  IF v_total = 0 THEN RAISE EXCEPTION 'Module % has no questions', _module_id; END IF;

  FOR rec IN
    SELECT id, correct_key, explanation FROM public.academy_questions WHERE module_id = _module_id
  LOOP
    v_chosen := NULL;
    SELECT (a->>'chosen_key') INTO v_chosen
    FROM jsonb_array_elements(_answers) a
    WHERE (a->>'question_id') = rec.id::text
    LIMIT 1;

    IF v_chosen IS NOT NULL AND v_chosen = rec.correct_key THEN
      v_correct := v_correct + 1;
      v_per := v_per || jsonb_build_object('id', rec.id, 'correct', true, 'chosen_key', v_chosen, 'correct_key', rec.correct_key, 'explanation', rec.explanation);
    ELSE
      v_per := v_per || jsonb_build_object('id', rec.id, 'correct', false, 'chosen_key', v_chosen, 'correct_key', rec.correct_key, 'explanation', rec.explanation);
    END IF;
  END LOOP;

  v_score := round((v_correct::numeric / v_total::numeric) * 100);
  v_passed := v_score >= v_threshold;

  INSERT INTO public.academy_attempts (user_id, module_id, score, passed, answers, total_questions, correct_count)
  VALUES (v_uid, _module_id, v_score, v_passed, _answers, v_total, v_correct)
  RETURNING id INTO v_attempt_id;

  RETURN jsonb_build_object('attempt_id', v_attempt_id, 'score', v_score, 'passed', v_passed, 'total', v_total, 'correct', v_correct, 'threshold', v_threshold, 'per_question', v_per);
END;
$$;
REVOKE ALL ON FUNCTION public.submit_quiz_attempt(text, jsonb) FROM public;
GRANT EXECUTE ON FUNCTION public.submit_quiz_attempt(text, jsonb) TO authenticated;

CREATE OR REPLACE VIEW public.academy_progress_per_user AS
SELECT
  a.user_id, a.module_id,
  max(a.score) AS best_score,
  bool_or(a.passed) AS passed,
  count(*) AS attempts,
  max(a.completed_at) AS last_attempt_at
FROM public.academy_attempts a
GROUP BY a.user_id, a.module_id;

INSERT INTO public.academy_modules (id, module_number, title, learning_goal, estimated_minutes, slide_ids, order_index) VALUES
  ('m1', 1, 'Why this matters: the strategic shift',
    'By the end of this module you can explain in two sentences why operators are moving from fragmented compliance tools to a connected performance platform — and name the cost of not changing.',
    5, ARRAY['se-slide-shift','se-slide-challenge'], 1),
  ('m2', 2, 'What the platform is, in plain English',
    'By the end of this module you can give the one-sentence pitch and name the four capability bands without reading them off a slide.',
    5, ARRAY['se-slide-whatis','se-slide-value','se-slide-recap-m2'], 2),
  ('m3', 3, 'How the capabilities fit together',
    'By the end of this module you can describe each capability in 60 seconds and ask one good discovery question per capability.',
    7, ARRAY['se-slide-4a','se-slide-4b','se-slide-4c','se-slide-coanalyst','se-slide-insights','se-slide-automation','se-slide-tiers-vs-ai','se-slide-mobile','se-slide-dtop','se-slide-talktrack'], 3),
  ('m4', 4, 'How we sell it: before/after & maturity',
    'By the end of this module you understand the discovery-to-close motion and where the maturity roadmap fits the conversation.',
    4, ARRAY['se-slide-transform','se-slide-maturity'], 4),
  ('m5', 5, 'Use cases & value through DTOP',
    'By the end of this module you can pick the right use case for the prospect''s pain and walk them through Detect-Trigger-Orchestrate-Prove with a defensible cost figure.',
    7, ARRAY['se-slide-usecases','se-slide-safety-uc','se-slide-ops-uc','se-slide-financial-uc','se-slide-regmgmt','se-slide-outcomes'], 5),
  ('m6', 6, 'Why we win',
    'By the end of this module you can handle the top objections and walk a prospect to a 90-day pilot.',
    5, ARRAY['se-slide-objections','se-slide-why','se-slide-closing'], 6);

INSERT INTO public.academy_questions (module_id, prompt, options, correct_key, explanation, order_index) VALUES
('m1','What is the core strategic shift Comply365 is helping operators make?',
 '[{"key":"a","label":"From paper manuals to PDFs"},{"key":"b","label":"From fragmented compliance tools to a connected performance platform"},{"key":"c","label":"From in-house IT to outsourced IT"},{"key":"d","label":"From annual audits to quarterly audits"}]'::jsonb,
 'b','The shift is structural: stop stitching point tools together; run safety, content and training on one connected fabric.',1),
('m1','Which best describes the industry pain we lead with?',
 '[{"key":"a","label":"Software is too expensive"},{"key":"b","label":"Operators have too many users"},{"key":"c","label":"Signals are leaking across siloed safety, content and training systems"},{"key":"d","label":"Regulators move too slowly"}]'::jsonb,
 'c','Fragmentation = leaking signals. Events, content and training each live in their own tool, so patterns and proof are lost.',2),
('m1','Approximately how large is the annual industry exposure we cite for the cost of fragmented operations?',
 '[{"key":"a","label":"$2-5B"},{"key":"b","label":"$25-35B"},{"key":"c","label":"$100B+"},{"key":"d","label":"$500M"}]'::jsonb,
 'b','We cite $25-35B annual exposure across the industry — sourced from EUROCONTROL, IATA, SITA and A4A benchmarks.',3),
('m1','Which is NOT a symptom of the fragmented status quo?',
 '[{"key":"a","label":"Repeat events with no closed-loop action"},{"key":"b","label":"Manual evidence assembly for audits"},{"key":"c","label":"A single source of truth for crew knowledge"},{"key":"d","label":"Training that lags behind procedure changes"}]'::jsonb,
 'c','A single source of truth is the cure, not the symptom. The other three are classic fragmentation pain.',4),
('m1','In one sentence, why does this shift matter to a customer right now?',
 '[{"key":"a","label":"Because AI is trendy"},{"key":"b","label":"Because regulators are getting tougher and signals between safety, content and training are leaking — turning preventable events into repeat events"},{"key":"c","label":"Because cloud is cheaper"},{"key":"d","label":"Because their competitors all bought it"}]'::jsonb,
 'b','Lead with the consequence: leaking signals + tougher regulation = preventable repeat events.',5),

('m2','What is the one-sentence pitch for the Operational Performance Platform?',
 '[{"key":"a","label":"A document management system for airlines"},{"key":"b","label":"A connected platform that turns safety, content and training data into continuous operational performance"},{"key":"c","label":"An AI chatbot for pilots"},{"key":"d","label":"A regulatory reporting tool"}]'::jsonb,
 'b','Connected fabric + safety/content/training data + continuous performance.',1),
('m2','Which is NOT one of the four capability bands of the platform?',
 '[{"key":"a","label":"Core Operational Apps"},{"key":"b","label":"Intelligence and Orchestration"},{"key":"c","label":"Unified Mobile"},{"key":"d","label":"On-prem Data Warehouse"}]'::jsonb,
 'd','The four bands are Core Apps, Intelligence and Orchestration, Unified Mobile, and the DTOP operating model.',2),
('m2','Which three products make up the Core Operational Apps?',
 '[{"key":"a","label":"SafetyManager365, ContentManager365, TrainingManager365"},{"key":"b","label":"Comply365, FlightOps365, CrewManager365"},{"key":"c","label":"SafetyAI, ContentAI, TrainingAI"},{"key":"d","label":"Salesforce, ServiceNow, Workday"}]'::jsonb,
 'a','Three pillars, written exactly: SafetyManager365, ContentManager365, TrainingManager365.',3),
('m2','What does CoAnalyst do in plain English?',
 '[{"key":"a","label":"Generates marketing emails"},{"key":"b","label":"Adds an intelligence layer over the connected data so people get answers, recommendations and prescribed actions instead of reports"},{"key":"c","label":"Replaces the safety officer"},{"key":"d","label":"Stores PDFs"}]'::jsonb,
 'b','Intelligence and orchestration on top of the connected data fabric — answers and actions, not reports.',4),
('m2','What does the platform unlock that point tools cannot?',
 '[{"key":"a","label":"Cheaper licensing"},{"key":"b","label":"A continuous improvement loop where every event triggers content and training updates and the proof is captured automatically"},{"key":"c","label":"Better email"},{"key":"d","label":"Free hardware"}]'::jsonb,
 'b','The unlock is the closed loop: detect, trigger action, orchestrate change, prove the outcome.',5),

('m3','SafetyManager365 is best described as:',
 '[{"key":"a","label":"A reporting form"},{"key":"b","label":"The system of record for safety events, investigations and risk — the source of the Detect signal"},{"key":"c","label":"An LMS"},{"key":"d","label":"A document viewer"}]'::jsonb,
 'b','SafetyManager365 holds the events and risk picture and feeds Detect.',1),
('m3','ContentManager365 owns:',
 '[{"key":"a","label":"Crew rosters"},{"key":"b","label":"Controlled operational content — manuals, procedures, bulletins — with versioning and distribution"},{"key":"c","label":"Financial ledgers"},{"key":"d","label":"Maintenance work orders"}]'::jsonb,
 'b','Controlled content lives here so an action can update procedure on the same fabric.',2),
('m3','TrainingManager365 is responsible for:',
 '[{"key":"a","label":"Recording every flight"},{"key":"b","label":"Competency, training records and assignment of learning triggered by content or safety changes"},{"key":"c","label":"Selling courses"},{"key":"d","label":"Managing payroll"}]'::jsonb,
 'b','Training closes the loop — when content changes or risk rises, training assignments fire automatically.',3),
('m3','How is CoAnalyst different from a generic AI chatbot?',
 '[{"key":"a","label":"It is faster"},{"key":"b","label":"It is grounded in the customer''s own connected safety, content and training data — answers cite the source and trigger orchestrated actions, not just text"},{"key":"c","label":"It speaks more languages"},{"key":"d","label":"It runs offline"}]'::jsonb,
 'b','Grounded, cited, and able to trigger action. Generic AI cannot do that without your data fabric.',4),
('m3','One good discovery question for the Mobile capability is:',
 '[{"key":"a","label":"How much do you spend on phones?"},{"key":"b","label":"When a procedure changes, how long until every front-line user is working off the new version with proof of acknowledgement?"},{"key":"c","label":"Do you like Apple or Android?"},{"key":"d","label":"How many users do you have?"}]'::jsonb,
 'b','Time-to-current and proof of acknowledgement is the real mobile pain — and the value we close.',5),

('m4','In the before/after framing, "before" looks like:',
 '[{"key":"a","label":"Connected loops between safety, content, training"},{"key":"b","label":"Disconnected tools, manual evidence, reactive training, repeat events"},{"key":"c","label":"AI-driven prescribed actions"},{"key":"d","label":"Real-time dashboards"}]'::jsonb,
 'b','Before = fragmented and reactive. After = connected and continuous.',1),
('m4','Where on the maturity curve do most prospects sit when we first meet them?',
 '[{"key":"a","label":"Optimised — closed loop, prescriptive"},{"key":"b","label":"Reactive or partially connected — point tools, manual evidence"},{"key":"c","label":"Fully autonomous"},{"key":"d","label":"Pre-digital"}]'::jsonb,
 'b','Most are stuck in reactive or partially-connected — that is the wedge.',2),
('m4','What is the right way to use the maturity roadmap in a sales conversation?',
 '[{"key":"a","label":"Sell the end-state on day one"},{"key":"b","label":"Anchor where they are today, show the next stage as the first 90-day win, then sequence the climb"},{"key":"c","label":"Skip it — too technical"},{"key":"d","label":"Use it only for executives"}]'::jsonb,
 'b','Meet them where they are, sell the next stage, then sequence. Do not boil the ocean.',3),
('m4','Which is the cleanest "after" outcome to lead with?',
 '[{"key":"a","label":"Fewer users"},{"key":"b","label":"Every event triggers a closed loop of action, content and training — with auditable proof"},{"key":"c","label":"More dashboards"},{"key":"d","label":"Lower IT spend"}]'::jsonb,
 'b','The closed loop with proof is the line that lands.',4),
('m4','Best signal that a prospect is ready to commit to a pilot:',
 '[{"key":"a","label":"They asked for a discount"},{"key":"b","label":"They named a specific repeat event or audit pain they want closed in 90 days"},{"key":"c","label":"They like the logo"},{"key":"d","label":"They have budget left this quarter"}]'::jsonb,
 'b','A named pain with a 90-day window = pilot-ready. Anchor the pilot to it.',5),

('m5','What does DTOP stand for?',
 '[{"key":"a","label":"Detect, Test, Operate, Publish"},{"key":"b","label":"Detect, Trigger, Orchestrate, Prove"},{"key":"c","label":"Data, Training, Ops, Platform"},{"key":"d","label":"Define, Track, Optimise, Predict"}]'::jsonb,
 'b','Detect → Trigger → Orchestrate → Prove. The operating model behind every use case.',1),
('m5','In a Safety use case, what does "Prove" look like?',
 '[{"key":"a","label":"A manager opinion"},{"key":"b","label":"Auditable evidence that the action ran, training was completed and recurrence dropped"},{"key":"c","label":"A press release"},{"key":"d","label":"A new dashboard"}]'::jsonb,
 'b','Prove = evidence chain across action, training, and outcome — automatically captured.',2),
('m5','Which use case is the strongest opener for a regulator-facing prospect?',
 '[{"key":"a","label":"Marketing analytics"},{"key":"b","label":"Regulation Management — turning regulatory change into traced procedure and training updates with audit-ready proof"},{"key":"c","label":"Crew scheduling"},{"key":"d","label":"Fuel optimisation"}]'::jsonb,
 'b','Regulation Management is the cleanest D-T-O-P story for a regulator-driven buyer.',3),
('m5','Picking a use case starts with:',
 '[{"key":"a","label":"What we want to demo"},{"key":"b","label":"The prospect''s named pain and the cost of leaving it unsolved"},{"key":"c","label":"The newest feature"},{"key":"d","label":"What our competitor showed last week"}]'::jsonb,
 'b','Start from their pain and its cost. The use case is the vehicle, not the destination.',4),
('m5','A defensible cost figure to attach to a repeat-event use case comes from:',
 '[{"key":"a","label":"A round number we make up"},{"key":"b","label":"Industry benchmarks (EUROCONTROL, IATA, SITA, A4A) applied to the prospect''s scale"},{"key":"c","label":"Our marketing team"},{"key":"d","label":"The prospect''s annual report only"}]'::jsonb,
 'b','Industry benchmarks scaled to the prospect — that is the defensible model.',5),

('m6','Best response to "we already have a safety system":',
 '[{"key":"a","label":"Yours is bad, ours is better"},{"key":"b","label":"Great — the question is whether your safety system also closes the loop into content and training automatically. That is the gap we close"},{"key":"c","label":"Rip and replace"},{"key":"d","label":"Discount aggressively"}]'::jsonb,
 'b','Reframe to the loop, not the tool. We complete the loop they cannot close on their own.',1),
('m6','Best response to "this looks like a big change project":',
 '[{"key":"a","label":"It is — get used to it"},{"key":"b","label":"We start with one named use case in 90 days that pays for itself, and the maturity roadmap sequences the rest"},{"key":"c","label":"Ignore it"},{"key":"d","label":"Offer free implementation"}]'::jsonb,
 'b','Anchor to the 90-day win and the sequenced roadmap.',2),
('m6','The three differentiators we close with are:',
 '[{"key":"a","label":"Price, support, brand"},{"key":"b","label":"Connected Foundation, DTOP operating model, Proof at Scale"},{"key":"c","label":"AI, mobile, cloud"},{"key":"d","label":"References, reviews, awards"}]'::jsonb,
 'b','Connected Foundation, DTOP, Proof at Scale. Memorise these three.',3),
('m6','First 7 days after a "yes" looks like:',
 '[{"key":"a","label":"Send a quote and wait"},{"key":"b","label":"Lock the pilot scope to one DTOP use case, name the success metric, and schedule the discovery deep-dive"},{"key":"c","label":"Start coding"},{"key":"d","label":"Build a steering committee of 20 people"}]'::jsonb,
 'b','Scope, metric, deep-dive — in week one.',4),
('m6','Why does Comply365 win versus point tools?',
 '[{"key":"a","label":"We are cheaper"},{"key":"b","label":"We are the only platform that runs the full Detect-Trigger-Orchestrate-Prove loop on a connected safety, content and training fabric"},{"key":"c","label":"We have more features"},{"key":"d","label":"We have a bigger sales team"}]'::jsonb,
 'b','It is the loop on the connected fabric. Point tools cannot do that.',5);
