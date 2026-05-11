-- Add week_number + accent_color to academy_modules
ALTER TABLE public.academy_modules
  ADD COLUMN IF NOT EXISTS week_number int,
  ADD COLUMN IF NOT EXISTS accent_color text,
  ADD COLUMN IF NOT EXISTS kicker text;

-- Insert the 3 new week-modules
INSERT INTO public.academy_modules
  (id, module_number, title, learning_goal, estimated_minutes, slide_ids, order_index, pass_threshold, week_number, accent_color, kicker)
VALUES
  (
    'm-w1', 1,
    'Week 1 · Foundation — Set the scene & put the platform in plain English',
    'By the end of Week 1 you can explain in two sentences why operators are moving from fragmented compliance tools to a connected performance platform, give the one-sentence platform pitch, and name the four capability bands — without jargon, without reading off a slide.',
    10,
    ARRAY['se-slide-shift','se-plain-english-shift','se-slide-whatis','se-slide-value','se-slide-recap-m2'],
    1, 80, 1, 'blue', 'Foundation'
  ),
  (
    'm-w2', 2,
    'Week 2 · Capabilities — How the platform fits together',
    'By the end of Week 2 you can describe each capability in 60 seconds, ask one good discovery question per capability, position CoAnalyst against generic AI, and walk DTOP on a whiteboard.',
    7,
    ARRAY['se-slide-4a','se-slide-4b','se-slide-4c','se-slide-coanalyst','se-slide-insights','se-slide-automation','se-slide-tiers-vs-ai','se-slide-mobile','se-slide-dtop','se-slide-talktrack'],
    2, 80, 2, 'violet', 'Capabilities'
  ),
  (
    'm-w3', 3,
    'Week 3 · Sell & Win — Discover, prove, close',
    'By the end of Week 3 you can run discovery → demo → close, pick the right use case for the room, handle the top objections, and end on a focused DTOP walkthrough on the customer''s highest-cost use case.',
    10,
    ARRAY['se-discovery-to-close','se-usecase-cheatsheet','se-slide-regmgmt','se-slide-outcomes','se-slide-objections','se-slide-why','se-slide-closing'],
    3, 80, 3, 'emerald', 'Sell & Win'
  );

-- Re-point quiz questions to week modules
UPDATE public.academy_questions SET module_id = 'm-w1' WHERE module_id IN ('m1','m2');
UPDATE public.academy_questions SET module_id = 'm-w2' WHERE module_id = 'm3';
UPDATE public.academy_questions SET module_id = 'm-w3' WHERE module_id IN ('m4','m5','m6');

-- Renumber order_index per new module so 1..N within each week
WITH ranked AS (
  SELECT id, row_number() OVER (PARTITION BY module_id ORDER BY order_index, created_at) AS rn
  FROM public.academy_questions
  WHERE module_id IN ('m-w1','m-w2','m-w3')
)
UPDATE public.academy_questions q
SET order_index = ranked.rn
FROM ranked
WHERE q.id = ranked.id;

-- Re-point attempts to the week modules (preserves audit trail)
UPDATE public.academy_attempts SET module_id = 'm-w1' WHERE module_id IN ('m1','m2');
UPDATE public.academy_attempts SET module_id = 'm-w2' WHERE module_id = 'm3';
UPDATE public.academy_attempts SET module_id = 'm-w3' WHERE module_id IN ('m4','m5','m6');

-- Delete the original 6 module rows
DELETE FROM public.academy_modules WHERE id IN ('m1','m2','m3','m4','m5','m6');
