# Project status — Movimento per la Vita Asiago

Updated: 2026-11-13

## Repository

- Repository: `teorigonipode/movimento-vita-asiago`
- Branch: `main`
- Last audited HEAD before this document: `ca0de98aa5e233a366bac3c9ae660ff470bac368`
- Production hosting: Vercel
- Current temporary production URL: `https://movimento-vita-asiago.vercel.app`

## Current stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Vercel Analytics
- Vercel hosting

## Architecture decision

The current production architecture must become fully independent from Supabase and Bolt runtime infrastructure.

Target:

GitHub -> Vercel -> future custom domain

Bolt can be used as a development tool, but the deployed application must not require Bolt Database, Bolt Auth, Bolt Hosting or Bolt server functions.

Supabase is legacy and must be removed from the runtime.

## Supabase legacy currently present

The current repository still contains:

- `@supabase/supabase-js`
- `src/lib/supabase.ts`
- `src/contexts/AuthContext.tsx`
- `src/components/ProtectedRoute.tsx`
- `src/components/SupabaseError.tsx`
- public contact form -> `contact_messages`
- volunteer form -> `volunteer_requests`
- news -> `news_posts`
- Supabase Auth admin area
- admin contact/volunteer/news pages
- `supabase/migrations/`
- obsolete duplicated `src/migrations/`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

These are legacy and should not remain part of the runtime after cleanup.

## Target public routes

Keep:

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

Remove the current `/admin/*` runtime.

## Contacts

Public contact flows must use only direct contact methods:

- phone
- email

No contact form and no database storage.

The volunteer page must also use direct phone/email CTAs instead of a form.

## News

News is intentionally preserved.

Target architecture:

`src/content/news.ts`
-> `src/services/news.ts`
-> `Notizie` / `NotiziaDetail`

The service layer is intentional so a CMS/backend can be reintroduced later without rewriting the UI.

Do not invent news or events if no verified content is available.

## Backend roadmap

Do not introduce a new backend now.

A backend/CMS becomes justified when non-technical association members need to manage content without Git/Bolt, or when requirements include drafts, scheduled publishing, image uploads, multiple editors, newsletters or workflow management.

## Known placeholders / data requiring verification

Do not invent replacements.

Currently found:

- phone: `+39 000 000 000`
- address: `Via Roma 1, 36012 Asiago (VI)`
- email: `info@movimentovitaasiago.it` — must be verified before the domain exists
- IBAN: `IT00 X 0000 0000 0000 0000 000`
- Codice Fiscale / P.IVA: missing
- 5x1000 tax code: missing
- claims such as "Bilancio annuale pubblicato" and "Detrazioni fiscali per le donazioni" require human verification

Potentially dangerous placeholders such as fake phone, IBAN or tax identifiers must not be presented as usable production data.

## SEO / domain

Current SEO infrastructure already includes:

- dynamic canonical based on `VITE_PUBLIC_SITE_URL`
- Open Graph metadata
- robots.txt
- sitemap.xml
- Vercel Analytics

Future domain work is intentionally deferred.

When the final domain is chosen:

1. configure it on Vercel;
2. update `VITE_PUBLIC_SITE_URL`;
3. update robots sitemap URL;
4. update sitemap URLs;
5. set canonical redirect behavior;
6. add Google Search Console;
7. submit sitemap;
8. perform a local SEO audit.

## Cleanup acceptance criteria

After cleanup:

- no Supabase dependency in package.json;
- no Supabase runtime imports;
- no Supabase env variables;
- no public forms storing personal data;
- no runtime admin/auth area;
- news works without network/database calls;
- app builds without backend configuration;
- `npm run typecheck` passes;
- `npm run lint` passes;
- `npm run build` passes;
- production deploy on Vercel is READY;
- no Bolt runtime dependency;
- no unsafe placeholder is exposed as real production data.
