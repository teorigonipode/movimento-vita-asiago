# Movimento per la Vita Asiago

Sito web della sede locale di Asiago del Movimento per la Vita Italiano.

## Panoramica

Sito web informativo e di contatto per il Movimento per la Vita Asiago, un'associazione di volontariato che offre ascolto, accoglienza e aiuto concreto a chi si trova in difficolta.

## Tecnologie

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + RLS + Auth)
- **Deploy:** Vercel
- **Routing:** React Router DOM v7

## Setup locale

### Prerequisiti

- Node.js 18+
- npm

### Installazione

1. Clona il repository:
```bash
git clone <url-repo>
cd movimento-vita-asiago
```

2. Installa le dipendenze:
```bash
npm install
```

3. Crea il file `.env` copiando da `.env.example`:
```bash
cp .env.example .env
```

4. Inserisci le credenziali Supabase nel file `.env`:
```
VITE_SUPABASE_URL=https://tuo-progetto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

5. Avvia il server di sviluppo:
```bash
npm run dev
```

Il sito sara disponibile su `http://localhost:5173`.

## Configurazione Supabase

### Setup database

Applica le migration in ordine dalla dashboard SQL di Supabase:

```sql
-- 1. supabase/migrations/20260623150903_create_contact_and_volunteer_tables.sql
-- 2. supabase/migrations/20260624074305_20260624000001_update_tables_and_rls.sql
-- 3. supabase/migrations/20260624080613_20260624000002_remove_message_from_volunteers.sql
-- 4. supabase/migrations/20260624080718_20260624000003_unified_schema.sql
-- 5. supabase/migrations/20260624082733_20260624000004_admin_rls_policies.sql
```

### Creazione primo account admin

1. Vai alla dashboard di Supabase > Authentication > Users
2. Clicca "Add user" > "Create new user"
3. Inserisci email e password
4. Disabilita "Confirm email" (email confirmation OFF)
5. L'utente puo accedere a `/admin`

## Configurazione Vercel

1. Crea un nuovo progetto su Vercel importando questo repository
2. Aggiungi le variabili ambiente in Vercel:
   - Vai su **Project Settings > Environment Variables**
   - Aggiungi `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
3. Il deploy avverra automaticamente ad ogni push su `main`

Il file `vercel.json` configurato con SPA rewrites garantisce il corretto routing di tutte le pagine.

## Variabili ambiente

| Variabile | Descrizione |
|-----------|-------------|
| `VITE_SUPABASE_URL` | URL del progetto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chiave anonima (pubblica) di Supabase |

**Nota:** Il file `.env` e nel `.gitignore` e non deve mai essere committato.

## Struttura del progetto

```
src/
  components/       Componenti riutilizzabili
  contexts/         Context React (Auth)
  lib/              Client e utility (Supabase)
  pages/            Pagine del sito
    admin/          Area amministrativa
supabase/
  migrations/       Migration SQL
public/             Asset statici
```

## Route

### Sito pubblico

| Route | Descrizione |
|-------|-------------|
| `/` | Home |
| `/chi-siamo` | Chi siamo |
| `/come-possiamo-aiutarti` | Servizi offerti |
| `/testimonianze` | Testimonianze |
| `/volontari` | Diventa volontario (form) |
| `/donazioni` | Donazioni |
| `/contatti` | Contatti (form) |
| `/faq` | FAQ |
| `/privacy-policy` | Privacy Policy |
| `/cookie-policy` | Cookie Policy |

### Area admin

| Route | Descrizione |
|-------|-------------|
| `/admin` | Login |
| `/admin/dashboard` | Dashboard richieste contatti |
| `/admin/requests/:id` | Dettaglio richiesta |
| `/admin/volunteers` | Elenco candidature volontari |
| `/admin/volunteers/:id` | Dettaglio candidatura |

## Area admin

L'area admin richiede autenticazione con Supabase Auth.

### Funzionalita

- Login/logout
- Dashboard richieste contatti (ricerca, filtri, ordinamento)
- Dettaglio richiesta (modifica stato, note interne)
- Dashboard candidature volontari (ricerca, filtri, ordinamento)
- Dettaglio candidatura (modifica stato, note interne)

### Routing protetto

Le route admin sono protette dal componente `ProtectedRoute`:
- Verifica lo stato di autenticazione prima del rendering
- Mostra loading durante il caricamento della sessione
- Reindirizza al login se non autenticato
- Mantiene la sessione persistente (localStorage)

## Schema database

### contact_messages

| Colonna | Tipo | Nullable | Default |
|---------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| created_at | timestamptz | YES | now() |
| name | text | NO | — |
| email | text | NO | — |
| phone | text | YES | — |
| subject | text | NO | — |
| message | text | NO | — |
| status | text | NO | 'Nuovo' |
| notes | text | YES | — |

### volunteer_requests

| Colonna | Tipo | Nullable | Default |
|---------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| created_at | timestamptz | YES | now() |
| name | text | NO | — |
| email | text | NO | — |
| phone | text | YES | — |
| availability | text | YES | — |
| motivation | text | YES | — |
| status | text | NO | 'Nuovo' |
| notes | text | YES | — |

## Policy RLS

### contact_messages

| Policy | Ruolo | Comando | Condizione |
|--------|-------|---------|------------|
| public_insert_contact_messages | anon | INSERT | WITH CHECK (true) |
| auth_select_contact_messages | authenticated | SELECT | USING (true) |
| auth_update_contact_messages | authenticated | UPDATE | USING (true) WITH CHECK (true) |

### volunteer_requests

| Policy | Ruolo | Comando | Condizione |
|--------|-------|---------|------------|
| public_insert_volunteer_requests | anon | INSERT | WITH CHECK (true) |
| auth_select_volunteer_requests | authenticated | SELECT | USING (true) |
| auth_update_volunteer_requests | authenticated | UPDATE | USING (true) WITH CHECK (true) |

### Note sui warning RLS

Le policy con `USING (true)` e `WITH CHECK (true)` sono **intenzionali**:

- **INSERT (anon):** I form pubblici non richiedono autenticazione. La policy permette a chiunque di inviare richieste. I dati sono protetti perche anon non puo leggere, modificare o eliminare i record.
- **SELECT/UPDATE (authenticated):** Gli amministratori autenticati possono vedere e modificare tutte le richieste. Non e necessario un controllo `auth.uid()` perche non esiste relazione utente-richiesta (le richieste vengono da utenti anonimi).
- **DELETE:** Nessuna policy DELETE per nessun ruolo. Protezione dati integrale.

## Form pubblici

I form salvano i dati direttamente su Supabase:

- **Contatti:** `/contatti` → tabella `contact_messages`
- **Volontari:** `/volontari` → tabella `volunteer_requests`

Funzionalita:
- Validazione client-side
- Checkbox privacy obbligatoria
- Gestione errori con messaggi rassicuranti
- Prevenzione doppi invii
- Stato di caricamento

## Deploy

```bash
npm run build
```

La build viene deployata automaticamente su Vercel ad ogni push su `main`.

## Licenza

Progetto proprietario — Movimento per la Vita Asiago.
