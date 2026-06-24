-- Aggiungi campi mancanti a contact_messages
ALTER TABLE contact_messages
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Nuovo',
  ADD COLUMN IF NOT EXISTS notes text;

-- Aggiungi campi mancanti a volunteer_requests
ALTER TABLE volunteer_requests
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Nuovo',
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS availability text,
  ADD COLUMN IF NOT EXISTS motivation text;

-- Rimuovi vecchie policy pubbliche (per sicurezza)
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "anon_insert_volunteer_requests" ON volunteer_requests;

-- RLS gia' attivo, crea policy INSERT anonima per i form pubblici
CREATE POLICY "public_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "public_insert_volunteer_requests" ON volunteer_requests FOR INSERT
  TO anon WITH CHECK (true);

-- Nessuna policy SELECT/UPDATE/DELETE per anon: i dati sono protetti
