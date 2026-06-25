# Movimento per la Vita Asiago

Sito web della sede locale di Asiago del Movimento per la Vita Italiano.

## Panoramica

Sito web informativo e di contatto per il Movimento per la Vita Asiago, un'associazione di volontariato che offre ascolto, accoglienza e aiuto concreto a chi si trova in difficoltà.

## Tecnologie

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Supabase (database PostgreSQL + RLS + Auth)
- **Analytics:** Vercel Analytics
- **Deploy:** Vercel
- **Routing:** React Router DOM

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

4. Inserisci le tue credenziali Supabase nel file `.env`.

5. Avvia il server di sviluppo:
```bash
npm run dev
```

Il sito sara' disponibile su `http://localhost:5173`.

## Configurazione Supabase

### Variabili ambiente richieste

| Variabile | Descrizione |
|-----------|-------------|
| `VITE_SUPABASE_URL` | URL del progetto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chiave anonima (pubblica) di Supabase |

### Setup database

Applica la migration dalla dashboard SQL di Supabase:

```sql
-- Esegui in ordine:
-- 1. supabase/migrations/20260623150903_create_contact_and_volunteer_tables.sql
-- 2. supabase/migrations/20260624074305_20260624000001_update_tables_and_rls.sql
-- 3. supabase/migrations/20260624080613_20260624000002_remove_message_from_volunteers.sql
-- 4. supabase/migrations/20260624080718_20260624000003_unified_schema.sql
-- 5. supabase/migrations/20260624082733_20260624000004_admin_rls_policies.sql
```

Oppure esegui la migration unificata:
```sql
-- src/migrations/20260624000003_unified_schema.sql
```

### Creazione primo account admin

1. Vai alla dashboard di Supabase > Authentication > Users
2. Clicca "Add user" > "Create new user"
3. Inserisci email e password
4. Disabilita "Confirm email" (email confirmation OFF)
5. L'utente puo' ora accedere a `/admin`

## Configurazione Vercel

1. Crea un nuovo progetto su Vercel importando questo repository.

2. Aggiungi le variabili ambiente in Vercel:
   - Vai su **Project Settings > Environment Variables**
   - Aggiungi `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

3. Il deploy avverra' automaticamente ad ogni push su `main`.

### Comportamento in caso di variabili mancanti

Se le variabili ambiente non sono configurate:
- Il sito **non va in crash** e **non mostra schermata bianca**
- Viene mostrato un messaggio di errore gestito in italiano
- I form mostrano un avviso con suggerimento di contatto telefonico/email

## Variabili ambiente

```env
VITE_SUPABASE_URL=https://tuo-progetto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

**Importante:** il file `.env` e' nel `.gitignore` e non deve mai essere committato. Nessun URL o chiave Supabase e' hardcoded nel codice sorgente.

## Struttura del progetto

```
src/
  components/       Componenti riutilizzabili
  contexts/         Context React (Auth)
  lib/              Client e utility (Supabase)
  pages/            Pagine del sito
    admin/          Area amministrativa
  migrations/       Migration SQL (schema finale)
supabase/
  migrations/       Cronologia migration
public/             Asset statici
```

## Route del sito

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
| `/admin` | Login area admin |
| `/admin/dashboard` | Dashboard richieste |
| `/admin/requests/:id` | Dettaglio richiesta |
| `/admin/volunteers` | Elenco candidature volontari |
| `/admin/volunteers/:id` | Dettaglio candidatura |

## Form e raccolta dati

I form salvano i dati direttamente su Supabase:

- **Form Contatti:** `/contatti` → tabella `contact_messages`
- **Form Volontari:** `/volontari` → tabella `volunteer_requests`

Entrambi i form includono:
- Validazione client-side
- Checkbox privacy obbligatoria
- Gestione errori con messaggi rassicuranti
- Prevenzione doppi invii
- Stato di caricamento

## Struttura database

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

| Tabella | Policy | Ruolo | Comando | Scopo |
|---------|--------|-------|---------|-------|
| contact_messages | public_insert_contact_messages | anon | INSERT | Form pubblico |
| contact_messages | auth_select_contact_messages | authenticated | SELECT | Area admin |
| contact_messages | auth_update_contact_messages | authenticated | UPDATE | Area admin |
| volunteer_requests | public_insert_volunteer_requests | anon | INSERT | Form pubblico |
| volunteer_requests | auth_select_volunteer_requests | authenticated | SELECT | Area admin |
| volunteer_requests | auth_update_volunteer_requests | authenticated | UPDATE | Area admin |

**Sicurezza:**
- anon: solo INSERT (form pubblici)
- authenticated: SELECT + UPDATE (area admin)
- DELETE: **nessuna policy** per nessun ruolo (protezione dati)

Le policy INSERT con `WITH CHECK (true)` sono necessarie perche' i form del sito pubblico non richiedono autenticazione. I dati sono protetti perche' non esistono policy SELECT/UPDATE/DELETE per anon.

## Area admin

L'area admin e' accessibile tramite `/admin` e richiede login con Supabase Auth.

Funzionalita':
- Login con email/password
- Logout
- Dashboard richieste contatti (ricerca, filtri, ordinamento)
- Dettaglio richiesta (modifica stato, note interne)
- Elenco candidature volontari (ricerca, filtri, ordinamento)
- Dettaglio candidatura (modifica stato, note interne)

## Deploy

```bash
npm run build
```

Pusha su `main` — Vercel eseguira' il deploy automaticamente.

## Licenza

Progetto proprietario — Movimento per la Vita Asiago.
