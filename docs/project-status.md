# Project status — Movimento per la Vita Asiago

Updated: 2026-11-13

## Repository

- Repository: `teorigonipode/movimento-vita-asiago`
- Branch: `main`
- Last audited HEAD before cleanup: `ca0de98aa5e233a366bac3c9ae660ff470bac368`
- HEAD after cleanup: post-cleanup commit (see git log)
- Production hosting: Vercel
- Current temporary production URL: `https://movimento-vita-asiago.vercel.app`

## Cleanup history

### Before cleanup (legacy state)

The repository contained a full Supabase backend:
- `@supabase/supabase-js` dependency
- `src/lib/supabase.ts` client
- `src/contexts/AuthContext.tsx` Supabase Auth
- `src/components/ProtectedRoute.tsx`
- `src/components/SupabaseError.tsx`
- public contact form → `contact_messages` table
- volunteer form → `volunteer_requests` table
- news → `news_posts` table with network fetch
- Supabase Auth admin area (7 admin pages)
- `supabase/migrations/` directory
- duplicate `src/migrations/` directory
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env variables

### After cleanup (current state)

**Supabase removed:**
- `@supabase/supabase-js` removed from package.json
- No Supabase runtime imports
- No Supabase env variables
- All migration directories deleted
- `src/lib/supabase.ts`, `src/contexts/AuthContext.tsx`, `src/components/ProtectedRoute.tsx`, `src/components/SupabaseError.tsx` deleted

**Admin area removed:**
- All `/admin/*` routes removed from routing
- All admin page components deleted
- No authentication system in the project

**Forms removed:**
- Contact form replaced with direct phone/email CTAs
- Volunteer form replaced with direct phone/email CTAs
- No data collection, no database storage

**News made static:**
- `src/content/news.ts` — static content source (empty, ready for real content)
- `src/services/news.ts` — service layer (future replacement point)
- `src/pages/Notizie.tsx` — uses service, no network requests
- `src/pages/NotiziaDetail.tsx` — uses service, no network requests

**Centralized config:**
- `src/config/site.ts` — single source for site name, phone, email, address
- Navbar, Footer, Home, Contatti, Volontari, Donazioni all use centralized config

**Dangerous placeholders secured:**
- Fake IBAN removed from Donazioni page — replaced with "Contattaci per conoscere le modalità aggiornate di donazione"
- Fake 5x1000 tax code removed — replaced with "Contattaci per ricevere il codice corretto"
- "Bilancio annuale pubblicato" and "Detrazioni fiscali" claims removed (unverified)
- Phone `+39 000 000 000` remains as placeholder (marked as needing verification)
- Email `info@movimentovitaasiago.it` remains (needs verification before domain exists)
- CF/PIVA shown as "da verificare" in Footer

**Documentation added:**
- `docs/legacy-supabase.md` — historical summary of removed Supabase backend
- `docs/backend-roadmap.md` — when and how a backend may return
- `docs/domain-and-seo.md` — domain configuration roadmap
- `docs/project-status.md` — this document, updated

**SEO maintained:**
- `SEO.tsx` component unchanged (dynamic canonical, OG, Twitter Card)
- `robots.txt` updated — removed `/admin` disallow
- `sitemap.xml` unchanged — already correct with public routes
- `VITE_PUBLIC_SITE_URL` remains the single source for canonical URLs

**Vercel Analytics:** confirmed active in `src/main.tsx`, retained.

## Current architecture

```
GitHub → Vercel → future custom domain
```

- React 18 + TypeScript + Vite + Tailwind CSS
- React Router DOM v7
- Vercel Analytics
- Vercel hosting
- No backend, no database, no authentication
- News as static content versioned on Git

## Portability

The site is fully portable:
- `git clone` → `npm install` → `npm run build` is sufficient
- No Bolt runtime dependency
- No Supabase dependency
- No external backend required
- PORTABILITY CHECK: PASS

## Placeholder report

| Dato | Valore attuale | Stato | File | Azione |
|------|---------------|-------|------|--------|
| Telefono | +39 000 000 000 | PLACEHOLDER | `src/config/site.ts` | Verificare numero reale |
| Email | info@movimentovitaasiago.it | DA VERIFICARE | `src/config/site.ts` | Verificare dominio/ email reale |
| Indirizzo | Via Roma 1, 36012 Asiago (VI) | DA VERIFICARE | `src/config/site.ts` | Verificare indirizzo reale |
| IBAN | Non mostrato | NASCOSTO | — | Fornire IBAN reale quando disponibile |
| CF / P.IVA | "da verificare" | PLACEHOLDER | `src/components/Footer.tsx` | Fornire valore reale |
| 5x1000 | Non mostrato | NASCOSTO | — | Fornire codice fiscale quando disponibile |
| Bilancio annuale | Non affermato | RIMOSSO | — | Verificare prima di reintrodurre |
| Detrazioni fiscali | Non affermato | RIMOSSO | — | Verificare prima di reintrodurre |

## Legal review

LEGAL REVIEW NEEDED:
- Privacy Policy: verificare con referente associativo che i dati raccolti via telefono/email siano coperti correttamente
- Cookie Policy: Vercel Analytics è citato come attivo — confermare che la descrizione è accurata
- Affermazioni su riservatezza ("non condividiamo mai informazioni con terzi") — confermare con referente associativo

## Route eliminate

- `/admin`
- `/admin/dashboard`
- `/admin/requests/:id`
- `/admin/volunteers`
- `/admin/volunteers/:id`
- `/admin/news`
- `/admin/news/new`
- `/admin/news/:id/edit`

## Route mantenute

- `/`
- `/chi-siamo`
- `/come-possiamo-aiutarti`
- `/donazioni`
- `/volontari`
- `/notizie`
- `/notizie/:slug`
- `/contatti`
- `/privacy-policy`
- `/cookie-policy`

## Dipendenze

### Rimosse
- `@supabase/supabase-js`

### Attuali
- `react`, `react-dom` — 18.x
- `react-router-dom` — 7.x
- `lucide-react` — 0.x
- `@vercel/analytics` — 2.x
- Dev: `vite`, `typescript`, `tailwindcss`, `eslint`, `typescript-eslint`

Nessun major upgrade eseguito. Patch/minor applicati via `npm install`.

## Debito tecnico residuo

- Dati di contatto (telefono, email, indirizzo) sono placeholder da verificare
- IBAN e codice fiscale 5x1000 non disponibili — pagine mostrano CTA di contatto
- CF/PIVA non disponibile — Footer mostra "da verificare"
- Notizie: array vuoto, nessun contenuto reale ancora pubblicato
- Privacy/Cookie policy richiedono validazione legale/associativa

## Prossimi passi consigliati

1. Fornire numero di telefono reale
2. Verificare/creare email associativa reale
3. Verificare indirizzo sede reale
4. Fornire IBAN per donazioni
5. Fornire CF/PIVA
6. Fornire codice fiscale per 5x1000
7. Validare Privacy Policy e Cookie Policy con referente legale
8. Pubblicare prime notizie reali in `src/content/news.ts`
9. Acquisire dominio definitivo e seguire `docs/domain-and-seo.md`
