
-- Create a table for founders
CREATE TABLE public.founders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  short_bio TEXT NOT NULL,
  extended_bio TEXT NOT NULL,
  image_url TEXT NOT NULL,
  linkedin_url TEXT DEFAULT '#',
  twitter_url TEXT DEFAULT '#',
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to view founders (for public display)
CREATE POLICY "Anyone can view active founders" 
  ON public.founders 
  FOR SELECT 
  USING (is_active = true);

-- Create policy that allows authenticated users to manage founders
CREATE POLICY "Authenticated users can manage founders" 
  ON public.founders 
  FOR ALL 
  USING (auth.role() = 'authenticated'::text);

-- Insert the existing founders data
INSERT INTO public.founders (name, title, short_bio, extended_bio, image_url, linkedin_url, twitter_url, order_index) VALUES
(
  'Ahmed Ezzat',
  'AI Consultant & Serial Entrepreneur',
  'For five years, I''ve merged my expertise in entrepreneurship and AI into educational initiatives for Arab communities.',
  'For five years, I''ve merged my expertise in entrepreneurship and AI into educational initiatives for Arab communities. I''ve helped students secure spots at top universities and launch innovative projects.',
  'https://d2mp3ttz3u5gci.cloudfront.net/ahmed_ezzat_ai_entrepreneur .png',
  '#',
  '#',
  0
),
(
  'Islam Mosa',
  'Tech Entrepreneur, & 40 under 40 by HBJ',
  'I believe our children have the brilliance to not just adapt, but to lead.',
  'I believe our children have the brilliance to not just adapt, but to lead. My role is to help spark that.',
  'https://d2mp3ttz3u5gci.cloudfront.net/islam_entrepreneur.png',
  '#',
  '#',
  1
);
