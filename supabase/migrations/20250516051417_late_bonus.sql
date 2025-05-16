/*
  # Auth System Updates

  1. Updates
    - Add phone_number to users table
    - Add is_admin flag to users table
    - Add verification_code table for OTP
*/

ALTER TABLE users 
ADD COLUMN phone_number text UNIQUE,
ADD COLUMN is_admin boolean DEFAULT false;

CREATE TABLE verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  code text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert verification codes"
  ON verification_codes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own verification codes"
  ON verification_codes
  FOR SELECT
  TO authenticated
  USING (phone_number = (SELECT phone_number FROM users WHERE id = auth.uid()));