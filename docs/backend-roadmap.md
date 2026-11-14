# Backend roadmap

## Stato attuale

- Sito statico (SPA) senza backend.
- Nessun database.
- Nessuna autenticazione.
- Nessuna serverless function.
- Notizie versionate su Git in `src/content/news.ts`, accessibili tramite `src/services/news.ts`.

## Quando servirà un backend

Un backend diventa giustificato quando una o più delle seguenti condizioni diventano reali:

- I volontari devono pubblicare autonomamente notizie ed eventi.
- Utenti non tecnici devono aggiornare i contenuti senza passare da Git.
- Il volume di notizie/eventi cresce significativamente.
- Serve la gestione di bozze, programmazione temporale (scheduling) o immagini.
- Servono ruoli editoriali multipli con permessi differenziati.
- Serve una newsletter o un sistema di notifiche.
- Serve un workflow redazionale (revisione, approvazione, pubblicazione).
- Serve una gestione strutturata delle richieste di contatto e candidature volontari.

## Possibili opzioni future

Queste opzioni NON sono implementate. Vengono elencate per valutazione futura:

1. **Supabase** — PostgreSQL + Auth + RLS. Adatto se si vuole un backend SQL completo.
2. **Headless CMS** (es. Sanity, Strapi, Contentful) — Adatto se la priorità è la gestione editoriale dei contenuti.
3. **Git-based CMS** (es. Decap, Tina) — Adatto se si vuole mantenere il contenuto su Git con un'interfaccia visiva.
4. **Altro provider** — Da valutare in base alle esigenze del momento.

## Punto di sostituzione

`src/services/news.ts` è l'unico punto di contatto tra la UI e la fonte dati delle notizie.

Oggi: `src/content/news.ts` (statico) → `src/services/news.ts` → UI

Domani: backend/CMS → `src/services/news.ts` (stessa interfaccia) → UI

Modificando solo il service layer, la UI non richiede cambiamenti.
