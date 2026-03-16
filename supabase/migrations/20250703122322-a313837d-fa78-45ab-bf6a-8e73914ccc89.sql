
-- Create enum for activity types
CREATE TYPE public.activity_type AS ENUM ('assignment', 'workshop', 'seminar', 'project');

-- Create enum for phase types
CREATE TYPE public.phase_type AS ENUM ('Foundation Building', 'Advanced Implementation');

-- Create weeks table to store basic week information
CREATE TABLE public.weeks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_number INTEGER NOT NULL UNIQUE CHECK (week_number >= 1 AND week_number <= 8),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  phase phase_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create week_activities table for individual activities
CREATE TABLE public.week_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_id UUID REFERENCES public.weeks(id) ON DELETE CASCADE NOT NULL,
  activity_type activity_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create week_skills table for skills gained
CREATE TABLE public.week_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_id UUID REFERENCES public.weeks(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create week_outcomes table for learning outcomes
CREATE TABLE public.week_outcomes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  week_id UUID REFERENCES public.weeks(id) ON DELETE CASCADE NOT NULL,
  outcome_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.week_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.week_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.week_outcomes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is educational content)
CREATE POLICY "Anyone can view weeks" ON public.weeks FOR SELECT USING (true);
CREATE POLICY "Anyone can view activities" ON public.week_activities FOR SELECT USING (true);
CREATE POLICY "Anyone can view skills" ON public.week_skills FOR SELECT USING (true);
CREATE POLICY "Anyone can view outcomes" ON public.week_outcomes FOR SELECT USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Authenticated users can manage weeks" ON public.weeks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage activities" ON public.week_activities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage skills" ON public.week_skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage outcomes" ON public.week_outcomes FOR ALL USING (auth.role() = 'authenticated');

-- Insert the existing 8 weeks data
INSERT INTO public.weeks (week_number, title, description, phase) VALUES
(1, 'The Entrepreneurial Mindset', 'Learn to think like a founder and spot problems that become business ideas.', 'Foundation Building'),
(2, 'From Idea to Digital Blueprint', 'Turn ideas into clear plans using AI tools for brainstorming and structure.', 'Foundation Building'),
(3, 'Build a Real App or Website', 'Build a working app or website with drag-and-drop tools. No coding required.', 'Foundation Building'),
(4, 'Talk to Customers', 'Validate ideas by asking the right questions and listening to real feedback.', 'Foundation Building'),
(5, 'Improve It with AI', 'Enhance apps with smart design and features using AI tools.', 'Advanced Implementation'),
(6, 'Test & Get Feedback', 'Test products with real users and learn to iterate based on feedback.', 'Advanced Implementation'),
(7, 'Pitch Like a CEO', 'Master storytelling and confidence to present like a young entrepreneur.', 'Advanced Implementation'),
(8, 'Launch Day', 'Showcase products in a final demo and celebrate the journey from idea to business.', 'Advanced Implementation');
