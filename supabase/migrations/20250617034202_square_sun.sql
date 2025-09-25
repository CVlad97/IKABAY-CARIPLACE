/*
  # Create suppliers table

  1. New Tables
    - `suppliers`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `phone` (text)
      - `address` (text)
      - `country` (text)
      - `category` (text)
      - `status` (text, not null, default: 'active')
      - `created_at` (timestamp with time zone, default: now())
      - `updated_at` (timestamp with time zone, default: now())
  2. Security
    - Enable RLS on `suppliers` table
    - Add policy for admins to manage suppliers
*/

CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  country text,
  category text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage suppliers
CREATE POLICY "Admins can manage suppliers"
  ON suppliers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create policy for suppliers to read their own data
CREATE POLICY "Suppliers can read their own data"
  ON suppliers
  FOR SELECT
  TO authenticated
  USING (
    email = (
      SELECT email FROM users
      WHERE users.id = auth.uid()
    )
  );

-- Add constraint for valid status values
ALTER TABLE suppliers
  ADD CONSTRAINT valid_status
  CHECK (status = ANY (ARRAY['active', 'inactive', 'pending']));