/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `role` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (text, primary key)
      - `client_name` (text)
      - `current_stage` (text)
      - `created_at` (timestamp)
      - `last_updated` (timestamp)
      - `created_by` (uuid, references users)
    
    - `order_stages`
      - `id` (uuid, primary key)
      - `order_id` (text, references orders)
      - `stage` (text)
      - `status` (text)
      - `notes` (text)
      - `completed_at` (timestamp)
      - `updated_at` (timestamp)
      - `updated_by` (uuid, references users)
    
    - `order_files`
      - `id` (uuid, primary key)
      - `order_id` (text, references orders)
      - `stage` (text)
      - `name` (text)
      - `url` (text)
      - `type` (text)
      - `uploaded_at` (timestamp)
      - `uploaded_by` (uuid, references users)
    
    - `materials`
      - `id` (uuid, primary key)
      - `name` (text)
      - `quantity` (integer)
      - `unit` (text)
      - `min_threshold` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `updated_by` (uuid, references users)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users Table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  name text,
  role text NOT NULL DEFAULT 'worker',
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Orders Table
CREATE TABLE orders (
  id text PRIMARY KEY,
  client_name text NOT NULL,
  current_stage text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_updated timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id)
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (true);

-- Order Stages Table
CREATE TABLE order_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text REFERENCES orders(id) ON DELETE CASCADE,
  stage text NOT NULL,
  status text NOT NULL,
  notes text,
  completed_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES users(id)
);

ALTER TABLE order_stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all order stages"
  ON order_stages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create order stages"
  ON order_stages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update order stages"
  ON order_stages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Order Files Table
CREATE TABLE order_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text REFERENCES orders(id) ON DELETE CASCADE,
  stage text NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  type text NOT NULL,
  uploaded_at timestamptz DEFAULT now(),
  uploaded_by uuid REFERENCES users(id)
);

ALTER TABLE order_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all order files"
  ON order_files
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can upload files"
  ON order_files
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Materials Table
CREATE TABLE materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  unit text NOT NULL,
  min_threshold integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES users(id)
);

ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all materials"
  ON materials
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update materials"
  ON materials
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can create materials"
  ON materials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Functions and Triggers
CREATE OR REPLACE FUNCTION update_last_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON materials
  FOR EACH ROW
  EXECUTE FUNCTION update_last_updated();

CREATE TRIGGER update_orders_last_updated
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_last_updated();