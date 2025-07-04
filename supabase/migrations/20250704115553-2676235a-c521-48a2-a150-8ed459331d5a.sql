
-- Create visitor analytics table to track visitor data
CREATE TABLE public.visitor_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text NOT NULL,
  page_path text NOT NULL,
  referrer text,
  user_agent text,
  ip_hash text,
  country text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX idx_visitor_analytics_session_id ON public.visitor_analytics(session_id);
CREATE INDEX idx_visitor_analytics_created_at ON public.visitor_analytics(created_at);
CREATE INDEX idx_visitor_analytics_page_path ON public.visitor_analytics(page_path);

-- Enable Row Level Security
ALTER TABLE public.visitor_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view all analytics data
CREATE POLICY "Admins can view all analytics data" 
  ON public.visitor_analytics 
  FOR SELECT 
  USING (is_admin(auth.uid()));

-- Create policy for anyone to insert analytics data (for tracking)
CREATE POLICY "Anyone can insert analytics data" 
  ON public.visitor_analytics 
  FOR INSERT 
  WITH CHECK (true);

-- Enable realtime for live visitor tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_analytics;
