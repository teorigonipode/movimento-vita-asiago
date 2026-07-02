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
VITE_PUBLIC_SITE_URL=https://tuo-sito.vercel.app
```

5. Avvia il server di sviluppo:
```bash
npm run dev
```

Il sito sara disponibile su `http://localhost:5173`.

## Variabili ambiente

| Variabile | Descrizione |
|-----------|-------------|
| `VITE_SUPABASE_URL` | URL del progetto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chiave anonima (pubblica) di Supabase |
| `VITE_PUBLIC_SITE_URL` | URL pubblico del sito (per canonical, OG, sitemap). Ora: `https://movimento-vita-asiago.vercel.app`, in futuro: dominio definitivo |

## Configurazione Supabase

### Setup database

Applica le migration in ordine dalla dashboard SQL di Supabase:

```sql
-- Eseguire in sequenza dall'SQL Editor di Supabase:

-- 1. supabase/migrations/20260623150903_create_contact_and_volunteer_tables.sql
-- 2. supabase/migrations/20260624074305_20260624000001_update_tables_and_rls.sql
-- 3. supabase/migrations/20260624080613_20260624000002_remove_message_from_volunteers.sql
-- 4. supabase/migrations/20260624080718_20260624000003_unified_schema.sql
-- 5. supabase/migrations/20260624082733_20260624000004_admin_rls_policies.sql
-- 6. supabase/migrations/20260702070932_20260702000001_create_news_posts_table.sql.sql
-- 7. supabase/migrations/20260702070933_remove_news_delete_policy.sql
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

**Tabella `news_posts`**
- `id` (uuid, PK)
- `title` (text, NOT NULL)
- `slug` (text, NOT NULL, unique)
- `excerpt` (text, nullable)
- `content` (text, NOT NULL)
- `category` (text, NOT NULL, default 'notizia') - valori: `notizia`, `evento`, `comunicazione`
- `event_date` (date, nullable)
- `cover_image_url` (text, nullable)
- `status` (text, NOT NULL, default 'draft') - valori: `draft`, `published`, `archived`
- `published_at` (timestamptz, nullable)
- `created_at` (timestamptz, NOT NULL)
- `updated_at` (timestamptz, NOT NULL)

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
   - Aggiungi `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_PUBLIC_SITE_URL`
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
| `/notizie` | Notizie ed eventi |
| `/notizie/:slug` | Dettaglio notizia |
| `/contatti` | Contatti (form) |
| `/privacy-policy` | Privacy Policy |
| `/cookie-policy` | Cookie Policy |

### Area admin (non indicizzata)

| Route | Descrizione |
|-------|-------------|
| `/admin` | Login |
| `/admin/dashboard` | Dashboard richieste contatti |
| `/admin/requests/:id` | Dettaglio richiesta |
| `/admin/volunteers` | Elenco candidature volontari |
| `/admin/volunteers/:id` | Dettaglio candidatura |
| `/admin/news` | Gestione notizie |
| `/admin/news/new` | Crea nuova notizia |
| `/admin/news/:id/edit` | Modifica notizia |

## Area admin

L'area admin richiede autenticazione con Supabase Auth. Tutte le pagine admin hanno `noindex, nofollow` per evitare indicizzazione.

### Autenticazione

- **Login:** Email/password tramite Supabase Auth
- **Sessione:** Persistente (localStorage), sopravvive al refresh
- **Logout:** Disconnessione con cancellazione sessione
- **Recupero password:** Tramite dashboard Supabase (Authentication > Users > Send password reset)

### Funzionalita

- Dashboard richieste contatti (ricerca, filtri, ordinamento)
- Dettaglio richiesta (modifica stato, note interne)
- Dashboard candidature volontari (ricerca, filtri, ordinamento)
- Dettaglio candidatura (modifica stato, note interne)
- Gestione notizie ed eventi (creazione, modifica, pubblicazione, archiviazione)
- Stati disponibili: Nuovo, In lavorazione, Contattata, Chiuso

### Gestione Notizie

L'area admin include la gestione delle notizie ed eventi:

- **Categorie:** notizia, evento, comunicazione
- **Stati:** draft (bozza), published (pubblicato), archived (archiviato)
- **Pubblicazione:** automatica al passaggio da draft a published
- **Archiviazione:** le notizie archiviate non sono visibili pubblicamente
- **Slug:** generato automaticamente dal titolo, modificabile

## SEO e indicizzazione

### Configurazione

Il sito e preparato per l'indicizzazione con:

- **Canonical URL:** Tutte le pagine pubbliche hanno canonical URL dinamico basato su `VITE_PUBLIC_SITE_URL`
- **robots.txt:** Configurato per permettere indicizzazione pagine pubbliche e bloccare `/admin`
- **sitemap.xml:** Contiene tutte le pagine pubbliche (da aggiornare con dominio definitivo)
- **Meta robots:** Area admin con `noindex, nofollow`
- **Open Graph:** Configurato con title, description, image, url, site_name

### Pagine indicizzate

- `/` (Home)
- `/chi-siamo`
- `/come-possiamo-aiutarti`
- `/volontari`
- `/donazioni`
- `/notizie`
- `/notizie/:slug` (solo se status = published)
- `/contatti`

### Pagine escluse

- Tutte le route `/admin/*` (noindex, nofollow)
- `/admin/news`, `/admin/news/new`, `/admin/news/:id/edit` (area admin)
- `/privacy-policy` e `/cookie-policy` (pagine legali)
- Notizie con status `draft` o `archived` (non visibili pubblicamente)

### Quando verra scelto il dominio definitivo

Aggiornare:

1. `VITE_PUBLIC_SITE_URL` su Vercel (Environment Variables)
2. `public/robots.txt` - aggiornare la riga Sitemap
3. `public/sitemap.xml` - sostituire `https://movimento-vita-asiago.vercel.app` con il dominio reale
4. Verificare su Google Search Console

### Google Search Console (da fare dopo dominio definitivo)

1. Accedere a [Google Search Console](https://search.google.com/search-console)
2. Aggiungere la proprieta con il dominio definitivo
3. Verificare la proprieta (DNS o file HTML)
4. Inviare la sitemap: `https://<dominio-definitivo>/sitemap.xml`
5. Monitorare indicizzazione e errori

## Policy RLS

### contact_messages

| Policy | Ruolo | Comando |
|--------|-------|---------|
| public_insert_contact_messages | anon | INSERT |
| auth_select_contact_messages | authenticated | SELECT |
| auth_update_contact_messages | authenticated | UPDATE |

### volunteer_requests

| Policy | Ruolo | Comando |
|--------|-------|---------|
| public_insert_volunteer_requests | anon | INSERT |
| auth_select_volunteer_requests | authenticated | SELECT |
| auth_update_volunteer_requests | authenticated | UPDATE |

### news_posts

| Policy | Ruolo | Comando |
|--------|-------|---------|
| public_select_published_news | anon, authenticated | SELECT (status = 'published') |
| admin_select_all_news | authenticated | SELECT |
| admin_insert_news | authenticated | INSERT |
| admin_update_news | authenticated | UPDATE |

**Nota:** 
- Nessuna policy DELETE per nessun ruolo (protezione dati).
- Le notizie si gestiscono tramite stato: draft, published, archived.
- Solo le notizie con status = 'published' sono visibili pubblicamente.

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
