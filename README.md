# BDigital website

Marketingwebsite voor BDigital (4 pagina's: Home, Diensten, Over ons, Aanpak), gebouwd met [Astro](https://astro.build) als statische site. Nagebouwd uit de high-fidelity design-handoff.

## Starten

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # statische output in dist/
npm run preview  # build lokaal bekijken
```

Hosten kan op Netlify, Vercel of Cloudflare Pages: build command `npm run build`, output directory `dist`.

## Structuur

| Pad | Inhoud |
| --- | --- |
| `src/pages/` | `index`, `diensten`, `over-ons`, `aanpak` — secties 1-op-1 uit het design |
| `src/layouts/Layout.astro` | `<head>` (title, meta description, OG, fonts), header, footer, scripts |
| `src/components/` | `Header`, `Footer`, `GhlFormEmbed`, `Badge` (draaiende badge), `PhotoSlot`, `CaseDrawer` |
| `src/styles/global.css` | Basisstijlen, breekpunten (header 1020px, zijtekst ≥ 1380px), reduced-motion |
| `src/styles/interactions.css` | Hover-/focus-states uit het design (klassen `h0`–`h13`) |
| `src/scripts/site.ts` | Mobiel menu, case-drawer, scroll-tellers (`data-count`), tekenende lijnen (`data-draw`) |
| `src/config.ts` | GoHighLevel-embed, contactgegevens, foto's |

## Intakeformulier (GoHighLevel)

Het formulier is één gedeeld component (`GhlFormEmbed`) dat op alle pagina's in de Intake-CTA staat (`#intake-form`). Plak de GHL-embedcode (iframe + `form_embed.js`-script) op één van deze plekken:

1. **Env-variabele** `GHL_FORM_EMBED` bij de hostingprovider (zie `.env.example`), of
2. direct in `src/config.ts`.

Zonder embed toont de site de placeholder "Formulier volgt". Opmaak van de velden zelf (donker, Manrope, lime knop `#C5FF27`) stel je in GoHighLevel in.

## Foto's

Zet foto's in `public/images/` en vul het pad in bij `PHOTOS` in `src/config.ts` (`hero-photo`, `about-team`, `over-hero-team`). Leeg = placeholder.

## Open punten (klant)

- Echte foto's, contactgegevens (`hallo@bdigital.nl`, "[plaats]" in de Intake-CTA's).
- Voorbeeldcijfers en cases op de homepage zijn placeholders; de case-drawer toont de 10-stappenstructuur.
- Pagina's Contact, Privacybeleid, Algemene voorwaarden en cookieverklaring zijn nog niet ontworpen (footerlinks wijzen nu naar `#top`).
- Homepage noemt 4 diensten, Diensten-pagina 3 — afstemmen.
- Logo als SVG, OG-afbeelding, sitemap (zodra het domein bekend is), cookiebanner zodra tracking wordt toegevoegd.

## Afwijkingen t.o.v. het design

- Case-kaarten (homepage): lange titels liepen bij 4 kolommen buiten de kaart; opgelost met `minmax(0,1fr)` en zachte afbreekstreepjes.
