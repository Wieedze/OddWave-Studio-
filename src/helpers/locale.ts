// Locale primitives: the two languages the site ships in, and the pure path
// arithmetic that maps a URL onto one of them.
//
// The locale lives in the URL, never in state: French sits at the root ("/",
// "/services") and English under an "/en" prefix ("/en", "/en/services").
// That is what makes both versions real, pre-rendered, indexable pages, and it
// means any component can read the current language from the router alone,
// with no provider to thread through the tree.

export type Locale = 'fr' | 'en';

export const LOCALES: readonly Locale[] = ['fr', 'en'];

/** French is served from the root, so it carries no prefix. */
export const DEFAULT_LOCALE: Locale = 'fr';

/** URL segment each locale lives under; the default one has none. */
export const LOCALE_PREFIX: Record<Locale, string> = { fr: '', en: '/en' };

/** `lang` attribute and hreflang value. */
export const LOCALE_TAG: Record<Locale, string> = { fr: 'fr-FR', en: 'en' };

/** How each language names itself, for the switcher. */
export const LOCALE_LABEL: Record<Locale, string> = { fr: 'FR', en: 'EN' };

export const LOCALE_NAME: Record<Locale, string> = { fr: 'Français', en: 'English' };

/** Splits "/#contact" into ["/", "#contact"] so a hash or query survives the
 *  prefix arithmetic; the footer links to "/#contact". */
function splitSuffix(pathname: string): [string, string] {
  const i = pathname.search(/[?#]/);
  return i === -1 ? [pathname, ''] : [pathname.slice(0, i), pathname.slice(i)];
}

function normalize(path: string): string {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/** Which language a pathname belongs to. Unknown prefixes fall back to French. */
export function localeFromPath(pathname: string): Locale {
  const path = normalize(splitSuffix(pathname)[0]);
  return path === '/en' || path.startsWith('/en/') ? 'en' : DEFAULT_LOCALE;
}

/** Drops the locale prefix: "/en/services" and "/services" both give "/services". */
export function stripLocale(pathname: string): string {
  const [raw, suffix] = splitSuffix(pathname);
  const path = normalize(raw);
  if (path === '/en') return `/${suffix}`;
  if (path.startsWith('/en/')) return `${path.slice(3)}${suffix}`;
  return `${path}${suffix}`;
}

/** The same page in another language: ("/services", "en") gives "/en/services",
 *  and ("/#contact", "en") gives "/en#contact". */
export function pathForLocale(pathname: string, locale: Locale): string {
  const [base, suffix] = splitSuffix(stripLocale(pathname));
  const prefix = LOCALE_PREFIX[locale];
  if (!prefix) return `${base}${suffix}`;
  return base === '/' ? `${prefix}${suffix}` : `${prefix}${base}${suffix}`;
}

/** A value that exists once per language. Content modules export these. */
export type Localized<T> = Record<Locale, T>;

/** The other language, for a two-language toggle. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'fr' ? 'en' : 'fr';
}
