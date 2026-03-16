-- Create magnet_leads table to store lead magnet subscriptions
CREATE TABLE IF NOT EXISTS magnet_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  whatsapp TEXT,
  source TEXT NOT NULL DEFAULT 'Vibe Coding',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Ensure at least one contact method is provided
  CONSTRAINT check_contact_method CHECK (
    email IS NOT NULL OR whatsapp IS NOT NULL
  )
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_magnet_leads_source ON magnet_leads(source);
CREATE INDEX IF NOT EXISTS idx_magnet_leads_created_at ON magnet_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_magnet_leads_email ON magnet_leads(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_magnet_leads_whatsapp ON magnet_leads(whatsapp) WHERE whatsapp IS NOT NULL;

-- Enable Row Level Security (RLS)
ALTER TABLE magnet_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (for lead capture forms)
CREATE POLICY "Anyone can insert magnet leads"
  ON magnet_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can view all leads
CREATE POLICY "Authenticated users can view all magnet leads"
  ON magnet_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update leads
CREATE POLICY "Authenticated users can update magnet leads"
  ON magnet_leads
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can delete leads
CREATE POLICY "Authenticated users can delete magnet leads"
  ON magnet_leads
  FOR DELETE
  TO authenticated
  USING (true);

-- Add comment to table
COMMENT ON TABLE magnet_leads IS 'Stores email and WhatsApp contacts from lead magnet pages';
COMMENT ON COLUMN magnet_leads.source IS 'Lead magnet source tag (e.g., Vibe Coding, Free Guide, etc.)';
COMMENT ON COLUMN magnet_leads.email IS 'User email address (optional if WhatsApp provided)';
COMMENT ON COLUMN magnet_leads.whatsapp IS 'User WhatsApp number (optional if email provided)';
