# Project status — Centro Aiuto alla Vita Altopiano dei Sette Comuni

Updated: 2026-11-24

## Repository

- Repository: `teorigonipode/movimento-vita-asiago`
- Branch: `main`
- Expected current HEAD at start of this pass: `30e5721b1c88e472478ea2f6bd9a4541083b38ee`
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

## Final QA pass (2026-11-24)

- Fixed "Parto in anonimato" resource label: was "Approfondisci sul sito MPV" (incorrect, link points to Ministero Salute), changed to "Informazioni ufficiali".
- Resource cards on Home and Come Possiamo Aiutarti now use `flex flex-col` with `mt-auto` on CTA for aligned bottom links.
- Privacy Policy: removed internal TODO/review notes ("base giuridica e tempi di conservazione devono essere verificati", "richiede validazione legale") from the public page. Kept only verified information.
- Cookie Policy: corrected Vercel Analytics description — it is a first-party privacy-friendly system that does not use cookies to identify visitors. Removed incorrect claim about "cookie di analisi tramite Vercel Analytics". Clarified the site does not set application cookies.
- Footer email link: added `min-w-0` to ensure proper `break-words` wrapping at all viewport sizes.
- All external links verified: Parto in anonimato → Ministero Salute, Culle per la Vita → `/dove-sono/`, SOS Vita → `sosvita.it`, Progetto Gemma → `mpv.org/progettualita`. All use `rel="noopener noreferrer"`.
- Favicon `index.html` links verified: `.ico`, 32x32 PNG, 16x16 PNG, apple-touch-icon. No duplicate `<link rel="icon">`.

## LEGAL REVIEW NEEDED

The following items require professional legal validation before considering the site definitive:

- **Privacy Policy**: base giuridica (consenso vs. legittimo interesse), tempi di conservazione delle comunicazioni, eventuali trasferimenti dati, designazione di un DPO se applicabile. The public page currently omits these sections rather than publishing unverified claims.
- **Cookie Policy**: confirm with legal counsel whether the Vercel Web Analytics description is sufficient for GDPR transparency, even though no cookies are used for user identification.
- **5x1000 and donation**: any public financial data must be verified with the association before publication.

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
- Legal review of Privacy Policy and Cookie Policy.

## SEO and portability

- `VITE_PUBLIC_SITE_URL` remains the canonical base URL.
- `public/robots.txt` allows public indexing and points to the current sitemap.
- `public/sitemap.xml` contains 8 public routes (no `/notizie/:slug` until real news exist).
- OG image uses the official logo as temporary fallback; a custom 1200x630 social preview is a future improvement.
- PORTABILITY CHECK: PASS — `npm install` and `npm run build` require no backend configuration.

## Legacy

Supabase cleanup history is documented in `docs/legacy-supabase.md`. Backend criteria are in `docs/backend-roadmap.md`; domain steps are in `docs/domain-and-seo.md`.
