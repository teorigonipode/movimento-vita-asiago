-- Migration unificata idempotente per il database Movimento per la Vita Asiago
-- Crea tabelle, colonne, RLS e policy su database vuoto

-- ============================================================
-- contact_messages
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'Nuovo',
  notes text
);

-- ============================================================
-- volunteer_requests
-- ============================================================
CREATE TABLE IF NOT EXISTS volunteer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  availability text,
  motivation text,
  status text NOT NULL DEFAULT 'Nuovo',
  notes text
);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_requests ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS Policies: INSERT pubblico per i form
-- Queste policy permettono a chiunque (anon) di inviare i form.
-- WITH CHECK (true) e' necessario perche' i form del sito pubblico
-- non richiedono autenticazione. I dati sono protetti perche'
-- non esistono policy SELECT/UPDATE/DELETE per anon.
-- ============================================================
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "public_insert_contact_messages" ON contact_messages;
CREATE POLICY "public_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "anon_insert_volunteer_requests" ON volunteer_requests;
DROP POLICY IF EXISTS "public_insert_volunteer_requests" ON volunteer_requests;
CREATE POLICY "public_insert_volunteer_requests" ON volunteer_requests FOR INSERT
  TO anon WITH CHECK (true);

-- ============================================================
-- Preparazione per area admin futura (Sprint 2)
-- Indici per performance su campi di ricerca e filtro
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

CREATE INDEX IF NOT EXISTS idx_volunteer_requests_status ON volunteer_requests(status);
CREATE INDEX IF NOT EXISTS idx_volunteer_requests_created_at ON volunteer_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_volunteer_requests_email ON volunteer_requests(email);
