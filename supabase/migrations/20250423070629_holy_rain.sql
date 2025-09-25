/*
  # Initial Schema for IKABAY Marketplace

  1. New Tables
    - users (authentication and user profiles)
    - products (marketplace items)
    - orders (purchase history)
    - news_articles (Caribbean news)
    - jobs (employment listings)
    - quizzes (educational games)
    - crypto_wallets (digital currency management)
    - transactions (payment history)

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  country text NOT NULL,
  language text NOT NULL DEFAULT 'fr',
  crypto_wallet text,
  CONSTRAINT valid_role CHECK (role IN ('user', 'supplier', 'partner', 'admin'))
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  currency text NOT NULL DEFAULT 'EUR',
  images text[] NOT NULL,
  category text NOT NULL,
  supplier_id uuid REFERENCES users(id),
  stock integer NOT NULL DEFAULT 0,
  rating numeric DEFAULT 0,
  reviews_count integer DEFAULT 0,
  country_origin text NOT NULL,
  shipping_countries text[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  total numeric NOT NULL,
  currency text NOT NULL DEFAULT 'EUR',
  status text NOT NULL DEFAULT 'pending',
  shipping_address jsonb NOT NULL,
  payment_method text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  CONSTRAINT valid_payment_method CHECK (payment_method IN ('card', 'paypal', 'crypto'))
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- News Articles table
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  author text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read news"
  ON news_articles
  FOR SELECT
  TO public
  USING (true);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  requirements text[] NOT NULL,
  salary_range jsonb NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  CONSTRAINT valid_job_type CHECK (type IN ('full-time', 'part-time', 'contract', 'internship'))
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read jobs"
  ON jobs
  FOR SELECT
  TO public
  USING (true);

-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  questions jsonb NOT NULL,
  reward_points integer NOT NULL DEFAULT 0,
  category text NOT NULL,
  difficulty text NOT NULL,
  CONSTRAINT valid_difficulty CHECK (difficulty IN ('easy', 'medium', 'hard'))
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read quizzes"
  ON quizzes
  FOR SELECT
  TO public
  USING (true);

-- Crypto Wallets table
CREATE TABLE IF NOT EXISTS crypto_wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  balance jsonb NOT NULL DEFAULT '{"BTC": 0, "ETH": 0, "IKC": 0}',
  address text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE crypto_wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own wallet"
  ON crypto_wallets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid REFERENCES crypto_wallets(id),
  type text NOT NULL,
  amount numeric NOT NULL,
  currency text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pending',
  CONSTRAINT valid_transaction_type CHECK (type IN ('send', 'receive', 'stake', 'cashback')),
  CONSTRAINT valid_transaction_status CHECK (status IN ('pending', 'completed', 'failed'))
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM crypto_wallets
    WHERE id = transactions.wallet_id
    AND user_id = auth.uid()
  ));