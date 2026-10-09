// Centrale site-instellingen. Wijzigingen hier gelden voor alle pagina's.

/**
 * GoHighLevel form/survey-embed (iframe + <script src=".../form_embed.js">).
 * Leeg = placeholder "Formulier volgt". Te vullen via de env-variabele
 * GHL_FORM_EMBED (bijv. in Netlify/Vercel/Cloudflare) of direct hieronder.
 */
export const GHL_FORM_EMBED: string = import.meta.env.GHL_FORM_EMBED ?? '';

export const CONTACT = {
  email: 'hallo@bdigital.nl',
  plaats: '[plaats]',
};

/**
 * Foto's: zet een bestand in public/images/ en vul het pad in (bijv. '/images/hero.png').
 * Leeg = placeholder.
 */
export const PHOTOS: Record<string, { src: string; alt: string }> = {
  'hero-photo': { src: '', alt: 'Medewerker van BDigital aan het werk' },
  'about-team': { src: '', alt: 'Het team van BDigital' },
  'over-hero-team': { src: '', alt: 'De oprichters van BDigital aan het werk' },
};
