# Movimento per la Vita Asiago

Sito web della sede locale di Asiago del Movimento per la Vita Italiano.

## Panoramica

Sito web informativo e di contatto per il Movimento per la Vita Asiago, un'associazione di volontariato che offre ascolto, accoglienza e aiuto concreto a chi si trova in difficoltà.

**Nessun backend richiesto nella versione corrente.**

## Tecnologie

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Routing:** React Router DOM v7
- **Analytics:** Vercel Analytics
- **Deploy:** Vercel

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

4. Avvia il server di sviluppo:
```bash
npm run dev
```

Il sito sarà disponibile su `http://localhost:5173`.

### Variabili ambiente

| Variabile | Descrizione |
|-----------|-------------|
| `VITE_PUBLIC_SITE_URL` | URL pubblico del sito (per canonical, OG, sitemap). Attuale: `https://movimento-vita-asiago.vercel.app`, in futuro: dominio definitivo |

## Build

```bash
npm run build
```

La build viene deployata automaticamente su Vercel ad ogni push su `main`.

## Deploy su Vercel

1. Importa il repository su Vercel.
2. Aggiungi la variabile ambiente `VITE_PUBLIC_SITE_URL`.
3. Il deploy avviene automaticamente ad ogni push su `main`.

Il file `vercel.json` è configurato con SPA rewrites per garantire il corretto routing di tutte le pagine, incluse le route profonde.

## Route pubbliche

| Route | Descrizione |
|-------|-------------|
| `/` | Home |
| `/chi-siamo` | Chi siamo |
| `/come-possiamo-aiutarti` | Servizi offerti |
| `/donazioni` | Donazioni |
| `/volontari` | Diventa volontario |
| `/notizie` | Notizie ed eventi |
| `/notizie/:slug` | Dettaglio notizia |
| `/contatti` | Contatti |
| `/privacy-policy` | Privacy Policy |
| `/cookie-policy` | Cookie Policy |

## Contatti

I contatti sono gestiti esclusivamente tramite telefono e email. Non ci sono form web.

I dati di contatto sono centralizzati in `src/config/site.ts`.

## Notizie

Le notizie sono statiche e versionate nel repository.

### Struttura

- `src/content/news.ts` — contenuto (array di notizie)
- `src/services/news.ts` — service layer (punto di sostituzione futuro)
- `src/pages/Notizie.tsx` — elenco notizie pubblicate
- `src/pages/NotiziaDetail.tsx` — dettaglio notizia

### Come aggiungere una notizia

1. Apri `src/content/news.ts`.
2. Aggiungi un oggetto all'array `newsPosts` con la struttura `NewsPost`:

```typescript
{
  slug: 'slug-univoco',
  title: 'Titolo della notizia',
  excerpt: 'Breve riassunto (opzionale)',
  content: 'Contenuto della notizia. Usa \\n per separare i paragrafi.',
  category: 'notizia', // oppure 'evento' o 'comunicazione'
  eventDate: '2026-01-15', // opzionale, formato ISO
  coverImage: 'https://...', // opzionale
  publishedAt: '2026-01-10',
  published: true,
}
```

3. Imposta `published: true` per renderla visibile pubblicamente.
4. Commit e push. Il deploy avviene automaticamente.

### Architettura

Oggi: `src/content/news.ts` → `src/services/news.ts` → UI

Domani: backend/CMS → `src/services/news.ts` (stessa interfaccia) → UI

Modificando solo il service layer, la UI non richiede cambiamenti.

## Documentazione

- [Stato del progetto](docs/project-status.md)
- [Legacy Supabase](docs/legacy-supabase.md)
- [Roadmap backend](docs/backend-roadmap.md)
- [Dominio e SEO](docs/domain-and-seo.md)

## Script disponibili

```bash
npm run dev        # Server di sviluppo
npm run build      # Build di produzione
npm run typecheck  # Controllo tipi TypeScript
npm run lint       # Linting ESLint
npm run preview    # Anteprima build locale
```

## Vercel Analytics

Il progetto utilizza Vercel Analytics per il monitoraggio anonimo e aggregato delle visite. Il componente `<Analytics />` è integrato in `src/main.tsx`. Non richiede configurazione aggiuntiva.

## Licenza

Progetto proprietario — Movimento per la Vita Asiago.
