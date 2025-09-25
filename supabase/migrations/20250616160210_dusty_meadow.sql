/*
  # Add INSERT policy for monitoring logs

  1. Security Changes
    - Add policy to allow authenticated users to insert monitoring logs
    - Add policy to allow anonymous users to insert monitoring logs (for error tracking)
    
  This enables the monitoring system to log events and errors properly.
*/

-- Allow authenticated users to insert monitoring logs
CREATE POLICY "Authenticated users can insert monitoring logs"
  ON monitoring_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow anonymous users to insert monitoring logs (for error tracking)
CREATE POLICY "Anonymous users can insert monitoring logs"
  ON monitoring_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);