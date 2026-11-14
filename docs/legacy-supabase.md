# Legacy Supabase — NON UTILIZZATO

**STATO: LEGACY — Non utilizzato nel runtime corrente**

Questo documento è una sintesi storica del backend Supabase precedentemente in uso.
Il codice SQL completo è conservato nella cronologia Git.

## Cosa era presente

### Tabella `contact_messages`

Raccoglieva i messaggi inviati dal form di contatto pubblico.
Campi: id, created_at, name, email, phone, subject, message, status, notes.

### Tabella `volunteer_requests`

Raccoglieva le candidature volontario inviate dal form pubblico.
Campi: id, created_at, name, email, phone, availability, motivation, status, notes.

### Tabella `news_posts`

Archiviava notizie ed eventi gestiti dall'area admin.
Campi: id, title, slug, excerpt, content, category, event_date, cover_image_url, status, published_at, created_at, updated_at.

### Supabase Auth

Autenticazione email/password per l'area admin.
Sessione persistente in localStorage.

### Area admin

Pagine protette per gestire richieste di contatto, candidature volontari e notizie.
Route rimosse: /admin, /admin/dashboard, /admin/requests/:id, /admin/volunteers, /admin/volunteers/:id, /admin/news, /admin/news/new, /admin/news/:id/edit.

### RLS (Row Level Security)

Policy di sicurezza a livello di riga su tutte le tabelle:
- INSERT pubblico per contact_messages e volunteer_requests
- SELECT/UPDATE per authenticated su tutte le tabelle
- SELECT pubblico per news_posts con status = published

## Motivazione della rimozione

- Il sito è informativo e non richiede un backend nel suo stato attuale.
- I form pubblici raccoglievano dati personali senza un reale flusso di gestione strutturato.
- L'area admin introduceva complessità e rischi non giustificati dal volume operativo.
- Si vuole eliminare ogni dipendenza da backend esterni (Supabase, Bolt runtime) per garantire portabilità totale.
- Le notizie possono essere gestite come contenuto statico versionato su Git.

## Futuro

Il backend potrà essere ridisegnato in futuro quando le condizioni lo richiederanno.
Vedi `docs/backend-roadmap.md` per i criteri e le opzioni.

Il punto di sostituzione per le notizie è `src/services/news.ts`.
