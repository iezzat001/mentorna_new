-- Track how community members watch webinar recordings.
-- One row is written per playback "heartbeat" (and for play/complete milestones),
-- letting the admin dashboard compute views, watch time, and retention per webinar.
CREATE TABLE public.webinar_watch_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text NOT NULL,
  webinar_id text NOT NULL,
  event_type text NOT NULL DEFAULT 'heartbeat',
  position_seconds numeric NOT NULL DEFAULT 0,
  watched_seconds numeric NOT NULL DEFAULT 0,
  video_duration numeric,
  device_type text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Only allow the known event types.
ALTER TABLE public.webinar_watch_events
  ADD CONSTRAINT webinar_watch_events_event_type_check
  CHECK (event_type IN ('play', 'heartbeat', 'complete'));

-- Indexes for the dashboard aggregation queries.
CREATE INDEX idx_webinar_watch_events_webinar_id ON public.webinar_watch_events(webinar_id);
CREATE INDEX idx_webinar_watch_events_session_id ON public.webinar_watch_events(session_id);
CREATE INDEX idx_webinar_watch_events_created_at ON public.webinar_watch_events(created_at);

ALTER TABLE public.webinar_watch_events ENABLE ROW LEVEL SECURITY;

-- Admins can read every watch event (for the analytics dashboard).
CREATE POLICY "Admins can view all webinar watch events"
  ON public.webinar_watch_events
  FOR SELECT
  USING (is_admin(auth.uid()));

-- Anyone (including anonymous viewers) can record their own watch events.
CREATE POLICY "Anyone can insert webinar watch events"
  ON public.webinar_watch_events
  FOR INSERT
  WITH CHECK (true);

-- Enable realtime so the dashboard can update live while a webinar is being watched.
ALTER PUBLICATION supabase_realtime ADD TABLE public.webinar_watch_events;
