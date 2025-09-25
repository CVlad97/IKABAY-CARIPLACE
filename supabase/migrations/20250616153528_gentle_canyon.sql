/*
  # Security and Monitoring Schema for IKABAY

  1. New Tables
    - security_logs (authentication and security events)
    - monitoring_logs (system monitoring events)
    - user_consents (GDPR consent tracking)
    - backups (database backups)
    - roles (custom roles and permissions)
    - role_permissions (permissions for custom roles)

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Security Logs table
CREATE TABLE IF NOT EXISTS security_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_name text NOT NULL,
  user_id uuid,
  ip_address text,
  user_agent text,
  details jsonb,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read security logs"
  ON security_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'super_admin')
    )
  );

-- Monitoring Logs table
CREATE TABLE IF NOT EXISTS monitoring_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_data jsonb NOT NULL,
  user_id uuid,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE monitoring_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read monitoring logs"
  ON monitoring_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'super_admin')
    )
  );

-- User Consents table (GDPR)
CREATE TABLE IF NOT EXISTS user_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  marketing_consent boolean NOT NULL DEFAULT false,
  analytics_consent boolean NOT NULL DEFAULT false,
  third_party_consent boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_consents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own consents"
  ON user_consents
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own consents"
  ON user_consents
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Backups table
CREATE TABLE IF NOT EXISTS backups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text,
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE backups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read backups"
  ON backups
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'super_admin')
    )
  );

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  permissions text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage roles"
  ON roles
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'super_admin')
    )
  );

-- Add transaction functions
CREATE OR REPLACE FUNCTION begin_transaction()
RETURNS void AS $$
BEGIN
  -- This is a placeholder for transaction management
  -- In a real implementation, you would use proper transaction handling
  NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION commit_transaction()
RETURNS void AS $$
BEGIN
  -- This is a placeholder for transaction management
  NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION rollback_transaction()
RETURNS void AS $$
BEGIN
  -- This is a placeholder for transaction management
  NULL;
END;
$$ LANGUAGE plpgsql;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_security_logs_event_type ON security_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON security_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_security_logs_timestamp ON security_logs(timestamp);

CREATE INDEX IF NOT EXISTS idx_monitoring_logs_event_type ON monitoring_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_monitoring_logs_timestamp ON monitoring_logs(timestamp);

CREATE INDEX IF NOT EXISTS idx_user_consents_user_id ON user_consents(user_id);
CREATE INDEX IF NOT EXISTS idx_backups_created_at ON backups(created_at);