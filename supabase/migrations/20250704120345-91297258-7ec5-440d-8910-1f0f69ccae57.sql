
-- Add device_type column to visitor_analytics table
ALTER TABLE public.visitor_analytics 
ADD COLUMN device_type text;

-- Add index for device type queries
CREATE INDEX idx_visitor_analytics_device_type ON public.visitor_analytics(device_type);
