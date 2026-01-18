-- Create signed_contracts table for mentorship agreements
CREATE TABLE IF NOT EXISTS public.signed_contracts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  signature TEXT NOT NULL,
  offer_type TEXT NOT NULL DEFAULT 'solopreneur_launchpad',
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EGP',
  installment_amount DECIMAL(10,2) NOT NULL,
  installments_count INTEGER NOT NULL DEFAULT 3,
  agreed_terms JSONB NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'pending', -- pending, active, completed, refunded, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.signed_contracts ENABLE ROW LEVEL SECURITY;

-- Allow insert from anonymous users (for form submission)
CREATE POLICY "Allow anonymous insert" ON public.signed_contracts
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users to read all contracts (admin)
CREATE POLICY "Allow authenticated read" ON public.signed_contracts
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to update contracts (admin)
CREATE POLICY "Allow authenticated update" ON public.signed_contracts
  FOR UPDATE TO authenticated USING (true);

-- Create index for faster queries
CREATE INDEX idx_signed_contracts_email ON public.signed_contracts(email);
CREATE INDEX idx_signed_contracts_status ON public.signed_contracts(status);
CREATE INDEX idx_signed_contracts_signed_at ON public.signed_contracts(signed_at DESC);
