// Per-page <head> tags: title, description, canonical, hreflang alternates,
// Open Graph and the LocalBusiness JSON-LD. Rendered once per page and resolved
// at pre-render time, so every static file ships with its own metadata.
//
// The hreflang block is what tells Google the two trees are the same pages in
// two languages rather than duplicates. x-default points at French, the version
// served from the root.

import { Head } from 'vite-react-ssg';
import { LOCALES, LOCALE_TAG, DEFAULT_LOCALE, pathForLocale } from '@/helpers';
import { useLocale } from '@/hooks';
import {
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  PAGE_SEO,
  SITE_NAME,
  SITE_URL,
  type PageSeoKey,
} from '@/content/seo';
import { SeoService } from '@/services';

interface SeoProps {
  /** Which route's metadata to render. */
  page: PageSeoKey;
}

export function Seo({ page }: SeoProps) {
  const locale = useLocale();
  const { path, title, description } = PAGE_SEO[locale][page];
  const url = SeoService.canonicalUrl(pathForLocale(path, locale));
  const image = `${SITE_URL}${OG_IMAGE_PATH}`;
  const otherTag = LOCALE_TAG[locale === 'fr' ? 'en' : 'fr'];

  return (
    <Head>
      <html lang={LOCALE_TAG[locale]} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {LOCALES.map((alt) => (
        <link
          key={alt}
          rel="alternate"
          hrefLang={LOCALE_TAG[alt]}
          href={SeoService.canonicalUrl(pathForLocale(path, alt))}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={SeoService.canonicalUrl(pathForLocale(path, DEFAULT_LOCALE))} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale === 'fr' ? 'fr_FR' : 'en_GB'} />
      <meta property="og:locale:alternate" content={otherTag === 'fr-FR' ? 'fr_FR' : 'en_GB'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={OG_IMAGE_ALT[locale]} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{SeoService.localBusinessJsonLd(locale)}</script>
    </Head>
  );
}
