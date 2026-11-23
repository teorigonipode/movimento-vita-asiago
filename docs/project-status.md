# Project status — Centro Aiuto alla Vita Altopiano dei Sette Comuni

Updated: 2026-11-23

## Repository

- Repository: `teorigonipode/movimento-vita-asiago`
- Branch: `main`
- Expected current HEAD at start of this pass: `fb40d96f2d2ba7d0753278afd3f8b297f730084e`
- Production hosting: Vercel
- Temporary production URL: `https://movimento-vita-asiago.vercel.app`

## Current architecture

```
GitHub → Vercel → future custom domain
```

The runtime is a static React/Vite site. It has no Supabase, database, authentication, admin area, backend, serverless functions or Bolt runtime dependency. News and testimonials are versioned in the repository; contact actions use `tel:` and `mailto:` links.

## Current branding

- Brand: **Centro Aiuto alla Vita – Altopiano dei Sette Comuni**
- Official logo: `public/brand/logo-cav-mpv-altopiano.png`
- The logo is used in the navbar, footer and Chi siamo page without distortion.
- Favicon assets use only the green central symbol extracted from the supplied official raster logo.
- Favicon files: `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/favicon-192x192.png`, `public/favicon-512x512.png`, `public/apple-touch-icon.png`.

## Official contact data

- Phone: `0424 1954228` — `tel:+3904241954228`
- Email: `cavmpvaltopiano7comuni@gmail.com`
- Location: `Presso il Centro Giovanile di Asiago`
- Wednesday: `14:00 – 15:30`
- Friday: `09:30 – 11:00`

All runtime components read these values from `src/config/site.ts`.

## Routes

Public routes:

- `/`
- `/chi-siamo`
- `/come-possiamo-aiutarti`
- `/non-sei-sola`
- `/donazioni`
- `/volontari`
- `/notizie`
- `/notizie/:slug`
- `/contatti`
- `/privacy-policy`
- `/cookie-policy`

There are no `/admin` routes.

## This final polish pass

- Contact cards now use a two-column desktop layout so the long email remains readable and clickable.
- Footer contact column has additional width and no aggressive `break-all` wrapping.
- Removed all `py-18` classes in favour of standard Tailwind spacing.
- Updated the Ministry of Health link for parto in anonimato.
- Updated the Culle per la Vita link to `/dove-sono/`.
- External links use `target="_blank"` with `rel="noopener noreferrer"`.
- Added `/non-sei-sola` to `public/sitemap.xml`.
- Open Graph and Twitter default images in `index.html` use absolute Vercel URLs.
- Removed the unused duplicate source logo asset.

## Content status

- News array is empty until verified local news are supplied.
- Testimonials array is empty; no testimonials are invented or copied.
- Donation page does not show an IBAN, tax code, P.IVA or 5x1000 code until verified.
- No local Culla per la Vita, SOS Vita, Progetto Gemma or other external resource is presented as locally managed.

## Data still needed from the client

- Exact civic address, if it should be published in addition to the Centro Giovanile location.
- Verified IBAN.
- CF/P.IVA and 5x1000 code.
- RUNTS information, if it should be published.
- Official Facebook and Instagram URLs.
- Authorized local photographs.
- Real testimonials and first news/events.
- Transparency documents.

## SEO and portability

- `VITE_PUBLIC_SITE_URL` remains the canonical base URL.
- `public/robots.txt` allows public indexing and points to the current sitemap.
- `public/sitemap.xml` contains public routes only.
- PORTABILITY CHECK: PASS — `npm install` and `npm run build` require no backend configuration.
- Legal review remains needed for Privacy Policy, Cookie Policy, analytics wording and any future claims about confidentiality or donations.

## Legacy

Supabase cleanup history is documented in `docs/legacy-supabase.md`. Backend criteria are in `docs/backend-roadmap.md`; domain steps are in `docs/domain-and-seo.md`.
