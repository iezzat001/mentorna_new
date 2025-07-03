
-- Create an enum for user roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'moderator');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create a function to check if user has admin privileges (admin or super_admin)
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'super_admin')
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Super admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- Update existing table policies to require admin access
DROP POLICY IF EXISTS "Authenticated users can manage founders" ON public.founders;
CREATE POLICY "Admins can manage founders"
  ON public.founders
  FOR ALL
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Authenticated users can manage weeks" ON public.weeks;
CREATE POLICY "Admins can manage weeks"
  ON public.weeks
  FOR ALL
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Authenticated users can manage activities" ON public.week_activities;
CREATE POLICY "Admins can manage activities"
  ON public.week_activities
  FOR ALL
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Authenticated users can manage skills" ON public.week_skills;
CREATE POLICY "Admins can manage skills"
  ON public.week_skills
  FOR ALL
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Authenticated users can manage outcomes" ON public.week_outcomes;
CREATE POLICY "Admins can manage outcomes"
  ON public.week_outcomes
  FOR ALL
  USING (public.is_admin(auth.uid()));

-- Function to automatically assign super_admin role to specific email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if the user email is the super admin email
  IF NEW.email = 'ahmed.ezzat@mentorna.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'super_admin');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically assign roles on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
