DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'sandbox_exec') THEN
    GRANT INSERT, UPDATE, SELECT ON public.content_items, public.briefs, public.content_pillars TO sandbox_exec;
  END IF;
END $$;