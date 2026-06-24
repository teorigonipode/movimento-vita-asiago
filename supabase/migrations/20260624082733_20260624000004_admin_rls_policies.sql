/*
# Policy RLS per area amministrativa

1. Modifiche alle tabelle esistenti
   - contact_messages: aggiunta policy SELECT e UPDATE per utenti autenticati
   - volunteer_requests: aggiunta policy SELECT e UPDATE per utenti autenticati

2. Sicurezza
   - Gli utenti anonimi possono solo fare INSERT (form pubblici)
   - Gli utenti autenticati possono fare SELECT e UPDATE (area admin)
   - Nessun accesso DELETE per nessuno (protezione dati)
   - Le policy INSERT esistenti per anon rimangono invariate
*/

-- ============================================================
-- contact_messages: policy SELECT per autenticati
-- ============================================================
DROP POLICY IF EXISTS "auth_select_contact_messages" ON contact_messages;
CREATE POLICY "auth_select_contact_messages" ON contact_messages FOR SELECT
  TO authenticated USING (true);

-- ============================================================
-- contact_messages: policy UPDATE per autenticati
-- Permette di aggiornare stato e note
-- ============================================================
DROP POLICY IF EXISTS "auth_update_contact_messages" ON contact_messages;
CREATE POLICY "auth_update_contact_messages" ON contact_messages FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- volunteer_requests: policy SELECT per autenticati
-- ============================================================
DROP POLICY IF EXISTS "auth_select_volunteer_requests" ON volunteer_requests;
CREATE POLICY "auth_select_volunteer_requests" ON volunteer_requests FOR SELECT
  TO authenticated USING (true);

-- ============================================================
-- volunteer_requests: policy UPDATE per autenticati
-- Permette di aggiornare stato e note
-- ============================================================
DROP POLICY IF EXISTS "auth_update_volunteer_requests" ON volunteer_requests;
CREATE POLICY "auth_update_volunteer_requests" ON volunteer_requests FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
