-- Add country field to waiting_list table
ALTER TABLE public.waiting_list 
ADD COLUMN country TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.waiting_list.country IS 'Country/region of the user as selected from dropdown (ISO country code)';
