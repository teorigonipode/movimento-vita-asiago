-- Create news_posts table
CREATE TABLE public.news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'notizia',
  event_date DATE,
  cover_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add constraints
ALTER TABLE public.news_posts
  DROP CONSTRAINT IF EXISTS news_posts_status_check;

ALTER TABLE public.news_posts
  ADD CONSTRAINT news_posts_status_check
  CHECK (status IN ('draft', 'published', 'archived'));

ALTER TABLE public.news_posts
  DROP CONSTRAINT IF EXISTS news_posts_category_check;

ALTER TABLE public.news_posts
  ADD CONSTRAINT news_posts_category_check
  CHECK (category IN ('notizia', 'evento', 'comunicazione'));

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_news_posts_slug ON public.news_posts(slug);
CREATE INDEX IF NOT EXISTS idx_news_posts_status ON public.news_posts(status);
CREATE INDEX IF NOT EXISTS idx_news_posts_published_at ON public.news_posts(published_at DESC);

-- Enable RLS
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;

-- Public policy: anon can only read published posts
CREATE POLICY "public_select_published_news" ON public.news_posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Admin policies: authenticated users can manage all posts
CREATE POLICY "admin_select_all_news" ON public.news_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "admin_insert_news" ON public.news_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "admin_update_news" ON public.news_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "admin_delete_news" ON public.news_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_news_posts_updated_at ON public.news_posts;
CREATE TRIGGER update_news_posts_updated_at
  BEFORE UPDATE ON public.news_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
