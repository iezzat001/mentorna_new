
-- Create a table for waiting list registrations
CREATE TABLE public.waiting_list (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  children_count TEXT NOT NULL,
  age_groups TEXT[] NOT NULL, -- Array to store multiple age groups
  coding_experience TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) 
ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert (for public registration)
CREATE POLICY "Anyone can join waiting list" 
  ON public.waiting_list 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows admins to view all registrations
CREATE POLICY "Admins can view waiting list" 
  ON public.waiting_list 
  FOR SELECT 
  USING (is_admin(auth.uid()));
