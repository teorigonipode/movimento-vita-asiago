# Dominio e SEO — roadmap

## Dominio temporaneo attuale

`https://movimento-vita-asiago.vercel.app`

## Quando verrà scelto il dominio definitivo

Il processo da seguire, in ordine:

1. **Acquistare il dominio** presso un registrar (es. Register, Aruba, Namecheap).
2. **Collegarlo a Vercel** — Vercel Dashboard > Project Settings > Domains > Add Domain.
3. **Scegliere la variante canonica** — preferibilmente `www.dominio.it` oppure `dominio.it` come principale.
4. **Configurare il redirect** della variante secondaria verso quella principale (Vercel lo gestisce automaticamente).
5. **Aggiornare `VITE_PUBLIC_SITE_URL`** in `.env` e nelle variabili ambiente di Vercel con il dominio canonico.
6. **Aggiornare `public/robots.txt`** — sostituire l'URL della sitemap con il dominio definitivo.
7. **Aggiornare `public/sitemap.xml`** — sostituire tutte le URL con il dominio definitivo.
8. **Verificare i canonical** — ogni pagina genera automaticamente il canonical da `VITE_PUBLIC_SITE_URL`, quindi dopo l'aggiornamento della variabile ambiente tutti i canonical saranno corretti.
9. **Aggiungere Google Search Console** — aggiungere la proprietà con il dominio definitivo.
10. **Verifica DNS** — confermare che i record DNS puntano a Vercel.
11. **Inviare la sitemap** su Google Search Console.
12. **Monitorare l'indicizzazione** — controllare lo stato delle pagine indicizzate e gli eventuali errori.
13. **Audit SEO locale** — verificare title, description, Open Graph, struttura heading e accessibilità.

## Cosa non cambia

- Il componente `src/components/SEO.tsx` genera dinamicamente canonical, Open Graph e Twitter Card a partire da `VITE_PUBLIC_SITE_URL`.
- Non è necessario modificare il codice delle singole pagine.
- Basta aggiornare la variabile ambiente e i file statici (robots, sitemap).

## Sitemap

La sitemap attuale include le route pubbliche principali:

- `/`
- `/chi-siamo`
- `/come-possiamo-aiutarti`
- `/donazioni`
- `/volontari`
- `/notizie`
- `/contatti`

Quando ci saranno notizie pubblicate, valutare l'inclusione degli slug in `public/sitemap.xml`.
Preferire una soluzione semplice: aggiornamento manuale del file quando si pubblica una nuova notizia.
Non introdurre un backend per generare la sitemap automaticamente.
