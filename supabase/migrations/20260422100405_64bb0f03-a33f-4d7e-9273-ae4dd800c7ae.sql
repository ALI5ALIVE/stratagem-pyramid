-- =========================================
-- Enums
-- =========================================
CREATE TYPE public.app_role AS ENUM ('owner', 'reviewer');
CREATE TYPE public.approval_status AS ENUM ('approved', 'changes_requested', 'pending');

-- =========================================
-- Updated-at helper
-- =========================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =========================================
-- Profiles
-- =========================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Reviewer',
  avatar_color TEXT NOT NULL DEFAULT '#0066FF',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles readable by authenticated"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================
-- User roles
-- =========================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Roles readable by authenticated"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owners manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'owner'))
  WITH CHECK (public.has_role(auth.uid(), 'owner'));

-- =========================================
-- Auto-create profile + default reviewer role on signup
-- =========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  colors TEXT[] := ARRAY['#0066FF','#00B4D8','#FF6B6B','#9D4EDD','#06D6A0','#F4A261','#E63946','#118AB2'];
  fallback_name TEXT;
BEGIN
  fallback_name := COALESCE(
    NEW.raw_user_meta_data->>'display_name',
    split_part(NEW.email, '@', 1),
    'Reviewer'
  );

  INSERT INTO public.profiles (id, display_name, avatar_color)
  VALUES (
    NEW.id,
    fallback_name,
    colors[1 + (abs(hashtext(NEW.id::text)) % array_length(colors, 1))]
  );

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'reviewer');

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================
-- Slide comments
-- =========================================
CREATE TABLE public.slide_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id TEXT NOT NULL,
  slide_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.slide_comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_slide_comments_deck_slide ON public.slide_comments(deck_id, slide_id);
CREATE INDEX idx_slide_comments_user ON public.slide_comments(user_id);

ALTER TABLE public.slide_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments readable by authenticated"
  ON public.slide_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users insert own comments"
  ON public.slide_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own comments"
  ON public.slide_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own comments"
  ON public.slide_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Owners delete any comment"
  ON public.slide_comments FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'owner'));

CREATE TRIGGER trg_slide_comments_updated_at
  BEFORE UPDATE ON public.slide_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.validate_comment_body()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF length(btrim(NEW.body)) < 1 OR length(NEW.body) > 2000 THEN
    RAISE EXCEPTION 'Comment body must be between 1 and 2000 characters';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_slide_comments_validate
  BEFORE INSERT OR UPDATE ON public.slide_comments
  FOR EACH ROW EXECUTE FUNCTION public.validate_comment_body();

-- =========================================
-- Slide approvals
-- =========================================
CREATE TABLE public.slide_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id TEXT NOT NULL,
  slide_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.approval_status NOT NULL DEFAULT 'pending',
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (deck_id, slide_id, user_id)
);

CREATE INDEX idx_slide_approvals_deck_slide ON public.slide_approvals(deck_id, slide_id);

ALTER TABLE public.slide_approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approvals readable by authenticated"
  ON public.slide_approvals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users insert own approvals"
  ON public.slide_approvals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own approvals"
  ON public.slide_approvals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own approvals"
  ON public.slide_approvals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Owners delete any approval"
  ON public.slide_approvals FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'owner'));

CREATE TRIGGER trg_slide_approvals_updated_at
  BEFORE UPDATE ON public.slide_approvals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================
-- Realtime
-- =========================================
ALTER TABLE public.slide_comments REPLICA IDENTITY FULL;
ALTER TABLE public.slide_approvals REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.slide_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.slide_approvals;
