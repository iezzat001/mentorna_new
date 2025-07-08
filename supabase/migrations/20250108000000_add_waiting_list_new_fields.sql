-- Add new fields to waiting_list table
ALTER TABLE public.waiting_list 
ADD COLUMN english_level TEXT,
ADD COLUMN relationship TEXT,
ADD COLUMN preferred_days TEXT[];

-- Add comments for documentation
COMMENT ON COLUMN public.waiting_list.english_level IS 'English proficiency level: Beginner, Intermediate, or Advanced';
COMMENT ON COLUMN public.waiting_list.relationship IS 'Relationship to child: Father, Mother, or Educator';
COMMENT ON COLUMN public.waiting_list.preferred_days IS 'Array of preferred days for workshops/sessions';
