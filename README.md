# Movimento per la Vita Asiago

Sito web della sede locale di Asiago del Movimento per la Vita Italiano.

## Panoramica

Questo progetto è un sito web informativo e di contatto per il Movimento per la Vita Asiago, un'associazione di volontariato che offre ascolto, accoglienza e aiuto concreto a chi si trova in difficoltà.

## Tecnologie

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Supabase (database PostgreSQL + RLS)
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

Il sito sarà disponibile su `http://localhost:5173`.

## Configurazione Supabase

### Variabili ambiente richieste

| Variabile | Descrizione |
|-----------|-------------|
| `VITE_SUPABASE_URL` | URL del progetto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chiave anonima (pubblica) di Supabase |

### Setup database

Le migration vengono gestite tramite Supabase MCP. Le tabelle principali sono:

- `contact_messages` — messaggi dal form contatti
- `volunteer_requests` — richieste dal form volontari

Entrambe le tabelle hanno RLS abilitato con le seguenti policy:
- **INSERT:** permesso pubblicamente (anon)
- **SELECT/UPDATE/DELETE:** bloccato per utenti anonimi, accessibile solo agli utenti autenticati dell'area amministrativa

### Applicare le migration

Le migration si trovano in `supabase/migrations/`. Per applicarle, utilizzare gli strumenti MCP di Supabase o la dashboard SQL di Supabase.

## Configurazione Vercel

1. Crea un nuovo progetto su Vercel importando questo repository.

2. Aggiungi le variabili ambiente in Vercel:
   - Vai su **Project Settings > Environment Variables**
   - Aggiungi `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

3. Il deploy avverrà automaticamente ad ogni push su `main`.

## Variabili ambiente

```env
VITE_SUPABASE_URL=https://tuo-progetto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

**Importante:** il file `.env` è nel `.gitignore` e non deve mai essere committato.

## Procedura deploy

1. Verifica che il build locale funzioni:
```bash
npm run build
```

2. Pusha su `main` — Vercel eseguirà il deploy automaticamente.

3. Verifica il deploy nella preview di Vercel prima di promuovere in produzione.

## Collegamento dominio personalizzato

1. Vai su **Project Settings > Domains** su Vercel.
2. Aggiungi il tuo dominio (es. `movimentovitaasiago.it`).
3. Segui le istruzioni per configurare i record DNS.

## Creazione del primo account amministratore

L'area amministrativa non è ancora implementata. Per accedere ai dati:

1. Vai alla dashboard di Supabase.
2. Accedi alla sezione **Table Editor**.
3. Visualizza le tabelle `contact_messages` e `volunteer_requests`.

Per futuri sviluppi, l'area admin utilizzerà l'autenticazione di Supabase con email/password.

## Struttura del progetto

```
src/
  components/       Componenti riutilizzabili
  lib/              Client e utility (Supabase)
  pages/            Pagine del sito
supabase/
  migrations/       Migration SQL
public/             Asset statici
```

## Form e raccolta dati

I form di contatto e volontariato salvano i dati direttamente su Supabase:

- **Form Contatti:** `/contatti` → tabella `contact_messages`
- **Form Volontari:** `/volontari` → tabella `volunteer_requests`

Entrambi i form includono:
- Validazione client-side
- Checkbox privacy obbligatoria
- Gestione errori con messaggi rassicuranti
- Prevenzione doppi invii
- Stato di caricamento

## Sicurezza

- RLS abilitato su tutte le tabelle
- Nessun dato sensibile hardcoded nel codice
- Variabili ambiente gestite esclusivamente tramite `.env`
- In caso di mancata configurazione Supabase, il sito mostra un errore gestito senza crash

## Licenza

Progetto proprietario — Movimento per la Vita Asiago.
