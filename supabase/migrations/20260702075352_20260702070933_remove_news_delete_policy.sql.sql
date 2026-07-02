-- Remove DELETE policy from news_posts (admin uses archiving instead)
DROP POLICY IF EXISTS admin_delete_news ON public.news_posts;
