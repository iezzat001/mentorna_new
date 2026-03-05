-- Create valuation_submissions table to store startup valuation calculator submissions
CREATE TABLE IF NOT EXISTS valuation_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Calculator inputs
  mrr NUMERIC NOT NULL CHECK (mrr >= 0),
  industry TEXT NOT NULL,
  growth_rate NUMERIC NOT NULL CHECK (growth_rate >= 0),
  investment_amount NUMERIC NOT NULL CHECK (investment_amount >= 0),

  -- Calculator outputs
  base_valuation NUMERIC NOT NULL CHECK (base_valuation >= 0),
  growth_adjusted_valuation NUMERIC NOT NULL CHECK (growth_adjusted_valuation >= 0),
  post_money_valuation NUMERIC NOT NULL CHECK (post_money_valuation >= 0),
  dilution_percent NUMERIC NOT NULL CHECK (dilution_percent >= 0 AND dilution_percent <= 100),

  CONSTRAINT fk_valuation_submissions_lead
    FOREIGN KEY (lead_id) REFERENCES magnet_leads(id)
    ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_valuation_submissions_created_at ON valuation_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_valuation_submissions_lead_id ON valuation_submissions(lead_id);
CREATE INDEX IF NOT EXISTS idx_valuation_submissions_industry ON valuation_submissions(industry);

ALTER TABLE valuation_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (for calculator submissions on public pages)
CREATE POLICY "Anyone can insert valuation submissions"
  ON valuation_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can view all submissions
CREATE POLICY "Authenticated users can view all valuation submissions"
  ON valuation_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update submissions
CREATE POLICY "Authenticated users can update all valuation submissions"
  ON valuation_submissions
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can delete submissions
CREATE POLICY "Authenticated users can delete all valuation submissions"
  ON valuation_submissions
  FOR DELETE
  TO authenticated
  USING (true);

COMMENT ON TABLE valuation_submissions IS 'Stores inputs/outputs from the startup valuation calculator (lead magnet).';
COMMENT ON COLUMN valuation_submissions.lead_id IS 'Optional reference to magnet_leads row created for this submission.';
