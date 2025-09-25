/*
  # IKABAY Suppliers & Multi-Offers Schema

  1. New Tables
    - suppliers (fournisseurs API et locaux)
    - offers (multi-offres par produit)
    - vendors_local (fournisseurs locaux détaillés)
    - catalog_view (vue matérialisée pour meilleure offre)

  2. Security
    - Enable RLS on all tables
    - Public read access for catalog
    - Service role for sync operations
*/

-- Suppliers table (API providers + local)
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('api', 'csv', 'local')),
  enabled boolean DEFAULT true,
  config jsonb DEFAULT '{}',
  last_sync timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Offers table (multi-offers per product)
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  supplier_code text REFERENCES suppliers(code),
  external_id text NOT NULL,
  price numeric NOT NULL,
  stock integer DEFAULT 0,
  currency text DEFAULT 'EUR',
  shipping_days integer DEFAULT 7,
  shipping_fee_est numeric DEFAULT 0,
  raw jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, supplier_code, external_id)
);

-- Local vendors detailed
CREATE TABLE IF NOT EXISTS vendors_local (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_email text,
  city text,
  rating numeric DEFAULT 0,
  description text,
  specialties text[],
  created_at timestamptz DEFAULT now()
);

-- Webhook logs for integrations
CREATE TABLE IF NOT EXISTS webhook_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  event text NOT NULL,
  payload jsonb NOT NULL,
  processed boolean DEFAULT false,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- RLS Policies
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read suppliers" ON suppliers FOR SELECT USING (true);
CREATE POLICY "Service role can manage suppliers" ON suppliers FOR ALL USING (true);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read offers" ON offers FOR SELECT USING (true);
CREATE POLICY "Service role can manage offers" ON offers FOR ALL USING (true);

ALTER TABLE vendors_local ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read vendors_local" ON vendors_local FOR SELECT USING (true);
CREATE POLICY "Service role can manage vendors_local" ON vendors_local FOR ALL USING (true);

ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can manage webhook_logs" ON webhook_logs FOR ALL USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_offers_product_id ON offers(product_id);
CREATE INDEX IF NOT EXISTS idx_offers_supplier ON offers(supplier_code);
CREATE INDEX IF NOT EXISTS idx_offers_price ON offers(price);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_source ON webhook_logs(source, event);

-- Seeds for suppliers
INSERT INTO suppliers(code, name, type, enabled) VALUES
('autods', 'AutoDS', 'api', true),
('cj', 'CJ Dropshipping', 'api', true),
('bigbuy', 'BigBuy', 'api', true),
('faire', 'Faire', 'api', true),
('ankorstore', 'Ankorstore', 'api', true),
('zendrop', 'Zendrop', 'csv', true),
('local', 'Fournisseurs Locaux', 'local', true)
ON CONFLICT (code) DO NOTHING;

-- Sample local vendors
INSERT INTO vendors_local(name, contact_email, city, rating, description, specialties) VALUES
('Atelier Caraïbe', 'contact@atelier-caraibe.com', 'Fort-de-France', 4.7, 'Épices et condiments traditionnels', ARRAY['épices', 'condiments', 'rhum']),
('Coco Beauty', 'info@cocobeauty.mq', 'Schoelcher', 4.5, 'Cosmétiques naturels à base de coco', ARRAY['cosmétiques', 'huiles', 'savons']),
('Artisan Créole', 'artisan@creole.gp', 'Pointe-à-Pitre', 4.8, 'Artisanat traditionnel guadeloupéen', ARRAY['bijoux', 'sculptures', 'textiles'])
ON CONFLICT DO NOTHING;

-- Create materialized view for best offers
CREATE MATERIALIZED VIEW IF NOT EXISTS catalog_view AS
SELECT 
  p.*,
  CASE 
    WHEN local_offer.price IS NOT NULL AND 
         (local_offer.price + COALESCE(local_offer.shipping_fee_est, 0)) <= 
         (best_import.price + COALESCE(best_import.shipping_fee_est, 0)) * 1.10
    THEN local_offer.price
    ELSE COALESCE(best_import.price, p.price)
  END as best_price,
  CASE 
    WHEN local_offer.price IS NOT NULL AND 
         (local_offer.price + COALESCE(local_offer.shipping_fee_est, 0)) <= 
         (best_import.price + COALESCE(best_import.shipping_fee_est, 0)) * 1.10
    THEN local_offer.stock
    ELSE COALESCE(best_import.stock, p.stock)
  END as best_stock,
  CASE 
    WHEN local_offer.price IS NOT NULL AND 
         (local_offer.price + COALESCE(local_offer.shipping_fee_est, 0)) <= 
         (best_import.price + COALESCE(best_import.shipping_fee_est, 0)) * 1.10
    THEN 'local'
    ELSE 'import'
  END as best_origin,
  local_offer.supplier_code as local_supplier,
  best_import.supplier_code as import_supplier
FROM products p
LEFT JOIN (
  SELECT DISTINCT ON (product_id) 
    product_id, supplier_code, price, stock, shipping_fee_est
  FROM offers o
  JOIN suppliers s ON s.code = o.supplier_code
  WHERE s.type = 'local'
  ORDER BY product_id, price ASC
) local_offer ON local_offer.product_id = p.id
LEFT JOIN (
  SELECT DISTINCT ON (product_id) 
    product_id, supplier_code, price, stock, shipping_fee_est
  FROM offers o
  JOIN suppliers s ON s.code = o.supplier_code
  WHERE s.type IN ('api', 'csv')
  ORDER BY product_id, (price + COALESCE(shipping_fee_est, 0)) ASC
) best_import ON best_import.product_id = p.id;

-- Function to refresh catalog view
CREATE OR REPLACE FUNCTION refresh_catalog_view()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW catalog_view;
END;
$$ LANGUAGE plpgsql;