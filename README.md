# Movimento per la Vita Asiago

Sito web della sede locale di Asiago del Movimento per la Vita Italiano.

## Panoramica

Sito web informativo e di contatto per il Movimento per la Vita Asiago, un'associazione di volontariato che offre ascolto, accoglienza e aiuto concreto a chi si trova in difficolta.

## Tecnologie

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + RLS + Auth)
- **Analytics:** Vercel Analytics
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

### Variabili ambiente

| Variabile | Descrizione |
|-----------|-------------|
| `VITE_SUPABASE_URL` | URL del progetto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chiave anonima (pubblica) di Supabase |

### Setup database

Applica le migration in ordine dalla dashboard SQL di Supabase:

```sql
-- Eseguire in sequenza dall'SQL Editor di Supabase:

-- 1. supabase/migrations/20260623150903_create_contact_and_volunteer_tables.sql
-- 2. supabase/migrations/20260624074305_20260624000001_update_tables_and_rls.sql
-- 3. supabase/migrations/20260624080613_20260624000002_remove_message_from_volunteers.sql
-- 4. supabase/migrations/20260624080718_20260624000003_unified_schema.sql
-- 5. supabase/migrations/20260624082733_20260624000004_admin_rls_policies.sql
```

**Nota:** I file sono in `supabase/migrations/`. Non usare i file in `src/migrations/` (obsoleto).

### Schema database finale

**Tabella `contact_messages`**
- `id` (uuid, PK)
- `created_at` (timestamptz)
- `name` (text, NOT NULL)
- `email` (text, NOT NULL)
- `phone` (text, nullable)
- `subject` (text, NOT NULL)
- `message` (text, NOT NULL)
- `status` (text, NOT NULL, default 'Nuovo')
- `notes` (text, nullable)

**Tabella `volunteer_requests`**
- `id` (uuid, PK)
- `created_at` (timestamptz)
- `name` (text, NOT NULL)
- `email` (text, NOT NULL)
- `phone` (text, nullable)
- `availability` (text, nullable)
- `motivation` (text, nullable)
- `status` (text, NOT NULL, default 'Nuovo')
- `notes` (text, nullable)

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

## Route

### Sito pubblico

| Route | Descrizione |
|-------|-------------|
| `/` | Home |
| `/chi-siamo` | Chi siamo |
| `/come-possiamo-aiutarti` | Servizi offerti |
| `/volontari` | Diventa volontario (form) |
| `/donazioni` | Donazioni |
| `/contatti` | Contatti (form) |
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

### Autenticazione

- **Login:** Email/password tramite Supabase Auth
- **Sessione:** Persistente (localStorage), sopravvive al refresh
- **Logout:** Disconnessione con cancellazione sessione
- **Recupero password:** Tramite dashboard Supabase (Authentication > Users > Send password reset)

### Comportamento routing

- Utente non autenticato su `/admin` → mostra login
- Utente autenticato su `/admin` → redirect a `/admin/dashboard`
- Utente autenticato su route admin → accesso consentito
- Refresh su route admin → sessione mantenuta, nessun redirect
- Logout → redirect al login

### Funzionalita

- Dashboard richieste contatti (ricerca, filtri, ordinamento)
- Dettaglio richiesta (modifica stato, note interne)
- Dashboard candidature volontari (ricerca, filtri, ordinamento)
- Dettaglio candidatura (modifica stato, note interne)
- Stati disponibili: Nuovo, In lavorazione, Contattata, Chiuso

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

- **INSERT (anon):** I form pubblici non richiedono autenticazione.
- **SELECT/UPDATE (authenticated):** Gli admin gestiscono tutte le richieste.
- **DELETE:** Nessuna policy per nessun ruolo (protezione dati).

## Form pubblici

I form salvano i dati direttamente su Supabase:

- **Contatti:** `/contatti` → tabella `contact_messages`
- **Volontari:** `/volontari` → tabella `volunteer_requests`

## Vercel Analytics

Il progetto utilizza **Vercel Analytics** per il monitoraggio delle visite. Il componente `<Analytics />` e integrato in `src/main.tsx`.

Non e richiesta configurazione aggiuntiva: Analytics funziona automaticamente dopo il deploy su Vercel.

## Deploy

```bash
npm run build
```

La build viene deployata automaticamente su Vercel ad ogni push su `main`.

## Script disponibili

```bash
npm run dev        # Server di sviluppo
npm run build      # Build di produzione
npm run typecheck  # Controllo tipi TypeScript
npm run lint       # Linting ESLint
npm run preview    # Anteprima build locale
```

## Licenza

Progetto proprietario — Movimento per la Vita Asiago.
