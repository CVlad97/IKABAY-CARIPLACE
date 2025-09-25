-- IKABAY OPS - Migrations pour connecteurs autonomes
-- Étend le schéma existant avec les tables pour DHL, Revolut, TTOM

-- Table des expéditions (DHL Express + TTOM)
CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  provider text NOT NULL CHECK (provider IN ('dhl', 'ttom')),
  mode text NOT NULL CHECK (mode IN ('air', 'sea')),
  tracking_number text,
  label_url text,
  cost numeric,
  currency text DEFAULT 'EUR',
  status text DEFAULT 'pending',
  provider_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des payouts (Revolut Business)
CREATE TABLE IF NOT EXISTS payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL DEFAULT 'revolut',
  beneficiary_email text NOT NULL,
  beneficiary_name text,
  iban text,
  bic text,
  amount numeric NOT NULL,
  currency text DEFAULT 'EUR',
  reference text,
  status text DEFAULT 'pending',
  provider_payout_id text,
  provider_data jsonb,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Table des logs webhooks
CREATE TABLE IF NOT EXISTS webhook_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  signature text,
  processed boolean DEFAULT false,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Table des devis douanes (pour Martinique)
CREATE TABLE IF NOT EXISTS duty_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  destination_country text NOT NULL,
  cif_value numeric NOT NULL,
  currency text DEFAULT 'EUR',
  tva_rate numeric DEFAULT 0.085, -- 8.5% Martinique
  octroi_rate numeric DEFAULT 0.0, -- Variable selon HS code
  estimated_duties numeric,
  estimated_taxes numeric,
  total_estimated numeric,
  hs_codes jsonb, -- Codes douaniers des produits
  created_at timestamptz DEFAULT now()
);

-- Étendre la table orders existante
DO $$
BEGIN
  -- Ajouter colonnes si elles n'existent pas
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'duty_total') THEN
    ALTER TABLE orders ADD COLUMN duty_total numeric DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'shipping_mode') THEN
    ALTER TABLE orders ADD COLUMN shipping_mode text CHECK (shipping_mode IN ('air', 'sea'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'shipping_cost') THEN
    ALTER TABLE orders ADD COLUMN shipping_cost numeric DEFAULT 0;
  END IF;
END $$;

-- RLS Policies
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read shipments" ON shipments FOR SELECT USING (true);
CREATE POLICY "Service role can manage shipments" ON shipments FOR ALL USING (true);

ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can manage payouts" ON payouts FOR ALL USING (true);

ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can manage webhook_logs" ON webhook_logs FOR ALL USING (true);

ALTER TABLE duty_quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read duty_quotes" ON duty_quotes FOR SELECT USING (true);
CREATE POLICY "Service role can manage duty_quotes" ON duty_quotes FOR ALL USING (true);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_shipments_order_id ON shipments(order_id);
CREATE INDEX IF NOT EXISTS idx_shipments_tracking ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_payouts_beneficiary ON payouts(beneficiary_email);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_provider ON webhook_logs(provider, event_type);
CREATE INDEX IF NOT EXISTS idx_duty_quotes_order ON duty_quotes(order_id);