/*
# Create contact_messages and volunteer_requests tables

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `email` (text, not null)
  - `phone` (text)
  - `subject` (text, not null)
  - `message` (text, not null)
  - `created_at` (timestamp, default now)
- `volunteer_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `email` (text, not null)
  - `phone` (text)
  - `message` (text)
  - `created_at` (timestamp, default now)

2. Security
- Enable RLS on both tables.
- Allow anonymous inserts so anyone can submit forms.
- No select/update/delete policies for public access to protect data.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS volunteer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "anon_insert_volunteer_requests" ON volunteer_requests;
CREATE POLICY "anon_insert_volunteer_requests"
ON volunteer_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);
