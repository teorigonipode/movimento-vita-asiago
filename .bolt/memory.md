# Project memory

## Product intent & audience

- Website for **Movimento Vita Asiago**, an Italian association/organization.
- Primary language: **Italian**.
- Audience: members, donors, local community; content includes news, events, testimonials, institutional info, transparency documents, donations.
- Content is **client-supplied only** — never invented or approximated.

## Brand personality & voice

- Formal, trustworthy, institutional tone; not sensationalist.
- Alt texts and excerpts must be descriptive and factual.
- Testimonials published only with clear client authorization.

## Visual design & UX direction

- Framework: **Vite + React (JSX) + Tailwind CSS**; icons via `lucide-react`.
- Aesthetic goal: production-quality, distinctive — not generic (per `.bolt/prompt`).
- Images stored under `public/images/news/` and `public/images/site/` with descriptive filenames; optimized without visible quality loss.
- Homepage news section capped at **3 most recent** published items.
- News detail pages at route `/notizie/[slug]`.
- Social links (Facebook/Instagram) shown **only when official URLs are provided**.
- Donation widgets (IBAN, 5×1000) activated **only when real verified data exists**.

## Decisions, constraints & rationale

- Repository: `teorigonipode/movimento-vita-asiago`, branch `main`.
- Deployment target: **Vercel**.
- Content source of truth: structured TS files (e.g. `src/content/news.ts`) — no CMS.
- News item shape: `slug, title, excerpt, content, category, publishedAt, eventDate?, coverImage?, published`.
- Institutional data (IBAN, CF, P.IVA, 5×1000, RUNTS, social URLs) maintained in a single source of truth; no duplication.
- Sitemap: include `/notizie/slug` entries **only for published real news**; never drafts.
- Mandatory QA before deploy: `npm run typecheck`, `npm run lint`, `npm run build` — plus manual checks (desktop/mobile, images, dates, links, SEO, typos).
- Every content-integration task ends with a **report**: material received, what was/wasn't published and why, news/images added, data updated, sitemap status, test results, deploy status.

## Open questions & assumptions

- No client materials have been provided yet; site awaits real content.
- Assumption: testimonials, donation data, social URLs are not yet available and therefore not rendered.
- Assumption: news collection currently empty or placeholder; homepage news section and sitemap news entries to be populated on first real content delivery.
- Exact institutional/contact data fields and their storage location in codebase to be confirmed when first provided.