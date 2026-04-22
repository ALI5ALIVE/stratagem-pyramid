-- Backfill any missing profiles
INSERT INTO public.profiles (id, display_name, avatar_color)
SELECT DISTINCT sc.user_id,
       COALESCE(split_part(u.email, '@', 1), 'Reviewer'),
       '#0066FF'
FROM public.slide_comments sc
LEFT JOIN public.profiles p ON p.id = sc.user_id
LEFT JOIN auth.users u ON u.id = sc.user_id
WHERE p.id IS NULL;

-- Drop existing FK to auth.users and recreate against profiles
ALTER TABLE public.slide_comments
  DROP CONSTRAINT IF EXISTS slide_comments_user_id_fkey;

ALTER TABLE public.slide_comments
  ADD CONSTRAINT slide_comments_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS slide_comments_user_id_idx
  ON public.slide_comments(user_id);

-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';